const axios = require('axios')
const Joi = require('joi')

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

  console.log(token)
}
