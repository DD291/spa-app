import * as React from "react";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Login from "./Login";
import TablePage from "./Table";

// import {
//   Switch,
// } from "react-router-dom/switch";

// import "./styles.css";

function App() {
  return (
    <div className="main">
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/table" element={<TablePage />} />
      
    </Routes>
    </div>
  );
}


export default App;
