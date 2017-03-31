const extend = (base, props) => {
    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            base[key] = props[key];
        }
    }
    return base;
};

const flatten = arr => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i]));
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

const isClass = vnode => {
    return Boolean(vnode.prototype) && Boolean(vnode.prototype.isClassComponent);
};

module.exports = {
    extend,
    flatten,
    isClass,
};
