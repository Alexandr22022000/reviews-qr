import { makeStyles } from '@material-ui/core/styles';

function MaterialStyles ({children, styles}) {
    let pos = makeStyles(styles)();
    return children(pos)
}

export default MaterialStyles;