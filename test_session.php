<?php
// Start session
session_start();

// Check if session data exists
if (isset($_SESSION['form_data'])) {
    $data = $_SESSION['form_data'];
    
    echo "<h2>Session Data Retrieved:</h2>";
    echo "<p><strong>Name:</strong> " . htmlspecialchars($data['name']) . "</p>";
    echo "<p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>";
    echo "<p><strong>Subject:</strong> " . htmlspecialchars($data['subject']) . "</p>";
    echo "<p><strong>Message:</strong> " . htmlspecialchars($data['message']) . "</p>";
    echo "<p><strong>Timestamp:</strong> " . htmlspecialchars($data['timestamp']) . "</p>";
    
    // Clear session data after displaying
    unset($_SESSION['form_data']);
} else {
    echo "<h2>No Session Data Found</h2>";
    echo "<p>Submit the contact form first to see session data here.</p>";
}
?>

<br>
<a href="index.php">← Back to Portfolio</a> 