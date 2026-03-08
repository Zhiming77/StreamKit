export enum StreamStatus {
    Offline = "offline",
    PreStream = "pre-stream",
    Live = "live",
    PostStream = "post-stream"
}

export interface StreamSession {
   readonly id: number;
   readonly startedAt: Date;
   endedAt: Date | null;
   title: string;
   status: StreamStatus;
   peakViewers: number;
   avgViewers: number;
   totalMessages: number;
   durationSeconds: number;
}

export type NewSession = Omit<StreamSession, "id" | "startedAt" | "endedAt" |"durationSeconds">;
export type SessionSummary = Pick<StreamSession, "id" | "title" | "startedAt" | "peakViewers" | "durationSeconds">;
