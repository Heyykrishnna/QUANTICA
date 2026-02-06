// Schedule data specifically for the EventSchedule component
// This data should ONLY be used in the events schedule timeline view

export interface ScheduleEvent {
    title: string;
    game: string;
    day: string;
    startTime: string;
    endTime: string;
    venue: string;
    color: "cyan" | "magenta" | "neon-green" | "electric-blue" | "theme-orange" | "theme-yellow" | "theme-red";
    slug: string;
    image: string;
    gameLogo?: string;
    groups?: string[];
    teamLists?: Record<string, string[]>;
    groupTimes?: Record<string, string>;
}

export const scheduleEvents: ScheduleEvent[] = [
    // --- Day 1: Feb 7, 2026 ---
    {
        title: "BGMI",
        game: "BGMI - Semi Finals",
        day: "07/02/26",
        startTime: "10:00 AM",
        endTime: "5:00 PM",
        venue: "501, 502, 503, 504, 506, 507, 508, 509 & 405 Labs",
        color: "theme-yellow",
        slug: "bgmi-semifinals",
        image: "https://ik.imagekit.io/vdigjljlu/bgmi.jpeg?updatedAt=1769276558264",
        gameLogo: "https://trybgmi.com/assets/images/bgmi_logo.webp",
        groups: ["Group A", "Group B", "Group C"],
        teamLists: {
            "Group A": ["Team Thunder", "Elite Squad", "Phoenix Warriors", "Shadow Legends"],
            "Group B": ["Venom Strike", "Apex Predators", "Night Hunters", "Storm Breakers"],
            "Group C": ["Titan Force", "Savage Kings", "Fire Dragons", "Ice Wolves"]
        },
        groupTimes: {
            "Group A": "501 Lab, 508 Lab, 509 Lab",
            "Group B": "502 Lab, 503 Lab, 507 Lab",
            "Group C": "504 Lab, 506 Lab, 405 Lab"
        },
    },
    {
        title: "Free Fire MAX",
        game: "Free Fire - Semi Finals",
        day: "07/02/26",
        startTime: "10:00 AM",
        endTime: "5:30 PM",
        venue: "103, 104, 105, 303, 304, 403, 408, 409, 410, 411 Labs",
        color: "theme-orange",
        slug: "freefire",
        image: "https://ik.imagekit.io/vdigjljlu/ff.jpeg?updatedAt=1769276556496",
        gameLogo: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1768044638/gold_FF_max_logo_u0xyeq.png",
        groups: ["Group A", "Group B", "Group C", "Group D"],
        teamLists: {
            "Group A": ["FireStorm", "Booyah Legends", "Clutch Masters", "Headshot Kings"],
            "Group B": ["NoScope Nation", "Rush Squad", "Tactical Titans", "Gloo Grenades"],
            "Group C": ["AWM Assassins", "Zone Warriors", "Drop Kings", "Revive Legends"],
            "Group D": ["Airdrop Hunters", "Final Circle", "SCAR Squad", "VSS Venom"]
        },
        groupTimes: {
            "Group A": "408 Lab, 409 Lab",
            "Group B": "410 Lab, 411 Lab",
            "Group C": "403 Lab, 303 Lab, 304 Lab",
            "Group D": "103 Lab, 104 Lab, 105 Lab"
        },
    },
    {
        title: "Valorant",
        game: "Valorant - Quarter Finals",
        day: "07/02/26",
        startTime: "10:30 AM",
        endTime: "5:00 PM",
        venue: "VIP Lounge - Behind auditorium",
        color: "theme-red",
        slug: "valorant",
        image: "https://ik.imagekit.io/vdigjljlu/valorant.jpeg?updatedAt=1769276556703",
        gameLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg",
        groups: ["Group A", "Group B"],
        teamLists: {
            "Group A": ["Radiant Raiders", "Cipher Squad", "Viper Elites", "Jett Squad"],
            "Group B": ["Phoenix Five", "Sage Snipers", "Reyna's Revenge", "Brimstone Battalion"]
        },
        groupTimes: {
            "Group A": "4:00 PM - 5:00 PM",
            "Group B": "5:00 PM - 6:00 PM"
        },
    },
    {
        title: "EFootball",
        game: "EFootball",
        day: "07/02/26",
        startTime: "1:30 PM",
        endTime: "5:30 PM",
        venue: "A-405",
        color: "cyan",
        slug: "efootball",
        image: "https://ik.imagekit.io/vdigjljlu/efootball.jpeg?updatedAt=1769276556777",
        gameLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/EFootball_2022_logo_colored.svg/2048px-EFootball_2022_logo_colored.svg.png",
    },
    {
        title: "Tekken 8",
        game: "Tekken 8",
        day: "07/02/26",
        startTime: "1:30 PM",
        endTime: "5:30 PM",
        venue: "106 Lab",
        color: "theme-red",
        slug: "tekken8",
        image: "https://ik.imagekit.io/vdigjljlu/tekken.jpeg?updatedAt=1769276558353",
        gameLogo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f05a9b5b-ead5-460e-8573-73ba2fff9cde/dgs72ru-529a5528-da92-4eb3-a5b8-0f606390feeb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9mMDVhOWI1Yi1lYWQ1LTQ2MGUtODU3My03M2JhMmZmZjljZGUvZGdzNzJydS01MjlhNTUyOC1kYTkyLTRlYjMtYTViOC0wZjYwNjM5MGZlZWIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pk0wzVW-daWlpUgAbtp4co6Z8dR7c5hhfuJAdB20x_A",
    },
    {
        title: "EAFC 26",
        game: "EAFC 26",
        day: "07/02/26",
        startTime: "1:30 PM",
        endTime: "5:30 PM",
        venue: "214 Lab",
        color: "magenta",
        slug: "eafootball26",
        image: "https://ik.imagekit.io/vdigjljlu/fifa.jpeg?updatedAt=1769276559752",
        gameLogo: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1768044591/ea-sports-fc-26-releases-on-september-26-cover68778afd733aa-removebg-preview_ayg4un.png",
    },
    // --- Day 2: Feb 8, 2026 ---
    {
        title: "BGMI",
        game: "BGMI - Finals",
        day: "08/02/26",
        startTime: "10:00 AM",
        endTime: "5:00 PM",
        venue: "Main Arena",
        color: "theme-yellow",
        slug: "bgmi",
        image: "https://ik.imagekit.io/vdigjljlu/bgmi.jpeg?updatedAt=1769276558264",
        gameLogo: "https://trybgmi.com/assets/images/bgmi_logo.webp",
        groups: ["Group A", "Group B"],
        teamLists: {
            "Group A": ["Elite Squad", "Apex Predators", "Titan Force", "Storm Breakers", "Phoenix Warriors", "Shadow Legends"],
            "Group B": ["Team Thunder", "Venom Strike", "Savage Kings", "Night Hunters", "Fire Dragons", "Ice Wolves"]
        },
        groupTimes: {
            "Group A": "2:00 PM - 4:00 PM",
            "Group B": "4:00 PM - 6:00 PM"
        },
    },
    {
        title: "Free Fire MAX",
        game: "Free Fire - Finals",
        day: "08/02/26",
        startTime: "10:00 AM",
        endTime: "3:00 PM",
        venue: "Main Arena",
        color: "theme-orange",
        slug: "freefire-finals",
        image: "https://ik.imagekit.io/vdigjljlu/ff.jpeg?updatedAt=1769276556496",
        gameLogo: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1768044638/gold_FF_max_logo_u0xyeq.png",
    },
    {
        title: "Valorant",
        game: "Valorant - Semi Finals",
        day: "08/02/26",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        venue: "VIP Lounge - Behind auditorium",
        color: "theme-red",
        slug: "valorant-semis",
        image: "https://ik.imagekit.io/vdigjljlu/valorant.jpeg?updatedAt=1769276556703",
        gameLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg",
    },
    {
        title: "Valorant",
        game: "Valorant - Finals",
        day: "08/02/26",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        venue: "VIP Lounge - Behind auditorium",
        color: "theme-yellow",
        slug: "valorant-finals",
        image: "https://ik.imagekit.io/vdigjljlu/valorant.jpeg?updatedAt=1769276556703",
        gameLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg",
    },
    {
        title: "F1 - 25",
        game: "F1 - 25",
        day: "08/02/26",
        startTime: "10:00 AM",
        endTime: "5:00 PM",
        venue: "Atrium",
        color: "theme-red",
        slug: "f125",
        image: "https://ik.imagekit.io/vdigjljlu/f1.jpeg?updatedAt=1769276557113",
        gameLogo: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1768044450/F1_25_logo_e5d3qt.png",
    },
    {
        title: "Clash Royale",
        game: "Clash Royale",
        day: "08/02/26",
        startTime: "10:00 AM",
        endTime: "4:00 PM",
        venue: "A-418",
        color: "electric-blue",
        slug: "clashroyale",
        image: "https://ik.imagekit.io/vdigjljlu/clashroyale.jpeg?updatedAt=1769276559781",
        gameLogo: "https://1000logos.net/wp-content/uploads/2021/02/Clash-Royale-emblem.png",
    },
    // -------- Cultural Events Day 1: 07 Feb 2026 --------
    {
        title: "Casual Games",
        game: "Casual Gaming Zone",
        day: "07/02/26",
        startTime: "2:00 PM",
        endTime: "9:00 PM",
        venue: "Atrium",
        color: "neon-green",
        slug: "casual-games-day-1",
        image: "https://ik.imagekit.io/jbckhvkvo/Explore%20the%20elegance%20and%20strategy%20of%20a%20chess%20game%20through%20this%20artistic%20representation%20for%20the%20daily%20theme%20hosted%20by%20@@monai_art%20for.%20%E2%99%9F%EF%B8%8F_%20_ChessArt%20_StrategicBeauty%20_TimelessGame%20_chess%20_chessgame%20_aiartwork%20_aiartcommuity%20_neuraldreamer",
    },
    {
        title: "Saarang",
        game: "Saarang",
        day: "07/02/26",
        startTime: "7:30 PM",
        endTime: "8:30 PM",
        venue: "Atrium (Main Stage)",
        color: "electric-blue",
        slug: "saarang",
        image: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_533485623_17890325007305427_6001201176540970019_n.jpg",
    },
    {
        title: "DJ Night",
        game: "DJ Night",
        day: "07/02/26",
        startTime: "8:30 PM",
        endTime: "11:00 PM",
        venue: "Atrium (Main Stage)",
        color: "theme-orange",
        slug: "dj-night-day-1",
        image: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_542870573_17854072368521008_1066930159959735392_n.jpg",
    },
    // -------- Cultural Events Day 2: 08 Feb 2026 --------
    {
        title: "Casual Games",
        game: "Casual Gaming Zone",
        day: "08/02/26",
        startTime: "2:00 PM",
        endTime: "9:00 PM",
        venue: "Open Gaming Area",
        color: "neon-green",
        slug: "casual-games-day-2",
        image: "https://ik.imagekit.io/jbckhvkvo/Explore%20the%20elegance%20and%20strategy%20of%20a%20chess%20game%20through%20this%20artistic%20representation%20for%20the%20daily%20theme%20hosted%20by%20@@monai_art%20for.%20%E2%99%9F%EF%B8%8F_%20_ChessArt%20_StrategicBeauty%20_TimelessGame%20_chess%20_chessgame%20_aiartwork%20_aiartcommuity%20_neuraldreamer",
    },
    {
        title: "Flute Boxer's",
        game: "Live Music Performance",
        day: "08/02/26",
        startTime: "7:00 PM",
        endTime: "8:00 PM",
        venue: "Main Stage",
        color: "cyan",
        slug: "flute-boxers",
        image: "https://ik.imagekit.io/jbckhvkvo/Screenshot%202026-02-05%20at%208.17.02%E2%80%AFPM.heic",
    },
    {
        title: "Concert",
        game: "Live Concert",
        day: "08/02/26",
        startTime: "8:00 PM",
        endTime: "9:30 PM",
        venue: "Main Stage",
        color: "magenta",
        slug: "concert-night",
        image: "https://ik.imagekit.io/jbckhvkvo/YUNGBLUD.jpeg",
    },
    {
        title: "DJ Night",
        game: "DJ Night",
        day: "08/02/26",
        startTime: "9:30 PM",
        endTime: "11:00 PM",
        venue: "Main Stage",
        color: "theme-red",
        slug: "dj-night",
        image: "https://ik.imagekit.io/jbckhvkvo/Our%20talented%20DJ_s.jpeg",
    },
];
