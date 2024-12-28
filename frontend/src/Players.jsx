import { Link, useParams } from "react-router-dom"
import { IoMdContact } from "react-icons/io";
import { HiMiniBars4 } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
const Players = ()=>{
    const [players,setPlayers] = useState()
    const {team_id} = useParams()
    const Token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    // console.log(author_id)
    useEffect(()=>{
        const GetPlayers = async()=>{
            const get_players_list = await fetch(`${VITE_REQUEST_URL}player/list/${team_id}/`,{method:'GET',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            }})
            const response = await get_players_list.json()
            setPlayers(response)
        }
        GetPlayers()
    },[team_id,Token])
    // console.log(players)
    return (
    <div className="">
        {
            players?.length>0?(
                players.map((player,index)=>{
                    return <Link to={`player_details/${player.id}`} key={index} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}} className="flex items-center h-16 gap-4 m-auto mb-4 rounded-md w-full md:w-4/5 p-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded rounded-full font-bold text-white bg-green-500">
                        <span className="text-4xl">
                            <IoMdContact />
                        </span>
                    </div>
                    <div className="flex gap-2 items-center w-full justify-between">
                        <div>
                            <h1 className="font-bold">{player.name}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-2xl"><MdEdit /></button>
                            <button className="text-2xl"><MdDelete /></button>
                            <button className="text-2xl"><HiMiniBars4 /></button>
                        </div>
                    </div>
                    </Link>
                })
            ):("")
        }
    </div>
    )
}

export default Players