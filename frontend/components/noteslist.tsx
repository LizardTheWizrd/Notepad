"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

type Note = {
  id: number;
  title: string;
};

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/notes");
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setNotes(data);
      } catch (err: any) {
        console.error("Error fetching notes:", err);
        setError(err.message || "Something went wrong while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div className="flex flex-col mt-5 w-[90%] h-full md:w-[692px] border-8 border-[#74FFE3] rounded-md bg-[#A2FFEC] overflow-y-auto no-scrollbar ">
      {notes.length === 0 ? (
        <div className="flex justify-center items-center h-[70px] text-gray-500 font-semibold">
          No notes available
        </div>
      ) : (
        notes.map((note, index) => (
          <div
            key={note.id}
            className={`flex flex-row flex-shrink-0 items-center justify-between w-full h-[70px] ${
              index % 2 === 0 ? "bg-[#74FFE3]" : "bg-[#A2FFEC]"
            }`}
          >
            <h2 className="pl-3 w-[70%] text-black text-xl font-semibold truncate">
              {note.title}
            </h2>
            <div className="flex items-center justify-end pr-3 w-[20%] h-full">
              <MdDelete size={30} color="black" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
