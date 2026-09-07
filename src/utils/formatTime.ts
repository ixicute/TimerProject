export function formatTime(totalSeconds:number):string 
{

    // Count amount of minutes from input and rounds it.
    const minutes = Math.floor(totalSeconds / 60);

    // Counts remaining seconds after full minutes are removed.
    const seconds = totalSeconds % 60;

    // format data into a string
    const formattedMinutes = `${String(minutes).padStart(2, "0")}`;
    const formattedSeconds = `${String(seconds).padStart(2, "0")}`;

    // returning results
    return `${formattedMinutes}:${formattedSeconds}`;
}