/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @description Function to display view or page 
 */
function index(req, res) {
    return res.render("trace")
}

module.exports = {
    index
}