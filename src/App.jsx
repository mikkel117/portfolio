import React, { useEffect } from "react";
import "./style/App.scss";

import Nav from "./component/header-footer/nav";
import Footer from "./component/header-footer/footer";

function App() {
  return (
    <div className='App'>
      {/* <FetchContextProvider> */}
      <Nav />
      {/* <Cookie /> */}
      <Footer />
      {/* </FetchContextProvider> */}
    </div>
  );
}

export default App;
