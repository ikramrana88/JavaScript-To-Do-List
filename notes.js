

showNotes();

let addNote = document.getElementById('addNote');

addNote.addEventListener('click', function (e) {

    if (addText.value.length==0 || addTitle.value.length==0) {
        alert("Please eneter some text in notes field");
    }
    else {

        let addText = document.getElementById('addText');
        let addTitle = document.getElementById('addTitle');

        let notes = localStorage.getItem('notes');

        if (notes == null) {
            noteObj = [];

        } else {
            noteObj = JSON.parse(notes);
        };

        let obj = {
            title : addTitle.value,
            text : addText.value
        }

        noteObj.push(obj);
        localStorage.setItem('notes', JSON.stringify(noteObj));
        addText.value = "";
        addTitle.value= "";
        // console.log(noteObj);
        showNotes();

    };



});

function showNotes() {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        noteObj = [];

    } else {
        noteObj = JSON.parse(notes);
    }

    let html = "";


    noteObj.forEach(function (element, index) {

        html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index+1}.  ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            
            `;

    });

    let noteHtml = document.getElementById('notes');
    if (noteObj.length != 0) {

        noteHtml.innerHTML = html;

    } else {
        noteHtml.innerHTML = "No notes to display";
    }
}


function deleteNote(index) {
    
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        noteObj = [];

    } else {
        noteObj = JSON.parse(notes);

    }
    noteObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    showNotes();



}


let search = document.getElementById('searchText');

search.addEventListener("input", function () {

    let inputValue = search.value.toLowerCase();
    let uper = search.value.toUpperCase();

    let card = document.getElementsByClassName('noteCard');

    Array.from(card).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;

        if (cardTitle.includes(inputValue) || cardTxt.includes(inputValue) || cardTitle.includes(uper) || cardTxt.includes(uper)) {

            element.style.display = "block";
            
        } else {
            element.style.display = "none";
        }
        
    })
    
})