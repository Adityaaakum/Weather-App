const input_box=document.querySelector(".weather_input");
const weather_button=document.querySelector(".weather_button");
const weather_conatiner=document.querySelector(".weather-conatiner");
const user_temp=document.querySelector(".temprate-container");
const user_location=document.querySelector(".location");
const user_time=document.querySelector(".time");
const user_date=document.querySelector(".Date");
const emoji=document.querySelector(".emoji");
const user_condition=document.querySelector(".condition");
let jsonData;

document.addEventListener("DOMContentLoaded",function(){

    if(!navigator.geolocation){
        alert("Sorry We are not able to fetch your loaction pls try another browser!!")
    }
    else{
        navigator.geolocation.getCurrentPosition(async function(position){
            
           const lats= position.coords.latitude;
           const longs=position.coords.longitude;
           let key;
            // const data=await fetch('./Data.json');
            // jsonData= await data.json();
            // const openCage_Key=jsonData.OPENCAGE_KEY;
           const url_reverseGeoCoding=`http://api.opencagedata.com/geocode/v1/json?q=${lats}+${longs}&key=04b8bf38ae3a4aada794a14caff67747`;
            
           fetch(url_reverseGeoCoding).then(response=>response.json()).then(function(data){

            console.log(data);
            
           weathercall(`http://api.weatherapi.com/v1/current.json?key=d4b0ba4e6e04459d84e160426241507&q=${data.results[0].components.county}&aqi=no`);

           })

        })
    }
})

 function updateDOM(data){

    weather_conatiner.style.display="flex";
    emoji.setAttribute("src",data.emoji);
    user_condition.textContent=data.condition;
    user_location.textContent=data.user_location;
    user_time.textContent=data.user_time;
    user_date.textContent=data.user_date; 
    user_temp.textContent=data.user_temp;  

 }

 function weathercall(url){
    console.log(url);
    fetch(url).then(data=>data.json()).then(function(data){
        console.log(data);
        const icon=data.current.condition.icon;
        const weather_Condition=data.current.condition.text;
        const temp=data.current.temp_c;
        const location=data.location.name;
       const dateTime =data.location.localtime.split(" ");
        const date=dateTime[0];
        const time=dateTime[1];

        const weatherObj={
            emoji:icon,
            condition:weather_Condition,
            user_time:time,
            user_date:date,
            user_temp:temp+"°C",
            user_location:location

        }

        updateDOM(weatherObj);
    }).catch(err=>alert('Something went wrong! Check the Entered Location and try again!'));
 }

 weather_button.addEventListener("click",function(){

    if(input_box.value!=""){
        weathercall(`http://api.weatherapi.com/v1/current.json?key=d4b0ba4e6e04459d84e160426241507&q=${input_box.value}&aqi=no`);
    }
    input_box.value="";
 })