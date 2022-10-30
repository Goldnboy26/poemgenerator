
 /////VARIABLES

var KBName=document.getElementById("KBName");
 var myQuestion=document.getElementById("myQuestion"); //input for Questions
  var Text1=document.getElementById("text1");    //TextBox for showing answers
   var Text2 = document.getElementById('Text2'); //textbox for saving to text file
    var Complete=document.getElementById("autocomplete"); //div
     var Backup = document.getElementById('Backup'); //button
       var QuestionL=[],AnswerL=[],OnQuestion=-1;
        var ScreenRatio=Math.ceil(window.devicePixelRatio);
         var ScreenHeight=Math.floor(window.innerHeight*ScreenRatio-6*ScreenRatio);
          var ScreenWidth=Math.floor(window.innerWidth*ScreenRatio);



Text1.style.width=Math.floor(ScreenWidth*.98)+"px";
myQuestion.style.width=Text1.style.width; myQuestion.style.maxWidth = "600px";
Complete.style.width=Text1.style.width;
Complete.style.maxWidth = "600px";
myQuestion.focus(); 
Text1.style.height=ScreenHeight*.5+"px";
Complete.style.position = "fixed";
var input = myQuestion;
input.addEventListener("keyup", function(event) { event.preventDefault(); if (event.keyCode === 13) AddNewQuestion(); });



function autocomplete(TxtInp, AutoLst,Lst2)  //(input object,array,array)
{
   var BestMatch=0,Matches=[];
   TxtInp.addEventListener("input", function(e) { //Runs when user writes in the text field.
      var Div1, Div2, val = this.value;
      Text1.value="";
      closeAllLists(); //close open lists
      if (!val) { Text1.placeholder="Answer will appear here.";return false;}
      Text1.placeholder=""; //so do not see placeholder under auto complete text
      Div1 = document.createElement("DIV"); //create Div to contain values
      Div1.setAttribute("id", this.id + "autocomplete-list");
      Div1.setAttribute("class", "autocomplete-items");      
      this.parentNode.appendChild(Div1); //add DIV child of autocomplete element
      var Srt=SortMatches(AutoLst,Lst2,val);
      BestMatch=Srt[0];Matches=Srt[1];
      for (var i = 0; i < AutoLst.length; i++) {       //main loop
         //step 1. break AutoLst[i] & val into words
         var Q=AutoLst[i]; //Q from questions list, U users question
         var Q2="",U=val,U2="",Max=15;
         for(var loo=0;loo<Q.length-1;loo++) {Q2=Q2+Q[loo];} 
         Q2 = Q2.replace(/,/g, ", ");Q2 = Q2.replace(/ +/g, " "); //make sure space after comma & remove extra spaces
         Q3 = Q2.replace(/,/g, "");  //remove commas from Q3
         var Qwords = Q3.split(" "); //turn sentence into array of words
         var Qwords2 = Q2.split(" "); //turn sentence into array of words
         for(var loo=0;loo<U.length;loo++) if(U[loo]!="?" & U[loo]!=".") {U2=U2+U[loo].toLowerCase()}
         U3 = U2.replace(/,/g, " ");U3 = U3.replace(/ +/g, " "); //remove commas & extra spaces
         var Uwords = U3.split(" ");  //Seperate users sentence into words
         for(var j=0;j<Uwords.length;j++) Uwords[j]=Uwords[j].toLowerCase();
         MatchCount=Matches[i]; //values from sorting       
         if (MatchCount>0 & i<Max) {  //could use  MatchCount==BestMatch
            Div2 = document.createElement("DIV");             //Make Div element for each match
            for(var L=0;L<Qwords.length;L++) // make matching words bold 
            { 
               if(Uwords.indexOf(Qwords[L].toLowerCase())>-1) if(L<Qwords.length-1) { if( Qwords2[L].indexOf(",")==-1) { Div2.innerHTML+="<strong>"+Qwords2[L]+" </strong>"; } else Div2.innerHTML+="<strong>"+Qwords2[L].substring(0, Qwords2[L].length-1)+"</strong>, ";  } else {Div2.innerHTML+="<strong>"+Qwords2[L]+"</strong>?";}
               else if(L<Qwords.length-1) {Div2.innerHTML+=Qwords2[L]+" ";} else Div2.innerHTML+=Qwords2[L]+"?";
            }
            Div2.innerHTML += "<input type='hidden' value='" + AutoLst[i] + "'>"; //holds current array's value
            Div2.addEventListener("click", function(e) { //run when Div element is clicked
              TxtInp.value = this.getElementsByTagName("input")[0].value;   
              closeAllLists(); //close  autocomplete values,
              GetAnswer();
            });
            Div1.appendChild(Div2); //adds div2 to Div1
         }
     
      } //end of loop
   }); //end of TxtInp.addEventListener
  TxtInp.addEventListener("keydown", function(e) {
     //could add arrow keys
      if(e.keyCode == 13) { //enter key
        e.preventDefault();
         closeAllLists();
      }
  });
  


  function closeAllLists(elmnt) { 
    var ACI = document.getElementsByClassName("autocomplete-items"); //close autocomplete lists
    for (var i = 0; i < ACI.length; i++) ACI[i].parentNode.removeChild(ACI[i]); 
  }
  document.addEventListener("click", function (e) { //when click on page.
      closeAllLists(e.target);
  });
}



