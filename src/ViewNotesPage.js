import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const toggleCheck = (index) => {
    const updated = [...notes];
    updated[index].checked = !updated[index].checked;
    updateNotes(updated);
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    updateNotes(updated);
  };

  const editNote = (index) => {
    const noteToEdit = notes[index];
    localStorage.setItem('editNote', JSON.stringify({ ...noteToEdit, index }));
    navigate('/diary');
  };
  

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all notes?')) {
      setNotes([]);
      localStorage.removeItem('notes');
    }
  };

  return (
    <div className="view-notes-page">
      <h1>Saved Notes</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button className="save" onClick={() => navigate('/diary')}>
          ➕ Add New Note
        </button>

        {notes.length > 0 && (
          <button className="delete" onClick={clearAll}>
            🗑️ Clear All Notes
          </button>
        )}
      </div>

      {notes.map((note, index) => (
        <div
          key={index}
          className={`note ${note.checked ? 'done' : ''}`}
        >
          <div className="note-header">
            <input
              type="checkbox"
              checked={note.checked}
              onChange={() => toggleCheck(index)}
              style={{ marginRight: '0.5rem' }}
            />
            <strong>{note.time}</strong>
          </div>

          {note.type === 'todo' ? (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {note.todos?.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                <input
                 
                  type="checkbox"
                  checked={item.checked}
                  onClick={(e) => e.preventDefault()} // prevents changing it
                  style={{ marginRight: '0.5rem' }}
                />
                
             
                <span className={item.checked ? 'todo-checked' : ''}>
                  {item.text}
                </span>


              </li>
            ))}
          </ul>
        ) : (
          <p>{note.text}</p>
        )}



          <div className="note-actions">
            <button className="edit" onClick={() => editNote(index)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteNote(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewNotesPage;
