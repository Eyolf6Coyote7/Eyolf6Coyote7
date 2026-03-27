import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import AssetListPage from "./pages/AssetListPage";
import AssetDetailPage from "./pages/AssetDetailPage";
import UploadPage from "./pages/UploadPage";
import IoTDashboardPage from "./pages/IoTDashboardPage";
import VersionComparePage from "./pages/VersionComparePage";
import BrandSettingsPage from "./pages/BrandSettingsPage";
import AccountPage from "./pages/AccountPage";
import UnityLoginPage from "./pages/unity/UnityLoginPage";
import UnityBrowserPage from "./pages/unity/UnityBrowserPage";
import UnityInspectorPage from "./pages/unity/UnityInspectorPage";
import UnityViewportPage from "./pages/unity/UnityViewportPage";
import UnityIoTOverlayPage from "./pages/unity/UnityIoTOverlayPage";
import MobileAssetListPage from "./pages/mobile/MobileAssetListPage";
import MobileAssetDetailPage from "./pages/mobile/MobileAssetDetailPage";
import MobileNotificationsPage from "./pages/mobile/MobileNotificationsPage";
import MobileProfilePage from "./pages/mobile/MobileProfilePage";

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
      { path: "compare", element: <VersionComparePage /> },
      { path: "settings", element: <BrandSettingsPage /> },
      { path: "account", element: <AccountPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  // Unity Client (dark theme, standalone layout)
  { path: "/unity", element: <UnityLoginPage /> },
  { path: "/unity/browser", element: <UnityBrowserPage /> },
  { path: "/unity/inspector/:id", element: <UnityInspectorPage /> },
  { path: "/unity/viewport", element: <UnityViewportPage /> },
  { path: "/unity/iot-overlay", element: <UnityIoTOverlayPage /> },
  // Mobile (standalone layout)
  { path: "/mobile/assets", element: <MobileAssetListPage /> },
  { path: "/mobile/assets/:id", element: <MobileAssetDetailPage /> },
  { path: "/mobile/notifications", element: <MobileNotificationsPage /> },
  { path: "/mobile/profile", element: <MobileProfilePage /> },
]);
