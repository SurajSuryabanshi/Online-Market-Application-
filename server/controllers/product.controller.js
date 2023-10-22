
import Product from '../models/product.model.js';
import errorHandler from './error.controller.js';

const list = async (req, res) => {
  try {
    let products;
    if (req.query.name) {
      const name = req.query.name;
      products = await Product.find({ name: { $regex: name, $options: 'i' } });
    } else {
      products = await Product.find();
    }
    console.log("Products found:", products);
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.status(400).json({
        error: "Product not found",
      });
    req.product = product;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve product",
    });
  }
};

const read = async (req, res) => {
  res.json(req.product);
};

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    console.log("Product created:", product);
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  let product = req.product;
  product = Object.assign(product, req.body);
  product.updated = Date.now();
  try {
    await product.save();
    console.log("Product updated:", product);
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    const productId = req.params.productId; 
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
    console.log("Product deleted successfully");
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


const removeAll = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products removed successfully.' });
    console.log("All products removed succesfully");
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
// const productByName = async (req, res, next, name) => {
//   try {
//  let product = await Product.find({ name: { $regex: name, $options: 'i' } });
//     if (!product)
//       return res.status(400).json({
//         error: "Product not found",
//       });
//     req.product = product;
//     next();
//   } catch (err) {
//     return res.status(400).json({
//       error: "Could not retrieve product",
//     });
//   }
// };



export default { list, read, create, update, remove, removeAll, productByID };