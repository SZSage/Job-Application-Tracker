import { useState } from "react";

const [ activeTab, setActiveTab ] = useState();

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 pb-2">
      {["Active", "Archived"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
