import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./NavbarStyles.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarInner() {
  const [clicked, setClicked] = React.useState(false);
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Trippy</h1>
      <div className="menu-icons" onClick={() => setClicked(!clicked)}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        {isAdmin() && (
          <li>
            <Link to="/admin" className="nav-links">
              <i className="fa-solid fa-shield-halved"></i> Admin
            </Link>
          </li>
        )}
        <li>
          {isLoggedIn() ? (
            <button className="signup-button" onClick={handleLogout}>
              Logout {user?.name ? `(${user.name})` : ''}
            </button>
          ) : (
            <Link to="/login">
              <button className="signup-button">Login</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavbarInner;
