type timerProps = {
  timer: {
    minutes: number;
    seconds: number;
    start(): void;
    pause(): void;
    reset(): void;
  };
};

const Timer = ({ timer }: timerProps) => {
  return (
    <main className="flex flex-col gap-10 items-center justify-center min-h-screen">
      <h1 className=" text-8xl">
        {timer.minutes}:
        {timer.seconds === 0 ? timer.seconds + "0" : timer.seconds}
      </h1>
      <div className="flex gap-8">
        <button onClick={timer.start} type="button">
          Start
        </button>
        <button onClick={timer.reset} type="button">
          Reset
        </button>
      </div>
    </main>
  );
};

export default Timer;
