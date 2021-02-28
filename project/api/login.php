<?php

$name = $_GET['n'];
$pwd = $_GET['p'];
$con  =mysqli_connect('localhost','root','123456','userlist');
$sql = "SELECT * FROM `userlists` WHERE `name`='$name' AND `password`='$pwd'";

$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接失败'  . mysqli_error($con));
}
$row = mysqli_fetch_assoc($res);

if($row){
    print_r(json_encode(array('code'=>true),JSON_UNESCAPED_UNICODE));
}else{
    print_r(json_encode(array('code'=>false),JSON_UNESCAPED_UNICODE));
}

?>