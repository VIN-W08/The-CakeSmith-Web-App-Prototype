<?php
    require "functions.php";
    //var_dump(query("SELECT customerName,customerPhone,whatsappContact,lineContact,customerAddress FROM Customer"));
    if(isset($_POST["cout_submitBtn"])){
        $name = $_POST["name"];
        $phone_num = $_POST["phone_num"];
        $socialMedia = $_POST["cbox_social_media"];
        $address = $_POST["address"];
        //var_dump($_POST);

        $waNumber = [];
        if(in_array("WhatsApp",$socialMedia)){
            //echo "WhatsApp exist<br>";
            $waNumber = $_POST["WA_num"]; 
        }
        $lineId = [];
        if(in_array("Line",$socialMedia)){
            //echo "Line exist<br>";
            $lineId = $_POST["line_id"];
        }

        if(sizeof($socialMedia)==1){
            if(in_array("WhatsApp",$socialMedia)){
                $lineId = "";
                echo $name." ".$phone_num." ";
                print_r($socialMedia[0]);
                echo ": ".$waNumber." ".$address;
            }
            else if(in_array("Line",$socialMedia)){
                $waNumber = "";
                echo $name." ".$phone_num." ";
                print_r($socialMedia[0]);
                echo ": ".$lineId." ".$address;
            }
        }
        else if(sizeof($socialMedia)==2){
            echo $name." ".$phone_num." ";
            print_r($socialMedia[0]);
            echo ": ".$waNumber,"; ";
            print_r($socialMedia[1]);
            echo ": ".$lineId." ".$address;
        }
        $query = 
            "INSERT INTO Customer(customerName,customerPhone,whatsappContact,lineContact,customerAddress)
            VALUES('$name','$phone_num','$waNumber','$lineId','$address')";
        query($query);
        // foreach($_POST["cbox_social_media"] as $each){
        //     echo $each;
        // }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The CakeSmith Check Out</title>
    <link rel="shortcut icon" href="../assets/The Cakesmith logo.jpg">
    <link rel="stylesheet" href="cakesmith home style.css">
    <link rel="stylesheet" href="cakesmith check out style.css">
    <script src="check out.js" async></script>
</head>
<body>
    <div id="header">
        <img src="../assets/The Cakesmith logo.jpg" alt="The CakeSmith Logo" id="logo">
        The CakeSmith
    </div>

    <div id=nav>
        <a href="cakesmith home.html" id="nav_home"><img src="../assets/home icon.png" class="home_icon">Home</a>
        <a href="cakesmith cart.html" id="nav_cart"><img src="../assets/cart icon.png" class="cart_icon">Cart</a>
    </div>

    <h1 id="check_out_title">Check Out</h1>

    <form id="form_check_out" action="" method="post">
        <label for="name">Name</label><br><input type="text" id="name" name="name" required><br><br>
        <label for="phone_num">Phone Number</label><br><input type="text" id="phone_num" name="phone_num" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" required><br><br>
        <label>Social Media</label>
        <div id="cboxes_social_media">
            <input type="checkbox" class="cbox_social_media" name="cbox_social_media[]" value="WhatsApp"> WhatsApp | Number: <input type="text" class="text_input" name="WA_num" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" disabled><br>
            <input type="checkbox" class="cbox_social_media" name="cbox_social_media[]" value="Line"> Line<span id="verLine_lineOp">|</span> ID: <input type="text" class="text_input" name="line_id" disabled><br><br>
        </div>
        <label for="address">Address</label><br><input type="text" id="address" name="address" required><br><br>
        <label>Order Cart</label><br><a href="cakeSmith cart.html" id="go_to_cart">Go to Cart</a><br><br>
        <button type="submit "id="cout_submitBtn" name="cout_submitBtn">Submit</button>
    </form>

</body>
</html>