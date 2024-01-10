export const formatMMSS = (date: number) => {
    const hours = Math.floor(date / 3600000);
    const minutes = Math.floor((date - hours * 3600000) / 60000);
    const seconds = Math.floor((date - hours * 3600000 - minutes * 60000) / 1000);

    let ret = "";
    if(hours > 0){
        ret += (hours < 10 ? "0" : "") + hours + ":";
    }
    ret += (minutes < 10 ? "0" : "") + minutes + ":";
    ret += (seconds < 10 ? "0" : "") + seconds;

    return ret;
}

// returns "{x}h {y}m"
export const formatAsStr = (date: number) => {
    const d = new Date(date);

    var ret = "";
    const hours = d.getHours() - 1;
    if(hours > 0){
        ret += hours + "h ";
    }

    ret += d.getMinutes() + "m";

    return ret;
}