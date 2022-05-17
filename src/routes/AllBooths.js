import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserBooth } from "../app/reducers/userBooths";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";

const AllBooths = () => {
  const booths = useSelector((state) => state.allBooths.booths);
  const userBooths = useSelector((state) => state.userBooths.allUserBooths);
  const dispatch = useDispatch();

  const handleAddClick = (id) => {
    if (userBooths.map((e) => e.BGGId).indexOf(id) !== -1) {
      return false;
    }
    const index = booths.map((e) => e.BGGId).indexOf(id);
    const payload = booths[index];
    dispatch(addUserBooth(payload));
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
                  return (
                    <li key={parseInt(booth.BGGId)} className="pl-0">
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
                              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => handleAddClick(booth.BGGId)}
                            >
                              <PlusSmIconOutline
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
      })}
    </>
  );
};

export default AllBooths;
