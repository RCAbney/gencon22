import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsBoothSelected } from "../app/reducers/allBooths";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";
import { MinusSmIcon as MinusSmIconOutline } from "@heroicons/react/outline";

const AllBooths = () => {
  const booths = useSelector((state) => state.allBooths.booths);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    const index = booths.map((e) => e.BGGId).indexOf(id);
    dispatch(setIsBoothSelected(index));
  };

  const allPublishers = [
    ...new Set(
      booths
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
    <>
      {allPublishers.map((name, i) => {
        if (!name.Publisher) return false;
        return (
          <div
            key={name.Publisher + i}
            className="bg-white shadow overflow-hidden"
          >
            <div className="bg-black py-2">
              <p className="text-xl text-white px-4 sm:px-6 my-0 font-bold">
                {name.Publisher} {name.Location && `- Booth #${name.Location}`}
              </p>
            </div>
            <ul className="divide-y divide-gray-200 list-none pl-0">
              {booths
                .filter((booth) => booth.Publisher === name.Publisher)
                .map((booth) => {
                  const selected = booth.isSelected ? "red" : "indigo";
                  return (
                    <li
                      key={parseInt(booth.BGGId)}
                      className={booth.isSelected ? "pl-0 bg-gray-200" : "pl-0"}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="max-w-[70%]">
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
                              className={`inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${selected}-500 bg-${selected}-600 hover:bg-${selected}-700`}
                              onClick={() => handleClick(booth.BGGId)}
                            >
                              {booth.isSelected ? (
                                <MinusSmIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
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
      })}
    </>
  );
};

export default AllBooths;
