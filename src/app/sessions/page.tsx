import List03 from "@/components/lists/list-03";

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Court Sessions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage your upcoming tennis court sessions
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <List03 />
      </div>
    </div>
  );
}
