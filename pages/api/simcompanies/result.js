const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://portfolio-2022-steel-chi.vercel.app/";

async function getCompanyInfo() {
  try {
    const companyID = 801182;
    const response = await fetch(
      `https://www.simcompanies.com/api/v2/companies/${companyID}/`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return;
  }
}

async function getBuildingInfo(buildingID) {
  try {
    const response = await fetch(
      `https://www.simcompanies.com/api/v3/0/encyclopedia/buildings/${buildingID}/`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return;
  }
}

async function getResourceInfo(economyPhase, resourceID) {
  try {
    const response = await fetch(
      `https://www.simcompanies.com/api/v4/en/0/encyclopedia/resources/${economyPhase}/${resourceID}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return;
  }
}

async function getTotalSalesModifier(salesModifier, executives, recBonus) {
  const coo = parseInt(executives.coo[2]);
  const cfo = parseInt(executives.cfo[2]);
  const cmo = parseInt(executives.cmo[2]);
  const cto = parseInt(executives.cto[2]);
  const executivesBonus = parseInt(cmo / 3 + (coo + cfo + cto) / 12);

  return (
    parseInt(salesModifier) + parseInt(executivesBonus) + parseInt(recBonus)
  );
}

async function getWagesPerHour(wages, buildingLvl, workers, executives) {
  const coo = parseInt(executives.coo[0]);
  const cfo = parseInt(executives.cfo[0]);
  const cmo = parseInt(executives.cmo[0]);
  const cto = parseInt(executives.cto[0]);
  const executivesBonus = coo + parseInt((cfo + cmo + cto) / 4);
  const adminRate = (workers - 100) / (170 * 100);
  const netAdminRate = adminRate * (1 - executivesBonus / 100);

  const wagesPerHour = wages * buildingLvl * (1 + netAdminRate);

  return wagesPerHour;
}

async function calculateTimePerUnit(retailModeling, curPrice, saturation) {
  const code = retailModeling
    .replace("*amount", "")
    .replace("price", curPrice.toString())
    .replace("saturation", saturation.toString());

  const timePerUnit = eval(code);
  return timePerUnit;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        economyPhase,
        buildingID,
        buildingLvl,
        resourceID,
        cog,
        quality,
        runtime,
        executives,
        totalBuildings,
        recBonus,
      } = req.body;

      const companyInfo = await getCompanyInfo();
      const buildingInfo = await getBuildingInfo(buildingID);
      const resourceInfo = await getResourceInfo(economyPhase, resourceID);

      const workers = companyInfo.company.workers;
      const salesModifier = companyInfo.company.salesModifier;
      const avgRetailPrice = resourceInfo.averageRetailPrice;
      const marketSaturation = resourceInfo.marketSaturation;
      const retailModeling = resourceInfo.retailModeling;

      const totalSalesModifier = await getTotalSalesModifier(
        salesModifier,
        executives,
        recBonus
      );

      const wagesPerHour = await getWagesPerHour(
        buildingInfo.wages,
        parseInt(buildingLvl),
        workers,
        executives
      );

      const avgRetailPrice_Rounded = Math.round(avgRetailPrice);

      var res_unitsPerHour = [];
      var res_unitsPerDay = [];
      var res_profitsPerHour = [];
      var res_profitsPerDay = [];
      var res_sellPrice = [];

      for (const x of Array(500).keys()) {
        const curPrice = avgRetailPrice_Rounded + (x - 250);
        const minSaturation = -0.38;
        const finalSaturation = marketSaturation - 0.24 * quality;
        const saturation =
          finalSaturation > minSaturation ? finalSaturation : minSaturation;
        const timePerUnit = await calculateTimePerUnit(
          retailModeling,
          curPrice,
          saturation
        );
        var unitPerHour = 3600 / timePerUnit;

        unitPerHour /= 1 - totalSalesModifier / 100;
        unitPerHour *= parseInt(buildingLvl);

        var profitPerUnit = curPrice - cog;
        var profitPerHour = profitPerUnit * unitPerHour;

        profitPerHour -= wagesPerHour;

        var unitPerDay = unitPerHour * runtime;
        var profitPerDay = profitPerHour * runtime;

        res_unitsPerHour.push(unitPerHour);
        res_unitsPerDay.push(unitPerDay);
        res_profitsPerHour.push(profitPerHour);
        res_profitsPerDay.push(profitPerDay);
        res_sellPrice.push(curPrice);
      }

      const index = res_profitsPerHour.indexOf(Math.max(...res_profitsPerHour));
      const selected_unitsPerDay = Math.round(res_unitsPerDay[index], 2);
      const selected_sellPrice = res_sellPrice[index];

      const pphpl = (res_profitsPerHour[index] / parseInt(buildingLvl)).toFixed(
        2
      );

      res.status(200).json({
        // companyInfo: companyInfo,
        // buildingInfo: buildingInfo,
        // resourceInfo: resourceInfo,
        units: selected_unitsPerDay,
        price: selected_sellPrice,
        pphpl: pphpl,
        // ...req.body,
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  res.status(405);
  res.end();
}
