const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNote');
const noteList = document.getElementById('noteList');

// Initialize the application
initApp();

function initApp() {
    populateNotesFromStorage();
    addNoteButton.addEventListener('click', handleAddNote);
}

function populateNotesFromStorage() {
    let storedNotes = getStoredNotes();
    storedNotes.reverse().forEach(note => {
        addNoteToList(note.text, note.checked);
    });
}


function handleAddNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToList(noteText);
        prependToStoredNotes(noteText);
        noteInput.value = '';
    }
}

function addNoteToList(text, checked = false) {
    const li = createNoteElement(text, checked);
    noteList.insertBefore(li, noteList.children[1]);
}

function createNoteElement(text, checked = false) {
    const li = document.createElement('li');
    const checkbox = createCheckbox(checked);
    const label = createCheckboxLabel(checkbox.id);
    const span = createEditableSpan(text);
    const deleteButton = createDeleteButton();

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

function createCheckbox(checked) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox';
    checkbox.id = 'noteCheckbox' + Date.now();
    checkbox.checked = checked;
    return checkbox;
}

function createCheckboxLabel(forId) {
    const label = document.createElement('label');
    label.setAttribute('for', forId);
    return label;
}

function createEditableSpan(text) {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', true);
    span.setAttribute('spellcheck', 'false'); // Disable browser's spellcheck
    span.textContent = text;
    span.addEventListener('input', handleEditNote);
    return span;
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
    notes.unshift({ text: noteText, checked: false });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateStoredNotes() {
    const notes = Array.from(noteList.children)
                       .slice(1)  // Skip the sample note
                       .map(li => ({
                           text: li.querySelector('span').textContent,
                           checked: li.querySelector('.custom-checkbox').checked
                       }));
    localStorage.setItem('notes', JSON.stringify(notes));
}
