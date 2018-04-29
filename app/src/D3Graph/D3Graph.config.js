

const defaultConfig = {
    graph: {
        nodeHighlightBehavior: true,
        automaticRearrangeAfterDropNode: true,
        highlightOpacity: 0.2,
        height: 800,
        width: 1200,
    },
    node: {
        color: '#d3d3d3',
        highlightColor: 'lightgreen',
        size: 200,
    },
    link: {
        highlightColor: '#484848'
    }
};

/**
 * This function creates a config object, by merging new config and default config, 
 * and the newly returned object is compatible with the one rd3g expects
 * 
 * @param {Object} newConfig - an object containing rd3g consumer defined configurations for the graph.
 */
function createConfig(newConfig = {}) {
    const mergedConfig = {
        ...defaultConfig.graph,
        ...newConfig.graph,
        node: {
            ...defaultConfig.node,
            ...newConfig.node,
        },
        link: {
            ...defaultConfig.link,
            ...newConfig.link,
        },
    };
    return mergedConfig;
}

export { defaultConfig, createConfig }