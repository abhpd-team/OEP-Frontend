import stylesCSS from "./styles.module.css";

import logoMedium from "./../../resources/images/Logo-medium.png";

export default function Navbar (props){
    var navLinks = [
        {
            title: "Exams",
            href: "/exams"
        },
        {
            title: "Classes",
            href: "/classes"
        },
        {
            title: "Question Banks",
            href: "/questionbanks"
        }
    ]
    return (
        <div className={stylesCSS.navbarContainer}>
            <div className={stylesCSS.navbarItems}>
                <div className={stylesCSS.navbarLogo}>
                    <a href="/"><img src={logoMedium} alt="logo"/></a>
                </div>
                <div className={stylesCSS.navbarLinksContainer}>
                    <div className={stylesCSS.navbarLinks}>
                        {navLinks.map((e,indx)=>{
                            return (
                                <div key={indx} className={`${stylesCSS.navbarLink} ${(e.title===props.current)?`${stylesCSS.currentLink}`:``}`}>
                                    <a href={e.href}>{`${e.title}`}</a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}