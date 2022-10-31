let btn= document.getElementById('btn');
let output = document.getElementById('output');
let quote =
     [
        "My dearest INFP, I love you more than words can express You are the light in my life that guides me to new and exciting places I am so grateful to have you in my life. Without you, I would be lost. You are the thinker to my doer, the yin to my yang. We balance each other out perfectly. I can't imagine my life without you. I love the way you're always up for anything, no matter how crazy it may be. I love your passion for life and your radiant smile. I love the way you always see the best in people, even when they don't deserve it. I love you, INFP, and I hope you know that. I want to spend the rest of my life with you, exploring the world and making our dreams come true. With all my love, ENFP", 
        
        "My dearest ISFJ Your kindness is like a warm embrace that I never want to let go of You have a way of making me feel so loved and cherished, like I am the most important person in the world to you. I love the way you are always there for me, offering a shoulder to cry on or a listening ear when I need it. You have a heart of gold, and I am so grateful to have you in my life. I love the way you are always so thoughtful and considerate, always putting others first. You have a way of making everyone feel special and loved. I cherish the moments we share together, whether we are spending time just talking or doing something special together. I know that with you by my side, I can face anything life throws my way. I love you, ISFJ. Thank you for being my rock, my protector, and my best friend. I cherish you more than you could ever possibly know. Always, Your ISTP",

       "My dearest ISFJ, There are no words that can truly describe how much I love and adore you. You are everything that I could ever want in a partner and more. You are kind, caring, and selfless – always putting others before yourself. You have a heart of gold and a mind that is always seeking to understand others. You are the perfect balance of stability and adventure, and I am never bored when I am with you. I love the way you always know just what to say to make me feel better. I love how you are always there for me – no matter what I am going through. I love how you never give up on me, even when I am being difficult. I love everything about you, and I cannot imagine my life without you. Thank you for being my rock, my protector, and my best friend. I love you from the bottom of my heart, and I will always be there for you – no matter what. With all my love, ESTP", 
    
     ];

     btn.addEventListener('click', function(){
         var inorderQuote = quote [Math.floor(Math.random() *quote.length)]
         output.innerHTML = inorderQuote;
     })
