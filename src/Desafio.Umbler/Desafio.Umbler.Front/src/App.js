import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import ErrorPage from "./Pages/Error";
import DomainDetails from "./Components/DomainDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="api/domain/:domain" Component={DomainDetails} />
          <Route path="/error" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>        
    </div>
  );
}

export default App;
