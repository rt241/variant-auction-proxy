// api/status.js
export default function handler(req, res) {
  // Expect query like: /api/status?ids=123,456,789
  const idsParam = req.query.ids || '';
  const ids = idsParam
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);

  // For now: no random, no DB.
  // We just say "no recorded bids yet" for every variant.
  // Front-end will keep the Shopify starting price you set in Liquid.
  const payload = ids.map(id => ({
    id,
    highestBid: 0
  }));

  res.status(200).json(payload);
}
