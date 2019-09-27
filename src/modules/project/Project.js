import { model, Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  ideas: [{
    title: { type: String, required: true },
    description: String,
  }],
}, {
  timestamps: true,
});

export default model('Project', ProjectSchema);
