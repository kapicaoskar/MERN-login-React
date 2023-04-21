import { useSearchParams } from "react-router-dom"
import axios from "axios";

export default function Home() {
    const [searchParams] = useSearchParams();
    window.addEventListener("load", async (event) => {
        let ip
        const code = searchParams.get("token")
        const type = searchParams.get("type")
        // const res = await axios.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text');
        // ip = res.data
        // if (!ip) return alert("Niestety nie możemy znaleźć twojego adresu IP!")
    })
    return (
        <>
            <title>Proces logowania steam</title>
            <p className="text-white">Prosze czekac trwa sprawdzanie twojego logowania</p>
        </>
    )
}