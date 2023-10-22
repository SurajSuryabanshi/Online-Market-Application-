import Category from '../models/category.model.js';
import errorHandler from './error.controller.js';

const list = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log("categoreis retireved succesfully");
    res.json(categories);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { list };
