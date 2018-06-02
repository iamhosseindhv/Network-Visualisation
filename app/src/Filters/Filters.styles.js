const containerWidth = 232;
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: containerWidth,
    },
    formControl: {
        minWidth: (containerWidth / 2) - theme.spacing.unit,
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
    formControlLeft: {
        marginRight: theme.spacing.unit,
    },
    formControlRight: {
        marginLeft: theme.spacing.unit,
    },
});


export default styles;