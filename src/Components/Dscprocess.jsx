import { useSearchParams } from "react-router-dom"
import axios from "axios";

export default function Home() {
    const [searchParams] = useSearchParams();
    window.addEventListener("load", async (event) => {
        let ip
        const code = searchParams.get("code")
        const type = searchParams.get("type")
        if (!code || !type) return window.location.assign("/login")
        const res = await axios.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text');
        ip = res.data
        if (!ip) return alert("Niestety nie możemy znaleźć twojego adresu IP!")
        if (type === "register") {
            fetch(`http://localhost:4000/dscregister?code=${code}&ip=${ip}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.isCreated) return alert("posiadasz juz konto"), window.location.assign("/login")
                    localStorage.setItem("token", data.loginToken)
                    window.location.assign("/dashboard")
                })
        }
        if (type === "login") {
            fetch(`http://localhost:4000/dsclogin?code=${code}&ip=${ip}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.isCreated) return alert("nie posiadasz konta stworz je!"), window.location.assign("/register")
                    if (!data.canLogin) return alert("To konto nie jest stworzone za pomoca logowania Discord!"), window.location.assign("/register")
                    localStorage.setItem("token", data.loginToken)
                    window.location.assign("/dashboard")
                })
        }
    })
    return (
        <>
            <title>Proces logowania discord</title>
            <p className="text-white">Prosze czekac trwa sprawdzanie twojego logowania</p>
        </>
    )
}