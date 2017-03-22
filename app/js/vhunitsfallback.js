//adjusting vh units for mobile view

// var borderWidth = getComputedStylePropertyValue(document.getElementsByTagName("div")[0], "border-width");
var triangle = document.getElementsByClassName('triangle');
for(var i=0; i <= triangle.length; i++){
	var borderWidth = i.css("border-bottom-width");
	console.log( borderWidth);
}