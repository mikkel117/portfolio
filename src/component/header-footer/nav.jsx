import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../page/home";
import Projekter from "../page/work";
import OmMig from "../page/aboutMe";
import Uddannelsesplan from "../page/EducationPlan";
import Login from "../page/Login";

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  return size;
}

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [height, width] = useWindowSize();

  useEffect(() => {
    const ChackWidth = () => {
      let getWidth = width;
      if (getWidth === "601" || getWidth > "601") {
        setToggle(true);
      }
    };
    ChackWidth();
  }, [width]);

  return (
    <Router>
      <nav>
        {toggle ? (
          <>
            <ul className='list-inline'>
              <div className='sidepanel'>
                <div
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  className='close'>
                  X
                </div>
                <li>
                  <Link to='/'>Forside</Link>
                </li>
                <li>
                  <Link to='/Projekter'>Projekter</Link>
                </li>
                <li>
                  <Link to='/omMig'>Om mig</Link>
                </li>
                <li>
                  <Link to='/Uddannelsesplan'>Uddannelsesplan</Link>
                </li>
              </div>
            </ul>
          </>
        ) : (
          <i
            className='fas fa-bars open'
            onClick={() => {
              setToggle(!toggle);
            }}></i>
        )}
      </nav>
      <Route path='/' exact component={Home}></Route>
      <Route path='/Projekter' exact component={Projekter}></Route>
      <Route path='/omMig' exact component={OmMig}></Route>
      <Route path='/Uddannelsesplan' exact component={Uddannelsesplan}></Route>
      <Route path='/login' exact component={Login}></Route>
    </Router>
  );
}
