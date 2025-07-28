<?php


if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    if ($name && $email && $subject && $message) {
        session_start();
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        $_SESSION['message'] = $message;
        include_once './send.php';
        if ($_SESSION['name'] && $_SESSION['email'] && $_SESSION['message']) {
?>
            <script>
                alert("Message sent successfully");
            </script>

        <?php
        } else {
        ?>
            <script>
                alert("Message sending error!");
            </script>
<?php
        }
    } else {
        echo "No data found";
    }
} else {
    echo "No data submitted";
}
?>