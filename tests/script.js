var vibrentCDN = document.createElement('script');  
vibrentCDN.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/vibrant.js/1.0.0/Vibrant.js');
vibrentCDN.setAttribute('integrity', "sha512-aDJJGhAtzNs7WUL6Pzwh+YED+jTF2jrTSUB7xpG8DrknQwaiHg/v8YQD/Klg19BEVbApDKwjAAPNxB1QAgl4Ww==");
vibrentCDN.setAttribute('crossorigin', "anonymous");

var clrtheifCDN = document.createElement('script');
clrtheifCDN.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js");

document.head.appendChild(vibrentCDN);
document.head.appendChild(clrtheifCDN);


let btn = document.querySelector('#capture');
let vbr = document.querySelector('#viber');

btn.onclick = () => {
        html2canvas(document.querySelector("body")).then(canvas => {
            let image = convertCanvasToImage(canvas);
            document.querySelector("img").replaceWith(image);
            // document.body.appendChild(canvas)
        });
};

vbr.onclick = clrtheif;

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

function userVibrant() {
    var img = document.querySelector("img");
    var c = 0;
    
        console.log(img);
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches()
        for (var swatch in swatches)
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
                let hex = swatches[swatch].getHex();
                console.log(swatch, hex);
                createColor(hex);
                c++;
            }
        console.log(c);
        /*
        * Results into:
        * Vibrant #7a4426
        * Muted #7b9eae
        * DarkVibrant #348945
        * DarkMuted #141414
        * LightVibrant #f3ccb4
        */
}

function clrtheif() {
    let clrs = document.querySelector('.clrs');
    removeAllChildNodes(clrs);

    var colorThief = new ColorThief();
    var sourceImage = document.querySelector('img');

    // Display main color
    // e.g [125, 189, 193]
    console.log(
        colorThief.getColor(sourceImage)
    );

    // Display palette of colors
    // e.g [[55,37,29],[213,193,136],[110,204,223]]
    console.log(
        colorThief.getPalette(sourceImage)
    );
    let domni = colorThief.getPalette(sourceImage);
    // createColor(rgbToHex(domni[0], domni[1], domni[2]));
        
    let colors = colorThief.getPalette(sourceImage);
    colors.unshift(domni);
    colors.forEach(color => {
        createColor(rgbToHex(color[0], color[1], color[2]));
    });
}

function createColor(clr) {
    let clrs = document.querySelector('.clrs');
    let newDiv = document.createElement('div');

    newDiv.style.borderRadius = "50%";
    newDiv.style.height = "50px";
    newDiv.style.width = "50px";
    newDiv.style.backgroundColor = clr;

    clrs.appendChild(newDiv);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

