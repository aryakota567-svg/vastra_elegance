import { useState } from "react"
import axios from "axios"
import loginimage from "../images/loginimage.png"
import { useNavigate } from "react-router-dom"

import "./Register.css"

const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        
        try {
            const data = { username, email, phone, password }

            const res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/register", data, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }
            })
            console.log(res.data)

            // 1. CRITICAL: Clear React states immediately BEFORE the alert blocks execution
            setUsername("")
            setEmail("")
            setPhone("")
            setPassword("")

            // 2. CRITICAL: Clear the raw DOM values directly so the browser cannot cache them
            e.target.reset()

            // 3. Trigger alert and navigation safely
            alert("Registered Successfully")
            navigate("/Login")
        }
        catch (err) {
            alert("Registration Failed")
            console.log("something went wrong", err)
        }
    }

    return (
        <>
            <div className="registermain">
                <div className="matform">
                    <div>
                        <h3 className="vastraelegancell"> <span className="logilo">❈</span> Vastra Elegance</h3>
                        <h1>Create Your Account</h1>
                        <p>Join Saree Elegance and discover the finest ethnic fashion delivered to your doorstep</p>
                    </div>

                    {/* Added autoComplete="off" to stop sticky behavior */}
                    <form className="formcontainer" onSubmit={handleRegister} autoComplete="off">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={username} 
                            name="reg-fullname"
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />

                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} 
                            name="reg-email"
                            autoComplete="new-email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            value={phone} 
                            name="reg-phone"
                            onChange={(e) => setPhone(e.target.value)} 
                            required
                        />

                        {/* Added missing value bind + autoComplete settings */}
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            name="reg-password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />

                        <button type="submit" className="register-btn">Register</button>
                    </form>
                </div>

                <div>
                    <img src={loginimage} alt="" className="imagelogin" />
                </div>
            </div>
        </>
    )
}
export default Register
