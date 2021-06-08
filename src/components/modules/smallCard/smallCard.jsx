import stylesCSS from "./styles.module.css";

// props{
//     header
//     footer
//     deleteHandler - function to handle delete operation
// }

export default function SmallCard(props) {
  return (
    <div className={stylesCSS.card + " cardS"}>
      <div className={stylesCSS.cardHeader}>
        <div className={stylesCSS.deleteCard} onClick={props.deleteHandler}>
          <p className={stylesCSS.deleteCross}>
            <i className="fas fa-2x fa-times"></i>
          </p>
        </div>
        <a href={props.href}>
          <h1 className={stylesCSS.cardHeading}>{props.header}</h1>
        </a>
      </div>
      <div className={stylesCSS.cardFooter}>{props.footer}</div>
    </div>
  );
}
