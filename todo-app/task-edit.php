<?php

include('database.php');

if(isset($_POST['id'])) {
  // prepare and bind
  $stmt = $connection->prepare("UPDATE task SET name = ?, description = ? WHERE id = ?");
  $stmt->bind_param(ssi, $task_name, $task_description, $id);

  // set parameters and execute
  $task_name = $_POST['name'];
  $task_description = $_POST['description'];
  $id = $_POST['id'];
  $stmt->execute();
  $rc = $stmt->affected_rows;
  echo $rc;

}

?>
