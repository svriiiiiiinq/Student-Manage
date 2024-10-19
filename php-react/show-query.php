<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// คิวรีข้อมูลจากตาราง course_registration กับ users
$allRegistrations = mysqli_query($db_conn, "
SELECT
    users.profile_picture,
    users.student_ID, -- เปลี่ยนเป็น id จาก users
    users.user_name,
    course_registration.course_code,
    course_registration.course_name
FROM
    course_registration
JOIN
    users ON course_registration.id = users.id -- เชื่อมต่อโดยใช้ id
WHERE
    course_registration.course_code = '07-034-233' -- รหัสวิชาที่ต้องการ
");

if (mysqli_num_rows($allRegistrations) > 0) {
    $registrations = mysqli_fetch_all($allRegistrations, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "registrations" => $registrations]);
} else {
    echo json_encode(["success" => 0]);
}
?>
