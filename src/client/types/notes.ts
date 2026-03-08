export const NOTE_TAGS = ["clip","topic","question", "highlight"] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export interface StreamNote {
    readonly id: number;
    readonly sessionId: number;
    readonly timestamp: Date;
    readonly elapsedSec: number;
    tag: NoteTag;
    content: string;
    readonly createdAt: Date;
}

export interface TagMeta{
    label:string;
    color:string;
    emoji: string;
    shortcut: string;
}

export const TAG_METADATA: Record<NoteTag, TagMeta> = {
    clip:{
        label: "Clip This",
        color: "#ef4444",
        emoji:"🎬",
        shortcut:"C",
    },

    topic:{
        label: "Topic",
        color: "#4287f5",
        emoji: "💡",
        shortcut: "T",
    },
    
    question:{
        label: "Question",
        color: "#bcf542",
        emoji:"❓",
        shortcut: "Q"
    },
    highlight:{
        label: "Highlight",
        color: "#42f55d",
        emoji: "✍🏽",
        shortcut: "H"
    }
};