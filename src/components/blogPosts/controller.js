const BlogPosts = require('./schema')

/**
 * Generates a meta string
 */
const generateMetaTitle = (title) =>{
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/cumpleano/g, 'cumpleanio')
    .replace(/\s+ano\s+/g, ' anio')
    .replace(/\s+anos\s+/g, ' anios')
    .replace(/\s+/g,'-')
    .trim()
}
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
 * Brings one blopost record by meta_title
 */
const getOneBlogPostByMetaTitle = async (blogPostMetaTitle) => {
  return await BlogPosts.findOne({meta_title: blogPostMetaTitle})
}
/**
 * Creates one BlogPost record
 */
const createBlogPost = async (blogPost) => {
  blogPostData = {
    title: blogPost.title.trim(),
    meta_title: generateMetaTitle(blogPost.title),
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
    title: blogPost.title === undefined ? blogPost.title : blogPost.title.trim(),
    meta_title: blogPost.title === undefined ? blogPost.title : generateMetaTitle(blogPost.title),
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
  getOneBlogPostByMetaTitle,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}