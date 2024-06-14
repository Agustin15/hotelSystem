<?php
session_id("login");
session_start();
session_destroy();
header("location:../../views/admin/loginAdmin.php");



?>