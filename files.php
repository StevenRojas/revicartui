<?php
$files = glob('./src/assets/media/cars/brands/*');
foreach($files as $file) {
  $filename = pathinfo($file, PATHINFO_FILENAME);
  $filename = str_replace('.jpg', '', $filename);
  $filename = str_replace('.jpeg', '', $filename);
  $filename = str_replace('.png', '', $filename);
  $filename = str_replace('.PNG', '', $filename);
  $filename = str_replace('logo', '', $filename);
  $filename = explode('-', $filename);
  foreach($filename as &$fracment) {
    $fracment = ucfirst($fracment);
  }
  $filename = trim(join(' ', $filename));
  $path = 'static/images/brands/' . pathinfo($file, PATHINFO_BASENAME);
  $sql = "INSERT into brand set name = '$filename', icon='$path', created_at=NOW(), updated_at=NOW();";
  print_r("\n");
  print_r($sql);
}
