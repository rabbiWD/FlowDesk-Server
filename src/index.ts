import app from "./app"
import config from "./config"
import { initDB } from "./db";

const port = config.port;

const main = async ()=>{
    await initDB();
    // console.log(config.database_url)
    app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
};

main()