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
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    if (deletingId) return; // prevent double delete
    setDeletingId(id);

    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // send id in the body
      });

      if (!res.ok) {
        throw new Error(`Failed to delete note with id ${id}`);
      }

      // Update state after delete
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err: any) {
      console.error("Error deleting note:", err);
      setError(err.message || "Something went wrong while deleting note");
    } finally {
      setDeletingId(null);
    }
  };

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
            } ${deletingId === note.id ? "pointer-events-none" : ""}`}
          >
            <h2 className="pl-3 w-[70%] text-black text-xl font-semibold truncate">
              {note.title}
            </h2>
            <button className="flex items-center justify-end mr-3 h-full ">
              <MdDelete
                size={30}
                onClick={() => handleDelete(note.id)}
                className="cursor-pointer text-black hover:text-red-500"
              />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
