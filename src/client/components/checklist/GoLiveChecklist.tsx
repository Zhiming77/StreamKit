import { useState } from "react";
import { useCheckListStore } from "../../stores/checklistStore";
import { ChecklistItem } from "./ChecklistItem";

export function GoLiveChecklist() {
  const { items, isAllComplete, addItem, resetAll } = useCheckListStore();

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newItemLabel, setNewItemLabel] = useState<string>("");

  const completedCount = items.filter((i) => i.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Go-Live Checklist</h1>
          <p className="text-gray-400 mt-1">
            {completedCount} of {items.length} complete
          </p>
        </div>
        <button
          onClick={resetAll}
          className="px-3 py-2 text-sm text-gray-400 hover:text-gray-100 rounded-lg hover:bg-gray-800"
        >
          Reset
        </button>
      </div>

      <div className="h-2 bg-gray-800 rounded-full mb-8">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAllComplete ? "bg-green-500" : "bg-cyan-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <ChecklistItem key={item.id} item={item} />
        ))}
      </div>
      {isAdding ? (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newItemLabel.trim()) {
                addItem(newItemLabel.trim());
                setNewItemLabel("");
                setIsAdding(false);
              }
              if (e.key === "Escape") {
                setNewItemLabel("");
                setIsAdding(false);
              }
            }}
            placeholder="New checklist item..."
            autoFocus
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => {
              setIsAdding(false);
              setNewItemLabel("");
            }}
            className="text-sm text-gray-400 hover:text-gray-100"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 text-sm text-gray-400 hover:text-cyan-400"
        >
          + Add custom item
        </button>
      )}

      {isAllComplete && (
        <div className="mt-10 text-center">
          <button className="px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-xl hover:bg-green-400 animate-pulse">
            Ready to Go Live!
          </button>
        </div>
      )}
    </div>
  );
}
