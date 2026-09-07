import "./TimerControls.css";

type TimerControlsProps = {
    isRunning:boolean;
    onStart:() => void;
    onPause:() => void;
    onReset:() => void;
};

export default function TimerControls({isRunning, onStart, onPause, onReset}:TimerControlsProps)
{
    let startPauseButton:React.ReactNode;

    if(isRunning)
    {
        startPauseButton = <button onClick={onPause}>Pause</button>;
    }
    else
    {
        startPauseButton = <button onClick={onStart}>Start</button>;
    }

    return (
        <div className="timer-controls">
            {startPauseButton}
            <button onClick={onReset}>Reset</button>
        </div>
    )
}