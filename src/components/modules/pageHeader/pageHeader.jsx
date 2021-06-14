import stylesCSS from "./styles.module.css";

export default function PageHeader(props) {
  return <div className={stylesCSS.pageHeader}>{props.header}</div>;
}
