import stylesCSS from "./styles.module.css"

export default function Footer (props){
    return (
        <div className={stylesCSS.footerContainer}>
            <div className={stylesCSS.footerTextContainer}>
                <p>Copyright© 2023. All Rights Reserved.</p>
            </div>
        </div>
    );
}