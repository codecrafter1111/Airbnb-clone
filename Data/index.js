const initdata = require("./data.js")
const listing = require("../Model/listing.js")
const connectDb = require("../Connection/db_connect.js")



// Inserting the data to the database
const initDB = async ()=>{
    await connectDb()
    await listing.deleteMany({})
    initdata.data = initdata.data.map((obj)=> ({...obj, owner:'6959badbbf993b9c02450e36'}))
    await listing.insertMany(initdata.data)
}
initDB()
    .then(() => {
        console.log("Database initialization complete")
        process.exit(0)
    })
    .catch((err) => {
        console.log("Error:", err)
        process.exit(1)
    })

// Or it should be in this way also

// connectDb()
// const initDB = listing.insertMany(initdata)
// initDB()
// .then(() => {
//         console.log("Database initialization complete")
//         process.exit(0)
//     })
//     .catch((err) => {
//         console.log("Error:", err)
//         process.exit(1)
//     })