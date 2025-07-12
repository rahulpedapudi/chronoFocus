import { Button } from "./ui/button";
import { TimerState } from "../types/timer";

interface TimerControlsProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls = ({
  timerState,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) => {
  return (
    <div className="flex gap-8">
      {!timerState.isActive ? (
        <Button onClick={onStart} type="button">
          Start
        </Button>
      ) : (
        <Button onClick={onPause} variant="outline" type="button">
          {timerState.pause ? "Resume" : "Pause"}
        </Button>
      )}
      <Button onClick={onReset} variant="destructive" type="button">
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;
