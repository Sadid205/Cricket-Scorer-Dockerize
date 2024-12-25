import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
const PlayerDetails = ()=>{
    const [playersData,setPlayersData] = useState()
        const {id} = useParams()
        const Token = localStorage.getItem("Token")
        const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
        // console.log(author_id)
        useEffect(()=>{
            const GetPlayersData = async()=>{
                const get_data = await fetch(`${VITE_REQUEST_URL}player/player_details/${id}/`,{method:'GET',headers:{
                    Authorization:`Token ${Token}`,
                    "Content-Type":"application/json"
                }})
                const response = await get_data.json()
                setPlayersData(response)
            }
            GetPlayersData()
        },[id,Token])
    const [select,setSelect] = useState({
        Batting:true,
        Bowling:false,
        Fielding:false
    })
    
    const handleSelect=(key)=>{
        setSelect({
            Batting: key==="Batting",
            Bowling: key==="Bowling",
            Fielding: key==="Fielding",
        })
    }
    return (
        <div>
            <div className="h-screen">
                <div className="h-1/3 relative -z-50 flex items-center justify-center bg-green-800">
                    <span style={{fontSize:'100px'}} className="text-gray-400"><IoPersonSharp /></span>
                    <div className="absolute bottom-6 left-6">
                        <h1 className="font-bold text-3xl text-white">{playersData?playersData.name:"Player Name"}</h1>
                    </div>
                </div>
                <div className="">
                    <div className="bg-green-600 relative h-12">
                        <div className="w-full h-full text-white font-bold text-xl grid grid-cols-3">
                            <button onClick={()=> handleSelect("Batting")}>Batting</button>
                            <button onClick={()=> handleSelect("Bowling")}>Bowling</button>
                            <button onClick={()=> handleSelect("Fielding")}>Fielding</button>
                        </div>
                         <div
                            style={{
                                transform:`translate(${select.Batting?0:select.Bowling?"100%":"200%"})`,
                                transition:"transform 0.3s ease-in"
                            }}
                           className="bg-gray-600 h-1 absolute bottom-0 left-0 w-1/3"
                        ></div>
                    </div>
                    <div className="w-full overflow-hidden">
                    <div style={{transform: select.Batting?"translateX(0%)":select.Bowling?"translateX(-33%)":"translateX(-67%)",transition:"transform 0.5s ease-in-out"}} className="flex w-[300%]">
                    <div className={`grid gap-3 grid-cols-3 w-screen`}>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Matches</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].matches.length):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Innings</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].innings):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Runs</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].runs):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Not Outs</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].not_outs):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Best Score</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].best_score):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Strike Rate</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].strike_rate):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Average</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].average):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Fours</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].fours):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Sixes</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].sixs):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Thirties</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].thirties):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Fifties</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].fifties):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Hundreds</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].hundreds):("0")}</p>
                                </div>
                            </div>
                            <div style={{
                                boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                                <div className="text-center font-bold md:text-4xl">
                                <h1 >Ducks</h1>
                                <p>{playersData?.batting.length>0?(playersData.batting[0].duckes):("0")}</p>
                                </div>
                            </div>
                        </div>
                    {
                        <div className={`grid gap-3 w-screen grid-cols-3`}>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Matches</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].matches.length):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Innings</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].innings):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Overs</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].overs):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Maidens</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].madiens):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Wickets</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].wickets):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Runs</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].runs):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >B.Bowling</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].best_bowling):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Eco.Rate</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].economy_rate):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Wides</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].wides):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >No Balls</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].no_balls):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Dots balls</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].dot_balls):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >4 Wickets</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].tetra_wickets):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >5 Wickets</h1>
                            <p>{playersData?.bowling.length>0?(playersData.bowling[0].penta_wickets):("0")}</p>
                            </div>
                        </div>
                    </div>
                    }
                    {
                        <div className={`grid gap-3 w-screen grid-cols-2`}>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Matches</h1>
                            <p>{playersData?.fielding.length>0?(playersData.fielding[0].matches.length):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Catches</h1>
                            <p>{playersData?.fielding.length>0?(playersData.fielding[0].catches):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Stumpings</h1>
                            <p>{playersData?.fielding.length>0?(playersData.fielding[0].stumpings):("0")}</p>
                            </div>
                        </div>
                        <div style={{
                            boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }} className="w-24 flex items-center justify-center md:w-60 md:h-60 m-auto h-24">
                            <div className="text-center font-bold md:text-4xl">
                            <h1 >Run Outs</h1>
                            <p>{playersData?.fielding.length>0?(playersData.fielding[0].run_outs):("0")}</p>
                            </div>
                        </div>
                    </div>
                    }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PlayerDetails