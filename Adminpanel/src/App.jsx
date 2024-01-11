import "./App.css";
import AppRouter from "./AppRouter";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Header from "./components/Header";
import { toast } from "react-toastify";
const App = () => {
  return (
    <div className="admin-body">
      <AppRouter />
    </div>
  );
};

export default App;