export interface TimerSettings {
  work: number;
  short: number;
  long: number;
  autoStart: boolean;
  showSessions: boolean;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  pause: boolean;
  isWorkSession: boolean;
  cycles: number;
  session: string;
}

export interface TimerActions {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (settings: TimerSettings) => void;
}
