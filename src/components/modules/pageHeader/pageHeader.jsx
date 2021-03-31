import stylesCSS from "./styles.module.css"

export default function PageHeader (props){
    return (
        <div className={stylesCSS.pageHeader}>
            <h1>{props.header}</h1>
        </div>
    )
}