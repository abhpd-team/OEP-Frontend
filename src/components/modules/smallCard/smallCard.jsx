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
          <h1>{props.header}</h1>
        </a>
      </div>
      <div className={stylesCSS.cardFooter}>{props.footer}</div>
    </div>
  );
}

{
  //   <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8" />
  //     <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> -->
  //     <!-- CSS only -->
  //     <link
  //       rel="stylesheet"
  //       href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  //       integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
  //       crossorigin="anonymous"
  //     />
  //     <link
  //       rel="stylesheet"
  //       href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  //       integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
  //       crossorigin="anonymous"
  //     />
  //     <script
  //       src="https://kit.fontawesome.com/c00227cd9f.js"
  //       crossorigin="anonymous"
  //     ></script>
  //     <meta name="viewport" content="width=device-width, initial-scale=1" />
  //     <meta name="theme-color" content="#000000" />
  //     <meta
  //       name="description"
  //       content="Web site created using create-react-app"
  //     />
  //     <title>Online Exam Portal</title>
  //   </head>
  //   <body>
  //     <noscript>You need to enable JavaScript to run this app.</noscript>
  //     <div id="root"></div>
  //     <script
  //       src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  //       integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  //       integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
  //       integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  //       integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  //       integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
  //       integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
  //       crossorigin="anonymous"
  //     ></script>
  //   </body>
  // </html>
}
