import axios from "axios";
const validator = require("email-validator");

export default function Register() {
    let mail, password, ip
    const emailValue = (event) => { mail = event.target.value }
    const psswdValue = (event) => { password = event.target.value }
    const discordRegister = () => { window.location.assign("https://discord.com/api/oauth2/authorize?client_id=1092417298813427744&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fdscprocess%3Ftype%3Dregister&response_type=code&scope=identify%20email") }
    const submit = async () => {
        if (!mail || !password || !validator.validate(mail)) return alert("Sprawdź poprawność maila lub hasła!")
        const res = await axios.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text');
        ip = res.data
        if (!ip) return alert("Niestety nie możemy znaleźć twojego adresu IP!")
        await fetch(`http://localhost:4000/register?email=${mail}&password=${password}&ip=${ip}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.isCreated) return alert("Posiadasz już konto zalożone na ten adres email!")
                localStorage.setItem("token", data.loginToken)
                window.location.assign('/dashboard')
            })
    }
    return (
        <>
            <title>Rejestracja</title>
            <div className="register-panel bg-slate-600 w-[660px] h-[430px] rounded-xl m-auto justify-center absolute inset-0 ">
                <center><h1 className="text-3xl text-bold text-white mt-3">Zarejestruj się</h1>
                    <p className="mt-10 mr-44 text-md text-white text-bold">Twoj mail</p>
                    <input type="email" onChange={emailValue} className="mt-1 w-[250px] h-[40px] rounded-lg" placeholder="Podaj swój email" id="email"></input>
                    <div></div>
                    <p className="mt-5 mr-40 text-md text-white text-bold">Twoje hasło</p>
                    <input type="password" onChange={psswdValue} className="mt-1 w-[250px] h-[40px] rounded-lg" placeholder="Podaj swoje hasło" id="psswd"></input>
                    <div></div>
                    <button className="bg-sky-700 w-[350px] h-[40px] rounded-lg mt-10 text-white text-bold hover:bg-sky-900 ease-in duration-300" onClick={submit}>Zarejestruj się!</button>
                    <button className="bg-indigo-500 hover:bg-indigo-700 w-[350px] h-[40px] rounded-lg mt-3 text-white text-bold ease-in duration-300" onClick={discordRegister}> <i className="fa-brands fa-discord absolute mt-1 ml-[-25px] "></i>Zarejestruj się przez discord!</button>
                </center>
            </div>
        </>
    )
}