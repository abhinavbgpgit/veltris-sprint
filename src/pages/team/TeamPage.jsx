import React, { useState } from "react";
import TeamMemberCard from "../../components/TeamMemberCard";
import AddUserModal from "./AddUserModal";
import UserList from "./UserList";
import AnimatedOutlineButton from "../../components/AnimatedOutlineButton";

const TeamPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <main
      className="mx-auto p-8 flex flex-col gap-8 min-h-[80vh] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
    >
      {/* Page header, controls, and overview will be added here */}
      <header className="flex items-center justify-between gap-6">
        <h1 className="text-[2.2rem] font-bold m-0 tracking-tight">Team</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-blue-600 text-white border-none rounded-md px-6 py-3 font-semibold text-base cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.07)]"
            onClick={() => setShowAdd(true)}
          >
            + Add Developer
          </button>
          <AnimatedOutlineButton
            borderColor="border-blue-600"
            textColor="text-blue-600"
            hoverBgColor="bg-blue-50"
            size="md"
            className="font-semibold rounded-md"
          >
            Export
          </AnimatedOutlineButton>
          <AnimatedOutlineButton
            borderColor="border-gray-200"
            textColor="text-[#222]"
            hoverBgColor="bg-gray-50"
            size="md"
            className="font-semibold rounded-md"
          >
            Print
          </AnimatedOutlineButton>
        </div>
      </header>    
      <AddUserModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      />     
      <UserList />     
    </main>
  );
};

export default TeamPage;