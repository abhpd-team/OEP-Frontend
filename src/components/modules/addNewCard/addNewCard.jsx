import stylesCSS from "./styles.module.css";

export default function AddNewCard(props) {
  return (
    <div className={stylesCSS.addNewCard}>
      <h1 className={stylesCSS.heading}>Add New</h1>
      <form>
        <div className={stylesCSS.card}>
          <div className={stylesCSS.inputArea}>
            <input
              id={props.inputId}
              className={stylesCSS.input}
              type="text"
              placeholder={props.placeholder}
            />
          </div>
          <div className={stylesCSS.buttonArea}>
            <button className={stylesCSS.addButton} onClick={props.onClick}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
