import { Start } from "./client/starter/start";

(() => {
    try {
        new Start();
    } catch (e) {
        console.error(e);
    }
})();