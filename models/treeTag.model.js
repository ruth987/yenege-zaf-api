const mongoose = require('mongoose');
const { Schema } = mongoose;

const treeTagsSchema = new Schema({
  planting_hole_id: {
    type: Schema.Types.ObjectId,
    ref: 'PlantingHole',
    required: true,
  },
  tag_number: {
    type: String,
    required: true,
    unique: true,
  },
});

const TreeTag = mongoose.model('TreeTag', treeTagsSchema);

module.exports = TreeTag;