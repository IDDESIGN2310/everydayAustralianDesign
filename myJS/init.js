

window.onload = function() {
    setScreenSize()
   
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

//Clamp Number
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

function setScreenSize(){
    let sw = window.innerWidth
    let sh = window.innerHeight
    let top = document.getElementById("topArea");
    top.style.height = sh * 0.6 +'px'
    let bottom = document.getElementById("bottomArea")
    bottom.style.height = sh * 0.4 +'px'
    document.getElementsByClassName("overlay")[0].style.height=sh+"px"
    document.getElementsByClassName("overlay")[0].style.width=sw+"px"
    let heightOfPopUp= sh-45-sh*0.1
    document.getElementsByClassName("popup")[0].style.height=sh-45-sh*0.1+"px"
    document.getElementsByClassName("popup")[0].style.width=sw-60+"px"

    document.getElementsByClassName("detailBottomNav")[0].style.height=sh*0.1-25+"px"
    document.getElementsByClassName("detailBottomNav")[0].style.width=sw-60+"px"

    //Assign global navigation
    homeBtn = document.getElementsByClassName("homeBtn")[0]
    aboutExBtn = document.getElementsByClassName("aboutEx")[0]
    closeAboutExBtn = document.getElementsByClassName("closeAboutEx")[0]
    aboutExPopup = document.getElementsByClassName("popUpAboutEx")[0]

    //Add event homebtn
    document.getElementById("_homeBtn").addEventListener('click', ()=>{
        backTohome()
        resetDiamond(11)
        , false
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

        aboutExPopup.scrollTop = 100
        
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

    //add eventLister for clos btn
    closeBtn = document.getElementById("closeBtn")
    closeBtn.addEventListener("click", ()=>{
        closePopup()
    })

    //assign overlay and popup
    overlay = document.getElementsByClassName("overlay")[0]
    popUp = document.getElementsByClassName("popup")[0]
    productMainImg = document.getElementById("productMainImage")
    year = document.getElementById("_year")
    designer = document.getElementById("_designer")
    client = document.getElementById("_client")
    detail = document.getElementById("_detail")
    productName = document.getElementById("_name")

    //switch contents from popup
    rightArrow = document.getElementById("_rightArrow")
    leftArrow = document.getElementById("_leftArrow")
    colorGroupMarker =document.getElementById("_colourGroupMark")

    //switch contents for right arrow from popup
    rightArrow.addEventListener("click", ()=>{
        let max = contentOrder[selectedColor-1]*9+8
        let min = contentOrder[selectedColor-1]*9
        if(initIndexContent < max){
            initIndexContent = initIndexContent+1;
        }else if (initIndexContent = max) {
            initIndexContent = min
        }

        setPopUpContent(initIndexContent)
        console.log("right")
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
     
        setPopUpContent(initIndexContent)
        console.log("left")
    })

    
    //loadingJson
    fetch("Assets/contentJson/contents.json").then(response => {
        return response.json();
    }).then(data => { 
        console.log(data)
        contentData = data["products"]
  
    });



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
    placeHolder.style.marginTop = window.innerHeight*0.05 +"px"
    //placeHolder.classList.add("align-items-center")

    let imagPrefix = imgName [index -1]
    selectedGroup = imagPrefix

    // Create thumbnail Grid
    for(let i =0; i< 3; i++){
        let row = document.createElement("DIV")
        row.classList.add("row")
        row.classList.add("align-items-center")
        let col = document.createElement("DIV")
        col.classList.add("col")
        col.classList.add("text-center")
        for(let j=0; j<3; j++){
            let image = document.createElement("IMG")
            let number = i+(j*3)+1
            
            image.src = "Assets/p_imgs/"+imagPrefix+number+".jpg"
            
            image.width = 100
            image.height = 100
            image.addEventListener("click", ()=>{ 
                console.log(number)
                //this is the number of selected image from the image grid from the begin of popup
                beginNumber = number
                initIndexContent = contentOrder[selectedColor-1]*9+(beginNumber-1)

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
    instruction.id = "moreinfo"
    let ins_img = document.createElement("IMG")
    ins_img.src = "Assets/ui_imags/moreinformation.svg"
    ins_img.style.width = "70%"
    ins_img.style.marginTop = "10px"
    ins_img.style.marginBottom = "10px"
    instruction.appendChild(ins_img)
    targetDiv.appendChild(instruction)
    // end - add instruction for the thumnail Grid


}


function closePopup(){
    console.log ("close btn clicked")
   // overlay.style.visibility= "hidden"
    overlay.style.opacity = 0
    overlay.style.visibility ="hidden"
    popUp.style.visibility="hidden"

    
}

function openPopup(){
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
<<<<<<< Updated upstream
        
=======

>>>>>>> Stashed changes
    if(contentData[indexContent]["Designer2"] == ""){
        designer.innerHTML= "<span>Designer: </span>" + contentData[indexContent]["Designer1"]
    }else{
        designer.innerHTML= "<span>Designer: </span>" + contentData[indexContent]["Designer1"] + ", " + contentData[indexContent]["Designer2"]
    }
    
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
