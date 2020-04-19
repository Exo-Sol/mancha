const secondPage = 3;
///////////////DATA///////////////////////////////////////// DATA
let completeData = [],
  data,
  dateKey,
  weekDay;

let storage = window.localStorage;

for (var key in storage) {
  if (storage.hasOwnProperty(key)) {
    dateKey = parseFloat(key);
    weekDay = dayofWeek(key);

    data = JSON.parse(storage[key]);

    data.date = dateKey;
    // day in week
    data.diW = weekDay;
    console.log(data);
    completeData.push(data);

    //console.log(key + " -> " + storage[key]);
  }
}

console.log(completeData);

var byDate = completeData.slice(0);
byDate.sort(function (a, b) {
  return a.date - b.date;
});
console.log("by date:");
console.log(byDate);
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////CHART BY MONTH ///////////////////////////////////////////

//////////////////////////////////////////// function for day of week

function dayofWeek(date) {
  let dateSplitter = date.split(".");

  let dayTarget = dateSplitter[0];
  let monthTarget = dateSplitter[1];

  //hardcode for 2019
  var d = new Date(2019, monthTarget, dayTarget);
  var n = d.getDay();
  const weekDays = ["Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"];

  return weekDays[n];
}
///////////////////////////////////////////////////////////////
