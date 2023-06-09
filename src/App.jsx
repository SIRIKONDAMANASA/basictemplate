import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import UserProfile from "./components/userprofile";
import Logout from "./components/logout";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Just from "./components/just";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import "./css/nivo-lightbox/default.css";
// import "./css/nivo-lightbox/nivo-lightbox.css";
import "./css/login.css";
import "./css/userprofile.css"
import Login from "./components/login";
import SignUp from "./components/signup";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <BrowserRouter>
    <div>
    <Navigation />
   
      <Switch>
      
      <Route path="/login" >
         <Login/>
         </Route>
         <Route path="/signup" >
         <SignUp/>
         </Route>
         <Route path="/features" >
         <Features data={landingPageData.Features} />
         </Route>
         <Route path="/about" >
         <About data={landingPageData.About} />
         </Route>
         <Route path="/services" >
         <Services data={landingPageData.Services} />
         </Route>
         <Route path="/gallery" >
         <Gallery data={landingPageData.Gallery} />
         </Route>
         <Route path="/testimonals" >
         <Testimonials data={landingPageData.Testimonials} />
         </Route>
      
         <Route path="/team" >
         <Team data={landingPageData.Team} />
         </Route>
         <Route path="/contact" >
         <Contact data={landingPageData.Contact} />
         </Route>
         <Route path="/userprofile" >
         <UserProfile/>
         </Route>
         <Route path="/logout" >
         <Logout />
         </Route>

         <Route path="/" >
      <Header data={landingPageData.Header} />
         </Route>
     
     
    {/* /**<Just/>**/ }
      </Switch>
      
    </div>
    </BrowserRouter>
    
  );
};

export default App;
