import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut, IoMdClose } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Navbar.css';

const Navbar = ({ displayUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Tracks mobile menu state
  const user = localStorage.getItem('userData');

  
const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsOpen(false);
    navigate("/Login", { replace: true });
};

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav-container">
      <h2 className="logo">❈ Vastra Elegance</h2>
      
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
      </div>

      {/* Navigation Links */}
      <div className={`haprl-container ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="navlink" onClick={() => setIsOpen(false)}>Home</Link>
        
        {user ? (
          <>
            <Link to="/Products" className="navlink" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/Cart" className="navlink" onClick={() => setIsOpen(false)}>Cart</Link>
            <Link to="/Wishlist" className="navlink" onClick={() => setIsOpen(false)}>Wishlist</Link>
            <Link to="/Orders" className="navlink" onClick={() => setIsOpen(false)}>Orders</Link>
            <p className="user-info"><FaRegUserCircle /> {displayUser?.username}</p>
            <p onClick={handleLogout} className="logout-btn"><IoMdLogOut /></p>
          </>
        ) : (
          <>
            <Link to="/register" className="navlink" onClick={() => setIsOpen(false)}>Register</Link>
            <Link to="/Login" className="navlink" onClick={() => setIsOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
