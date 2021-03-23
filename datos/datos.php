<?php
/* -------------------------------------------------------------------------------- */
function zerofill($valor, $longitud){
	$res = str_pad($valor, $longitud, '0', STR_PAD_LEFT);
	return $res;
}
/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */
header('Content-type: application/json;charset=utf-8');
$myServer = "128.0.1.90";
$myUser = "uturnos";
$myPass = "uturnos";
$myDB = "Turnos"; 
$busca = "";
error_reporting(E_ALL);
$DBH = new PDO("dblib:host=$myServer;dbname=$myDB", $myUser, $myPass);

$mes=12;
$anio = 2020;
if (isset($_GET['mm'])){
	$mes=intval($_GET['mm'])+1;
	$anio=intval($_GET['yyyy']);
}

$consulta = "SELECT [Fecha] 
	,day(Fecha) as dd 
	,month(Fecha) as mm 
	,year(Fecha) as yyyy 
      ,[Observacion]  
  FROM [Turnos].[dbo].[vFeriadosNew] 
  where month(Fecha)=".$mes." and year(Fecha)=".$anio."  
  order by day(Fecha)";

$turnosAsignados="SELECT [Fecha] 
	,day(Fecha) as dd  
	,month(Fecha) as mm  
	,year(Fecha) as yyyy  
	,count(*) as qty 
  FROM [Turnos].[dbo].[tblTurnos] 
  WHERE [Fecha] > GETDATE() and  month(Fecha)=".$mes." and year(Fecha)=".$anio."  
  group by [Fecha] ";

$asignados = $DBH->query($turnosAsignados);
$rowsTurnos=[];
while($row = $asignados->fetch(PDO::FETCH_ASSOC) ){
	$row = array_map('utf8_encode', $row); 
	$rowsTurnos[] = $row;
}
//var_dump($rowsTurnos);
//echo($consulta);
$rows = array();
$result = $DBH->query($consulta);
while($row = $result->fetch(PDO::FETCH_ASSOC) ){
	$row['Observacion']=iconv("CP1256", "ISO-8859-1//TRANSLIT", $row['Observacion']);
//$tab = array("UTF-8", "ASCII", "Windows-1252", "ISO-8859-15", "ISO-8859-1", "ISO-8859-6", "CP1256"); 

	$row = array_map('utf8_encode', $row); 
	//$row = array_map('utf8_decode', $row); 
	//$row['Observacion']=iconv("UTF-8", "ISO-8859-1", $row['Observacion']);
	$row['turnos']=getAsignados($row['Fecha'],$rowsTurnos);
    $rows[] = $row;
}

$salida=['feriados'=>$rows,'turnos'=>$rowsTurnos];

echo json_encode($salida,JSON_UNESCAPED_SLASHES);

/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
function getAsignados($fecha,$Turnos){
	$turno=0;
	foreach ($Turnos as $key => $value) {
		if ($value['Fecha']==$fecha){
			$turno=intval($value['qty']);
		};
	}
	return $turno;
}
/*------------------------------------------------------------------------*/
?>


    