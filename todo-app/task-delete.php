<?php

include('database.php');

if(isset($_POST['id'])) {
  // prepare and bind
  $stmt = $connection->prepare("DELETE FROM task WHERE id = ?");
  $stmt->bind_param(i, $id);

  // set parameters and execute
  $id = $_POST['id'];
  $stmt->execute();
  $rc = $stmt->affected_rows;
  echo $rc;

}

?>
