function getDemoPage(req,res){
//res.render("demo.pug",{title:"Demo Page"});
res.render("base.pug");
}
function getHomePage(req,res)
{
    res.render("home.pug");
}
function getloginPage(req,res)
{
    res.render("login.pug");
}

module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getloginPage = getloginPage;