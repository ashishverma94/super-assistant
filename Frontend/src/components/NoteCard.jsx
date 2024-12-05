import React from "react";

const NoteItem = ({ note }) => {
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleTimeString("en-US", options);
  };

 
  const formattedDate = formatDate(note?.createdAt);
  const formattedTime = formatTime(note?.createdAt);

  return (
    <div className="mb-4 p-4 border bg-[white] shadow-lg rounded-md">
      <p className="mt-2">{note.content}</p>
      <div className=" flex justify-end">
        <p className="text-sm font-[600]">
          {formattedDate} <span className="font-[800] text-[30px] px-3">.</span>
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
