

window.onload = function() {
    setScreenSize()
    assingValues()
    getDataFromJson()
    buttonEvents()
    preload()
  };

let logo = document.getElementById("logo")
let targetDiv = document.getElementById("topArea")
let imgName = ["SAM_BG_O_0", "SAM_G_O_0", "SAM_BN_O_0", "SAM_BK_O_0","SAM_R_O_0", "SAM_W_O_0", "SAM_O_O_0", "SAM_BU_O_0" , "SAM_Y_O_0" ]
let contentOrder = [0, 4, 2, 1, 6, 7, 5, 3, 8]
let contentData ={}
let selectedColor
let beginNumber
let overlay 
let popUp
let closeBtn
let productMainImg
let year
let designer
let client
let detail
let productName
let initIndexContent
let rightArrow
let leftArrow
let colorGroupMarker
let homeBtn
let aboutExBtn
let closeAboutExBtn
let aboutExPopup

let sw 
let sh 
let topAreaHeight 
let bottomAreaHeight 

//Clamp Number
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));


function setScreenSize(){


    sw = window.innerWidth
    sh = window.innerHeight
    topAreaHeight = sh * 0.6
    bottomAreaHeight = sh * 0.4

    //set display size
    let dispayArea = document.getElementById("displayArea")
    let top = document.getElementById("topArea")
    let bottom = document.getElementById("bottomArea")
    dispayArea.style.height = sh+"px"
    
    bottom.style.height = bottomAreaHeight +'px'
    top.style.height =  topAreaHeight +'px'

    //diamond grid
    let bottomInstruction = document.getElementById("instruction_diamond_area")
    let diamondNav = document.getElementById("diamond_nav")

    //diamond nav instruction
    bottomInstruction.style.height = bottomAreaHeight*0.2+"px"
    let rowForDiamond = document.getElementsByClassName("diamondRow")
    let diamonds = document.getElementsByClassName("diamond")
    for(i =0; i < rowForDiamond.length;  i++){
        rowForDiamond[i].style.height = bottomAreaHeight*0.2+"px";
    }
    diamondNav.style.height = bottomAreaHeight*0.8+"px"

    //set up the size of the detail popup
    document.getElementsByClassName("overlay")[0].style.height=sh+"px"
    document.getElementsByClassName("overlay")[0].style.width=sw+"px"

    let popupAreaTotal = sh-65
    document.getElementsByClassName("popup")[0].style.height=popupAreaTotal*0.92+"px"
    document.getElementsByClassName("popup")[0].style.width=sw-60+"px"

    document.getElementsByClassName("detailBottomNav")[0].style.height=popupAreaTotal*0.08+"px"
    document.getElementsByClassName("detailBottomNav")[0].style.width=sw-60+"px"


}

function getDataFromJson(){
    //loadingJson
    fetch("Assets/contentJson/contents_2910.json").then(response => {
        return response.json();
    }).then(data => { 
        console.log(data)
        contentData = data["products"]
  
    });
}

function assingValues(){
        //Assign global navigation
        homeBtn = document.getElementsByClassName("homeBtn")[0]
        aboutExBtn = document.getElementsByClassName("aboutEx")[0]
        closeAboutExBtn = document.getElementsByClassName("closeAboutEx")[0]
        aboutExPopup = document.getElementsByClassName("popUpAboutEx")[0]
    
    
        //assign overlay and popup
        overlay = document.getElementsByClassName("overlay")[0]
        popUp = document.getElementsByClassName("popup")[0]
        productMainImg = document.getElementById("productMainImage")
        year = document.getElementById("_year")
        designer = document.getElementById("_designer")
        client = document.getElementById("_client")
        detail = document.getElementById("_detail")
        productName = document.getElementById("_name")
        popUpContentWrapper = document.getElementsByClassName("popupContent")[0]
    
        //switch contents from popup
        rightArrow = document.getElementById("_rightArrow")
        leftArrow = document.getElementById("_leftArrow")
        colorGroupMarker =document.getElementById("_colourGroupMark")
}

