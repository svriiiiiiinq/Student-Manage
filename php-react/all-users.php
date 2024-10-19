<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

require 'db_connection.php';

$allUsers = mysqli_query($db_conn, "SELECT * FROM `users`");
if (mysqli_num_rows($allUsers) > 0) {
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    
    // เติม URL ของรูปภาพเพื่อแสดงผลได้ใน response
    foreach ($all_users as &$user) {
        $user['profile_picture_url'] = 'uploads/' . $user['profile_picture'];
    }
    
    echo json_encode(["success" => 1, "users" => $all_users]);
} else {
    echo json_encode(["success" => 0]);
}