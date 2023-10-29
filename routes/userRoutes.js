
const express = require("express");

const router = express.Router();

const multer = require("multer");

const multerParse = multer();


const {addUser,loginUser} = require("../controllers/userController");


router.post("/addUser", multerParse.none(), addUser);

router.post("/loginUser", multerParse.none(), loginUser);


module.exports = router;