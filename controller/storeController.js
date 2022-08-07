import { sequelize } from '../models/index.js';
import bcrypt from 'bcryptjs';
import Model from '../models/storeModels.js';

const updateUser = async (req, res) => {
    try {
        if (req.body.code == 1) {
            var encryptedPassword = await bcrypt.hash(req.body.UserPassword, 10);
            await Model.User.update({UserPassword: encryptedPassword}, {
                where: {UserId: req.params.id}})
        } else if (req.body.code == 0) {
            await Model.User.update(req.body, {
                where: { UserId: req.params.id}
            })
        }
        return res.status(200).json({"status_code": 200});
    } catch (error) {
        return res.json({ message: error.message });
    }
}

const checkUser = async (req, res) => {
    try {
        const user = await Model.User.findAll({
            where: {
                UserEmail: req.body.UserEmail
            }
        })
        if (user.length) {
            return res.json({"status_code": 200, "user": user[0]});
        }
        return res.json({"status_code": 403, "user": {}});
    } catch (error) {
        
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Model.Customer.findAll({
            include: [{
                model: Model.SalesHeader,
                order: [['SalesId', 'DESC']]
            }]
        });
        res.json(customers);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Model.Supplier.findAll({
            include: [{
                model: Model.PurchaseHeader,
                order: [['PurchaseId', 'DESC']]
            }]
        });
        res.json(suppliers);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Model.Product.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllSales = async (req, res) => {
    try {
        const sales = await Model.SalesHeader.findAll({
            include: [{
                model: Model.Customer,
                attributes: ['CustomerId', 'Name']
            }]
        });
        res.json(sales);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Model.PurchaseHeader.findAll({
            include: [{
                model: Model.Supplier,
                attributes: ['SupplierId', 'Name']
            }]
        });
        res.json(purchases);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllReturns = async (req, res) => {
    try {
        const returns = await Model.ReturnHeader.findAll({
            include: [{
                model: Model.Customer,
                attributes: ['CustomerId', 'Name']
            }]
        });
        res.json(returns);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllOperatings = async (req, res) => {
    try {
        const operatings = await Model.OperatingCost.findAll();
        res.json(operatings);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customer = await Model.Customer.findAll({
            where: {
                CustomerId: req.params.id
            }, include: [{
                model: Model.SalesHeader,
                order: [['SalesId', 'DESC']]
            }]
        });
        res.json(customer[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getSupplierById = async (req, res) => {
    try {
        const supplier = await Model.Supplier.findAll({
            where: {
                SupplierId: req.params.id
            }, include: [{
                model: Model.PurchaseHeader,
                order: [['PurchaseId', 'DESC']]
            }]
        });
        res.json(supplier[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Model.Product.findAll({
            where: {
                ProductId: req.params.id
            }, include: [{
                model: Model.PurchaseDetails,
                order: [['PurchaseId', 'DESC']],
                include: [{
                    model: Model.PurchaseHeader
                }]
            }, {
                model: Model.SalesDetails,
                order: [['SalesId', 'DESC']],
                include: [{
                    model: Model.SalesHeader
                }]
            }]
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getSalesById = async (req, res) => {
    try {
        const sales = await Model.SalesHeader.findAll({
            where: {
                SalesId: req.params.id
            }, include: [{
                model: Model.Customer,
                required: true,
                attributes: ['CustomerId', 'Name']
            }, {
                model: Model.SalesDetails,
                required: true,
                include: {
                    model: Model.Product,
                    required: true,
                    attributes: ['Name']
                }
            }]
        });
        res.json(sales[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Model.PurchaseHeader.findAll({
            where: {
                PurchaseId: req.params.id
            }, include: [{
                model: Model.Supplier,
                required: true,
                attributes: ['SupplierId', 'Name']
            }, {
                model: Model.PurchaseDetails,
                required: true,
                include: {
                    model: Model.Product,
                    required: true,
                    attributes: ['Name']
                }
            }]
        });
        res.json(purchase[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getReturnById = async (req, res) => {
    try {
        const returns = await Model.ReturnHeader.findAll({
            where: {
                ReturnId: req.params.id
            }, include: [{
                model: Model.Customer,
                required: true,
                attributes: ['CustomerId', 'Name']
            }, {
                model: Model.ReturnDetails,
                required: true,
                include: {
                    model: Model.Product,
                    required: true,
                    attributes: ['Name']
                }
            }]
        });
        res.json(returns[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getOperatingById = async (req, res) => {
    try {
        const operatings = await Model.OperatingCost.findAll({
            where: {
                OperatingId: req.params.id
            }
        });
        res.json(operatings[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const createCustomer = async (req, res) => {
    try {
        await Model.Customer.create(req.body);
        res.json({
            "message": "Customer Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createSupplier = async (req, res) => {
    try {
        await Model.Supplier.create(req.body);
        res.json({
            "message": "Supplier Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createProduct = async (req, res) => {
    try {
        await Model.Product.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createSales = async (req, res) => {
    try {
        const sales = await Model.SalesHeader.create(req.body, {
            include: [Model.SalesDetails]
        });
        res.json({
            "SalesId": sales.SalesId,
            "message": "Sales Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createPurchase = async (req, res) => {
    try {
        const purchase = await Model.PurchaseHeader.create(req.body, {
            include: [Model.PurchaseDetails]
        });
        res.json({
            "PurchaseId": purchase.PurchaseId,
            "message": "Purchase Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createReturn = async (req, res) => {
    try {
        const returns = await Model.ReturnHeader.create(req.body, {
            include: [Model.ReturnDetails]
        });
        res.json({
            "ReturnId": returns.ReturnId,
            "message": "Return Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const createOperating = async (req, res) => {
    try {
        await Model.OperatingCost.create(req.body);
        res.json({
            "message": "Return Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    } 
}

const updateCustomer = async (req, res) => {
    try {
        await Model.Customer.update(req.body, {
            where: {
                CustomerId: req.params.id
            }
        });
        res.json({
            "message": "Customer Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateSupplier = async (req, res) => {
    try {
        await Model.Supplier.update(req.body, {
            where: {
                SupplierId: req.params.id
            }
        });
        res.json({
            "message": "Supplier Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateProduct = async (req, res) => {
    try {
        await Model.Product.update(req.body, {
            where: {
                ProductId: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateSales = async (req, res) => {
    const salesDetailsData = req.body.salesdetails;
    var arr = [];
    for (var i = 0; i<salesDetailsData.length; i++) {
        var arrObj = {
            SalesId: req.params.id,
            ProductId: salesDetailsData[i].ProductId,
            MovingPrice: salesDetailsData[i].MovingPrice,
            SalesPrice: salesDetailsData[i].SalesPrice,
            Qty: salesDetailsData[i].Qty
        };
        arr.push(arrObj);
    }
    try {
        await Model.SalesHeader.update(req.body, {
            where: {
                SalesId: req.params.id
            }
        });
        await Model.SalesDetails.bulkCreate(arr, {
                updateOnDuplicate: ['ProductId', 'MovingPrice', 'SalesPrice', 'Qty']
        });
        res.json({
            "SalesId": req.params.id,
            "message": "Sales Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updatePurchase = async (req, res) => {
    const purchaseDetailsData = req.body.purchasedetails;
    var arr = [];
    for (var i = 0; i<purchaseDetailsData.length; i++) {
        var arrObj = {
            PurchaseId: req.params.id,
            ProductId: purchaseDetailsData[i].ProductId,
            PurchasePrice: purchaseDetailsData[i].PurchasePrice,
            SalesPrice: purchaseDetailsData[i].SalesPrice,
            Qty: purchaseDetailsData[i].Qty
        };
        arr.push(arrObj);
    }
    try {
        await Model.PurchaseHeader.update(req.body, {
            where: {
                PurchaseId: req.params.id
            }
        });
        await Model.PurchaseDetails.bulkCreate(arr, {
                updateOnDuplicate: ['ProductId', 'PurchasePrice', 'SalesPrice', 'Qty']
        });
        res.json({
            "PurchaseId": req.params.id,
            "message": "Purchase Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateReturn = async (req, res) => {
    const returnDetailsData = req.body.returndetails;
    var arr = [];
    for (var i = 0; i<returnDetailsData.length; i++) {
        var arrObj = {
            ReturnId: req.params.id,
            ProductId: returnDetailsData[i].ProductId,
            MovingPrice: returnDetailsData[i].MovingPrice,
            SalesPrice: returnDetailsData[i].SalesPrice,
            Qty: returnDetailsData[i].Qty
        };
        arr.push(arrObj);
    }
    try {
        await Model.ReturnHeader.update(req.body, {
            where: {
                ReturnId: req.params.id
            }
        });
        await Model.ReturnDetails.bulkCreate(arr, {
            updateOnDuplicate: ['ProductId', 'MovingPrice', 'SalesPrice', 'Qty']
    });
        res.json({
            "ReturnId": req.params.id,
            "message": "Return Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateOperating = async (req, res) => {
    try {
        await Model.OperatingCost.update(req.body, {
            where: {
                OperatingId: req.params.id
            }
        });
        res.json({
            "message": "Return Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const reportDaily = async (req, res) => {
    try {
        var TotalTransaction = 0;
        var TotalSales = 0;
        var product = [];
        const sales = await Model.SalesHeader.findAll({
            where: sequelize.where(sequelize.fn('date', sequelize.col('SalesDate')), '=', req.body.SalesDate),
            include: {
                model: Model.SalesDetails,
                include: {
                    model: Model.Product,
                    attributes: ['Name']
                }
            }
        });
        for await (let i of sales) {
            TotalTransaction++;
            TotalSales+=i.TotalPrice;
            for await (let j of i.salesdetails) {
                if (product.length == 0) {
                    product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                }
                else {
                    for await (let k of product) {
                        if (k.ProductId == j.ProductId) {
                           k.Qty += j.Qty;
                           break
                        } else if (k.Name == product[product.length-1].Name ) {
                            product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                            break;
                        }
                    }
                }
            }
        }
        product.sort((a,b) => b.Qty - a.Qty);
        if (product.length>2) {
            product.splice(3,product.length-1);
        }
        res.json({"TotalTransaction": TotalTransaction, "TotalSales": TotalSales, "Products": product});
    } catch (error) {
        res.json({ message: error.message });
    }
}

const reportWeekly = async (req, res) => {
    try {
        var TotalTransaction = 0;
        var TotalSales = 0;
        var product = [];
        const sales = await Model.SalesHeader.findAll({
            where: sequelize.and(
                sequelize.where(sequelize.fn('date', sequelize.col('SalesDate')),'>=',req.body.fromDate),
                sequelize.where(sequelize.fn('date', sequelize.col('SalesDate')),'<=',req.body.toDate)
            ),
            include: {
                model: Model.SalesDetails,
                include: {
                    model: Model.Product,
                    attributes: ['Name']
                }
            }
        });
        for await (let i of sales) {
            TotalTransaction++;
            TotalSales+=i.TotalPrice;
            for await (let j of i.salesdetails) {
                if (product.length == 0) {
                    product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                }
                else {
                    for await (let k of product) {
                        if (k.ProductId == j.ProductId) {
                           k.Qty += j.Qty;
                           break
                        } else if (k.Name == product[product.length-1].Name ) {
                            product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                            break;
                        }
                    }
                }
            }
        }
        product.sort((a,b) => b.Qty - a.Qty);
        if (product.length>2) {
            product.splice(3,product.length-1);
        }
        res.json({"TotalTransaction": TotalTransaction, "TotalSales": TotalSales, "Products": product});
    } catch (error) {
        res.json({ message: error.message });
    }
}

const reportMonthly = async (req, res) => {
    try {
        var NumberOfSales = 0;
        var Cost = 0;
        var Revenue = 0;
        var Operation = 0;
        var Profit = 0;
        var product = [];
        const sales = await Model.SalesHeader.findAll({
            where: sequelize.and(
                sequelize.where(sequelize.fn('month', sequelize.col('SalesDate')),'=',req.body.Month),
                sequelize.where(sequelize.fn('year', sequelize.col('SalesDate')),'=',req.body.Year)
            ),
            include: {
                model: Model.SalesDetails,
                include: {
                    model: Model.Product,
                    attributes: ['Name']
                }
            }
        });
        const operation = await Model.OperatingCost.findAll({
            where: sequelize.and(
                sequelize.where(sequelize.fn('month', sequelize.col('CreatedAt')),'=',req.body.Month),
                sequelize.where(sequelize.fn('year', sequelize.col('CreatedAt')),'=',req.body.Year)
            )
        })
        for await (let i of sales) {
            NumberOfSales++;
            Revenue+=i.TotalPrice;
            for await (let j of i.salesdetails) {
                Cost +=(j.MovingPrice*j.Qty);
                if (product.length == 0) {
                    product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                }
                else {
                    for await (let k of product) {
                        if (k.ProductId == j.ProductId) {
                           k.Qty += j.Qty;
                           break
                        } else if (k.Name == product[product.length-1].Name ) {
                            product.push({"ProductId": j.ProductId,"Name": j.product.Name, "Qty": j.Qty});
                            break;
                        }
                    }
                }
            }
        }
        for await (let i of operation) {
            Operation+=i.Amount;
        }
        product.sort((a,b) => b.Qty - a.Qty);
        if (product.length>2) {
            product.splice(3,product.length-1);
        }
        Profit += (Revenue-Cost-Operation)
        res.json({
            "NumberOfSales": NumberOfSales,
            "Revenue": Revenue,
            "Cost": Cost,
            "Operation": Operation,
            "Profit": Profit,
            "Products": product});
    } catch (error) {
        res.json({ message: error.message });
    }
}

const paymentPurchase = async (req, res) => {
    try {
        await Model.PurchaseHeader.update(req.body, {
            where: {
                PurchaseId: req.params.id
            }
        });
        res.json({
            "status_code": "200",
            "message": "Purchase Updated"
        });
    } catch (error) {
        res.json({'message': error});
    }
}

const paymentSales = async (req, res) => {
    try {
        await Model.SalesHeader.update(req.body, {
            where: {
                SalesId: req.params.id
            }
        });
        res.json({
            "status_code": "200",
            "message": "Sales Updated"
        });
    } catch (error) {
        res.json({'message': error});
    }
}

const paymentReturn = async (req, res) => {
    try {
        await Model.ReturnHeader.update(req.body, {
            where: {
                ReturnId: req.params.id
            }
        });
        res.json({
            "status_code": "200",
            "message": "Return Updated"
        });
    } catch (error) {
        res.json({'message': error});
    }
}

export default {updateUser, checkUser,getAllCustomers, getAllSuppliers, getAllProducts, getAllSales, getAllPurchases, getAllReturns, getAllOperatings,
    getCustomerById, getSupplierById, getProductById, getSalesById, getPurchaseById, getReturnById, getOperatingById,
    createCustomer, createSupplier, createProduct, createSales, createPurchase, createReturn, createOperating,
    updateCustomer, updateSupplier, updateProduct, updateSales, updatePurchase, updateReturn, updateOperating,
    reportDaily, reportWeekly, reportMonthly, paymentPurchase, paymentSales, paymentReturn};