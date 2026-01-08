import { useState, useEffect } from "react";
interface CountdownTimerProps {
  targetDate: string;
  color?: "cyan" | "magenta";
}
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const CountdownTimer = ({ targetDate, color = "cyan" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  const borderColor = color === "cyan" ? "border-primary" : "border-secondary";
  const textColor = color === "cyan" ? "text-primary" : "text-secondary";
  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div
        className={`w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-lg p-1 border border-border shadow-2xl`}
        style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.6))' }}
      >
        <span className={`text-lg sm:text-2xl md:text-3xl font-bold ${textColor}`}>
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-2 block">
        {label}
      </span>
    </div>
  );
  return (
    /* use padding instead of horizontal margins, allow wrap on very small screens to avoid overflow */
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center px-4 sm:px-8 items-center max-w-full">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className={`self-center ${textColor} text-lg sm:text-2xl font-bold`} style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.6))' }}>:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className={`self-center ${textColor} text-lg sm:text-2xl font-bold`} style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.6))' }}>:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className={`self-center ${textColor} text-lg sm:text-2xl font-bold`} style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.6))' }}>:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
export default CountdownTimer;
