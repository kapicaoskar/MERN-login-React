import axios from "axios";
import { Link } from "react-router-dom"
const validator = require("email-validator");

export default function Login() {
    let mail, password, ip
    const emailValue = (event) => { mail = event.target.value }
    const psswdValue = (event) => { password = event.target.value }
    const discordLogin = () => { window.location.assign("https://discord.com/api/oauth2/authorize?client_id=1092417298813427744&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fdscprocess%3Ftype%3Dlogin&response_type=code&scope=identify%20email") }
    const submit = async () => {
        if (!mail || !password || !validator.validate(mail)) return alert("Sprawdź poprawność maila lub hasła!")
        const res = await axios.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text');
        ip = res.data
        if (!ip) return alert("Niestety nie możemy znaleźć twojego adresu IP!")
        await fetch(`http://localhost:4000/login?email=${mail}&password=${password}&ip=${ip}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.isCreated === false) return alert("Nie posiadasz konta zarejestruj sie juz dzis!")
                if (!data.correctPassword) return alert("Wpisales zle haslo!")
                localStorage.setItem("token", data.token)
                window.location.assign('/dashboard')
            })
    }
    return (
        <>
            <title>Logowanie</title>
            <div className="login-panel bg-slate-600 w-[660px] h-[430px] rounded-xl m-auto justify-center absolute inset-0 ">
                <center><h1 className="text-3xl text-bold text-white mt-3">Zaloguj się</h1>
                    <p className="mt-10 mr-44 text-md text-white text-bold">Twoj mail</p>
                    <input type="email" className="mt-1 w-[250px] h-[40px] rounded-lg" onChange={emailValue} placeholder="Podaj swój email" id="email"></input>
                    <div></div>
                    <p className="mt-5 mr-40 text-md text-white text-bold">Twoje hasło</p>
                    <input type="password" className="mt-1 w-[250px] h-[40px] rounded-lg" onChange={psswdValue} placeholder="Podaj swoje hasło" id="email"></input>
                    <div></div>
                    <button className="bg-sky-700 w-[350px] h-[40px] rounded-lg mt-10 text-white text-bold hover:bg-sky-900 ease-in duration-300" onClick={submit}>Zaloguj się!</button>
                    <button className="bg-indigo-500 hover:bg-indigo-700 w-[350px] h-[40px] rounded-lg mt-3 text-white text-bold ease-in duration-300" onClick={discordLogin}> <i className="fa-brands fa-discord absolute mt-1 ml-[-25px] "></i>Zaloguj się przez discord!</button>
                    <Link to="/register">
                        <p className="text-white text-bold hover:text-sky-700 ease-in duration-300 mt-4 ">Nie masz konta? Zarejestruj się!</p>
                    </Link>
                </center>
            </div>
        </>
    )
}