<?php

$connection = mysqli_init();
if (!$connection) {
    die('mysqli_init failed');
}

if (!mysqli_real_connect($connection, 'localhost', 'root', 'password', 'tasks-database', 0, NULL, MYSQLI_CLIENT_FOUND_ROWS)) {
    die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
}

?>
