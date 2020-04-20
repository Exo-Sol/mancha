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

/////////////// cut array regarding Pon
/////
////
///
// makes array of objects for seven days at time
function weekChart(allData) {
  let curArr = [],
    arr = [];

  allData.forEach((ele, ind) => {
    curArr.push(ele);
    if (ind % 6 === 0 && ind !== 0) {
      arr.push(curArr);
      console.log(arr);
      curArr = [];
    }
    // do {
    //   console.log(ele);
    // } while (ele.diW != "Pon");
  });
  if (curArr.length > 0) {
    arr.push(curArr);
  }
  return arr;
}
let weekArr = weekChart(byDate);

//
/////
///////
//////////////
///////////////////////
//////////////////////////////

/////////////////////////////////Make chart by days of month
for (let i = 0; i < weekArr.length; i++) {
  doomForChart(i);
  getMakeChart(weekArr[i], i);
}
// getMakeChart(byDate);
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////CHART BY MONTH ///////////////////////////////////////////
function getMakeChart(item, idN) {
  // array of tot mancha, time pairs
  var times = [],
    mTotcur = [],
    mTot = [],
    reducer,
    x,
    y;
  item.forEach((ele, ind1) => {
    ele.mancha.forEach((ele) => {
      reducer = (acc, cur) => acc + cur;
      x = ele.reduce(reducer);

      mTotcur.push(x);
    });
    y = mTotcur.reduce(reducer);
    mTot.push(y);
    mTotcur = [];
  });

  item.forEach((ele) => {
    times.push([ele.diW, ele.date]);
  });

  document.querySelector(".containerCart").style.display = "block";
  document.getElementById("myChart").style.display = "none";

  let myChart = document.getElementById(`myChart${idN}`).getContext("2d");

  var infoChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: times,
      datasets: [
        {
          maxBarThickness: 60,
          label: "Mancha day of month",

          data: mTot,
          backgroundColor: getColor(),
          borderWidth: 2,
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
              fontColor: "#ecd540", // this here
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "#45cea2",
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
////// Doom ffor new chart

function doomForChart(idN) {
  let buildArea = document.querySelector(".containerCart");
  let chartHolder = document.createElement("canvas");
  let lBreak = document.createElement("br");
  chartHolder.setAttribute("id", `myChart${idN}`);
  chartHolder.appendChild(lBreak);
  chartHolder.appendChild(lBreak);

  buildArea.appendChild(chartHolder);
}

////////////////////////////////////////////////////
///////////////Diff color for new chart
function getColor() {
  colors = [
    "#5d8aa8",
    "#efdecd",
    "#9966cc",
    "#7fffd4",
    "#ff4f00",
    "#f8de7e",
    "#20b2aa",
    "#e62020",
    "#e9d66b",
    "#007fff",
    "#ffe135",
    "#a2a2d0",
    "#006a4e",
    "#cd7f32",
    "#b666d2",
    "#ff6e4a",
    "#9932cc",
    "#872657",
    "#483d8b",
    "#003399",
    "#93c572",
    "#b0e0e6",
    "#fc74fd",
    "#ffb347",
    "#78184a",
    "#ae0c00",
    "#e2062c",
    "#cf1020",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
///////////////////////////////////////////////////////
////////////////////// Get month from keys function

// function keyMonths() {
//   for (var key in storage) {
//     let dateSplitter = key.split(".");
//     if (dateSplitter.length > 1) {
//       console.log(dateSplitter);
//       var months = new Set();
//       months.add(dateSplitter[1]);
//     }
//   }
//   return months;
// }

// /// Doom for choosing a month
// function monthDoom(keyM) {
//   let container = document.querySelector("#months");
//   for (let item of keyM) {
//     let newSpan = document.createElement("span");
//     newSpan.setAttribute("id", item);

//     newSpan.innerText = `Month : ${item}`;
//     container.appendChild(newSpan);
//   }
// }

// monthDoom(keyMonths());
//////////////////////////////////////////////////////
/// Calculate complete data