function buttonEvents(){
    //Add event homebtn
    document.getElementById("_homeBtn").addEventListener('click', ()=>{
    backTohome()
    resetDiamond(11)
    , false
    })

    //add eventLister for clos btn
    closeBtn = document.getElementById("closeBtn")
    closeBtn.addEventListener("click", ()=>{
        closePopup()
    })

    //switch contents for right arrow from popup
    rightArrow.addEventListener("click", ()=>{
        let max = contentOrder[selectedColor-1]*9+8
        let min = contentOrder[selectedColor-1]*9
        if(initIndexContent < max){
            initIndexContent = initIndexContent+1;
        }else if (initIndexContent = max) {
            initIndexContent = min
        }

        popUpContentWrapper.scrollTop = 0
        setPopUpContent(initIndexContent)
    
    })

    //switch contents for left arrow from popup
    leftArrow.addEventListener("click", ()=>{
        let max = contentOrder[selectedColor-1]*9+8
        let min = contentOrder[selectedColor-1]*9
        
        if(initIndexContent > min){
            initIndexContent = initIndexContent-1;
        }else if (initIndexContent = min) {
            initIndexContent = max
        }
     
        popUpContentWrapper.scrollTop = 0 //reset scrollTop of contents wrapper
        setPopUpContent(initIndexContent)
    })

     //Add event for aboutEx
     document.getElementById("_aboutEx").addEventListener("click",()=>{
        //window.scrollTo( 0, 0 )
        closeAboutExBtn.style.opacity = 1
        closeAboutExBtn.style.visibility = "visible"
        aboutExBtn.style.opacity = 0
        aboutExBtn.style.visibility = "hidden"

        aboutExPopup.scrollTop = 0
        aboutExPopup.style.opacity =1
        aboutExPopup.style.visibility="visible"
     
    })

    //Add event for closeAboutEx
    document.getElementById("_closeAboutEx").addEventListener("click",()=>{
        aboutExBtn.style.opacity = 1
        aboutExBtn.style.visibility = "visible"
        closeAboutExBtn.style.opacity = 0
        closeAboutExBtn.style.visibility = "hidden"
        aboutExPopup.style.opacity =0
        aboutExPopup.style.visibility="hidden"
        document.getElementsByClassName("aboutExContent")[0].scrollTop = 0

    })

    //addevent listener for each diamond
    for(let i=1; i<10; i++){
        let nameOftarget = "m"+i
        let temp = document.getElementById(nameOftarget)
        temp.addEventListener("click", ()=>{
            makeThumbnailGrid(i)
            selectedColor = i
            homeBtn.style.visibility = "visible"
            homeBtn.style.opacity = 1
            temp.src = "Assets/ui_imags/m"+i+"_on.svg"
            resetDiamond(i)
            ,false  
        });
    }
    

}

