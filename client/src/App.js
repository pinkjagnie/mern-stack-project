import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './App.css';

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const [newFoodName, setNewFoodName] = useState("");

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => { setFoodList(response.data) })
  }, []);

  const addToListHandler = (event) => {
    event.preventDefault();

    console.log("foodName " + foodName);
    console.log("days " + days);

    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days
    })
  };

  const updateFoodNameHandler = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName
    })    
  };

  const deleteFoodHandler = (id) => {
    let url = `http://localhost:3001/delete/${id}`
    Axios.delete(url)
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <form>

        <div>
          <label>Food name</label>
          <input type="text" onChange={(event) => {setFoodName(event.target.value)}}/>
        </div>

        <div>
          <label>Days since you ate it:</label>
          <input type="number" onChange={(event) => {setDays(event.target.value)}} />
        </div>

        <button onClick={addToListHandler}>Add to the list</button>

      </form>

      <hr /> 

      <div>
        <h1>Food list</h1>

        {foodList.map((food, key) => {
          return(
            <div key={key} style={{marginBottom: '40px'}}>
              <h3>food name: {food.foodName}</h3>
              <p>It's been {food.daysSinceIAte} days since I ate it</p>
              <div>
                <input type="text" placeholder='New food name' onChange={(event) => {setNewFoodName(event.target.value)}}/>
                <button onClick={() => updateFoodNameHandler(food._id)}>Update</button>
              </div>
              <button onClick={() => deleteFoodHandler(food._id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
