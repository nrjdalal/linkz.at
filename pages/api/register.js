const axios = require('axios')
const Joi = require('joi')

const { shuffler } = require('utils/shuffler')

export default async (req, res) => {
  let body, schema, data, response, token

  body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  // validating inputs
  schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  })

  data = schema.validate(body)

  if (typeof data.error !== 'undefined') {
    res.status(400).send(data.error.details[0].message)
    return
  }

  // getting token
  try {
    data = {
      identifier: process.env.WORKER_USERNAME,
      password: process.env.WORKER_PASSWORD,
    }

    response = await axios({
      method: 'POST',
      url: 'http://localhost:1337/auth/local',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })

    if (response.status === 200 && typeof response.data.jwt === 'string') {
      token = response.data.jwt
    }
  } catch (error) {
    res.status(error.response.status).send(error.response.statusText)
    return
  }

  // checking if username exists
  try {
    response = await axios({
      method: 'GET',
      url: `http://localhost:1337/accounts?username=${body.username}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (Array.isArray(response.data) && response.data.length !== 0) {
      res.status(400).send('username already exists')
      return
    }
  } catch (error) {
    res.status(error.response.status).send(error.response.statusText)
    return
  }

  // checking if email exists
  try {
    response = await axios({
      method: 'GET',
      url: `http://localhost:1337/accounts?email=${body.email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (Array.isArray(response.data) && response.data.length !== 0) {
      res.status(400).send('email already exists')
      return
    }
  } catch (error) {
    res.status(error.response.status).send(error.response.statusText)
    return
  }

  // creating new user
  try {
    body['pid'] = new Date().getTime() + '-' + shuffler(6)

    data = body

    response = await axios({
      method: 'POST',
      url: 'http://localhost:1337/accounts',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })

    console.log(response.data)
  } catch (error) {
    // console.log(error.response)

    res.status(error.response.status).send(error.response.statusText)
    return
  }
}
