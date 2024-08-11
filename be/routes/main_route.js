const checkRoute = require('./check_route');
const userRoute = require('./user_route');
const transaksiRoute = require('./transaksi_route');
const produkRoute = require('./produk_route');
const traceabilityRoute = require('./traceability_route');
const dashboard_controller = require('./admin');
const petani_route = require("./petani_route")
const pengepul_route = require("./pengepul_route")
const produser_route = require("./produser_route")
const coffee_retail_route = require("./coffee_retail_route")
module.exports = function (app) {
    app.use('/check', checkRoute);
    app.use('/user', userRoute);
    app.use('/transaksi', transaksiRoute);
    app.use('/produk', produkRoute);
    app.use('/trace', traceabilityRoute);
    app.use("/admin", dashboard_controller);
    app.use("/petani", petani_route)
    app.use("/pengepul", pengepul_route)
    app.use("/produser", produser_route)
    app.use("/coffee-retail", coffee_retail_route)
}
