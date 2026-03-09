import { useState, type ReactNode } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { ChatPanel } from "./components/chat/ChatPanel";
import { AnalyticsDashboard } from "./components/analytics/AnalyticsDashboard";
import { StreamNotes } from "./components/notes/StreamNotes";
import { GoLiveChecklist } from "./components/checklist/GoLiveChecklist";




export type ViewId = "dashboard" | "chat" | "notes" | "checklist" | "analytics";

const views: Record<ViewId, React.ReactNode> = {
    dashboard: <DashboardHome />,
    chat: <ChatPanel />,
    notes: <StreamNotes />,
    checklist: <GoLiveChecklist />,
    analytics: <AnalyticsDashboard />,
};

export default function App() {
    const [activeView, setActiveView] = useState<ViewId>("checklist");

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            <Sidebar activeView={activeView} onNavigate={setActiveView} />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    {views[activeView]}
                </main>
            </div>
        </div>
    );
}

function DashboardHome() {
    return <div>Dashboard Home</div>;
}

