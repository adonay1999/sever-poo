const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
} = require("../middleware");

const {
  userByIdExist,
  DetalleCompraExistById
} = require("../helpers/db-validators");

const {
  getDetalleCompra,
  getDetalleCompraById,
  createDetalleCompra,
  updateDetalleCompra,
} = require("../controllers/detallecompra.controller");

const router = Router();

router.get("/", getDetalleCompra);

router.get("/:id",
[
  check("id", "NO existe detalle compra").isMongoId(),
  check("id").custom(DetalleCompraExistById),
  validateFields
],
 getDetalleCompraById);


router.post
("/",
  [
    validateJWT,
    check("productoUnit", "Precio unitario está vacía").not().isEmpty(),
    check("user", "Usuario está vacío").not().isEmpty(),
    check("user").custom(userByIdExist),
    check("producoTotal", "Producto otal esta vacío").not().isEmpty().isNumeric(),
    validateFields
  ],
  createDetalleCompra);

router.put("/:id",
[
  validateJWT,
  check("id", "No existe detalle id").isMongoId(),
  check("id").custom(DetalleCompraExistById),
  check("productoUnit", "Producto unitario esta vacia").not().isEmpty(),
  check("user", "Usuario esta vacio").not().isEmpty(),
  check("user").custom(userByIdExist),
  check("productototal", "Producto total esta vacío").not().isEmpty().isNumeric(),
  validateFields
],
  updateDetalleCompra);


module.exports = router; 