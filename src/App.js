
import './App.css';
import React, {useState, useEffect} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);

 
    
    return (
      <Router>
        <Navbar />
        <LoadingBar
        color="#f11946"
        progress={progress}
        height={3}
        
      />
       


        <Routes>
  {/* Home route */}
  <Route
    path="/"
    element={<News setProgress={setProgress} key="home" pageSize={5} country="us" category="general" />}
  />

  <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={5} country="us" category="general" />} />
  <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={5} country="us" category="business" />} />
  <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={5} country="us" category="entertainment" />} />
  <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={5} country="us" category="health" />} />
  <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={5} country="us" category="science" />} />
  <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={5} country="us" category="sports" />} />
  <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={5} country="us" category="technology" />} />
</Routes>

      </Router>
    )
    }
  
export default App;
