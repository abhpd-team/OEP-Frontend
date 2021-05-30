import stylesCSS from "./styles.module.css";

// Importing Components
import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";

// Importing resources
import BannerLogo from "./../resources/images/Bigger-logo.png";

export default function Landing(props) {
  console.log(window.screen.width);
  return (
    <div>
      <Navbar />

      {/* <div className={"stylesCSS.pageContainer"}>
                <div className={`${"stylesCSS.headBanner"} ${"stylesCSS.centerCard"}`}>
                    <div className={"stylesCSS.bannerLogo"}>
                        <img src={BannerLogo} alt="" />
                    </div>
                    <div className={"stylesCSS.taglineContainer"}>
                        <p>Secure, Reliable & easy to use.</p>
                    </div>
                    <div className={"stylesCSS.buttonContainer"}>
                        <a href="/login"><button>Login</button></a>
                        <a href="/signup"><button>Signup</button></a>
                    </div>
                </div>
                <div className={`${"stylesCSS.featureContainer"} ${"stylesCSS.centerCard"} ${"stylesCSS.whiteBackground"}`}>
                    <div className={"stylesCSS.featureImage"}>
                        <i class="fas fa-hands fa-7x"></i>
                    </div>
                    <div className={"stylesCSS.featureHeading"}>
                        <h1>Ease of Use</h1>
                    </div>
                    <div className={"stylesCSS.featureInfo"}>
                        <p>We know the stuggle of examiners who had to take online exam
                        therefore we made this whole system with ease of use as our primary concern.</p>
                    </div>
                </div>
                <div className={`${"stylesCSS.featureContainer"} ${'stylesCSS.centerCard'}`}>
                    <div className={'stylesCSS.featureImage'}>
                        <i class="fas fa-cogs fa-7x"></i>
                    </div>
                    <div className={"stylesCSS.featureHeading"}>
                        <h1>Control, all yours.</h1>
                    </div>
                    <div className={"stylesCSS.featureInfo"}>
                        <p>Create and save classes, question bank and choose when to show the result.
                        You also get detailed result of the whole class and on a per student basis</p>
                    </div>
                </div>
                <div className={`${"stylesCSS.centerCard"}  ${"stylesCSS.whiteBackground"}`}>
                    <h1>Other Features</h1>
                    <div className={"stylesCSS.featureRow"}>
                        <div className={"stylesCSS.featureCol"}>
                            <div className={"stylesCSS.feature"}>
                                <h2>Automatic exam URL</h2>
                                <p>As soon as you create an exam, the system generates a unique URL you can share with candidates to take the exam.</p>
                            </div>
                            <div className={"stylesCSS.feature"}>
                                <h2>Automatic login details</h2>
                                <p>As soon as you create an exam, the system also generates unique login details for all your class candidates and shares on their respective emails.</p>
                            </div>
                        </div>
                        <div className={"stylesCSS.featureCol"}>
                            <div className={"stylesCSS.feature"}>
                                <h2>Reuse your Data</h2>
                                <p>The system is tailored such that you maximize the use of your data by saving question banks and class details which you can edit whenever you need to.</p>
                            </div>
                            <div className={"stylesCSS.feature"}>
                                <h2>Results on your control</h2>
                                <p>The system also allows to that you can choose if the candidates can see their results at exit or when you release.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'stylesCSS.contactDetails'}>
                    <div className={'stylesCSS.developer'}>
                        <p>Made with ❤️ by
                        Abhishek Kumar Prasad | <a href="https://www.linkedin.com/in/abhpd/" target="_blank" rel="noopener noreferrer">Linkedin</a> | <a href="https://github.com/abhpd" target="_blank" rel="noopener noreferrer">Github</a> | <a href="https://twitter.com/abhpd" target="_blank" rel="noopener noreferrer">Twitter</a> 
                        Anubhav Sharma | <a href="https://www.linkedin.com/in/anubhav-sharma-0356641b6/" target="_blank" rel="noopener noreferrer">Linkedin</a> | <a href="https://github.com/19BCS1114" target="_blank" rel="noopener noreferrer">Github</a> |</p>
                    </div>
                    <div className={'stylesCSS.developerDetails'}>
                        <p>
                            Undergraduate Students at
                        Chandigarh University

                        Contact us at
                        abhpdmail@gmail.com
                        </p>
                    </div>
                </div>
            </div> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col mt-2 mb-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 mt-5 pt-5 px-5">
                <img src={BannerLogo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row">
              <div
                className={"col-12 pt-3 text-center " + stylesCSS.bannerText}
              >
                <p>Secure, Reliable & Easy to use.</p>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                <a
                  href="/login"
                  className={
                    "btn btn-secondary font-weight-bold m-1 mx-2 btn-sm " +
                    stylesCSS.bannerButton +
                    " " +
                    (window.screen.width <= 600 ? "btn-block py-2 mx-5" : " ")
                  }
                >
                  <div className="px-3 px-md-5 py-md-1">Login</div>
                </a>
              </div>
              <div className="col-md-6 d-flex justify-content-center justify-content-md-start">
                <a
                  href="/signup"
                  className={
                    "btn btn-secondary font-weight-bold m-1 mx-2 btn-sm " +
                    stylesCSS.bannerButton +
                    " " +
                    (window.screen.width <= 600 ? "btn-block py-2 mx-5" : " ")
                  }
                >
                  <div className="px-3 px-md-5 py-md-1">Signup</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white pt-5">
          <div className="col text-center ">
            <div className="row">
              <div
                className={
                  "col-12 font-weight-bold mt-3 mb-5 " + stylesCSS.bannerHeading
                }
              >
                Ease Of Use
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <div className="row">
              <div className="col-12">
                <i className="fas fa-hands fa-7x"></i>
              </div>
            </div>
            <div className="row">
              <div
                className={
                  "col-12 col-md-8 offset-md-2 p-5 mb-3 " + stylesCSS.pText
                }
              >
                We know the stuggle of examiners who had to take online exams,
                therefore, we made this whole system with ease of use as our
                primary concern.
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col text-center ">
            <div className="row">
              <div
                className={
                  "col-12 font-weight-bold mt-3 mb-5 " + stylesCSS.bannerHeading
                }
              >
                Control,{window.screen.width <= 600 ? <br /> : " "}
                all yours
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <div className="row">
              <div className="col-12">
                {" "}
                <i className="fas fa-cogs fa-7x"></i>
              </div>
            </div>
            <div className="row">
              <div
                className={
                  "col-12 col-md-8 offset-md-2 p-5 mb-3 " + stylesCSS.pText
                }
              >
                Create and save classes, question bank and choose when to show
                the result. You also get detailed result of the whole class and
                on a per student basis
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white pt-5 pb-5">
          <div className="col">
            <div className="row pb-5">
              <div className="col mt-3">
                <h1 className="font-weight-bold text-center">Other Features</h1>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-4 offset-md-1 col-12 pb-1">
                <h4 className="font-weight-bold text-center">
                  Automatic exam URL
                </h4>
                <p className="text-center p-2 d-none d-md-block">
                  As soon as you create an exam, the system generates a unique
                  URL you can share with candidates to take the exam.
                </p>
              </div>
              <div className="col-md-4 offset-md-2 col-12">
                <h4 className="font-weight-bold text-center">
                  Automatic login details
                </h4>
                <p className="text-center p-2 d-none d-md-block">
                  As soon as you create an exam, the system also generates
                  unique login details for all your class candidates and shares
                  on their respective emails.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 offset-md-1 mb-1 col-12">
                <h4 className="font-weight-bold text-center">
                  Reuse your Data
                </h4>
                <p className="text-center p-2 d-none d-md-block">
                  The system is tailored such that you maximize the use of your
                  data by saving question banks and class details which you can
                  edit whenever you need to.
                </p>
              </div>
              <div className="col-md-4 offset-md-2 col-12">
                <h4 className="font-weight-bold text-center">
                  Results on your control
                </h4>
                <p className="text-center p-2 d-none d-md-block">
                  The system also allows to that you can choose if the
                  candidates can see their results at exit or when you release.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center py-4 mt-4">
            <p>
              Made with ❤️ by, <br />
              Abhishek Prasad |
              <a href="https://www.linkedin.com/in/abhpd/">Linkedin</a> |
              <a href="https://abhpd.github.io/">Github</a>| <br /> Anubhav
              Sharma |
              <a href="https://www.linkedin.com/in/anubhav-sharma-0356641b6/">
                Linkedin
              </a>
              |<a href=" https://github.com/19BCS1114">Github </a>| <br />
              Chanchal Mishra |
              <a href="https://www.linkedin.com/in/">Linkedin </a>|
              <a href=" https://github.com/chnlmshr">Github </a>|
            </p>
          </div>
          <div className={"col-md-6 text-center py-4 mt-md-4"}>
            <p className={stylesCSS.contacts}>
              Undergraduate Students at <br /> Chandigarh University. <br />{" "}
              <br />
              Contact us at
              <br />
              <a href="mailto:abhpdmail@gmail.com">abhpdmail@gmail.com</a>{" "}
              <br />{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
