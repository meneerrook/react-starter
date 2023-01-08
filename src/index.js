import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from './reportWebVitals';
import App from "parts/App";
import "./assets/css/variables.css";
import "./assets/css/base.css";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
    <StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
