function calculate(itemPassed) {
  var counterM = 0,
    counter = 0,
    max = 0;
    timeArr = [];
    

  if (Array.isArray(itemPassed.mancha[0])) {
    itemPassed.mancha.forEach((ele) => {
      console.log(ele);
      ele.forEach((ele) => {
        counterM += ele;
        counter += 1;
        if (ele >= max) {
          max = ele;
        }
      });
    });
  } else {
    itemPassed.mancha.forEach((ele, ind) => {
      counterM += parseInt(ele);
      counter += 1;
      if (ele >= max) {
        max = ele;
      }
    });
  }

  let info = {
    total: counterM,
    avg: (counterM / counter).toFixed(2),
    top: max,
  };

  return info;
}

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

function getMakeChart(item) {
  // array of tot mancha, time pairs
  var times = [],
    mTot = [],
    reducer,
    x;

  item.mancha.forEach((ele, ind) => {
    reducer = (acc, cur) => acc + cur;
    x = ele.reduce(reducer);
    mTot.push(x);
  });

  item.time.forEach((ele) => {
    times.push(parseFloat(`${ele[0]}.${ele[1]}`));
  });

  document.querySelector(".containerCart").style.display = "block";
  document.getElementById("myChart").style.display = "block";

  let myChart = document.getElementById("myChart").getContext("2d");

  var infoChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "Mancha by hour",

          data: mTot,
          backgroundColor: "black",
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

// variable to  check witch page is it
// since calc will not be loaded in third page
const secondPage = 2;
