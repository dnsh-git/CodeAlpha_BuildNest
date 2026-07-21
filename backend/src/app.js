const errorHandler = require("./middleware/error.middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BuildNest API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = app;