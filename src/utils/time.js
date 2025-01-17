const time = {
    toPercent() {
        const date = new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
    
        const decimalHours =
            hours +
            minutes / 60 +
            seconds / 3600 +
            milliseconds / 3600000;
        
        return decimalHours / 24;
    },

    toDegrees() {
        return this.toPercent() * 360;
    },

    toRadians() {
        return this.toPercent() * Math.PI * 2;
    },

    angleToTime(angle) {
        const totalSeconds = (angle / (Math.PI * 2)) * 24 * 60 * 60;
      
        const hours = Math.floor(totalSeconds / 3600);
        const remainder = totalSeconds % 3600;
        const minutes = Math.floor(remainder / 60);
        const seconds = Math.floor(remainder % 60);
      
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0);
      
        return date;
    }
}

export default time;