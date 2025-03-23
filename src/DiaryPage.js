import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DiaryPage = () => {
  const [note, setNote] = useState('');
  const [todos, setTodos] = useState([{ text: '', checked: false }]);
  const [notesList, setNotesList] = useState([]);
  const [noteType, setNoteType] = useState('text');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotesList(JSON.parse(storedNotes));
    }

    const editing = localStorage.getItem('editNote');
    if (editing) {
      const { text, type, index, todos } = JSON.parse(editing);
      setNoteType(type || 'text');
      setEditIndex(index);

      if (type === 'todo' && todos) {
        setTodos(todos);
      } else {
        setNote(text);
      }

      localStorage.removeItem('editNote');
    }
  }, []);

  const handleSave = () => {
    if (noteType === 'text' && note.trim() === '') return;
    if (noteType === 'todo' && todos.every((t) => t.text.trim() === '')) return;

    const newNote = {
      text: noteType === 'todo' ? todos.map((t) => t.text).join('\n') : note,
      time: new Date().toLocaleString(),
      checked: false,
      type: noteType,
      todos: noteType === 'todo' ? todos : undefined,
    };

    let updatedNotes;
    if (editIndex !== null) {
      updatedNotes = [...notesList];
      updatedNotes[editIndex] = newNote;
    } else {
      updatedNotes = [...notesList, newNote];
    }

    setNotesList(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    setNote('');
    setTodos([{ text: '', checked: false }]);
    setEditIndex(null);
    setNoteType('text');
  };

  const updateTodo = (index, value) => {
    const updated = [...todos];
    updated[index].text = value;
    setTodos(updated);
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].checked = !updated[index].checked;
    setTodos(updated);
  };

  const addTodo = () => {
    setTodos([...todos, { text: '', checked: false }]);
  };

  const removeTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated.length ? updated : [{ text: '', checked: false }]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{editIndex !== null ? 'Edit Note' : 'Write a Note'}</h1>

      {/* Mode Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            value="text"
            checked={noteType === 'text'}
            onChange={() => setNoteType('text')}
            style={{ marginRight: '0.5rem' }}
          />
          Normal Note
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value="todo"
            checked={noteType === 'todo'}
            onChange={() => setNoteType('todo')}
            style={{ marginRight: '0.5rem' }}
          />
          Todo List
        </label>
      </div>

      {/* Editor */}
      {noteType === 'text' ? (
        <textarea
          className="notebook"
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows={1}
          style={{
            overflow: 'hidden',
            resize: 'none',
            minHeight: '100px',
            width: '100%',
            padding: '0.2rem',
            lineHeight:'22px',
          }}
        />
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          {todos.map((todo, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '0.5rem',
                gap: '0.5rem',
              }}
            >
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(i)}
                />
                <span className="checkmark"></span>
              </label>

              <textarea
                className="notebook"
                value={todo.text}
                onChange={(e) => {
                  updateTodo(i, e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder={`Task ${i + 1}`}
                rows={1}
                style={{
                  flex: 1,
                  resize: 'none',
                  overflow: 'hidden',
                  lineHeight: '18px',
                }}
              />

              <button onClick={() => removeTodo(i)}>✕</button>
            </div>
          ))}
          <button onClick={addTodo}>➕ Add Task</button>
        </div>
      )}

      <button className="save" onClick={handleSave}>
        {editIndex !== null ? 'Update Note' : 'Save Note'}
      </button>

      <br />
      <Link to="/view-notes" style={{ marginTop: '1rem', display: 'inline-block' }}>
        View Saved Notes
      </Link>
    </div>
  );
};

export default DiaryPage;
