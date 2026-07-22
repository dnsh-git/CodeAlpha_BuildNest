const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

// =====================
// Middlewares
// =====================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// =====================
// Health Check
// =====================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BuildNest API is running",
    });
});

// =====================
// API Routes
// =====================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", reviewRoutes);

// =====================
// Error Handler
// =====================

app.use(errorHandler);

module.exports = app;