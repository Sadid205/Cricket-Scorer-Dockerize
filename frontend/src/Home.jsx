import { Link } from "react-router-dom"
import { MdSportsCricket } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

const Home = ()=>{
    const author_id = localStorage.getItem("author_id")
    const match_id = localStorage.getItem("match_id")
    return (
    <div style={{height:'100vh'}} className="flex bg-slate-200 justify-center items-center">
        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="flex bg-slate-200 border border-gray-300  p-6 rounded-md gap-6 items-center">
            <div style={{boxShadow:" 2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}} className="flex border border-gray-300 p-3 rounded rounded-3 text-green-700 flex-col items-center justify-center">
            <MdSportsCricket/>
            <Link to={'/new_match'} className="font-bold">
                New Match
            </Link>
            </div>
            <div style={{boxShadow:" 2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}} className="flex border border-gray-300 p-3 rounded rounded-3 text-green-700 flex-col items-center justify-center">
            <GiTeamIdea />
            <Link to={`/teams/${author_id}`} className="font-bold">
                Teams
            </Link>
            </div>
            <div style={{boxShadow:" 2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}} className="flex border border-gray-300 p-3 rounded rounded-3 text-green-700 flex-col items-center justify-center">
            <FaHistory />
            <Link to={`/history/${author_id}`} className="font-bold">
                History
            </Link>
            </div>
        </div>
    </div>
    )
}

export default Home