import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

const index = () => {
  const emptyForm = {
    username: '',
    email: '',
    password: '',
  }

  const [formValues, setFormValues] = useState(emptyForm)

  const register = async (e) => {
    e.preventDefault()

    try {
      const axr = await axios({
        method: 'post',
        url: '/api/register',
        data: formValues,
      })

      console.log(axr)
    } catch (error) {
      setMessage(error.response.data)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  const [message, setMessage] = useState('')

  const Message = () => {
    if (message !== '') {
      return (
        <>
          <div className="mt-2 text-xs text-center text-red-500">{message}</div>
        </>
      )
    } else
      return <div className="mt-2 text-xs text-center text-red-500">&nbsp;</div>
  }

  return (
    <>
      <div className="flex flex-col justify-center h-screen max-w-xl px-4 mx-auto">
        <form onSubmit={(e) => register(e)}>
          <input
            className="mt-4"
            type="text"
            placeholder="Username"
            value={formValues.username}
            onChange={(e) => {
              setFormValues((pre) => ({ ...pre, username: e.target.value }))
            }}
          />
          <input
            className="mt-4"
            type="text"
            placeholder="Email"
            value={formValues.email}
            onChange={(e) => {
              setFormValues((pre) => ({ ...pre, email: e.target.value }))
            }}
          />
          <input
            className="mt-4"
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(e) => {
              setFormValues((pre) => ({ ...pre, password: e.target.value }))
            }}
          />
          <Message />
          <button
            className="w-full py-2 mt-4 text-center bg-gray-300 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="flex">
          <Link href="/">
            <div className="w-full py-2 mt-4 mr-2 text-center bg-gray-300 rounded-lg cursor-pointer">
              Home
            </div>
          </Link>

          <Link href="/login">
            <div className="w-full py-2 mt-4 ml-2 text-center bg-gray-300 rounded-lg cursor-pointer">
              Login
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default index
