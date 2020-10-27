const express = require('express')
const usersController = require('./controller')

const usersAPI = (api) => {
  const router = express.Router()
  api.use('/users', router)

  router.get('/', async (req, res, next) => {
    try {
      const users = await usersController.getUsers()
      res.status(200).json({
        message: 'Users listed',
        total_results: users.length,
        results: users
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:userId', async (req, res, next) => {
    try {
      const user = await usersController.getOneUserById(req.params.userId)
      res.status(200).json({
        message: `User ${user} listed`,
        result: user
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const confirmUserByEmail = await usersController.getOneUserByEmail(req.body.email)
      if (confirmUserByEmail !== null) {
        res.status(400).json({
          message: 'Invalid information'
        })
      } else {
        const user = await usersController.createUser(req.body)
        res.status(201).json({
          message: 'User created',
          result: user
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.patch('/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId
      const userBody = req.body
      if (req.body.email !== undefined) {
        const confirmUserByEmail = await usersController.getOneUserByEmail(req.body.email)
        if (confirmUserByEmail !== null) {
          res.status(400).json({
            message: 'Invalid information'
          })
        } else {
          const user = await usersController.updateUser(userId, userBody)
          res.status(200).json({
            message: `User ${userId} updated`,
            result: user
          })
        }
      } else {
        const user = await usersController.updateUser(userId, userBody)
        res.status(200).json({
          message: `User ${userId} updated`,
          result: user
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId
      await usersController.deleteUser(userId)
      res.status(200).json({
        message: `User ${userId} deleted`
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = usersAPI
