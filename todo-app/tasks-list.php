<?php

  include('database.php');

  $query = "SELECT * from task order by id desc";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
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
?>
