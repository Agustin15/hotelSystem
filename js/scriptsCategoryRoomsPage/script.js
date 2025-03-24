document.addEventListener("DOMContentLoaded", () => {
  let viewMoreOfSuite = document.getElementById("verMasSuite");
  let viewMoreOfDeluxe = document.getElementById("verMasDeluxe");
  let viewMoreOfStandar = document.getElementById("verMas");

  let imagesStandar = document
    .getElementById("sliderStandar")
    .querySelectorAll("img");

  imagesStandar.forEach(function (imagen) {
    imagen.addEventListener("mouseenter", function () {
      viewMoreOfStandar.style.visibility = "visible";
    });

    imagen.addEventListener("mouseleave", function () {
      viewMoreOfStandar.style.visibility = "hidden";
    });
  });

  viewMoreOfStandar.addEventListener("mouseenter", function () {
    viewMoreOfStandar.style.visibility = "visible";
  });

  //sliderDeluxe

  let imagesDeluxe = document
    .getElementById("sliderDeluxe")
    .querySelectorAll("img");

  imagesDeluxe.forEach(function (imagen) {
    imagen.addEventListener("mouseenter", function () {
      viewMoreOfDeluxe.style.visibility = "visible";
    });

    imagen.addEventListener("mouseleave", function () {
      viewMoreOfDeluxe.style.visibility = "hidden";
    });
  });

  viewMoreOfDeluxe.addEventListener("mouseenter", function () {
    viewMoreOfDeluxe.style.visibility = "visible";
  });

  //sliderSuite

  let imagesSuite = document
    .getElementById("sliderSuite")
    .querySelectorAll("img");

  imagesSuite.forEach(function (imagen) {
    imagen.addEventListener("mouseenter", function () {
      viewMoreOfSuite.style.visibility = "visible";
    });

    imagen.addEventListener("mouseleave", function () {
      viewMoreOfSuite.style.visibility = "hidden";
    });
  });

  viewMoreOfSuite.addEventListener("mouseenter", function () {
    viewMoreOfSuite.style.visibility = "visible";
  });
});
