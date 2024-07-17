import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import { AppContextProvider } from "./context/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>
);
