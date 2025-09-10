const express = require("express");
const { createCart, getCart,deleteCart,buynowcart} = require("../controllers/cartController");
const router = express.Router();

router.post("/buynow/:id",buynowcart);
router.post("/",createCart);
router.get("/",getCart);
router.delete("/:id",deleteCart);


 module.exports = router;
