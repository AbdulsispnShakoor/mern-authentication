import { useNavigate } from "react-router-dom"
import Profile from "../components/Profile"


const Dashboard = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-start justify-start w-full min-h-screen">
        <aside className="sidebar bg-blue-500 min-h-screen text-white basis-2/12 px-8 py-4 pb-8 flex justify-between flex-col">
            <button onClick={() => navigate("/")}  className="bg-slate-200 px-16 py-3 rounded-md shadow-lg text-blue-800 font-semibold">Back To Home</button>
            <button onClick={() => navigate("/signin")} className="bg-slate-200 px-16 py-3 rounded-md shadow-lg text-blue-800 font-semibold">Logout</button>

        </aside>
        <article className="bg-slate-200 w-full min-h-screen basis-10/12 flex items-center justify-center">
           <Profile />
        </article>
    </div>
  )
}

export default Dashboard