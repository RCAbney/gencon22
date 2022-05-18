import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsBoothSelected,
  setIsBoothVisited,
} from "../app/reducers/allBooths";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";

const AllBooths = () => {
  const allBooths = useSelector((state) => state.allBooths.booths);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    const index = allBooths.map((e) => e.BGGId).indexOf(id);
    const title = allBooths[index].Title;
    const payload = {
      index: index,
      title: title,
    };
    dispatch(setIsBoothSelected(payload));
  };
  const handleVisitedClick = (id) => {
    const index = allBooths.map((e) => e.BGGId).indexOf(id);
    dispatch(setIsBoothVisited(index));
  };

  const allPublishers = [
    ...new Set(
      allBooths
        .map((booth) =>
          JSON.stringify({
            Publisher: booth.Publisher,
            Location: booth.Location,
          })
        )
        .flat()
    ),
  ].map(JSON.parse);

  return (
    <Layout>
      <BoothList
        allPublishers={allPublishers}
        allBooths={allBooths}
        handleClick={handleClick}
        handleVisitedClick={handleVisitedClick}
      />
    </Layout>
  );
};

export default AllBooths;
