import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Character from './components/Character'

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
const [data, setData] = useState([])
const [searchTerm, setSearchTerm] = useState("")

const handleChange = e => {
  setSearchTerm(e.target.value)
  console.log(searchTerm)
}
  // Fetch characters from the API in an effect hook. Remember, anytime you have a 

  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
useEffect(() => {
  axios
  .get("https://rickandmortyapi.com/api/character")
  .then(res => {
    // console.log(res.data.results)
    setData(res.data.results)
    const initialArray = res.data.results
    const filteredData = initialArray.filter((character) => {
      return character.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setData(filteredData);
  })
}, [searchTerm])
console.log(data)

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <label>
        Search for a character here: <input type="text" name="search" value={searchTerm} onChange={handleChange}/>
      </label>
      <Character characterArray = {data}/>
    </div>
  );
}

export default App;
