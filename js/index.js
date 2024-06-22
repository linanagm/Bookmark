
let siteNameInput = document.getElementById("bookmarkName");
let siteUrlInput = document.getElementById("bookmarkUrl");
let submitBtn = document.getElementById("submitBtn");
let closeBtn = document.getElementById("closeBtn");
let sitesList =[];

// regex variables
const nameRegex = /^.{3,}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;




if(localStorage.getItem('bookmarksContainer') != null){
    sitesList = JSON.parse(localStorage.getItem('bookmarksContainer'));
    displayData();

}

// add event listener
siteUrlInput.addEventListener('input' , function(){
    validate(siteUrlInput, urlRegex);
})
siteNameInput.addEventListener('input' , function(){
    validate(siteNameInput, nameRegex)    
})
submitBtn.addEventListener('click' , function(){
    addSite()
})
closeBtn.addEventListener('click' , function(){
    closeBox()
})


// create and add bookmark
function addSite(){
    if(validate(siteNameInput, nameRegex) && validate(siteUrlInput, urlRegex) ){
        let siteUrl = siteUrlInput.value.trim();

        if (!siteUrl.match(/^https?:\/\//)) {
            siteUrl = 'http://' + siteUrl;
        }

        let site = {
            siteName : siteNameInput.value.trim(),
            siteURL : siteUrl,
    
        }
        sitesList.push(site);
        localStorage.setItem('bookmarksContainer', JSON.stringify(sitesList));
    
    }else{
        document.getElementById('boxInfo').classList.remove('d-none');
    }
        
    clearForm();
    displayData();
    
}

// clear form function
function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

// Display data 
function displayData(){
    container="";
    for(var i =0; i<sitesList.length; i++){
        container += `
            <tr>
                <td>${i+1}</td>
                <td>${sitesList[i].siteName}</td>
                <td>
                    <button class="btn btn-visit">
                        <i class="fa-solid fa-eye"></i>
                        <a href="${sitesList[i].siteURL}" target="_blank">Visit</a>
                    </button>
                </td>
                <td>
                    <button onclick="deleteItem(${i})" class="btn btn-delete">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `
    }
    document.getElementById('tableData').innerHTML = container;
}


// delete data
function deleteItem(indexItem){
    sitesList.splice(indexItem, 1);
    localStorage.setItem('bookmarksContainer', JSON.stringify(sitesList));
    displayData();

}


// validation function
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

// closeBtn function
function closeBox(){
    document.getElementById('boxInfo').classList.add('d-none');
}


