import React from 'react'
import { useRouter } from 'next/router'
import { Label } from '@/components/Label'

export default function SignUp() {
  const [value, setValue] = React.useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.push('/')
  }

  return (
    <main className="flex items-center justify-center h-screen font-sans">
      <div className="p-6 max-w-[500px] bg-white shadow-lg rounded-2xl border border-gray-6 w-[95vw]">
        <h1 className="text-[1.375rem] font-bold mb-6">Welcome to CodeLeap Network</h1>

        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Please enter your username</Label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="w-full border border-gray-7 h-10 rounded-lg px-2 text-sm mt-2"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />

          <button
            type="submit"
            disabled={!value}
            className="flex items-center ml-auto h-10 rounded-lg px-8 uppercase mt-4 bg-primary text-white font-semibold cursor-pointer disabled:bg-gray-5 disabled:cursor-default"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
