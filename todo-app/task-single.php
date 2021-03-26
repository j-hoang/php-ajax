<?php

include('database.php');

if(isset($_POST['id'])) {

  // prepare and bind
  $stmt = $connection->prepare("SELECT * from task WHERE id = ?");
  $stmt->bind_param(i, $id);

  // set parameters and execute
  $id = $_POST['id'];
  $stmt->execute();
  $rc = $stmt->affected_rows;
  $result = $stmt->get_result();

  if(!result) {
    echo $rc;
  } else {
    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
      );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
  }



}

?>
