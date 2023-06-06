<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gallery - Kopana</title>
    <link rel="icon" href="../Images/KOPA.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
    <!-- font awesome -->
    <link rel="stylesheet" href="../css/all.min.css" />
    <!-- custom stylesheet -->

    <!-- On scroll animation -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <!-- Animate.css -->
    <link rel="stylesheet" href="../css/Gallery-css/animate.css" />
    <!-- Icomoon Icon Fonts-->
    <link rel="stylesheet" href="../css/Gallery-css/icomoon.css" />
    <!-- Bootstrap  -->
    <link rel="stylesheet" href="../css/Gallery-css/bootstrap.css" />
    <!-- Theme style  -->
    <link rel="stylesheet" href="../css/Gallery-css/Gallery-styles.css" />
    <!-- Magnific Popup -->
    <link rel="stylesheet" href="../css/Gallery-css/magnific-popup.css" />
    <!-- Modernizr JS -->
    <script src="../js/Gallery-js/modernizr-2.6.2.min.js"></script>
    <!-- FOR IE9 below -->
    <!--[if lt IE 9]>
      <script src="js/respond.min.js"></script>
    <![endif]-->

    <!-- header script -->
    <script src="../js/header.js" type="text/javascript" defer></script>


    <!-- <script src="../js/gallery_image.js" type="text/javascript" defer></script> -->
</head>

<body>
    <!-- Navbar -->
    <header-component></header-component>

    <!-- Gallery section -->
    <section id="gallery-page">
        <h1>Kopana Gallery</h1>
        <div class="container-fluid" id="gallery-image-grid">
            <div class="grid">
                <div class="grid-sizer"></div>
                <?php
                header("HTTP/1.1 500 Internal Server Error");
        $dirname = "../Gallery/";
        $images = scandir($dirname);
        shuffle($images);
        $ignore = Array(".", "..");
        foreach($images as $curimg){
            if(!in_array($curimg, $ignore)) {
                echo '<div class="grid-item item animate-box" data-animate-effect="fadeIn"><a href="'.$dirname.$curimg.'" class="image-popup" title="Kopana gallery"><div class="img-wrap"><img src="'.$dirname.$curimg.'" alt="kyu nai ho raha bc" class="img-responsive" /></div><div class="text-wrap"><div class="text-inner popup"><div><h2>Kopana Gallery</h2></div></div></div></a></div>';
            }
        }
    ?>
            </div>
        </div>
    </section>



    <!-- jQuery -->
    <script src="../js/Gallery-js/jquery.min.js"></script>
    <!-- jQuery Easing -->
    <script src="../js/Gallery-js/jquery.easing.1.3.js"></script>
    <!-- Bootstrap -->
    <script src="../js/Gallery-js/bootstrap.min.js"></script>
    <!-- Waypoints -->
    <script src="../js/Gallery-js/jquery.waypoints.min.js"></script>

    <!-- Magnific -->
    <script src="../js/Gallery-js/jquery.magnific-popup.min.js"></script>
    <script src="../js/Gallery-js/magnific-popup-options.js"></script>
    <!-- Isotope & ImagesLoaded -->
    <script src="../js/Gallery-js/isotope.pkgd.min.js"></script>
    <script src="../js/Gallery-js/Imagesloaded.pkgd.min.js"></script>
    <!-- GSAP  -->
    <script src="../js/Gallery-js/TweenLite.min.js"></script>
    <script src="../js/Gallery-js/CSSPlugin.min.js"></script>
    <script src="../js/Gallery-js/EasePack.min.js"></script>

    <!-- MAIN JS -->
    <script src="../js/Gallery-js/GalleryScript.js"></script>
    <!-- gallery script -->
    <script src="../js/Gallery-js/customGalleryScript.js"></script>
    <!-- footer script -->
    <script src="../js/footer.js" type="text/javascript" defer></script>
    <!-- footer -->

    <footer-component></footer-component>
</body>

</html>