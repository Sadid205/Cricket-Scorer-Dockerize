import { Link,useNavigate} from "react-router-dom"
import { useState} from "react"
import { ToastContainer,toast } from "react-toastify";
const SelectOpeningPlayer = ()=>{
    const navigate = useNavigate()
    const [striker,setStriker] = useState("")
    const [nonStriker,setNonStriker] = useState("")
    const [bowler,setBowler] = useState("")
    const match_id = localStorage.getItem("match_id")
    const [loading,setLoading] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const onSubmit = (e)=>{
        const Token = localStorage.getItem("Token")
        e.preventDefault()
        // console.log(striker,nonStriker,bowler,match_id)
        if (striker==="" || nonStriker==="" || bowler===""){
            if(striker===""){
                const notify = ()=>{
                    toast("Striker can not be empty!")
                }
                notify()
            }
            if(nonStriker===""){
                const notify = ()=>{
                    toast("Non-Striker can not be empty!")
                }
                notify()
            }
            if(bowler===""){
                const notify = ()=>{
                    toast("Bowler can not be empty!")
                }
                notify()
            }
            return 
        }
        const get_response = async()=>{
            setLoading(true)
            const select_player = await fetch(`${VITE_REQUEST_URL}match/select_opening_player/`,{method:'POST',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            },body:JSON.stringify({
                "match_id":match_id,
                "striker":striker,
                "non_striker":nonStriker,
                "bowler":bowler,
                })
            })
            const select_player_response = await select_player.json()
            // console.log(select_player_response)
            if (select_player_response){
                setLoading(false)
            }
            navigate('/count_runs')
        }
        get_response()
    }
    return (
        <div style={{height:'100vh'}} className="bg-slate-200 flex justify-center items-center">
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}className="p-6">
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-72 rounded rounded-md p-4">
                <div>
                    <h1 className="font-bold">Striker</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setStriker(e.target.value)}  type="text" id={striker} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2 font-bold" placeholder="Unique Striker Name" required />
                </div>   
            </div>
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-72 p-4 rounded rounded-md mt-3">
                <div>
                    <h1 className="font-bold">Non-Striker</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setNonStriker(e.target.value)}  type="text" id={nonStriker} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2 font-bold" placeholder="Unique Non-Striker Name" required />
                </div>   
            </div>
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-72 p-4 mt-3 rounded rounded-md mb-3">
                <div>
                    <h1 className="font-bold">Opening Bowler</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setBowler(e.target.value)}  type="text" id={bowler} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2 font-bold" placeholder="Unique Bowler Name" required />
                </div>   
            </div>
            <div className="flex justify-center">
                <button onClick={onSubmit} className="w-64 font-bold p-2 flex items-center justify-center rounded-xl text-center text-white bg-green-600">{loading?(
                    <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                  </div>
                ):("Start Match")}</button>
            </div>
        </div>
        <div>
            <ToastContainer />
        </div>
    </div>
    )
}


export default SelectOpeningPlayer