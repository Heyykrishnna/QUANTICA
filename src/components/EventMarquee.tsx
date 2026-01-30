import { useEffect, useState } from "react";
import { schedule, ScheduleItem } from "@/data/schedule";
import { parseISO, isWithinInterval } from "date-fns";

const EventMarquee = () => {
    const [liveEvents, setLiveEvents] = useState<ScheduleItem[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        const checkLiveEvents = () => {
            const now = new Date();
            // For testing, uncomment to override time:
            // const now = new Date("2026-02-07T11:00:00"); 

            const currentLive = schedule.filter(item => {
                const start = parseISO(item.start);
                const end = parseISO(item.end);
                return isWithinInterval(now, { start, end });
            });

            if (currentLive.length > 0) {
                setLiveEvents(currentLive);
                setUpcomingEvents([]);
            } else {
                setLiveEvents([]);
                // Find next upcoming day
                const allUpcoming = schedule
                    .filter(item => parseISO(item.start) > now)
                    .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime());

                if (allUpcoming.length > 0) {
                    // Get all events happening on the same day as the first upcoming event
                    const nextEventStart = parseISO(allUpcoming[0].start);
                    // Use date string comparison for simplicity "YYYY-MM-DD"
                    const targetDateStr = nextEventStart.toISOString().split('T')[0];

                    const nextDayEvents = allUpcoming.filter(item => {
                        return parseISO(item.start).toISOString().startsWith(targetDateStr);
                    });
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
                                        {new Date(item.start).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
