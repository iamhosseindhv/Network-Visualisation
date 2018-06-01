import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const RootWrapper = styled.div`
    flex-grow: 1;
    height: 100vh;
    z-index: 1;
    overflow: hidden;
    position: relative;
    display: flex;
`;

const getMuiTheme = (darkTheme = false) => {
    const type = darkTheme ? 'dark' : 'light';
    return createMuiTheme({
        palette: createPalette({
            type: type,
            primary: {
                light: purple[300],
                main: purple[500],
                dark: purple[700],
            },
            secondary: {
                light: green[300],
                main: green[500],
                dark: green[700],
            },
        }),
    });
};

export {
    RootWrapper,
    getMuiTheme,
};