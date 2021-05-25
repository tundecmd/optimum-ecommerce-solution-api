const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
//const bodyParser = require("body-parser");

//app.use(bodyParser())

app.use(express.json());
// routes
const authRoutes = require("./routes/auth");

app.use("/api", authRoutes)


mongoose
        .connect("mongodb+srv://optimum-ecommerce-root:startnow@optimum-ecommerce.krxer.mongodb.net/optimum-ecommerce-root?retryWrites=true&w=majority", 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        ).then(() => {
            console.log(`Database connected!!!`)
        }).catch(e => {
            console.log(`Not connected to the database ===>`, e)
        })


// app.get("/", (req, res, next) => {
//     res.status(200).json({
//         message: "Hello from server"
//     });
// })

// app.post("/", (req, res, next) => {
//     res.status(200).json({
//         message: req.body
//     });
// })

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})