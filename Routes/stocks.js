const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const requireLogin = require("../Authentication/requireLogin");

//Adding warehouse qauntity
router.post("/addwarehouse",requireLogin,(req,res) => {

    User.findById(req.user._id)
    .then((user) => {
        user.warehouseNo = req.body.warehouseNo;
        
        user.save()
        .then((user) => {
            res.status(200).json(user)
        }).catch((err) => {
            res.json(err);
        })
    }).catch((err) => {
        res.json(err);
    })
})

//Update Warehouse quantity 
router.post("/updatewarehouse",requireLogin,(req,res) => {

    User.findById(req.user._id)
    .then((user) => {
        user.warehouseNo = req.body.warehouseNo;
        
        user.save()
        .then((user) => {
            res.status(200).json(user)
        }).catch((err) => {
            res.json(err);
        })
    }).catch((err) => {
        res.json(err);
    })
})

//Pushing the stockData to the users srray
// Post /stocks/update
// @Protected
router.post("/create",requireLogin,(req,res) => {
   
    User.findByIdAndUpdate(req.user._id,{
        $push : {
            stockData : req.body
        }},{
            new : true,
            runValidators: true
        }).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(422).json(err);
        })
    })

//Updating a particular stock item
// Post /stocks/update
// @Protected

router.post("/update",requireLogin,(req,res) => {
    const {_id,name,quantity,price,stockOwner} = req.body;

    const stockData = {
        _id,
        name,
        quantity,
        price,
        stockOwner
    }

    User.findById(req.user._id)
    .then((user) => {
        index = user.stockData.findIndex((stock => 
            stock._id == req.body._id
        ))
        user.stockData[index] = stockData;       
        user.save()
        .then((user) => {
            res.json(user);
        })
    }).catch((err) => {
        res.json(err);
    })
})

//Deleting a particular stock item
// Post /stocks/delete
// @Protected
router.post("/delete",requireLogin,(req,res) => {
    User.findById(req.user._id)
    .then((user) => {
        index = user.stockData.findIndex((stock => 
            stock._id == req.body._id
        ))
        console.log(index);
        // delete user.StockData[index];
        (user.stockData[index]._id).toString = "";
        user.stockData[index].name = "";
        user.stockData[index].price = "";
        user.stockData[index].quantity = "";

        console.log(user);
        user.save()
        .then((user) => {
            res.status(200).json(user);
        })
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;