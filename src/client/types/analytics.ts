export interface DataPoint<T>{
    label: string;
    value: T;
    timestamp: Date;
}

export interface SessionAnalytics{
    sessionId: number;
    date:string;
    title: string;
    durationMinutes: number;
    peakViewers: number;
    avgViewers: number;
    totalMessages: number;
    chatRatePerMin: number;
}

export interface ViewerChartPoint{
    time: string;
    viewers: number;
    chatRate: number;
}

export interface EngagementSegment{
    startSec: number;
    endSec: number;
    avgViewers: number;
    chatRate: number;
}

export type EngagementWithNotes = EngagementSegment & {
    notes: Array<{ tag: string; content: string}>;
};
