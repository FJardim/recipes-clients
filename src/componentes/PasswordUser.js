import React from 'react'

const PasswordUser = ({title,text,spam}) => {
  return (
    <form>
            <div className="flex space-x-8 mb-32 mt-6 justify-center">
              <div className="ml-2">
                <label
                  htmlFor="user"
                  className="text-gray-600 font-bold text-xl"
                >
                  {title}
                </label>
                <input
                  type="text"
                  className="mt-6 border rounded-lg w-80 block"
                  id="user"
                />
              </div>
              <div className="ml-2">
                <label
                  htmlFor="user"
                  className="text-gray-600 font-bold text-xl"
                >
                  {text}
                </label>
                <input
                  type="text"
                  className="mt-6 border rounded-lg w-80 block"
                  id="user"
                />
              </div>
              <div className="ml-2">
                <label
                  htmlFor="user"
                  className="text-gray-600 font-bold text-xl"
                >
                  {spam}
                </label>
                <input
                  type="text"
                  className="mt-6 border rounded-lg w-80 block"
                  id="user"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-400 px-4 py-2 text-white font-semibold rounded-lg">
                Change
              </button>
            </div>
          </form>
  )
}

export default PasswordUser