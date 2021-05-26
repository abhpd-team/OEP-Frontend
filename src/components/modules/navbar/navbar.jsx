import logoMedium from "./../../resources/images/Logo-medium.png";

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
      title: "Questionbanks",
      href: "/questionbanks",
    },
  ];
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-grey pt-md-5 font-weight-bold text-dark">
      <a href="/" className="navbar-brand pl-md-5">
        {" "}
        <img src={logoMedium} width="50" height="50" alt="" />
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarMenu">
        <ul className="navbar-nav ml-auto">
          {navLinks.map((navlink) => {
            return (
              <div>
                <li className="nav-item">
                  <a href={navlink.href} className="nav-link">
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
