console.log("family filter loaded");

window.addEventListener("load", () => {

    const cy = window.graph;

    if (!cy) {
        console.error("Graph not found");
        return;
    }

    // Handle node clicks
    cy.on("tap", "node", (evt) => {

        const root = evt.target;

        // Dim everything
        cy.elements().style("opacity", 0.3);

        // Collection of elements to highlight
        let highlight = cy.collection();

        // Self
        highlight = highlight.union(root);

        // Direct parents
        const parents = root.incomers("node");
        highlight = highlight.union(parents);

        // Direct children
        const children = root.outgoers("node");
        highlight = highlight.union(children);

        // Direct siblings (nodes that share a parent)
        let siblings = cy.collection();

        parents.forEach(parent => {

            const parentChildren = parent.outgoers("node");

            siblings = siblings.union(parentChildren);
        });

        highlight = highlight.union(siblings);

        // Highlight edges only when both endpoints are visible
        cy.edges().forEach(edge => {

            const source = edge.source();
            const target = edge.target();

            if (
                highlight.contains(source) &&
                highlight.contains(target)
            ) {
                highlight = highlight.union(edge);
            }
        });

        // Apply highlight
        highlight.style("opacity", 1);
    });

    // Reset when clicking empty space
    cy.on("tap", (evt) => {

        if (evt.target === cy) {
            cy.elements().style("opacity", 1);
        }
    });

});