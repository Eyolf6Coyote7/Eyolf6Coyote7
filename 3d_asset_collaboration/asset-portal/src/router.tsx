import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import AssetListPage from "./pages/AssetListPage";
import AssetDetailPage from "./pages/AssetDetailPage";
import UploadPage from "./pages/UploadPage";
import IoTDashboardPage from "./pages/IoTDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AssetListPage /> },
      { path: "assets", element: <AssetListPage /> },
      { path: "assets/:id", element: <AssetDetailPage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "iot-dashboard", element: <IoTDashboardPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);
