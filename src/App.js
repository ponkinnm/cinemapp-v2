import './App.css';
import Welcome from "./presenters/Welcome";
import Layout from "./pages/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import QuizPresenter from "./presenters/QuizPresenter"
import NoPage from "./pages/NoPage";

function App() {
  return (
      <BrowserRouter>
          <UserAuthContextProvider>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Welcome />} />
                  <Route path="game" element={<QuizPresenter />}/>
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
          </UserAuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
