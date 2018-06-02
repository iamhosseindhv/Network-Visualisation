
import data from '../data';


const getAvailableGraphs = async () => {
    // const user_id = 1;
    // const url = '/api/available_graphs/' + user_id;
    // const response = await fetch(url);
    // const body = await response.json();
    // if (response.status !== 200) throw Error(body.message);

    // const graphs = body.graphs;
    const graphs = [{ id: 1, name: 'My Network', user_id: 1 }, { id: 2, name: 'Social Media', user_id: 1 }]
    return graphs;
}


const getGraphData = async (query) => {
    // const url = '/api/graph_data/' + query.graph_id;
    // const response = await fetch(url);
    // const body = await response.json();
    // if (response.status !== 200) throw Error(body.message);
    // return body;

    //fake async
    // console.log('Getting data for ' + graphId);
    return data;
};


export default {
    getAvailableGraphs,
    getGraphData,
};