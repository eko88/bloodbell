<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'mailer/PHPMailerAutoload.php';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail ->Host = 'ssl://smtp.gmail.com';

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail ->Port = 465;

//Set the encryption system to use - ssl (deprecated) or tls
$mail ->SMTPSecure = 'ssl';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "email@email.com";

//Password to use for SMTP authentication
$mail->Password = "password";

//Set who the message is to be sent from
$mail->setFrom('$name', 'First Last');

//Set an alternative reply-to address
$mail->addReplyTo('$email', 'First Last');

//Set who the message is to be sent to
$mail->addAddress('email@email.com', 'Name');

//Set the subject line
$mail->Subject = 'Blood Bell Message';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML('<b>from:</b> '.$name.'<br> <b>email:</b> '.$email. '<br> <b>message:</b> ' .$message); 

//Replace the plain text body with one created manually
$mail->AltBody = $message;

//send the message, check for errors
$mail->send();