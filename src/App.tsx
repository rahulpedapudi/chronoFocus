import { Toaster } from "./components/ui/toaster";
import Activity from "./components/Activity";
import { ThemeProvider } from "./components/theme-provider";
import TimerDisplay from "./components/TimerDisplay";
import TimerControls from "./components/TimerControls";
import Header from "./components/Header";
import { useTimer } from "./hooks/useTimer";

const App = () => {
  const {
    timerState,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
  } = useTimer();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="flex flex-col gap-10 items-center justify-center min-h-screen dark:bg-slate-950 dark:text-white">
        <Header currentSettings={settings} onSaveSettings={updateSettings} />

        <TimerDisplay timerState={timerState} />

        <TimerControls
          timerState={timerState}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />

        <Toaster />

        {settings.showSessions && (
          <div className="absolute bottom-9 left-4">
            <Activity sessions={timerState.cycles} />
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default App;
