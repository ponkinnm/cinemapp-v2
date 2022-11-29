import './App.css';
import Welcome from "./Welcome";
import Layout from "./pages/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Test from "./pages/Test";
import GamePresenter from "./presenters/GamePresenter";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Welcome />} />
                  <Route path="game" element={<GamePresenter />}/>

{/*
                  <Route path="*" element={<NoPage />} />
*/}
              </Route>
              <Route path="test" element={<Test />} />
          </Routes>
      </BrowserRouter>
    /*<div className="App">

      <header className="App-header">
      </header>
        <Welcome hej={"amdkmk"}/>
    </div>*/
  );
}

export default App;
