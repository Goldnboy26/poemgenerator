let btn= document.getElementById('btn');
let output = document.getElementById('output');
let quote =
     [

      "any of you guys want a blow job?"









     ];

     btn.addEventListener('click', function(){
         var randoomQuote = quote [Math.floor(Math.random() *quotes.length)]
         output.innerHTML = randomQuote;
     })
