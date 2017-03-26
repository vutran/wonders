let __mockValue = null;

const minimist = () => ({
    _: __mockValue,
});

/**
 * @param {Array<String>} inputs
 */
minimist.__setReturnValue = (inputs) => {
    __mockValue = inputs;
};

module.exports = minimist;
