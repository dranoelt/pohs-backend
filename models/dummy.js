import Controller from './storeModels.js'

function addDummy () {
    Controller.User.bulkCreate([
        { UserName: 'leo', UserEmail: 'testing@gmail.com', UserPassword: '$2a$10$1djFzF266x1ksX9C5HN1VOiO4do/ndi6ejY31tGBLLJZZb0M0LySa' },
        { UserName: 'hei', UserEmail: 'a@a', UserPassword: '$2a$10$1djFzF266x1ksX9C5HN1VOiO4do/ndi6ejY31tGBLLJZZb0M0LySa' }
    ]);

    Controller.Customer.bulkCreate([
        { UserId: '1', Name: 'Sun Bin Lee', Address: 'Jl. Seoul', City: 'Incheon', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Gwang Soo Lee', Address: 'Jl. Seoul', City: 'Seoul', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Ji Eun Lee', Address: 'Jl. Seoul', City: 'Seoul', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Ji Geum Lee', Address: 'Jl. Seoul', City: 'Seoul', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Catrine', Address: 'Jl. Idk', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Rizky', Address: 'Jl. Tanjung', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Felix', Address: 'Jl. Sutomo', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Pieter', Address: 'Jl. Krakatau', City: 'Medan', Number: '0859', Status: 1 },
        { UserId: '1', Name: 'Wallace', Address: 'Jl. Gak tau', City: 'Medan', Number: '0859', Status: 1 },
        { UserId: '1', Name: 'Williem', Address: 'Jl. Timor', City: 'Medan', Number: '0859', Status: 0 }
        
    ]);

    Controller.Supplier.bulkCreate([
        { UserId: '1', Name: 'FDE', Company: 'WHO', Address: 'Jl. Tanjung Raya', City: 'Jakarta', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Ferdinand', Company: 'Nvidia', Address: 'Jl. Aksara', City: 'Jepang', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Wilson', Company: 'AMD', Address: 'Jl. Marelan', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Jonathan', Company: 'Intel', Address: 'Jl. Zein Hamid', City: 'Medan', Number: '0859', Status: 1 },
        { UserId: '1', Name: 'Freddy', Company: 'Gigabyte', Address: 'Jl. Sekip', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Jesslyn', Company: 'Apple', Address: 'Jl. Zein Hamid', City: 'Medan', Number: '0859', Status: 0 },
        { UserId: '1', Name: 'Kavenggy', Company: 'Samsung', Address: 'Jl. Wahidin', City: 'Medan', Number: '0859', Status: 1 }
    ]);

    Controller.Product.bulkCreate([
        { UserId: '1', Name: 'R/L 26cm', Company: '', Qty: 30, MovingPrice: 66500, SalesPrice: 87900, Status: 1 },
        { UserId: '1', Name: 'R/L 33cm', Company: '', Qty: 30, MovingPrice: 100000, SalesPrice: 129000, Status: 1 },
        { UserId: '1', Name: 'R/L 26cm Warna RGB', Company: '', Qty: 30, MovingPrice: 90000, SalesPrice: 129000, Status: 1 },
        { UserId: '1', Name: 'Tripod mini 3107', Company: '', Qty: 30, MovingPrice: 12500, SalesPrice: 19000, Status: 1 },
        { UserId: '1', Name: 'Tripod 3110', Company: '', Qty: 30, MovingPrice: 28000, SalesPrice: 38000, Status: 1 },
        { UserId: '1', Name: 'Topi Kipas', Company: '', Qty: 30, MovingPrice: 72500, SalesPrice: 85000, Status: 1 },
        { UserId: '1', Name: 'Mini hot pot shabu', Company: '', Qty: 30, MovingPrice: 117000, SalesPrice: 139000, Status: 1 },
        { UserId: '1', Name: 'Thermometer H2O', Company: '', Qty: 30, MovingPrice: 39500, SalesPrice: 67000, Status: 1 },
        { UserId: '1', Name: 'Mixer Hong Xin', Company: '', Qty: 30, MovingPrice: 7000, SalesPrice: 9000, Status: 1 },
        { UserId: '1', Name: 'Catok Rambut Nova', Company: '', Qty: 30, MovingPrice: 33500, SalesPrice: 48000, Status: 1 },
        { UserId: '1', Name: 'Botol minum P67', Company: '', Qty: 30, MovingPrice: 14000, SalesPrice: 22500, Status: 1 },
        { UserId: '1', Name: 'Bell Rumah', Company: '', Qty: 30, MovingPrice: 28000, SalesPrice: 36500, Status: 1 },
        { UserId: '1', Name: 'Meat Grender', Company: '', Qty: 30, MovingPrice: 70500, SalesPrice: 89000, Status: 1 },
        { UserId: '1', Name: 'Speaker JPJ 668', Company: '', Qty: 30, MovingPrice: 49500, SalesPrice: 64000, Status: 1 },
        { UserId: '1', Name: 'Phone Bunga Holder', Company: '', Qty: 30, MovingPrice: 3500, SalesPrice: 7000, Status: 1 },
        { UserId: '1', Name: 'Solar B 30 LED', Company: '', Qty: 30, MovingPrice: 18000, SalesPrice: 25500, Status: 1 },
        { UserId: '1', Name: 'Headlamp LED', Company: '', Qty: 30, MovingPrice: 20500, SalesPrice: 29000, Status: 1 },
        { UserId: '1', Name: 'Botol Minum Hello P30', Company: '', Qty: 30, MovingPrice: 9000, SalesPrice: 17000, Status: 1 },
        { UserId: '1', Name: 'Humidifier New', Company: '', Qty: 30, MovingPrice: 41000, SalesPrice: 59500, Status: 1 },
        { UserId: '1', Name: 'Speaker MH 38 BT', Company: '', Qty: 30, MovingPrice: 72500, SalesPrice: 87500, Status: 1 }
    ]);

    // Controller.Product.bulkCreate([
    //     { UserId: '1', Name: 'R/L 26cm' },
    //     { UserId: '1', Name: 'R/L 33cm' },
    //     { UserId: '1', Name: 'R/L 26cm Warna RGB' },
    //     { UserId: '1', Name: 'Tripod mini 3107' },
    //     { UserId: '1', Name: 'Tripod 3110' },
    //     { UserId: '1', Name: 'Topi Kipas' },
    //     { UserId: '1', Name: 'Mini hot pot shabu' },
    //     { UserId: '1', Name: 'Thermometer H2O' },
    //     { UserId: '1', Name: 'Mixer Hong Xin' },
    //     { UserId: '1', Name: 'Catok Rambut Nova' },
    //     { UserId: '1', Name: 'Botol minum P67' },
    //     { UserId: '1', Name: 'Bell Rumah' },
    //     { UserId: '1', Name: 'Meat Grender' },
    //     { UserId: '1', Name: 'Speaker JPJ 668' },
    //     { UserId: '1', Name: 'Phone Bunga Holder' },
    //     { UserId: '1', Name: 'Solar B 30 LED' },
    //     { UserId: '1', Name: 'Headlamp LED' },
    //     { UserId: '1', Name: 'Botol Minum Hello P30' },
    //     { UserId: '1', Name: 'Humidifier New' },
    //     { UserId: '1', Name: 'Speaker MH 38 BT' }
    // ])
    // Controller.Product.bulkCreate([
    //     { UserId: '1', Name: 'Nvidia RTX 3060 Ti', Company: 'Nvidia', Qty: 10, SalesPrice: 10000, MovingPrice: 5000, Status: 1 },
    //     { UserId: '1', Name: 'Nvidia RTX 3070', Company: 'Nvidia', Qty: 10, SalesPrice: 10000, MovingPrice: 5000, Status: 1 },
    //     { UserId: '1', Name: 'Samsung 850 EVO 512GB SSD NVME M.2', Company: 'Samsung', Qty: 10, SalesPrice: 10000, MovingPrice: 5000, Status: 1 },
    //     { UserId: '1', Name: 'Samsung 850 EVO 1TB SSD NVME M.2', Company: 'Samsung', Qty: 10, SalesPrice: 10000, MovingPrice: 5000, Status: 1 },
    //     { UserId: '1', Name: 'IPhone 13 Pro Max 128GB Silver', Company: 'Apple', Qty: 10, SalesPrice: 15600000, MovingPrice: 18700000, Status: 1 },
    //     { UserId: '1', Name: "Nvidia RTX 3080", Company: 'Nvidia', Qty: 10, SalesPrice: 9000000, MovingPrice: 87777321, Status: 0 },
    //     { UserId: '1', Name: "Intel I5 - 12600K", Company: 'Nvidia', Qty: 5, SalesPrice: 4500000, MovingPrice: 5000000, Status: 1 },
    //     { UserId: '1', Name: "Asus ROG", Company: 'Nvidia', Qty: 7, SalesPrice: 4000000, MovingPrice: 5500000, Status: 1 },
    //     { UserId: '1', Name: "Nvidia RTX 3080", Company: 'Nvidia', Qty: 10, SalesPrice: 9000000, MovingPrice: 12000000, Status: 1 },
    //     { UserId: '1', Name: "Samsung", Company: 'Nvidia', Qty: 20, SalesPrice: 1000000, MovingPrice: 2500000, Status: 0 },
    //     { UserId: '1', Name: "Asus ROG", Company: 'Nvidia', Qty: 7, SalesPrice: 4000000, MovingPrice: 5500000, Status: 0 },
    //     { UserId: '1', Name: 'IPhone 13 Pro Max 256GB Silver', Company: 'Apple', Qty: 10, SalesPrice: 16500000, MovingPrice: 19600000, Status: 1 }
    // ])
    Controller.PurchaseHeader.bulkCreate([
        { PurchaseId: '042207010001' ,UserId: '1', SupplierId: '1', PurchaseDate: '2022-07-01 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, purchasedetails: [
            { ProductId: '1', PurchasePrice: 100000, SalesPrice: 120000, Qty: 2},
            { ProductId: '2', PurchasePrice: 100000, SalesPrice: 120000, Qty: 2}
        ]  },
        { PurchaseId: '042207010002' ,UserId: '1', SupplierId: '2', PurchaseDate: '2022-07-01 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 340000, Amount: 340000, Remain: 0, Status: 1, purchasedetails: [
            { ProductId: '3', PurchasePrice: 120000, SalesPrice: 140000, Qty: 2},
            { ProductId: '4', PurchasePrice: 50000, SalesPrice: 70000, Qty: 2}
        ]  },
        { PurchaseId: '042207050001' ,UserId: '1', SupplierId: '3', PurchaseDate: '2022-07-05 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 420000, Amount: 420000, Remain: 0, Status: 1, purchasedetails: [
            { ProductId: '5', PurchasePrice: 60000, SalesPrice: 80000, Qty: 2},
            { ProductId: '6', PurchasePrice: 150000, SalesPrice: 180000, Qty: 2}
        ]  },
        { PurchaseId: '042207080001' ,UserId: '1', SupplierId: '2', PurchaseDate: '2022-07-08 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 570000, Amount: 570000, Remain: 0, Status: 1, purchasedetails: [
            { ProductId: '3', PurchasePrice: 120000, SalesPrice: 120000, Qty: 2},
            { ProductId: '4', PurchasePrice: 50000, SalesPrice: 70000, Qty: 2},
            { ProductId: '7', PurchasePrice: 40000, SalesPrice: 50000, Qty: 2},
            { ProductId: '8', PurchasePrice: 75000, SalesPrice: 90000, Qty: 2}
        ]  },
        { PurchaseId: '042207080002' ,UserId: '1', SupplierId: '4', PurchaseDate: '2022-07-08 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 550000, Amount: 550000, Remain: 0, Status: 1, purchasedetails: [
            { ProductId: '9', PurchasePrice: 55000, SalesPrice: 70000, Qty: 10}
        ]  }
    ], { include: Controller.PurchaseDetails});

    Controller.SalesHeader.bulkCreate([
        { SalesId: '052207010001', UserId: '1', CustomerId: '1', SalesDate: '2022-07-01 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207010002', UserId: '1', CustomerId: '2', SalesDate: '2022-07-01 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207010003', UserId: '1', CustomerId: '3', SalesDate: '2022-07-01 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207070001', UserId: '1', CustomerId: '4', SalesDate: '2022-07-07 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207080001', UserId: '1', CustomerId: '2', SalesDate: '2022-07-08 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207110001', UserId: '1', CustomerId: '2', SalesDate: '2022-07-11 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]},
        { SalesId: '052207120001', UserId: '1', CustomerId: '5', SalesDate: '2022-07-12 00:00:00', PaymentMethod: "CASH", TotalItem: 5, TotalPrice: 400000, Amount: 400000, Remain: 0, Status: 1, salesdetails: [
            { ProductId: '1', MovingPrice: 100000, SalesPrice: 120000, Qty: 2}
        ]}
    ], { include: Controller.SalesDetails})
}

export default addDummy;