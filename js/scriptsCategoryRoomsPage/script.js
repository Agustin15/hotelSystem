document.addEventListener("DOMContentLoaded", () => {
  let viewMoreOfSuite = document.getElementById("verMasSuite");
  let viewMoreOfDeluxe = document.getElementById("verMasDeluxe");
  let viewMoreOfStandar = document.getElementById("verMas");

  roomsOption(viewMoreOfStandar, "sliderStandar");
  roomsOption(viewMoreOfDeluxe, "sliderDeluxe");
  roomsOption(viewMoreOfSuite, "sliderSuite");
});

const roomsOption = (viewMore, slider) => {
  let images = document.getElementById(slider).querySelectorAll("img");

  images.forEach(function (imagen) {
    imagen.addEventListener("mouseenter", function () {
      viewMore.style.visibility = "visible";
    });

    imagen.addEventListener("mouseleave", function () {
      viewMore.style.visibility = "hidden";
    });
  });

  viewMore.addEventListener("mouseenter", function () {
    viewMore.style.visibility = "visible";
  });
};
