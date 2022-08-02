import { useEffect, useRef } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import BackToHome_Button from "../ui/btn_backToHome";

import classes from "./SimCompanies_Index.module.css";

export default function SimCompanies_Index() {
  const onSubmit_Handler = async function (event) {
    event.preventDefault();
    console.log(economyPhase_Ref.current.value);
    console.log(retailBuildingID_Ref.current.value);

    const response = await fetch(
      `https://www.simcompanies.com/api/v3/0/encyclopedia/buildings/${retailBuildingID_Ref.current.value}/`
    );
    console.log(response);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const economyPhase_Ref = useRef();
  const retailBuildingID_Ref = useRef();

  const economyPhases = [
    {
      id: 0,
      value: "Recession",
    },
    {
      id: 1,
      value: "Normal",
    },
    {
      id: 2,
      value: "Boom",
    },
  ];

  const retailBuildings = [
    {
      id: "G",
      value: "Grocery Store",
    },
    {
      id: "d",
      value: "Hardware Store",
    },
    {
      id: "H",
      value: "Fashion Store",
    },
    {
      id: "C",
      value: "Electronics Store",
    },
    {
      id: "2",
      value: "Car Dealership",
    },
    {
      id: "A",
      value: "Gas Station",
    },
    {
      id: "B",
      value: "Sales Office",
    },
    {
      id: "r",
      value: "Restaurant",
    },
  ];

  return (
    <>
      <div className={classes.header}>
        <h1 data-aos={"fade-right"}>Sim Companies</h1>
        <BackToHome_Button />
      </div>
      <div
        className={classes.container}
        data-aos={"zoom-in"}
        data-aos-delay={"500"}
      >
        <form className={classes.form} onSubmit={onSubmit_Handler}>
          <div className={classes.formGroup}>
            <label htmlFor={"economyPhase"}>Economy Phase</label>
            <select
              id={"economyPhase"}
              className={classes.formControl}
              ref={economyPhase_Ref}
            >
              {economyPhases.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor={"retailBuildingID"}>Retail Building</label>
            <select
              id={"retailBuildingID"}
              className={classes.formControl}
              ref={retailBuildingID_Ref}
            >
              {retailBuildings.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <button className={classes.btn}>Generate</button>
        </form>
      </div>
    </>
  );
}
