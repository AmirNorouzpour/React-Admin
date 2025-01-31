import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./core/components/header/header.tsx";
import Footer from "./core/components/footer/footer.tsx";
import Body from "./core/components/body/body.tsx";
import { SystemProvider } from "./context/SystemContext.tsx";

function App() {
  return (
    <Router>
      <SystemProvider>
        <div className="App">
          <Header />
          <Body />
          <Footer />
        </div>
      </SystemProvider>
    </Router>
  );
}

export default App;
