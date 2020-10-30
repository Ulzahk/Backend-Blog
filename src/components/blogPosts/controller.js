const BlogPosts = require('./schema')

/**
 * Generates a meta string
 */
const generateMetaTitle = (title) =>{
  return title
    .toLowerCase()
    .replace(/ño/g, 'nio')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g,'-')
}

/**
 * Generetes an actual date string dd/mm/yyyy
 */
const generateCurrentDate = () =>{
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  if(month < 10) {
    return `${day}-0${month}-${year}`
  } else {
    return `${day}-${month}-${year}`
  }
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
  return await BlogPosts.findById(blogPostId)
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
    published_date: generateCurrentDate()
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
    published_date: blogPost.published_date
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
  deleteBlogPost,
  generateMetaTitle
}