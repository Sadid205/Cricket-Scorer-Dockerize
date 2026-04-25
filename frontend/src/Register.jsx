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
    <label htmlFor="username" className={`font-bold text-lg ${signUpResponse?(signUpResponse.username?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.username?(signUpResponse.username[0]):("Username")):("Username")}</label> 
      <input required value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="Username" className="px-3 py-3 mt-4 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <label htmlFor="first_name" className="text-lg font-bold text-white">First Name</label> 
      <input required value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" name="first_name" placeholder="First Name" className="px-3 py-3 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <label htmlFor="last_name" className="text-lg font-bold text-white">Last Name</label> 
      <input required value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" name="last_name" placeholder="Last Name" className="px-3 py-3 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <label htmlFor="email" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Email is already exists"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Email is already exists"?(signUpResponse.Error):("Email")):("Email")}</label> 
      <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email" className="px-3 py-3 mt-4 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <label htmlFor="password" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Password doesn't matched"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Password doesn't matched"?(signUpResponse.Error):("Password")):("Password")}</label> 
      <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="px-3 py-3 mt-4 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <label htmlFor="confirm_password" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Password doesn't matched"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Password doesn't matched"?(signUpResponse.Error):("Confirm Password")):("Confirm Password")}</label> 
      <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="px-3 py-3 mt-4 text-white bg-black border border-indigo-600 rounded-lg placeholder-white-500" />
      <button type="submit" className="h-12 py-3 mt-4 font-semibold text-white bg-black border border-indigo-600 rounded-lg">{loading?(<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>):("Sign up")}
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