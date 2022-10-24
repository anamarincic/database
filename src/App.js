import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddNewDog from "./pages/AddNewDog";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addNewDog" element={<AddNewDog />} />
          <Route path="/edit/:id" element={<AddNewDog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
