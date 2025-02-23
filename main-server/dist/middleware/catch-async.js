//higher order functions
const catchAsyncErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
};
export default catchAsyncErrors;
