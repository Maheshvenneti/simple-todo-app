import React, { useState } from "react";
import './App.css';

function App() {
  
  const [input, setInput] = useState([]);

  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const ChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const SubmitHandler =(e)=>{
    e.preventDefault();
    if(!input){
      window.alert("Please enter a valid input");
    } else if(input && !toggle){
      setTodos(
        todos.map((item)=>{
          if(item.id===isEditItem){
            return{...item, name:input}
          }
          return item;
        })
      )
      setInput('')
      setToggle(true);

    }else{
      let newTodos = {id: Math.floor(Math.random() * 100000), name: input}
      setTodos([...todos, newTodos]);
      setInput('');
    }
  }


  const DeleteHandler = (index) =>{
    let newtodo = todos.filter((item)=>index!== item.id)
    setTodos(newtodo)
  }

  const editItem =(id) =>{
    let newEditItem = todos.find((item)=>item.id===id)
    setInput(newEditItem.name)
    setToggle(false)
    setIsEditItem(newEditItem.id);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={SubmitHandler}>
        <input type="text" name="input" value={input} onChange={ChangeHandler} />{" "}
        &nbsp;
        {toggle ? (
          <input value="add" name="add" type="submit" />
        ) : (
          <input value="edit" name="edit" type="submit" />
        )}
      </form>
      <br />

      {todos.map((item) => {
        return (
          <div key={item.id}>
            {item.name} &nbsp;{" "}
            <button onClick={() => DeleteHandler(item.id)}>delete</button>&nbsp;
            <button onClick={() => editItem(item.id)}>edit</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
