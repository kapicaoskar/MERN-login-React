import { Link } from "react-router-dom"

export default function Notfound() {
    return (
        <>
            <title>Blad 404</title>
            <p className="text-white">Blad 404</p>
            <Link to="/">
                <button className="text-white bg-indigo-600">Zgubiles sie? Kliknij mnie i chodz na main site!</button>
            </Link>
            <div></div>
        </>
    )
}