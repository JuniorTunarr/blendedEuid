import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import router from "./routes";
//import { Router } from "react-router-dom";
//import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
