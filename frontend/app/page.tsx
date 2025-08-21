import { MdAddBox } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

import NotesHeader from "../components/notesheader";
import NotesList from "../components/noteslist";

export default function Home() {
  const notes = [
    { id: 1, title: "Shopping List", content: "Milk, Bread, Eggs" },
    { id: 2, title: "Work", content: "Finish project report" },
    { id: 3, title: "Ideas", content: "Next startup idea..." },
    {
      id: 4,
      title: "Something vetty really really really really long",
      content: "Next startup idea...",
    },
    { id: 5, title: "Shopping List", content: "Milk, Bread, Eggs" },
    { id: 6, title: "Work", content: "Finish project report" },
    { id: 7, title: "Ideas", content: "Next startup idea..." },
    {
      id: 8,
      title: "Something vetty really really really really long",
      content: "Next startup idea...",
    },
    { id: 9, title: "Shopping List", content: "Milk, Bread, Eggs" },
    { id: 10, title: "Work", content: "Finish project report" },
    { id: 11, title: "Ideas", content: "Next startup idea..." },
    {
      id: 12,
      title: "Something vetty really really really really long",
      content: "Next startup idea...",
    },

    { id: 13, title: "Shopping List", content: "Milk, Bread, Eggs" },
    { id: 14, title: "Work", content: "Finish project report" },
    { id: 15, title: "Ideas", content: "Next startup idea..." },
    {
      id: 16,
      title: "Something vetty really really really really long",
      content: "Next startup idea...",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center py-5 h-screen bg-gray-400">
      <NotesHeader view="home" />
      <NotesList />
    </div>
  );
}
