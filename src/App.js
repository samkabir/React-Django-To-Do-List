import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import NoteListPage from "./Pages/NoteListPage/NoteListPage";
import NotePage from "./Pages/NotePage/NotePage";
import Header from "./Components/Header/Header";

function App() {
  return (
    
      <div className="container dark">
          <div className="app">
          <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" exact element={ <NoteListPage /> } />
                <Route path="note/:id" element={ <NotePage /> } />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    
  );
}

export default App;
