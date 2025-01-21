<?php
setcookie("userToken", "", time() - 1);
header("location:../../views/loginAdmin");

?>
