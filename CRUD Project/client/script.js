const API_URL = "http://localhost:3000";


// LOAD NOTES WHEN PAGE OPENS
window.onload = getNotes;
// SEARCH NOTES
async function searchNotes() {

    const searchValue = document.getElementById("search").value;


    const response = await fetch(

        `${API_URL}/search?title=${searchValue}`

    );

    const notes = await response.json();


    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";


    notes.forEach((note) => {

        notesDiv.innerHTML += `

            <div class="note">

                <h3>${note.title}</h3>

                <p>${note.content}</p>

                <button onclick="deleteNote('${note._id}')">
                    Delete
                </button>

            </div>

        `;

    });

}


// ADD NOTE
async function addNote() {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;


    await fetch(`${API_URL}/notes`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            content
        })

    });


    getNotes();

}


// GET ALL NOTES
async function getNotes() {

    const response = await fetch(`${API_URL}/notes`);

    const notes = await response.json();


    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";


    notes.forEach((note) => {

        notesDiv.innerHTML += `

            <div class="note">

                <h3>${note.title}</h3>

                <p>${note.content}</p>

                <button onclick="deleteNote('${note._id}')">
                    Delete
                </button>

            </div>

        `;

    });

}


// DELETE NOTE
async function deleteNote(id) {

    await fetch(`${API_URL}/notes/${id}`, {

        method: "DELETE"

    });

    getNotes();


    

}