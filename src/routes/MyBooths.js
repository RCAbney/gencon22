import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsBoothSelected } from "../app/reducers/allBooths";

import Empty from "../components/Empty";
import { MinusSmIcon as MinusSmIconOutline } from "@heroicons/react/outline";

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

  const handleSubtractClick = (id) => {
    const index = allBooths.map((e) => e.BGGId).indexOf(id);
    dispatch(setIsBoothSelected(index));
  };

  return (
    <>
      {filteredBooths.length > 0 ? (
        allPublishers.map((name, i) => {
          if (!name.Publisher) return false;
          return (
            <div
              key={name.Publisher + i}
              className="bg-white shadow overflow-hidden"
            >
              <div className="bg-black py-2">
                <p className="text-xl text-white px-4 sm:px-6 my-0 font-bold">
                  {name.Publisher}{" "}
                  {name.Location && `- Booth #${name.Location}`}
                </p>
              </div>
              <ul className="divide-y divide-gray-200 list-none pl-0">
                {filteredBooths
                  .filter((booth) => booth.Publisher === name.Publisher)
                  .map((booth) => {
                    return (
                      <li key={parseInt(booth.BGGId)} className="pl-0">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                <a
                                  href={`https://boardgamegeek.com/boardgame/${booth.BGGId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {booth.Title}
                                </a>
                              </p>
                              <p className="flex items-center text-sm text-gray-500">
                                {booth.Availability}{" "}
                                {booth.Availability === `For Sale` &&
                                  booth.MSRP !== `N/A` &&
                                  ` - $${booth.MSRP}`}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <button
                                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => handleSubtractClick(booth.BGGId)}
                              >
                                <MinusSmIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })
      ) : (
        <Empty />
      )}
    </>
  );
};

export default MyBooths;
