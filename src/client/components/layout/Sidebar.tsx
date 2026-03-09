import { ViewId } from "../../App";

interface SidebarProps {
    activeView: string;
    onNavigate: (view: ViewId) => void;
}

interface NavItem {
    id: ViewId;
    label: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "chat", label: "Chat" },
    { id: "notes", label: "Notes" },
    { id: "checklist", label: "Checklist" },
    { id: "analytics", label: "Analytics" }

]

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
    return (
        <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-4">
            <h2>StreamKit</h2>
            <nav>
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === item.id
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}