const containerWidth = 232;
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: containerWidth,
    },
    iconGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '50px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        border: '1px solid ' + theme.palette.divider,
    },
    formControlMoveRight: {
        transform: 'translate3d(' + theme.spacing.unit * 6 + 'px, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
    },
    formControlMoveLeft: {
        transform: 'translate3d(0, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
    },
});

export default styles;