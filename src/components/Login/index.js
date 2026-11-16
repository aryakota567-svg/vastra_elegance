
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import "./login.css"
import loginpageimage from "../images/loginpageimg.png"

const Login = ({ updatedUser }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Clear inputs whenever Login page opens
    useEffect(() => {
        setEmail("")
        setPassword("")
    }, [location.key])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.get(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/register?email=eq.${email}&password=eq.${password}`,
                {
                    headers: {
                        apikey:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",

                        Authorization:
                            "eyJhbGciOiJIUzI1NiIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA"
                    }
                }
            )

            if (res.data.length > 0) {

                const user = res.data[0]

                const userData = {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }

                localStorage.setItem(
                    "userData",
                    JSON.stringify(userData)
                )

                updatedUser(userData)

                // Clear input fields
                setEmail("")
                setPassword("")

                alert("Login Successfully")

                navigate("/")

            } else {

                alert("Invalid Email or Password")

            }

        } catch (err) {

            alert("login Failed")

            console.log("something went wrong", err)

        }
    }

    return (
        <>
            <div className="registermain">

                <div className="matform">

                    <div>
                        <h3 className="vastraelegancell">
                            <span className="logilo">❈</span> Vastra Elegance
                        </h3>

                        <h1>Welcome Back!</h1>

                        <p>
                            Login to your account to continue shopping your favourite ethnic wear.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="formcontainer"
                    >

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />

                        <button className="register-btn" type="submit">
                            Login
                        </button>

                    </form>

                </div>

                <div>
                    <img
                        src={loginpageimage}
                        alt=""
                        className="imagelogin"
                    />
                </div>

            </div>
        </>
    )
}

export default Login
