import React from 'react'
import useCookie from 'react-use-cookie';

export default function Cookie() {
    const [cookie, setCookie] = useCookie('cookie', false);
    return (
        <>
        {cookie ? (
            <>
            </>
        ) : (
            <section className="cookie-policy-wrapper">
                <div className="cookie-policy-content"> 
                <p>der bliver ikke gemt andet end denne cookie</p>
                <button onClick={() => { setCookie(true);}}>Tillad</button>
                </div>
                
            </section>
        )}
        </>
    )
}
