const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogPosts = new Schema({
  title: { type: String, required: true },
  meta_title: { type: String, required: true },
  cover: { type: String, required: true },
  main_paragraph: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: 'Users'},
  category: { type: String, required: true },
  published_date: { type: String, required: true }
})

module.exports = mongoose.model('BlogPosts', BlogPosts)
