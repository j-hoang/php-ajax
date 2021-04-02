<?php

include('database.php');

if(isset($_POST['name'])) {
  // Get row count. Limit task list to 20 task
  $max_task_count = 20;
  $connection -> query("SELECT * FROM task");

  if($connection->affected_rows >= $max_task_count) {
    echo "full";
  } else {
    // prepare and bind
    $stmt = $connection->prepare("INSERT into task(name, description) VALUES (?, ?)");
    $stmt->bind_param(ss, $task_name, $task_description);

    // set parameters and execute
    $task_name = $_POST['name'];
    $task_description = $_POST['description'];
    $stmt->execute();
    $rc = $stmt->affected_rows;
    echo $rc;
  }


}

?>
