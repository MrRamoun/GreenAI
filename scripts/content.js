chrome.runtime.sendMessage({from:"content"}); //first, tell the background page that this is the tab that wants to receive the messages.

// when the button is clicked
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background") {
    var status = msg.status;
    //here you use the values as you wish, for example:
    //document.getElementById("anInput").value = first;
    if (status) {
        main();
    }
  }
});


function main() {
    imp();
    html2canvas(document.querySelector("body")).then(canvas => {
        let image = convertCanvasToImage(canvas);
        let colors = clrtheif(image);
        let isGreen = searchColors(colors);
        if (isGreen) {
            console.log("found Green");
        }
    });
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

function clrtheif(img) {    
    var colorThief = new ColorThief();
    var sourceImage = img;

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
    return colors;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;
    
    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    
    return [h,s,l];
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function searchColors (colors) {
    let greens = [];
    colors.forEach(color => {
        colorHsl = rgbToHsl(color[0], color[1], color[2]);
        if ((colorHsl[0] > 74) && (colorHsl[0] < 154)) {
            if (colorHsl[1] > 16 && colorHsl[1] < 100) {
                if (colorHsl[2] > 3 && colorHsl[2] < 90) {
                    greens.push(colorHsl);                    
                }
            }
        }
    });
    return !!greens;
}

function imp() {
    // html2canvas
    var html2canvasCDN = document.createElement('script');  
    html2canvasCDN.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js');
    html2canvasCDN.setAttribute('integrity', "sha512-jzL0FvPiDtXef2o2XZJWgaEpVAihqquZT/tT89qCVaxVuHwJ/1DFcJ+8TBMXplSJXE8gLbVAUv+Lj20qHpGx+A==");
    html2canvasCDN.setAttribute('crossorigin', "anonymous");

    // viberant cdn
    var vibrentCDN = document.createElement('script');  
    vibrentCDN.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/vibrant.js/1.0.0/Vibrant.js');
    vibrentCDN.setAttribute('integrity', "sha512-aDJJGhAtzNs7WUL6Pzwh+YED+jTF2jrTSUB7xpG8DrknQwaiHg/v8YQD/Klg19BEVbApDKwjAAPNxB1QAgl4Ww==");
    vibrentCDN.setAttribute('crossorigin', "anonymous");
    
    // colortheif cdn
    var clrtheifCDN = document.createElement('script');
    clrtheifCDN.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.umd.js");
    clrtheifCDN.setAttribute('integrity', "sha512-mMe7BAZPOkGbq+zhRBMNV3Q+5ZDzcUEOJoUYXbHpEcODkDBYbttaW7P108jX66AQgwgsAjvlP4Ayb/XLJZfmsg==");
    clrtheifCDN.setAttribute('crossorigin', "anonymous");
    
    // add all cdns to hompe page
    document.body.appendChild(html2canvasCDN);
    // document.head.appendChild(vibrentCDN);
    document.head.appendChild(clrtheifCDN);
}

window.addEventListener("load", main);