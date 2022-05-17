import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Papa from "papaparse";
import { setAllBooths } from "./app/reducers/allBooths";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const allBooths = useSelector((state) => state.allBooths.booths);

  useEffect(() => {
    if (allBooths.length === 0) {
      async function getData() {
        const response = await fetch("/data/gencon21-test.csv", {
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
        const sorted = rows.sort((a, b) => {
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
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
