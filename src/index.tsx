import * as React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./routes/root";
import { Editor } from "./routes/editor";
import { Page } from "./components/page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/editor",
        element: (
          <Page title="Davinci Editor">
            <Editor />
          </Page>
        ),
      },
    ],
  },
]);

const container = document.getElementById("app");
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
