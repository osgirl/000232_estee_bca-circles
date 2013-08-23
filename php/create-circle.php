<?php

include "./imageSmoothArc_optimized.php";

$canvas         = imagecreatetruecolor( 500, 580 );
$bgColor        = imagecolorallocate( $canvas, 243, 141, 171 );
$bgCircleColor  = array( 245, 113, 157, 0 );

$fontNormal     = './../fonts/HelveticaBQ-Roman.otf';
$fontLight      = './../fonts/HelveticaBQ-Light.otf';
$fontBold       = './../fonts/HelveticaBQ-Medium.otf';
$colorWhite     = imagecolorallocate( $canvas, 255, 255, 255 );

$thumbs_url     = $_POST['thumbs_url'];
$user_name      = $_POST['user_name'];
$content_text   = $_POST['content'];
$circle_id      = $_POST['circle_id'];
$filename       = "circle_photo_".$circle_id.".jpg";


$steps          = count( $thumbs_url );
$radius         = 180;
$cx             = 250;
$cy             = 340;

// Create canvas
imagefill( $canvas, 0, 0, $bgColor );
imageSmoothArc( $canvas, 250, 340, 265, 265, $bgCircleColor, M_PI/2, 0 );
$dotted = @imagecreatefrompng("./../img/circle_dotted_outline.png");
imagecopy($canvas, $dotted, 70,160,0,0,imagesx($dotted), imagesy($dotted));

// Create circular positioned thumbnails
for ( $i =0; $i < $steps; $i++ ) {
  $angle = ( pi() * ( $i / $steps -.25 ) ) *2;
  $x = $cx + $radius * cos( $angle );
  $y = $cy + $radius * sin( $angle );
  $thumb = @imagecreatefromjpeg( "./../img/".$thumbs_url[$i] );

  if ( $thumb ) {
    $w_h = imagesx( $thumb );
    $mask = imagecreatetruecolor( $w_h,$w_h );
    imageSmoothArc( $mask, $w_h/2, $w_h/2, $w_h-4, $w_h-4, array( 255, 0, 0, 0 ), M_PI/2, 0 );
    image_mask( $thumb, $mask );
    imagecopyresampled( $canvas, $thumb, $x-40, $y-40, 0, 0, 80, 80, $w_h, $w_h );
  }
  //If image is not available, draw whie dot
  else {
    imageSmoothArc( $canvas, $x, $y, 20, 20, array( 255, 255, 255, 0 ), M_PI/2, 0 );
  }
}

//Create a header
imagefttext( $canvas, 15, 0, 20, 30, $colorWhite, $fontNormal, $user_name . " created a" );
imagefttext( $canvas, 30, 0, 20, 70, $colorWhite, $fontNormal, "Circle of Strength" );
imageline($canvas, 20, 85, 480, 85, $colorWhite);

// Create texts in a center of circle
imagefttext( $canvas, 14, 0, 160, 290, $colorWhite, $fontBold, "We Will -" );
multiline_text( $canvas, 18, $colorWhite, $fontLight, $content_text, 160, 315, 200 );

// Create image
ob_start (); 
imagejpeg( $canvas, $filename, 90 );
$output = ob_get_contents (); 
ob_end_clean ();
$output_base64 = base64_encode ($output);

// Results
$data = array (  'result'=>"Success",
                 'filename'=>$filename
              );

echo json_encode($data);
// End Results


function image_mask( &$img, &$mask ) {
  $xSize = imagesx( $img );
  $ySize = imagesy( $img );
  $newPicture = imagecreatetruecolor( $xSize, $ySize );
  imagesavealpha( $newPicture, true );
  imagefill( $newPicture, 0, 0, imagecolorallocatealpha( $newPicture, 0, 0, 0, 127 ) );

  if ( $xSize != imagesx( $mask ) || $ySize != imagesy( $mask ) ) {
    $tempPic = imagecreatetruecolor( $xSize, $ySize );
    imagecopyresampled( $tempPic, $mask, 0, 0, 0, 0, $xSize, $ySize, imagesx( $mask ), imagesy( $mask ) );
    imagedestroy( $mask );
    $mask = $tempPic;
  }

  for ( $x = 0; $x < $xSize; $x++ ) {
    for ( $y = 0; $y < $ySize; $y++ ) {
      $alpha = imagecolorsforindex( $mask, imagecolorat( $mask, $x, $y ) );
      $alpha = 127 - floor( $alpha['red'] / 2 );
      $color = imagecolorsforindex( $img, imagecolorat( $img, $x, $y ) );
      imagesetpixel( $newPicture, $x, $y, imagecolorallocatealpha( $newPicture, $color['red'], $color['green'], $color['blue'], $alpha ) );
    }
  }
  imagedestroy( $img );
  $img = $newPicture;
}

function multiline_text( $image, $font_size, $color, $font, $text, $start_x, $start_y, $max_width ) {
  $words = explode( " ", $text );
  $string = "";
  $tmp_string = "";

  for ( $i = 0; $i < count( $words ); $i++ ) {
    $tmp_string .= $words[$i]." ";

    //check size of string
    $dim = imagettfbbox( $font_size, 0, $font, $tmp_string );

    if ( $dim[4] < $max_width ) {
      $string = $tmp_string;
    } else {
      $i--;
      $tmp_string = "";
      imagefttext( $image, $font_size, 0, $start_x, $start_y, $color, $font, $string );

      $string = "";
      $start_y += $font_size + ( $font_size/1.8 );
    }
  }
  imagefttext( $image, $font_size, 0, $start_x, $start_y, $color, $font, $string );
}

?>
