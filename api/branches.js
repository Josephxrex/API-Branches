const BranchesController = require("../controller/branches");
const express = require("express");
const router = express.Router();

// All Branches Route
router.get("/all", BranchesController.findAllGeoBranches);
// Add New Branch
router.put("/add",BranchesController.addUBranch);
// Delete New Branch
router.post("/removebyid/:id", BranchesController.removeById);

module.exports = router;
