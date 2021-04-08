import stylesCSS from "./styles.module.css"

export default function SearchBar (props){
    return (
        <div className={stylesCSS.searchBarContainer}>
            <input className={stylesCSS.searchBar} type="text" placeholder={props.placeholder}/>
        </div>
    )
}