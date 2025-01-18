<?php
function sendExpoNotification($expoPushToken, $subject, $message) {
   $url = 'https://exp.host/--/api/v2/push/send';

   $data = [
       'to' => $expoPushToken,
       'title' => $subject,
       'body' => $message,
       'data' => [
         'extraData' => 'Some additional data', 
         'imageUrl' =>'https://team.laxo.one/uploads/74/1728031753/Laxo%20icon.png?view=1'
      ],
   ];

   $options = [
       'http' => [
           'header'  => "Content-Type: application/json\r\n",
           'method'  => 'POST',
           'content' => json_encode($data),
       ],
   ];

   $context  = stream_context_create($options);
   $result = file_get_contents($url, false, $context);

   if ($result === FALSE) {
       // Обработка ошибок
       echo "Error sending notification";
   }

   return $result;
}

// Пример использования
$expoPushToken = 'ExponentPushToken[C5Ro2dMO6SnsEQrFj4CInX]'; // Замените на ваш токен
$expoPushToken = 'ExponentPushToken[QM1OQSPWsqUMPYMMAIb95M]'; // Замените на ваш токен
$message = 'Дмитрий Шишмаков обновил контакт «Артем Подворный»';
$subject = 'Контакт Артем Подворный';
$response = sendExpoNotification($expoPushToken, $subject, $message);
echo $response;
