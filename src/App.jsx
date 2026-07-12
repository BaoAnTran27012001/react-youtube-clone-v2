import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  // Làm sao trích được dữ liệu
  const [categoryId, setCategoryId] = useState(null);
  return (
    <>
      <Header setCategoryId={setCategoryId} />
      <div className="overflow-clip w-[95%] mx-auto">
        <Outlet context={{ categoryId }} />
      </div>
    </>
  );
}

export default App;
