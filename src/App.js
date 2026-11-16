import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Products from "./components/Products"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Login  from "./components/Login"
import SingleProduct from "./components/SingleProduct"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import Wishlist from "./components/wishlist"
import { useState } from "react"
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";














const App = () =>{

 

const [loginUser, setLoginUser] = useState(()=>{
  const savedUser = localStorage.getItem("userData")



  return savedUser ? JSON.parse(savedUser) : null
})
   


  return(
    <Router>
      <Navbar displayUser ={loginUser}/>
      <Routes>


        <Route path = "/" element = {<Home  />} />

       

         <Route path = "/Products" element ={<Products displayUser ={loginUser}/>} />

     

        <Route path = "/register" element = {<Register />} />

        <Route path = "/Login" element= {<Login updatedUser ={setLoginUser}/>} />


        <Route path="/Products/:id" element= {<SingleProduct/>} />

        <Route path="/Cart"  element={<Cart />} />

        <Route path="/Wishlist" element={<Wishlist />} />


        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        

    

       
      </Routes>
      <Footer />
      
    </Router>
  )
}
export default App