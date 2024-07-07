const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownersModel");
const stripe = require("stripe")(
  "sk_test_51PVwfV02WrcibP7nDYQ3DEEVLkeeSCTcJ0MyH8f2SGDb0iDLKjLjdsl8lF4F3E77zJyAJMD0uyJJXVNSCEPUOyKP00TETFMeku"
);

console.log(process.env.NODE_ENV);

// if (process.env.NODE_ENV == "development") {
router.post("/create", async function (req, res) {
  let owners = await ownerModel.find();
  let { fullname, email, password } = req.body;
  if (owners.length > 0)
    return res.status(500).send("You dont have access to create new owner");
  let createdowner = await ownerModel.create({
    fullname,
    email,
    password,
  });

  res.send(createdowner);
});
// }

router.get("/productcreate", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

router.get("/dashboard", async (req, res) => {
  try {
    // Fetch sold items and total amount received from Stripe
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    const soldItems = payments.data.filter(
      (payment) => payment.status === "succeeded"
    );
    const totalAmount = soldItems.reduce(
      (acc, payment) => acc + payment.amount_received,
      0
    );

    // Prepare data for Chart.js
    const chartData = {
      labels: soldItems.map((payment) =>
        new Date(payment.created * 1000).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Amount Received",
          data: soldItems.map((payment) => payment.amount_received / 100),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    res.render("dashboard", {
      owner: "ADMIN",
      payments: soldItems,
      totalAmount: totalAmount / 100,
      chartData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    req.flash("error", "Error fetching dashboard data.");
    res.redirect("/login");
  }
});

module.exports = router;
