import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import DomainDetails from "./Components/DomainDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/domain/info" Component={DomainDetails} />
        </Routes>
      </BrowserRouter>        
    </div>
  );
}

export default App;
