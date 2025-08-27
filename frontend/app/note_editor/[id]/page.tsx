import NotesHeader from "../../../components/notesheader";
import NoteEditor from "../../../components/noteeditor";

export default function Home() {
  return (
    <div className="flex flex-col justify-start items-center py-5 h-screen bg-gray-400">
      <NotesHeader view="note" />
      <NoteEditor />
    </div>
  );
}
