import { sequelize, DataTypes } from "./index.js";

const User = sequelize.define('user', {
    UserId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    UserName: DataTypes.STRING,
    UserEmail: DataTypes.STRING,
    UserPassword: DataTypes.STRING,
    Token: DataTypes.STRING
});

const Customer = sequelize.define('customer', {
    CustomerId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    UserId: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Number: DataTypes.STRING,
    Address: DataTypes.TEXT,
    Status: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Supplier = sequelize.define('supplier', {
    SupplierId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    UserId: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Company: DataTypes.STRING,
    Number: DataTypes.STRING,
    Address: DataTypes.TEXT,
    Status: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Product = sequelize.define('product', {
    ProductId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    UserId: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Company: DataTypes.STRING,
    Qty: {type: DataTypes.INTEGER, defaultValue: 0},
    MovingPrice: {type: DataTypes.DECIMAL(11,2), defaultValue: 0},
    SalesPrice: {type: DataTypes.INTEGER, defaultValue: 0},
    Status: {type: DataTypes.INTEGER, defaultValue: 1}
});

const SalesHeader = sequelize.define('salesheader', {
    SalesId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    UserId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    SalesDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    PaymentMethod: DataTypes.STRING,
    DebtDue: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
    TotalItem: DataTypes.INTEGER,
    TotalPrice: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    Remain: DataTypes.INTEGER,
    Status: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (sales, Option) => {
            const lastid = (await SalesHeader.findAll({attributes: ['SalesId'], order: [['SalesId', 'DESC']], limit: 1})).map(result => result.get("SalesId"));
            const indexid = JSON.stringify(lastid);
            const id = parseInt(indexid.substr(10,4))+1;
            const a = "";
            const date = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "2-digit"} );
            if (lastid == "") {
                sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
            }
            else {
                if (date.substr(0,2) != indexid.substr(8,2)) {
                    sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
                }
                else {
                    if (id < 10) {
                        sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),"000",id);
                    } else if (id <100) {
                        sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),"00",id);
                    } else if (id <1000) {
                        sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0",id);
                    } else {
                        sales.SalesId = a.concat("05",date.substr(6,2),date.substr(3,2),date.substr(0,2),id);
                    }
                }
            }
        }
    }
});

const SalesDetails = sequelize.define('salesdetail', {
    SalesId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    ProductId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    MovingPrice: DataTypes.INTEGER,
    SalesPrice: DataTypes.INTEGER,
    Qty: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        afterCreate: async (sales, Option) => {
            const salesqty = sales.Qty;
            await Product.decrement('Qty',{ by: salesqty, where: { ProductId: sales.ProductId}});
        },
        beforeBulkCreate: async(sales, Option) => {
            const salesOld = await SalesDetails.findAll({where: { SalesId: sales[0].dataValues.SalesId}});
            for await (let i of sales) {
                for await (let j of salesOld) {
                    if ( i.dataValues.ProductId === j.dataValues.ProductId) {
                        let oldValue = j.dataValues.Qty;
                        let currentValue = i.dataValues.Qty;
                        if (i.dataValues.Qty > j.dataValues.Qty) {
                            let difValue = currentValue - oldValue;
                            console.log(difValue);
                            await Product.decrement('Qty',{ by: difValue, where: { ProductId: i.dataValues.ProductId}});
                        } else if (i.dataValues.Qty < j.dataValues.Qty) {
                            let difValue = oldValue - currentValue;
                            console.log(difValue);
                            await Product.increment('Qty',{ by: difValue, where: { ProductId: i.dataValues.ProductId}});
                        }
                    } else if (i.equalsOneOf(salesOld) == false) {
                        await Product.decrement('Qty',{ by: i.dataValues.Qty, where: { ProductId: i.dataValues.ProductId}});
                        break;
                    }
                }
            }
        }
    }
});

