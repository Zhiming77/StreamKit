import { useState, useEffect } from "react";

export function Header() {
    const [time, SetTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            SetTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Command Center</span>
            <span className="font-mono text-sm text-gray-400">{time.toLocaleTimeString()}</span>
        </header>
    );
}