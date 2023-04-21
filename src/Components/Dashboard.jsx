import { useState } from "react"
import axios from "axios";


export default function Dashboard() {
    let ip
    const [mail, setMail] = useState('your mail')
    window.addEventListener("load", async (event) => {
        const token = localStorage.getItem("token")
        if (!token) return window.location.assign("/login")
        const res = await axios.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text');
        ip = res.data
        if (!ip) return alert("Niestety nie możemy znaleźć twojego adresu IP!")
        await fetch(`http://localhost:4000/checktoken?token=${token}&ip=${ip}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.resMessage === "correctToken") {
                    setMail(data.email)
                } else {
                    localStorage.removeItem("token")
                    window.location.assign("/login")
                }
            })
    });
    return (
        <>
            <title>Panel</title>
            <p className="text-white">Witaj w panelu pedrylu bity z emailem {mail}</p>
        </>
    )
}
