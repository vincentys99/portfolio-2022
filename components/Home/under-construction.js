import { useEffect } from "react";
import Link from "next/link";

import AOS from "aos";
import "aos/dist/aos.css";

import classes from "./under-construction.module.css";

export default function UnderConstruction() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className={classes.container}>
      <span data-aos={"fade-down"}>
        <Link href={"/sim-companies"}>
          <a className={classes.btnSimcompanies}>🚧</a>
        </Link>
      </span>
      <h1 data-aos={"fade-right"}>Under Construction</h1>
      <p data-aos={"fade-left"}>come back later</p>
    </div>
  );
}
