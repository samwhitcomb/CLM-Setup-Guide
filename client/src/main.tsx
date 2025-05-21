import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { OnboardingProvider } from "@/lib/onboarding-context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <OnboardingProvider>
        <App />
      </OnboardingProvider>
    </Router>
  </React.StrictMode>
);
