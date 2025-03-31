/**
 * Utility function to handle asynchronous functions in Express.js.
 * This file contains a higher-order function that wraps asynchronous route handlers
 * to manage errors and pass them to the next middleware.
 *
 * Functions in this file:
 * - `asyncHandler`: A higher-order function that takes an asynchronous route handler
 *   and ensures that any errors are caught and passed to the `next` middleware.
 *
 * Usage:
 * This utility is used to avoid repetitive try-catch blocks in asynchronous route handlers.
 * It simplifies error handling in Express.js applications.
 */
// this is the promises higher order function
// an UTILITY function to handle async functions

const asyncHandler = (requesthandler)=>{
    return (req,res,next)=>{
        Promise
        .resolve(requesthandler(req,res,next))
        .catch((err)=>{
            next(err);
        })
    }
};
export {asyncHandler};
// higher order function to handle async functions, higher order functions are functions that take in functions as arguments    
// this is an example of try catch higher order function
// const asyncHandler = (fn)=>
// async (req, res, next)=>{
// try{
//     await fn( req, res, next);
// }
// catch(error){
//     res.status(error.code || 500).json({
//         success: false,
//         message: error.message || "Internal Server Error"
// })
// }
// }

