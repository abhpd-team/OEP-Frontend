import logoMedium from "./../../resources/images/Logo-medium.png";
import stylesCSS from "./styles.module.css";
export default function Navbar(props) {
  var navLinks = [
    {
      title: "Exams",
      href: "/exams",
    },
    {
      title: "Classes",
      href: "/classes",
    },
    {
      title: "Question Banks",
      href: "/questionbanks",
    },
  ];
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-grey font-weight-bold ">
      <a href="/" className={"navbar-brand " + stylesCSS.navbarIcon}>
        <img src={logoMedium} alt="" />
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={"collapse navbar-collapse " + stylesCSS.navLinks}
        id="navbarMenu"
      >
        <ul className="navbar-nav ml-auto">
          {navLinks.map((navlink) => {
            return (
              <div>
                <li className={"nav-item " + stylesCSS.navbarItem}>
                  <a href={navlink.href} className={"p-2 " + stylesCSS.navLink}>
                    {navlink.title}
                  </a>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
