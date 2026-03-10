import { useCheckListStore, type ChecklistItem } from "../../stores/checklistStore";

interface ChecklistItemProps {
    item: ChecklistItem;
}

export function ChecklistItem({ item }: ChecklistItemProps) {
    const { toggleItem, removeItem } = useCheckListStore();

  return (
    <div
      onClick={() => toggleItem(item.id)}
      className="flex items-center gap-4 px-4 py-3 rounded-lg border border-gray-800 bg-gray-900 cursor-pointer hover:border-cyan-500/30"
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          item.completed ? "bg-cyan-500 border-cyan-500" : "border-gray-600"
        }`}
      >
        {item.completed && <span className="text-white text-xs">✓</span>}
      </div>
      <span className={`flex-1 text-sm ${item.completed ? "line-through text-gray-500" : "text-gray-100"}`}>
        {item.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeItem(item.id);
        }}
        className="text-gray-600 hover:text-red-400 text-xs"
      >
        remove
      </button>
    </div>
  );
}