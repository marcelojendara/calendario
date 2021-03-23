//calendar api : https://classes.engineering.wustl.edu/cse330/content/calendar.js
(function(){Date.prototype.deltaDays=function(c){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+c)};Date.prototype.getSunday=function(){return this.deltaDays(-1*this.getDay())}})();
function Week(c){this.sunday=c.getSunday();this.nextWeek=function(){return new Week(this.sunday.deltaDays(7))};this.prevWeek=function(){return new Week(this.sunday.deltaDays(-7))};this.contains=function(b){return this.sunday.valueOf()===b.getSunday().valueOf()};this.getDates=function(){for(var b=[],a=0;7>a;a++)b.push(this.sunday.deltaDays(a));return b}}
function Month(c,b){this.year=c;this.month=b;this.nextMonth=function(){return new Month(c+Math.floor((b+1)/12),(b+1)%12)};this.prevMonth=function(){return new Month(c+Math.floor((b-1)/12),(b+11)%12)};this.getDateObject=function(a){return new Date(this.year,this.month,a)};this.getWeeks=function(){var a=this.getDateObject(1),b=this.nextMonth().getDateObject(0),c=[],a=new Week(a);for(c.push(a);!a.contains(b);)a=a.nextWeek(),c.push(a);return c}};

//getting the today's date
let today = new Date();
let todayMonth = today.getMonth();
let todayYear = today.getFullYear();
let diaElegido = '';
var currentMonth = new Month(todayYear, todayMonth); 
//generates calendar table for the currentMonth
generateMonth();

//when next month button is pressed
document.getElementById("nextBtn").addEventListener("click", function(event){
    currentMonth = currentMonth.nextMonth(); 
    //document.getElementById('calendarTable').innerHTML="<thead><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednseday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr></thead>";
    generateMonth();
	
}, false);
//when previous month button is pressed
document.getElementById("prevBtn").addEventListener("click", function(event){
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    //document.getElementById('calendarTable').innerHTML="<thead><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednseday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr></thead>";
    generateMonth();
	
}, false);

//generates calendar table for the currentMonth
function generateMonth(){
    //let monthsArr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
    let monthsArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var weeks = currentMonth.getWeeks();
    document.getElementById('monthAndYear').innerHTML = monthsArr[currentMonth.month]+' '+currentMonth.year;
    document.getElementById('calendarTable').innerHTML="<thead><tr><th>Domingo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th></tr></thead>";
    
    $.get("datos/datos.php", { yyyy:currentMonth.year,mm:currentMonth.month })
    .done(function (datos) {
        data=datos.feriados       
        let i = 1;
        for(var w in weeks){
            var days = weeks[w].getDates();
            let tableRow = document.createElement("tr");
            tableRow.setAttribute('id','row'+i);
            i+=1;
            let week = document.getElementById('calendarTable').appendChild(tableRow);
            let nextMonthDays = document.createElement("th");
            for(var d in days){
                if(currentMonth.month == days[d].getMonth()){
                    dayId = days[d].getDate()+'';
                    vActual=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate()
                    vDiaMes=currentMonth.year*10000+(currentMonth.month+1)*100+parseInt(dayId)
                    debugger

                    vFeriado=feriado(dayId,data)
                    vTurnos=conTurno(dayId,datos.turnos)
                    if (vDiaMes>vActual){
                        if (days[d].getDay()==0 || days[d].getDay()==6){
                            if (vFeriado.length>0){                        
                                day = week.innerHTML+='<th class="day2" style="background-color: green;color:white;" id="'+dayId+'">'+ days[d].getDate()+'<hr />'+vFeriado+'</th>';   
                            } else {                     
                                day = week.innerHTML+='<th class="day2" id="'+dayId+'">'+ days[d].getDate() +'</th>';   
                            }

                        }   else {
                            if (vFeriado.length>0){                        
                                day = week.innerHTML+='<th class="day" style="background-color: green;color:white;" id="'+dayId+'">'+ days[d].getDate()+'<hr />'+vFeriado+'</th>';   
                            } else {
                                if (vTurnos>0){
                                    day = week.innerHTML+='<th class="day" id="'+dayId+'">'+ days[d].getDate() + '<br /> ('+vTurnos+' turnos.)</th>';       
                                } else {
                                    day = week.innerHTML+='<th class="day" id="'+dayId+'">'+ days[d].getDate() + '</th>';       
                                }
                                
                            }    
                        }                     
                        
                    } else {
                           if (vFeriado.length>0){                        
                            day = week.innerHTML+='<th class="day1" style="background-color: green;color:white;" id="'+dayId+'">'+ days[d].getDate()+'<hr />'+vFeriado+'</th>';   
                        } else {                     
                            day = week.innerHTML+='<th class="day1" id="'+dayId+'">'+ days[d].getDate()+'</th>';   
                        }
                    }
                    
                } 
                else{
                    day = week.innerHTML+='<th class="otherDay">'+ monthsArr[days[d].getMonth()]+' '+days[d].getDate()+'</th>';
                }
            }
        }
        var r1=document.getElementsByClassName("day")
        for (var j = 0; j < r1.length; j++) {
            
            r1[j].addEventListener("click", function(){

                /*if (this.getAttribute('style')!=="background-color:red"){
                     this.setAttribute('style','background-color:red')                    
                 } else {
                     this.setAttribute('style','background-color: green')
                 }*/
                  var vFecha = (currentMonth.month+1).toString()+'-'+this.id.toString()+'-'+currentMonth.year.toString()
                  diaElegido=vFecha
                  
                  document.getElementById('eventPopUp').hidden = false;
                  document.getElementById('editEvent').hidden = false;
                  
                });
        }

       });    
      
}

