import { TimerState } from "../types/timer";

interface TimerDisplayProps {
  timerState: TimerState;
}

const TimerDisplay = ({ timerState }: TimerDisplayProps) => {
  const formatTime = (minutes: number, seconds: number) => {
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="font-semibold text-2xl">{timerState.session}</h1>
      <h1 className="font-bold text-9xl">
        {formatTime(timerState.minutes, timerState.seconds)}
      </h1>
    </div>
  );
};

export default TimerDisplay;
