const express = require("express");
const app = express();
const adminRouter = require("./admin/adminRouter");
const userRouter = require("./user/userRouter");
/** 
 * include admin router
 */
app.use("/admin", adminRouter);
/** 
 * include user router
 */
app.use("/", userRouter);

module.exports = app;