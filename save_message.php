<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$serverName = "DESKTOP-XXXX\SQLEXPRESS"; 
$connectionOptions = array(
    "Database" => "AbdulrahmanPortfolio",
    "Uid" => "username",   
    "PWD" => "password"       
);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['Name']) || empty($data['Email']) || empty($data['MessageText'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "برجاء ملء جميع الحقول"]);
    exit;
}

$name = $data['Name'];
$email = $data['Email'];
$message = $data['MessageText'];

try {
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if ($conn === false) {
        throw new Exception("فشل الاتصال بقاعدة البيانات");
    }

    $sql = "INSERT INTO ContactMessages (FullName, Email, MessageText) VALUES (?, ?, ?)";
    $params = array($name, $email, $message);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        throw new Exception("فشل حفظ الرسالة");
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "تم حفظ الرسالة بنجاح"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "حدث خطأ: " . $e->getMessage()]);
}
?>