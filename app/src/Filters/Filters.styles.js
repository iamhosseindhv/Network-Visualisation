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
    formControlJobs: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 208,
        },
    },
};

export {
    styles,
    MenuProps,
};