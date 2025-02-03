import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./core/components/header/header.tsx";
import Footer from "./core/components/footer/footer.tsx";
import Body from "./core/components/body/body.tsx";
import { SystemProvider } from "./context/SystemContext.tsx";
import LoadingScreen from "./core/components/loading/loading.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Router>
      {isLoading && <LoadingScreen />}
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
