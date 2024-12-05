import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { colors } from "../utils/color";
import { Outlet } from "react-router-dom";
import GroupCard from "../components/GroupCard";
import React, { useEffect, useState } from "react";

function SideBar() {
  const [loading, setLoading] = useState(false);
  const [groupsData, setGroupsData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DOMAIN_URL}/api/v1/get-all-groups`);
      setGroupsData(response.data.groups);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [errMsg, setErrMsg] = useState("");
  const [errFlag, setErrFlag] = useState(false);

  const handleCreateGroup = async () => {
    const newGroup = {
      group_name: groupName,
      group_color: selectedColor,
    };

    if (!groupName) {
      setErrFlag(true);
      setErrMsg("Please enter group name.");
      return;
    }

    try {
      const response = await axios.post(
        `${DOMAIN_URL}/api/v1/create-group`,
        newGroup
      );
      closeModal();
      fetchData();
    } catch (error) {
      setErrFlag(true);
      setErrMsg(error?.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrFlag(false);
    }, 3000);
  }, [errFlag]);

  return (
    <div className="flex ">
      <div className="sticky  top-0 h-screen w-[25%]   overflow-y-auto">
        <div className="sticky top-0 bg-[white] pt-[40px] w-full pb-[20px] py-2  text-[23px] text-center font-[600]">
          <h2 className="text-center font-[700]">Pocket Notes</h2>
        </div>

        <div className="h-[80vh]">
          {groupsData.length === 0 ? (
            <h1 className="text-[20px] flex justify-center text-center font-bold  p-4 text-gray-500">
              No Groups.
              <br /> Please create group to add notes.
            </h1>
          ) : (
            groupsData?.map((item) => (
              <GroupCard
                key={item._id}
                color={item.group_color}
                name={item.group_name}
                id={item._id}
              />
            ))
          )}
        </div>
        <div>
          <button
            onClick={openModal}
            className="bg-[#16008B] absolute bottom-0 mr-8 mb-8 p-10 right-0 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            <span className="font-[1000] text-[30px] w-[45px] h-[60px] flex justify-center items-center">
              +
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0  flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white h-[280px] p-8 rounded-md max-w-md w-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Create New Group</h2>
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="groupName"
                className="block text-[20px] font-[600] text-gray-700"
              >
                Group Name
              </label>
              <input
                id="groupName"
                type="text"
                className="mt-1 rounded-[30px] block w-[60%] px-3 py-2 border border-gray-300"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex  gap-4 items-center">
              <label
                htmlFor="color"
                className="block text-[20px] font-medium text-gray-700"
              >
                Choose Color
              </label>
              <div className="flex mt-1 space-x-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className=" flex justify-end">
              <button
                className="bg-[#001F8B] hover:bg-blue-600 flex  text-white font-bold py-2 px-12 rounded-[15px] "
                onClick={handleCreateGroup}
              >
                Create
              </button>
            </div>
            {errFlag && (
              <div className="flex mt-3 justify-center items-center w-[100%] text-[red] font-bold">
                {" "}
                {errMsg}{" "}
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default SideBar;
