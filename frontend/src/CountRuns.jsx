import { Link,Navigate, useNavigate} from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useState,useEffect } from "react";
const CountRuns = ()=>{
    const Token = localStorage.getItem("Token")
    const navigate = useNavigate()
    const match_id = localStorage.getItem("match_id")
    const [wideChecked,setWideChecked] = useState(false)
    const [noBallChecked,setNoBallChecked] = useState(false)
    const [byesChecked,setByesChecked] = useState(false)
    const [legByesChecked,setLegByesChecked] = useState(false)
    const [wicketChecked,setWicketChecked] = useState(false)
    const [retire,setRetire] = useState(false)
    const [swapBatsman,setSwapBatsman] = useState(false)
    const [run,setRun] = useState(-1)
    const [score,setScore] = useState()
    const [showModal,setShowModal] = useState(false)
    const [bowlerName,setBowlerName] = useState("")
    const [showWicketModal,setShowWicketModal] = useState(false)
    const [howWicketFall,setHowWicketFall] = useState("Bowled")
    const [whoHelped,setWhoHelped] = useState("Fielder")
    const [newBatsman,setNewBatsman] = useState("New Batsman")
    const [pendingRun,setPendingRun] = useState(null)
    const [showSecondInningsModal,setShowSecondInningsModal] = useState(false)
    const [secondInningsStriker,setSecondInningsStriker] = useState("")
    const [secondInningsNonStriker,setSecondInningsNonStriker] = useState("")
    const [secondInningsBowler,setSecondInningsBowler] = useState("")
    const [showMatchFinishedModal,setShowMatchFinishedModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const [socket,setSocket] = useState(null)
    const [increase,setIncrease] = useState(0)
   useEffect(()=>{
    const socketInstance = new WebSocket(`ws://localhost:8000/ws/test/${match_id}/`);
    socketInstance.onopen = function(event){
      const match_data = JSON.parse(event.data)
      setScore(match_data)
      console.log("hello")
    }
    socketInstance.onmessage = function(event){
        const match_data = JSON.parse(event.data)
        // console.log('received data:',match_data);
        setScore(match_data)
        setWideChecked(false)
        setNoBallChecked(false)
        setByesChecked(false)
        setLegByesChecked(false)
        setWicketChecked(false)
    };
    socketInstance.onerror = function(error){
        console.log('websocket eror',error)
    }
    socketInstance.onclose = function(event){
        console.log('websocket connection closed!')
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
        "new_batsman":newBatsman
        }
    if(socket && socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify(data))
        console.log("Data sent",data)
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
        if( current_over != total_over-1 && current_over!=total_over && nth_ball==5){
            setShowModal(true)
            localStorage.setItem("over_finished","true")
        }
    },[increase])

    useEffect(()=>{
      const current_over = score?.updated_data?.over
      const total_over = score?.updated_data?.total_over
      const nth_ball = score?.updated_data?.nth_ball
      const wicket = score?.updated_data?.wicket
      const innings = score?.updated_data?.innings 
      if (innings=="1st" && current_over==total_over-1 && nth_ball==5 || innings=="1st" && wicket==10){
          setShowSecondInningsModal(true)
      }
      if(score?.updated_data?.is_match_finished==true){
          setShowMatchFinishedModal(true)
      }
    },[increase])
    // console.log(score)
    const addNewBowler = async(e)=>{
        e.preventDefault()
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
        if (innings=="1st"&&current_over==total_over && nth_ball==0 || innings=="1st" && wicket==10){
            setShowSecondInningsModal(true)
            return
        }
        if(score?.updated_data?.is_match_finished==true){
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
        if(name=="noBall" && checked==true || name=="byes" && checked == true || name=="legByes" && checked==true ){
            setWideChecked(false)
        }
        if(name=="byes" && checked==true){
            setLegByesChecked(false)
        }
        if(name=='legByes' && checked==true){
            setByesChecked(false)
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
            window.location.reload()
        }
    }
    console.log(score)
    return (
    <div style={{height:'100vh'}} className="mt-3">
       <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 md:h-48 rounded-2xl md:flex bg-gray-200 justify-around p-4 m-auto bg-white">
            <div className="h-full text-center w-72 m-auto">
                <p className="font-bold">{score?(score.updated_data?(score.updated_data.batting_team_name):("")):("Batting Team")} Team,{score?(score.updated_data?(score.updated_data.innings):("")):("")} innings</p>
                <div className="">
                    <h1 className="text-6xl">{score?(score.updated_data?(score.updated_data.run):("00")):("00")} - {score?(score.updated_data?(score.updated_data.wicket):("0")):("0")} <span className="text-base font-bold">({score?(score.updated_data?(score.updated_data.over):("0")):("0")}.{score?(score.updated_data?(score.updated_data.nth_ball):("0")):("0")})</span></h1>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-xs font-bold">{score?(score.updated_data?(score.updated_data.status):("")):("")}</p>
            </div>
            <div className="h-full w-72 text-center m-auto">
                <p className="font-bold">CURR</p>
                <div>
                    <h1 className="text-6xl">{score?(score.updated_data?(score.updated_data.run_rate.toFixed(2)):("0.00")):("0.00")}</h1>
                </div>
            </div>
       </div>


        <div className="overflow-x-auto">
            <table style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="text-sm over m-auto w-11/12 mt-10 text-left rtl:text-right  p-3 mb-3 rounded rounded-md">
                <thead>
                    <tr className="border-gray-500 border-b-2">
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
                    <tr className="bg-white bg-white dark:border-gray-700">
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
                    <tr className="bg-white bg-white dark:border-gray-700">
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
            <table style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="text-sm w-11/12 m-auto text-left mb-3">
                <thead>
                    <tr className="border-gray-500 border-b-2">
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
                    <tr className="bg-white bg-white dark:border-gray-700 font-bold font-bold">
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
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 h-16 p-2 rounded rounded-md m-auto mt-4">
            <div className="flex">
                <h1 className="font-bold text-xs md:text-base">This over:</h1>
                <div className="overflow-x-auto flex">
                {score?(score.updated_data?(score.updated_data.overs_data[score?.updated_data?.overs_data?.length-1].balls?.map((ball,index)=>{
                    return <div key={index} className="text-center">
                    <div className="w-8 bg-red-400 h-8 mx-3 text-white text-xs rounded-full flex justify-center items-center border-2 border-gray-400">{ball.runs}</div>
                    <p className="text-xs font-bold">{ball.ball_type}</p>
               </div>
                })):<div className="text-center">
                <div className="w-8 bg-red-400 h-8 mx-3 text-white text-xs rounded-full flex justify-center items-center border-2 border-gray-400">0</div>
                <p className="text-xs font-bold">DB</p>
                </div>):(<div className="text-center">
                    <div className="w-8 bg-red-400 h-8 mx-3 text-white text-xs rounded-full flex justify-center items-center border-2 border-gray-400">0</div>
                    <p className="text-xs font-bold">DB</p>
               </div>)}
                </div>
            </div>
        </div>
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-11/12 md:h-20 h-32 p-4 rounded rounded-md m-auto mt-4">
            <div className="flex justify-evenly flex-wrap">
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
                <div className="flex items-center flex-wrap">
                    <div className="flex items-center">
                            <input className="w-6 h-4" type="checkbox" id="legByes" name="legByes"  onChange={(e)=>{handleChecked(e);handle_leg_byes_checked(e)}} checked={legByesChecked} />
                            <label htmlFor="legByes" className="font-bold text-gray-500">Leg Byes</label>
                    </div>
                    <div className="flex items-center">
                        <input className="w-6 h-4" type="checkbox" id="wicket" name="wicket"  onChange={(e)=>{handleChecked(e);handle_wicket_checked(e)}} checked={wicketChecked} />
                        <label htmlFor="wicket" className="font-bold text-gray-500">Wicket</label>
                    </div>
                    <div className="flex items-center m-auto">
                        <Link onClick={()=>{setRetire(true)}} className="border px-4 py-1 rounded-md bg-green-600 md:text-base text-xs md:font-bold text-white border-2">Retire</Link>
                    </div>
                    <div className="flex items-center m-auto">
                        <Link onClick={()=>{setSwapBatsman(true)}} className="border px-4 py-1 rounded-md bg-green-600 text-xs md:text-base md:font-semibold text-white border-2">Swap Batsman</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="md:h-52 flex gap-3 w-11/12 m-auto mt-3">
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-2/5 py-11 text-center my-auto rounded rounded-md">
                <div className="m-3">
                    <Link className="bg-green-700 text-white font-base md:font-semibold rounded-md px-7 md:px-10 py-1">Undo</Link>
                </div>
                <div className="m-3">
                    <Link className="bg-green-700 text-white font-base md:font-semibold rounded-md px-1 md:px-4 py-1">Partnerships</Link>
                </div>
                <div className="m-3">
                    <Link className="bg-green-700 text-white font-base md:font-semibold rounded-md px-7 md:px-10 py-1">Extras</Link>
                </div>
            </div>
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="w-3/5 p-2 rounded rounded-md mt-8 md:m-0">
               <div className="flex mt-2">
               <Link onClick={(e)=>updateScore(e,0)} className="md:w-20 md:h-20 w-10 h-10  font-bold   text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">0</Link>
                <Link onClick={(e)=>updateScore(e,1)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">1</Link>
                <Link onClick={(e)=>updateScore(e,2)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">2</Link>
                <Link onClick={(e)=>updateScore(e,3)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">3</Link>
               </div>
                <div className="flex mt-5">
                <Link onClick={(e)=>updateScore(e,4)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">4</Link>
                <Link onClick={(e)=>updateScore(e,5)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">5</Link>
                <Link onClick={(e)=>updateScore(e,6)} className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">6</Link>
                <Link className="md:w-20 md:h-20 w-10 h-10  font-bold  text-xl md:text-4xl flex items-center justify-center border-green-700 border-4 rounded-full m-auto">...</Link>
                </div>
            </div>
        </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Select a new bowler
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <input required onChange={(e)=>setBowlerName(e.target.value)}  type="text" id="bowlerName" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Name"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-28 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={(e) => addNewBowler(e)}
                  disabled={bowlerName === ""}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showWicketModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Fall of wicket
                  </h3>
                  <button onClick={(e)=>{setWicketChecked(false);setShowWicketModal(false)}}><span className="text-2xl"><RxCross1 /></span></button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <label htmlFor="how_wicket_fall" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">How wicket fall?</label>
                <select onChange={(e)=>{setHowWicketFall(e.target.value)}} id="how_wicket_fall" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="bowled">Bowled</option>
                <option value="catch_out">Catch Out</option>
                <option value="run_out_striker">Run out striker</option>
                <option value="run_out_non_striker">Run out non-striker</option>
                <option value="stumping">Stumping</option>
                <option value="lbw">LBW</option>
                <option value="hit_wicket">Hit wicket</option>
                </select>
                {(howWicketFall=="catch_out" || howWicketFall=="run_out_striker" || howWicketFall=="run_out_non_striker" || howWicketFall=="stumping")?(<><label htmlFor="who_helped" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Who helped?</label>
                <input onChange={(e)=>setWhoHelped(e.target.value)} type="text" id="who_helped" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Fielder name"/></>):""}
                <label htmlFor="new_batsman" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">New batsman</label>
                <input onChange={(e)=>setNewBatsman(e.target.value)} type="text" id="new_batsman" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Batsman name"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-28 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={(e)=>{doneSetRun(e)}}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showSecondInningsModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Start second innings?
                  </h3>
                  <button onClick={(e)=>{setShowSecondInningsModal(false)}}><span className="text-2xl"><RxCross1 /></span></button>
                </div>
                {/*body*/}
                    <div className="p-2">
                    <label htmlFor="striker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Striker</label>
                    <input onChange={(e)=>setSecondInningsStriker(e.target.value)} type="text" id="striker" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Striker name"/>
                    <label htmlFor="non_striker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Non Striker</label>
                    <input onChange={(e)=>setSecondInningsNonStriker(e.target.value)}  type="text" id="non_striker" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Non-striker name"/>
                    <label htmlFor="bowler" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Bowler</label>
                    <input onChange={(e)=>setSecondInningsBowler(e.target.value)} type="text" id="bowler" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder="Bowler name"/>
                    </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Link
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-28 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={(e)=>startSecondInnings(e)}>
                    Done
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showMatchFinishedModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Match Finished!
                  </h3>
                </div>
                {/*body*/}
                    <div className="p-2">
                        <p>{score?score.match_status:""}</p>
                    </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Link
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-28 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                   onClick={(e)=>{e.preventDefault();navigate("/new_match")}} >
                    Start New Match
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {loading ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              
              <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
            
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
    )
}

export default CountRuns;

