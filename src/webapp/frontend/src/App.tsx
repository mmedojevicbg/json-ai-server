import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/List";
import Menu from "./Menu";
import Add from "./pages/Add";
import DetailView from "./pages/DetailsView";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">JSON AI Server</h1>
            <Menu />
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-1 bg-gray-100 p-4">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/add" element={<Add />} />
              <Route path="/details" element={<DetailView />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
