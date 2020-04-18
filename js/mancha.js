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

///// Tura mancha CONSTRUCTOR ////////
class TuraMancha {
    constructor (tura,mancha,time){
        this.tura = tura;
        this.mancha = mancha;
        this.time = time;
    }

}
//////////////////////////////////////



// initializing date
let dateToday = date(new Date());
// initialize tura counter
let turaBrojac = 1;
/// set local storage keyword
let dateTodayKey = dateToday.day + '.' +dateToday.month;
console.log(dateTodayKey);
// set time now
let timeNow = [dateToday.h, dateToday.min];
// saving to current Mancha
let currentMancha = [];
// comma change MMOde
let comSwitch = true;
// container for second mode when coins add for one entry
let curContainer = 0;
// for swipe navigation
const secondPage = 1;






////////////////////////////////// Quaery selectors
let appSelectors = {
    saveM : document.querySelector('#save'),
    deleteM : document.querySelector('#delete'),
    oneK : document.querySelector('#jedan'),
    twoK : document.querySelector('#dva'),
    fiveK : document.querySelector('#pet'),
    custom : document.querySelector('.drugo'),
    currentM : document.querySelector('#current'),
    saveC : document.querySelector('#saveCustom'),
    prikaz : document.querySelector('.doSad'),
    tot :  document.querySelector('#total'),
    avg :  document.querySelector('#avg'),
    top :  document.querySelector('#top'),
    clearDay : document.querySelector('#nukeDay'),
    changeMode : document.querySelector('#comma')
}
/////////////////////////////////////////////////
///////////////////////////////// Event LIsteners

appSelectors.oneK.addEventListener('click', () => {
    if (comSwitch) {
       curMPushNCheck(1);
       showCurrentM();
    }
    else {
        curContainer = calcMode2(1);
        
        
    } 
    
    
});

appSelectors.twoK.addEventListener('click', () => {
    if (comSwitch) {
        curMPushNCheck(2);
        showCurrentM();
     }
     else {
        curContainer = calcMode2(2);
        
     }
   
});

appSelectors.fiveK.addEventListener('click', () => {
    if (comSwitch) {
        curMPushNCheck(5);
        showCurrentM();
     }
     else {
        curContainer = calcMode2(5);
        
     }
    
});
appSelectors.saveM.addEventListener('click', () => {
        if (currentMancha.length > 0){
            mainSave(); 
           
           
           
            
        } 
});

appSelectors.saveC.addEventListener('click', ()=> {
    if (comSwitch) {
       let x = parseInt(appSelectors.custom.value);
       if (x) {
          currentMancha.push(x);
          showCurrentM();
          appSelectors.custom.value = '';
    }}
    
    else {
        // somwhere heare a bug  wen it adds 0
        if(curContainer > 0) {
           curMPushNCheck(curContainer);  
           showCurrentM();
           curContainer = 0;
        }
      }
    


    
});

appSelectors.deleteM.addEventListener('click', ()=> {
    currentMancha = [];
    appSelectors.currentM.textContent = '_ _ _ _ _';


});

appSelectors.clearDay.addEventListener('click',nukeDay);
    
function nukeDay() {
    if (confirm("You want to nuke your day?")) {
    localStorage.removeItem(dateTodayKey);
    currentMancha = [];
    turaBrojac = 1;
    appSelectors.custom.value = ''
    appSelectors.currentM.textContent = '_ _ _ _ _';
    appSelectors.tot.textContent = "Total: 0 kn";
    appSelectors.avg.textContent = "Avg: 0 kn";
    appSelectors.top.textContent = "Top: 0 kn";
    }
}
    


appSelectors.changeMode.addEventListener('click', (eve)=>{
     
    if (comSwitch) {
    appSelectors.changeMode.style.filter = 'invert(100)';
    comSwitch = false;
    } else {
        appSelectors.changeMode.style.filter = 'invert(0)';
        comSwitch = true;

    }
});




///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



