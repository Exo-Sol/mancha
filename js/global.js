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
/////////////////////////////////Make chart by days of month
getMakeChart(byDate);
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////CHART BY MONTH ///////////////////////////////////////////
function getMakeChart(item) {
  console.log(item);
  // array of tot mancha, time pairs
  var times = [],
    mTotcur = [],
    mTot = [],
    reducer,
    x,
    y;
  item.forEach((ele, ind1) => {
    ele.mancha.forEach((ele) => {
      console.log(ele);
      reducer = (acc, cur) => acc + cur;
      x = ele.reduce(reducer);
      console.log(ind1);
      mTotcur.push(x);

      console.log(mTot);
      console.log("comma");
    });
    y = mTotcur.reduce(reducer);
    mTot.push(y);
    mTotcur = [];
  });

  item.forEach((ele) => {
    times.push([ele.diW, ele.date]);
  });

  console.log(mTot);
  console.log(times);
  document.querySelector(".containerCart").style.display = "block";
  document.getElementById("myChart").style.display = "block";

  let myChart = document.getElementById("myChart").getContext("2d");
  console.log(myChart);

  var infoChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: times,
      datasets: [
        {
          label: "Mancha day of month",

          data: mTot,
          backgroundColor: "#007aa5",
          borderWidth: 2,
          borderColor: "#007aa5",
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: "#687d8b", // this here
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "#21abcd",
            },
          },
        ],
      },
    },
  });
}

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
