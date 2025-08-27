"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { createNote, updateNote, getNoteById } from "@/api/notes";

const NoteEditor = () => {
  const params = useParams();
  const noteIdFromUrl = params.id; // will be "new" or an actual note ID
  const [noteId, setNoteId] = useState<number | null>(
    !noteIdFromUrl || noteIdFromUrl === "new" ? null : Number(noteIdFromUrl)
  );

  // derived from state on every render
  const isNew = noteId === null;
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch existing note if updating
  useEffect(() => {
    if (!isNew && noteId) {
      getNoteById(noteId)
        .then((note) => {
          // Combine title and body into one string
          const combinedText = note.body
            ? `${note.title}\n${note.body}`
            : note.title;
          setText(combinedText);
        })
        .catch((err) => console.error("Error fetching note:", err));
    }
    console.log(text);
  }, [noteId, isNew]);

  const saveNote = async (text: string) => {
    if (!text.trim()) return;

    setSaving(true);
    try {
      if (isNew) {
        const data = await createNote(text);
        setNoteId(data.id); // store new note ID → now updates will work
      } else {
        await updateNote(noteId, text);
      }
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => saveNote(e.target.value), 2000);
  };

  return (
    <div className="flex flex-col mt-5 w-[90%] h-full md:w-[692px] border-8 border-[#74FFE3] rounded-md bg-[#A2FFEC] overflow-y-auto no-scrollbar ">
      <textarea
        className="w-full h-full resize-none p-4 bg-transparent outline-none text-black text-sm"
        placeholder="Start typing your note..."
        value={text}
        onChange={handleChange}
      />
      {saving && <div className="text-sm text-gray-500">Saving...</div>}
    </div>
  );
};

export default NoteEditor;
