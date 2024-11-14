const { default: mongoose } = require('mongoose');
const mongoode = require('mongoose');

const productSchema = new mongoose.Schema(
{
  product: {type: String,require:true},
  amount: { type: Number, require:true},
  satus: {type:String, require:true},
  category: {type:String, require:true},
  quantity: {type: String, require:true},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;