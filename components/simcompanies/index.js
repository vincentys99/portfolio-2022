import { useEffect, useRef, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import BackToHome_Button from "../ui/btn_backToHome";

import classes from "./index.module.css";

function getFormOptions() {
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

  const executives = ["COO", "CFO", "CMO", "CTO"];

  const results = { emptyList, economyPhases, buildings, executives };

  return results;
}

export default function SimCompanies_Index() {
  const onSubmit_Handler = async function (event) {
    event.preventDefault();

    const cooValues = [
      coo1_Ref.current.value ? coo1_Ref.current.value : 0,
      coo2_Ref.current.value ? coo2_Ref.current.value : 0,
      coo3_Ref.current.value ? coo3_Ref.current.value : 0,
      coo4_Ref.current.value ? coo4_Ref.current.value : 0,
    ];

    const cfoValues = [
      cfo1_Ref.current.value ? cfo1_Ref.current.value : 0,
      cfo2_Ref.current.value ? cfo2_Ref.current.value : 0,
      cfo3_Ref.current.value ? cfo3_Ref.current.value : 0,
      cfo4_Ref.current.value ? cfo4_Ref.current.value : 0,
    ];

    const cmoValues = [
      cmo1_Ref.current.value ? cmo1_Ref.current.value : 0,
      cmo2_Ref.current.value ? cmo2_Ref.current.value : 0,
      cmo3_Ref.current.value ? cmo3_Ref.current.value : 0,
      cmo4_Ref.current.value ? cmo4_Ref.current.value : 0,
    ];

    const ctoValues = [
      cto1_Ref.current.value ? cto1_Ref.current.value : 0,
      cto2_Ref.current.value ? cto2_Ref.current.value : 0,
      cto3_Ref.current.value ? cto3_Ref.current.value : 0,
      cto4_Ref.current.value ? cto4_Ref.current.value : 0,
    ];

    const reqBody = {
      economyPhase: economyPhase_Ref.current.value,
      buildingID: buildingID_Ref.current.value,
      buildingLvl: buildingLvl_Ref.current.value,
      productID: productID_Ref.current.value,
      cog: cog_Ref.current.value,
      quality: quality_Ref.current.value,
      runtime: runtime_Ref.current.value,
      executives: { cooValues, cfoValues, cmoValues, ctoValues },
      totalBuildings: totalBuildings_Ref.current.value,
      recBonus: recBonus_Ref.current.value,
    };

    const response = await fetch("/api/simcompanies/result", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      console.log(data);
      setPopupText(JSON.stringify(data))
      setShowPopup(true);
    } else {
      console.log("Form submission error.");
    }
  };

  const getBuildingProducts = async () => {
    setBuildingProducts(emptyList);

    const buildingID_entered = buildingID_Ref.current.value;

    const response = await fetch(
      `/api/simcompanies/building/${buildingID_entered}`
    );
    const data = await response.json();
    if (data) {
      const buildingProducts = data.doesSell.map((item) => ({
        id: item.db_letter,
        value: item.name,
      }));
      setBuildingProducts(buildingProducts);
    } else {
      console.log("Unable to retrieve products list.");
    }
  };

  const { emptyList, economyPhases, buildings, executives } = getFormOptions();

  const [buildingProducts, setBuildingProducts] = useState(emptyList);

  const economyPhase_Ref = useRef();
  const buildingID_Ref = useRef();
  const buildingLvl_Ref = useRef();
  const productID_Ref = useRef();
  const cog_Ref = useRef();
  const quality_Ref = useRef();
  const runtime_Ref = useRef();
  const coo1_Ref = useRef();
  const coo2_Ref = useRef();
  const coo3_Ref = useRef();
  const coo4_Ref = useRef();
  const cfo1_Ref = useRef();
  const cfo2_Ref = useRef();
  const cfo3_Ref = useRef();
  const cfo4_Ref = useRef();
  const cmo1_Ref = useRef();
  const cmo2_Ref = useRef();
  const cmo3_Ref = useRef();
  const cmo4_Ref = useRef();
  const cto1_Ref = useRef();
  const cto2_Ref = useRef();
  const cto3_Ref = useRef();
  const cto4_Ref = useRef();
  const totalBuildings_Ref = useRef();
  const recBonus_Ref = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });

    getBuildingProducts(buildings[0].id);
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const closePopup_Handler = (e) => {
    console.log(e);
  };

  return (
    <div className={classes.index}>
      <div className={classes.header}>
        <h1 data-aos={"fade-right"}>Sim Companies</h1>
        <p data-aos={"fade-right"}>{"(my private playground)"}</p>
        <BackToHome_Button />
      </div>
      <div
        className={classes.container}
        data-aos={"zoom-in-down"}
        data-aos-delay={"500"}
      >
        <form className={classes.form} onSubmit={onSubmit_Handler}>
          <h3 style={{ textAlign: "center", marginTop: "0px" }}>
            Optimized P/H/L
          </h3>
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
          <div className={classes.formRow + " " + classes.two_one}>
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
              <label htmlFor={"buildingLvl"}>Level</label>
              <select
                id={"buildingLvl"}
                className={classes.formControl}
                ref={buildingLvl_Ref}
              >
                {[...Array(10).keys()].map((item) => {
                  return (
                    <option key={item} value={item + 1}>
                      {item + 1}
                    </option>
                  );
                })}
              </select>
            </div>
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
          <div className={classes.formRow + " " + classes.one_one}>
            <div className={classes.formGroup}>
              <label htmlFor="cog">COG</label>
              <input
                id="cog"
                type={"number"}
                min={0}
                pattern="\d*"
                className={classes.formControl}
                ref={cog_Ref}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="quality">Quality</label>
              <input
                id="quality"
                type={"number"}
                min={0}
                max={10}
                pattern="\d*"
                placeholder="0 ~ 10"
                className={classes.formControl}
                ref={quality_Ref}
                required
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="runtime">Runtime (hours)</label>
            <input
              id="runtime"
              type={"number"}
              min={0}
              max={24}
              pattern="\d*"
              placeholder="0 ~ 24"
              className={classes.formControl}
              ref={runtime_Ref}
              required
            />
          </div>
          {executives.map((item, index) => {
            var ref1,
              ref2,
              ref3,
              ref4 = undefined;

            switch (index) {
              case 0:
                ref1 = coo1_Ref;
                ref2 = coo2_Ref;
                ref3 = coo3_Ref;
                ref4 = coo4_Ref;
                break;
              case 1:
                ref1 = cfo1_Ref;
                ref2 = cfo2_Ref;
                ref3 = cfo3_Ref;
                ref4 = cfo4_Ref;
                break;
              case 2:
                ref1 = cmo1_Ref;
                ref2 = cmo2_Ref;
                ref3 = cmo3_Ref;
                ref4 = cmo4_Ref;
                break;
              case 3:
                ref1 = cto1_Ref;
                ref2 = cto2_Ref;
                ref3 = cto3_Ref;
                ref4 = cto4_Ref;
                break;
            }

            return (
              <div className={classes.formGroup} key={item}>
                <label>{item}</label>
                <div className={classes.formControlRow + " " + classes.four}>
                  <input
                    id={`${item}1`}
                    type={"number"}
                    min={0}
                    max={99}
                    maxLength={2}
                    pattern="\d*"
                    className={classes.formControl}
                    ref={ref1}
                  />
                  <input
                    id={`${item}2`}
                    type={"number"}
                    min={0}
                    max={99}
                    pattern="\d*"
                    className={classes.formControl}
                    ref={ref2}
                  />
                  <input
                    id={`${item}3`}
                    type={"number"}
                    min={0}
                    max={99}
                    pattern="\d*"
                    className={classes.formControl}
                    ref={ref3}
                  />
                  <input
                    id={`${item}4`}
                    type={"number"}
                    min={0}
                    max={99}
                    pattern="\d*"
                    className={classes.formControl}
                    ref={ref4}
                  />
                </div>
              </div>
            );
          })}
          <div className={classes.formRow + " " + classes.one_one}>
            <div className={classes.formGroup}>
              <label htmlFor="totalBuildings">Total Buildings</label>
              <input
                id="totalBuildings"
                type={"number"}
                min={0}
                max={20}
                pattern="\d*"
                placeholder="0 ~ 20"
                className={classes.formControl}
                ref={totalBuildings_Ref}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="recBonus">Recreation Bonus (%)</label>
              <input
                id="recBonus"
                type={"number"}
                min={0}
                max={9}
                pattern="\d*"
                placeholder="0 ~ 9"
                className={classes.formControl}
                ref={recBonus_Ref}
              />
            </div>
          </div>
          <button className={classes.btn}>Get Result</button>
        </form>
      </div>
      <div
        className={`${classes.overlay} ${
          showPopup ? classes.popupShow : classes.popupHide
        }`}
        onClick={closePopup_Handler}
      >
        <div className={classes.popupContainer}>
          <div className={classes.popup}>
            <p>{popupText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
