
let indexsImgRooms = [
  { category: "Estandar", indexValue: 1 },
  { category: "Deluxe", indexValue: 1 },
  { category: "Suite", indexValue: 1 },
];

function controlsSlider(event, orientacion, category) {
  let arrow = event;
  let ul = arrow.parentNode.parentNode.querySelector("ul");
  let imgsRoom = ul.querySelectorAll("li");
  let index;

  index = indexGetValue(index, category);

  if (index < imgsRoom.length - 1 && orientacion == "next") {
    ul.style.transform += "translateX(-40%)";
    index++;
  } else if (index > 0 && orientacion == "prev") {
    ul.style.transform += "translateX(40%)";
    index--;
  }

  displayIndexItemRoom(ul, index);
  indexSetValue(category, index);
}

export function displayIndexItemRoom(ul, indexImg) {
  let containRoom = ul.parentNode.parentNode;
  let itemsIndex = containRoom
    .querySelector(".indexImagesRoom")
    .querySelectorAll("li");

  let itemIndex = itemsIndex[indexImg];

  itemsIndex.forEach((item) => {
    if (item.classList.contains("itemIndexActive")) {
      item.classList.remove("itemIndexActive");
    }
  });
  itemIndex.classList.add("itemIndexActive");
}

export function indexSetValue(category, newValueIndex) {
  let indexsRoomsUpdate = indexsImgRooms.map((indexRoom) => {
    if (indexRoom.category == category) {
      indexRoom.indexValue = newValueIndex;
    }
    return indexRoom;
  });

  indexsImgRooms = indexsRoomsUpdate;
}

export function indexGetValue(index, category) {
  let indexRoom = indexsImgRooms.find(
    (indexRoom) => indexRoom.category == category
  );

  index = indexRoom.indexValue;
  return index;
}

export const eventsButtonsSlider = () => {
  let allNextImg = document.querySelectorAll(".next");
  let allPrevImg = document.querySelectorAll(".prev");
  let categoryArrow;

  allNextImg.forEach((aNextImg) => {
    aNextImg.addEventListener("click", () => {
      categoryArrow = aNextImg.dataset.category;
      controlsSlider(aNextImg, "next", categoryArrow);
    });
  });

  allPrevImg.forEach((aPrevImg) => {
    aPrevImg.addEventListener("click", () => {
      categoryArrow = aPrevImg.dataset.category;
      controlsSlider(aPrevImg, "prev", categoryArrow);
    });
  });
};
