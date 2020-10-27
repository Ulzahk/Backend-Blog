const BlogPosts = require('./schema')

/**
 * Brings all blogPosts records
 */
const getBlogPosts = async () => {
  return await BlogPosts.find({})
}
/**
 * Brings one blogPost record
 */
const getOneBlogPost = async (blogPostId) => {
  return await BlogPosts.findById(blogPostId).populate('author')
}
/**
 * Creates one BlogPost record
 */
const createBlogPost = async (blogPost) => {
  blogPostData = {
    title: blogPost.title,
    meta_title: blogPost.title,
    cover: blogPost.cover,
    main_paragraph: blogPost.main_paragraph,
    content: blogPost.content,
    author: blogPost.author,
    category: blogPost.category,
    published_date: blogPost.published_date
  }
  return await BlogPosts.create(blogPostData)
}
/**
 * Updates one blogPost record
 */
const updateBlogPost = async (blogPostId, blogPost) => {
  blogPostChanges = {
    title: blogPost.title,
    meta_title: blogPost.meta_title,
    cover: blogPost.cover,
    main_paragraph: blogPost.main_paragraph,
    content: blogPost.content,
    author: blogPost.author,
    category: blogPost.category,
    published_date: blogPost.date
  }
  await BlogPosts.findByIdAndUpdate(
    blogPostId,
    { $set: blogPostChanges },
    { omitUndefined: true }
  )
  return await BlogPosts.findById(blogPostId)
}
/**
 * Deletes one BlogPost record
 */
const deleteBlogPost = async (blogPostId) => {
  await BlogPosts.findByIdAndDelete(blogPostId)
}

module.exports = {
  getBlogPosts,
  getOneBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}