import React from "react";
import ReactDOM from "react-dom/client";
import { Router, BaseLocationHook } from "wouter";
import App from "./App";
import "./index.css";

// Use hash-based routing for GitHub Pages
const useHashLocation: BaseLocationHook = () => {
  const [location, setLocation] = React.useState(window.location.hash.replace("#", "") || "/");

  React.useEffect(() => {
    const handler = () => {
      setLocation(window.location.hash.replace("#", "") || "/");
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = React.useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return [location, navigate] as const;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <App />
    </Router>
  </React.StrictMode>
);
