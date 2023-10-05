const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNote');
const noteList = document.getElementById('noteList');

// Initialize the application
initApp();

function initApp() {
    populateNotesFromStorage();
    addNoteButton.addEventListener('click', handleAddNote);
    noteInput.addEventListener('keydown', handleAddNote);
}

function populateNotesFromStorage() {
    let storedNotes = getStoredNotes();
    storedNotes.reverse().forEach(note => {
        addNoteToList(note.text);
    });
}

function handleAddNote(event) {
    if ((event.key === 'Enter' && event.type === 'keydown') || event.type === 'click') {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNoteToList(noteText);
            prependToStoredNotes(noteText);
            noteInput.value = '';
            noteInput.focus();
        }
    }
}

function addNoteToList(text) {
    const li = createNoteElement(text);
    noteList.insertBefore(li, noteList.children[1]);
}

function createNoteElement(text) {
    const li = document.createElement('li');
    const span = createEditableSpan(text);
    const deleteButton = createDeleteButton();

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

function createEditableSpan(text) {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', true);
    span.setAttribute('spellcheck', 'false');
    span.textContent = text;

    span.addEventListener('input', handleEditNote);
    span.addEventListener('keydown', handleEditableSpanKeydown);

    return span;
}

function handleEditableSpanKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const span = event.target;
        span.blur();
    }
}

function handleEditNote() {
    updateStoredNotes();
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', handleDeleteNote);
    return deleteButton;
}

function handleDeleteNote(event) {
    noteList.removeChild(event.target.parentElement);
    updateStoredNotes();
}

function getStoredNotes() {
    return JSON.parse(localStorage.getItem('notes') || '[]');
}

function prependToStoredNotes(noteText) {
    let notes = getStoredNotes();
    notes.unshift({ text: noteText });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateStoredNotes() {
    const notes = Array.from(noteList.children)
                       .slice(1)
                       .map(li => ({
                           text: li.querySelector('span').textContent
                       }));
    localStorage.setItem('notes', JSON.stringify(notes));
}
