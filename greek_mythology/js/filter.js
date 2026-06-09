console.log("family filter loaded");

document.addEventListener("DOMContentLoaded", () => {

    const cy = window.cy;

    if (!cy) return;

    // Handle node clicks
    cy.on("tap", "node", (evt) => {

        const root = evt.target;

        // Dim everything
        cy.elements().style("opacity", 0.05);

        // Get full relationship (parents + children + edges)
        const neighborhood = root.closedNeighborhood();

        // Highlight selected family
        neighborhood.style("opacity", 1);
    });

    // Optional: click empty space to reset
    cy.on("tap", (evt) => {
        if (evt.target === cy) {
            cy.elements().style("opacity", 1);
        }
    });

});