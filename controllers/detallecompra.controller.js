const { response, request } = require("express");
const DetalleCompra = require("../models/detallecompra.model");


const getDetalleCompra = async (req, res = response) => {
  const query = { status: true };
  const [products, producoTotal] = await Promise.all([
    DetalleCompra.find(query)
      .populate("compra")
      .populate("producto")
      .populate("user"),
    DetalleCompra.countDocuments(query),
  ]);

  res.status(200).json({
    producoTotal,
    products,
  });
};

const getDetalleCompraById = async (req = request, res = response) => {
  const { id } = req.params;
  const detallecompra = await DetalleCompra.findById(id)
    .populate("producto")
    .populate("compra")
    .populate("user");

    
  res.status(200).json(detallecompra);
};

const createDetalleCompra = async (req, res = response) => {
  const { productoUnit, user, productototal } = req.body;

  const data = {
    productoUnit: productoUnit,
    user: user,
    prdutototal: productototal
  };

  const detallecompra = new DetalleCompra(data);
  await detallecompra.save();
  res.status(200).json(detallecompra);
};

const updateDetalleCompra = async (req, res) => {
  const { id } = req.params;
  const { productoUnit, user, productototal } = req.body;

  const data = {
    productoUnit: productoUnit,
    user: user,
    productototal: productototal
  };


  const detallecompra = await DetalleCompra.findByIdAndUpdate(id, data);

  res.json(detallecompra);
};


module.exports = {
  getDetalleCompra,
  getDetalleCompraById,
  createDetalleCompra,
  updateDetalleCompra,
};