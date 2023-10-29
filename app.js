
const express = require("express");

const app = express();

const port = process.env.PORT || 4500;

const userRoute = require("./routes/userRoutes");


app.use(express.json());

app.use(userRoute);

app.listen(port,(req,res)=>{

    console.log(`successfully running on the port no. ${port}`);

})