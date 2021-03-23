<?php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
    session_start();
    // php://input recieves raw post data
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
$date = $json_obj['date'];
//var_dump($json_obj);
if(empty($date)){
    echo json_encode(array(
        "success" => false,
        "message" => "fecha errónea"
    ));
    exit;
}
else{
    $myServer = "128.0.1.90";
    $myUser = "uturnos";
    $myPass = "uturnos";
    $myDB = "Turnos"; 
    $DBH = new PDO("dblib:host=$myServer;dbname=$myDB", $myUser, $myPass);
    $sql = "[Turnos].[dbo].[uspDeleteFeriados] '".$date."'";
    //var_dump($sql);
    
    $result = $DBH->query($sql);
    if ($result){
        echo json_encode(array(
            "success" => true,
            "message" => $sql
        ));    
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "Error consulta"
        ));    
    }
    exit;
}



?>