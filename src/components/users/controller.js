const Users = require('./schema')
const bcrypt = require('bcrypt')

/**
 * Brings all users records
 */
const getUsers = async () => {
  return await Users.find({})
}
/**
 * Brings one user record by Id
 */
const getOneUserById = async (userId) => {
  return await Users.findById(userId)
}
/**
 * Brings one user record by email
 */
const getOneUserByEmail = async (userEmail) => {
  const lowerCaseEmail = userEmail === null ? userEmail : userEmail.toLowerCase()
  return await Users.findOne({ email: lowerCaseEmail })
}
/**
 * Creates one user record
 */
const createUser = async (user) => {
  const userData = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email.toLowerCase(),
    password: await bcrypt.hash(user.password, 10),
    description: user.description || '',
    website: user.website || '',
    twitter: user.twitter || '',
    profile_picture: user.profile_picture || 'https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg'
  }
  return await Users.create(userData)
}
/**
 * Updates one user record
 */
const updateUser = async (userId, user) => {
  const userChanges = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email:
      user.email === undefined
        ? user.email
        : user.email.toLowerCase(),
    password:
      user.password === undefined
        ? user.password
        : await bcrypt.hash(user.password, 10),
    description: user.description,
    website: user.website,
    twitter: user.twitter,
    profile_picture: user.profile_picture
  }
  await Users.findByIdAndUpdate(
    userId,
    { $set: userChanges },
    { omitUndefined: true }
  )
  return await Users.findById(userId)
}
/**
 * Deletes one user record
 */
const deleteUser = async (userId) => {
  await Users.findByIdAndDelete(userId)
}

module.exports = {
  getUsers,
  getOneUserById,
  getOneUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
