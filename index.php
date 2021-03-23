<?php 
session_start();
//https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
?>

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"> -->
    <title>Calendario</title>
</head>
<body>
    <h1 id="monthAndYear"></h1>
    <button id="prevBtn"><i class="fas fa-arrow-left"></i></button>
    <!--button id="createEventBtn" hidden>Create Event</button-->
    <button id="nextBtn"><i class="fas fa-arrow-right"></i></button>
    <br>
    <br>
    <!-- Table for the initial calendar, in javascript a new table is create when a new month is loaded -->
    <table id="calendarTable">
        <!-- This part will be added via javascript the table heading will be regenerated several times -->
        <!-- <thead>
            <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>
        </thead> -->
    </table>
    
    <div id='eventPopUp' hidden>
        <button id="closeEventBtn">&#10006</button>
        <div id="eventTextArea">

        </div>
        <hr />
        <div id="editEvent" hidden>
            <h3>Evento</h3>
            <label for="editTitle">Título: </label>
            <input type="text" class="editEl" name="editTitle" id="editTitle" placeholder="Descripción..."><br>
            <hr />        
            <button id="changeEvent">Actualizar</button>
            <button id="deleteEvent">Eliminar</button>
            <button id="editEventBtn">Cancelar</button>
            <hr />
            <hr />
        
        </div>
        
        
    </div>
</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>    
<script src="main.js"></script>
</html>