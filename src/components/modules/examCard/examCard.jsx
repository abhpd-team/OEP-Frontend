import stylesCSS from "./styles.module.css"

export default function ExamCard (props){

    function copyTextFromCardLinkURL(event){
        var tempInput = document.createElement("input");
        tempInput.value = document.getElementById(event.target.dataset.examid).innerHTML;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        alert("Text Copied: " + tempInput.value);
        document.body.removeChild(tempInput);
    }

    return (
        <div className={stylesCSS.card}>
            <div className={stylesCSS.cardColorTab}></div>
            <div className={stylesCSS.cardContent}>
                <div className={stylesCSS.cardDetails}>
                    <div className={stylesCSS.cardDetailsContainer}>
                        <div className={stylesCSS.cardHeadRow}>
                            <div className={`${stylesCSS.cardHeadItem} ${stylesCSS.cardHeadTitle}`}>
                                <h2>{props.title}</h2>
                            </div>
                            <div className={`${stylesCSS.cardHeadItem} ${stylesCSS.cardHeadDate}`}>
                                <h3>{props.date}</h3>
                            </div>
                        </div>
                        <div className={stylesCSS.cardLinkRow}>
                            <div className={stylesCSS.cardLink}><p className={stylesCSS.cardLinkURLclass} id={props.examId}>{`${process.env.REACT_APP_FRONTEND_URL}/examlive/${props.examinerId}/${props.examId}`}</p></div>
                            <div className={stylesCSS.cardLinkCopy} onClick={copyTextFromCardLinkURL}><p data-examid={props.examId}>Copy</p></div>
                        </div>
                    </div>
                </div>
                <div className={stylesCSS.cardButtons}>
                    <a href={`/exams/${props.examId}`}><div className={stylesCSS.button}><i className="fas fa-expand-alt fa-2x"></i></div></a>
                    <div className={`${stylesCSS.button} ${stylesCSS.delButton}`} onClick={props.deleteExam} ><i className="fas fa-times fa-2x"></i></div>
                </div>
            </div>
        </div>
    )
}