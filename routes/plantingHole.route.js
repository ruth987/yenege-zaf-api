const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    createHole,
    getAllHoles,
    getHole,
    updateHole,
    deleteHole
} = require("../controllers/plantingHole.controller");

router.post("/", auth, createHole);

router.get("/", auth, getAllHoles);

router.get("/:id", auth, getHole);

router.delete("/:id", auth, deleteHole);

router.put("/:id", auth, updateHole);

module.exports = router;
