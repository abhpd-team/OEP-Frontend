import stylesCSS from "./styles.module.css"

// props{
//     header
//     footer
//     deleteHandler - function to handle delete operation
// }

export default function SmallCard (props){
    return (
        <div className={stylesCSS.card}>
            <div className={stylesCSS.cardHeader}>
                <div className={stylesCSS.deleteCard} onClick={props.deleteHandler}>
                    <p className={stylesCSS.deleteCross}>╳</p>
                </div>
                <a href={props.href}><h1>{props.header}</h1></a>
            </div>
            <div className={stylesCSS.cardFooter}>
                <p>{props.footer}</p>
            </div>
        </div>
    )
}