function makeThumbnailGrid(index){
    console.log("he : "+index);
    logo.style.display = 'none'
    //logo.style.visibility = "hidden"

    if(document.getElementById("products") != null){
        let d = document.getElementById("products")
        //targetDiv.parentNode.removeChild(d)
        d.remove()
    }

    let placeHolder = document.createElement("DIV")
    placeHolder.id = "products" 
    placeHolder.style.height = topAreaHeight*0.8 +"px"
    placeHolder.style.paddingTop = topAreaHeight*0.05+"px"
    placeHolder.style.width = "100%"
    //placeHolder.classList.add("align-items-center")

    let imagPrefix = imgName [index -1]
    selectedGroup = imagPrefix

    // Create thumbnail Grid
    for(let i =0; i< 3; i++){
        let row = document.createElement("DIV")
        row.classList.add("row")
        row.classList.add("align-items-center")

        let colHeight = topAreaHeight*0.25

        row.style.height = colHeight+"px"
        let col = document.createElement("DIV")
        col.classList.add("thumbCol")
        col.classList.add("col")
        col.classList.add("text-center")
        
        for(let j=0; j<3; j++){
            let image = document.createElement("IMG")
            let number = i+(j*3)+1
            
            image.src = "Assets/p_imgs/"+imagPrefix+number+".jpg"
            
            image.style.width = colHeight*0.97+"px"
            image.style.height = colHeight*0.97+"px"
            //image.style.maxWidth = "auto"
            image.addEventListener("click", ()=>{ 
                console.log(number)
                //this is the number of selected image from the image grid from the begin of popup
                beginNumber = number
                initIndexContent = contentOrder[selectedColor-1]*9+(beginNumber-1)

                //open popup and set up contents
                openPopup()
                setPopUpContent(initIndexContent)

            }, false)
            col.appendChild(image)
        }

        row.appendChild(col)
        placeHolder.appendChild(row)
        
    }
    //end--Create thumbnail Grid

    //Add thumbnail grid to main html
    targetDiv.appendChild(placeHolder)

    // Add instruction for the thumbnail Grid
    if(document.getElementById("moreinfo") != null){
        let d = document.getElementById("moreinfo")
        d.remove()
    }
    let instruction = document.createElement("div")
    instruction.classList.add("col")
    instruction.classList.add("text-center")
    instruction.style.height = topAreaHeight*0.13+"px"
    instruction.id = "moreinfo"
    let ins_img = document.createElement("IMG")
    ins_img.src = "Assets/ui_imags/moreinformation.svg"
    ins_img.style.width = "auto"
    ins_img.style.height = "100%"
    ins_img.style.maxWidth = "400px"
    //ins_img.style.marginTop = "10px"
    //ins_img.style.marginBottom = "10px"
    instruction.appendChild(ins_img)
    targetDiv.appendChild(instruction)
    // end - add instruction for the thumnail Grid


}


function closePopup(){
    console.log ("close btn clicked")
   // overlay.style.visibility= "hidden"
    document.getElementsByClassName("popupContent")[0].scrollTo =0
    overlay.style.opacity = 0
    overlay.style.visibility ="hidden"
    popUp.style.visibility="hidden"
    

    
}

function openPopup(){
    let popupAreaTotal = sh-65
    popUp.style.height = popupAreaTotal*0.9+"px"
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible"
    popUp.style.visibility = "visible"
    popUp.style.opacity = 1;
    colorGroupMarker.src = "Assets/ui_imags/m"+selectedColor+".svg"
}

function setPopUpContent(indexContent){
    let imageName = contentData[indexContent]["Img_name"]
    let linkForimage = "Assets/p_imgs/"+imageName+".jpg"
    productMainImg.src = linkForimage
    
    productName.innerHTML = " "
    year.innerHTML =" "
    designer.innerHTML= " "
    client.innerHTML = " "
    detail.innerHTML = " "

    productName.innerHTML = contentData[indexContent]["Product"]
    year.innerHTML = "Year: "+ contentData[indexContent]["Year"]
    designer.innerHTML= "<span>Designer: </span>" + contentData[indexContent]["Designer"] 
    client.innerHTML = "<span>Client: </span>" + contentData[indexContent]["Client"]
    detail.innerHTML = contentData[indexContent]["Description"]
    
}

function backTohome(){
    document.getElementById("products").remove()
    document.getElementById("moreinfo").remove()
    //logo.style.visibility = "visible"
    logo.style.display = "block"
    homeBtn.style.visibility = "hidden"
    homeBtn.style.opacity = 0
}

function resetDiamond(k){
    //addevent listener for each diamond
    for(let i=1; i<10; i++){
        if(i!=k){
            let nameOftarget = "m"+i
            let temp = document.getElementById(nameOftarget)
            temp.src = "Assets/ui_imags/m"+i+".svg"
        }
    }

}

//for PWA 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
  }


//preloading images
function preload() {
    for(j=0; j<9; j++){
        let targetImageName = imgName[j]
        let images =[]
        for (i = 1; i < 10; i++) {
            images[i] = new Image()
            images[i].src = "Assets/p_imgs/"+targetImageName+i+".jpg"
            //console.log("Assets/p_imgs/"+targetImageName+i+".jpg")
        }
    }

}
