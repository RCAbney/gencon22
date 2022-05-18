import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsBoothSelected,
  setIsBoothVisited,
} from "../app/reducers/allBooths";
import Empty from "../components/Empty";
import BoothList from "../components/BoothList";

const MyBooths = () => {
  const allBooths = useSelector((state) => state.allBooths.booths);
  const dispatch = useDispatch();

  const filteredBooths = allBooths.filter((booth) => {
    return booth.isSelected === true;
  });

  const allPublishers = [
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
  ].map(JSON.parse);

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

  return (
    <>
      {filteredBooths.length > 0 ? (
        <BoothList
          allPublishers={allPublishers}
          allBooths={filteredBooths}
          handleClick={handleClick}
          handleVisitedClick={handleVisitedClick}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default MyBooths;
