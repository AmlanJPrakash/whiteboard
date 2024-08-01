// select the element

let pencilElement = document.querySelector("#pencil");
let eraserElement = document.querySelector("#eraser");
let stickyElement = document.querySelector("#sticky");
let uploadElement = document.querySelector("#upload");
let downloadElement = document.querySelector("#download");
let undoElement = document.querySelector("#undo");
let redoElement = document.querySelector("#redo");


// create event listeners

pencilElement.addEventListener("click", function tellPencil(){
console.log("pencil clicked");
})

eraserElement.addEventListener("click", function telleraser(){
console.log("eraser clicked");
})

stickyElement.addEventListener("click", function tellSticky(){
console.log("sticky clicked");
})

uploadElement.addEventListener("click", function tellupload(){
console.log("upload clicked");
})

downloadElement.addEventListener("click", function tellDownload(){
console.log("download clicked");
})

undoElement.addEventListener("click", function tellUndo(){
console.log("undo clicked");
})

redoElement.addEventListener("click", function tellRedo(){
console.log("redo clicked");
})  

// select canvas tag and give it full height and width 

let canvas = document.querySelector("#board");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let tool = canvas.getContext("2d");
// draw something on canvas

/*****************tool selector logic***********/
let toolsArr = document.querySelectorAll(".tool");
let currentTool = "pencil";

for (let i = 0; i < toolsArr.length; i++) {
    toolsArr[i].addEventListener("click", function (e) {
        const toolName = toolsArr[i].id;
        if (toolName == "pencil") {
            currentTool = "pencil";
            tool.strokeStyle = "blue";
            console.log("pencil clicked");
        }
        else if (toolName == "eraser") {
            currentTool = "eraser";
            tool.strokeStyle = "#f0f0f0";
            tool.lineWidth = 5;

        } else if (toolName == "download") {
            console.log("download clicked");
            currentTool = "download";
            downloadFile();
        }
        else if (toolName == "sticky") {
            currentTool = "sticky";
            createSticky();

        } else if (toolName == "upload") {
            currentTool = "upload";
            console.log(e.target)
            uploadFile();
        }
        else if (toolName == "undo") {
            currentTool = "undo";
            undoFN();
        } else if (toolName == "redo") {
            console.log("redo clicked");
            redoFN();
        }
    })
}
let undoStack = [];
let redoStack = [];
let isDrawing = false;
/*******pencil***********/
canvas.addEventListener("mousedown", function (e) {
 
    let sidx = e.clientX;
    let sidy = e.clientY;
    // drawing will start
    tool.beginPath();
    // jha se press -> canvas
    let toolBarHeight = getYDelta();
    tool.moveTo(sidx, sidy - toolBarHeight);
    isDrawing = true;
    let pointDesc = {
        desc: "md",
        x: sidx,
        y: sidy - toolBarHeight
    }
    undoStack.push(pointDesc);

})
canvas.addEventListener("mousemove", function (e) {
    if (isDrawing == false)
        return;
    let eidx = e.clientX;
    let eidy = e.clientY;
    let toolBarHeight = getYDelta();
    tool.lineTo(eidx, eidy - toolBarHeight);
    tool.stroke();
    let pointDesc = {
        desc: "mm",
        x: eidx,
        y: eidy - toolBarHeight
    }
    // last me add krna h
    undoStack.push(pointDesc);
})
// ***********path draw *******
canvas.addEventListener("mouseup", function (e) {
    isDrawing = false;
})

/********helper function****/
let toolBar = document.querySelector(".toolbar");
function getYDelta() {
    let heightOfToolbar = toolBar.getBoundingClientRect().height;
    return heightOfToolbar
}

/********** create sticky ***********/

