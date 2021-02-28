<?php
$name = $_GET['t'];
$pwd = $_GET['p'];
$con  =mysqli_connect('localhost','root','123456','userlist');
$sql = "SELECT * FROM `userlists` WHERE `name`='$name'";
$res= mysqli_query($con,$sql);
if(!$res){
    die('数据库链接失败'  . mysqli_error($con));
};
$row = mysqli_fetch_assoc($res);
if(!$row){
    $sqladd  ="INSERT INTO `userlists` (`id`, `name`, `password`) VALUES (null, '$name', '$pwd')";
    $resadd = mysqli_query($con,$sqladd);
    if(!$resadd){
        die('数据库链接失败'  . mysqli_error($con));
    };
    print_r(json_encode(array('code'=>$resadd),JSON_UNESCAPED_UNICODE));
}else{
    print_r(json_encode(array('code'=>false),JSON_UNESCAPED_UNICODE));
}
?>