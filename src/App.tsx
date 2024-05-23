import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
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
import Activity from "./components/Activity";
import { ThemeProvider } from "./components/theme-provider";
import ModeToggle from "./components/modetoggle";
import { Settings } from "lucide-react";

const App = () => {
  const [defaultSettings, setDefaultSettings] = useState({
    work: 25,
    short: 5,
    long: 15,
    autoStart: false,
    showSessions: false,
  });
  const { toast } = useToast();
  const [userSettings, setUserSettings] = useState({ ...defaultSettings });

  const [minutes, setminutes] = useState(defaultSettings.work);
  const [seconds, setSeconds] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [pause, setPause] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [session, setSession] = useState("Time to Focus!");

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
      if (cycles > 0 && (cycles + 1) % 4 === 0) {
        setSession("Long Break!");
        setminutes(defaultSettings.long);
      } else {
        setSession("Short Break!");
        setminutes(defaultSettings.short);
      }
      setCycles(cycles + 1);
    } else {
      setSession("Work!");
      setminutes(defaultSettings.work);
    }
    setSeconds(0);
    setIsWorkSession(!isWorkSession);
    setIsActive(defaultSettings.autoStart);
  };

  const handleSave = () => {
    setIsActive(false);
    toast({
      description: "Settings saved Successfully.",
    });
    setminutes(userSettings.work);
    setDefaultSettings(userSettings);
    setSeconds(0);
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="flex flex-col gap-10 items-center justify-center min-h-screen dark:bg-slate-950 dark:text-white">
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
                setSession("Time to Focus!");
                setCycles(0);
              }}
              variant="destructive"
              type="button">
              Reset
            </Button>
          </div>
          <div className="absolute top-5  right-[170px] ">
            <ModeToggle />
          </div>
          <div className="absolute top-5 right-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Settings className="mt-[1.6px] mr-2 h-4 w-4" />{" "}
                  <p className=" text-[16px]">Configure</p>
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
                  <div className="grid gap-4">
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
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="autoswitch">
                        Auto-Start Next Session
                      </Label>
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
                    <div className="grid  grid-cols-2 items-center gap-4">
                      <Label htmlFor="sessioins">
                        Show Number of Sessions Completed
                      </Label>
                      <Switch
                        onCheckedChange={(e) => {
                          const isChecked = e;
                          setUserSettings((prev) => ({
                            ...prev,
                            showSessions: isChecked,
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
          {userSettings.showSessions ? (
            <div className="absolute bottom-9 left-4">
              <Activity sessions={cycles} />
            </div>
          ) : null}
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
