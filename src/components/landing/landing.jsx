import stylesCSS from "./styles.module.css";

// Importing Components
import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";

// Importing resources
import BannerLogo from "./../resources/images/Bigger-logo.png"

export default function Landing (props){
    return (
        <div>
            <Navbar/>
            <div className={stylesCSS.pageContainer}>
                <div className={`${stylesCSS.headBanner} ${stylesCSS.centerCard}`}>
                    <div className={stylesCSS.bannerLogo}>
                        <img src={BannerLogo} alt=""/>
                    </div>
                    <div className={stylesCSS.taglineContainer}>
                        <p>Secure, Reliable & easy to use.</p>
                    </div>
                    <div className={stylesCSS.buttonContainer}>
                        <a href="/login"><button>Login</button></a>
                        <a href="/signup"><button>Signup</button></a>
                    </div>
                </div>
                <div className={`${stylesCSS.featureContainer} ${stylesCSS.centerCard} ${stylesCSS.whiteBackground}`}>
                    <div className={stylesCSS.featureImage}>
                        <i class="fas fa-hands fa-7x"></i>
                    </div>
                    <div className={stylesCSS.featureHeading}>
                        <h1>Ease of Use</h1>
                    </div>
                    <div className={stylesCSS.featureInfo}>
                        <p>We know the stuggle of examiners who had to take online exams<br/>
                        therefore we made this whole system with ease of use as our primary concern.</p>
                    </div>
                </div>
                <div className={`${stylesCSS.featureContainer} ${stylesCSS.centerCard}`}>
                    <div className={stylesCSS.featureImage}>
                        <i class="fas fa-cogs fa-7x"></i>
                    </div>
                    <div className={stylesCSS.featureHeading}>
                        <h1>Control, all yours.</h1>
                    </div>
                    <div className={stylesCSS.featureInfo}>
                        <p>Create and save classes, question bank and choose when to show the result. <br/>
                        You also get detailed result of the whole class and on a per student basis</p>
                    </div>
                </div>
                <div className={`${stylesCSS.centerCard}  ${stylesCSS.whiteBackground}`}>
                    <h1>Other Features</h1>
                    <div className={stylesCSS.featureRow}>
                        <div className={stylesCSS.featureCol}>
                            <div className={stylesCSS.feature}>
                                <h2>Automatic exam URL</h2>
                                <p>As soon as you create an exam, the system generates a unique URL you can share with candidates to take the exam.</p>
                            </div>
                            <div className={stylesCSS.feature}>
                                <h2>Automatic login details</h2>
                                <p>As soon as you create an exam, the system also generates unique login details for all your class candidates and shares on their respective emails.</p>
                            </div>
                        </div>
                        <div className={stylesCSS.featureCol}>
                            <div className={stylesCSS.feature}>
                                <h2>Reuse your Data</h2>
                                <p>The system is tailored such that you maximize the use of your data by saving question banks and class details which you can edit whenever you need to.</p>
                            </div>
                            <div className={stylesCSS.feature}>
                            <h2>Results on your control</h2>
                            <p>The system also allows to that you can choose if the candidates can see their results at exit or when you release.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stylesCSS.contactDetails}>
                    <div className={stylesCSS.developer}>
                        <p>Made with ❤️ by,<br/>
                        Abhishek Kumar Prasad | <a href="https://www.linkedin.com/in/abhpd/" target="_blank" rel="noopener noreferrer">Linkedin</a> | <a href="https://github.com/abhpd" target="_blank" rel="noopener noreferrer">Github</a> | <a href="https://twitter.com/abhpd" target="_blank" rel="noopener noreferrer">Twitter</a> |<br/>
                        Anubhav Sharma | <a href="https://www.linkedin.com/in/anubhav-sharma-0356641b6/" target="_blank" rel="noopener noreferrer">Linkedin</a> | <a href="https://github.com/19BCS1114" target="_blank" rel="noopener noreferrer">Github</a> |</p>
                    </div>
                    <div className={stylesCSS.developerDetails}>
                        <p>
                        Undergraduate Students at <br/>
                        Chandigarh University.<br/><br/>

                        Contact us at <br/>
                        abhpdmail@gmail.com <br/>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}