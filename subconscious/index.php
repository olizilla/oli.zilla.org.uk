<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>The subconscious mind</title>
	<meta name="description" content="Moving pictures from the nooks and crannies of my mind" />
	<meta name="author" content="OliZilla" />
	<link rel="icon" type="image/png" href="/res/img/olizilla-icon.png" />
	<style>
html, body.full-screen, body.full-screen * {
	display:block;
	height:100%;
	width:100%;
	border:0 none;
	margin:0;
	padding:0;
	outline-style:none;
	outline-width:0;
	outline-color:-moz-use-text-color;
}
img {position:absolute}
	</style>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script type="text/javascript">
$(document).ready(function() {
	 
	$('img').load(function() {
			$(this).fadeOut(15000, function() {
				$(this).attr("src", "../animation/random.php?noise=" + Math.floor(Math.random()*101));		
				$(this).fadeIn(15000);
			});  
	});
	$('#y').attr("style", "block");
});	
	</script>
</head>
<body class="full-screen">
	<a href=".">
		<img id="x" src="../animation/random.php?noise=<?php echo mt_rand() ?>" alt="Moving pictures from the nooks and crannies of my mind" title="more more more..."/>
		<img id="y" style="display:none;" src="../animation/random.php?noise=<?php echo mt_rand() ?>" alt="Moving pictures from the nooks and crannies of my mind" title="more more more..."/>
	</a>
</body>
<!-- Images mostly from http://commons.wikimedia.org/ -->
<!-- Site design by http://theinterestedreader.co.uk -->
</html>