import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        <Link to="/" className="app-nav__brand">
          React CRUD
        </Link>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{
          background: "var(--surface-2)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default App;