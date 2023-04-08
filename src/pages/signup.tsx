export default function SignUp() {
  return (
    <main className="flex items-center justify-center h-screen font-sans">
      <div className="p-6 max-w-[500px] bg-white shadow-lg rounded-2xl border border-gray-6">
        <h1 className="text-[1.375rem] font-bold mb-6">Welcome to CodeLeap Network</h1>

        <form>
          <label htmlFor="name">Please enter your username</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="w-full border border-gray-7 h-10 rounded-lg px-2 text-sm mt-2"
          />

          <button
            type="submit"
            className="flex items-center ml-auto h-10 rounded-lg px-8 uppercase mt-4 bg-primary text-white font-semibold"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
