
function inputAlert(inputName){

let inputsName= [...document.getElementsByName(inputName)];

     inputsName[0].classList.add("inputAlert");


}

function setUser(event){

  event.preventDefault();
  const form=event.target;

  const formUser=new FormData(form);
  let validate=null;
  const user={};

  formUser.forEach((v,k)=>{
   
    if(v.trim()==""){
      validate="Complete todos los campos";
      inputAlert(k); 
      return;
    }else{
    user[k]=v;
  
    }
});
  
if(validate){

  alertaLoginAdmin(validate);
}else{

  comprobateUser(user);
}

}


function loading(status){

  if(status){
    document.querySelector(".spinner").style.display="block";
  }else{
    document.querySelector(".spinner").style.display="none";
  }

}


async function comprobateUser(user){

  loading(true);

  let userJson=JSON.stringify(user);
  try {
    
  const response= await fetch("http://localhost/sistema%20Hotel/controller/admin/autenticacionLogin.php?user="+userJson,{

      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
    

  });

  const result= await response.json();

  
  if(result.respuesta==true){

    location.href="panelAdmin.php";    
  }else{

    throw result.respuesta;
  }


} catch (error) {
 
  alertaLoginAdmin(error);

}finally{

  loading(false);

}



}