import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./App.css";
import PublicPage from "./pages/PublicPage";
import AdminPage from "./pages/AdminPage";
import Layout from "./pages/Layout";
import { KerdesekProvider } from "./contexts/KerdesekContext";
import UserPage from "./pages/UserPage";
import { UserProvider } from "./contexts/UsersContext";
import AdminKerdesek from "./pages/AdminKerdesek";

const router = createBrowserRouter([
  //route-ok Layout-tal
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Főoldal átirányítás dashboard-ra
        element: <Navigate to="/kezdolap" replace />,
      },
      {
        path: "kezdolap",
        element: <PublicPage />,
      },
      {
        path: "toplista",
        element: <UserPage />,
      },
      {
        path: "ujquiz",
        element: <AdminPage />,
      },
      {
        path: "adminkerdesek",
        element: <AdminKerdesek />,
      },
    ],
  },

  // 404 - Not Found
  {
    path: "*",
    element: (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Az oldal nem található</h1>
        <a href="/login">Vissza a főoldalra</a>
      </div>
    ),
  },
]);

function App() {
  return (
    <KerdesekProvider>
      <UserProvider>
      <RouterProvider router={router} />
      </UserProvider>
    </KerdesekProvider>
  );
}

export default App;
