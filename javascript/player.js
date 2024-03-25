const prevBtn = document.querySelector(".prevbutton");
const nextBtn = document.querySelector(".nextbutton");
const book = document.querySelector(".book");

const volumeBtn = document.querySelector("#Volume");
const pageBtn = document.querySelector("#GotoPages");
const playBtn = document.querySelector("#PlayPause");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

var mainVolume = 100;
var voiceVolume = 100;
var pageVolume = 100;

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

volumeBtn.addEventListener("click", volume);
pageBtn.addEventListener("click", pageDialog);
playBtn.addEventListener("click", PlayPause);

let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-160px)";
    nextBtn.style.transform = "translateX(160px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

// Next Page Button
function next() {
    // Reset Time
    voices();

    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1: // Page 1
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                document.getElementById("turnpage").play();
                document.getElementById("shutdown").play();
                document.getElementById("prev").style.visibility = "visible";
                break;
            case 2: // Page 2
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                document.getElementById("turnpage").play();
                document.getElementById("tada").play();
                document.getElementById("prev").style.visibility = "visible";
                break;
            case 3: // Back
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                document.getElementById("closebook").play();
                document.getElementById("next").style.visibility = "hidden";
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

// Previous Page Button
function prev() {
    // Voices Reset Time
    voices();

    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2: // Front
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                document.getElementById("closebook").play();
                document.getElementById("prev").style.visibility = "hidden";
                break;
            case 3: // Page 1
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                document.getElementById("prevturnpage").play();
                document.getElementById("shutdown").play();
                document.getElementById("next").style.visibility = "visible";
                break;
            case 4: // Page 2
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                document.getElementById("prevturnpage").play();
                document.getElementById("tada").play();
                document.getElementById("next").style.visibility = "visible";
                break;
            default:
                throw new Error("unkown state");
        }
        
        currentLocation--;
    }
}

// Play Voices
function voices()
{
    document.getElementById("prevturnpage").currentTime = 0;
    document.getElementById("turnpage").currentTime = 0;
    document.getElementById("closebook").currentTime = 0;

    // Pause Time
    document.getElementById("tada").pause();
    document.getElementById("shutdown").pause();

    // Reset Time
    document.getElementById("tada").currentTime = 0;
    document.getElementById("shutdown").currentTime = 0;

    // Check Main Volume
    if (mainVolume == 100)
    {  
        document.getElementById("tada").volume = mainVolume * 0.01;          // Page 1
        document.getElementById("shutdown").volume = mainVolume * 0.01;      // Page 2
    }
    else if (mainVolume == 1)
    {
        document.getElementById("tada").volume = 0.01;                       // Page 1
        document.getElementById("shutdown").volume = 0.01;                   // Page 2
    }
    else
    {
        document.getElementById("tada").volume = mainVolume * 0.01;          // Page 1
        document.getElementById("shutdown").volume = mainVolume * 0.01;      // Page 2
    }

    // Check Voice Volume
    if (voiceVolume == 100)
    {  
        document.getElementById("tada").volume = voiceVolume * 0.01;          // Page 1
        document.getElementById("shutdown").volume = voiceVolume * 0.01;      // Page 2
    }
    else if (voiceVolume == 1)
    {
        document.getElementById("tada").volume = 0.01;                       // Page 1
        document.getElementById("shutdown").volume = 0.01;                   // Page 2
    }
    else
    {
        document.getElementById("tada").volume = voiceVolume * 0.01;          // Page 1
        document.getElementById("shutdown").volume = voiceVolume * 0.01;      // Page 2
    }

    // Check Page Volume
    if (pageVolume == 100)
    {  
        document.getElementById("prevturnpage").volume = pageVolume * 0.01;
        document.getElementById("turnpage").volume = pageVolume * 0.01;
        document.getElementById("closebook").volume = pageVolume * 0.01;
    }
    else if (pageVolume == 1)
    {
        document.getElementById("prevturnpage").volume = 0.01;
        document.getElementById("turnpage").volume = 0.01;
        document.getElementById("closebook").volume = 0.01;
    }
    else
    {
        document.getElementById("prevturnpage").volume = pageVolume * 0.01;
        document.getElementById("turnpage").volume = pageVolume * 0.01;
        document.getElementById("closebook").volume = pageVolume * 0.01;
    }
}

// Show Volume Dialog
var IsVolumeEnable = false;

function volume(){
    if (IsVolumeEnable == false)
    {
        document.getElementById("vDlg").style.visibility = "visible";
        document.getElementById("Volume").style.opacity = "45%";
        IsVolumeEnable = true;
    }
    else
    {
        document.getElementById("vDlg").style.visibility = "hidden";
        document.getElementById("Volume").style.opacity = "75%";
        IsVolumeEnable = false;
    }
}

// Show Volume Dialog
var IsPageEnable = false;

function pageDialog(){
    if (IsPageEnable == false)
    {
        document.getElementById("pDlg").style.width = "375px";
        document.getElementById("pDlg").style.visibility = "visible";
        document.getElementById("GotoPages").style.opacity = "45%";
        IsPageEnable = true;
    }
    else
    {
        document.getElementById("pDlg").style.width = "0px";
        document.getElementById("pDlg").style.visibility = "hidden";
        document.getElementById("GotoPages").style.opacity = "75%";
        IsPageEnable = false;
    }
}

// Play/Pause Pages
var IsPlayEnable = false;

function PlayPause(){
    if (IsPlayEnable == false)
    {
        // Count into 5 pages
        var idk = 0;
        next();

        document.getElementById("imgPlayPause").src = "graphics/pause.png";
        IsPlayEnable = true;

        setTimeout(function()
        {
            idk++;
            if (idk < maxLocation) {
                next();
            }

            alert(idk);
        }, 
        2000);

        if (idk == 3)
        {
            IsPlayEnable = false;
            document.getElementById("imgPlayPause").src = "graphics/play.png";
        }
    }
    else
    {
        document.getElementById("imgPlayPause").src = "graphics/play.png";
        IsPlayEnable = false;
    }
}

// ---------------------------------------------
// Volume Slider
// ---------------------------------------------

// Main Volume
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    mainVolume = parseInt(this.value);

    if (mainVolume >= 75 && mainVolume <= 100 )
    {
        document.getElementById("imgVolume").src = "graphics/volume-100%.png";
    }
    else if (mainVolume >= 50 && mainVolume <= 74 )
    {
        document.getElementById("imgVolume").src = "graphics/volume-50%.png";
    }
    else if (mainVolume >= 11 && mainVolume <= 49 )
    {
        document.getElementById("imgVolume").src = "graphics/volume-25%.png";
    }
    else if (mainVolume >= 1 && mainVolume <= 10 )
    {
        document.getElementById("imgVolume").src = "graphics/volume-10%.png";
    }
    else if (mainVolume == 0)
    {
        document.getElementById("imgVolume").src = "graphics/volume-mute.png";
    }
}

// Voice Volume
var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("demo3");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
    output3.innerHTML = this.value;
    pageVolume = parseInt(this.value);
}

// Page Volume
var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("demo3");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
    output3.innerHTML = this.value;
    pageVolume = parseInt(this.value);
}