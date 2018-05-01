
import data from '../data';


const getAvailableGraphs = async () => {
    // const response = await fetch('/data/available_graphs');
    // const body = await response.json();
    // if (response.status !== 200) throw Error(body.message);
    // return body;

    //fake async
    const graphs = [{ id: 1, name: 'My Network' }, { id: 2, name: 'Social Media' }]
    return graphs;
}


const getGraphData = async (graphName) => {
    // const response = await fetch('/data/graph_name');
    // const body = await response.json();
    // if (response.status !== 200) throw Error(body.message);
    // return body;

    //fake async
    console.log('Getting data for ' + graphName);
    return data;
};


export default { 
    getAvailableGraphs,
    getGraphData,
};