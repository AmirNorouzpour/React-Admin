import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.tsx";
import Footer from "./components/footer/footer.tsx";
import Body from "./components/body/body.tsx";
import "./assets/fontawesome.ts";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
