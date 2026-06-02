let nodes;
let edges;
let network;

/* -------------------------------------------------
   EDGE NORMALIZER (ARRAY + MULTI RELATIONS FIX)
------------------------------------------------- */
function normalizeEdges(rawEdges) {
    const result = [];

    rawEdges.forEach(edge => {
        const targets = Array.isArray(edge.to) ? edge.to : [edge.to];

        targets.forEach(to => {

            result.push({
                id: `${edge.from}-${to}-${edge.label}`,

                from: edge.from,
                to: to,

                label: edge.label,

                color: edge.color,

                arrows: edge.arrows || "",

                dashes: edge.dashes || false,

                width:
                    edge.label === "Partner" ? 3 :
                    edge.label === "Affair" ? 2 :
                    2,

                /* -------------------------------------------------
                   ⭐ BELANGRIJK: maakt 2 aparte pijlen zichtbaar
                   (Mother + Partner worden niet meer over elkaar gelegd)
                ------------------------------------------------- */
                smooth: {
                    enabled: true,

                    type:
                        edge.label === "Partner"
                            ? "curvedCW"
                            : edge.label === "Mother"
                            ? "curvedCCW"
                            : "continuous",

                    roundness:
                        edge.label === "Partner"
                            ? 0.25
                            : edge.label === "Mother"
                            ? 0.55
                            : 0.4
                }
            });
        });
    });

    return result;
}

/* -------------------------------------------------
   INIT NETWORK
------------------------------------------------- */
async function initNetwork() {
    const response = await fetch("../json/greek_data.json");
    const json = await response.json();

    nodes = new vis.DataSet(json.nodes);
    edges = new vis.DataSet(normalizeEdges(json.edges));

    const container = document.getElementById("mynetwork");

    const data = { nodes, edges };

    const options = {
        nodes: {
            shape: "dot",
            font: { size: 16, face: "Arial" },
            borderWidth: 2,
            shadow: true
        },

        edges: {
            smooth: false, // belangrijk: we gebruiken per-edge smooth
            font: { align: "middle", size: 12 },
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.8
                }
            }
        },

        physics: {
            enabled: true,
            solver: "barnesHut",
            barnesHut: {
                gravitationalConstant: -3000,
                springLength: 220,
                springConstant: 0.04,
                damping: 0.09
            }
        },

        interaction: {
            hover: true,
            zoomView: true,
            dragNodes: true
        }
    };

    network = new vis.Network(container, data, options);

    /* -------------------------------------------------
       ⭐ FIX: NO OVERLAP AT SPAWN
    ------------------------------------------------- */
    nodes.forEach(node => {
        nodes.update({
            id: node.id,
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600
        });
    });

    network.stabilize();
}

/* -------------------------------------------------
   RESET VIEW
------------------------------------------------- */
function resetView() {
    nodes.forEach(node => {
        nodes.update({
            id: node.id,
            color: node.color,
            size: node.size
        });
    });

    edges.forEach(edge => {
        edges.update({
            id: edge.id,
            color: edge.color,
            width: edge.width || 1,
            dashes: edge.dashes || false,
            label: edge.label || ""
        });
    });

    network.fit({ animation: true });
}

/* -------------------------------------------------
   START
------------------------------------------------- */
initNetwork();