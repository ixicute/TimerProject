import { formatTime } from "../../utils/formatTime";
import "./Timer.css";

type TimerProps = { timeLeft:number; };

export default function Timer({timeLeft}:TimerProps)
{
    return (
        <div className="timer">
            <span className="timer__display">
                {formatTime(timeLeft)}
            </span>
        </div>
    )
}