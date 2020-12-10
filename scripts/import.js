// html2canvas
var html2canvasCDN = document.createElement('script');  
html2canvasCDN.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js');
html2canvasCDN.setAttribute('integrity', "sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==");
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
document.head.appendChild(html2canvasCDN);
// document.head.appendChild(vibrentCDN);
document.head.appendChild(clrtheifCDN);


