import React, { useEffect, useState } from "react";

export default function ERPInvoice() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    setLoading(true);
    GetTodo();
    setLoading(false);
  }, []);

  async function UpdateTodo(id) {
    let newTodo;
    try {
      const Gettodo = await fetch(`https://localhost:7110/home/${id}`, {
        method: "GET",
      });
      newTodo = await Gettodo.json();
    } catch (err) {
      console.log(err);
    }
    /* todo.isCompleted = !todo.isCompleted; */
    try {
      const test = await fetch(`https://localhost:7110/home/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: !newTodo.isCompleted,
        }),
      });
      console.log(test);
    } catch (err) {
      console.log(err);
    }
  }

  async function GetTodo() {
    try {
      const response = await fetch("https://localhost:7110/home", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(true);
    }
  }

  const IsComplete = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setData(newData);
    UpdateTodo(id);
  };

  const DeleteTodo = (id) => {
    fetch("https://localhost:7110/home/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  async function AddNewTodo(event) {
    event.preventDefault();
    try {
      await fetch("https://localhost:7110/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo,
          isCompleted: false,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    GetTodo();
  }

  const CompleteStyle = {
    color: "black",
    textDecoration: "line-through",
    textDecorationColor: "white",
  };

  const notCompleteStyle = {
    color: "white",
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <section>
      <h1>det her er en asp.net web api test</h1>
      <h2 className='explane'>
        hvis der ikke kommer noget fram er det fordi apiet ikke køre
      </h2>

      <dir className='formWrapper'>
        <h2>Add new Todo</h2>
        <form onSubmit={AddNewTodo}>
          <input
            type='text'
            value={todo}
            maxLength='20'
            required
            placeholder='todo'
            onChange={(e) => {
              onChange(e);
            }}
          />
          <input type='submit' value='add todo' />
        </form>
      </dir>

      <div className='container'>
        {loading ? (
          <div className='loading'>
            <p className='loader'>Loading...</p>
          </div>
        ) : (
          <>
            {error ? (
              <div className='error'>
                <p>Something went wrong</p>
              </div>
            ) : (
              <>
                {data.map((item) => (
                  <div className='item' key={item.id}>
                    {item.isCompleted ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-circle'></i>
                    )}
                    <h3
                      style={
                        item.isCompleted ? CompleteStyle : notCompleteStyle
                      }
                      onClick={() => IsComplete(item.id)}>
                      {item.title}
                    </h3>
                    <p
                      className='delete'
                      onClick={() => {
                        DeleteTodo(item.id);
                      }}>
                      <i class='fas fa-trash-alt'></i>
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
