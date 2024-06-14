const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title: { type: String, required: true },
  shapes: [String],
}, { timestamps: true });

const Project = mongoose.model('project', projectSchema);

module.exports = Project;

