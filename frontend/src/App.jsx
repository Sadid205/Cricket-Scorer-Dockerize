import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Home"
import NewMatch from "./NewMatch"
import CountRuns from "./CountRuns"
import SelectOpeningPlayer from "./SelectOpeningPlayer"
import Header from "./Header"
import Register from "./Register"
import Login from "./Login"
import {ProtectedRoute,ProtectedRouteSOPAndCR} from "./ProtectedRoute"
import Teams from "./Teams"
import Players from "./Players"
import PlayerDetails from "./PlayerDetails"
import History from "./History"
import ScoreBoard from "./Scoreboard"

const App = () =>{
  const Token = localStorage.getItem("Token")
  const match_id = localStorage.getItem("match_id")
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