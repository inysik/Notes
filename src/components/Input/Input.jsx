export function Input(props) {
  return (
    <>
      <input
        value={props.value}
        className={props.className}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      ></input>
    </>
  );
}
