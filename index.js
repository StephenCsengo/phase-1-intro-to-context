//Create a record object from an array
function createEmployeeRecord(arr) {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}
//Create an array of record objects from an array of record arrays
function createEmployeeRecords(empData) {
    //Create array to hold record objects
    const empRecords = empData.map(createEmployeeRecord);
    //Return array of record objects
    return empRecords;
}
//Add a TimeIn object to a record object
function createTimeInEvent(empObj, dateStamp) {
    //Split string into date and time
    const dateTime = dateStamp.split(" ");
    //Create an object holding the type, time, and date
    const dateTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    };
    //Add object to timeInEvents array of record object
    empObj.timeInEvents.push(dateTimeIn);
    //Return the modified record object
    return empObj;
}
//Add a TimeOut object to a record object
function createTimeOutEvent(empObj, dateStamp) {
    //Split string into date and time
    const dateTime = dateStamp.split(" ");
    //Create an object holding the type, time, and date
    const dateTimeOut = {
        type: "TimeOut",
        hour: Number(dateTime[1]),
        date: dateTime[0]
    };
    //Add object to timeOutEvents array of record object
    empObj.timeOutEvents.push(dateTimeOut);
    //Return the modified record object
    return empObj;
}
//Find the number of hours worked on a specific date
function hoursWorkedOnDate(empObj, date) {
    let timeIn = empObj.timeInEvents.find(day => day.date === date).hour;
    let timeOut = empObj.timeOutEvents.find(day => day.date === date).hour;
    const hoursWorked = (timeOut - timeIn)/100;
    return hoursWorked;
}
//Calculate the wages earned on a specific date
function wagesEarnedOnDate(empObj, date) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, date);
}
//Calculate the wages for all dates in a record object
function allWagesFor(empObj) {
    //Map dates to a new array
    const workDays = empObj.timeInEvents.map(day => day.date);
    //Map calculated wages to a new array
    const wage = workDays.map(day => wagesEarnedOnDate(empObj, day));
    //Sum all wages in the array
    let allWages = wage.reduce((totalWages, el) => el + totalWages);
    return allWages;
}
//Calculate payroll for an array of record objects
function calculatePayroll(empObjs) {
    //Map calculated wages into a new array
    const wages = empObjs.map(record => allWagesFor(record));
    //Add together each element of the wages array
    let payroll = wages.reduce((totalWages, el) => el + totalWages);
    return payroll;
}