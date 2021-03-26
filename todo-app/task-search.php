<?php

include('database.php');

$search = $_POST['search'];
if(!empty($search)) {
  // prepare and bind
  $stmt = $connection->prepare("SELECT * FROM task WHERE name LIKE CONCAT(\"%\", ?, \"%\")");
  $stmt->bind_param(s, $search);

  // execute
  $search = $_POST['search'];
  $rc = $stmt->execute();

  if ( false===$rc ) {
    die('Query Failed.');
  }

  $result = $stmt->get_result();

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

?>
