import {useEffect, useRef, useState } from 'react'

export function useTimer(initialSeconds:number = 900, onComplete?:() => void)
{
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const endTimeRef = useRef<number | null>(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete])

    // run this when isRunning = true
    useEffect(() => {
        // end if timer stop running (to prevent code from running when value change from true to false)
        if(isRunning == false)
        {
            return;
        }

        endTimeRef.current = Date.now() + timeLeft * 1000;

        // run every 100 ms to count remaining time
        const intervalId = window.setInterval(() => {

            // if no time remain (we reach 0) then end interval.
            if(endTimeRef.current === null)
            {
                return;
            }

            const remainingMilliseconds = endTimeRef.current - Date.now();

            // convert to second but prevent value from going under 0
            const remainingSeconds = Math.max(0, Math.ceil(remainingMilliseconds / 1000));

            setTimeLeft(remainingSeconds);

            // stop timer when remaining seconds reaches 0.
            if(remainingSeconds === 0)
            {
                setIsRunning(false);
                endTimeRef.current = null;
                if(onCompleteRef.current)
                {
                    onCompleteRef.current();
                }
            }
        }, 100);

        // cleanup function to clear interval when effect is done running.
        return () => {
            window.clearInterval(intervalId);
        };

    }, [isRunning]);


    // functions to control the timer:
    function start()
    {
        if(timeLeft <= 0 || isRunning)
        {
            return;
        }

        setIsRunning(true);
    }

    function pause()
    {
        setIsRunning(false);
    }

    function reset(seconds:number = initialSeconds)
    {
        setIsRunning(false);
        endTimeRef.current = null;
        setTimeLeft(seconds);
    }

    function setTime(seconds:number)
    {
        setIsRunning(false);
        endTimeRef.current = null;
        setTimeLeft(Math.max(0, seconds));
    }

    let timer = { timeLeft, isRunning, start, pause, reset, setTime}

    return timer;
}