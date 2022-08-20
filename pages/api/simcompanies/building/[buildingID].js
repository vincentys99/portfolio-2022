export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { buildingID } = req.query;

      const response = await fetch(
        `https://www.simcompanies.com/api/v3/0/encyclopedia/buildings/${buildingID}/`
      );
      const data = await response.json();

      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  res.status(405);
  res.end();
}