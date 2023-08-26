import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthProvider from "./contexts/Auth";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
