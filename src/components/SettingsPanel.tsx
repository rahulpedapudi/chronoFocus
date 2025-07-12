import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { Settings } from "lucide-react";
import { TimerSettings } from "../types/timer";

interface SettingsPanelProps {
  currentSettings: TimerSettings;
  onSaveSettings: (settings: TimerSettings) => void;
}

const SettingsPanel = ({
  currentSettings,
  onSaveSettings,
}: SettingsPanelProps) => {
  const [userSettings, setUserSettings] =
    useState<TimerSettings>(currentSettings);
  const { toast } = useToast();

  const handleSave = () => {
    if (
      userSettings.work > 0 &&
      userSettings.long > 0 &&
      userSettings.short > 0
    ) {
      onSaveSettings(userSettings);
      toast({
        description: "Settings saved Successfully.",
      });
    } else if (
      userSettings.work === 0 ||
      userSettings.long === 0 ||
      userSettings.short === 0
    ) {
      toast({
        description: "Duration can't be zero!",
      });
    } else {
      toast({
        description: "Duration can't be negative!",
      });
    }
  };

  const updateSetting = (key: keyof TimerSettings, value: number | boolean) => {
    setUserSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Settings className="mt-[1.6px] mr-2 h-4 w-4" />
          <p className="text-[16px]">Configure</p>
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
                onChange={(e) => updateSetting("work", Number(e.target.value))}
                id="work"
                type="number"
                defaultValue={currentSettings.work}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="s_break">Short Break</Label>
              <Input
                onChange={(e) => updateSetting("short", Number(e.target.value))}
                id="s_break"
                type="number"
                defaultValue={currentSettings.short}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="l_break">Long Break</Label>
              <Input
                onChange={(e) => updateSetting("long", Number(e.target.value))}
                id="l_break"
                type="number"
                defaultValue={currentSettings.long}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="autoswitch">Auto-Start Next Session</Label>
              <Switch
                checked={userSettings.autoStart}
                onCheckedChange={(checked) =>
                  updateSetting("autoStart", checked)
                }
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="sessions">
                Show Number of Sessions Completed
              </Label>
              <Switch
                checked={userSettings.showSessions}
                onCheckedChange={(checked) =>
                  updateSetting("showSessions", checked)
                }
              />
            </div>
            <div className="grid grid-flow-col items-center gap-4">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPanel;
