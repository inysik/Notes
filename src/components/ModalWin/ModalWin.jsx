import { Input } from "../Input/Input";

export function ModalWin({
  note,
  setNote,
  open,
  setOpen,
  currentId,
  notes,
  setNotes,
}) {
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    const updatedNotes = notes.map((item) =>
      item.id === currentId ? { ...item, note: note } : item
    );
    setNotes(updatedNotes);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
    setNote(""); 
    setOpen(false);

  };

  return (
    <>
      {open && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Текущая заметка: {note}!</h3>
            <Input
              className="btn"
              value={note}
              type="text"
              name="редактирование заметки"
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="button" onClick={handleSave}>
              Save
            </button>
            <button className="button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
