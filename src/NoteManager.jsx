import React, { useContext, useState, useEffect } from 'react';
import { NoteContext } from './NoteContext';

const NoteManager = () => {
  const { notes, setNotes } = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [date, setDate] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showTitleError, setShowTitleError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState('');

  useEffect(() => {
    const updatedFavorites = favorites.filter((favNote) =>
      notes.some((note) => note.id === favNote.id)
    );
    setFavorites(updatedFavorites);
  }, [notes, favorites]);

  const handleAddOrUpdateNote = () => {
    if (title.trim() === '') {
      setShowTitleError(true);
      return;
    }

    if (date.trim() === '') {
      return;
    }

    if (editingNoteId) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNoteId ? { ...note, title, text: noteText, date } : note
      );
      setNotes(updatedNotes);
      setEditingNoteId(''); 
    } else {
      const newNote = {
        id: Math.random().toString(),
        title,
        text: noteText,
        date,
      };
      setNotes([...notes, newNote]);
    }

    setTitle('');
    setNoteText('');
    setDate('');
    setShowTitleError(false);
  };

  const handleEditNote = (id, title, text, date) => {
    setTitle(title);
    setNoteText(text);
    setDate(date);
    setEditingNoteId(id); 
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    setFavorites(favorites.filter((note) => note.id !== id));

    if (editingNoteId === id) {
      setEditingNoteId('');
    }
  };

  const handleAddToFavorites = (id) => {
    const noteToAdd = notes.find((note) => note.id === id);
    if (noteToAdd) {
      setFavorites([...favorites, noteToAdd]);
    }
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter((note) => note.id !== id));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (showTitleError) {
      setShowTitleError(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-4 w-full flex flex-col gap-4 justify-center items-center'>
      <div className='flex flex-col'>
        <h1 className='text-center text-black font-bold text-[1.5rem]'>Create Note</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className='border-b text-black my-1'
        />
        {showTitleError && <p style={{ color: 'red' }}>Title is required</p>}
        <textarea
          placeholder="Note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={2}
          className='border-b text-black my-1'
        />
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className='my-1 text-black'
        />
        {editingNoteId ? (
          <button className='border rounded-md' onClick={handleAddOrUpdateNote}>Update</button>
        ) : (
          <button onClick={handleAddOrUpdateNote} disabled={date.trim() === ''}
            className='border rounded-md'
          >
            Add
          </button>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearchChange}
          className='border rounded-md text-black'
        />
      </div>
      <div className='w-full'>
        <h1 className='text-center text-black font-bold text-[1.5rem]'>Created Notes</h1>
        <div className='flex flex-row gap-3 flex-wrap'>
          {filteredNotes.map((note) => (
            <div key={note.id} className='p-2 bg-gray-100 text-black rounded-md space-y-2'>
              <h3 className='text-center text-[22px] capitalize'>{note.title}</h3>
              <p className='text-[18px]'>{note.text}</p>
              <p className='text-[18px]'>Date: {note.date}</p>
              <div className='flex flex-row gap-2'>
                <button className='bg-gray-400 px-2 py-1 rounded-md' onClick={() => handleEditNote(note.id, note.title, note.text, note.date)}>
                  Edit
                </button>
                <button className='bg-gray-400 px-2 py-1 rounded-md' onClick={() => handleDeleteNote(note.id)}>Delete</button>
                {favorites.some((favNote) => favNote.id === note.id) ? (
                  <button className='bg-gray-400 px-2 py-1 rounded-md' onClick={() => handleRemoveFromFavorites(note.id)}>Unfavorite</button>
                ) : (
                  <button className='bg-gray-400 px-2 py-1 rounded-md' onClick={() => handleAddToFavorites(note.id)}>Favorite</button>
                )}
              </div>
            </div>  
          ))}
        </div>
      </div>
      <div className='w-full'>
        <h2 className='text-center text-black font-bold text-[1.5rem]'>Favorite Notes</h2>
        <div className='flex flex-row gap-3 flex-wrap'>
          {favorites.map((favNote) => (
            <div key={favNote.id} className='p-2 bg-gray-100 text-black rounded-md space-y-2'>
              <h3 className='text-center text-[22px] capitalize'>{favNote.title}</h3>
              <p className='text-[18px]'>{favNote.text}</p>
              <p className='text-[18px]'>Date: {favNote.date}</p>
              <button className='bg-gray-400 px-2 py-1 rounded-md' onClick={() => handleRemoveFromFavorites(favNote.id)}>
                Unfavorite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteManager;