function createSticky() {

// element create
    let stickyDiv = document.createElement("div");
    let navDiv = document.createElement("div");
    let closeDiv= document.createElement("div");
    let minimizeDiv = document.createElement("div");
    let textArea = document.createElement("textarea");
 
// class styling    
    stickyDiv.setAttribute("class", "sticky");
    navDiv.setAttribute("class", "nav");
    textArea.setAttribute("class", "text-area");

    closeDiv.innerTest = "X";
    minimizeDiv.innerText = "Min";

// append
    stickyDiv.appendChild(navDiv);
    stickyDiv.appendChild(textArea);
    navDiv.appendChild(minimizeDiv);
    navDiv.appendChild(closeDiv);
    document.body.appendChild(stickyDiv);


    /***********  Functionality*************/

    let isMinimized = false;
    closeDiv.addEventListener("click", function () {
        stickyDiv.remove();
    })
    minimizeDiv.addEventListener("click", function () {
        textArea.style.display =isMinimized== true?"block":"none";
        isMinimized = !isMinimized;

    })

    let isStickyDown = false;

    // navbar
    navDiv.addEventListener("mousedown", function (e) {
 
        initialx = e.clientX;
        initialy = e.clientY;
        isStickyDown = true;
    
    })
    navDiv.addEventListener("mousemove", function (e) {
        if (isStickyDown == true){
    
        let finalx = e.clientX;
        let finaly = e.clientY;

        let dx = finalx - initialx;
        let dy = finaly - initialy;

        let { top, left } = stickyDiv.getBoundingClientRect();
        
        stickyDiv.style.top = top + dy + "px";
        stickyDiv.style.left = left + dx + "px";
        initialx = finalx;
        initialy = finaly;
    }

    })
    navDiv.addEventListener("mouseup", function () {
        isStickyDown = false;
    })
}

function createOuterShell(){

    // element create
    let stickyDiv = document.createElement("div");
    let navDiv = document.createElement("div");
    let closeDiv= document.createElement("div");
    let minimizeDiv = document.createElement("div");
    
 
// class styling    
    stickyDiv.setAttribute("class", "sticky");
    navDiv.setAttribute("class", "nav");
    textArea.setAttribute("class", "text-area");

    closeDiv.innerTest = "X";
    minimizeDiv.innerText = "Min";

// append
    stickyDiv.appendChild(navDiv);
    stickyDiv.appendChild(textArea);
    navDiv.appendChild(minimizeDiv);
    navDiv.appendChild(closeDiv);
    document.body.appendChild(stickyDiv);


    /***********  Functionality*************/

    let isMinimized = false;
    closeDiv.addEventListener("click", function () {
        stickyDiv.remove();
    })
    minimizeDiv.addEventListener("click", function () {
        textArea.style.display =isMinimized== true?"block":"none";
        isMinimized = !isMinimized;

    })

    let isStickyDown = false;

    // navbar
    navDiv.addEventListener("mousedown", function (e) {
 
        initialx = e.clientX;
        initialy = e.clientY;
        isStickyDown = true;
    
    })
    navDiv.addEventListener("mousemove", function (e) {
        if (isStickyDown == true){
    
        let finalx = e.clientX;
        let finaly = e.clientY;

        let dx = finalx - initialx;
        let dy = finaly - initialy;

        let { top, left } = stickyDiv.getBoundingClientRect();
        
        stickyDiv.style.top = top + dy + "px";
        stickyDiv.style.left = left + dx + "px";
        initialx = finalx;
        initialy = finaly;
    }

    })
    navDiv.addEventListener("mouseup", function () {
        isStickyDown = false;
    })

    return stickyDiv;
}

let inputTag = document.querySelector(".input-tag");
function uploadFile() {
    console.log("file upload clicked");
    inputTag.click();

    inputTag.addEventListener("change", function(){
    
        let data = inputTag.files[0];

        let img = document.createElement("img");
        let url = URL.createObjectURL(data);
        img.src = url;
        img.setAttribute("class", "upload-img");

        let stickyDiv = createOuterShell();
        stickyDiv.appendChild(img);
    })


}

function downloadFile(){

    let a= document.createElement("a");
    a.download = "file.png";

    let url = canvas.toDataURL("image/png:base64");

    a.href = url;

    a.click();
    a.remove();

                                           
}                 
function redraw(){
    for(let i = 0; i < undoStack.length; i++){
        let {x, y,desc} = undoStack[i];
        if(desc == "md"){
            tool.beginPath();
            tool.moveTo(x, y);
        } else if(desc == "mm"){
            tool.lineTo(x, y);
            tool.stroke();
        }
    }
}
function undoFN(){
    tool.clearRect(0, 0, canvas.width, canvas.height);

    while(undoStack.length > 0){
        undoStack.pop();
        redraw();   
    }
}

function redoFN(){
    if (redoStack.length >0){
        tool.clearRect(0, 0, canvas.width, canvas.height);
        undoStack.push(redoStack.pop());
        redraw();
    }
}
