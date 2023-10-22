import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});

export default mongoose.model('Category', categorySchema);
