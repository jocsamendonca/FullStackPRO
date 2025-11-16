import { ToastContainer } from "react-toastify";
import RoutesApp from "./routes";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <RoutesApp />
    </div>
  );
}

export default App;