const PurchaseHeader = sequelize.define('purchaseheader', {
    PurchaseId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    UserId: DataTypes.INTEGER,
    SupplierId: DataTypes.INTEGER,
    PurchaseDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    PaymentMethod: DataTypes.STRING,
    DebtDue: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
    TotalItem: DataTypes.INTEGER,
    TotalPrice: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    Remain: DataTypes.INTEGER,
    Status: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (purchase, Option) => {
            const lastid = (await PurchaseHeader.findAll({attributes: ['PurchaseId'], order: [['PurchaseId', 'DESC']], limit: 1})).map(result => result.get("PurchaseId"));
            const indexid = JSON.stringify(lastid);
            const id = parseInt(indexid.substr(10,4))+1;
            const a = "";
            const date = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "2-digit"} );
            if (lastid == "") {
                purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
            }
            else {
                if (date.substr(0,2) != indexid.substr(8,2)) {
                    purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
                }
                else {
                    if (id < 10) {
                        purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),"000",id);
                    } else if (id <100) {
                        purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),"00",id);
                    } else if (id <1000) {
                        purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0",id);
                    } else {
                        purchase.PurchaseId = a.concat("04",date.substr(6,2),date.substr(3,2),date.substr(0,2),id);
                    }
                }
            }
        },
    }
});

