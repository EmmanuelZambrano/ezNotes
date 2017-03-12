getNotes();

function createForm() {
  var content = document.getElementById('content');
  content.innerHTML = '';
  var noteWrapper = document.createElement('div');
  var noteForm = '<label>Name<input id="name" type="text" name="name"></label>';
  noteForm += '<label>Subject<input id="subject" type="text" name="subject"></label>';
  noteForm += '<textarea id="message" placeholder="Ideas go here."></textarea>'
  noteForm += '<button id="createNote">Create Note</button>';
  noteForm += '<button id="cancelNote">Cancel</button>';
  noteWrapper.innerHTML = noteForm;
  content.appendChild(noteWrapper);
  document.getElementById('createNote').addEventListener('click', creatNote, false);
  document.getElementById('cancelNote').addEventListener('click', cancelNote, false);

}
function creatNote(){
  var content = document.getElementById('content');
  var noteName = document.getElementById('name').value;
  var noteSubject = document.getElementById('subject').value;
  var noteMessage = document.getElementById('message').value;
  var noteDate = new Date();
  /* localStorage Below*/
  var myNote = {
    name: noteName,
    subject: noteSubject,
    message: noteMessage,
    date: noteDate
  }
  localStorage.setItem(noteName, JSON.stringify(myNote));
  content.innerHTML = '';
  getNotes();

}

function cancelNote() {
  getNotes();
}

function getNotes(){
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<h2>My Notes</h2><button id="createBtn">Create New Note</button>';
  document.getElementById('createBtn').addEventListener('click', createForm, false);
  if(localStorage.length===0){
    var errorMessage = document.createElement("p");
    errorMessage.className = 'errorMessage';
    var errorText = document.createTextNode("You have no notes saved. Create notes to store your ideas!");
    errorMessage.appendChild(errorText);
    contentDiv.appendChild(errorMessage);
  }
  else {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      var myNote = JSON.parse(localStorage.getItem( localStorage.key(i)));

      var noteName = myNote.name;
      var noteSubject = myNote.subject;
      var noteMessage = myNote.message;
      var noteDate = myNote.date;

      var noteWrapper = document.createElement("div");
      noteWrapper.id = noteName;

      var namePara = document.createElement("p");
      namePara.innerHTML = noteName;
      var subjectPara = document.createElement("p");
      subjectPara.innerHTML = noteSubject;
      var datePara = document.createElement("p");
      datePara.innerHTML = noteDate;

      var nameLabel = document.createElement("p");
      nameLabel.className = 'noteLabel';
      var nameText = document.createTextNode("Name:");
      nameLabel.appendChild(nameText);

      var subjectLabel = document.createElement("p");
      subjectLabel.className = 'noteLabel';
      var subjectText = document.createTextNode("Subject:");
      subjectLabel.appendChild(subjectText);

      var dateLabel = document.createElement("p");
      dateLabel.className = 'noteLabel';
      var dateText = document.createTextNode("Date:");
      dateLabel.appendChild(dateText);

      var seeMore = document.createElement("button");
      var seeMoreText = document.createTextNode("See More");
      seeMore.appendChild(seeMoreText);
      seeMore.addEventListener('click', viewNote, false);

      var deleteBtn = document.createElement("button");
      var deleteText = document.createTextNode("Delete Note");
      deleteBtn.appendChild(deleteText);
      deleteBtn.addEventListener('click', deleteNote, false);

      var editBtn = document.createElement("button");
      var editText = document.createTextNode("Edit Note");
      editBtn.appendChild(editText);
      editBtn.addEventListener('click', editNote, false);

      noteWrapper.innerHTML = '<input type="hidden" name="noteName" value="' + noteName + '">';
      noteWrapper.appendChild(nameLabel);
      noteWrapper.appendChild(namePara);
      noteWrapper.appendChild(subjectLabel);
      noteWrapper.appendChild(subjectPara);
      noteWrapper.appendChild(dateLabel);
      noteWrapper.appendChild(datePara);
      noteWrapper.appendChild(seeMore);
      noteWrapper.appendChild(deleteBtn);
      noteWrapper.appendChild(editBtn);
      contentDiv.appendChild(noteWrapper);
    }
  }
}

function deleteNote(){
  var noteName = this.parentNode.id;
  localStorage.removeItem(noteName);
  getNotes();
}

function editNote(){
  var noteName = this.parentNode.id;
  var myNote = JSON.parse(localStorage.getItem(noteName));

  var noteName = myNote.name;
  var noteSubject = myNote.subject;
  var noteMessage = myNote.message;
  var noteDate = myNote.date;

  var content = document.getElementById('content');
  content.innerHTML = '';
  var noteWrapper = document.createElement('div');
  var noteForm = '<label>Name<input id="name" type="text" name="name" value="' + noteName +'"></label>';
  noteForm += '<label>Subject<input id="subject" type="text" name="subject" value="' + noteSubject +'"></label>';
  noteForm += '<textarea id="message">' + noteMessage +'</textarea>'
  noteForm += '<button id="createNote">Create Note</button>';
  noteForm += '<button id="cancelNote">Cancel</button>';
  noteWrapper.innerHTML = noteForm;
  content.appendChild(noteWrapper);
  document.getElementById('createNote').addEventListener('click', creatNote, false);
  document.getElementById('cancelNote').addEventListener('click', cancelNote, false);
}

function viewNote() {

  var noteName = this.parentNode.id;
  var noteDiv = document.getElementById(noteName);
  var myNote = JSON.parse(localStorage.getItem(noteName));

  var noteMessage = myNote.message;

  var seeMoreDiv = document.createElement("div");
  seeMoreDiv.className = 'seeMore';
  var seeMoreP = document.createElement("p");
  seeMoreP.innerHTML = noteMessage;

  seeMoreDiv.appendChild(seeMoreP);
  noteDiv.appendChild(seeMoreDiv);
}