/*--------------------------------------------*/
function feriado(dayId,data){
    esta="";
    for(var d in data){
        if (parseInt(data[d].dd)==dayId){
            esta=data[d].Observacion

        }
    }
    return esta;
}
/*--------------------------------------------*/
//conTurno
/*--------------------------------------------*/
function conTurno(dayId,data){
    esta=0;
    for(var d in data){
        if (parseInt(data[d].dd)==dayId){
            esta=data[d].qty

        }
    }
    return esta;
}
/*--------------------------------------------*/

//when delete event button is pressed
document.getElementById('deleteEvent').addEventListener('click',deleteEventAjax,false);
document.getElementById('editEventBtn').addEventListener('click',editEventPopUp,false);
document.getElementById('changeEvent').addEventListener('click',editEventAjax,false);

function createEventAjax(event){
    const title = document.getElementById("eventTitle").value; // Get the username from the form
    //const date = document.getElementById("eventDate").value; // Get the password from the form
    //const time= document.getElementById("eventTime").value;
    // Make a URL-encoded string for passing POST data:
    
    const data = { 'title': title };

    fetch("includes/createEventHandler.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => data.success ? createEventDisplay() : alert(`Could not create event: ${data.message}`))
        .catch(err => alert("Error al crear usuario"));
}
//hides create event box and empties inputs. Then updates caledndar with new event
 function createEventDisplay(){
    document.getElementById("eventTitle").value='';
    document.getElementById('createEvent').hidden = true;
    userLoggedIn = true;
    generateMonth();
    
 }
 
//gets events that have that user_id
 function getEventsAjax(user_id){
    /*const data = {'user_id':user_id};

    fetch("includes/getEventHandler.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => data.success ? getEventDetails(data.events):console.log('no events available'))
    .catch(err => console.error(err));*/
 }
//gets the event details 
 function getEventDetails(events){
    events.forEach(event => {
       // addEvent(event.title, event.date, event.time,event.id)
    });
 }

//same as generate month except we add events to the month
function addEvent(title, date, time,id){
    //split the event date by components and convert to int so we can make the nessecary comparisons further down
    let eventYear = Number(date.slice(0,4));
    let eventMonth = Number(date.slice(5,7));
    let eventDay = Number(date.slice(8,10));
    let eventHour = Number(time.slice(0,2));
    //convert the mysql time to 12-hour clock convention
    let oldTime = time;
    eventHour;
    let suffix = 'am ';
    if(eventHour>=12){
        eventHour = eventHour-12;
        suffix = 'pm '
    }
    if(eventHour==0){
        eventHour=12;
    }
    time = eventHour+time.slice(2,5)+suffix;
    let monthsArr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
    var weeks = currentMonth.getWeeks();
    document.getElementById('monthAndYear').innerHTML = monthsArr[currentMonth.month]+' '+currentMonth.year;
    for(var w in weeks){
        var days = weeks[w].getDates()
        //only shows events for the current month
        for(var d in days){
            if(currentMonth.month == days[d].getMonth()){
                dayId = days[d].getDate()+'';
                //check if event year, month and day matches
                if(eventYear==days[d].getFullYear() && eventMonth==days[d].getMonth()+1 && eventDay==days[d].getDate()){
                    //html event_id is based on mysql id
                    eventId = 'event'+id;
                    day = document.getElementById(dayId);
                    //create div for event
                    let eventDiv = document.createElement("div");
                    eventDiv.setAttribute('id',eventId);
                    eventDiv.setAttribute('class','events');
                    //display title for event
                    let eventTitle = document.createElement('p');
                    eventTitle.appendChild(document.createTextNode(title));
                    eventTitle.setAttribute('class','eventTitle');
                    //display the time for event
                    let eventTime = document.createElement('small');
                    eventTime.appendChild(document.createTextNode(time));
                    eventTime.setAttribute('class','eventTime');
                    //save all of the event attributes in the div so we can access them when its clicked
                    eventDiv.time = time;
                    eventDiv.oldTime = oldTime;
                    eventDiv.title = title;
                    eventDiv.eventId = id;
                    eventDiv.date = date;
                    eventDiv.appendChild(eventTime);
                    eventDiv.appendChild(eventTitle);
                    day.appendChild(eventDiv);
                    //when div is click the event will pop up
                    document.getElementById(eventId).addEventListener("click",eventPopUp);
                }
            } 
        }

    }
}
//close event popup
document.getElementById('closeEventBtn').addEventListener('click',closeEvent);

//Pops up when event div that is displayed in calendar view is clicked
function eventPopUp(event){
    let popUp = document.getElementById('eventPopUp');
    //attach all of the event details to the different buttons
    document.getElementById('deleteEvent').eventId = event.currentTarget.eventId;
    document.getElementById('changeEvent').eventId = event.currentTarget.eventId;
    document.getElementById('editEventBtn').eventId = event.currentTarget.eventId;
    document.getElementById('editEventBtn').title = event.currentTarget.title;
    //document.getElementById('editEventBtn').date = event.currentTarget.date;
    

    //empty the previous selected event details
    if(!popUp.hidden){
        document.getElementById('eventTextArea').innerHTML="";
        popUp.hidden=true;
    }
    //heading is the title of the event
    let heading = document.createElement('h3');
    heading.appendChild(document.createTextNode(event.currentTarget.title));
    heading.setAttribute('id','popHeading');
    //details contains the date and time of event
    let details = document.createElement('p');
    details.setAttribute('id','popDetails');
    details.appendChild(document.createTextNode(event.currentTarget.date));
    details.appendChild(document.createTextNode(' '+event.currentTarget.time));
    document.getElementById('eventTextArea').appendChild(heading);
    document.getElementById('eventTextArea').appendChild(details);
    //show the popup
    popUp.hidden = false;
}
//close the event popup and go back to page was before event was clicked
function closeEvent(){
    document.getElementById('eventTextArea').style.display = 'block';
    document.getElementById('editEvent').hidden = true;
    document.getElementById('editEventBtn').style.display = 'inline-block';
    document.getElementById('deleteEvent').style.display = 'inline-block';
    document.getElementById('eventPopUp').hidden = true;
    document.getElementById('eventTextArea').innerHTML='';
}
//deletes the clicked event from mysql
function deleteEventAjax(event){
    
    const date = diaElegido
    const data = { 'date': date };

    fetch("includes/deleteEventHandler.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => data.success ? deleteEventDisplay(): alert(`Could not delete event: ${data.message}`))
    .catch(err => alert("error"));
    //generateMonth();
}
//reloads calendar after deletion
function deleteEventDisplay(){
    closeEvent();
    generateMonth();
    
}
//pops up when edit button is clicked
function editEventPopUp(event){
    document.getElementById('eventPopUp').hidden = true;
    document.getElementById('editEvent').hidden = true;

}

//called when makes changes button is clicked
function editEventAjax(event){
    const title = document.getElementById("editTitle").value; 
    const date = diaElegido
    const data = { 'title': title, 'date': date };

    fetch("includes/editEventHandler.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => data.success ? editEventDisplay(data.message) : alert(`Could not edit event: ${data.message}`))
        .catch(err => alert("Error al crear usuario"));
       document.getElementById('eventPopUp').hidden = true;
        document.getElementById('editEvent').hidden = true;
       generateMonth();
}
//reloads calendar after event is edited and clears neccessary fields
function editEventDisplay(message){
    document.getElementById("editTitle").value='';
    document.getElementById("editDate").value='';
    document.getElementById("editTime").value='';
    document.getElementById('eventPopUp').hidden = true;
    document.getElementById('editEvent').hidden = true;
    document.getElementById('eventTextArea').style.display = 'block';
    document.getElementById('eventTextArea').innerHTML="";
    document.getElementById('editEventBtn').style.display = 'inline-block';
    document.getElementById('deleteEvent').style.display = 'inline-block';
    generateMonth();
    
}