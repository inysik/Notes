import React, { useState, useEffect } from "react";

import "./App.css";
import { Button } from "./components/Buttons/Button";
import { Input } from "./components/Input/Input";
import { ModalWin } from "./components/ModalWin/ModalWin";

export function App() {
  const [note, setNote] = useState(""); // текущее значение поля
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("myNotes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // СОХРАНЕНИЕ ПОСЛЕ ИЗМЕНЕНИЙ:
  useEffect(() => {
    console.log(2, notes);
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote() {
    console.log(note, "333");
    if (note.trim() === "") return;
    setNotes([...notes, { note: note, id: Math.random() }]);
    setNote("");
  }

  function deleteItem(idToDelete) {
    const filtered = notes.filter((item) => item.id !== idToDelete);
    setNotes(filtered);
  }

  const filteredNotes = notes.filter((item) =>
    item.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="title">Заметки</h1>
      <div className="flex">
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            className="btn"
            type="search"
            name="search-text"
            placeholder="Поиск заметки"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <Input
          value={note}
          className="btn"
          type="text"
          name="note"
          placeholder="Добавить заметку"
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleAddNote();
            }
          }}
        />
        <Button onClick={handleAddNote} className="plus" text="+" />
      </div>
      <div>
        <ul className="list">
          {(searchQuery ? filteredNotes : notes).length > 0 ? (
            (searchQuery ? filteredNotes : notes).map((item) => (
              <li key={item.id} className="list-item">
                {item.note}
                <div className="list-btn">
                  <Button
                    onClick={() => {
                      setNote(item.note);
                      setCurrentId(item.id);
                      setOpen(true);
                    }}
                    className="button"
                    text="Edit"
                  />
                  <Button
                    onClick={() => deleteItem(item.id)} // <-- передается id
                    className="button"
                    text="Delete"
                  />
                </div>
              </li>
            ))
          ) : (
            <li style={{ opacity: 0.5 }}>Ничего не найдено</li>
          )}
        </ul>
      </div>
      <ModalWin
        note={note}
        notes={notes}
        setNotes={setNotes}
        setNote={setNote}
        open={open}
        setOpen={setOpen}
        currentId={currentId}
      />
    </>
  );
}
export default App;
