import "./App.css";
import AppRoutes from "../src/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
