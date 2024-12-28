import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MdAutoGraph } from "react-icons/md";
import { IoIosArrowDown,IoIosArrowUp  } from "react-icons/io";

const ScoreBoard = ()=>{
    const {match_id} = useParams()
    const Token = localStorage.getItem("Token")
    const [scoreBoard,setScoreBoard] = useState()
    const [teamOneExpand,setTeamOneExpand] = useState(false)
    const [teamTwoExpand,setTeamTwoExpand] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const [select,setSelect] = useState({
        ScoreBoard:true,
        Overs:false
    })
    const HandleSelect=(key)=>{
        setSelect({
            ScoreBoard:key==="Scoreboard",
            Overs:key==="Overs"
        })
    }
    // console.log(author_id)
    useEffect(()=>{
        const ScorBoard = async()=>{
            const get_score = await fetch(`${VITE_REQUEST_URL}match/scoreboard/${match_id}/`,{method:'GET',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            }})
            const response = await get_score.json()
            setScoreBoard(response)
        }
        ScorBoard()
    },[match_id,Token])
    console.log(scoreBoard)
    return (
        <div className="h-screen w-screen">
            <div className="h-1/4 relative bg-green-600">
                <div className="flex text-md h-full w-full justify-center text-white font-semibold md:text-4xl gap-4 items-center">
                    <h1>{scoreBoard&&scoreBoard.match.team1.team_name.slice(0,17)} vs {scoreBoard&&scoreBoard.match.team2.team_name.slice(0,17)}</h1>
                    <Link><MdAutoGraph /></Link>
                </div>
                <div className="p-3 absolute  text-white bottom-0 font-semibold">
                    <div className="flex gap-10">
                    <button onClick={()=>HandleSelect("Scoreboard")}>Scoreboard</button>
                    <button onClick={()=>HandleSelect("Overs")}>Overs</button>
                    </div>
                    <div
                        style={{
                            transform:`translate(${select.ScoreBoard?"0%":"100%"})`,
                            transition:"transform 0.3s ease-in"
                        }}
                        className={`bg-white h-1 transition-all ease-in delay-100 bottom-0 left-0 w-24`}
                    > 
                    </div>
                </div>
            </div>
            {/* first part */}
            <div className="w-full overflow-hidden">
                <div style={{transform: select.ScoreBoard?"translateX(0%)":select.Overs?"translateX(-50%)":"translateX(0%)",transition:"transform 0.5s ease-in-out"}} className="flex w-[200%]">
                    <div className="w-1/2">
                        <div className="w-full p-3 bg-white">
                            <p className="text-gray-900 text-md">{scoreBoard&&scoreBoard.match.match_status}</p>
                        </div>
                        <div>
                            <div onClick={()=>setTeamOneExpand((prev)=>!prev)} className="w-full h-12 flex items-center hover:cursor-pointer bg-green-600">
                                <div className="flex text-white text-md md:text-xl w-11/12 m-auto justify-between items-center gap-2">
                                    <p>{scoreBoard&&scoreBoard.match.team1.team_name.slice(0,17)}</p>
                                    <div className="flex items-center gap-2">
                                        {/* {console.log(scoreBoard?.match)} */}
                                    <p className="font-semibold">
                                        {
                                            scoreBoard?(
                                                (scoreBoard.match.toss_winner==scoreBoard.match.team1.id&&scoreBoard.match.elected=="Bat")||(scoreBoard.match.toss_winner==scoreBoard.match.team2.id&&scoreBoard.match.elected=="Bowl")?(scoreBoard.match.first_innings_run+ "-" +scoreBoard.match.first_innings_wicket):(scoreBoard.match.second_innings_run+ "-" +scoreBoard.match.second_innings_wicket)
                                            ):("")
                                        } <span className="text-xs">(
                                            {
                                            scoreBoard?(
                                                (scoreBoard.match.toss_winner==scoreBoard.match.team1.id&&scoreBoard.match.elected=="Bat")||(scoreBoard.match.toss_winner==scoreBoard.match.team2.id&&scoreBoard.match.elected=="Bowl")?(scoreBoard.match.first_innings_nth_over + "." + scoreBoard.match.first_innings_nth_ball):(scoreBoard.match.second_innings_nth_over + "." + scoreBoard.match.second_innings_nth_ball)
                                            ):("")
                                        }
                                        )</span>
                                    </p>
                                        <button>{teamOneExpand?(<IoIosArrowUp />):(<IoIosArrowDown />)}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all ease-in-out duration-500 ${teamOneExpand?("max-h-screen"):("max-h-0")}`}>
                                <div className="overflow-x-auto">
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                    <th scope="col" className="py-3 text-left">Batsman</th>
                                                    <th scope="col" className="px-4 py-3">R</th>
                                                    <th scope="col" className="px-4 py-3">B</th>
                                                    <th scope="col" className="px-4 py-3">4s</th>
                                                    <th scope="col" className="px-4 py-3">6s</th>
                                                    <th scope="col" className="px-4 py-3">SR</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    scoreBoard?(
                                                        scoreBoard.team1_batsmans.length>0?(
                                                            scoreBoard.team1_batsmans.map((batsman,index)=>{
                                                                return <tr key={index} className="border-t-[1px] border-gray-400">
                                                                <td className="text-left py-3">{batsman.player?(batsman.player.name):("Batsman")}</td>
                                                                <td className="px-4 py-3 text-center">{batsman.run}</td>
                                                                <td className="px-4 py-3 text-center">{batsman.ball}</td>
                                                                <td className="px-4 py-3 text-center">{batsman.four}</td>
                                                                <td className="px-4 py-3 text-center">{batsman.six}</td>
                                                                <td className="px-4 py-3 text-center">{batsman.strike_rate.toFixed(2)}</td>
                                                            </tr>
                                                            })
                                                        ):("")
                                                    ):("")
                                                }
                                            </tbody>
                                        </table>
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                <th scope="col" className="py-3 text-left">Bowler</th>
                                                <th scope="col" className="px-4 py-3">O</th>
                                                <th scope="col" className="px-4 py-3">M</th>
                                                <th scope="col" className="px-4 py-3">R</th>
                                                <th scope="col" className="px-4 py-3">W</th>
                                                <th scope="col" className="px-4 py-3">ER</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                scoreBoard?(
                                                    scoreBoard.team1_bowlers.length>0?(
                                                        scoreBoard.team1_bowlers.map((bowler,index)=>{
                                                            return <tr key={index} className="border-t-[1px] border-gray-400">
                                                            <td className="text-left py-3">{bowler.player?(bowler.player.name):("Bowler")}</td>
                                                            <td className="px-4 py-3 text-center">{bowler.over}.{bowler.nth_ball}</td>
                                                            <td className="px-4 py-3 text-center">{bowler.madien_over}</td>
                                                            <td className="px-4 py-3 text-center">{bowler.run}</td>
                                                            <td className="px-4 py-3 text-center">{bowler.wicket}</td>
                                                            <td className="px-4 py-3 text-center">{bowler.economy_rate.toFixed(2)}</td>
                                                        </tr>
                                                        })
                                                    ):("")
                                                ):("")
                                                }
                                            </tbody>
                                        </table>
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                <th scope="col" className="py-3 text-left">Fall of wickets</th>
                                                <th scope="col" className="px-4 py-3">Score</th>
                                                <th scope="col" className="px-4 py-3">Over</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="px-4 py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="px-4 py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="px-4 py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div onClick={()=>setTeamTwoExpand((prev)=>!prev)} className="w-full border-t-[1px] hover:cursor-pointer border-gray-300 h-12 flex items-center bg-green-600">
                                <div className="flex text-white text-md md:text-xl w-11/12 m-auto justify-between items-center gap-2">
                                    <p>{scoreBoard&&scoreBoard.match.team2.team_name.slice(0,17)}</p>
                                    <div className="flex items-center gap-2">
                                    <p className="font-semibold">
                                        {
                                            scoreBoard?(
                                                (scoreBoard.match.toss_winner==scoreBoard.match.team2.id&&scoreBoard.match.elected=="Bat")||(scoreBoard.match.toss_winner==scoreBoard.match.team1.id&&scoreBoard.match.elected=="Bowl")?(scoreBoard.match.first_innings_run+ "-" +scoreBoard.match.first_innings_wicket):(scoreBoard.match.second_innings_run+ "-" +scoreBoard.match.second_innings_wicket)
                                            ):("")
                                        } <span className="text-xs">(
                                            {
                                            scoreBoard?(
                                                (scoreBoard.match.toss_winner==scoreBoard.match.team2.id&&scoreBoard.match.elected=="Bat")||(scoreBoard.match.toss_winner==scoreBoard.match.team1.id&&scoreBoard.match.elected=="Bowl")?(scoreBoard.match.first_innings_nth_over + "." + scoreBoard.match.first_innings_nth_ball):(scoreBoard.match.second_innings_nth_over + "." + scoreBoard.match.second_innings_nth_ball)
                                            ):("")
                                        }
                                        )</span>
                                    </p>
                                        <button>{teamTwoExpand?(<IoIosArrowUp />):(<IoIosArrowDown />)}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all ease-in-out duration-500 ${teamTwoExpand?("max-h-screen"):("max-h-0")}`}>
                                <div className="overflow-x-auto">
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                    <th scope="col" className="py-3 text-left">Batsman</th>
                                                    <th scope="col" className="px-4 py-3">R</th>
                                                    <th scope="col" className="px-4 py-3">B</th>
                                                    <th scope="col" className="px-4 py-3">4s</th>
                                                    <th scope="col" className="px-4 py-3">6s</th>
                                                    <th scope="col" className="px-4 py-3">SR</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                scoreBoard?(
                                                    scoreBoard.team2_batsmans.length>0?(
                                                        scoreBoard.team2_batsmans.map((batsman,index)=>{
                                                            return <tr key={index} className="border-t-[1px] border-gray-400">
                                                            <td className="text-left py-3">{batsman.player?(batsman.player.name):("Batsman")}</td>
                                                            <td className="px-4 py-3 text-center">{batsman.run}</td>
                                                            <td className="px-4 py-3 text-center">{batsman.ball}</td>
                                                            <td className="px-4 py-3 text-center">{batsman.four}</td>
                                                            <td className="px-4 py-3 text-center">{batsman.six}</td>
                                                            <td className="px-4 py-3 text-center">{batsman.strike_rate.toFixed(2)}</td>
                                                        </tr>
                                                        })
                                                    ):("")
                                                ):("")
                                                }
                                            </tbody>
                                        </table>
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                <th scope="col" className="py-3 text-left">Bowler</th>
                                                <th scope="col" className="px-4 py-3">O</th>
                                                <th scope="col" className="px-4 py-3">M</th>
                                                <th scope="col" className="px-4 py-3">R</th>
                                                <th scope="col" className="px-4 py-3">W</th>
                                                <th scope="col" className="px-4 py-3">ER</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                            scoreBoard?(
                                                scoreBoard.team2_bowlers.length>0?(
                                                    scoreBoard.team2_bowlers.map((bowler,index)=>{
                                                        return <tr key={index} className="border-t-[1px] border-gray-400">
                                                        <td className="text-left py-3">{bowler.player?(bowler.player.name):("Bowler")}</td>
                                                        <td className="px-4 py-3 text-center">{bowler.over}.{bowler.nth_ball}</td>
                                                        <td className="px-4 py-3 text-center">{bowler.madien_over}</td>
                                                        <td className="px-4 py-3 text-center">{bowler.run}</td>
                                                        <td className="px-4 py-3 text-center">{bowler.wicket}</td>
                                                        <td className="px-4 py-3 text-center">{bowler.economy_rate.toFixed(2)}</td>
                                                    </tr>
                                                    })
                                                ):("")
                                            ):("")
                                                }
                                            </tbody>
                                        </table>
                                        <table className="text-xs w-full table-auto">
                                            <thead className="bg-green-900/40">
                                            <tr className="border border-gray-400">
                                                <th scope="col" className="py-3 text-left">Fall of wickets</th>
                                                <th scope="col" className="px-4 py-3">Score</th>
                                                <th scope="col" className="px-4 py-3">Over</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="px-4 py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                                <tr className="border-t-[1px] border-gray-400">
                                                    <td className="py-3 text-left">Sujon1</td>
                                                    <td className="px-4 py-3 text-center">22/1</td>
                                                    <td className="px-4 py-3 text-center">4.2</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {/* Over */}
                        <p className="font-semibold text-gray-500 border-b-[1px] border-gray-600">Frist innings</p>
                        {
                            scoreBoard?(
                                scoreBoard.match.first_innings_over.length>0?(
                                    scoreBoard.match.first_innings_over.map((over,index)=>{
                                        return <div className="border-b-[2px] overflow-x-auto p-1 md:p-3 border-gray-400 flex gap-4 w-full">
                                        <div className="flex font-semibold flex-col gap-8">
                                            <p>Ov {index+1}</p>
                                            <p>{over.scored_runs} Runs</p>
                                        </div>
                                        <div className="">
                                        <p className="font-semibold">{over.bowler?.player?.name}</p>
                                        <div className="flex gap-2 text-xs md:text-md">
                                            {over.ball.length>0?(
                                                over.ball.map((bowl,index)=>{
                                                    return <div className="text-center">
                                                    <div className={`md:w-12 md:h-12 ${bowl.runs=="OUT"?("bg-red-600"):bowl.runs=="4"?("bg-orange-500"):bowl.runs=="6"?("bg-green-600"):"bg-white"} w-8 h-8 flex justify-center items-center font-semibold rounded rounded-full border-[2px] border-gray-400`}>
                                                        <p className={`${bowl.runs=="OUT"?("text-white"):bowl.runs=="4"?("text-white"):bowl.runs=="6"?("text-white"):"text-gray-900"} font-semibold`}>{bowl.runs==="OUT"?("Out"):(bowl.runs)}</p>
                                                    </div>
                                                    <p className="font-semibold text-gray-600">{bowl.ball_types}</p>
                                                </div>
                                                })
                                            ):("")}
                                        </div>
                                    </div>
                                </div>
                                    })
                                ):("")
                            ):("")
                        }
                        <p className="font-semibold text-gray-500 border-b-[1px] border-gray-600">Second innings</p>
                        {
                            scoreBoard?(
                                scoreBoard.match.second_innings_over.length>0?(
                                    scoreBoard.match.second_innings_over.map((over,index)=>{
                                        return <div className="border-b-[2px] overflow-x-auto p-1 md:p-3 border-gray-400 flex gap-4 w-full">
                                        <div className="flex font-semibold flex-col gap-8">
                                            <p>Ov {index+1}</p>
                                            <p>{over.scored_runs} Runs</p>
                                        </div>
                                        <div className="">
                                        <p className="font-semibold">{over.bowler?.player?.name}</p>
                                        <div className="flex gap-2 text-xs md:text-md">
                                            {over.ball.length>0?(
                                                over.ball.map((bowl,index)=>{
                                                    return <div className="text-center">
                                                    <div className={`md:w-12 md:h-12 ${bowl.runs=="OUT"?("bg-red-600"):bowl.runs=="4"?("bg-orange-500"):bowl.runs=="6"?("bg-green-600"):"bg-white"} w-8 h-8 flex justify-center items-center font-semibold rounded rounded-full border-[2px] border-gray-400`}>
                                                        <p className={`${bowl.runs=="OUT"?("text-white"):bowl.runs=="4"?("text-white"):bowl.runs=="6"?("text-white"):"text-gray-900"} font-semibold`}>{bowl.runs==="OUT"?("Out"):(bowl.runs)}</p>
                                                    </div>
                                                    <p className="font-semibold text-gray-600">{bowl.ball_types}</p>
                                                </div>
                                                })
                                            ):("")}
                                        </div>
                                    </div>
                                </div>
                                    })
                                ):("")
                            ):("")
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ScoreBoard;