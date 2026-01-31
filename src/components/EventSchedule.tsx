import { motion } from "framer-motion";

interface Event {
  title: string;
  game: string;
  date: string;
  startTime?: string;
  endTime?: string;
  day?: string;
  venue?: string;
  teams?: string;
  format?: string;
  prizePool: string;
  groups?: string[];
  teamLists?: Record<string, string[]>;
  image: string;
  gameLogo?: string;
  color: "cyan" | "magenta";
  slug: string;
}

interface EventScheduleProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

interface PositionedEvent extends Event {
  lane: number;
  startPos: number;
  width: number;
}

const EventSchedule = ({ events, onEventClick }: EventScheduleProps) => {
  // Timeline: 9AM to 11PM with 2-hour intervals
  const times = ["9AM", "11AM", "1PM", "3PM", "5PM", "7PM", "9PM", "11PM"];
  
  // Helper to convert time string to hour (24-hour format)
  const timeToHour = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):?(\d*)\s*(AM|PM)/i);
    if (!match) return 9;
    
    let hour = parseInt(match[1]);
    const isPM = match[3].toUpperCase() === "PM";
    
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    
    return hour;
  };

  // Helper to calculate position in hours from 9AM
  const getTimePosition = (timeStr: string): number => {
    const hour = timeToHour(timeStr);
    return hour - 9; // 9AM is position 0, returns hours from start
  };

  // Helper to check if two events overlap
  const eventsOverlap = (e1: { startPos: number; width: number }, e2: { startPos: number; width: number }): boolean => {
    const e1End = e1.startPos + e1.width;
    const e2End = e2.startPos + e2.width;
    return !(e1End <= e2.startPos || e2End <= e1.startPos);
  };

  // Assign lanes to events to prevent overlap
  const assignLanes = (dayEvents: Event[]): PositionedEvent[] => {
    const positioned: PositionedEvent[] = [];
    
    dayEvents.forEach(event => {
      if (!event.startTime || !event.endTime) return;
      
      const startPos = getTimePosition(event.startTime);
      const endPos = getTimePosition(event.endTime);
      const width = endPos - startPos;
      
      // Find the lowest available lane
      let lane = 0;
      let foundLane = false;
      
      while (!foundLane) {
        const eventsInLane = positioned.filter(e => e.lane === lane);
        const hasOverlap = eventsInLane.some(e => eventsOverlap({ startPos, width }, { startPos: e.startPos, width: e.width }));
        
        if (!hasOverlap) {
          foundLane = true;
        } else {
          lane++;
        }
      }
      
      positioned.push({ ...event, lane, startPos, width });
    });
    
    return positioned;
  };

  // Group events by day and assign lanes
  const eventsByDay = events.reduce((acc, event) => {
    if (event.day) {
      if (!acc[event.day]) {
        acc[event.day] = [];
      }
      acc[event.day].push(event);
    }
    return acc;
  }, {} as Record<string, Event[]>);

  const days = Object.keys(eventsByDay).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);
    
    if (yearA !== yearB) return yearA - yearB;
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });
  const LANE_HEIGHT = 100; // Height per lane in pixels

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header with times */}
        <div className="mb-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-3 border-b border-border/20">
          <div className="flex">
            {/* Day column header */}
            <div className="w-32 flex-shrink-0 pr-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </div>
            </div>
            
            {/* Time headers */}
            <div className="flex-1 grid gap-0" style={{ gridTemplateColumns: `repeat(${times.length}, 1fr)` }}>
              {times.map((time, i) => (
                <div
                  key={time}
                  className="text-center py-1"
                >
                  <span className="text-sm font-semibold text-foreground">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule rows by day */}
        <div className="space-y-4">
          {days.map((day, dayIndex) => {
            const positionedEvents = assignLanes(eventsByDay[day]);
            const maxLane = Math.max(...positionedEvents.map(e => e.lane), 0);
            const totalHeight = (maxLane + 1) * LANE_HEIGHT;

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
                className="flex border border-border/30 rounded-lg overflow-hidden hover:border-border/50 transition-colors"
              >
                {/* Day label */}
                <div className="w-32 flex-shrink-0 pr-3 bg-muted/30 border-r border-border/30">
                  <div className="p-3">
                    <p className="text-base font-bold text-foreground">
                      {day.split('/')[0]}/{day.split('/')[1]}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                      {new Date(2026, parseInt(day.split('/')[1]) - 1, parseInt(day.split('/')[0])).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                  </div>
                </div>

                {/* Timeline grid */}
                <div className="flex-1 relative" style={{ minHeight: `${Math.max(totalHeight, 90)}px` }}>
                  {/* Grid background - subtle vertical lines */}
                  <div className="absolute inset-0 grid gap-0" style={{ gridTemplateColumns: `repeat(${times.length}, 1fr)` }}>
                    {times.map((_, i) => (
                      <div
                        key={i}
                        className="border-l border-border/5 h-full first:border-l-0"
                      />
                    ))}
                  </div>

                  {/* Event blocks */}
                  {positionedEvents.map((event, index) => {
                    const colorClass =
                      event.color === "cyan"
                        ? "bg-cyan/95 hover:bg-cyan border-cyan/80 text-black"
                        : "bg-magenta/95 hover:bg-magenta border-magenta/80 text-white";
                    
                    // Calculate position as percentage of total 14 hours (9AM to 11PM)
                    const leftPercent = (event.startPos / 14) * 100;
                    const widthPercent = (event.width / 14) * 100;

                    return (
                      <motion.button
                        key={event.slug}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 + index * 0.03 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                        onClick={() => onEventClick(event)}
                        className={`absolute border rounded-md text-left overflow-hidden transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg ${colorClass}`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                          top: `${event.lane * LANE_HEIGHT + 6}px`,
                          height: `${LANE_HEIGHT - 12}px`,
                        }}
                      >
                        <div className="px-3 py-2 h-full flex flex-col justify-between">
                          <div>
                            <p className="font-bold text-sm line-clamp-1">
                              {event.game}
                            </p>
                            <p className="text-[10px] opacity-85 mt-0.5">
                              {event.venue}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-medium opacity-80">
                            <span>{event.startTime}</span>
                            <span>-</span>
                            <span>{event.endTime}</span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
