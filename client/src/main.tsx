import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route.tsx";
import ReduxProviders from "./Providers/ReduxProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProviders>
      <RouterProvider router={router} />
    </ReduxProviders>
  </React.StrictMode>
);
