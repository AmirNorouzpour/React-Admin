import React from "react";
import "./App.css";
import Header from "./components/header/header.tsx";
import Footer from "./components/footer/footer.tsx";
import Content from "./components/content/content.tsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
