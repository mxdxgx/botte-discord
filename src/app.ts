/**
 * Entry point of the application.
 * 
 * This immediately-invoked function expression (IIFE) attempts to create a new instance of the `Start` class
 * from the `./client/starter/start` module. If an error occurs during the instantiation, it catches the error
 * and logs it to the console.
 * 
 * @module app
 */
import { Start } from "./client/starter/start";

(() => {
    try {
        new Start();
    } catch (e) {
        console.error(e);
    }
})();