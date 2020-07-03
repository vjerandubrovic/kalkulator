//

//

//
var size = 10;

var brojevi = [''];

var operatori = [];

var rezultat = 0;

var unosBr = document.querySelectorAll('#br');

var unosOpr = document.querySelectorAll('#opr');

var del = document.getElementById('del');

var AC = document.getElementById('ac');

var equal = document.getElementById('equal');

var screen1 = document.querySelector('#screen1');

var screen2 = document.querySelector('#screen2');

var reset = () =>{

    brojevi = [''];

    operatori = [];

    rezultat = 0;

    screen1.innerHTML = "";

    screen2.innerHTML = 0;

}
var delObj = () =>{
    let a;
    let b = brojevi[brojevi.length-1];
    
    if(b.length > 0){
        brojevi[brojevi.length-1] = b.slice(0, -1);
        a = screen1.innerHTML.slice(0, -1);
        screen1.innerHTML = a;
        console.log(brojevi);
        console.log(b);
    } else if(brojevi.length > 1){
        brojevi.pop();
        operatori.pop();
        a = screen1.innerHTML.slice(0, -5);
        screen1.innerHTML = a;
    } 

}

var calculate = (b,o) =>{
    
    let check = o.pop();    

    if (b.length == 1) {
        let i = b.pop();        
        return parseFloat(i);
    }
    else if(check == '+') {
        let i = b.pop();
        return calculate(b,o) + parseFloat(i);
    }
    else if(check == "-") {
        let i = b.pop();        
        return calculate(b,o) - parseFloat(i);
    }
    else if(check == "*") {        
        let i = b.pop();
        b[b.length-1] *= i;
        return calculate(b,o);
    }
    else if(check == "÷") {        
        let i = b.pop();
        b[b.length-1] /= i;
        return calculate(b,o);
    }    
};



unosBr.forEach(broj => {
    broj.addEventListener('click', (e) =>{
        let b = brojevi.length;
        if(brojevi[b - 1].length < size) brojevi[b - 1] += broj.innerHTML;
        screen1.innerHTML += broj.innerHTML;
    });
});

unosOpr.forEach(opr => {
    opr.addEventListener('click', (e) =>{
        let o = operatori.length;
        if(brojevi[0] == ""){
            brojevi[0] = "0";
            screen1.innerHTML = "0";
        }
        if(brojevi[o] == "") delObj();  
        operatori.push(opr.innerHTML);
        brojevi.push("");
        screen1.innerHTML += "<br>";
        screen1.innerHTML += opr.innerHTML;
    });
});

del.addEventListener('click', (e)=>{
    delObj();
});

AC.addEventListener('click', (e)=>{
    reset();
});

equal.addEventListener('click', (e)=>{ 
    let br = brojevi.slice();
    let ope = operatori.slice();   
    if(brojevi[0] == "") screen2.innerHTML = 0;
    else screen2.innerHTML = calculate(br,ope);
    //console.log(brojevi);
    //console.log(operatori);
})