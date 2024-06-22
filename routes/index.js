const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const router = express();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products });
});

module.exports = router;
