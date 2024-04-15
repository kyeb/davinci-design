import * as React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./routes/root";
import { Editor } from "./routes/editor";
import { Page } from "./components/page";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import "./styles/global.scss";

// In prod, this site is currently deployed to a subpath on GitHub Pages
// (https://kyeb.github.io/davinci-design/), which requires a base path to work
// (otherwise the router gets *real* confused).

// @ts-ignore Parcel makes the NODE_ENV variable available
const basename = process.env.NODE_ENV === "production" ? "/davinci-design" : "";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: (
            <Page title="Home">
              <Link to="/editor">editor</Link>
            </Page>
          ),
        },
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
  ],
  { basename }
);

const container = document.getElementById("app");
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
