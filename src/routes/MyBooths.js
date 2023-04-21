import React from "react";
import { useDispatch } from "react-redux";
import {
  setIsBoothSelected,
  setIsBoothVisited,
} from "../app/reducers/allBooths";
import Empty from "../components/Empty";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";
import { useGetAllBoothsQuery } from "../app/reducers/apiSlice";

const MyBooths = () => {
  const { data, error, isLoading } = useGetAllBoothsQuery();
  const dispatch = useDispatch();

  const filteredBooths = data
    ? data.filter((booth) => {
        return booth;
      })
    : [];

  const allPublishers = data
    ? [
        ...new Set(
          filteredBooths
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

  return (
    <Layout>
      {filteredBooths.length > 0 ? (
        <BoothList
          allPublishers={allPublishers}
          allBooths={filteredBooths}
          handleClick={handleClick}
          handleVisitedClick={handleVisitedClick}
          filteredView
        />
      ) : (
        <Empty />
      )}
    </Layout>
  );
};

export default MyBooths;
