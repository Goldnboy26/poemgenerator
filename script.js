let btn= document.getElementById('btn');
let output = document.getElementById('output');
let quote =
     [
        "My dearest INFP, I love you more than words can express You are the light in my life that guides me to new and exciting places I am so grateful to have you in my life. Without you, I would be lost. You are the thinker to my doer, the yin to my yang. We balance each other out perfectly. I can't imagine my life without you. I love the way you're always up for anything, no matter how crazy it may be. I love your passion for life and your radiant smile. I love the way you always see the best in people, even when they don't deserve it. I love you, INFP, and I hope you know that. I want to spend the rest of my life with you, exploring the world and making our dreams come true.   With all my love, ENFP" 
        









     ];

     btn.addEventListener('click', function(){
         var randomQuote = quote [Math.floor(Math.random() *quote.length)]
         output.innerHTML = randomQuote;
     })
