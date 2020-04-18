const secondPage = 3;

let dates = [], manchas = [], tempMancha = [];


 let storage = window.localStorage;


 
for (var key in storage) {
    if (storage.hasOwnProperty(key)) {
        dates.push(key);
        console.log(key);
        
        let data = JSON.parse(storage[key]);
        console.log(data);
       
        //console.log(key + " -> " + storage[key]);
    }
}