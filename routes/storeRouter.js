import express from 'express';
import storeController from '../controller/storeController.js';
import Model from '../models/storeModels.js';

const router = express.Router();
router.patch('/user/:id', storeController.updateUser);
router.post('/forget', storeController.checkUser);
router.get('/customer', storeController.getAllCustomers);
router.get('/supplier', storeController.getAllSuppliers);
router.get('/product', storeController.getAllProducts);
router.get('/sales', storeController.getAllSales);
router.get('/purchase', storeController.getAllPurchases);
router.get('/return', storeController.getAllReturns);
router.get('/operating', storeController.getAllOperatings);
router.get('/customer/:id', storeController.getCustomerById);
router.get('/supplier/:id', storeController.getSupplierById);
router.get('/product/:id', storeController.getProductById);
router.get('/sales/:id', storeController.getSalesById);
router.get('/purchase/:id', storeController.getPurchaseById);
router.get('/return/:id', storeController.getReturnById);
router.get('/operating/:id', storeController.getOperatingById);
router.post('/customer', storeController.createCustomer);
router.post('/supplier', storeController.createSupplier);
router.post('/product', storeController.createProduct);
router.post('/sales', storeController.createSales);
router.post('/purchase', storeController.createPurchase);
router.post('/return', storeController.createReturn);
router.post('/operating', storeController.createOperating);
router.patch('/customer/:id', storeController.updateCustomer);
router.patch('/supplier/:id', storeController.updateSupplier);
router.patch('/product/:id', storeController.updateProduct);
router.patch('/sales/:id', storeController.updateSales);
router.patch('/purchase/:id', storeController.updatePurchase);
router.patch('/return/:id', storeController.updateReturn);
router.patch('/operating/:id', storeController.updateOperating);
router.patch('/purchase/pay/:id', storeController.paymentPurchase);
router.patch('/sales/pay/:id', storeController.paymentSales);
router.patch('/return/pay/:id', storeController.paymentReturn);
router.post('/report-daily', storeController.reportDaily);
router.post('/report-weekly', storeController.reportWeekly);
router.post('/report-monthly', storeController.reportMonthly);
router.get('/check', async (req, res) => {
    try {
        const lastid = (await Model.PurchaseHeader.findAll({attributes: ['PurchaseId'], order: [['PurchaseId', 'DESC']], limit: 1})).map(result => result.get("PurchaseId"));
        const indexid = JSON.stringify(lastid);
        const id = parseInt(indexid.substr(10,4))+1;
        let a = "abc"
        const date = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "2-digit"} );
        if (lastid == "") {
            a = "dd"
        }
        else {
            a = "adadad"
        }
        // const indexid = parseInt(lastid) + 1;
        res.json(date);
    } catch (error) {
        res.json({ message: error.message });
    }    
});

router.patch('/lola/:id', async(req, res) => {
    try {
        var arr = [{PurchaseId: '042207060003', ProductId: '1', PurchasePrice: '5000', Qty: 3},
        {PurchaseId: '042207060003', ProductId: '2', PurchasePrice: '5000', Qty: 3}]
        Model.PurchaseDetails.bulkCreate(arr, {
            updateOnDuplicate: ['ProductId', 'PurchasePrice', 'Qty']
        })
        res.send('updated')
    } catch (error) {
        
    }
})

export default router;