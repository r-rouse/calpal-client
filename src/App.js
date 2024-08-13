import { Route, Routes } from 'react-router-dom';
import './App.css';
import CalorieCounter from "./components/CalorieCounter.js"
import SignIn from './components/SignIn.js';
import StickyFooter from './components/Footer.js';
// import DateCalendarValue from './components/Calender.js';
import ResponsiveAppBar from './components/AppBar.js';
import SignUp from './components/SignUp.js';

function App() { 

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <header className="App-header">
        <Routes>
        <Route exact path="/" element={<CalorieCounter/>} />
        <Route exact path="/SignIn" element={<SignIn/>} />
        <Route exact path="/SignUp" element={<SignUp/>} />
        {/* <Route exact path="/Calendar" element={<DateCalendarValue/>} /> */}
        </Routes>
      </header>
      <StickyFooter/>
    </div>
  );
}



export default App;
