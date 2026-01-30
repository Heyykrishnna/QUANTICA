export type ScheduleItem = {
    title: string;
    start: string; // ISO date string
    end: string;   // ISO date string
    type: "game";
};

export const schedule: ScheduleItem[] = [
    // --- Day 1: Feb 7, 2026 ---
    {
        title: "BGMI - Semi Finals",
        start: "2026-02-07T10:00:00",
        end: "2026-02-07T17:30:00",
        type: "game"
    },
    {
        title: "Free Fire Max - Semi Finals",
        start: "2026-02-07T10:00:00",
        end: "2026-02-07T17:30:00",
        type: "game"
    },
    {
        title: "Valorant - Quarter Finals",
        start: "2026-02-07T11:00:00",
        end: "2026-02-07T17:00:00",
        type: "game"
    },
    {
        title: "Tekken 8",
        start: "2026-02-07T13:30:00",
        end: "2026-02-07T17:30:00",
        type: "game"
    },
    {
        title: "eFootball / EA FC 26",
        start: "2026-02-07T13:30:00",
        end: "2026-02-07T17:30:00",
        type: "game"
    },

    // --- Day 2: Feb 8, 2026 ---
    {
        title: "BGMI - Finals",
        start: "2026-02-08T10:00:00",
        end: "2026-02-08T17:00:00",
        type: "game"
    },
    {
        title: "Free Fire Max - Finals",
        start: "2026-02-08T10:00:00",
        end: "2026-02-08T15:00:00",
        type: "game"
    },
    {
        title: "Valorant - Semi Finals",
        start: "2026-02-08T10:00:00",
        end: "2026-02-08T13:00:00",
        type: "game"
    },
    {
        title: "Valorant - Finals",
        start: "2026-02-08T13:00:00",
        end: "2026-02-08T17:00:00",
        type: "game"
    },
    {
        title: "Clash Royale",
        start: "2026-02-08T10:00:00",
        end: "2026-02-08T16:00:00",
        type: "game"
    },
    {
        title: "F1 25",
        start: "2026-02-08T10:00:00",
        end: "2026-02-08T17:00:00",
        type: "game"
    },
];
