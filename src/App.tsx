import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import TablePage from "./pages/TablePage";
import { store } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist";
import { Provider } from "react-redux";
// let persistor = persistStore(store);
import Home from "./pages/Home";

function App() {

  return (
    <div className="main">
      <Provider store={store}> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/table" element={<TablePage />} />
    </Routes>
    </Provider>
    </div>
  );
}


export default App;
