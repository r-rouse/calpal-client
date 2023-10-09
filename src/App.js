import { Route, Routes } from 'react-router-dom';
import './App.css';
import CalorieCounter from "./components/CalorieCounter.js"

function App() { 

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Routes>
        <Route exact path="/" element={<CalorieCounter/>} />
        </Routes>
      {/* </header> */}
    </div>
  );
}



export default App;
