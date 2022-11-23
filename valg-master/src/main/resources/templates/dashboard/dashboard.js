let allCandidates;        // all candidates from database fetched on-load
let filteredCandidates;   // candidates you have currently selected with drop-down
let selectedParty;        // the selected party by party-letter. A, B, O etc...

// -------- on-load fetch --------- //
window.onload = fetchCandidates;
function fetchCandidates() {
    fetch(baseURL + "/candidates")
        .then(response => response.json())
        .then(result => {
            console.log("!!!-----FEEECTHINGGGG-----!!!")
            allCandidates = result
            renderSelectedParty()
        });
}

// --------- basic table overview ---------- //
const tableBody = document.getElementById("party-table-body")
function createCandidateRow(candidate) {

    console.log(candidate)

    let tableRow = document.createElement("tr")
    tableRow.className = "candidate";
    tableRow.id = candidate.id
    tableRow.innerHTML = ` 
        <td>${escapeHTML(candidate.name)} </td> 
        <td>${escapeHTML(candidate.votes.toString())}</td> 
    `;

    tableBody.appendChild(tableRow)
}


// ----- edit button ----- //
document.getElementById("btn-edit-candidates").addEventListener("click", toggleEdit)
var t = document.getElementById("btn-edit-candidates");
function toggleEdit() {

    if (t.value === "read") {
        t.value = "write";
        filteredCandidates.map(renderUpdateCandidates)
        renderAddNewCandidate()
    } else {
        t.value = "read";
        renderSelectedParty();
    }
}


// ---------- different renders ---------- //
document.getElementById("party-selector").addEventListener("change", renderSelectedParty)

function renderSelectedParty() {
    selectedParty = document.getElementById("party-selector").value
    console.log("Selected party: " + selectedParty)
    t.value = "read";
    filteredCandidates = allCandidates.filter(candidate => candidate.affiliation.letter === selectedParty)

    tableBody.innerHTML = "";
    filteredCandidates.map(createCandidateRow)

    // styling
    document.getElementById("party-letter").innerText = selectedParty
    document.getElementById("party-letter").style.backgroundColor = filteredCandidates[0].affiliation.colour;

}

function renderUpdateCandidates(candidate) {

    const tableRowToUpdate = document.getElementById(candidate.id)
    tableRowToUpdate.innerHTML =
        `
            <td><input id="update-candidate-name-${candidate.id}" value="${escapeHTML(candidate.name)}"></td> 
            <td><input id="update-candidate-votes-${candidate.id}" value="${escapeHTML(candidate.votes.toString())}"></td>  
        `

    // make confirm and delete buttons
    var row = document.getElementById(candidate.id);
    var cellConfirm = row.insertCell(2)
    cellConfirm.innerHTML = `<button onclick="updateCandidate(${candidate.id})">✅</button>`
    var cellDelete = row.insertCell(3)
    cellDelete.innerHTML = `<button onclick="deleteCandidate(${candidate.id})">❌</button>`

}

function renderAddNewCandidate() {

    let tableRow = tableBody.insertRow(0)
    tableRow.className = "new-candidate";
    tableRow.id = "new-candidate";
    tableRow.innerHTML = ` 
        <td><input id="new-candidate-name" placeholder="navn" type="text" required></td> 
        <td><input id="new-candidate-votes" placeholder="stemmer" type="number" required></td>  
        <td><button onclick="createNewCandidate()">💾</button></td>  
    `;
}


// ------- fetches ------- //
function createNewCandidate(){

    const inputName = document.getElementById("new-candidate-name")
    const inputVotes = document.getElementById("new-candidate-votes")
    console.log(inputName.validity.valid)
    console.log(inputVotes.validity.valid)
    if (!inputName.validity.valid === true|| !inputVotes.validity.valid === true) {
        console.log("Holding creation")
    } else {
        console.log("Clear lets go!")

        switch(selectedParty) {
        case "A":
            affiliation = 1
            break;
        case "B":
            affiliation = 2
            break;
        case "C":
            affiliation = 3
            break;
        case "F":
            affiliation = 4
            break;
        case "M":
            affiliation = 5
            break;
        case "O":
            affiliation = 6
            break;
        case "P":
            affiliation = 7
            break;
        case "V":
            affiliation = 8
            break;
        case "Æ":
            affiliation = 9
            break;
    }

    console.log(affiliation)
    const candidateToCreate = {
        name: document.getElementById(`new-candidate-name`).value,
        votes: document.getElementById(`new-candidate-votes`).value,
        affiliation: {"id" :affiliation}
    }

    console.log(candidateToCreate)


    console.log("Posting: " + baseURL + "/candidates/")
    fetch(baseURL + "/candidates/",{
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToCreate)
    }).then(async response => {
        if (response.status === 200) {
            console.log("Post successful")
            fetchCandidates()
            filteredCandidates.map(renderUpdateCandidates)
        } else {
            console.log("Status: " + response.status);
        }
    });
    }
}

function updateCandidate(id) {

    candidateRowToUpdate = document.getElementById(id)
    console.log("got id: " + id)
    console.log("candidate to update: " + candidateRowToUpdate.name)

    const candidateToUpdate = {
        name: document.getElementById(`update-candidate-name-${id}`).value,
        votes: document.getElementById(`update-candidate-votes-${id}`).value
    }

    console.log("Patching: " + baseURL + "/candidates/" + id)
    fetch(baseURL + "/candidates/" + id, {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToUpdate)
    }).then(response => {
        if (response.status === 200) {
            console.log("Patch successful")
            fetchCandidates()
            renderUpdateCandidates()
        } else {
            console.log("Status: " + response.status);
        }
    });

}

function deleteCandidate(id) {
    console.log("fetching: " + baseURL + "/candidates/" + id)
    fetch(baseURL + "/candidates/" + id, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(id).remove();
            fetchCandidates()
        } else {
            console.log("Status: " + response.status);
        }
    });
}
