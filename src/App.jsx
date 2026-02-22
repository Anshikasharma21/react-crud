import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#242424] text-white">
      {/* Navbar */}
      <nav className="bg-[#0f172a] p-4">
        <div className="container pl-4">
          <Link to="/" className="no-underline">
            <h2 className="text-white text-2xl font-bold text-left">React CRUD</h2>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
        {/* Routes */}
        <main className="flex-1 p-4 text-left">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/edit/:id' element={<EditPage />} />
          </Routes>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
