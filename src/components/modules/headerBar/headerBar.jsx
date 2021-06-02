import stylesCSS from "./styles.module.css";

export default function HeaderBar(props) {
  return (
    <div className={stylesCSS.headerBarContainer}>
      <div className={stylesCSS.backButtonContainer}>
        <a href={props.backHref}>
          <div className={stylesCSS.backButton}>
            <i className="fas fa-2x fa-arrow-left"></i>
          </div>
        </a>
      </div>
      <div className={stylesCSS.headerContainer}>
        <h1>{props.header}</h1>
      </div>
      <div className={stylesCSS.sideHeaderContainer}>
        <strong>{props.sideHeader}</strong>
      </div>
    </div>
  );
}
