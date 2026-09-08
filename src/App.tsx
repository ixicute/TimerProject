import { useRef } from "react";
import "./App.css";

import Timer from "./components/Timer/Timer";
import TimerControls from "./components/TimerControls/TimerControls";
import TimeInput from "./components/TimeInput/TimeInput";
import FullscreenButton from "./components/FullscreenButton/FullscreenButton";
import { useTimer } from "./hooks/useTimer";

function App() {

  // TODO:
  // [] Add Alarm sound in public/sounds/
  // [] Make sure alarm can be stopped from UI after it starts playing!
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  function playAlarm() {
      if (!alarmRef.current) {
        alarmRef.current = new Audio(
          `${import.meta.env.BASE_URL}sounds/alarm.mp3`
        );
      }

      alarmRef.current.currentTime = 0;

      void alarmRef.current.play();
    }
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTime,
  } = useTimer(300, playAlarm);

  return (
    <main className="app">
      <TimeInput
        onSetTime={setTime}
        disabled={isRunning}
      />

      <Timer timeLeft={timeLeft} />

      <TimerControls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={() => reset()}
      />

      <FullscreenButton />
    </main>
  );
}

export default App;