import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CountRuns = ()=>{
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const Token = localStorage.getItem("Token")
    const navigate = useNavigate()
    const match_id = localStorage.getItem("match_id")
    const [wideChecked,setWideChecked] = useState(false)
    const [noBallChecked,setNoBallChecked] = useState(false)
    const [byesChecked,setByesChecked] = useState(false)
    const [legByesChecked,setLegByesChecked] = useState(false)
    const [wicketChecked,setWicketChecked] = useState(false)
    const [retire,setRetire] = useState(false)
    const [panalty,setPanalty] = useState(false)
    const [scoredRuns,setScoredRuns] = useState(null)
    const [panaltyRuns,setPanaltyRuns] = useState(null)
    const [extras,setExtras] = useState(false)
    const [partnerships,setPartnerships] = useState(false)
    const [retiredData,setRetiredData] = useState({
      retired_batsman:null,
      new_batsman:null
    })
    const [swapBatsman,setSwapBatsman] = useState(false)
    const [run,setRun] = useState(-1)
    const [score,setScore] = useState()
    const [showModal,setShowModal] = useState(false)
    const [bowlerName,setBowlerName] = useState("")
    const [showWicketModal,setShowWicketModal] = useState(false)
    const [howWicketFall,setHowWicketFall] = useState("")
    const [whoHelped,setWhoHelped] = useState("")
    const [newBatsman,setNewBatsman] = useState("")
    const [pendingRun,setPendingRun] = useState(null)
    const [showSecondInningsModal,setShowSecondInningsModal] = useState(false)
    const [secondInningsStriker,setSecondInningsStriker] = useState("")
    const [secondInningsNonStriker,setSecondInningsNonStriker] = useState("")
    const [secondInningsBowler,setSecondInningsBowler] = useState("")
    const [showMatchFinishedModal,setShowMatchFinishedModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const VITE_WS_URL=import.meta.env.VITE_WS_URL
    const [socket,setSocket] = useState(null)
    const [increase,setIncrease] = useState(0)
   useEffect(()=>{
    const socketInstance = new WebSocket(`${VITE_WS_URL}/test/${match_id}/`);
    socketInstance.onopen = function(event){
      const match_data = JSON.parse(event.data)
      setScore(match_data)

    }
    socketInstance.onmessage = function(event){
        const match_data = JSON.parse(event.data)
        // 
        setScore(match_data)
        setWideChecked(false)
        setNoBallChecked(false)
        setByesChecked(false)
        setLegByesChecked(false)
        setWicketChecked(false)
        setPanalty(false)
    };
    socketInstance.onerror = function(error){

    }
    socketInstance.onclose = function(event){

    }
    setSocket(socketInstance)
    return ()=>{
        socketInstance.close();
    }
   },[match_id])
   const sendData = ()=>{
    const data = {
        "match_id":match_id,
        "run":run,
        "wide":wideChecked,
        "byes":byesChecked,
        "legByes":legByesChecked,
        "no_ball":noBallChecked,
        "wicket":wicketChecked,
        "how_wicket_fall":howWicketFall,
        "who_helped":whoHelped,
        "new_batsman":newBatsman,
        "retired_batsman":retiredData.retired_batsman,
        "replaced_batsman":retiredData.new_batsman,
        "swap_batsman":swapBatsman,
        "panalty":panalty,
        "scored_runs":scoredRuns,
        "panalty_runs":panaltyRuns,
        }
    if(socket && socket.readyState === WebSocket.OPEN){

      socket.send(JSON.stringify(data))
    }
   }

   useEffect(()=>{
    sendData()
   },[increase])
    useEffect(()=>{
        // const current_over = localStorage.getItem('current_over')
        const current_over = score?.updated_data?.over
        const total_over = score?.updated_data?.total_over
        const nth_ball = score?.updated_data?.nth_ball
        if( current_over < total_over-1 && nth_ball==6){
            setShowModal(true)
            localStorage.setItem("over_finished","true")
        }
    },[score?.updated_data?.overs_data])

    useEffect(()=>{
      const current_over = score?.updated_data?.over
      const total_over = score?.updated_data?.total_over
      const nth_ball = score?.updated_data?.nth_ball
      const wicket = score?.updated_data?.wicket
      const innings = score?.updated_data?.innings 
      if ((innings=="1st" && current_over==total_over && nth_ball==0) || (innings=="1st" && wicket==10)){
          setShowSecondInningsModal(true)
      }
      if((innings=="2nd" && current_over==total_over && nth_ball==0) || (score?.updated_data?.is_match_finished==true) || (innings=="2nd" && wicket==10)){
          setShowMatchFinishedModal(true)
      }
    },[score?.updated_data?.overs_data])

    const handleRetire = (e)=>{
     e.preventDefault()
     if (retiredData.retired_batsman==null){
      const notify = ()=>{
        toast("Please select a player!")
      }
      notify()
      return
     }
     if (retiredData.new_batsman==null){
      const notify = ()=>{
        toast("Please insert a player name!")
      }
      notify()
      return
     }
     setIncrease((prevState)=>prevState+1)
     setRetire(false)
    }
    const handleSwap = (e)=>{
      e.preventDefault()
      setSwapBatsman(true)
      setIncrease((prevState)=>prevState+1)
    }
    const handlePanalty=(e)=>{
      e.preventDefault()
      if(scoredRuns==null){
        const notify = ()=>{
          toast("Scored runs can not be empty!")
        }
        notify()
        return
      }
      if(panaltyRuns==null){
        const notify = ()=>{
          toast("Panalty runs can not be empty!")
        }
        notify()
        return
      }
      setIncrease((prevState)=>prevState+1)
    }
    const addNewBowler = async(e)=>{
        e.preventDefault()
        if(bowlerName===""){
          const notify = ()=>{
            toast("Name can not be empty!")
          }
          notify()
          return
        }
        const addNewBowlerRequest = await fetch(`${VITE_REQUEST_URL}match/add_new_over/`,{method:'PUT',headers:{
            Authorization:`Token ${Token}`,
            "Content-Type":"application/json"
        },body:JSON.stringify({
            "match_id":match_id,
            "bowler_name":bowlerName
            })
        })
        await addNewBowlerRequest.json()
        localStorage.removeItem("over_finished")
        window.location.reload()
    }
    const doneSetRun=(e)=>{
        e.preventDefault()
        if(howWicketFall===""||newBatsman===""){
          if(howWicketFall===""){
            const notify = ()=>{
              toast("How wicket fall dose not selected!")
            }
            notify()
          }
          if(newBatsman===""){
            const notify = ()=>{
              toast("New batsman can not be empty!")
            }
            notify()
          }
          return
        }
        if(howWicketFall=="catch_out" || howWicketFall=="run_out_striker" || howWicketFall=="run_out_non_striker" || howWicketFall=="stumping"){
          if(whoHelped===""){
            const notify = ()=>{
              toast("Who helped can not be empty!")
            }
            notify()
            return 
          }
        }
        if(pendingRun!=null){
            setRun(pendingRun)
            setShowWicketModal(false)
        }
        setIncrease((prevState)=>prevState+1)
        window.location.reload()
    }
    const updateScore =(e,current_run)=>{
        e.preventDefault()
        const over_finished = localStorage.getItem("over_finished")
        const current_over = score?.updated_data?.over
        const total_over = score?.updated_data?.total_over
        const nth_ball = score?.updated_data?.nth_ball
        const wicket = score?.updated_data?.wicket
        const innings = score?.updated_data?.innings
        if(over_finished=="true"){
          setShowModal(true)
          return
        }
        if ((innings=="1st"&&current_over==total_over && nth_ball==0) || (innings=="1st" && wicket==10)){
            setShowSecondInningsModal(true)
            return
        }
        if((innings=="1st"&&current_over==total_over && nth_ball==0) || score?.updated_data?.is_match_finished==true || (innings=="2nd" && wicket==10)){
            setShowMatchFinishedModal(true)
            return
        }
        if(wicketChecked==true){
            setShowWicketModal(true)
            setPendingRun(current_run)
        }
        else{
            setRun(current_run)
            setIncrease((prevState)=>prevState+1)
        }
    }

    const handleChecked = (e)=>{
        const {name,checked} = e.target;
        if(name=="wide" && checked==true){
            setNoBallChecked(false)
            setByesChecked(false)
            setLegByesChecked(false)
        }
        if((name=="noBall" && checked==true) && (name=="wicket" && checked==true)){
          setNoBallChecked(false)
        }
        if(name=="noBall" && checked==true){
          setWicketChecked(false)
          setWideChecked(false)
        }
        if(name=="wicket" && checked==true){
          setNoBallChecked(false)
        }
        if(name=="byes" && checked==true){
            setLegByesChecked(false)
        }
        if(name=='legByes' && checked==true){
            setByesChecked(false)
            setWideChecked(false)
        }
    }
    const handle_wide_checked = (e)=>{
        if(wideChecked==false){
            setWideChecked(true)
        }else{
            setWideChecked(false)
        }
    }
    const handle_no_ball_checked = (e)=>{
        if(noBallChecked==false){
            setNoBallChecked(true)
        }else{
            setNoBallChecked(false)
        }
    }
    const handle_byes_checked = (e)=>{
        if(byesChecked==false){
            setByesChecked(true)
        }else{
            setByesChecked(false)
        }
    }
    const handle_leg_byes_checked = (e)=>{
        if(legByesChecked==false){
            setLegByesChecked(true)
        }else{
            setLegByesChecked(false)
        }
    }
    const handle_wicket_checked = (e)=>{
        if(wicketChecked==false){
            setWicketChecked(true)
        }else{
            setWicketChecked(false)
        }
    }
    const startSecondInnings= async(e)=>{
        e.preventDefault()
        if(secondInningsStriker==="" || secondInningsNonStriker==="" || secondInningsBowler===""){
          if(secondInningsStriker===""){
            const notify = ()=>{
              toast("Striker name can not be empty!")
            }
            notify()
          }
          if(secondInningsNonStriker===""){
            const notify = ()=>{
              toast("Non-Striker name can not be empty!")
            }
            notify()
          }
          if(secondInningsBowler===""){
            const notify = ()=>{
              toast("Bowler name can not be empty!")
            }
            notify()
          }
          return
        }
        const request_start_second_innings = await fetch(`${VITE_REQUEST_URL}match/start_second_innings/`,{method:'PUT',headers:{
            Authorization:`Token ${Token}`,
            "Content-Type":"application/json"
        },body:JSON.stringify({
            "match_id":match_id,
            "striker":secondInningsStriker,
            "non_striker":secondInningsNonStriker,
            "bowler":secondInningsBowler
            })
        })
        const response_start_second_innings = await request_start_second_innings.json()
        if (response_start_second_innings){
          localStorage.removeItem("over_finished")
          window.location.reload()
        }
    }

    const handleRetiredChange = (e)=>{
      // e.preventDefault()
      setRetiredData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
    const getPercentageWidth = (total_runs,batsman_runs)=>{
      if((total_runs=="0") || parseInt(total_runs)===0) return 0
      const percentage = ((parseInt(batsman_runs))/parseInt(total_runs))*100;
      // print(percentage)
      return percentage;
    }
    return (
    <div className="relative h-full overflow-hidden">
       <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="justify-around w-11/12 p-4 m-auto bg-white bg-gray-200 md:h-48 rounded-2xl md:flex">
            <div className="h-full m-auto text-center w-72">
                <p className="font-bold">{score?(score.updated_data?(score.updated_data.batting_team_name):("")):("Batting Team")} Team,{score?(score.updated_data?(score.updated_data.innings):("")):("")} innings</p>
                <div className="">
                    <h1 className="text-6xl">{score?(score.updated_data?(score.updated_data.run):("00")):("00")} - {score?(score.updated_data?(score.updated_data.wicket):("0")):("0")} <span className="text-base font-bold">({score?(score.updated_data?(score.updated_data.over):("0")):("0")}.{score?(score.updated_data?(score.updated_data.nth_ball):("0")):("0")})</span></h1>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-xs font-bold">{score?(score.updated_data?(score.updated_data.status):("")):("")}</p>
            </div>
            <div className="h-full m-auto text-center w-72">
                <p className="font-bold">CURR</p>
                <div>
                    <h1 className="text-6xl">{score?(score.updated_data?(score.updated_data.run_rate.toFixed(2)):("0.00")):("0.00")}</h1>
                </div>
            </div>
       </div>


        <div className="overflow-x-auto">
            <table style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 p-3 m-auto mt-10 mb-3 text-sm text-left rounded rounded-md over rtl:text-right">
                <thead>
                    <tr className="border-b-2 border-gray-500">
                        <th scope="col" className="px-6 py-3">
                            Batsman
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Run
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Bowl
                        </th>
                        <th scope="col" className="px-6 py-3">
                            4s
                        </th>
                        <th scope="col" className="px-6 py-3">
                            6s
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SR
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_name):("Striker")):("Striker")}<span>*</span>
                        </th>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_run):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_bowl):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_four):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_six):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.striker_strike_rate.toFixed(2)):("0.00")):("0.00")}
                        </td>
                    </tr>
                    <tr className="bg-white dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_name):("Non Striker")):("Non Striker")}
                        </th>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_run):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_bowl):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_four):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_six):("0")):("0")}
                        </td>
                        <td className="px-6 py-4 font-bold">
                        {score?(score.updated_data?(score.updated_data.non_striker_strike_rate.toFixed(2)):("0.00")):("0.00")}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="overflow-x-auto">
            <table style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 m-auto mb-3 text-sm text-left">
                <thead>
                    <tr className="border-b-2 border-gray-500">
                        <th scope="col" className="px-6 py-3">
                            Bowler
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Over
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Maiden
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Run
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Wicket
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ER
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="font-bold bg-white dark:border-gray-700">
                        <th scope="row" className="px-6 py-4">
                        {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.name):("Bowler Name")):("Bowler Name")}
                        </th>
                        <td className="px-6 py-4">
                            <span>
                            {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.over):("0")):("0")}.{score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.nth_ball):("0")):("0")}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                        {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.madien_over):("0")):("0")}
                        </td>
                        <td className="px-6 py-4">
                        {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.run):("0")):("0")}
                        </td>
                        <td className="px-6 py-4">
                        {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.wicket):("0")):("0")}
                        </td>
                        <td className="px-6 py-4">
                        {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].bowler?.economy_rate.toFixed(2)):("0.00")):("0.00")}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 h-16 p-2 m-auto mt-4 rounded rounded-md">
            <div className="flex">
                <h1 className="text-xs font-bold md:text-base">This over:</h1>
                <div className="flex overflow-x-auto">
                {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].balls?.map((ball,index)=>{
                    return <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 mx-3 text-xs text-white bg-red-400 border-2 border-gray-400 rounded-full">{ball.runs}</div>
                    <p className="text-xs font-bold">{ball.ball_type}</p>
               </div>
                })):<div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 mx-3 text-xs text-white bg-red-400 border-2 border-gray-400 rounded-full">0</div>
                <p className="text-xs font-bold">DB</p>
                </div>):(<div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 mx-3 text-xs text-white bg-red-400 border-2 border-gray-400 rounded-full">0</div>
                    <p className="text-xs font-bold">DB</p>
               </div>)}
                </div>
            </div>
        </div>
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 h-32 p-4 m-auto mt-4 rounded rounded-md md:h-20">
            <div className="flex flex-wrap justify-evenly">
                <div className="flex">
                    <div className="flex items-center">
                        <input onChange={(e)=>{handleChecked(e);handle_wide_checked(e)}} checked={wideChecked} className="w-6 h-4" type="checkbox" id="wide" name="wide"/>
                        <label htmlFor="wide" className="font-bold text-gray-500">Wide</label>
                    </div>
                    <div className="flex items-center">
                        <input className="w-6 h-4" type="checkbox" id="noBall" name="noBall"  onChange={(e)=>{handleChecked(e);handle_no_ball_checked(e)}} checked={noBallChecked} />
                        <label htmlFor="noBall" className="font-bold text-gray-500">No Ball</label>
                    </div>
                    <div className="flex items-center">
                        <input className="w-6 h-4" type="checkbox" id="byes" name="byes" onChange={(e)=>{handleChecked(e);handle_byes_checked(e)}} checked={byesChecked} />
                        <label htmlFor="byes" className="font-bold text-gray-500">Byes</label>
                    </div>
                </div>
                <div className="flex flex-wrap items-center">
                    <div className="flex items-center">
                            <input className="w-6 h-4" type="checkbox" id="legByes" name="legByes"  onChange={(e)=>{handleChecked(e);handle_leg_byes_checked(e)}} checked={legByesChecked} />
                            <label htmlFor="legByes" className="font-bold text-gray-500">Leg Byes</label>
                    </div>
                    <div className="flex items-center">
                        <input className="w-6 h-4" type="checkbox" id="wicket" name="wicket"  onChange={(e)=>{handleChecked(e);handle_wicket_checked(e)}} checked={wicketChecked} />
                        <label htmlFor="wicket" className="font-bold text-gray-500">Wicket</label>
                    </div>
                    <div className="flex items-center m-auto">
                        <button onClick={()=>{setRetire(true)}} className="px-4 py-1 text-xs text-white bg-green-600 border border-2 rounded-md md:text-base md:font-bold">Retire</button>
                    </div>
                    <div className="flex items-center m-auto">
                        <button onClick={(e)=>handleSwap(e)} className="px-4 py-1 text-xs text-white bg-green-600 border border-2 rounded-md md:text-base md:font-semibold">Swap Batsman</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex w-11/12 gap-3 m-auto mt-3 md:h-52">
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-2/5 my-auto text-center rounded rounded-md py-11">
                <div className="m-3">
                    <button className="py-1 text-white bg-green-700 rounded-md font-base md:font-semibold px-7 md:px-10">Undo</button>
                </div>
                <div className="m-3">
                    <button onClick={(e)=>setPartnerships((prevState)=>!prevState)} className="px-1 py-1 text-white bg-green-700 rounded-md font-base md:font-semibold md:px-4">Partnerships</button>
                </div>
                <div className="m-3">
                    <button onClick={(e)=>setExtras((prevState)=>!prevState)} className="py-1 text-white bg-green-700 rounded-md font-base md:font-semibold px-7 md:px-10">Extras</button>
                </div>
            </div>
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-3/5 p-2 mt-8 rounded rounded-md md:m-0">
               <div className="flex mt-2">
               <button onClick={(e)=>updateScore(e,0)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">0</button>
                <button onClick={(e)=>updateScore(e,1)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">1</button>
                <button onClick={(e)=>updateScore(e,2)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">2</button>
                <button onClick={(e)=>updateScore(e,3)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">3</button>
               </div>
                <div className="flex mt-5">
                <button onClick={(e)=>updateScore(e,4)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">4</button>
                <button onClick={(e)=>updateScore(e,5)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">5</button>
                <button onClick={(e)=>updateScore(e,6)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">6</button>
                <button onClick={(e)=>setPanalty(true)} className="flex items-center justify-center w-10 h-10 m-auto text-xl font-bold border-4 border-green-700 rounded-full md:w-20 md:h-20 md:text-4xl">...</button>
                </div>
            </div>
        </div>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">
                    Select a new bowler
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                <input required onChange={(e)=>setBowlerName(e.target.value)}  type="text" id="bowlerName" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Name"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 px-28 hover:shadow-lg focus:outline-none"
                    onClick={(e) => addNewBowler(e)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {showWicketModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">
                    Fall of wicket
                  </h3>
                  <button onClick={(e)=>{setWicketChecked(false);setShowWicketModal(false)}}><span className="text-2xl"><RxCross1 /></span></button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                <label htmlFor="how_wicket_fall" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">How wicket fall?</label>
                <select onChange={(e)=>{setHowWicketFall(e.target.value)}} id="how_wicket_fall" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="bowled">Bowled</option>
                <option value="catch_out">Catch Out</option>
                <option value="run_out_striker">Run out striker</option>
                <option value="run_out_non_striker">Run out non-striker</option>
                <option value="stumping">Stumping</option>
                <option value="lbw">LBW</option>
                <option value="hit_wicket">Hit wicket</option>
                </select>
                {(howWicketFall=="catch_out" || howWicketFall=="run_out_striker" || howWicketFall=="run_out_non_striker" || howWicketFall=="stumping")?(<><label htmlFor="who_helped" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Who helped?</label>
                <input onChange={(e)=>setWhoHelped(e.target.value)} type="text" id="who_helped" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Fielder name"/></>):""}
                <label htmlFor="new_batsman" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">New batsman</label>
                <input onChange={(e)=>setNewBatsman(e.target.value)} type="text" id="new_batsman" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Batsman name"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 px-28 hover:shadow-lg focus:outline-none"
                  onClick={(e)=>{doneSetRun(e)}}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {showSecondInningsModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-xl font-semibold">
                    Start second innings?
                  </h3>
                  <button onClick={(e)=>{setShowSecondInningsModal(false)}}><span className="text-2xl"><RxCross1 /></span></button>
                </div>
                {/*body*/}
                    <div className="p-2">
                    <label htmlFor="striker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Striker</label>
                    <input onChange={(e)=>setSecondInningsStriker(e.target.value)} type="text" id="striker" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Striker name"/>
                    <label htmlFor="non_striker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Non Striker</label>
                    <input onChange={(e)=>setSecondInningsNonStriker(e.target.value)}  type="text" id="non_striker" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Non-striker name"/>
                    <label htmlFor="bowler" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Bowler</label>
                    <input onChange={(e)=>setSecondInningsBowler(e.target.value)} type="text" id="bowler" className="block w-full p-1 text-sm text-white border-b outline-none dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 focus:border-green-800 focus:border-b-2" placeholder="Bowler name"/>
                    </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                  <Link
                    className="py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 px-28 hover:shadow-lg focus:outline-none"
                  onClick={(e)=>startSecondInnings(e)}>
                    Done
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {showMatchFinishedModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-xl font-semibold">
                    Match Finished!
                  </h3>
                </div>
                {/*body*/}
                    <div className="p-2">
                        <p>{score?score.match_status:""}</p>
                    </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                  <Link
                    className="py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 px-28 hover:shadow-lg focus:outline-none"
                   onClick={(e)=>{e.preventDefault();navigate("/new_match")}} >
                    Start New Match
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {loading ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              
              <div className="w-20 h-20 border-8 border-gray-300 rounded-full animate-spin border-t-blue-600" />
            
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
       <div>
          <ToastContainer />
        </div>
      {retire?(
         <>
         <div
           className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
         >
           <div className="relative w-auto max-w-3xl mx-auto my-6">
             {/*content*/}
             <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
               {/*header*/}
               <div className="flex items-center justify-between p-2">
                 <h3 className="text-xl font-semibold text-green-600">
                   Select player to retire
                 </h3>
                 <p onClick={(e)=>setRetire(false)} className="p-4 text-xl hover:cursor-pointer"><RxCross1/></p>
               </div>
               {/*body*/}
                   <div className="p-2">
                    <div className="flex items-center mb-4">
                        <input onChange={(e)=>handleRetiredChange(e)} checked = {retiredData.retired_batsman==="striker"} id="default-radio-1" type="radio" value="striker" name="retired_batsman" className="w-4 h-4 accent-green-600"/>
                        <label htmlFor="default-radio-1" className="text-sm font-medium ms-2">{score?(score.updated_data?(score.updated_data.striker_name):("Striker")):("Striker")}</label>
                    </div>
                    <div className="flex items-center">
                        <input onChange={(e)=>handleRetiredChange(e)}
                        checked = {retiredData.retired_batsman==="non-striker"}
                        id="default-radio-2" type="radio" value="non-striker" name="retired_batsman" className="w-4 h-4 accent-green-600"/>
                        <label htmlFor="default-radio-2" className="text-sm font-medium ms-2">{score?(score.updated_data?(score.updated_data.non_striker_name):("Non-striker")):("Non-striker")}</label>
                    </div>
                    <label htmlFor="new_batsman" className="block mt-2 mb-2 font-semibold text-green-600 text-md">Replaced by</label>
                    <input onChange={(e)=>handleRetiredChange(e)} type="text" id="new_batsman" name="new_batsman" className="w-full p-1 border-b outline-none focus:border-green-800 focus:border-b-2" placeholder="Batsman name"/>
                   </div>
               {/*footer*/}
               <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                 <button
                   className="w-full py-3 font-bold text-center text-white bg-green-600 rounded rounded-md px-28"
                  onClick={(e)=>handleRetire(e)}>
                   Done
                 </button>
               </div>
             </div>
           </div>
         </div>
         <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
       </>
      ):null}
      {panalty?(
         <>
         <div
           className="fixed inset-0 z-50 flex items-center justify-center p-2 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
         >
           <div className="relative w-auto max-w-3xl mx-auto my-6">
             {/*content*/}
             <div className="relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none">
               {/*header*/}
               <div className="flex items-center justify-start px-4 py-2">
                 <h3 className="text-xl font-semibold">
                   End of the first inning
                 </h3>
               </div>
               {/*body*/}
                   <div className="p-2">
                    <label htmlFor="scored_runs" className="block mt-2 mb-2 text-green-600 text-md">Scored runs (including overthrows)?</label>
                    <input onChange={(e)=>setScoredRuns(e.target.value)} placeholder="0" type="number" id="scored_runs" name="scored_runs" className="w-full p-1 border-b outline-none focus:border-green-800 focus:border-b-2"/>
                   </div>
                   <div className="p-2">
                    <label htmlFor="panalty_runs" className="block mt-2 mb-2 text-green-600 text-md">Panalty runs?</label>
                    <input onChange={(e)=>setPanaltyRuns(e.target.value)} placeholder="0" type="number" id="panalty_runs" name="panalty_runs" className="w-full p-1 border-b outline-none focus:border-green-800 focus:border-b-2"/>
                   </div>
               {/*footer*/}
               <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                 <div className="flex gap-4 text-green-600">
                  <p onClick={(e)=>setPanalty(false)}  className="hover:cursor-pointer">CANCEL</p>
                  <p onClick={(e)=>handlePanalty(e)} className="hover:cursor-pointer">OK</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
       </>
      ):null}
      <div style={{boxShadow:"0px -5px 20px 2px #888888",bottom:extras?"0":"-100px",transition:"bottom 0.3s ease-in-out"}} className={`h-10 z-40 items-center font-semibold flex justify-start p-3 rounded-t-xl border-t-[1px] border-gray-500  w-full bg-white absolute`}>
            <p className="pt-1">Extras: {score?.updated_data?(score?.updated_data.extras.byes):("0")} B, {score?.updated_data?(score?.updated_data.extras.leg_byes):("0")} LB, {score?.updated_data?(score?.updated_data.extras.wide):("0")} WD, {score?.updated_data?(score?.updated_data.extras.no_ball):("0")} NB, {score?.updated_data?(score?.updated_data.extras.panalty):("0")} P</p>
      </div>
      <div style={{boxShadow:"0px -5px 20px 2px #888888",bottom:partnerships?"0":"-100%",transition:"bottom 0.3s ease-in-out"}} className="w-full max-h-full overflow-y-auto z-50 rounded-t-xl bg-white border-t-[1px] border-gray-500 absolute">
        <div className="flex justify-center w-full p-2 "><button className="text-xl font-semibold" onClick={(e)=>setPartnerships(false)}><RxCross1/></button></div>
            {
              score?.updated_data?.partnerships.length>0?(
                score.updated_data.partnerships.map((partnership,index)=>{
                  return<div key={index} className="flex h-24 border-b-[1px] border-gray-400 w-full p-2 justify-evenly items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-start">
                      <p className="font-semibold">{partnership.striker.player.name}</p>
                    </div>
                    <div className="flex items-center justify-end h-8 py-2 bg-gray-400">
                        <div style={{width:`${getPercentageWidth(partnership.total_run,partnership.striker_runs)}%`}} className={`flex items-center justify-start bg-green-600`}>
                            <p className="text-white">{partnership.striker_runs}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start">
                      <p className="font-semibold">Extras: {partnership.extras}</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/6 h-8 text-center">
                    <p className="text-sm text-xl font-semibold">{partnership.total_run}</p>
                    <p className="text-xs">({partnership.total_ball})</p>
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-end">
                      <p className="font-semibold">{partnership.non_striker.player.name}</p>
                    </div>
                    <div className="flex items-center justify-start h-8 py-2 bg-gray-400">
                        <div style={{width:`${getPercentageWidth(partnership.total_run,partnership.non_striker_runs)}%`}} className="flex items-center justify-end bg-green-600">
                            <p className="text-white">{partnership.non_striker_runs}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start invisible">
                      <p className="font-semibold">Extras: 1</p>
                    </div>
                  </div>
                </div>
                })
              ):null
            }
      </div>
    </div>
    )
}

export default CountRuns;
