
let date = (currentDate) => {
    let year, month, day, h, min, container;
    
    year =  currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate();
    h = currentDate.getHours();
    min = currentDate.getMinutes();
    

    return {


        year : year,
        month : month,
        day : day,
        h : h,
        min : min

    }

};

// Todays date class that stores mancha

/*class ManchToday {
    constructor(dayMonth,manch,tot=0,avg=0,max=0) {
        this.dayMonth = dayMonth;
        this.manch = manch;
        this.tot = tot;
        this.avg = avg;
        this.max = max;

    }

}
*/
//Quaery selectors

//


// initializing date
 let x = date(new Date());

 console.log(x);