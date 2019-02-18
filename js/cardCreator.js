/* /Olivia Giles
	2/19/2018
*/
//font 
var nameFont 	= "16pt sans-serif";
var numberFont 	= "28pt sans-serif";
var normalFont 	= "10pt sans-serif";
var boldFont 	= "bold 10pt sans-serif";
var italicFont 	= "italic 10pt sans-serif";

//positioning 
var txtStartPosX = 30;    //the x starting position for action box text
var numberPosX = 305; // x position for class and morale
var actionIconPosX = 275;
var centerX = 175;

//uploaded image
var uploadedImg = new Image();

//preload images
var images = new Array();
function preload(){
	for(i=0; i <preload.arguments.length;i++){
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}
preload(
	"img/combatCharacter.png",
	"img/supportCharacter.png",
	"img/hybridCharacter.png",
	"img/specialCharacter.png",
	"img/item.png",
	"img/event.png",
	"img/lightning.png",
	"img/terrain.png",
	"img/abilityInfy.png",
	"img/abilityPwr.png",
	"img/abilityStrategy.png"
)

function onLoad(){
}

function updatePage(){
	updateForm();
	draw();
}

// Hide or show form elements
function updateForm(){
	// hide and show morale and tag groups depending on card type
	var cardType = document.getElementById("cardType").value;
	switch(cardType){
		case "Combat Character":
		case "Support Character":
		case "Hybrid Character":
		case "Special Character": 
			$(".moraleRow").show();
			$(".tagRow").show();
			$(".characterTags").showOptionGroup();
			$(".itemTags").hideOptionGroup();
			break;
		case "Item":
			$(".moraleRow").hide();
			document.getElementById("cMorale").value = "";	
			$(".tagRow").show();
			$(".characterTags").hideOptionGroup();
			$(".itemTags").showOptionGroup();
			break;
		case "Event":
		case "Lightning Event":			
		case "Terrain":
			$(".moraleRow").hide();
			document.getElementById("cMorale").value = "";
			$(".tagRow").hide();
			$(".characterTags").hideOptionGroup();
			$(".itemTags").hideOptionGroup();
			break;
		default:
			break;	
	}
	//combat characters cannot have strategy actions, support characters cannot attack
	switch(cardType){
		case "Combat Character":
		//	$(".actionType").children('option[value="strategy"]').hide(); //hide strategy 
			$(".actionType").children('option[value="attack"]').show(); 
			break;
		case "Support Character":
			$(".actionType").children('option[value="attack"]').hide(); //hide attack 
		//	$(".actionType").children('option[value="strategy"]').show(); 
			break;
		default:	
		//	$(".actionType").children('option[value="strategy"]').show(); 
			$(".actionType").children('option[value="attack"]').show(); 
	}
	//only show pwr for attack actions
	if(document.getElementById("action1Type").value == "attack"){
		$(".powerRow1").show();
	}else{
		$("#action1pwr").val("");
		$(".powerRow1").hide();
	}
	if(document.getElementById("action2Type").value == "attack"){
		$(".powerRow2").show();
	}else{
		$("#action2pwr").val("");
		$(".powerRow2").hide();
	}
}

// Draw canvas
function draw(){  
	//create card on canvas
	var canvas = document.getElementById("cardCanvas");
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
	}

	//background card image
	cardImage = setCardImage();
	ctx.drawImage(cardImage,0,0,350,500);

	//name
	ctx.font = nameFont;
	ctx.textAlign = "left";
	ctx.fillText(document.getElementById("cardName").value, 65,35);
	
	//uploaded image with clipping path	
	uploadedImg.onload = function(){
		drawUploadedImg(ctx);
	}
	if(uploadedImg){
		drawUploadedImg(ctx);
	}

	//Card class
	ctx.font = numberFont;
	ctx.textAlign = "center";
	ctx.fillText(document.getElementById("cClass").value, numberPosX, 103);
	//Card Morale
	ctx.fillText(document.getElementById("cMorale").value, numberPosX, 195);
	
	//Tags
	var tagObject = document.getElementById("tag");
	//get all selected tags
	var tags = $('#tag').val();
	ctx.textAlign = "left";
	ctx.font = boldFont;
	ctx.fillText(document.getElementById("cardType").value, txtStartPosX,261);
	ctx.font = normalFont;
	ctx.fillText("   - " + tags, txtStartPosX + ctx.measureText(document.getElementById("cardType").value).width,261);
	
	//Action 1
	var action1PosY = 285;
		//name
	ctx.font = boldFont;
	ctx.fillText(document.getElementById("action1Name").value, txtStartPosX, action1PosY);
	ctx.font = normalFont;
		//body. parameters: context, text, x,y, max width, line height
	wrapText(ctx, document.getElementById("action1Description").value, txtStartPosX, action1PosY+16, 250, 16);
		//action icon
	action1Image = setActionIcon(document.getElementById("action1Type").value);
	ctx.drawImage(action1Image,actionIconPosX,action1PosY-5,50,50);
		//power
	ctx.font = numberFont;
	ctx.textAlign = "center";
	ctx.fillText(document.getElementById("action1pwr").value, actionIconPosX+25, action1PosY+75);
	ctx.textAlign = "start";
	
	
	//Action 2
	var action2PosY = 390;
		//name
	ctx.font = boldFont;
	ctx.fillText(document.getElementById("action2Name").value, txtStartPosX, action2PosY);
	ctx.font = normalFont;
		//body. parameters: context, text, x,y, max width, line height
	wrapText(ctx, document.getElementById("action2Description").value, txtStartPosX, action2PosY+16, 250, 16);
		//action icon
	action2Image = setActionIcon(document.getElementById("action2Type").value);
	ctx.drawImage(action2Image,actionIconPosX,action2PosY-5,50,50);
		//power
	ctx.font = numberFont;
	ctx.textAlign = "center";
	ctx.fillText(document.getElementById("action2pwr").value, actionIconPosX+25, action2PosY+75);
	

	//Flavor Text
	ctx.font = italicFont;
	wrapText(ctx, document.getElementById("flavorText").value, centerX, action2PosY+60, 230, 16);
	ctx.textAlign = "left";

	//credits
	ctx.font = normalFont;
	ctx.save();
	ctx.fillStyle = "white";
	ctx.rotate(Math.PI/2);
	ctx.fillText("Version 0.4.0 - "+document.getElementById("cardCrafter").value, 65, -12);
	ctx.fillRect(50,20,100,50);
	ctx.restore();

	var creditBarPosX = 488;
	if(document.getElementById("universeID").value){
		
		ctx.fillText("Universe: "+document.getElementById("universeID").value, 15, creditBarPosX);
	}
	
	if(document.getElementById("artCredit").value){
		ctx.textAlign = "right";
		ctx.fillText("Artist: "+document.getElementById("artCredit").value, 335, creditBarPosX);
	}
}