////Functions autocomplete needs

function SortMatches(AutoLst,Lst2,val)
{
   var BestMatch=0,Matches=[],Srt=[];
   //Count number of matches   
   for(var i=0;i<AutoLst.length;i++) //loop through all the possible questions
   {  //Q from question list, U from user's question
      Matches[i]=0;
      var Q=AutoLst[i],Q2="",U=val,U2="";
      Q2 = Q.replace(/\?/g,""); //remove ?
      Q2 = Q2.replace(/,/g," "); //replace commas with space.
      Q2 = Q2.replace(/ +/g, " "); //remove double spaces
      var Qwords = Q2.split(" "); //turn string into an array
      U2 = U.replace(/\?|\./g," "); // replace ? & . Need \ before speicial characters
      U2 = U2.replace(/,/g," "); // replace commas
      U2 = U2.replace(/ +/g, " "); //remove double spaces
      if(U2[U2.length-1]==" " & i==0) { U2=U2.slice(0, -1);} //if last is space remove it
      var Uwords = U2.split(" ");
      for(var j=0;j<Uwords.length;j++)
         for(var loo=0;loo<Qwords.length;loo++) if(Uwords[j].toUpperCase()==Qwords[loo].toUpperCase()) {Matches[i]++;break;}      
   } //end of i loop




   //Sort according to Matches
   for(var j=0;j<AutoLst.length-1;j++) //loop through all question words
      for(var i=0;i<AutoLst.length-1;i++) //loop through words user entered
      {
         if(Matches[i]>BestMatch) BestMatch=Matches[i];
         if(Matches[i]<Matches[i+1])
         {
            var AutoLstT=AutoLst[i];AutoLst[i]=AutoLst[i+1];AutoLst[i+1]=AutoLstT; //switch questions
            var Lst2T=Lst2[i];Lst2[i]=Lst2[i+1];Lst2[i+1]=Lst2T;   //switch answers
            var MatchesT=Matches[i];Matches[i]=Matches[i+1];Matches[i+1]=MatchesT; //switch matches
         }
   }
   Srt[0]=BestMatch;Srt[1]=Matches;
   return Srt;
}



function LowerArray() //make Question Array all lower case
{
  var LowerQuestions=[];
  for(var i=0;i<QuestionL.length;i++) LowerQuestions[i]=QuestionL[i].toLowerCase();
  return LowerQuestions; 
}



