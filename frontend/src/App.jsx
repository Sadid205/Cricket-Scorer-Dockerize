import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Home"
import NewMatch from "./NewMatch"
import CountRuns from "./CountRuns"
import SelectOpeningPlayer from "./SelectOpeningPlayer"
import Header from "./Header"
import Register from "./Register"
import Login from "./Login"
import {ProtectedRoute,ProtectedRouteSOPAndCR} from "./ProtectedRoute"

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
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App