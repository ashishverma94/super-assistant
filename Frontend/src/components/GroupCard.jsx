import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ name, color, id }) {
  function getNamedDP(name) {
    let newName = name.toUpperCase();
    const parts = newName.split(" ");
    let nameDP = parts[0][0];
    if (parts.length > 1) nameDP += parts[1][0];
    return nameDP;
  }

  return (
    <Link to={`/${id}`}>
      <div className="w-full cursor-pointer hover:bg-gray-400 gap-8 mt-1 py-2 flex items-center px-8 hover:rounded-[14px]  ">
        <div
          style={{ backgroundColor: color }}
          className={` p-2 rounded-full flex justify-center items-center `}
        >
          <div className="w-[40px] font-[600 ] text-[25px] h-[40px] flex justify-center items-center ">
            {getNamedDP(name)}
          </div>
        </div>
        <div className=" cursor-pointer text-[20px] font-[600] ">{name}</div>
      </div>
    </Link>
  );
}

export default GroupCard;
