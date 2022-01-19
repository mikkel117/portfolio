import React, { useEffect } from "react";
import "./App.scss";

import Nav from "./component/header-footer/nav";
import Footer from "./component/header-footer/footer";
import Cookie from "./component/page/Cookie";
import FetchContextProvider from "./contexts/Fetch";

function App() {
  useEffect(() => {
    document.title = "Portfolio";
  }, []);
  return (
    <div className='app'>
      <FetchContextProvider>
        <Nav />
        {/* <Cookie /> */}
        <Footer />
      </FetchContextProvider>
    </div>
  );
}

export default App;
