import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Providers } from "./providers";
import { Router, BaseLocationHook } from "wouter";
import React from "react";

// Use hash-based routing
const useHashLocation: BaseLocationHook = () => {
  const [location, setLocation] = React.useState(window.location.hash.replace("#", "") || "/");
  React.useEffect(() => {
    const handler = () => setLocation(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return [location, (to: string) => (window.location.hash = to)];
};

createRoot(document.getElementById("root")!).render(
  <Router hook={useHashLocation}>
    <Providers>
      <App />
    </Providers>
  </Router>
);
