import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import Main from "./main";
import "./index.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
);
