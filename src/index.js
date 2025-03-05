// require('dotenv').config({
//     path: './env'
// })

import dotenv from 'dotenv';
dotenv.config({
    path: "/.env"
});


import connectDB from "./db/index.js";


// // Way 1
// a fuction that connect Database immediatly--ify
// ;
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         // if database didnt load
//         app.on("error", (error) => {
//             console.log("Our application unable to listen ", error)
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Application is listening on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.log(error)
//     }
// })()   

// Way 2
// Check db/index.js
connectDB();