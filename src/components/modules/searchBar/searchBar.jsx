import stylesCSS from "./styles.module.css";
import { useState } from "react";

export default function SearchBar(props) {
  const [state, setState] = useState({ cardName: "" });
  const searchHandler = (event) => {
    setState({ cardName: event.target.value });
    let cards = document.getElementsByClassName("cardS");
    if (event.target.value !== "") {
      for (let i = 0; i < cards.length; i++) {
        if (
          cards[
            i
          ].firstElementChild.lastElementChild.firstElementChild.innerHTML
            .toLowerCase()
            .search(event.target.value.toLowerCase()) === -1
        ) {
          cards[i].classList.add("d-none");
        } else {
          cards[i].classList.remove("d-none");
        }
      }
    } else {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("d-none");
      }
    }
  };
  return (
    <div className={stylesCSS.searchBarContainer}>
      <input
        className={stylesCSS.searchBar}
        type="text"
        placeholder={props.placeholder}
        value={state.cardName}
        onChange={searchHandler}
      />
    </div>
  );
}
