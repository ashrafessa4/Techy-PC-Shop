const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const logger = require("./middlewares/logger");
const register = require("./routes/register");
const login = require("./routes/login");
const users = require("./routes/users");
const products = require("./routes/products");
const cart = require("./routes/cart");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Logger
app.use(logger);

// DB Connection
mongoose
  .connect(process.env.dbConnect, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Cannot connect to server"));

// End Points
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/", users);
app.use("/api/check-email", users);
app.use("/api/products", products);
app.use("/api/carts", cart);
app.use("/api/carts/delete-product", cart);

app.listen(PORT, () => console.log("Server started on port", PORT));
