export enum Sentiment {
    Positive = "positive",
    Negative = "negative",
    Neutral = "neutral"
}
export enum Platform {
    Twitch = "twitch",
    YouTube = "youtube"
}

export interface ChatMessage {
    readonly id: string;
    readonly username: string;
    sentiment: Sentiment;
    readonly content: string;
    readonly timestamp: Date;
    readonly isQuestion: boolean;
    readonly badges: string[];
}

export interface ChatConfig {
    platform: Platform;
    channel: string;
    summaryIntervalMs: number;
    enableSentiment: boolean;
}

export type ChatConfigOverrides = Partial<ChatConfig>;
export const DEFAULT_CHAT_CONFIG: Readonly<ChatConfig>={
    platform: Platform.Twitch,
    channel:"",
    summaryIntervalMs: 60_000,
    enableSentiment: true

};

export type ChatEvent = 
| {type: "message"; message: ChatMessage}
| {type: "join"; username: string; timestamp: Date}
| {type: "subscribed"; username: string; months: number}

