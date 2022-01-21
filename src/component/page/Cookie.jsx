import React from "react";
import useCookie from "react-use-cookie";

export default function Cookie() {
  const [cookie, setCookie] = useCookie("cookie", false, {
    expires: 1,
    path: "/",
  });
  return (
    <>
      {cookie ? (
        <></>
      ) : (
        <section className='cookie-policy-wrapper'>
          <div className='cookie-policy-content'>
            <p>denne hjemmeside bruger cookies</p>
            <button
              onClick={() => {
                setCookie(true);
              }}>
              Tillad
            </button>
          </div>
        </section>
      )}
    </>
  );
}
