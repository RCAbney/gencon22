import React from "react";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";

const MyBooths = () => {
  const booths = useSelector((state) => state.userBooths.allUserBooths);

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
      {booths.length > 0 ? (
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
                {booths
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
                            <div className="ml-2 flex-shrink-0 flex"></div>
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
