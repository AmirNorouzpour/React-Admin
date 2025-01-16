import React from "react";
import "./App.css";
import Header from "./components/header/header.tsx";
import Footer from "./components/footer/footer.tsx";
import Body from "./components/body/body.tsx";
import "./assets/fontawesome.ts";

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
