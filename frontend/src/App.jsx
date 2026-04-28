import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CountRuns from "./CountRuns"
import Header from "./Header"
import History from "./History"
import Home from "./Home"
import Login from "./Login"
import NewMatch from "./NewMatch"
import PlayerDetails from "./PlayerDetails"
import Players from "./Players"
import { ProtectedRoute, ProtectedRouteSOPAndCR } from "./ProtectedRoute"
import Register from "./Register"
import ScoreBoard from "./Scoreboard"
import SelectOpeningPlayer from "./SelectOpeningPlayer"
import Teams from "./Teams"

const App = () =>{
  const [Token, setToken] = useState(() => localStorage.getItem("Token"))
  const [match_id, setMatchId] = useState(() => localStorage.getItem("match_id"))
  useEffect(()=> {
      const handleStorageChange = () => {
      setToken(localStorage.getItem("Token"))
      setMatchId(localStorage.getItem("match_id"))
    }
    
    window.addEventListener("localStorageUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange)
    }
  },[])
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new_match" element={
          <ProtectedRoute Token={Token}>
            <NewMatch/>
          </ProtectedRoute>
        }/>
        <Route path="/select_opening_player" element={
          <ProtectedRouteSOPAndCR Token={Token} match_id={match_id}>
            <SelectOpeningPlayer/>
          </ProtectedRouteSOPAndCR>
        }/>
        <Route path="/count_runs" element={
          <ProtectedRouteSOPAndCR Token={Token} match_id={match_id}>
            <CountRuns/>
          </ProtectedRouteSOPAndCR>}/>
        <Route path="/teams/:author_id" element={
          <ProtectedRoute Token={Token}>
            <Teams/>
          </ProtectedRoute>}/>
        <Route path="/teams/:author_id/players/:team_id" element={
          <ProtectedRoute Token={Token}>
            <Players/>
          </ProtectedRoute>}/>
        <Route path="/teams/:author_id/players/:team_id/player_details/:id" element={
          <ProtectedRoute Token={Token}>
            <PlayerDetails/>
          </ProtectedRoute>}/>
        <Route path="/history/:author_id" element={
          <ProtectedRoute Token={Token}>
            <History/>
          </ProtectedRoute>}/>
        <Route path="history/:author_id/scoreboard/:match_id" element={
          <ProtectedRoute Token={Token}>
            <ScoreBoard/>
          </ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App