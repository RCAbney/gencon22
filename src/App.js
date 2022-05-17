import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Papa from "papaparse";
import { setAllBooths } from "./app/reducers/allBooths";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  return (
    <div className="App">
      {/* header component with nav here */}
      <h1 className="text-xl font-bold p-4">Gencon 22</h1>
      <div className="p-4">
        <Link to="/all-booths">All Booths</Link>

        <Link to="/my-booths">My Booths</Link>
      </div>
      <hr />
      {/* end header with nav here */}
      <Outlet />
      {/* footer if needed here */}
      <hr />
      <div>footer?</div>
      {/* end footer if needed here */}
    </div>
  );
}

export default App;
