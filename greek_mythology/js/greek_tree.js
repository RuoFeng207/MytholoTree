console.log("script loaded");

import { nodes } from "../data/primordial_nodes.js";
import { edges as allEdges } from "../data/primordial_edges.js";

// Remove duplicate spouse edges (keep only one visual line)
const seen = new Set();

const edges = allEdges.filter(e => {

    if (e.type !== "spouse") return true;

    const key = [e.from, e.to].sort().join("-");
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
});

window.cy = cytoscape({
    container: document.getElementById("cy"),

    elements: [
        // nodes
        ...nodes.map(n => ({
            data: {
                id: n.id,
                label: n.label,
                group: n.group
            }
        })),

        // edges
        ...edges.map((e, i) => ({
            data: {
                id: "e" + i,
                source: e.from,
                target: e.to,
                type: e.type
            }
        }))
    ],

    style: [

        // Node style
        {
            selector: "node",
            style: {
                "label": "data(label)",
                "background-color": "#60a5fa",
                "color": "#ffffff",
                "text-valign": "center",
                "text-halign": "center",
                "width": 40,
                "height": 40
            }
        },

        // Default edge style
        {
            selector: "edge",
            style: {
                "width": 2,
                "line-color": "#2f3230",
                "target-arrow-color": "#2f3230",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",

                // Hide labels by default
                "label": ""
            }
        },

        // Show edge type when selected
        {
            selector: "edge:selected",
            style: {
                "label": "data(type)",
                "font-size": "10px",
                "color": "#ffffff"
            }
        },

        // Parents
        {
            selector: 'edge[type = "mother"], edge[type = "father"], edge[type = "parent"], edge[type = "emerged"]',
            style: {
                "line-color": "#0dd847",
                "target-arrow-color": "#0dd847"
            }
        },

        // Spouse
        {
            selector: 'edge[type = "spouse"]',
            style: {
                "line-color": "#fe03e9",
                "target-arrow-shape": "none",
                "source-arrow-shape": "none"
            }
        }
    ],

    layout: {
        name: "fcose",
        animate: false,
        randomize: true,
        fit: true,
        idealEdgeLength: 120,
        nodeRepulsion: 90000
    }
});