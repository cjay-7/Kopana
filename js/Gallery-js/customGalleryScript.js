var dir = "../../Images/Gallery/";
var fileextension = ".webp";

$.ajax({
  //This will retrieve the contents of the folder if the folder is configured as 'browsable'
  url: dir,
  success: function (data) {
    //List all .png file names in the page
    $(data)
      .find("a:contains(" + fileextension + ")")
      .each(function () {
        var filename = this.href
          .replace(window.location.host, "")
          .replace("http://", "")
          .replace(".preview", "");
        var src = filename;
        $(".grid").append(
          '<div class="grid-item item animate-box" data-animate-effect="fadeIn"><a href="../..' +
            src +
            '" class="image-popup" title="Kopana gallery"><div class="img-wrap"><img src="../..' +
            src +
            '" alt="kyu nai ho raha bc" class="img-responsive" /></div><div class="text-wrap"><div class="text-inner popup"><div><h2>Kopana Gallery</h2></div></div></div></a></div>'
        );
      });
  },
});
