import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({Token,children})=>{
    if(!Token){
        return <Navigate to="/login" replace/>
    }
    return children
}

export const ProtectedRouteSOPAndCR = ({Token,children})=>{
    const [loading,setLoading] = useState(true)
    const [matchId,setMatchId] = useState(null)
    useEffect(()=>{
        const match_id = localStorage.getItem("match_id")
        setMatchId(match_id)
        setLoading(false)
    },[])
    if(loading){
        return 
    }
    if(!Token || !matchId){
        return <Navigate to="/new_match" replace/>
    }
    return children
}
