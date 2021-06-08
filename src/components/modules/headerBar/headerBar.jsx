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
      <div className={stylesCSS.headerContainer + " font-weight-bold h2 "}>
        {props.header}
      </div>
      <div className={stylesCSS.sideHeaderContainer}>
        <strong>{props.sideHeader}</strong>
      </div>
    </div>
  );
}
