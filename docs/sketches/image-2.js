let img;
let sharp = [0,-1,0,
			-1,5,-1,
			 0,-1,0]
let blur  = [1/16, 1/8, 1/16,
			 1/8 , 1/4, 1/8,
			 1/16, 1/8, 1/16]
let edge  = [1, 0, -1,
			 0, 0, 0,
			-1, 0, 1]
let norm  = [0, 0, 0,
			 0, 1, 0,
			 0, 0, 0]


function preload() {
	img = loadImage('/vc/docs/sketches/cuy.jpg');
	img2 = loadImage('/vc/docs/sketches/cuy.jpg');
	img3 = loadImage('/vc/docs/sketches/cuy.jpg');
	img4 = loadImage('/vc/docs/sketches/cuy.jpg');
}

function setup() {
	createCanvas(590, 740);
	background(240, 240, 240);
	image(img, 5,240, img.width, img.height);
	image(kernelEdit(img2, sharp), 300,5, img.width, img.height);
	image(kernelEdit(img3, blur), 300,240, img.width, img.height);
	image(kernelEdit(img4, edge), 300,490, img.width, img.height);
}

function kernelEdit(i, edit){
	i.loadPixels();
	for(var x=0; x<i.width ; x++){
		for(var y=0; y<i.height ; y++){
			if( (x>2  &&  x<i.width-2)   &&   (y>2  &&  y<i.height-2) ){
				var acum = [0,0,0,255] 
				
				var matrix =  [i.get(x-1,y-1), 	i.get(x,y-1), 	i.get(x+1,y-1),
							   i.get(x-1,y), 	i.get(x,y), 	i.get(x+1,y),
							   i.get(x-1,y+1), 	i.get(x,y+1), 	i.get(x+1,y+1)];

				for (var k=0; k<9; k++){
					acum[0] += matrix[k][0]*edit[k]
					acum[1] += matrix[k][1]*edit[k]
					acum[2] += matrix[k][2]*edit[k]
					acum[3] += matrix[k][3]
				}

				i.set(x,y,acum);
			}
		}
	}
	i.updatePixels();
	return i;
}