import { Lock, Mail, User2Icon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Login = () => {
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = useState(urlState || "login")
    const { loginUser, registerUser } = useContext(AppContext)
    const [errorMsg, setErrorMsg] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        let result;
        if (state === "login") {
            result = await loginUser(formData.email, formData.password)
        } else {
            result = await registerUser(formData.name, formData.email, formData.password)
        }
        if (!result.success) {
            setErrorMsg(result.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4'>
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-sm">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
                {errorMsg && <p className="text-red-500 text-xs mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">{errorMsg}</p>}
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden px-5 gap-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                        <User2Icon size={16} color='#6B7280'/>
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0 flex-1 bg-transparent" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className={`flex items-center w-full ${state === "login" ? "mt-6" : "mt-4"} bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden px-5 gap-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all`}>
                    <Mail size={16} color='#6B7280'/>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 flex-1 bg-transparent" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden px-5 gap-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                    <Lock size={16} color='#6B7280'/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 flex-1 bg-transparent" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-green-500">
                    <button className="text-sm hover:underline" type="button">Forgot password?</button>
                </div>
                <button type="submit" className="mt-4 w-full h-11 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors">
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p className="text-gray-500 text-sm mt-4 mb-11">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"} 
                    <button type="button" onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-green-500 hover:underline ml-1 focus:outline-none">click here</button>
                </p>
            </form>
    </div>
  )
}

export default Login