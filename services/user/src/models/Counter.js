const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('counter', CounterSchema);

module.exports = Counter;

