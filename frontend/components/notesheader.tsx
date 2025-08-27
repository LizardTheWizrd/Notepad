import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";

type NotesHeaderProps = {
  view: "home" | "note";
};

const NotesHeader: React.FC<NotesHeaderProps> = ({ view }) => {
  return (
    <div className="flex flex-row justify-between w-[90%] h-[10%] md:w-[692px] border-8 border-transparent rounded-md bg-[#74FFE3] ">
      {view === "note" ? (
        <Link href="/" className="flex items-center justify-start pl-3 w-[20%]">
          <FaArrowLeft size={30} color="black" />
        </Link>
      ) : (
        <div className="w-[20%]" /> // empty space to keep layout consistent
      )}

      <div className="flex items-center justify-center w-[50%] text-black text-2xl font-semibold">
        Notes
      </div>

      {view === "home" ? (
        <Link
          href="/note_editor/new"
          className="flex items-center justify-end pr-3 w-[20%]"
        >
          <MdAddBox size={30} color="black" />
        </Link>
      ) : (
        <div className="w-[20%]" />
      )}
    </div>
  );
};

export default NotesHeader;
