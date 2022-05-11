import React, { useEffect, useContext } from "react";

export default function ERPInvoice() {
  useEffect(() => {
    fetch("https://localhost:7110/home", {
      Method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section>
      <h1>ERP test</h1>
    </section>
  );
}
