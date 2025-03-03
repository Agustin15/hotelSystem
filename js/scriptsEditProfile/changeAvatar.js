import { PATCHUserImage } from "../scriptsMaintenance/scriptsUsers/methodsFetch.js";
import { displayForm } from "./userData.js";

let user, mediaStream, modal;
let imageSuccesfully = false;

export const changeAvatar = (dataUser) => {
  user = dataUser;

  modal = document.querySelector(".modal");
  modal.style.display = "flex";
  modal.innerHTML = `
  
  <div class="containChangeAvatar">
  <div class="closeMain">
  <button class="btnCloseMain">X</button>
  </div>

  <div class="modalCamera">
  <div class="containVideoCamera">
  <div class="close">
  <button>X</button>
  </div>
  <video autoplay="true" id="videoCamera"></video>

  <button class="takeAPhoto">
  <img src="../../../img/camera.png">
  </button>
  <span class="errorCamera">Ups, no se pudo cargar la videocamara</span>
  <div class="photoTaked">
  <img src="../../../img/picture.png">
  </div>
  <button class="btnSwitch">Elegir</button>
  <span class="msjSuccesfully">¡Foto cargada exitosamente!</span>
  </div>
  </div>

  <div class="title">
  <h3>Actualizar foto</h3>
  <img src="../../../img/editar.png">
  </div>

 <form id="formChangeAvatar">
    <label>Ingresa nueva foto de perfil</label>
    <div class="options">
   <div class="file-select" id="src-file1" >
   <input type="file" accept="image/*" name="image">
   </div>
   <button type="button" class="btnOpenCamera">Tomar foto</button>
   </div>
   <div class="newImage">
    <img id="newAvatar" src="../../../img/picture.png">
 </div>
 <div class="msjUpload">
   <span>Imagen cargada:</span>
   <img src="../../../img/deleteService.png">
   </div>

 <button class="btnUpdate" type="submit">
 Actualizar
 <img class="loadingChangeAvatar" src="../../../img/spinnerBooking.gif">
 </button>

   <div class="alertChangeAvatar">
                    <img>
                    <div class="body">
                        <span></span>
                        <p></p>
                    </div>
                </div>
   </form>
 

  </div>
  `;

  let inputUpload = document.querySelector("input");
  let imgUploadState = document
    .querySelector(".msjUpload")
    .querySelector("img");

  let btnCloseMain = document.querySelector(".btnCloseMain");
  let newAvatar = document.querySelector("#newAvatar");
  let btnOpenCamera = document.querySelector(".btnOpenCamera");
  let modalCamera = document.querySelector(".modalCamera");

  btnCloseMain.addEventListener("click", () => {
    modal.style.display = "none";
  });

  inputUpload.addEventListener("change", () => {
    uploadPhoto(inputUpload, imgUploadState, newAvatar);
  });

  btnOpenCamera.addEventListener("click", () => {
    modalCamera.style.display = "flex";
    camera(modalCamera, newAvatar, imgUploadState);
  });

  submitForm(newAvatar);
};

const uploadPhoto = (inputUpload, imgUploadState, newAvatar) => {
  let imageUpload = inputUpload.files[0];

  if (imageUpload) {
    imgUploadState.src = "../../../img/uploaded.png";
    const reader = new FileReader();
    reader.readAsDataURL(imageUpload);
    reader.addEventListener("load", () => {
      newAvatar.src = reader.result;
      newAvatar.style.height = "100%";
      newAvatar.style.width = "100%";
      imageSuccesfully = true;
    });
  }
};

const camera = async (modalCamera, newAvatar, imgUploadState) => {
  let videoCamera = document.querySelector("#videoCamera");
  let btnClose = document.querySelector(".close").querySelector("button");
  let btnAccept = document.querySelector(".btnSwitch");
  let btnTakeAPhoto = document.querySelector(".takeAPhoto");
  let msjSuccesfully = document.querySelector(".msjSuccesfully");
  let photoTaked = document.querySelector(".photoTaked").querySelector("img");

  btnClose.addEventListener("click", () => {
    modalCamera.style.display = "none";
    msjSuccesfully.style.display = "none";
    cleanValuesCamera(photoTaked);
  });

  try {
    if (navigator.mediaDevices.getUserMedia) {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      if ("srcObject" in videoCamera) {
        videoCamera.srcObject = mediaStream;
      }
    } else {
      throw new Error("Ups no se pudo cargar la videocamara");
    }
  } catch (error) {
    console.log(error);
    document.querySelector(".errorCamera").style.display = "flex";
  }

  btnTakeAPhoto.addEventListener("click", () => {
    html2canvas(videoCamera).then(function (canvas) {
      let photoTakedURLCanva = canvas.toDataURL();

      photoTaked.src = photoTakedURLCanva;
      photoTaked.style.width = "8rem";
      photoTaked.style.height = "8rem";
    });

    btnAccept.addEventListener("click", () => {
      if (photoTaked.src.indexOf("picture.png") == -1) {
        newAvatar.src = photoTaked.src;
        newAvatar.style.height = "100%";
        newAvatar.style.width = "100%";

        msjSuccesfully.style.display = "flex";
        imgUploadState.src = "../../../img/uploaded.png";
        imageSuccesfully = true;
        setTimeout(() => {
          msjSuccesfully.style.display = "none";
        }, 2000);
        cleanValuesCamera(photoTaked);
      }
    });
  });
};

const cleanValuesCamera = (photoTaked) => {
  photoTaked.src = "../../../img/picture.png";
  photoTaked.style.width = "5rem";
  photoTaked.style.height = "5rem";

  if (mediaStream) {
    let tracks = mediaStream.getTracks();
    tracks[0].stop();
  }
};

const submitForm = (newAvatar) => {
  let form = document.querySelector("#formChangeAvatar");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!imageSuccesfully) {
      alert(
        "Error",
        "../../../img/advertenciaLogin.png",
        "Ups, aun no se cargó ninguna imagen",
        false
      );
    } else {
      let resultUpdated = await updateUserImage(newAvatar);
      if (resultUpdated) {
        alert(
          "¡Exito!",
          "../../../img/tickAdmin.png",
          "¡Imagen de perfil actualizada exitosamete!",
          true
        );

        displayForm();
      }
    }
  });
};

const updateUserImage = async (newAvatar) => {
  let resultUpdated;

  const userToUpdate = {
    idUser: user.idUsuario,
    image: newAvatar.src
  };

  loadingChangeAvatar(true);
  try {
    let result = await PATCHUserImage(userToUpdate);
    if (result.error) {
      throw result.error;
    }
    if (result) {
      resultUpdated = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingChangeAvatar(false);
    if (!resultUpdated) {
      alert(
        "Error",
        "../../../img/advertenciaLogin.png",
        "Ups, aun no se pudo actualizar la imagen de perfil",
        false
      );
    }
    return resultUpdated;
  }
};

const alert = (title, icon, msj, state) => {
  let alert = document.querySelector(".alertChangeAvatar");
  alert.querySelector("span").textContent = title;
  alert.querySelector("p").textContent = msj;
  alert.querySelector("img").src = icon;

  if (state) {
    alert.classList.add("alertChangeAvatarCorrect");
  } else {
    alert.classList.add("alertChangeAvatarError");
  }

  setTimeout(() => {
    if (state) {
      alert.classList.remove("alertChangeAvatarCorrect");
    } else {
      alert.classList.remove("alertChangeAvatarError");
    }
  }, 3000);
};

const loadingChangeAvatar = (state) => {
  let loading = document.querySelector(".loadingChangeAvatar");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};
