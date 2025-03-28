document.addEventListener("DOMContentLoaded", () => {
  let roomsOption = document.getElementById("habitaciones");

  roomsOption.querySelectorAll("li").forEach((li) => {
    let img = li.querySelector(".roomIcon");

    img.addEventListener("mouseenter", () => {
      li.querySelector(".viewMore").style.visibility = "visible";
    });

    li.addEventListener("mouseleave", () => {
      li.querySelector(".viewMore").style.visibility = "hidden";
    });
  });
});
