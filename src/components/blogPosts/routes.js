const express = require('express')
const blogPostsController = require('./controller')

const postAPI = (api) => {
  const router = express.Router()
  api.use('/posts', router)

  router.get('/', async (req, res, next) => {
    try {
      const blogPosts = await blogPostsController.getBlogPosts()
      res.status(200).json({
        message: 'Blogposts listed',
        total_results: blogPosts.length,
        results: blogPosts
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:blogPostMetaTitle', async (req, res, next) => {
    try {
      const blogPost = await blogPostsController.getOneBlogPostByMetaTitle(req.params.blogPostMetaTitle)
      res.status(200).json({
        message: `Blogpost ${req.params.blogPostId} listed`,
        result: blogPost
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const metaTitle = blogPostsController.generateMetaTitle(req.body.title)
      const confirmBlogPostByMetaTittle = await blogPostsController.getOneBlogPostByMetaTitle(metaTitle)
      if(confirmBlogPostByMetaTittle !== null){
        res.status(400).json({
          message: 'Repeated blogpost\'s title'
        })
      } else {
        const blogPost = await blogPostsController.createBlogPost(req.body)
        res.status(201).json({
          message: 'Blogpost created',
          result: blogPost
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.patch('/:blogPostId', async (req, res, next) => {
    try {
      const blogPostId = req.params.blogPostId
      const metaTitle = req.body.title === undefined 
        ? req.body.title 
        : blogPostsController.generateMetaTitle(req.body.title)
      if(req.body.title !== undefined){
        const confirmBlogPostByMetaTittle = await blogPostsController.getOneBlogPostByMetaTitle(metaTitle)
        if(confirmBlogPostByMetaTittle !== null){
          res.status(400).json({
            message: 'Repeated blogpost\'s title'
          })
        } else {
          const blogPost = await blogPostsController.updateBlogPost(blogPostId, req.body)
          res.status(200).json({
            message: `Blogpost ${blogPostId} updated`,
            result: blogPost
          })
        }
      } else {
        const blogPost = await blogPostsController.updateBlogPost(blogPostId, req.body)
        res.status(200).json({
          message: `Blogpost ${blogPostId} updated`,
          result: blogPost
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:blogPostId', async (req, res, next) => {
    try {
      const blogPostId = req.params.blogPostId
      await blogPostsController.deleteBlogPost(blogPostId)
      res.status(200).json({
        message: `Blogpost ${blogPostId} deleted`
      })
    } catch (error) {
      next(erro)
    }
  })
}

module.exports = postAPI