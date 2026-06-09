export const edges = [
    // Chaos
    { from: "chaos", to: "gaia", type: "emerged" },
    { from: "chaos", to: "tartarus", type: "emerged" },
    { from: "chaos", to: "nyx", type: "emerged" },
    { from: "chaos", to: "erebus", type: "emerged" },
    { from: "chaos", to: "eros", type: "emerged" },
    // Gaia
    { from: "gaia", to: "uranus", type: "mother" },
    { from: "gaia", to: "uranus", type: "spouse" },
    // Nyx
    { from: "nyx", to: "erebus", type: "spouse", primary: true },
    // Erebus
    { from: "erebus", to: "nyx", type: "spouse", primary: false },



    
];