const PurchaseDetails = sequelize.define('purchasedetail', {
    PurchaseId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    ProductId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    PurchasePrice: DataTypes.INTEGER,
    SalesPrice: DataTypes.INTEGER,
    Qty: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        afterCreate: async (purchase, Option) => {
            console.log("afterCreate");
            const purchaseqty = purchase.Qty;
            const product = await Product.findOne({where: {ProductId: purchase.ProductId}});
            var newValue = purchaseqty * purchase.PurchasePrice;
            var oldValue = product.Qty * product.MovingPrice;
            var stock = product.Qty + purchaseqty;
            var value = (oldValue + newValue) / stock;
            await Product.update({MovingPrice: value, SalesPrice: purchase.SalesPrice}, {where: {ProductId: purchase.ProductId}});
            await Product.increment('Qty',{ by: purchaseqty, where: { ProductId: purchase.ProductId}});
        },
        beforeBulkCreate: async(purchase, Option) => {
            const purchaseOld = await PurchaseDetails.findAll({where: { PurchaseId: purchase[0].dataValues.PurchaseId}});
            for await (let i of purchase) {
                for await (let j of purchaseOld) {
                    const product = await Product.findOne({where: {ProductId: i.dataValues.ProductId}});
                    if ( i.dataValues.ProductId === j.dataValues.ProductId) {
                        let oldQty = j.dataValues.Qty;
                        let newQty = i.dataValues.Qty;
                        let oldPrice = j.dataValues.PurchasePrice;
                        let newPrice = i.dataValues.PurchasePrice;
                        let movPrice = product.MovingPrice;
                        let curQty = product.Qty;
                        if ( newQty > oldQty && newPrice == oldPrice ) {
                            let difQty = newQty - oldQty;
                            await Product.update({SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.increment('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty > oldQty && newPrice > oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difQty = newQty - oldQty;
                            let fixQty = curQty + difQty;
                            let difPrice = newPrice - oldPrice;
                            let fixValue = oldQty * difPrice;
                            let difValue = difQty * newPrice;
                            let value = (oldValue + difValue + fixValue)/fixQty;
                            console.log(oldValue+" "+difQty+" "+fixQty+" "+difPrice+" "+fixValue+" "+difValue+" "+value);
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.increment('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty > oldQty && newPrice < oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difQty = newQty - oldQty;
                            let fixQty = curQty + difQty;
                            let difPrice = oldPrice - newPrice;
                            let fixValue = oldPrice * difPrice;
                            let difValue = difQty * newPrice;
                            let value = (oldValue + difValue - fixValue)/fixQty;
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.increment('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty < oldQty && newPrice == oldPrice ) {
                            let difQty = oldQty - newQty;
                            await Product.update({SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.decrement('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty < oldQty && newPrice > oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difQty = oldQty - newQty;
                            let fixQty = curQty - difQty;
                            let difPrice = newPrice - oldPrice;
                            let fixValue = oldQty * difPrice;
                            let difValue = difQty * oldPrice;
                            let value = (oldValue - difValue + fixValue)/fixQty;
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.decrement('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty < oldQty && newPrice < oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difQty = oldQty - newQty;
                            let fixQty = curQty - difQty;
                            let difPrice = oldPrice - newPrice;
                            let fixValue = oldQty * difPrice;
                            let difValue = difQty * oldPrice;
                            let value = (oldValue - difValue - fixValue)/fixQty;
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                            await Product.decrement('Qty',{ by: difQty, where: { ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty == oldQty && newPrice > oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difPrice = newPrice - oldPrice;
                            let fixValue = newQty * difPrice;
                            let value = (oldValue+fixValue)/curQty;
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                        }
                        else if ( newQty == oldQty && newPrice < oldPrice ) {
                            let oldValue = curQty * movPrice;
                            let difPrice = oldPrice - newPrice;
                            let fixValue = newQty * difPrice;
                            let value = (oldValue-fixValue)/curQty;
                            await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                        }
                    } else if (i.equalsOneOf(purchaseOld) == false) {
                        var newValue = i.dataValues.Qty * i.dataValues.PurchasePrice;
                        var oldValue = product.Qty * product.MovingPrice;
                        var stock = product.Qty + purchaseqty;
                        var value = (oldValue + newValue) / stock;
                        await Product.update({MovingPrice: value, SalesPrice:  i.dataValues.SalesPrice}, {where: {ProductId: i.dataValues.ProductId}});
                        await Product.increment('Qty',{ by: i.dataValues.Qty, where: { ProductId: i.dataValues.ProductId}});
                        break;
                    }
                }
            }
        }
    }
});

const ReturnHeader = sequelize.define('returnheader', {
    ReturnId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    UserId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    ReturnDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    PaymentMethod: DataTypes.STRING,
    DebtDue: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
    TotalItem: DataTypes.INTEGER,
    TotalPrice: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    Remain: DataTypes.INTEGER,
    Status: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (returns, Option) => {
            const lastid = (await ReturnHeader.findAll({attributes: ['ReturnId'], order: [['ReturnId', 'DESC']], limit: 1})).map(result => result.get("ReturnId"));
            const indexid = JSON.stringify(lastid);
            const id = parseInt(indexid.substr(10,4))+1;
            const a = "";
            const date = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "2-digit"} );
            if (lastid == "") {
                returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
            }
            else {
                if (date.substr(0,2) != indexid.substr(8,2)) {
                    returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
                }
                else {
                    if (id < 10) {
                        returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),"000",id);
                    } else if (id <100) {
                        returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),"00",id);
                    } else if (id <1000) {
                        returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0",id);
                    } else {
                        returns.ReturnId = a.concat("06",date.substr(6,2),date.substr(3,2),date.substr(0,2),id);
                    }
                }
            }
        }
    }
});

const ReturnDetails = sequelize.define('returndetail', {
    ReturnId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    ProductId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    MovingPrice: DataTypes.INTEGER,
    SalesPrice: DataTypes.INTEGER,
    Qty: DataTypes.INTEGER
}, {
    timestamps: false,
    hooks: {
        afterCreate: async (returns, Option) => {
            const returnqty = returns.Qty;
            await Product.decrement('Qty',{ by: returnqty, where: { ProductId: returns.ProductId}});
        },
        beforeBulkCreate: async(returns, Option) => {
            const returnsOld = await ReturnDetails.findAll({where: { ReturnId: returns[0].dataValues.ReturnId}});
            for await (let i of returns) {
                for await (let j of returnsOld) {
                    if ( i.dataValues.ProductId === j.dataValues.ProductId) {
                        let oldValue = j.dataValues.Qty;
                        let currentValue = i.dataValues.Qty;
                        if (i.dataValues.Qty > j.dataValues.Qty) {
                            let difValue = currentValue - oldValue;
                            console.log(difValue);
                            await Product.increment('Qty',{ by: difValue, where: { ProductId: i.dataValues.ProductId}});
                        } else if (i.dataValues.Qty < j.dataValues.Qty) {
                            let difValue = oldValue - currentValue;
                            console.log(difValue);
                            await Product.decrement('Qty',{ by: difValue, where: { ProductId: i.dataValues.ProductId}});
                        }
                    } else if (i.equalsOneOf(returnsOld) == false) {
                        await Product.increment('Qty',{ by: i.dataValues.Qty, where: { ProductId: i.dataValues.ProductId}});
                        break;
                    }                 
                }
            }
        }
    }
});

const OperatingCost = sequelize.define('operatingcost', {
    OperatingId: {type: DataTypes.STRING(12), primaryKey: true, allowNull: false},
    UserId: DataTypes.INTEGER,
    Category: DataTypes.STRING,
    CreatedAt: DataTypes.DATEONLY,
    Amount: DataTypes.INTEGER,
    Description: DataTypes.TEXT
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (operating, Option) => {
            console.log("abc");
            const lastid = (await OperatingCost.findAll({attributes: ['OperatingId'], order: [['OperatingId', 'DESC']], limit: 1})).map(result => result.get("OperatingId"));
            const indexid = JSON.stringify(lastid);
            const id = parseInt(indexid.substr(10,4))+1;
            const a = "";
            const date = new Date().toLocaleString("id-ID", { month: "2-digit", day: "2-digit", year: "2-digit"} );
            if (lastid == "") {
                operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
            }
            else {
                if (date.substr(0,2) != indexid.substr(8,2)) {
                    operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0001");
                }
                else {
                    if (id < 10) {
                        operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),"000",id);
                    } else if (id <100) {
                        operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),"00",id);
                    } else if (id <1000) {
                        operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),"0",id);
                    } else {
                        operating.OperatingId = a.concat("07",date.substr(6,2),date.substr(3,2),date.substr(0,2),id);
                    }
                }
            }
        }
    }
});

