const { Schema, model } = require("mongoose");

const DetalleCompraSchema = Schema({
  productoUnit: {
    type: Number,
    require:true,
  },
  producto:{
    type:Schema.Types.ObjectId,
    ref:"Producto",
    require: true,
  },

  compra:{
    type:Schema.Types.ObjectId,
    ref:"Compra",
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  producoTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

DetalleCompraSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("DetalleCompra", DetalleCompraSchema); 