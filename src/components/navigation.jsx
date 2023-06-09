import React from "react";
import {NavLink} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export const Navigation = (props) => {
  const [isauth,setisAuth]=useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('userdata')) {
      setisAuth(true);
      
    }
  },[isauth])
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <NavLink className="navbar-brand page-scroll" activeClassName="active" to="/">React Landing Page</NavLink>
          {/* <a className="navbar-brand page-scroll" href="#page-top">
            React Landing Page
          </a>{" "} */}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
            <NavLink className="page-scroll" activeClassName="active" to="/features">Features</NavLink>
              {/* <a href="/features" className="page-scroll">
                Features
              </a> */}
            </li>
          
            <li>
            <NavLink className="page-scroll" activeClassName="active" to="/about">About</NavLink>
              {/* <a href="#about" className="page-scroll">
                About
              </a> */}
            </li>
            <li>
            <NavLink className="page-scroll" activeClassName="active" to="/services">Services</NavLink>
              {/* <a href="#services" className="page-scroll">
                Services
              </a> */}
            </li>
           
            {isauth==false ? (
              <>
             <li>
              <NavLink className="page-scroll" activeClassName="active" to="/login">Login</NavLink>
              {/* <a href="/features" className="page-scroll">
                Features
              </a> */}
            </li>
            <li>
            <NavLink className="page-scroll" activeClassName="active" to="/signup">SignUp</NavLink>
              {/* <a href="#about" className="page-scroll">
                About
              </a> */}
            </li>
            </>):(
               <>
               <li>
               <NavLink className="page-scroll" activeClassName="active" to="/userprofile">
                 My Account
               </NavLink>
               </li>
              <li> <NavLink className="page-scroll" activeClassName="active" onClick={() => window.location.reload(false)} to="/logout">
                 Logout
               </NavLink></li>
              
             </>
            )}

            
            {/* <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
            <NavLink className="page-scroll" activeClassName="active" to="/contact">Contact</NavLink>
              {/* <a href="#contact" className="page-scroll">
                Contact
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
