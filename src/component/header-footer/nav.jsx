import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../page/home";
import Projekter from "../page/work";
import OmMig from "../page/aboutMe";
import Uddannelsesplan from "../page/EducationPlan";
import ERP from "../page/ERPInvoice";
import Login from "../page/Login";
import NotFound from "../page/NotFound";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    size.width > 600 ? setToggle(true) : setToggle(false);
  }, [size]);

  const closeNav = () => {
    if (size.width < 600) {
      setToggle(!toggle);
    }
  };

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
                  <Link to='/' onClick={() => closeNav()}>
                    Forside
                  </Link>
                </li>
                <li>
                  <Link to='/Projekter' onClick={() => closeNav()}>
                    Projekter
                  </Link>
                </li>
                <li>
                  <Link to='/omMig' onClick={() => closeNav()}>
                    Om mig
                  </Link>
                </li>
                <li>
                  <Link to='/Uddannelsesplan' onClick={() => closeNav()}>
                    Uddannelsesplan
                  </Link>
                </li>
                <li>
                  <Link to='/Erp' onClick={() => closeNav()}>
                    ERP
                  </Link>
                </li>
              </div>
            </ul>
            <div className='background-close' onClick={() => closeNav()} />
          </>
        ) : (
          <i
            className='fas fa-bars open'
            onClick={() => {
              setToggle(!toggle);
            }}></i>
        )}
      </nav>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/Projekter' exact component={Projekter}></Route>
        <Route path='/omMig' exact component={OmMig}></Route>
        <Route
          path='/Uddannelsesplan'
          exact
          component={Uddannelsesplan}></Route>
        <Route path='/Erp' exact component={ERP}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}
