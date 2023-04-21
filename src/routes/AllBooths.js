import React from "react";
import { useDispatch } from "react-redux";
import {
  setIsBoothSelected,
  setIsBoothVisited,
} from "../app/reducers/allBooths";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";
import { useGetAllBoothsQuery } from "../app/reducers/apiSlice";

const AllBooths = () => {
  const { data, error, isLoading } = useGetAllBoothsQuery();

  const dispatch = useDispatch();

  const handleClick = (key) => {
    const index = data.map((e) => e.rowKey).indexOf(key);
    const title = data[index].Title;
    const payload = {
      index: index,
      title: title,
    };
    dispatch(setIsBoothSelected(payload));
  };
  const handleVisitedClick = (key) => {
    const index = data.map((e) => e.rowKey).indexOf(key);
    dispatch(setIsBoothVisited(index));
  };

  const allPublishers = data
    ? [
        ...new Set(
          data
            .map((booth) =>
              JSON.stringify({
                Publisher: booth.Publisher,
                Location: booth.Location,
              })
            )
            .flat()
        ),
      ].map(JSON.parse)
    : [];

  return (
    <Layout>
      {data && (
        <BoothList
          allPublishers={allPublishers ? allPublishers : []}
          allBooths={data ? data : []}
          handleClick={handleClick}
          handleVisitedClick={handleVisitedClick}
        />
      )}
    </Layout>
  );
};

export default AllBooths;
