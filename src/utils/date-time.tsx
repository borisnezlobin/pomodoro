export const formatMMSS = (date: number) => {
    const d = new Date(date);
    var ret = "";
    const hours = d.getHours() - 1;
    if(hours > 0){
        ret += (hours < 10 ? "0" : "") + hours + ":";
    }
    ret += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":";
    ret += (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

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