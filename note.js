const addbox = document.querySelector(".add-box"),
  popbox = document.querySelector(".popup-box"),
  popTitle = popbox.querySelector("header p"),
  closeIcon = popbox.querySelector("header i"),
  Titletag = popbox.querySelector("input"),
  desctag = popbox.querySelector("textarea"),
  addbtn = popbox.querySelector("button");

let monthobj = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let isupdate = false,
  updateId;

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addbox.addEventListener("click", () => {
  Titletag.focus();
  popbox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isupdate = false;
  popbox.classList.remove("show");
  addbtn.innerText = "Add a Note";
  popTitle.innerText = "Add a new note";
  Titletag.value = "";
  desctag.value = "";
});

function shownotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let litag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.Description}</span>
                <div class="bottom-content">
                    <span> ${note.date} </span>
                    <div class="settings">
                        <i onclick=showMenu(this) class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                        <li onclick="updateNote(${index} , '${note.title}' ,'${note.Description}')"><i class="uil uil-pen"></i> Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> Delete</li>
                        </ul>
                    
                </div>
            </div>`;
    addbox.insertAdjacentHTML("afterend", litag);
  });
}
shownotes();
function updateNote(noteId, title, desc) {
  isupdate = true;
  updateId = noteId;
  addbox.click();
  addbtn.innerText = "Update Note";
  popTitle.innerText = "Update the note";
  Titletag.value = title;
  desctag.value = desc;

  console.log(noteId, title, desc);
}

function deleteNote(noteId) {
  let confirmdelete = confirm("Are sure you want to delete this note?");
  if (!confirmdelete) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  shownotes();
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let notetitle = Titletag.value,
    notedesc = desctag.value;
  if (notetitle || notedesc) {
    let dateobj = new Date(),
      month = monthobj[dateobj.getMonth()],
      date = dateobj.getDate(),
      year = dateobj.getFullYear();
    console.log(month, date, year);
    let noteinfo = {
      title: notetitle,
      Description: notedesc,
      date: `${month} ${date}, ${year}`,
    };
    if (!isupdate) {
      notes.push(noteinfo);
    } else {
      isupdate = false;
      notes[updateId] = noteinfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    shownotes();
  }

  console.log("btn clicked....");
});
