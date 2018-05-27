//theme of the graph
const theme = {
    dark: {
        node: {
            color: 'red',
            highlightColor: 'lightgreen',
        },
        link: {
            highlightColor: '#484848',
        },
    },
    light: {
        node: {
            color: '#d3d3d3',
            highlightColor: 'lightgreen',
        },
        link: {
            highlightColor: '#484848',
        },
    },
}

const getDefaultConfig = (themeType) => {
    return {
        graph: {
            nodeHighlightBehavior: true,
            automaticRearrangeAfterDropNode: true,
            highlightOpacity: 0.2,
            height: 800,
            width: 1200,
        },
        node: {
            color: theme[themeType].node.color,
            highlightColor: theme[themeType].node.highlightColor,
            labelProperty: 'name',
            size: 200,
        },
        link: {
            highlightColor: theme[themeType].link.highlightColor,
        },
    };
};

/**
 * This function creates a config object, by merging new config and default config, 
 * and the newly returned object is compatible with the one rd3g expects
 * 
 * @param {Object} newConfig - an object containing rd3g consumer defined configurations for the graph.
 * @param {Boolean} darkTheme - boolean value determining whether theme is dark or light
 */
function createConfig(newConfig = {}, darkTheme = false) {
    const themeType = darkTheme ? 'dark' : 'light';
    const defaultConfig = getDefaultConfig(themeType);
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

export { createConfig }