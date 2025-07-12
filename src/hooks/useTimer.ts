import { useEffect, useState } from "react";
import { TimerSettings, TimerState } from "../types/timer";

const defaultSettings: TimerSettings = {
  work: 25,
  short: 5,
  long: 15,
  autoStart: false,
  showSessions: false,
};

export const useTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [timerState, setTimerState] = useState<TimerState>({
    minutes: defaultSettings.work,
    seconds: 0,
    isActive: false,
    pause: false,
    isWorkSession: true,
    cycles: 0,
    session: "Time to Focus!",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timerState.isActive && !timerState.pause) {
      interval = setInterval(() => {
        setTimerState((prev) => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              return handleTimerEnd(prev, settings);
            } else {
              return {
                ...prev,
                seconds: 59,
                minutes: prev.minutes - 1,
              };
            }
          } else {
            return {
              ...prev,
              seconds: prev.seconds - 1,
            };
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, timerState.pause, settings]);

  const handleTimerEnd = (
    prev: TimerState,
    currentSettings: TimerSettings
  ): TimerState => {
    if (prev.isWorkSession) {
      const newCycles = prev.cycles + 1;
      const isLongBreak = newCycles > 0 && newCycles % 4 === 0;

      return {
        ...prev,
        session: isLongBreak ? "Long Break!" : "Short Break!",
        minutes: isLongBreak ? currentSettings.long : currentSettings.short,
        seconds: 0,
        isWorkSession: false,
        cycles: newCycles,
        isActive: currentSettings.autoStart,
      };
    } else {
      return {
        ...prev,
        session: "Work!",
        minutes: currentSettings.work,
        seconds: 0,
        isWorkSession: true,
        isActive: currentSettings.autoStart,
      };
    }
  };

  const startTimer = () => {
    setTimerState((prev) => ({ ...prev, isActive: true }));
  };

  const pauseTimer = () => {
    setTimerState((prev) => ({ ...prev, pause: !prev.pause }));
  };

  const resetTimer = () => {
    setTimerState({
      minutes: settings.work,
      seconds: 0,
      isActive: false,
      pause: false,
      isWorkSession: true,
      cycles: 0,
      session: "Time to Focus!",
    });
  };

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    setTimerState((prev) => ({
      ...prev,
      minutes: newSettings.work,
      seconds: 0,
      isActive: false,
    }));
  };

  return {
    timerState,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
  };
};
