// Study 02's data, kept out of Study.jsx so the server pages can read it (a "use client" module only exports components).

// Three seats, each holding one part of the whole. The data center pays if revenue is more than power and water together.
export const SEATS = [
  { id: "company", name: "The company", holds: "revenue", label: "Revenue", range: [4, 12] },
  { id: "utility", name: "The utility", holds: "power", label: "Power cost", range: [1, 7] },
  { id: "neighbours", name: "The neighbours", holds: "water", label: "Water cost", range: [1, 7] },
];

// The first deal is fixed, so the page renders the same on the server and in the browser; New deal draws at random.
export const FIRST_DEAL = { revenue: 9, power: 4, water: 3 };

// The printed sheet: a finished round, revealed. The company said more than it knew; the table built and lost.
export const PRINT_ROUND = {
  deal: { revenue: 6, power: 3, water: 5 },
  claims: { company: "11", utility: "3", neighbours: "5" },
  votes: { company: "build", utility: "build", neighbours: "no" },
  revealed: true,
};
