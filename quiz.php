<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $thickness = $_POST['thickness'] ? implode(', ', $_POST['thickness']) : '';
    $area = $_POST['area'] ?? '';
    $consultation = $_POST['consultation'] ? 'Нужна' : 'Не нужна';
    $picture = $_POST['picture'] ? implode(', ', $_POST['picture']) : '';
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.timeweb.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@codeseven.ru';
        $mail->Password = 'mg208y92c2';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('info@codeseven.ru', 'Contact Form');
        $mail->addAddress('info@codeseven.ru');

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Новая заявка с сайта по расчету фасада';
        
        $emailBody = "
            <h2>Новый расчет фасад</h2>
            <p><strong>Площадь объекта:</strong> {$area}</p>
            <p><strong>Толщина утеплителя:</strong> {$thickness}</p>
            <p><strong>Консультяция:</strong> {$consultation}</p>
            <p><strong>Выбор рисунка:</strong> {$picture}</p>
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
