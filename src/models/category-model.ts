import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: false,
    default: true,
  },
  color: {
    id: String,
    name: String,
    code: String,
  },
  icon: {
    id: String,
    name: String,
    symbol: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;