import { useEffect, useState } from "react";
import { scheduleEvents, ScheduleEvent } from "../data/schedule";

// Helper function to parse the schedule's date format (DD/MM/YY and time like "10:00 AM")
const parseDateTime = (dayStr: string, timeStr: string): Date => {
    const [day, month, year] = dayStr.split('/').map(Number);
    const fullYear = 2000 + year; // Assuming 2-digit year means 20XX

    // Parse time string like "10:00 AM" or "5:30 PM"
    const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) {
        return new Date(fullYear, month - 1, day);
    }

    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    return new Date(fullYear, month - 1, day, hours, minutes);
};

const EventMarquee = () => {
    const [liveEvents, setLiveEvents] = useState<ScheduleEvent[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEvent[]>([]);

    useEffect(() => {
        const checkLiveEvents = () => {
            const now = new Date();
            // For testing, uncomment to override time:
            // const now = new Date("2026-02-07T11:00:00"); 

            const currentLive = scheduleEvents.filter(item => {
                const start = parseDateTime(item.day, item.startTime);
                const end = parseDateTime(item.day, item.endTime);
                return now >= start && now <= end;
            });

            if (currentLive.length > 0) {
                setLiveEvents(currentLive);
                setUpcomingEvents([]);
            } else {
                setLiveEvents([]);
                // Find next upcoming day
                const allUpcoming = scheduleEvents
                    .filter(item => parseDateTime(item.day, item.startTime) > now)
                    .sort((a, b) => parseDateTime(a.day, a.startTime).getTime() - parseDateTime(b.day, b.startTime).getTime());

                if (allUpcoming.length > 0) {
                    // Get all events happening on the same day as the first upcoming event
                    const targetDay = allUpcoming[0].day;

                    const nextDayEvents = allUpcoming.filter(item => item.day === targetDay);
                    setUpcomingEvents(nextDayEvents);
                } else {
                    setUpcomingEvents([]);
                }
            }
        };

        checkLiveEvents();
        const interval = setInterval(checkLiveEvents, 60000);
        return () => clearInterval(interval);
    }, []);

    if (liveEvents.length === 0 && upcomingEvents.length === 0) return null;

    // If live events exist, show them all. If only upcoming, show all upcoming for that day.
    const displayItems = liveEvents.length > 0 ? liveEvents : upcomingEvents;
    const isLive = liveEvents.length > 0;

    return (
        <div className="fixed top-16 md:top-20 left-0 right-0 z-40 mb-20 pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm border-y border-primary/30 py-2 overflow-hidden flex relative z-10 w-full">
                <div className="animate-marquee-slow whitespace-nowrap flex items-center">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            {displayItems.map((item, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-4 mx-8">
                                    <span className={`text-sm font-bold tracking-widest ${isLive ? 'text-red-500' : 'text-cyan-400'}`}>
                                        {isLive ? '* LIVE NOW' : '* UPCOMING'}
                                    </span>
                                    <span className="text-white text-sm uppercase tracking-wider">
                                        {item.title}
                                    </span>
                                    <span className="text-primary/100 text-xs">
                                        {item.day} {item.startTime}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventMarquee;
