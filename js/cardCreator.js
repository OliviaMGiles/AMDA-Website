/* /Olivia Giles
	2/19/2018
*/
//font 
var nameFont = "16pt sans-serif";
var numberFont = "28pt sans-serif";
var normalFont = "10pt sans-serif";
var boldFont = "bold 10pt sans-serif";

//positioning 
var txtStartPosX = 30;    //the x starting position for action box text
var numberPosX = 305; // x position for class and morale
var actionIconPosX = 275;

//uploaded image
uploadedImg = new Image();

function draw(){  
	//create card on canvas
	var canvas = document.getElementById("cardCanvas");
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
	}
	
	//card base is chosen from cardType drop down
	cardImage = new Image();
	switch(document.getElementById("cardType").value){
		case 'Combat Character':
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
	
	
	//wait for image to load to draw on the canvas
	//all other elements must be drawn on top of the base image
	cardImage.onload = function(){
		ctx.drawImage(cardImage,0,0,350,500);
		
		//name
		ctx.font = nameFont;
		ctx.textAlign = "left";
		ctx.fillText(document.getElementById("cName").value, 65,35);
		
		//uploaded image
		uploadedImg.onload = function(){
			ctx.drawImage(uploadedImg, 30,45,230,200);
			console.log(uploadedImg.src);
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
		var action1Image = new Image();
		switch(document.getElementById("action1Type").value){
			case "ability":
				action1Image.src = "img/abilityInfy.png";
				document.getElementById("pwrField1").style.display ="none";
				document.getElementById("action1pwr").value = "";
				break;
			case "attack":
				action1Image.src = "img/abilityPwr.png";
				document.getElementById("pwrField1").style.display ="table-row";
				break;
			case "strategy":
				action1Image.src = "img/abilityStrategy.png";
				document.getElementById("pwrField1").style.display ="none";
				document.getElementById("action1pwr").value = "";
		}
		action1Image.onload = function(){
			ctx.drawImage(action1Image,actionIconPosX,action1PosY-5,50,50);
		}
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
		var action2Image = new Image();
		//action type determins the icon to display and if the power field is available
		switch(document.getElementById("action2Type").value){
			case "ability":
				action2Image.src = "img/abilityInfy.png";
				document.getElementById("pwrField2").style.display ="none";
				document.getElementById("action2pwr").value = "";
				break;
			case "attack":
				action2Image.src = "img/abilityPwr.png";
				document.getElementById("pwrField2").style.display ="table-row";
				break;
			case "strategy":
				action2Image.src = "img/abilityStrategy.png";
				document.getElementById("pwrField2").style.display ="none";
				document.getElementById("action2pwr").value = "";
		}
		action2Image.onload = function(){
			ctx.drawImage(action2Image,actionIconPosX,action2PosY-5,50,50);
		}
			//power
		ctx.font = numberFont;
		ctx.textAlign = "center";
		ctx.fillText(document.getElementById("action2pwr").value, actionIconPosX+25, action2PosY+75);
		ctx.textAlign = "start";
		
		
		//credits
		var creditBarPosX = 488;
		if(document.getElementById("universeID").value){
			ctx.font = normalFont;
			ctx.fillText("Universe: "+document.getElementById("universeID").value, 15, creditBarPosX);
		}
		
		if(document.getElementById("artCredit").value){
			ctx.textAlign = "right";
			ctx.fillText("Artist: "+document.getElementById("artCredit").value, 335, creditBarPosX);
		}
	}
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


