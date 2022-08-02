import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import "aos/dist/aos.css";

import classes from "./btn_backToHome.module.css";

export default function BackToHome_Button() {
  return (
    <Link href={"/"}>
      <a
        data-aos={"fade-down"}
        data-aos-delay={"1500"}
        className={classes.link}
      >
        <FontAwesomeIcon icon={faCaretLeft} className={classes.iconLeft} />
        return to Home
      </a>
    </Link>
  );
}
