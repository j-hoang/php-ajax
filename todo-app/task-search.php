<?php

include('database.php');

$search = $_POST['search'];

if(!empty($search)) {
  // prepare and bind
  $stmt = $connection->prepare("SELECT * FROM task WHERE name LIKE CONCAT(\"%\", ?, \"%\")");
  $stmt->bind_param(s, $search);

  // execute
  $rc = $stmt->execute();
  $result = $stmt->get_result();

  if ( false===$rc ) {
    die('Query Failed.');
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => htmlspecialchars($row['name']),
      'description' => htmlspecialchars($row['description']),
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

?>
