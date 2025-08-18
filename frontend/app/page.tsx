import { MdAddBox } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

export default function Home() {
  const notes = [
    { id: 1, title: "Shopping List", content: "Milk, Bread, Eggs" },
    { id: 2, title: "Work", content: "Finish project report" },
    { id: 3, title: "Ideas", content: "Next startup idea..." },
  ];

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-400">
      <div className="flex flex-row justify-between mt-5 w-[90%] h-[10%] bg-[#74FFE3]">
        <div className="flex items-center justify-center w-[20%]">
          <FaArrowLeft size={30} color="black" />
        </div>
        <div className="flex items-center justify-center w-[50%] text-black text-2xl font-semibold ">
          Notes
        </div>
        <div className="flex items-center justify-center w-[20%] ">
          <MdAddBox size={30} color="black" />
        </div>
      </div>
    </div>
  );
}
