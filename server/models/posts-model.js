const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
      text: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  }],
  deleted: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = model('Post', postSchema)