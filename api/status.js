export default function handler(req, res) {
  // Build a URL object so we can read query parameters like ?ids=111,222
  const url = new URL(req.url, "https://dummy-base");

  // Get the "ids" query parameter, e.g. "111,222"
  const idsParam = url.searchParams.get("ids");

  // If no ?ids=... is provided, return the simple test message
  if (!idsParam) {
    return res.status(200).json({
      ok: true,
      message: "Proxy is working"
    });
  }

  // Turn "111,222" into ["111", "222"]
  const ids = idsParam
    .split(",")
    .map(id => id.trim())
    .filter(Boolean);

  // For now, create a fake highestBid for each id
  // Example: for ids [111, 222, 333] => 100, 105, 110
  const result = ids.map((id, index) => ({
    id,
    highestBid: 100 + index * 5
  }));

  // Return the array as JSON
  res.status(200).json(result);
}
