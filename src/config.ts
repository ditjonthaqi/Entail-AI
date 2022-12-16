import { FetchProxy } from "./services/fetch-proxy.service";

import { config as env} from "dotenv";

function enableProxy() {
    global.fetch = FetchProxy
}



export { enableProxy }

export { env }