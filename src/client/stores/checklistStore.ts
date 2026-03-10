import { create } from "zustand";

export interface ChecklistItem {
    id: string;
    label: string;
    completed: boolean;
    sortOrder: number;
}

interface ChecklistState {
    items: ChecklistItem[];
    isAllComplete: boolean;
    toggleItem: (id: string) => void;
    addItem: (label: string) => void;
    removeItem: (id: string) => void;
    resetAll: () => void;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
    { id: "audio", label: "Audio levels checked", completed: false, sortOrder: 0 },
    { id: "camera", label: "Camera framing good", completed: false, sortOrder: 1 },
    { id: "lighting", label: "Lighting adjusted", completed: false, sortOrder: 2 },
    { id: "scene", label: "Correct scene selected", completed: false, sortOrder: 3 },
    { id: "title", label: "Stream title and category set", completed: false, sortOrder: 4 },
    { id: "social", label: "Go-live post drafted", completed: false, sortOrder: 5 },

];

function checkAllComplete(items: ChecklistItem[]): boolean {
    return items.length > 0 && items.every((item) => item.completed);
}

export const useCheckListStore = create<ChecklistState>((set, get) => ({
    items: DEFAULT_ITEMS,
    isAllComplete: false,

    toggleItem: (id: string) => {
        set((state) => {
            const updated = state.items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            );
            return { items: updated, isAllComplete: checkAllComplete(updated) };
        });
    },

    addItem: (label: string) => {
        set((state) => {
            const newItem: ChecklistItem = {
                id: `custom-${Date.now()}`,
                label,
                completed: false,
                sortOrder: state.items.length,
            };
            return {
                items: [...state.items, newItem],
                isAllComplete: false,
            };
        });
    },

    removeItem: (id: string) => {
        set((state) => {
            const updated = state.items.filter((item) => item.id !== id);
            return { items: updated, isAllComplete: checkAllComplete(updated) };
        });
    },

    resetAll: () => {
        set((state) => {
            const updated = state.items.map((item) =>
                ({ ...item, completed: false }));

            return { items: updated, isAllComplete: false};
        });
    },



}));