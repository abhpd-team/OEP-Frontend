import stylesCSS from "./styles.module.css"

export default function AddNewCard (props){
    return (
        <div className={stylesCSS.addNewCard}>
            <h1>Add New</h1>
            <div className={stylesCSS.card}>
                <div className={stylesCSS.inputArea}>
                    <input className={stylesCSS.input} type="text" placeholder={props.placeholder}/>
                </div>
                <div className={stylesCSS.buttonArea}>
                    <button className={stylesCSS.addButton}>Add</button>
                </div>
            </div>
        </div>
    )
}