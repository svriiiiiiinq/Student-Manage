<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $teacher_ID = $_POST['teacher_ID'];
    $teacher_email = $_POST['teacher_email'];
    $password = $_POST['password'];

    // ตรวจสอบข้อมูลผู้ใช้
    $sql = "SELECT * FROM teachers WHERE teacher_ID = ? AND teacher_email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $teacher_ID, $teacher_email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // สำเร็จ
            echo json_encode(["status" => "success", "id" => $user['id']]);
        } else {
            // รหัสผ่านไม่ถูกต้อง
            echo json_encode(["status" => "error", "message" => "Incorrect password."]);
        }
    } else {
        // ไม่พบผู้ใช้
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }

    $stmt->close();
}

?>
