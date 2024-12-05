import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
const Login = ()=>{
  const navigate = useNavigate()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [responseLogin,setResponseLogin] = useState()
  const [loading,setLoading] = useState(false)
  const CLIENT_ID=import.meta.env.VITE_CLIENT_ID
  const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
  const handleSubmit= async(e)=>{
  e.preventDefault()
  setLoading(true)
  const request_login = await fetch(`${VITE_REQUEST_URL}author/login/`,{method:'POST',headers:{
      'Content-Type':'application/json'
  },body:JSON.stringify({
      "username":username,
      "password":password,
      })
  })
  const response_login = await request_login.json()
  setResponseLogin(response_login)
  if(response_login){
    setLoading(false)
  }
  if(response_login && response_login.Token && response_login.author_id &&  response_login.user_id )
  {
      localStorage.setItem("Token",`${response_login.Token}`)
      localStorage.setItem("author_id",`${response_login.author_id}`)
      localStorage.setItem("user_id",`${response_login.user_id}`)
      const notify = ()=>{
          toast("Login Success!")
      }
      notify()
      navigate("/")
  }else{
    const notify=()=>{
      toast("Somthing went wrong.Please try again!")
    }
    notify()
    navigate("/login")
  }
  // console.log({
  //     "username":username,
  //     "password":password
  // })
  }
  const handleLogin = async(response)=>{
    const AccessToken = response.credential
    try{
      const getResponse = await fetch(`${VITE_REQUEST_URL}author/api/auth/google/`,{method:'POST',headers:{
        'Content-Type':'application/json'
    },body:JSON.stringify({
      "access_token":AccessToken
      })
    })
    const responseData = await getResponse.json()
    console.log(responseData)
    if(responseData.Token && responseData.author_id && responseData.user_id){
      localStorage.setItem("Token",`${responseData.Token}`)
      localStorage.setItem("author_id",`${responseData.author_id}`)
      localStorage.setItem("user_id",`${responseData.user_id}`)
      const notify=()=>{
        toast("Login Success!")
      }
      notify()
      navigate("/")
    }else{
      const notify=()=>{
        toast("Somthing went wrong.Please try again!")
      }
      notify()
      navigate("/login")
    }
    }catch(e){
      console.log(e)
    }
  }
return (
<>
<div className="bg-gray-700 text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
<div style={{
          boxShadow:
          "rgba(0, 0, 0, 0.15) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }} className='w-96 rounded-md mb-4 mx-auto p-3'>
          <p><span className='font-semibold'>Username:</span> <span className=''>sadid_1914</span></p>
          <p><span className='font-semibold'>Password:</span> <span>Naim12345</span></p>
        </div>
  <a href="#">
    <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        <p>Login Page</p>
    </div>
  </a>
  <div className="relative mt-12 w-full max-w-lg sm:mt-10">
    <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent" bis_skin_checked={1} />
    <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
      <div className="flex flex-col p-6">
        <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
        <p className={`mt-1.5 text-sm font-medium ${responseLogin?(responseLogin.Error?("text-red-800"):("text-white/50")):("text-white/50")}`}>{responseLogin?(responseLogin.Error?(`${responseLogin.Error}`):("Welcome back, enter your credentials to continue.")):("Welcome back, enter your credentials to continue.")}
        </p>
      </div>
      <div className="p-6 pt-0">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div>
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className={`text-xs font-medium text-muted-foreground ${responseLogin?(responseLogin.username?("text-red-800 group-focus-within:text-red"):("group-focus-within:text-white text-gray-400")):("group-focus-within:text-white text-gray-400")}`}>{responseLogin?(responseLogin.username?(responseLogin.username[0]):("Username")):("Username")}</label>
                  <div className="absolute right-3 translate-y-2 text-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="Username" autoComplete="off" className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className={`text-xs font-medium text-muted-foreground ${responseLogin?(responseLogin.password?("text-red-800 group-focus-within:text-red"):("group-focus-within:text-white text-gray-400")):("group-focus-within:text-white text-gray-400")}`}>{responseLogin?(responseLogin.password?(responseLogin.password[0]):("Password")):("Password")}</label>
                </div>
                <div className="flex items-center">
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            {/* <label className="flex items-center gap-2">
              <input type="checkbox" name="remember" className="outline-none focus:outline focus:outline-sky-300" />
              <span className="text-xs">Remember me</span>
            </label> */}
            <a className="text-sm font-medium text-foreground underline" href="#">Forgot
              password?</a>
          </div>
          <div className="mt-4 flex items-center justify-end gap-x-2">
            <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200" href="/register">Register</a>
            <button className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 w-20 py-2" type="submit">{loading?(<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div>):("Log in")}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="mt-4">
        <GoogleLogin onSuccess={(response)=>handleLogin(response)} onError={()=>console.log("Login Failed!")}/>
      </div>
  </GoogleOAuthProvider>
</div>
<div>
    <ToastContainer />
</div>
</>
    )
}

export default Login;