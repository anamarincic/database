import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.styles.css";

export function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/addNewDog") {
      setActiveTab("AddDog");
    }
  }, [location]);

  return (
    <header>
      <h1 className="header__heading">Dogs</h1>
      <div className="header__navigation">
        <NavLink to="/">
          <p className={`${activeTab === "Home" ? "active" : ""}`}>Home</p>
        </NavLink>
        <NavLink to="/addNewDog">
          <p className={`${activeTab === "AddDog" ? "active" : ""}`}>Add Dog</p>
        </NavLink>
      </div>
    </header>
  );
}
