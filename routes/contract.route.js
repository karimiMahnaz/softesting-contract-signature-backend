const express = require("express");
const router = express.Router();

const ContractController = require("../controllers/contract.controller") ;

router.post("/",ContractController.contract);
router.post("/updateContract",ContractController.updateContract);
router.get("/getContracts",ContractController.getContracts);
router.get("/readContractBase64",ContractController.readContractBase64);
router.get("/readContractBuffer",ContractController.readContractBuffer);
router.post("/writeContract",ContractController.writeContract);

module.exports = router;
