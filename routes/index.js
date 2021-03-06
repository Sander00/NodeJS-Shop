var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
require('dotenv').config();

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        res.render('shop/index', {title: 'Express', products: docs, successMsg: successMsg, noMessages: !successMsg});
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shopping-cart');
    });
});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {
        total: cart.totalPrice,
        products: cart.generateArray(),
        errMsg: errMsg,
        noErrorMsg: !errMsg
    });
});

router.get('/charge', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    if (!req.query.source) {
        return res.redirect('/checkout');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(process.env.STRIPE_PRIV);

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "eur",
        source: req.query.source, // obtained with Stripe.js
        description: "Charge for products"
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }

        var order = new Order({
            user: req.user,
            cart: cart,
            name: charge.source.owner.name,
            address: charge.source.owner.address.line1,
            paymentId: charge.id
        });

        order.save(function (err, result) {
            req.flash('success', 'Successfully bought products!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}