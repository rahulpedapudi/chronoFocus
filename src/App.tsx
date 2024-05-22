import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

// import { Terminal } from "lucide-react";

const App = () => {
  const [defaultSettings, setDefaultSettings] = useState({
    work: 25,
    short: 5,
    long: 15,
    autoStart: false,
  });
  const { toast } = useToast();
  const [userSettings, setUserSettings] = useState({ ...defaultSettings });

  const [minutes, setminutes] = useState(defaultSettings.work);
  const [seconds, setSeconds] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [pause, setPause] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [session, setSession] = useState("Work!");

  useEffect(() => {
    // setminutes(userSettings.work);
    setDefaultSettings(userSettings);
    setSeconds(0);
    setPause(false);
  }, [userSettings]);

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
  }, [minutes, seconds, isActive, pause, session]);

  const handleTimerEnd = () => {
    if (isWorkSession) {
      setCycles(cycles + 1);
      if (cycles > 0 && cycles % 4 === 0) {
        setSession("Long Break!");
        setminutes(defaultSettings.long);
        // setSeconds(LONGBREAK.seconds);
      } else {
        setSession("Short Break!");
        setminutes(defaultSettings.short);
        // setSeconds(SMALLBREAK.seconds);
      }
    } else {
      setSession("Work!");
      setminutes(defaultSettings.work);
      // setSeconds(0);
    }
    setSeconds(0);
    setIsWorkSession(!isWorkSession);
    setIsActive(defaultSettings.autoStart);
  };

  const handleSave = () => {
    toast({
      description: "Settings saved Successfully.",
    });
    setminutes(userSettings.work);
    setDefaultSettings(userSettings);
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
              setminutes(userSettings.work);
              setSeconds(0);
              setIsActive(false);
              setIsWorkSession(true);
              setSession("Work!");
            }}
            variant="destructive"
            type="button">
            Reset
          </Button>
        </div>
        <div className="absolute top-5 right-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Change duration of the sessions
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="work">Work</Label>
                    <Input
                      onChange={(e) => {
                        const workDuration = Number(e.target.value);
                        setUserSettings((prev) => ({
                          ...prev,
                          work: workDuration,
                        }));
                      }}
                      id="work"
                      defaultValue={defaultSettings.work}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="s_break">Short Break</Label>
                    <Input
                      onChange={(e) => {
                        const sBreakDuration = Number(e.target.value);
                        setUserSettings((prev) => ({
                          ...prev,
                          short: sBreakDuration,
                        }));
                      }}
                      id="s_break"
                      defaultValue={defaultSettings.short}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="l-break">Long Break</Label>
                    <Input
                      onChange={(e) => {
                        const lBreakDuration = Number(e.target.value);
                        setUserSettings((prev) => ({
                          ...prev,
                          long: lBreakDuration,
                        }));
                      }}
                      id="l_break"
                      defaultValue={defaultSettings.long}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-flow-col items-center gap-4">
                    <Label htmlFor="autoswitch">Auto-Start Next Session</Label>
                    <Switch
                      onCheckedChange={(e) => {
                        const isChecked = e;
                        setUserSettings((prev) => ({
                          ...prev,
                          autoStart: isChecked,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid grid-flow-col items-center gap-4">
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Toaster />
        <Analytics />
      </main>

      {/* {!isActive ? (
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
      ) : null} */}
      {/* {isWorkSession ? <h1>Work</h1> : <h1>Break</h1>} */}
    </>
  );
};

export default App;
