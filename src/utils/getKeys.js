var expandedKeys = [];
export function getkeys(children) {

    for (var i = 0; i < children.length; i++) {
        if (children[i].children != '') {
            // expandedKeys.push(children[i].id);
            children[i].disabled = true;
        }
        getkeys(children[i].children)
    }
    return children;
}