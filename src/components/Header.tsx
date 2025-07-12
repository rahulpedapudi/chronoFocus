import ModeToggle from "./modetoggle";
import SettingsPanel from "./SettingsPanel";
import { TimerSettings } from "../types/timer";

interface HeaderProps {
  currentSettings: TimerSettings;
  onSaveSettings: (settings: TimerSettings) => void;
}

const Header = ({ currentSettings, onSaveSettings }: HeaderProps) => {
  return (
    <div className="absolute top-5 right-10 flex items-center gap-4">
      <ModeToggle />
      <SettingsPanel
        currentSettings={currentSettings}
        onSaveSettings={onSaveSettings}
      />
    </div>
  );
};

export default Header;
