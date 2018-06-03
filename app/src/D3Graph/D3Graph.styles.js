const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    placeholder: {
        height: 5,
    },
    placeholderDark: {
        height: 5,
        backgroundColor: theme.palette.grey[300],
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    icon: {
        color: theme.palette.grey[700],
    },
    innerContainer: {
        textAlign: 'center',
        ...theme.typography.title,
        color: theme.palette.grey[700],
    },
});

export default styles;