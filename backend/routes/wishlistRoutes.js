const express = require("express");
const { createWishlist, getWishlist,deleteWishlist,buynowWishlist} = require("../controllers/wishlistController");
// const { deleteWishlist } = require("../controllers/wishlistController");
const router = express.Router();

// router.post("/buynow/:id",buynowWishlist);
router.post("/",createWishlist);
router.get("/",getWishlist);
router.delete("/:id",deleteWishlist);


 module.exports = router;





 