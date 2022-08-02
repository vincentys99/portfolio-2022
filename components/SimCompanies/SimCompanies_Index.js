import { useEffect, useRef, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import BackToHome_Button from "../ui/btn_backToHome";

import classes from "./SimCompanies_Index.module.css";

export default function SimCompanies_Index() {
  const onSubmit_Handler = async function (event) {
    event.preventDefault();

    console.log("Getting results...");

    const economyPhase_entered = economyPhase_Ref.current.value;
    const buildingID_entered = buildingID_Ref.current.value;
    const productID_entered = productID_Ref.current.value;

    const reqBody = {
      economyPhase: economyPhase_entered,
      buildingID: buildingID_entered,
      productID: productID_entered,
    };

    const response = await fetch("/api/simcompanies/result", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const getBuildingProducts = async () => {
    console.log("Getting products...");

    setBuildingProducts(emptyList);

    const buildingID_entered = buildingID_Ref.current.value;

    const response = await fetch(
      `/api/simcompanies/building/${buildingID_entered}`
    );
    const data = await response.json();
    const buildingProducts = data.doesSell.map((item) => ({
      id: item.db_letter,
      value: item.name,
    }));

    setBuildingProducts(buildingProducts);

    console.log("Product list updated");
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const economyPhase_Ref = useRef();
  const buildingID_Ref = useRef();
  const productID_Ref = useRef();

  const emptyList = [
    {
      id: "",
      value: "-",
    },
  ];

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

  const buildings = [
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

  const [buildingProducts, setBuildingProducts] = useState(emptyList);

  useEffect(() => {
    getBuildingProducts(buildings[0].id);
  }, []);

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
            <label htmlFor={"buildingID"}>Retail Building</label>
            <select
              id={"buildingID"}
              className={classes.formControl}
              ref={buildingID_Ref}
              onChange={getBuildingProducts}
            >
              {buildings.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="productID">Product</label>
            <select
              id="productID"
              className={classes.formControl}
              ref={productID_Ref}
            >
              {buildingProducts.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <button className={classes.btn}>Get Result</button>
        </form>
      </div>
    </>
  );
}
