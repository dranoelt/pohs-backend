import express from 'express';
// import Controller from '../a/storectrl.js'
import cors from 'cors';
import { sequelize } from './models/index.js';
import router from './routes/storeRouter.js';
import addDummy from './models/dummy.js';
import Model from './models/storeModels.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from './middleware/auth.js';
import * as dotenv from 'dotenv';
import functions from './middleware/function.js';
// import path from 'path';
// import {fileURLToPath} from 'url';
dotenv.config();
const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

var corsOptions = {
    origin: "http://localhost:4000"
};
try {
    await sequelize.authenticate();
    console.log("Connected");
} catch (error) {
    console.error("Disconnect : ", error);
}
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// })

app.get('/', (req, res) => {
    res.send("hello");
})
app.use('/api', auth, router);
app.get('/is-connected', (req, res) => {
    try {
        sequelize.authenticate();
        res.end("Connected")
    } catch (error) {
        res.end("Disconnect")
    }
});
app.get('/sync', async(req, res) => {
    await sequelize.sync({force: true});
    res.end('Syncronized');
})
app.get('/dummy', async(req, res) => {
    addDummy();
    res.end('added');
})
app.listen(process.env.DB_PORT || 4001, () => {
    console.log('Server is running on port 4001');
})

app.post('/register', async (req, res) => {
    try {
        const { UserName, UserEmail, UserPassword } = req.body;

        if (!(UserName && UserEmail && UserPassword)) {
            res.status(401).json({'message': "All input is required"});
        }

        const oldUser = await Model.User.findOne({ where: {UserEmail: UserEmail} });

        if (oldUser) {
            return res.status(409).json({'message': "User Already Exist. Please Login"});
        }

        var encryptedPassword = await bcrypt.hash(UserPassword, 10);

        await Model.User.create( {
            UserName, UserEmail: UserEmail.toLowerCase(), UserPassword: encryptedPassword
        });
        
        return res.status(201).json({'message': "Success"});
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        if (!(req.body.UserEmail && req.body.UserPassword)) {
            res.status(400).json({'message': "All input is required",'user': {}});
        }
        const user = await Model.User.findOne({ where: {UserEmail: req.body.UserEmail} });

        if (!user) {
            return res.status(404).json({'message': 'user not found','user': {}});
        }
        if (!(await bcrypt.compare(req.body.UserPassword, user.UserPassword))) {
            return res.status(404).json({'message': 'password wrong', 'user': {}});
        }
        if (req.body.UserEmail && (await bcrypt.compare(req.body.UserPassword, user.UserPassword))) {
            const token = jwt.sign(
                { UserId: user.UserId, UserEmail: req.body.UserEmail },
                process.env.JWT_KEY,
                {
                    expiresIn: "24h"
                }
            );
            user.Token = functions.encrypt(token);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            let data = {
                'UserId': user.UserId,
                'UserName': user.UserName,
                'UserEmail': user.UserEmail,
                'Token': user.Token,
                'exp': decoded.exp
            }
            return res.status(200).json({'message': 'success', 'user': data});
        }
        
        res.status(400).json({'message': "Invalid Credentials", 'user': {}});
    } catch (error) {
        console.log(error);
    }
})

app.post('/check', async (req, res) => {
    try {
        if (!req.body.UserEmail) {
            return res.status(400).json({ 'message': 'Email address is required'});
        }
        const user = await Model.User.findOne({where: {UserEmail: req.body.UserEmail}})
        if (!user) {
            return res.status(403).json({ 'message': 'Email address not registered'});
        } else {
           return res.status(200).json({ 'message': 'Success'})
        }
    } catch (error) {
        console.log(error);
    }
})

app.patch('/forgetpass', async (req, res) => {
    try {
        var encryptedPassword = await bcrypt.hash(req.body.UserPassword, 10);
        await Model.User.update({UserPassword: encryptedPassword}, {where: {UserEmail: req.body.UserEmail}})
        return res.status(200).json({ 'message': 'Password updated'});
    } catch (error) {
        console.log(error);
    }
})

app.post('/refresh', auth, async (req, res) => {
    try {
        let decrypted = functions.decrypt(req.body.token);
        const decoded = jwt.verify(decrypted, process.env.JWT_KEY);
        const user = await Model.User.findOne({where: {UserEmail: decoded.UserEmail}});
        const token = jwt.sign(
            { UserId: user.UserId, UserEmail: user.UserEmail },
            process.env.JWT_KEY,
            {
                expiresIn: "12h"
            }
        );
        user.Token = functions.encrypt(token);
        const decodedtoken = jwt.verify(token, process.env.JWT_KEY);
        let data = {
            'UserId': user.UserId,
            'UserName': user.UserName,
            'UserEmail': user.UserEmail,
            'Token': user.Token,
            'exp': decodedtoken.exp
        }
        return res.status(200).json({'user': data});
    } catch (error) {
        console.log(error);
    }
})