function showCurrentM() {
    appSelectors.currentM.textContent = currentMancha; 
};

function curMPushNCheck(amount) {
    if (currentMancha.length < 5) {
       
        currentMancha.push(amount); 
    
    }
    else {
        mainSave();
       
    }
};

    function mainSave() {
        var retrivedItem = localStorage.getItem(dateTodayKey);

        var novaTura = new TuraMancha(turaBrojac,currentMancha,timeNow); 

        
        if (retrivedItem == null) {
            saveToLocal(novaTura);
           
        }else {
            retrivedItem = localStorage.getItem(dateTodayKey);
            adder(retrivedItem,novaTura);
            
        }
        appSelectors.currentM.textContent = '_ _ _ _ _';
       
       
        turaBrojac +=1;
        currentMancha = [];
        appSelectors.currentM.textContent = '_ _ _ _ _';
        calculate();
       

    };


    function saveToLocal(x) {
            
             let myObj = JSON.stringify(x);
             localStorage.setItem(dateTodayKey, myObj);
            currentMancha = [];
            appSelectors.currentM.textContent = '_ _ _ _ _';
            calculate();
           
            


     };


    //  function getFromLocal() {
    //     let myObj = JSON.parse(localStorage.getItem(dateTodayKey));
    //     return myObj;
    // };

    function adder(retrived,nova) {

        var retrivedObj, turaArr, manchaArr, timeArr,
        myObj;

        retrivedObj = JSON.parse(retrived);
        
        // ADDING TO TURA BROJAC
        if (Array.isArray(retrivedObj.tura) == false) {
            turaArr = [1]
            // add one ond two because first iteration dosent go trough this function
            turaArr.push(2);
           }
        else {
            turaArr = retrivedObj.tura;
            turaArr.push(turaArr.length + 1);
        }
        //turaArr.push(turaArr.length);
        
        // ADDING TO MANCHA
        manchaArr = retrivedObj.mancha;
        if (Array.isArray(manchaArr[0]) == false) {
            manchaArr = [manchaArr];
            
        } 
        manchaArr.push(nova.mancha);
        
        // ADDING TIME
        timeArr = retrivedObj.time
        if (Array.isArray(retrivedObj.time[0]) == false) {
            timeArr = [timeArr];
            
        }
       
        timeArr.push(nova.time);
        
        myObj = new TuraMancha(turaArr, manchaArr, timeArr); 
        saveToLocal(myObj);
        console.log(myObj);
       
    };


//////////////////////////////////////////// Calculate avg, top and  total of mancha //////////////////////////

function calculate() {
    var retrivedItem = JSON.parse(localStorage.getItem(dateTodayKey));
    var counterM = 0, counter = 0, max = 0;
    console.log(retrivedItem);

    if (Array.isArray(retrivedItem.mancha[0])) {
         
            retrivedItem.mancha.forEach(ele => {
                ele.forEach(ele => {
                    counterM += ele;
                    counter += 1;
                    if(ele >= max) {
                        max = ele;
                    }

                });
            });
    } else {
        
        retrivedItem.mancha.forEach((ele,ind) => { 
           
            counterM += parseInt(ele);
                    counter += 1;
                    if(ele >= max) {
                        max = ele;
                    }

        });
    }

    appSelectors.tot.textContent = `Total: ${counterM} kn`;
    appSelectors.avg.textContent = `Avg: ${(counterM/counter).toFixed(2)} kn`;
    appSelectors.top.textContent = `Top: ${max} kn`;

   

};

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// Mode 2 associated functions

function calcMode2 (kuna) {
    
    curContainer += kuna;
    appSelectors.currentM.textContent = curContainer;
    return curContainer;
    

    // appSelectors.saveC.addEventListener('click', ()=> {
    //     currentMancha.push(curContainer); 
    //     curContainer = 0;
    //     appSelectors.currentM.textContent = currentMancha;
    //     console.log(currentMancha);

}
// mora bit tu, nemici
calculate();


///// EXPORTS/////

