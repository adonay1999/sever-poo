const { Schema, model } = require("mongoose");

const CompraSchema = Schema({
  date: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

CompraSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Compra", CompraSchema); 