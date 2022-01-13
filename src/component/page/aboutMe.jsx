import React from "react";

export default function AboutMe() {
  const [openMini, setOpenMini] = React.useState(0);
  const [close, setClose] = React.useState(3);
  const [toggle, setToggle] = React.useState(true);

  const AnimeEnd = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 500);
  };
  return (
    <>
      <section className='about-me'>
        {toggle ? (
          <div className='about-me-content' close={close}>
            <div className='content-top'>
              <p
                className='close'
                onClick={() => {
                  setClose(1);
                  AnimeEnd();
                }}></p>
              <p className='mini' onClick={() => setOpenMini(1)}></p>
              <p className='big' onClick={() => setOpenMini(0)}></p>
            </div>
            <p className='content-text' openMini={openMini}>
              hvem er jeg? <br /> Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Cumque laborum recusandae dolore nesciunt, nam
              magnam explicabo laudantium error optio incidunt saepe rem sed
              dolores quasi architecto enim. Consequatur reiciendis animi odio
              voluptatibus cum? Tenetur nesciunt odit nisi saepe, beatae quaerat
              ratione impedit, maiores est excepturi explicabo nam totam
              assumenda ut!
            </p>
          </div>
        ) : (
          <div className='openFormWrapper'>
            <button
              className='openForm'
              onClick={() => {
                setClose(0);
                setToggle(!toggle);
              }}>
              {" "}
              klik mig for at åben formen igen{" "}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
