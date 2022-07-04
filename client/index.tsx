import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./src/css/utilities.css";

const container = document.getElementById("app");

const root = createRoot(container!);
root.render(<App />);
