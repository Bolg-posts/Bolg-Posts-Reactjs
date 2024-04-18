import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IsAuthProvider } from "./context/IsAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <IsAuthProvider>
      <App />
    </IsAuthProvider>
  </div>
);
