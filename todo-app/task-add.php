<?php

  include('database.php');

if(isset($_POST['name'])) {
  // prepare and bind
  $stmt = $connection->prepare("INSERT into task(name, description) VALUES (?, ?)");
  $stmt->bind_param(ss, $task_name, $task_description);

  // set parameters and execute
  $task_name = $_POST['name'];
  $task_description = $_POST['description'];
  $rc = $stmt->execute();

  if ( false===$rc )
    echo "Task Add Error!";
  else
    echo "Task Added Successfully!";

}

?>
