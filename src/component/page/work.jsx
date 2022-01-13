import React, { useState, useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";

export default function Work() {
  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState();
  const { postData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);

  const ProjectsChose = (number) => {
    return (
      <>
        <h1>{postData[number].title}</h1>
        <img className='modalImg' src={postData[number].img} alt=' ' />
        <p>{postData[number].text}</p>
        <div className='work-links'>
          {postData[number].link ? (
            <a href={postData[number].link} target='_blank' rel='noreferrer'>
              <i className='fas fa-desktop fa-2x'></i>
            </a>
          ) : (
            <> </>
          )}

          {postData[number].githubLink ? (
            <a
              href={postData[number].githubLink}
              target='_blank'
              rel='noreferrer'
              className='github-link'>
              <i className='fab fa-github fa-2x'></i>
            </a>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  return (
    <section className='workSection'>
      <section className='work'>
        {error ? (
          <p className='error'>failed to connect to firebase</p>
        ) : (
          <>
            {load ? (
              <>
                <div className='loader'>Loading...</div>
              </>
            ) : (
              <>
                {postData &&
                  postData.map((data) => {
                    return (
                      <img
                        src={data.img}
                        onClick={() => {
                          setToggle(!toggle);
                          setNumber(data.index);
                        }}
                        alt=''
                        key={data.index}
                      />
                    );
                  })}
              </>
            )}
          </>
        )}
      </section>
      {toggle && (
        <div className='modal'>
          <div className='modal-content'>
            <p
              className='close'
              onClick={() => {
                setToggle(!toggle);
                setNumber();
              }}>
              x
            </p>
            {ProjectsChose(number)}
          </div>
        </div>
      )}
    </section>
  );
}
