import { BrowserRouter, Routes, Route } from "react-router-dom";
import { provider } from "react-ioc";
import { DogsService } from "./Common/DogsService";
import { DataStore } from "./Stores/DataStore";
import { Home } from "./Pages/DogsList";
import { DogModal } from "./Pages/DogModal";

export const App = provider(
  DogsService,
  DataStore
  //
)(() => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/addNewDog/*" element={<DogModal />} />
          <Route path="/edit/:id/*" element={<DogModal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
});
