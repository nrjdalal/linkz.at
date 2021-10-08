import Link from 'next/link'

const index = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen max-w-xl px-4 mx-auto">
        <form>
          <input className="mt-4" type="text" placeholder="Username / Email" />
          <input className="mt-4" type="password" placeholder="Password" />
          <div className="w-full py-2 mt-4 text-center bg-gray-300 rounded-lg cursor-pointer">
            Login
          </div>
        </form>

        <div className="flex">
          <Link href="/">
            <div className="w-full py-2 mt-4 mr-2 text-center bg-gray-300 rounded-lg cursor-pointer">
              Home
            </div>
          </Link>

          <Link href="/register">
            <div className="w-full py-2 mt-4 ml-2 text-center bg-gray-300 rounded-lg cursor-pointer">
              Register
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default index
