require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");
const PORT = process.env.PORT || 8000


app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT,()=>{
    console.log(`Server running at port no ${PORT}`)
})