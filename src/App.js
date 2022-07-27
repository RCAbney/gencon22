import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Papa from "papaparse";
import { setAllBooths } from "./app/reducers/allBooths";
import { ToastContainer } from "react-toastify";
import AllBooths from "./routes/AllBooths";
import MyBooths from "./routes/MyBooths";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const allBooths = useSelector((state) => state.allBooths.booths);

  useEffect(() => {
    if (allBooths.length === 0) {
      async function getData() {
        const response = await fetch("/data/gencon-22-final.csv", {
          method: "get",
          headers: {
            "content-type": "text/csv;charset=UTF-8",
          },
        });
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        const rows = results.data;
        const keyed = rows.map((row, index) => ({
          ...row,
          rowKey: `${row.BGGId}-${index}`,
        }));
        const sorted = keyed.sort((a, b) => {
          const pubA = a.Publisher?.toUpperCase() || "";
          const pubB = b.Publisher?.toUpperCase() || "";
          if (pubA < pubB) {
            return -1;
          }
          if (pubA > pubB) {
            return 1;
          }
          return 0;
        });
        dispatch(setAllBooths(sorted));
      }
      getData();
    }
  }, [dispatch, allBooths.length]);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={750} position="top-center" />
        <Routes>
          <Route path="/all-booths" element={<AllBooths />} />
          <Route path="/my-booths" element={<MyBooths />} />
          <Route path="/" element={<Navigate to="/my-booths" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
