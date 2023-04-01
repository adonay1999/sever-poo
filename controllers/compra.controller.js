const { response, request } = require("express");
const Compra = require("../models/compra.model");


const getCompra = async (req, res = response) => {
  const query = { status: true };
  const [products, total] = await Promise.all([
    Compra.find(query)
      .populate("user"),
    Compra.countDocuments(query),
  ]);

  res.status(200).json({
    total,
    products,
  });
};

const getCompraById = async (req = request, res = response) => {
  const { id } = req.params;
  const compra = await Compra.findById(id)
    .populate("user");
    
  res.status(200).json(compra);
};

const createCompra = async (req, res = response) => {
  const { date, user, total } = req.body;

  const data = {
    date: date,
    user: user,
    total: total
  };

  const compra = new Compra(data);
  await compra.save();
  res.status(200).json(compra);
};

const updateCompra = async (req, res) => {
  const { id } = req.params;
  const { date, user, total } = req.body;

  const data = {
    date: date,
    user: user,
    total: total
  };


  const compra = await Compra.findByIdAndUpdate(id, data);

  res.json(compra);
};


module.exports = {
  getCompra,
  getCompraById,
  createCompra,
  updateCompra,
};