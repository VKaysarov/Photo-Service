<?php 
	$url = $_GET["path"];
	$urlArray = explode("/", $url);
	
	$result = [];
	if ($urlArray[0]=="upload") {
		$name = $_FILES['file']['name'];
		$explode_img = explode('.', $name);
		$expansion = $explode_img[1];
		$tmp_name = $_FILES['file']['tmp_name'];
		$photos = scandir('photos');
		$count_photos = count($photos) - 1;
		move_uploaded_file($tmp_name, 'photos/Untitled'.$count_photos.'.'.$expansion);
		$photos = scandir('photos');
		echo json_encode($photos);
	}

?>