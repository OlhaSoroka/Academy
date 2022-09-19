const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("./contollers");
const { checkIfAuthenticated } = require("./firebase/authCheck");
const multer = require("multer");
const { storage } = require("./cloudinary");

const upload = multer({ storage });

const router = express.Router();

router.post("/register", checkIfAuthenticated, registerUser);
router.post(
  "/update-user/:id",
  checkIfAuthenticated,
  upload.single("avatar"),
  updateUser
);
router.delete("/delete-user/:id", checkIfAuthenticated, deleteUser);
router.get("/get-all-users", checkIfAuthenticated, getAllUsers);
router.get("/get-user/:id", checkIfAuthenticated, getUser);

module.exports = router;
