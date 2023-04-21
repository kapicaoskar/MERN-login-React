import { Link } from "react-router-dom"
import Header from "./miniComponents/Header.jsx"

export default function Home() {
    if (localStorage.getItem("token")) return window.location.assign("/dashboard")
    return (
        <>
            <title>Strona główna</title>
            <Header />
            <Link to="/register">
                <button className="text-white">Registerka</button>
            </Link>
            <div></div>
            <Link to="/login">
                <button className="text-white">Login</button>
            </Link>
        </>
    )
}