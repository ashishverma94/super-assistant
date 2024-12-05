import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { useParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import React, { useEffect, useState } from "react";

const NotesPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null);
  const [notes, setNotes] = useState([]);


  function getNamedDP(name) {
    if (name) {
      let newName = name?.toUpperCase();
      const parts = newName?.split(" ");

      let nameDP = "";
      if (parts.length >= 0) nameDP = parts[0][0];
      if (parts.length > 1) nameDP += parts[1][0];
      return nameDP;
    }
  }

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-group/${id}`
        );
        setGroupInfo(response?.data?.group);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data: ", error);
      }
    };

    fetchGroupData();
  }, [id]);

  const fetchNotesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${DOMAIN_URL}/api/v1/get-all-notes/${id}`
      );
      setNotes([])
      setNotes(response?.data?.allNotes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, [id]);


  const [newNote, setNewNote] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const responseNotes = await axios.post(`${DOMAIN_URL}/api/v1/create-note`, {
        id,
        content: newNote,
      });
      fetchNotesData();
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-[75%]">
      <nav className="sticky top-0 p-4 h-[10vh] flex items-center gap-5 text-[white] bg-[#001F8B]">
        <div className="w-[60px]">
          <div
            style={{ backgroundColor: groupInfo?.group_color }}
            className={` p-2 rounded-full flex justify-center items-center `}
          >
            <div className="w-[40px]  font-[600 ] text-[25px] h-[40px] flex justify-center items-center ">
              {getNamedDP(groupInfo?.group_name)}
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold">{groupInfo?.group_name}</h1>
      </nav>

      {/* Notes List */}
      <div className="flex-1 h-[60vh] bg-[#DAE5F5] p-4 overflow-y-auto">
        {notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* Input Section */}
      <div className="sticky h-[30vh] bottom-0 bg-[#001F8B] p-4">
        <div className="bg-[white] rounded-[12px]">
          <textarea
            onChange={(e) => setNewNote(e.target.value)}
            multiple
            type="text"
            className="w-full mt-3 text-[20px] placeholder:text-[20px] border-none outline-none px-3 h-[110px] p-4 border border-gray-300 "
            placeholder="Enter your text here......."
            value={newNote}
          />
          <div className=" flex justify-end pb-3 mr-4">
            <button
              disabled={!newNote.trim()}
              className="mt-2 cursor-pointer text-white font-bold py-2 px-3 rounded-md"
              onClick={(e) => handleAddNote(e)}
            >
              {!newNote.trim() ? (
                <img
                  src="https://img.icons8.com/?size=100&id=11512&format=png&color=8B8484"
                  alt="send-icon"
                  style={{ height: "25px" }}
                />
              ) : (
                <img
                  src="https://img.icons8.com/?size=100&id=11512&format=png&color=000000"
                  alt="send-icon"
                  style={{ height: "25px" }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
