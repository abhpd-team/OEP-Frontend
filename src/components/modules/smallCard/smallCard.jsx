import stylesCSS from "./styles.module.css"

export default function SmallCard (props){
    return (
        <div className={stylesCSS.card}>
            <div className={stylesCSS.cardHeader}>
                <h1>{props.header}</h1>
            </div>
            <div className={stylesCSS.cardFooter}>
                <p>{props.footer}</p>
            </div>
        </div>
    )
}