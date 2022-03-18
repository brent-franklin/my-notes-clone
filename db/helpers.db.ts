
// This helper function changes the note values from
// the DB to camelCase for easier use and consistency
export const noteHelper = (notesArr: DBNoteType[]) => {
  return notesArr.map((n: DBNoteType) => ({
    id: n.id,
    content: n.content,
    timeCreated: n.timecreated,
    timeModified: n.timemodified,
    folderName: n.foldername,
  }));
};

// Create a new folder
export const newFolderDB = async (input: string) => {
  const folder = await fetch('http://localhost:3000/api/newFolder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: input,
    }),
  }).then((folder) => folder.json());
    console.log(folder);
  return folder;
};

// Create a new note
export const newNoteDB = async (newNote: string, folder: string) => {
  const note = await fetch('http://localhost:3000/api/newNote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      note: newNote,
      folderName: folder,
    }),
  }).then((note) => note.json());
  return noteHelper(note.newNote);
};

// Update the selected note
export const updateNoteDB = async (updateNote: string, selectedNote: NoteType) => {
  const note = await fetch('http://localhost:3000/api/updateNote', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
	note: updateNote,
	selectedNote: selectedNote.id,
    }),
  }).then((note) => note.json());
  return noteHelper(note.updatedNote);
};

// Delete the selected note
export const deleteNoteDB = async (deletedNote: NoteType) => {
  const note = await fetch('http://localhost:3000/api/deleteNote', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      note: deletedNote,
    }),
  }).then((note) => note.json());
    return noteHelper(note.deletedNote);
};
