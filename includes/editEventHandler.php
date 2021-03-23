<?php
    header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
    session_start();
    // php://input recieves raw post data
    $json_str = file_get_contents('php://input');
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    $title = $json_obj['title'];
    $date = $json_obj['date'];

    if(empty($title)|| empty($date)){
        echo json_encode(array(
            "success" => false,
            "message" => "One of the fields is empy"
        ));
        exit;
    }
    else{
        $myServer = "128.0.1.90";
        $myUser = "uturnos";
        $myPass = "uturnos";
        $myDB = "Turnos"; 
        $DBH = new PDO("dblib:host=$myServer;dbname=$myDB", $myUser, $myPass);
        $sql = "[Turnos].[dbo].[uspActualizarFeriados] '".$date."','".$title."'";
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
                "message" => $sql
            ));    
        }
        //var_dump($result);
        
    
        
    }







    // if(empty($title)&& empty($date)&&empty($time)){
    //     echo json_encode(array(
    //         "success" => false,
    //         "message" => "All Fields Empty"
    //     ));
    //     exit;
    // }
    // else if(!empty($title)&& empty($date)&&empty($time)){
    //     $sql ="UPDATE events set `title`='$title' WHERE id =$event_id";
        
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             'message' => 'Updated Title'
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update title"
    //         ));
    //         exit;
    //     }
        
    // }
    // else if(!empty($title)&& !empty($date)&&empty($time)){
    //     $sql ="UPDATE events set `title`='$title' `date`='$date' WHERE id=$event_id";
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             "message" => "Title and Date Updated"
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update title and date"
    //         ));
    //         exit;
    //     }
    // }
    // else if(!empty($title)&& !empty($date)&&!empty($time)){
    //     $sql ="UPDATE events set `title`='$title' `date`='$date' `time`='$time' WHERE id=$event_id";
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             "message" => "Updated All Fields"
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update all fields"
    //         ));
    //         exit;
    //     }
    // }
    // else if(empty($title)&& !empty($date)&&empty($time)){
    //     $sql ="UPDATE events set `date`='$date' WHERE id=$event_id";
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             "message" => "Updated Date"
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update date"
    //         ));
    //         exit;
    //     }
    // }
    // else if(empty($title)&& !empty($date)&&!empty($time)){
    //     $sql ="UPDATE events set `date`='$date' `time`='$time' WHERE id=$event_id";
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             "message" => "Updated date and time"
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update date and time"
    //         ));
    //         exit;
    //     }
    // }
    // else if(empty($title)&& empty($date)&&!empty($time)){
    //     $sql ="UPDATE events set `time`='$time' WHERE id=$event_id";
    //     if(mysqli_query($mysqliConn,$sql)){
    //         echo json_encode(array(
    //             "success" => true,
    //             "message" => "Updated Time"
    //         ));
    //         exit;
    //     }
    //     else{
    //         echo json_encode(array(
    //             "success" => false,
    //             "message" => "Couldn't update time"
    //         ));
    //         exit;
    //     }

    // }
    // else{
    //     echo json_encode(array(
    //         "success" => false,
    //         "message" => "unkown error"
    //     ));
    //     exit;;
    // }

?>