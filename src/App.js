import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading/Loading";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./Context/UserContext.js";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
