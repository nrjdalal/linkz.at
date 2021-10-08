import Link from 'next/link'

const index = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen max-w-xl px-4 mx-auto">
        <Link href="/login">
          <div className="w-full py-2 text-center bg-gray-300 rounded-lg cursor-pointer">
            Login
          </div>
        </Link>

        <Link href="/register">
          <div className="w-full py-2 mt-4 text-center bg-gray-300 rounded-lg cursor-pointer">
            Register
          </div>
        </Link>
      </div>
    </>
  )
}

export default index
