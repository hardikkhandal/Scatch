const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const router = express();
const jwt = require("jsonwebtoken");

router.get("/", async function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success");

  // Check for the presence of the token
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      // Find the user by email
      let user = await userModel
        .findOne({ email: decoded.email })
        .populate("cart");

      let products = await productModel.find();
      // If user is found, render the shop page
      if (user) {
        return res.render("shop", { user, success, products, loggedin: true });
      }
    } catch (err) {
      // If token verification fails, continue to render the index page
      console.error("Token verification failed:", err);
    }
  }

  // If no token or verification fails, render the index page
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  const finalprice =
    Number(user.cart[0].price + 20) - Number(user.cart[0].discount);
  // console.log(user.cart);

  res.render("cart", { user, finalprice });
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added to cart successfully");
  res.redirect("/shop");
});

module.exports = router;
