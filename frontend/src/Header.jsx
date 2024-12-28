import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import logo from "./assets/logo.png"
const Header = ()=>{
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const Token = localStorage.getItem("Token")
    const [loading,setLoading] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const Links = [
        { name: "Home", link: "/" },
        // { name: "Supports", link: "/supports" },
        // { name: "About", link: "/about" },
      ];
    const handleClick = () => {
        setOpen(!open);
      };
      const logoutHandler = async()=>{
        try{
          setLoading(true)
          const request_logout = await fetch(`${VITE_REQUEST_URL}author/logout/`,{
            method:"GET",
            headers:{
              Authorization:`Token ${Token}`,
              "Content-Type":"application/json"
            }
          });
          const response_logout = await request_logout.json()
          if(response_logout.Success){
            setLoading(false)
            localStorage.removeItem("Token")
            localStorage.removeItem("user_id")
            localStorage.removeItem("author_id")
            localStorage.removeItem("match_id")
            const notify = ()=>{
              toast(`${response_logout.Success}`)
          }
          notify()
          navigate("/")
          }
        }catch(e){
          console.log(e)
        }
      }
      return (
        <div className="z-50 bg-gray-400 shadow-md ">
          <div
            className={`md:flex pr-3 bg-gray-400 md:static transition-all ease-in duration-500 z-10 absolute p-2 md:shadow- md:shadow-none shadow-md w-screen md:container m-auto md:justify-between item-center ${
              open ? "top-0 left-0" : "-left-full"
            }`}
          >
            {/* Left Side Section */}
            <div className="items-center p-3 md:flex">
              <div className="flex items-center">
                <img className="text-gray-900" width={50} src={logo} alt="logo" />
                <h1 className="ml-4 font-bold">Cricket Scorer</h1>
              </div>
    
              <ul className="md:flex md:ml-24">
                {Links.map((item, index) => (
                  <li className="md:ml-3" key={index}>
                    <Link className="font-bold text-gray-900" to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div id="search-bar" className="h-12 m-auto bg-white rounded-full shadow-lg w-80">
            <form onSubmit="" className="flex items-center justify-center p-2">
              <input value="" type="text" placeholder="Search here" className="w-full px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
              <button type="submit" className="px-4 py-1 ml-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                Search
              </button>
            </form>
          </div> */}
    
            {/* Right Side Div */}
              <div className="items-center md:flex">
                {Token?(
                  <div className="items-center md:flex">
                  <div className="relative inline-flex group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                      <button onClick={logoutHandler} className="relative inline-flex items-center justify-center w-20 h-10 px-3 py-2 text-sm font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                        {loading?(
                          <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                          <span className="sr-only">Loading...</span>
                        </div>
                        ):("Logout")}
                      </button>
                  </div>
                  </div>
                ):(
                  <div className="items-center md:flex">
                      <div className="flex ml-2">
                    <Link to="/login" className="relative inline-block px-4 py-2 font-medium group">
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
                      <span className="relative text-black group-hover:text-white">Login</span>
                    </Link>
                  </div>
                  <div className="mt-2 md:mt-0">
                      <Link to="/register" className="relative inline-block text-lg ms-2 group">
                      <span className="relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-3 py-2 rounded-lg bg-gray-50" />
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease" />
                        <span className="relative">SignUp</span>
                      </span>
                      <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg" />
                    </Link>
                  </div>
                  </div>
                )}
                  
                </div>
              </div>
          <div onClick={handleClick} className="absolute z-10 top-5 right-8 md:hidden ">
            {open ? (
              <span className="text-3xl">
                <RxCross1 />
              </span>
            ) : (
              <span className="text-3xl">
                <FaBars />
              </span>
            )}
          </div>
        <div>
          <ToastContainer />
        </div>
        </div>
  )
}

export default Header;