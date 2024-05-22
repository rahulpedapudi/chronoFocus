import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const App = () => {
  const SMALLBREAK = {
    minutes: 5,
    seconds: 0,
  };
  const LONGBREAK = {
    minutes: 10,
    seconds: 0,
  };
  const WORK = {
    minutes: 25,
    seconds: 0,
  };

  const [minutes, setminutes] = useState(WORK.minutes);
  const [seconds, setSeconds] = useState(WORK.seconds);

  const [isActive, setIsActive] = useState(false);
  const [pause, setPause] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [session, setSession] = useState("Work!");

  useEffect(() => {
    let interval: any;
    if (isActive && !pause) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerEnd();
          } else {
            setSeconds(59);
            setminutes(minutes - 1);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minutes, seconds, isActive, pause]);

  const handleTimerEnd = () => {
    if (isWorkSession) {
      setCycles(cycles + 1);
      if (cycles > 0 && cycles % 4 === 0) {
        setSession("Long Break!");
        setminutes(LONGBREAK.minutes);
        setSeconds(LONGBREAK.seconds);
      } else {
        setSession("Short Break!");
        setminutes(SMALLBREAK.minutes);
        setSeconds(SMALLBREAK.seconds);
      }
    } else {
      setSession("Work!");
      setminutes(WORK.minutes);
      setSeconds(WORK.seconds);
    }
    // setSeconds(0);
    setIsWorkSession(!isWorkSession);
    setIsActive(false);
  };

  return (
    <>
      <main className="flex flex-col gap-10 items-center justify-center min-h-screen">
        <h1 className="font-semibold text-2xl">{session}</h1>
        <h1 className=" font-bold text-8xl">
          {minutes}:
          {seconds === 0
            ? seconds + "0"
            : seconds < 10
            ? "0" + seconds
            : seconds}
        </h1>
        <div className="flex gap-8">
          {!isActive ? (
            <Button
              onClick={() => {
                setIsActive(!isActive);
              }}
              type="button">
              Start
            </Button>
          ) : (
            <Button
              onClick={() => {
                setPause(!pause);
              }}
              variant="outline"
              type="button">
              {pause ? "Resume" : "Pause"}
            </Button>
          )}
          <Button
            onClick={() => {
              setminutes(WORK.minutes);
              setSeconds(WORK.seconds);
              setIsActive(false);
              setIsWorkSession(true);
            }}
            variant="destructive"
            type="button">
            Reset
          </Button>
        </div>
      </main>
      {!isActive ? (
        <Alert className="w-[400px] absolute bottom-10 right-5">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{!isActive ? "Click Start" : "Timer Ended"}</AlertTitle>
          <AlertDescription>
            {!isActive
              ? `Your timer is set to ${minutes} minutes${
                  seconds !== 0 ? ` and ${seconds} seconds.` : `.`
                }`
              : "Hooray!"}
          </AlertDescription>
        </Alert>
      ) : null}
      {/* {isWorkSession ? <h1>Work</h1> : <h1>Break</h1>} */}
    </>
  );
};

export default App;
