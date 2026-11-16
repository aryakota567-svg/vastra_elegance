import { useParams } from "react-router-dom"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./singleproduct.css"


import { FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdReturnLeft } from "react-icons/io";
import { GrSecure } from "react-icons/gr";




const SingleProduct = () =>{


    const {id}= useParams()


    const [singleItem,setSingleItem] = useState(null)

    const handleSingleProduct = useCallback(  async () =>{
        try{
            const res = await axios.get(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products?id=eq.${id}`,{
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA`,
                },
})
            console.log(res.data[0])
            setSingleItem(res.data[0])


        }
        catch(err){
            console.log("something went wrong",err)
        }
        
    },[id])

  useEffect(()=>{
    handleSingleProduct();
  }, [handleSingleProduct]);
    return (
        <>
       <div className="sublinkshomepro">
         <Link to="/" className="homeproducts">Home</Link>/
        <Link to="/Products" className="homeproducts">Products</Link>/
        <span>{singleItem?.title}</span>
       </div>
    { singleItem ? ( 
        <div className="child-singlepro">
                <img src = {singleItem.image} alt="" className="singleprodimg" />
               <div className="matt-containersingle">
                 <h3>{singleItem.title}</h3>
                 <div className="ratingsatrs">
                <h6 className="starsive"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <CiStar />  </h6>
                 <h6>4.2</h6>
                 <h6 className="onetworeviews">(128 reviews)</h6>
                 </div>
                <h4> ₹{singleItem.price}</h4><hr />
                <p>{singleItem.description}</p>
                <p className="instockquan"><MdDone /> in stock ({singleItem.stock} Availabe)  </p>
                <div className="btn-btn-cont">
                <button className="buttonsubq"><MdAddShoppingCart /> Add to Cart</button>
                <button className="buttonsubqb">Buy Now</button>
                <button className="wishlistbttn"><FaRegHeart /></button>
                </div>


                <div className="truckreturn">
                    <div className="subtruck">
                        <h4><CiDeliveryTruck /></h4>
                        <div>
                        <h6>Free Shipping</h6>
                        <p>On orders above ₹999</p>
                        </div>
                    </div>

                    <div className="subtruck">
                       <h4><IoMdReturnLeft /></h4>
                        <div>
                        <h6>Easy Returns</h6>
                        <p>7-day return policy</p>
                        </div>
                    </div>

                    <div className="subtruck">
                        <h4><GrSecure /></h4>
                        <div>
                        <h6>Secure Payment</h6>
                        <p>100% protected</p>
                        </div>

                    </div>
                </div>

                
               
                </div>
            </div>) : (<h1>No Product Found</h1>)

    }

    
    



   
    
        </>
    )
}
export default SingleProduct