import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./AppRouter";
// import NavBar from "./Components/NavBar";

function App() {
   return (
    <div>
      <div className="App">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
