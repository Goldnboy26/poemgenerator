let btn= document.getElementById('btn');
let output = document.getElementById('output');
let quote =
     [

      "any of you guys want a blow job?"









     ];

     btn.addEventListener('click', function(){
         var randomQuote = quote [Math.floor(Math.random() *quote.length)]
         output.innerHTML = randomQuote;
     })
