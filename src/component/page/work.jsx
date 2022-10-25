import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Fetch from "../functions/Fetch";

export default function Work() {
  const { register, handleSubmit } = useForm();

  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchArray, setSearchArray] = useState([]);

  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    setLoad(true);
    const FetchData = async () => {
      const { data, catchError } = await Fetch("posts");
      if (catchError) {
        setError(true);
      } else {
        setPostData(data);
      }
      setLoad(false);
    };
    FetchData();
  }, []);

  const onSubmit = (data) => FilterByTag(data);

  const FilterByTag = (data) => {
    if (data.platform === "0" && data.language === "0") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
      const i = postData.filter((o) => o.tag.includes(data.platform));
      if (data.language !== "0") {
        setSearchArray(i.filter((o) => o.tag.includes(data.language)));
      } else {
        setSearchArray(i);
      }
      if (data.platform === "0" && data.language !== "0") {
        setSearchArray(postData.filter((o) => o.tag.includes(data.language)));
      }
    }
  };

  const ProjectsModal = (number) => {
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
      {load ? (
        <div className='loading'>
          <div className='loader'>Loading...</div>
        </div>
      ) : (
        <>
          <div className='searchWrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <select {...register("platform")}>
                <option value='0'>vælg platform</option>
                <option value='desktop'>desktop</option>
                <option value='web'>web</option>
              </select>
              <select {...register("language")}>
                <option value='0'>vælg sprog</option>
                <option value='c#'>c#</option>
                <option value='html'>html</option>
              </select>
              <button type='submit'>søg</button>
            </form>
          </div>
          <section className='work'>
            {error ? (
              <p className='error'>failed to connect to firebase</p>
            ) : (
              <>
                {isSearch ? (
                  <>
                    {searchArray &&
                      searchArray.map((data) => {
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
                {ProjectsModal(number)}
              </div>
              <div
                className='background-close'
                onClick={() => setToggle(false)}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
