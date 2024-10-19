<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

require 'db_connection.php';

// ตรวจสอบการรับไฟล์
if (
    isset($_POST['student_ID']) && 
    isset($_POST['user_name']) && 
    isset($_POST['user_email']) && 
    isset($_POST['user_address']) && 
    !empty(trim($_POST['student_ID'])) &&
    !empty(trim($_POST['user_name'])) &&
    !empty(trim($_POST['user_email'])) &&
    !empty(trim($_POST['user_address'])) &&
    isset($_FILES['profile_picture']) && 
    $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK
) {
    $studentID = mysqli_real_escape_string($db_conn, trim($_POST['student_ID']));
    $username = mysqli_real_escape_string($db_conn, trim($_POST['user_name']));
    $useremail = mysqli_real_escape_string($db_conn, trim($_POST['user_email']));
    $useraddress = mysqli_real_escape_string($db_conn, trim($_POST['user_address']));
    
    // ตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        
        // จัดการไฟล์รูปภาพ
        $file_tmp = $_FILES['profile_picture']['tmp_name'];
        $file_name = basename($_FILES['profile_picture']['name']);
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $file_new_name = uniqid() . '.' . $file_ext;
        $upload_path = 'uploads/' . $file_new_name;
        
        if (move_uploaded_file($file_tmp, $upload_path)) {
            // เพิ่มข้อมูลลงฐานข้อมูล
            $insertUser = mysqli_query($db_conn, "INSERT INTO `users`(`student_ID`, `user_name`, `user_email`,`user_address`, `profile_picture`) 
                VALUES('$studentID', '$username', '$useremail','$useraddress', '$file_new_name')");
            
            if ($insertUser) {
                $last_id = mysqli_insert_id($db_conn);
                echo json_encode([
                    "success" => 1,
                    "msg" => "User Inserted.",
                    "id" => $last_id
                ]);
            } else {
                echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
            }
        } else {
            echo json_encode(["success" => 0, "msg" => "Failed to upload image!"]);
        }
    } else {
        echo json_encode(["success" => 0, "msg" => "Invalid Email Address!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}