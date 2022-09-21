const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller") ;

router.get("/getSitemap", taskController.getSitemap);


module.exports = router;