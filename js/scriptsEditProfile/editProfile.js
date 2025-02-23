let modal, imageUpload;

export const changeAvatar = () => {
  modal = document.querySelector(".modal");
  modal.style.display = "flex";
  modal.innerHTML = `
  
  <div class="containChangeAvatar">
  <div class="title">
  <h3>Actualizar foto</h3>
  <img src="../../../img/editar.png">
  </div>

 <form>
    <label>Ingresa nueva foto de perfil</label>
   <div class="file-select" id="src-file1" >
   <input type="file" accept="image/*" name="image">
   </div>
   <div class="newImage">
   <div class="image">
    <img id="newAvatar" src="../../../img/picture.png">
   </div>
   <div class="msjUpload">
   <span>Imagen subida:</span>
   <img src="../../../img/deleteService.png">
   </div>
 </div>

 <button type="submit">Actualizar</button>

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
  let newAvatar = document.querySelector("#newAvatar");
  let btnUpdate = document.querySelector(".btnUpdate");

  inputUpload.addEventListener("change", () => {
    changeIcon(inputUpload, imgUploadState, newAvatar);
  });
  btnUpdate.addEventListener("click", () => {
    updateUser(inputUpload);
  });
};

const changeIcon = (inputUpload, imgUploadState, newAvatar) => {
  imageUpload = inputUpload.files[0];

  if (imageUpload) {
    imgUploadState.src = "../../../img/uploaded.png";
    const reader = new FileReader();
    reader.readAsDataURL(imageUpload);
    reader.addEventListener("load", () => {
      newAvatar.src = reader.result;
    });
  }
};
const updateUser = () => {
  if (!imageUpload) {
  }
};

