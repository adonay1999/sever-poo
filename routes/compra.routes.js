const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
} = require("../middleware");

const {
  userByIdExist,
  CompraExistById
} = require("../helpers/db-validators");

const {
  getCompra,
  getCompraById,
  createCompra,
  updateCompra,
} = require("../controllers/compra.controller");

const router = Router();

router.get("/", getCompra);

router.get("/:id",
[
  check("id", "NO existe factura").isMongoId(),
  check("id").custom(CompraExistById),
  validateFields
],
 getCompraById);


router.post
("/",
  [
    validateJWT,
    check("date", "Fecha está vacía").not().isEmpty(),
    check("user", "Usuario está vacío").not().isEmpty(),
    check("user").custom(userByIdExist),
    check("total", "Total esta vacío").not().isEmpty().isNumeric(),
    validateFields


  ],
  createCompra);

router.put("/:id",
[
  validateJWT,
  check("id", "No existe factura").isMongoId(),
  check("id").custom(CompraExistById),
  check("date", "Fecha esta vacia").not().isEmpty(),
  check("user", "Usuario esta vacio").not().isEmpty(),
  check("user").custom(userByIdExist),
  check("total", "Total esta vacío").not().isEmpty().isNumeric(),
  validateFields
],


  updateCompra);


module.exports = router; 