<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

include 'db_config.php';

// ดึงข้อมูล JSON ที่ถูกส่งมาในรูปแบบ raw
$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบว่าข้อมูลถูกต้องหรือไม่
if (is_null($data)) {
    echo json_encode(["success" => 0, "message" => "ไม่มีข้อมูลส่งมา"]);
    exit();
}

if (isset($data->name) && isset($data->email) && isset($data->password)) {
    // กำหนดค่าตัวแปรให้ตรงกับข้อมูลที่รับมา
    $name = mysqli_real_escape_string($db, $data->name);
    $email = mysqli_real_escape_string($db, $data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // สั่งให้ใส่ข้อมูลในฐานข้อมูล
    $query = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')";
    $result = mysqli_query($db, $query);

    if ($result) {
        echo json_encode(["success" => 1, "message" => "ลงทะเบียนสำเร็จ"]);
    } else {
        echo json_encode(["success" => 0, "message" => "การลงทะเบียนล้มเหลว"]);
    }
} else {
    echo json_encode(["success" => 0, "message" => "ข้อมูลที่จำเป็นหายไป"]);
}
?>
