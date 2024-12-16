const app = require("./app");
const connectDataBase = require("./config/database");
connectDataBase();
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to unhandled exception`);
    process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on port http:localhost:${process.env.PORT}`);
})
process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })

})