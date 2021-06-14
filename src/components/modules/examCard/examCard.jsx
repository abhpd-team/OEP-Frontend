import stylesCSS from "./styles.module.css";

export default function ExamCard(props) {
  function copyTextFromCardLinkURL(event) {
    var tempInput = document.createElement("input");
    tempInput.value = document.getElementById(
      event.target.dataset.examid
    ).innerHTML;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    alert("Text Copied: " + tempInput.value);
    document.body.removeChild(tempInput);
  }

  return (
    // <div className={stylesCSS.card}>
    //

    //   <div className={stylesCSS.cardContent}>
    //     <div className={stylesCSS.cardDetails}>
    //       <div className={stylesCSS.cardDetailsContainer}>
    //         <div className={stylesCSS.cardHeadRow}>
    //           <div
    //             className={`${stylesCSS.cardHeadItem} ${stylesCSS.cardHeadTitle}`}
    //           >
    //             <h2>{props.title}</h2>
    //           </div>
    //           <div
    //             className={`${stylesCSS.cardHeadItem} ${stylesCSS.cardHeadDate}`}
    //           >
    //             <h3>{props.date}</h3>
    //           </div>
    //         </div>
    //         <div className={stylesCSS.cardLinkRow}>
    //           <div className={stylesCSS.cardLink}>
    //             <p
    //               className={stylesCSS.cardLinkURLclass}
    //               id={props.examId}
    //             >{`${process.env.REACT_APP_FRONTEND_URL}/examlive/${props.examinerId}/${props.examId}`}</p>
    //           </div>
    //           <div
    //             className={stylesCSS.cardLinkCopy}
    //             onClick={copyTextFromCardLinkURL}
    //           >
    //             <p data-examid={props.examId}>Copy</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={stylesCSS.cardButtons}>
    //       <a href={`/exams/${props.examId}`}>
    //         <div className={stylesCSS.button}>
    //           <i className="fas fa-expand-alt fa-2x"></i>
    //         </div>
    //       </a>
    //       <div
    //         className={`${stylesCSS.button} ${stylesCSS.delButton}`}
    //         onClick={props.deleteExam}
    //       >
    //         <i className="fas fa-times fa-2x"></i>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className={"container mb-4 text-center cardS " + stylesCSS.card}>
        <div className="row pr-3 ">
          {/* <div className="col-1 d-flex align-items-center justify-content-left">
          <div className={stylesCSS.cardColorTab}> </div>
        </div> */}
          <div className="col-10">
            <div className="row">
              <div className="col d-flex ">
                <div className="px-1 pt-2 font-weight-bold h2">
                  {props.title}
                </div>
                <div className="px-2 pt-3 font-weight-bold h5 text-secondary text-center">
                  {props.date}
                </div>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-10 col-lg-11 pr-0">
                <div
                  className={stylesCSS.cardLinkURLclass}
                  id={props.examId}
                >{`${process.env.REACT_APP_FRONTEND_URL}/examlive/${props.examinerId}/${props.examId}`}</div>
              </div>
              <div
                className={
                  "col-2 col-lg-1 px-0 text-center pt-1 " +
                  stylesCSS.cardLinkCopy
                }
                onClick={copyTextFromCardLinkURL}
                data-examid={props.examId}
              >
                Copy
              </div>
            </div>
          </div>
          <div className={"col-1 d-flex align-items-center pr-0 "}>
            <a href={`/exams/${props.examId}`} className={stylesCSS.button}>
              <i className="fas fa-expand-alt fa-2x"></i>
            </a>
          </div>
          <div
            className="col-1 d-flex align-items-center pl-0 "
            onClick={props.deleteExam}
          >
            <i
              className={
                "fas fa-times fa-2x " +
                stylesCSS.button +
                " " +
                stylesCSS.delButton
              }
            ></i>
          </div>
        </div>
      </div>

      {/*TOGGLER*/}

      <div
        className={
          "container cardS mb-4 " + stylesCSS.mobileCard + " " + stylesCSS.card
        }
      >
        <div className={stylesCSS.linkToggle}>
          <div>
            <div className="row">
              <div className="col-10 ">
                <div className="row">
                  <div className="col px-4 pt-3 font-weight-bold  text-secondary text-left ">
                    {props.date}
                  </div>
                </div>
                <div className="row">
                  <a href={`/exams/${props.examId}`}>
                    <div className="col px-4 pt-2 font-weight-bold h2 text-left ">
                      {props.title}
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-2 align-items-center pt-4 pl-0 "
                onClick={props.deleteExam}
              >
                <i
                  className={
                    "fas fa-times fa-2x " +
                    stylesCSS.button +
                    " " +
                    stylesCSS.delButton
                  }
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