function FilterQuestion(TempValue,Mark) //pass value when not using Question input, Mark true to add Question mark
{
  var CanChange=false;
  if(TempValue==undefined || TempValue==null) {TempValue=myQuestion.value;CanChange=true;}
   var value=""
  TempValue = TempValue.replace(/ +/g, " "); //replace double spaces with single spaces
if(TempValue.length==0) {return value;}
   for(var i=0;i<TempValue.length;i++) if(TempValue[i]!="." & TempValue[i]!=":" & TempValue[i]!=";") value=value+TempValue[i]; 
    if(value[value.length-1]!="?" & Mark!=false) {value=value+"?";}
     value = value.replace(/ \?/g,"?"); //handle blank space at end of question
       if(value.length>0) value=value[0].toUpperCase()+value.substring(1, value.length); //make sure 1st letter of question is capitalized
         if(CanChange & value.length>5) { myQuestion.value=value; } //change question asked to match filter
return value;


}
function FilterAllQuestions() {  for(var i=0;i<QuestionL.length;i++) 
   QuestionL[i]=FilterQuestion(QuestionL[i]); }
   function AddNewQuestion(K)
{

  var value=FilterQuestion();if(value.length<6)  {return;}
  FilterAllQuestions(); //double check to make sure questions asked match new question format
  
  OnQuestion= FindQ()
  if(OnQuestion>-1) GetAnswer(); //Asked before
  else {OnQuestion=QuestionL.length;QuestionL[QuestionL.length]=value;AnswerL[AnswerL.length]="";if(K!=true) Text1.value="";if(K!=true) SaveQuestions("AddNewQuestion"); } //new
}


function GetAnswer() //display answer to the question if there is one
{
  OnQuestion=FindQ(); 
  if(OnQuestion>-1) { if(AnswerL[OnQuestion]==undefined || AnswerL[OnQuestion]==null) AnswerL[OnQuestion]=""; Text1.value=AnswerL[OnQuestion];}
  else {Text1.value="";OnQuestion=QuestionL.length; AddNewQuestion(); }
}


function FindQ(Q) //look for index of question
{
   var CanChange=false;
   if(Q==undefined) {Q=myQuestion.value;CanChange=true;}
   Q=FilterQuestion(Q);
   if(CanChange) myQuestion.value=Q;
   var InputLower=Q.toLowerCase();
   var LowerQuestions=LowerArray(QuestionL);
   var index=LowerQuestions.indexOf(InputLower);
   return index;
}


function SetAnswer() //when user answers a question
{
  if(myQuestion.value.length<6) return; //return if question length is too short
  OnQuestion=FindQ();
  if(OnQuestion<0) AddNewQuestion(true);
  else {var value=FilterQuestion(); QuestionL[OnQuestion]=value;AnswerL[OnQuestion]=Text1.value;SaveQuestions("SetAnswer");}
}

/////////Save & Load Local
function SaveQuestions(Where)
{
   for(var i=0;i<AnswerL.length;i++) if(AnswerL[i]==undefined) {AnswerL[i]="";alert("Found undefined");}  //make sure no undefined answers
   FilterAllQuestions(); //make sure Question has ? at the end of it
   var Answers2="",Questions2="";
   //add ~~ as a sperator
   for(var i=0;i<QuestionL.length;i++) if(i<QuestionL.length-1) Questions2=Questions2+""+QuestionL[i]+"~~"; else Questions2=Questions2+""+QuestionL[i]; 
   for(var i=0;i<AnswerL.length;i++) if(i<AnswerL.length-1) Answers2=Answers2+""+AnswerL[i]+"~~"; else Answers2=Answers2+""+AnswerL[i];
   var Title=FilterQuestion(KBName.value,false);
   localStorage.setItem("mikesQuestions", Title+"~~"+Questions2);
   localStorage.setItem("mikesAnswers", Answers2); 
}


