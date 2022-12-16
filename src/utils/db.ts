import { connect } from "mongoose";

const DB = (async () => {
    return await connect(process.env.DB_URL);
})();

export { DB }