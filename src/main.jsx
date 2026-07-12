import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CardList from "./components/CardList";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import VideoDetail from "./components/VideoDetail/index.jsx";
import ChannelInfo from "./components/Channel-Info/index.jsx";
import Playlist from "./components/Playlist/index.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CardList /> },
      { path: "video/:id", element: <VideoDetail /> },
      { path: "channel/:id", element: <ChannelInfo /> },
      { path: "playlist/:id", element: <Playlist /> },
    ],
  },
  // basueUrl
  // => localhost:5137/video
  // => đường link hiện tại + "video" => localhost:5137/auth/video
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
