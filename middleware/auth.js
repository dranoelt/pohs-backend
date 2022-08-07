import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import functions from "./function.js";
dotenv.config();
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token ||req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        let decrypted = functions.decrypt(token);
        const decoded = jwt.verify(decrypted, config.JWT_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

export default verifyToken;