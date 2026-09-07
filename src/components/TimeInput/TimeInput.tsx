import { useState } from "react";
import "./TimeInput.css";

type TimeInputProps = {
    onSetTime:(seconds:number) => void;
    disabled?:boolean;
};

export default function TimeInput({onSetTime, disabled = false}:TimeInputProps)
{
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    function handleApply()
    {
        const totalSeconds = minutes * 60 + seconds;

        if(totalSeconds <= 0)
        {
            return;
        }

        onSetTime(totalSeconds);
    }

    return (
        <div className="time-input">
            <div className="time-input__field">
                <label htmlFor="minutes">Minutes</label>

                <input 
                    id="minutes" 
                    type="number" 
                    min="0" 
                    value={minutes} 
                    disabled={disabled} 
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setMinutes(Math.max(0, value))}
                    }
                />
            </div>

            <div className="time-input__field">
                <label htmlFor="seconds">Seconds</label>
                <input 
                    id="seconds" 
                    type="number" 
                    min="0"
                    max="59"
                    value={seconds} 
                    disabled={disabled} 
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setSeconds(Math.min(59, Math.max(0, value)))}
                    }
                />
            </div>

            <button type="button" onClick={handleApply} disabled={disabled}>Set Timer</button>
        </div>
    )
}