User.hasMany(Customer, {foreignKey: 'UserId'});
Customer.belongsTo(User, {foreignKey: 'UserId'});
User.hasMany(Supplier, {foreignKey: 'UserId'});
Supplier.belongsTo(User, {foreignKey: 'UserId'});
User.hasMany(Product, {foreignKey: 'UserId'});
Product.belongsTo(User, {foreignKey: 'UserId'});
User.hasMany(SalesHeader, {foreignKey: 'UserId'});
Customer.hasMany(SalesHeader, {foreignKey: 'CustomerId'});
SalesHeader.belongsTo(User, {foreignKey: 'UserId'});
SalesHeader.belongsTo(Customer, {foreignKey: 'CustomerId'});
SalesHeader.hasMany(SalesDetails, {foreignKey: 'SalesId'});
SalesDetails.belongsTo(SalesHeader, {foreignKey: 'SalesId'});
Product.hasMany(SalesDetails, {foreignKey: 'ProductId'});
SalesDetails.belongsTo(Product, {foreignKey: 'ProductId'});
User.hasMany(PurchaseHeader, {foreignKey: 'UserId'});
Supplier.hasMany(PurchaseHeader, {foreignKey: 'SupplierId'});
PurchaseHeader.belongsTo(User, {foreignKey: 'UserId'});
PurchaseHeader.belongsTo(Supplier, {foreignKey: 'SupplierId'});
PurchaseHeader.hasMany(PurchaseDetails, {foreignKey: 'PurchaseId'});
PurchaseDetails.belongsTo(PurchaseHeader, {foreignKey: 'PurchaseId'});
Product.hasMany(PurchaseDetails, {foreignKey: 'ProductId'})
PurchaseDetails.belongsTo(Product, {foreignKey: 'ProductId'});
User.hasMany(ReturnHeader, {foreignKey: 'UserId'});
Customer.hasMany(ReturnHeader, {foreignKey: 'CustomerId'});
ReturnHeader.belongsTo(User, {foreignKey: 'UserId'});
ReturnHeader.belongsTo(Customer, {foreignKey: 'CustomerId'});
ReturnHeader.hasMany(ReturnDetails, {foreignKey: 'ReturnId'});
ReturnDetails.belongsTo(ReturnHeader, {foreignKey: 'ReturnId'});
ReturnDetails.belongsTo(Product, {foreignKey: 'ProductId'});

// PurchaseHeader.addHook('beforeCreate', (PurchaseHeader, Option) => {
//     PurchaseHeader.
// });

export default {User, Customer, Supplier, Product, SalesHeader, SalesDetails, PurchaseHeader, PurchaseDetails, ReturnHeader, ReturnDetails, OperatingCost};