function LoadQuestions()
{
   var GQ,GA;
   if (localStorage.mikesAnswers) {GQ=localStorage.getItem("mikesQuestions");GA=localStorage.getItem("mikesAnswers");}
   else {QuestionL=[];AnswerL=[];return;}
   QuestionL=GQ.split("~~"); KBName.value=QuestionL[0]; //Title;
   QuestionL.splice(0,1); //remove the title
   AnswerL=GA.split("~~"); //separate text into an array
}


///////Save & Load to text files
   var textFile = null;
   function makeTextFile(text) //makes a url with the data so it can be downloaded
   {
      var data = new Blob([text], {type: 'text/plain'});
      if (textFile !== null)  window.URL.revokeObjectURL(textFile);  //If replacing previous revoke to free memory   
      textFile = window.URL.createObjectURL(data);
      return textFile; //needs this for download button click to work
   }; 


   Backup.addEventListener('click', function () { //When click 'Backup' button 
      var link = document.getElementById('downloadlink');
      var Title=FilterQuestion(KBName.value,false);
      var Questions2="",Answers2="";
      for(var i=0;i<QuestionL.length;i++) Questions2=Questions2+QuestionL[i]+"~~";
      for(var i=0;i<AnswerL.length;i++) if(i<AnswerL.length-2) Answers2=Answers2+AnswerL[i]+"~~"; else Answers2=Answers2+AnswerL[i];
      Text2.value=Title+"~~"+QuestionL.length+"~~"+Questions2+Answers2; 
      link.href = makeTextFile(Text2.value); //if want to see add link.style.display = 'block';
      link.click();  //so user does not need to click.
   }, false);



function openFile(event) {  //When click 'Restore'
   var input = event.target;
   var reader = new FileReader();
   reader.onload = function()
   {
      if(document.getElementById("getFile").value=="") return;
      var text = reader.result;
      var textArray=text.split("~~"); //turn text into an array
      KBName.value=textArray[0];  
      NumberOfQuestions=parseInt(textArray[1]); //change from string to number
      QuestionL=textArray.slice(2, NumberOfQuestions+2);
      AnswerL=textArray.slice(NumberOfQuestions+2);
      autocomplete(myQuestion, QuestionL,AnswerL); //call again so updates autocomplete
      SaveQuestions("from loaded text restoring"); //write over the previous local questions
      document.getElementById("getFile").value=""; //so it can load the same file twice
   };
   reader.readAsText(input.files[0]);
};
  

 ////Functions to Remove Questions
function RemoveQuestion() //when user chooses to remove an answer from local
{
   OnQuestion = FindQ();
   if (OnQuestion > -1) {
      QuestionL.splice(OnQuestion, 1);
      AnswerL.splice(OnQuestion, 1);
      myQuestion.value="";
      Text1.value="";
      SaveQuestions("RemoveQuestion")
      autocomplete(myQuestion, QuestionL,AnswerL);
   }
}


function RemoveQuestions() //only removes local, txt files need to be deleted by user
{
   if(confirm("Clear all questions & answers.") )
   {
      localStorage.removeItem('mikesQuestions'); 
      localStorage.removeItem('mikesAnswers'); 
      myQuestion.value="";Text1.value="";
      QuestionL=[];AnswerL=[]; 
      autocomplete(myQuestion, QuestionL,AnswerL);
   }
}



 /////Runs When Page Finishes Loading
function OnLoad() 
{
  LoadQuestions();
  autocomplete(myQuestion, QuestionL,AnswerL);
}

var datal=[
   "what is html?", "how do I love someone?", "anal sex painful?", "where can I get a blow job?",]
   localStorage.setItem("MyData", DataL);

   var GetData;
   if (localStorage.MyData)
   {
      GetData=localStorage.getItem("MyData");
      var count=0
      DataL=[];
      Data[Count]=""
      for (var i=0;i<GetData.length;i++) //read every character
      {
         if (GetData[i]=="," ) {Count++;DataL[Count]="";}
         else DataL [Count]=DataL [Count]+GetData[i];
      }
     }

