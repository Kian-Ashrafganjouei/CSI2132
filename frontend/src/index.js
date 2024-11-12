import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

console.log(process.env.REACT_APP_KINDE_DOMAIN);

const WrappedApp = () => (
  <KindeProvider
    clientId={process.env.REACT_APP_KINDE_CLIENT_ID}
    domain={process.env.REACT_APP_KINDE_DOMAIN}
    logoutUri={window.location.origin}
    redirectUri={window.location.origin}
  >
    <App />
  </KindeProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WrappedApp />);
