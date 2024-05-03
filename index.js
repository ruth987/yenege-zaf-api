require("dotenv").config();
require("./config/db").connect();
const express = require("express");

const app = express();
const authRoutes = require('./routes/auth.route');
const protectedRoute = require('./routes/protected.route');
const userRoute = require('./routes/user.route');
const plantingHoleRoute = require('./routes/plantingHole.route');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/users', userRoute);
app.use("/holes",plantingHoleRoute)

app.get("/", (req, res) => {
  res.send("Hello from your Node.js project!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



