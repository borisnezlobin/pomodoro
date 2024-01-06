export const formatMMSS = (date: number) => {
    const d = new Date(date);
    var ret = "";
    if(d.getHours() > 0){
        ret += (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    }
    ret += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":";
    ret += (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

    return ret;
}

// returns "{x}h {y}m"
export const formatAsStr = (date: number) => {
    const d = new Date(date);

    var ret = "";
    if(d.getHours() > 0){
        ret += d.getHours() + "h ";
    }

    ret += d.getMinutes() + "m";

    return ret;
}