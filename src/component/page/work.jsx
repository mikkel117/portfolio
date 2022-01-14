import React, { useState, useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";
import { useForm } from "react-hook-form";

export default function Work() {
  const { register, handleSubmit } = useForm();

  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchArray, setSearchArray] = useState([]);

  const { postData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);

  const onSubmit = (data) => FilterByTag(data);

  const FilterByTag = (data) => {
    console.log(data);
    if (data.platform === "0") {
      setIsSearch(false);
    } else {
      setSearchArray(postData.filter((o) => o.tag.includes(data.platform)));
      setIsSearch(true);
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
      <div className='searchWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("platform")}>
            <option value='0'>Select tag</option>
            <option value='c#'>c#</option>
            <option value='web'>web</option>
            <option value='placeholder'>placeholder</option>
          </select>
          <select {...register("language")}>
            <option value='0'>Select language</option>
            <option value='c#'>c#</option>
            <option value='react'>react</option>
          </select>
          <button type='submit'>søg</button>
        </form>
      </div>
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
        </div>
      )}
    </section>
  );
}