function setCardImage(){
	//card base is chosen from cardType drop down
	cardImage = new Image();
	switch(document.getElementById("cardType").value){
		case "Combat Character":
			cardImage.src = "img/combatCharacter.png"; 
			break;
		case "Support Character":
			cardImage.src = "img/supportCharacter.png"; 
			break;
		case "Hybrid Character":
			cardImage.src = "img/hybridCharacter.png";
			break;
		case "Special Character":
			cardImage.src = "img/specialCharacter.png";
			break
		case "Item":
			cardImage.src = "img/item.png";
			break;
		case "Event":
			cardImage.src = "img/event.png";
			break;
		case "Lightning Event":
			cardImage.src = "img/lightning.png";
			break;
		case "Terrain":
			cardImage.src = "img/terrain.png";
			break;
		default:
			cardImage.src = 'img/combatCharacter.png'; 	
	}
	return cardImage;
}

function setActionIcon(actionType){
	var actionImage = new Image();
	switch(actionType){
		case "ability":
			actionImage.src = "img/abilityInfy.png";
			break;
		case "attack":
			actionImage.src = "img/abilityPwr.png";
			break;
		case "strategy":
			actionImage.src = "img/abilityStrategy.png";
			break;
		default:
			actionImage.src = "";
	}
	return actionImage;
}

//format text into a block
function wrapText(context, text, x, y, maxWidth, lineHeight){
	var words = text.split(' ');
	var line = '';
	
	for (var n = 0; n <words.length; n++){
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n >0){
			context.fillText(line, x, y);
			line = words[n]+' ';
			y += lineHeight;
		}
		else{
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}

/* code inspired by  https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
*/
function uploadImg(){
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	
	reader.onload = function(){
		uploadedImg.src = reader.result;
		document.getElementById("imageLoaderLabel").innerHTML = file.name;
	} 
	
	if(file){
		reader.readAsDataURL(file);
	}else{
		//uploadedImg.src = "";
	}
}

//draw uploaded image with clipping path
function drawUploadedImg(ctx){
	ctx.save();
	ctx.beginPath();
	ctx.arc(35,35,25,21.8*Math.PI/180, 101.3*Math.PI/180); //trace arc with center at 35,35, radius 25
	ctx.lineTo(30,245);		//left side
	ctx.lineTo(260,245);	//bottom side
	ctx.lineTo(260,45);		//right side
	ctx.clip();				//close path forms top side
	
	ctx.drawImage(uploadedImg, 30,45,230,200);
	
	ctx.restore();
	//TODO: figure out how to scale and move image. Clipping path should allow for moving the picture behind clipping mask.
}

// Hides and shows option groups
// https://hceint.wordpress.com/2011/04/09/hiding-option-groups-optgroups-in-chrome-and-internet-explorer-with-jquery/
$.fn.hideOptionGroup = function() {
	$(this).hide();
	$(this).children().each(function(){
		$(this).attr("disabled", "disabled").removeAttr("selected");
	});
	$(this).appendTo($(this).parent());
   
   }
   
   $.fn.showOptionGroup = function() {
	$(this).show();    
	$(this).children().each(function(){
		$(this).removeAttr("disabled" );
	});
	$(this).prependTo($(this).parent());
	$(this).parent().animate({scrollTop:0},0);
   }

   //convert canvas to an image
   function convertCanvasToImage(canvas){
	   var image = new Image();
	   image.src = canvas.toDataURL("image/png");
	   return image;
   }