import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";

export default function Login() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [login, setLogin] = useState();
    const [errorMessage, setErrorMeassage] = useState();
    const [toggle, setToggle] = useState(false);
    const [load, setLoad] = useState(false);
    const [pass, setPass] = useState();
    const [email, setEmail] = useState();



    let userDataItems = [];

    const auth = getAuth();
    const user = auth.currentUser;


    const UpDateUser = (userName) => {
        updateProfile(auth.currentUser, { displayName: userName }) 
        .then(() => {}) 
        .catch((error) =>{ console.log("update profile error", error); })
    }


    const authFetch = (email, password  ) => {
        setLoad(true);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLogin(user);
                setErrorMeassage("");
    
            })
            .catch((error) => {
               /*  const errorCode = error.code; */
                const errorMessage = error.message;
                setErrorMeassage(errorMessage);
                console.log("profile errorMessage", errorMessage);
            })
            setLoad(false);
        }
    

        const onChangeName = data => {
            UpDateUser(data.userName)
            authFetch(email, pass);
        }

    if(user !== null){
        user.providerData.forEach((profile) => {
            userDataItems.push(profile)
        })
    }
    const onSubmit = data => { 
    authFetch(data.email, data.password);
    setPass(data.password);
    setEmail(data.email);
    }

    return (
        <section className="login">
            <h1>Login på firbase</h1>
            {login ? (
                <>
                {load ? (
                    <div className="loader">Loading...</div> 
                ) : (
                    <>
            {
                userDataItems && userDataItems.map(data => {
                    return(
                        <div className="loggedIn">
                       <span>Profile photo: <br /><img src={data.photoURL} alt="" /></span>
                        <p>profile name: {data.displayName}</p>
                        <p>profile email: {data.email}</p>
                        </div>
                    )
                })
            }
                <div><p onClick={() => {setToggle(!toggle)}} className="login-toggle">klik here</p> for at ændre navnet </div>
                {toggle ? (
                <><form onSubmit={handleSubmit(onChangeName)} className="cange-name-form">
        <input {...register("userName", {required: true} )} />
        {errors.userName && <span>dette fælt er påkrævet</span>}
        <input type="submit" />    
    </form>
                </>
                ) : (<></>)}
                <button className="logout" onClick={() => {setLogin(""); setToggle(!toggle)}}>logud</button>
                </>
                )}
                </>
            ) : (
                <>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="email" {...register("email")} />
                <br />
                <input placeholder="password" {...register("password", { required: true })} />
                <br />
                {errors.password && <span>dette fælt er påkrævet</span>} <br />
                <input type="submit" value="login" />
            </form> <br />
            <p>brug de her til at logge på  <br /> <br />
            email: test@test.com <br /> <br />
            password: 123456
            </p>
            {errorMessage ? ( <p className="error">{errorMessage}</p> ) : (<></>)}
            </>
            )}
        </section>
    )
}
