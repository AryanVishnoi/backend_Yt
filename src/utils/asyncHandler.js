// const asyncHandler = () => {}
// const asyncHandler = (fn) =>() => {}
// const asyncHandler = (fn) => async() => {}

// Promise utility
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// try-catch utility
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fu(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
export {
    asyncHandler
}