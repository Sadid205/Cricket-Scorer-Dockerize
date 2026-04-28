import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Register = ()=>{
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [signUpResponse,setSignUpResponse] = useState()
    const [loading,setLoading] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const signup_request = await fetch(`${VITE_REQUEST_URL}author/register/`,{method:'POST',headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify({
            "username":username,
            "first_name":firstName,
            "last_name":lastName,
            "email":email,
            "password":password,
            "confirm_password":confirmPassword,
            })
        })
        const signup_response = await signup_request.json()
        if (signup_response){
            console.log(signup_response)
            setLoading(false)
            setSignUpResponse(signup_response)
        }
        // console.log({
        //     "username":username,
        //     "FirstName":firstName,
        //     "LastName":lastName,
        //     "Email":email,
        //     "Password":password,
        //     "ConfirmPassword":confirmPassword,
        // })
    }

    if(signUpResponse && signUpResponse.Success){
        const notify = ()=>{
            toast(`${signUpResponse.Success}`)
        }
        notify()
        navigate("/login")
    }

return (
<>
<form onSubmit={(e)=>handleSubmit(e)} style={{height:"100vh"}} className="flex items-center justify-center space-y-8 bg-gray-700">
    <div className="flex flex-col w-full px-8 py-10 m-auto bg-black border border-gray-900 rounded-lg md:w-1/2">

      {/* General Error */}
      {signUpResponse?.Error && (
        <div className="px-3 py-2 mb-4 text-red-400 border border-red-800 rounded-lg bg-red-950">
          {signUpResponse.Error[0]}
        </div>
      )}

      {/* Success */}
      {signUpResponse?.Success && (
        <div className="px-3 py-2 mb-4 text-green-400 border border-green-800 rounded-lg bg-green-950">
          {signUpResponse.Success}
        </div>
      )}

      <label htmlFor="username" className={`font-bold text-lg ${signUpResponse?.username ? "text-red-500" : "text-white"}`}>
        {signUpResponse?.username ? signUpResponse.username[0] : "Username"}
      </label>
      <input required value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="Username" className={`px-3 py-3 mt-1 text-white bg-black border rounded-lg placeholder-white-500 ${signUpResponse?.username ? "border-red-600" : "border-indigo-600"}`} />

      <label htmlFor="first_name" className="mt-4 text-lg font-bold text-white">First Name</label>
      <input required value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" name="first_name" placeholder="First Name" className="px-3 py-3 mt-1 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />

      <label htmlFor="last_name" className="mt-4 text-lg font-bold text-white">Last Name</label>
      <input required value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" name="last_name" placeholder="Last Name" className="px-3 py-3 mt-1 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />

      <label htmlFor="email" className={`mt-4 font-bold text-lg ${signUpResponse?.email ? "text-red-500" : "text-white"}`}>
        {signUpResponse?.email ? signUpResponse.email[0] : "Email"}
      </label>
      <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email" className={`px-3 py-3 mt-1 text-white bg-black border rounded-lg placeholder-white-500 ${signUpResponse?.email ? "border-red-600" : "border-indigo-600"}`} />

      <label htmlFor="password" className={`mt-4 font-bold text-lg ${signUpResponse?.password ? "text-red-500" : "text-white"}`}>
        {signUpResponse?.password ? signUpResponse.password[0] : "Password"}
      </label>
      <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" className={`px-3 py-3 mt-1 text-white bg-black border rounded-lg placeholder-white-500 ${signUpResponse?.password ? "border-red-600" : "border-indigo-600"}`} />

      <label htmlFor="confirm_password" className={`mt-4 font-bold text-lg ${signUpResponse?.non_field_errors ? "text-red-500" : "text-white"}`}>
        {signUpResponse?.non_field_errors ? signUpResponse.non_field_errors[0] : "Confirm Password"}
      </label>
      <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className={`px-3 py-3 mt-1 text-white bg-black border rounded-lg placeholder-white-500 ${signUpResponse?.non_field_errors ? "border-red-600" : "border-indigo-600"}`} />

      <button type="submit" className="h-12 py-3 mt-6 font-semibold text-white bg-black border border-indigo-600 rounded-lg">
        {loading ? (
          <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        ) : ("Sign up")}
      </button>

    </div>
</form>
<div>
<ToastContainer />
</div>
</>
)
}

export default Register;