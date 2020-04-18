////IMPORTS////



//////// Get Date  ////////////////

let date = (currentDate) => {
    let  month, day, h, min  ;
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate();
    h = currentDate.getHours();
    min = currentDate.getMinutes();
    

    return {

       
        month : month,
        day : day,
        h : h,
        min : min

    }

};


// initializing date
let dateToday = date(new Date());
let dateTodayKey = dateToday.day + '.' +dateToday.month;
console.log(dateTodayKey);


var retrivedItem = JSON.parse(localStorage.getItem(dateTodayKey));
console.log(retrivedItem);
//////////////////////////////////////////////////////////////////////
/////////////////////////DEL LAST////////////////////////////////////////////

document.querySelector('#delete-last').addEventListener('click', delLast);
var cleanDiv = document.getElementsByTagName("ul");

function delLast() {
    // to block delete when sibar is on
    if (on) {
      if(retrivedItem.tura.length >= 2) { 
        retrivedItem.tura.pop();
        retrivedItem.mancha.pop();
        retrivedItem.time.pop();
        let x = JSON.stringify(retrivedItem);
        localStorage.setItem(dateTodayKey, x);
        location.reload();
      
      }
      else {
        localStorage.removeItem(dateTodayKey);
        location.reload();
      }
    }
}





//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
function domJob(broj,mancha,time) {
    let newLi, spanBroj, spanMancha, spanTime,
     breakline;
     var spanMT,manchaTura = 0;

    newLi = document.createElement('li');
    //broj
    spanBroj = document.createElement('span');
    spanBroj.innerText = `${broj}.`;
    spanBroj.style.color = "white";
    spanBroj.style.paddingRight = "20px";
    //mancha
    spanMancha = document.createElement('span');
    spanMancha.innerText =` ${mancha}  ` ;
    spanMancha.style.color = "yellow";
    spanMancha.style.paddingRight = "15%";
    //time
    spanTime = document.createElement('span');
    spanTime.innerText = ` ${time[0]} : ${time[1]} `;
    spanTime.style.color = "red";

    breakline = document.createElement('br');

    //total for tura
    mancha.forEach((ele,num)=>{
        manchaTura += parseInt(mancha[num]);
    
        

    });
    
    spanMT = document.createElement('span');
    spanMT.innerText =` Tot:  ${manchaTura}__ ` ;
    spanMT.style.color = "#66ff00";
    spanMT.style.paddingLeft = "2%"



    
    

    
    newLi.style.textDecoration = "none";
    newLi.setAttribute("id", broj);

    let container = document.querySelector('.container').getElementsByTagName("ul")[0];

    container.appendChild(newLi);

    newLi.appendChild(breakline);
    newLi.appendChild(spanBroj);
    newLi.appendChild(spanMancha);
    newLi.appendChild(spanMT);
    newLi.appendChild(spanTime);


    
}

// prikaz

function show() {
    if (retrivedItem) {
        
    retrivedItem.tura.forEach( (ele)=> { 
        domJob(retrivedItem.tura[ele-1], retrivedItem.mancha[ele-1],
        retrivedItem.time[ele-1]);
    

         });
     }

}

show();

/////////////////////////////////////////////////////////////
////////////////// Shufle troughh days/////////////////////////////////
let arrowD = document.getElementById('arrow');
arrowD.addEventListener('click', makeDrop);
// switch
var on = true
function makeDrop() {
  
    
    let keys1 = Object.keys(localStorage).sort();
    let keys = keys1.map(x => parseFloat(x));
     keys = keys.sort((a, b) => a - b);
    console.log(keys);

    
if(on) {
    keys.forEach(ele=> {
        console.log('clicked');
        let newLi, spanDate;
    
        newLi = document.createElement('li');
        newLi.setAttribute("id", ele);
        
        //broj
        spanDate = document.createElement('span');
        spanDate.innerText = `${ele}`;
        spanDate.style.paddingRight = "7px";
        
        newLi.appendChild(spanDate);
        let x = document.getElementById('dropdown');
        x.appendChild(newLi);
        arrowD.style.color = "red";
        on = false
        /// removing delete when in dropdown
        document.getElementById('delete-last').style.display = "none";
    
    });
} else { //ajme
    let x = document.getElementById('dropdown');
    x.innerHTML = "";
    retrivedItem = JSON.parse(localStorage.getItem(dateTodayKey));
    document.querySelector('#conta').innerText= '';
    show();
    arrowD.style.color = "blue";
    on = true;
    //// getting back delete
    document.getElementById('delete-last').style.display = "block";
    document.getElementById('myChart').style.display = "none";

}

 ///////////////////////////////////////////////
 ///// clicking dates inside dropdown event(look up)

 document.querySelector("#dropdown").addEventListener("click", event=> {
      let targetDay = event.target.innerText;

      retrivedItem = JSON.parse(localStorage.getItem(targetDay));
      console.log(retrivedItem);
      document.querySelector('#conta').innerText= '';
      show();
      addInfo(retrivedItem,targetDay); 
      // tu bi trebala ic funkcija sa cartom ####
     
            getMakeChart (retrivedItem);

      
        // reset retrived item IMPORTANT
        retrivedItem = JSON.parse(localStorage.getItem(dateTodayKey));
    
    });

}

/////// Aditional information when diaplying diff dates from fun above

function addInfo (item, day) {
    let infos = calculate(item);
    dateToday = date(new Date());
    dateToday = dateToday.day + '.' +dateToday.month;
    // calling function of day in the 7day cycle
    const dayWeek = dayofWeek(day);
    
    let infoCont = document.querySelector('#conta');
    let dayTimeLi = document.createElement('li');
    let addInfoLi = document.createElement('li');
    let br =  document.createElement('br');

    if (day == dateTodayKey) {
        dayTimeLi.innerText = 'Today';
    
     } else {
        dayTimeLi.innerText = `Date: ${day} \n ${dayWeek}`;
    }
    dayTimeLi.style.marginTop = "20px";
    dayTimeLi.style.color = "#bcd4e6"
    addInfoLi.style.color = "#21abcd"

    
    addInfoLi.innerText = `Tot ${infos.total} \n Avg ${infos.avg} \nTop ${infos.top}`;
    infoCont.appendChild(dayTimeLi);
    infoCont.appendChild(br);
    infoCont.appendChild(addInfoLi);

}