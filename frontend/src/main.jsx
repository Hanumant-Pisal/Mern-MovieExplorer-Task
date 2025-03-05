// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { loginSuccess } from "./features/authSlice";

// Check for token in localStorage on app load
const token = localStorage.getItem("token");
if (token) {
  const decoded = JSON.parse(atob(token.split(".")[1]));
  store.dispatch(loginSuccess({ username: decoded.username }));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);