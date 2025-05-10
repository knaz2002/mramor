<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    // $message = $_POST['message'] ?? '';
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.timeweb.ru';
        $mail->SMTPAuth = true;
        // $mail->Username = 'info@codeseven.ru';
        $mail->Username = 'ascwork86@gmail.com';
        $mail->Password = 'mg208y92c2';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // $mail->setFrom('info@codeseven.ru', 'Contact Form');
        // $mail->addAddress('info@codeseven.ru');
        $mail->setFrom('ascwork86@gmail.com', 'Contact Form');
        $mail->addAddress('ascwork86@gmail.com');

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Новая заявка с сайта';
        
        $emailBody = "
            <h2>Новая заявка с формы обратной связи</h2>
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Телефон:</strong> {$phone}</p>
        ";

        $mail->Body = $emailBody;
        $mail->AltBody = strip_tags($emailBody);

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Сообщение успешно отправлено']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Ошибка отправки: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
}
?>
