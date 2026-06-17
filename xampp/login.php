<?php
// CORS — allow the React app (any origin) to call this endpoint
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$username = trim($input['username'] ?? '');
$password = (string)($input['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'نام کاربری و رمز عبور الزامی است']);
    exit;
}

$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'خطا در اتصال به دیتابیس']);
    exit;
}
$mysqli->set_charset('utf8mb4');

$stmt = $mysqli->prepare(
    'SELECT id, username, password_hash, full_name, email, phone, role,
            department, profile_image, is_active, last_login
       FROM users WHERE username = ? LIMIT 1'
);
$stmt->bind_param('s', $username);
$stmt->execute();
$res  = $stmt->get_result();
$user = $res->fetch_assoc();
$stmt->close();

if (!$user) {
    $mysqli->close();
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'نام کاربری یا رمز عبور اشتباه است']);
    exit;
}

if ((int)$user['is_active'] !== 1) {
    $mysqli->close();
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'حساب کاربری غیرفعال است']);
    exit;
}

// Supports both PHP `password_hash()` values and plain demo passwords
$valid = password_verify($password, $user['password_hash'])
      || hash_equals((string)$user['password_hash'], $password);

if (!$valid) {
    $mysqli->close();
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'نام کاربری یا رمز عبور اشتباه است']);
    exit;
}

// Update last_login
$upd = $mysqli->prepare('UPDATE users SET last_login = NOW() WHERE id = ?');
$upd->bind_param('i', $user['id']);
$upd->execute();
$upd->close();
$mysqli->close();

unset($user['password_hash']);
$user['is_active']  = (int)$user['is_active'] === 1;
echo json_encode(['ok' => true, 'user' => $user], JSON_UNESCAPED_UNICODE);
