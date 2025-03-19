import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative my-4">
      <input
        type="text"
        placeholder="Search for roles or companies"
        className="w-full px-4 py-2 rounded-md border bg-gray-900 text-white"
      />
      <Search className="absolute right-4 top-3 text-gray-500" />
    </div>
  );
}
