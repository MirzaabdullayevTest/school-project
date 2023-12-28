function convertToMinutes(time){
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
}

function convertToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}

module.exports = function generateTable(schedule){
    const table = []

    const schoolOverTimeInMinutes = convertToMinutes(schedule.endTime)
    let startTimeInMinutes = convertToMinutes(schedule.startTime)
    let number = 1

    while(schoolOverTimeInMinutes > startTimeInMinutes){
        let startTime = convertToHHMM(startTimeInMinutes)
        let endTimeInMinutes = startTimeInMinutes + parseInt(schedule.duration)
        let endTime = convertToHHMM(endTimeInMinutes)
        let breakTime = parseInt(schedule.breakTime)

        if(number === parseInt(schedule.bigBreakAfterLesson)){
            breakTime = parseInt(schedule.bigBreakTime)
        }

        let lesson = {
            number,
            startTime,
            endTime,
            breakTime
        }

        table.push(lesson)

        startTimeInMinutes = endTimeInMinutes + breakTime
        number++
        breakTime = parseInt(schedule.breakTime)
    }

    return table
}