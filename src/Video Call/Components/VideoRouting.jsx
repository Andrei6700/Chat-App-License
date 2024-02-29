import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Call from "./call";
import VideoCall from "./Video Call/VideoPage"

const router = createBrowserRouter([
  {
    path: "/call",
    element: <VideoCall />,
  },
  {
    element: <Call />,
    path: "/call/:roomID",
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
