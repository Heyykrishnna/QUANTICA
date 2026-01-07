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
        className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border ${borderColor}`}
      >
        <span className={`text-2xl md:text-3xl font-bold ${textColor}`}>
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mt-2 block">
        {label}
      </span>
    </div>
  );
  return (
    <div className="flex gap-2 md:gap-4 justify-center mx-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className={`self-center ${textColor} text-2xl font-bold`}>:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className={`self-center ${textColor} text-2xl font-bold`}>:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className={`self-center ${textColor} text-2xl font-bold`}>:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
export default CountdownTimer;
