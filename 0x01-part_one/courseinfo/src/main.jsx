import ReactDOM from "react-dom/client";
import App, { Mirror } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<div><App /> <Mirror l={12} r={15} /></div>);
