const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://portfolio-2022-steel-chi.vercel.app/";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const economyPhase = req.body.economyPhase;
      const buildingID = req.body.buildingID;
      const productID = req.body.productID;

      const response = await fetch(
        `${server}/api/simcompanies/building/${buildingID}`
      );
      const data = await response.json();

      res
        .status(200)
        .json({
          economyPhase: economyPhase,
          buildingInfo: data,
          productID: productID,
        });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  res.status(405);
  res.end();
}
