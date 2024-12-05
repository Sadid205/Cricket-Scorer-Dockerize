import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
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
    console.log(signUpResponse)
    if(signUpResponse && signUpResponse.Success){
        const notify = ()=>{
            toast(`${signUpResponse.Success}`)
        }
        notify()
        navigate("/login")
    }
    console.log(signUpResponse?(signUpResponse.username?(signUpResponse.username[0]):("Username")):("Username"))
return (
<>
<form onSubmit={(e)=>handleSubmit(e)} style={{height:"100vh"}} className="flex bg-gray-700 justify-center items-center space-y-8">
    <div className="bg-black m-auto flex flex-col w-full md:w-1/2 border border-gray-900 rounded-lg px-8 py-10">
    <label for="username" className={`font-bold text-lg ${signUpResponse?(signUpResponse.username?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.username?(signUpResponse.username[0]):("Username")):("Username")}</label> 
      <input required value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="Username" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <label for="first_name" className="font-bold text-lg text-white">First Name</label> 
      <input required value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" name="first_name" placeholder="First Name" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <label for="last_name" className="font-bold text-lg text-white">Last Name</label> 
      <input required value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" name="last_name" placeholder="Last Name" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <label for="email" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Email is already exists"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Email is already exists"?(signUpResponse.Error):("Email")):("Email")}</label> 
      <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <label for="password" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Password doesn't matched"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Password doesn't matched"?(signUpResponse.Error):("Password")):("Password")}</label> 
      <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <label for="confirm_password" className={`font-bold text-lg ${signUpResponse?(signUpResponse.Error==="Password doesn't matched"?("text-red-800"):("text-white")):("text-white")}`}>{signUpResponse?(signUpResponse.Error==="Password doesn't matched"?(signUpResponse.Error):("Confirm Password")):("Confirm Password")}</label> 
      <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" />
      <button type="submit" className="border mt-4 h-12 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold">{loading?(<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
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