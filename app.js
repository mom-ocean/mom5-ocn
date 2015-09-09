var express = require('express');
var jade = require('jade');
var marked = require("marked");
require("newrelic");

var app = express();

// Setup template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var md = function(text) {
    if (text !== null) {
        return marked.parser(marked.lexer(text));
    } else {
        return "";
    }
};

var all_namelists = require('./all_namelists.json');
var data_paths = require("./data_paths.json");

var NEWS_ITEMS = [{"title": "All model test cases now running on Jenkins",
                   "author": "Nic Hannah",
                   "email": "nicjhannah@gmail.com",
                   "date": "August 2, 2015",
                   "block": "<p>A <a href=\"https://climate-cms.nci.org.au/jenkins/job/mom-ocean.org/\">Jenkins server</a> running on <a href=\"http://nci.org.au\">NCI</a> machines is now routinely compiling and running all available MOM 5 test cases. The <a href=\"https://climate-cms.nci.org.au/jenkins/job/mom-ocean.org/job/MOM_compile/lastBuild/console\">build logs</a> of these tests can be useful for comparison and debugging</p>",
                   "link":  "/web/news/jenkins-continuous-integration"},
                  {"title": "Global quarter degree configuration released",
                   "author": "Nic Hannah",
                   "email": "nicjhannah@gmail.com",
                   "date": "August 2, 2015",
                   "block": "<p>Researchers at the <a href=https://www.climatescience.org.au/>ARC Centre for Excellence in Climate System Science</a> including Paul Spence, Andy Hogg and Marshall Ward have released a 0.25 degree global configuration for MOM 5. The configuration is based on <a href=\"http://gfdl.noaa.gov>\">GFDL</a> CM2.5. It has been added to the test case suite. A beautiful animation created using this configuration can be seen <a href=\"https://www.youtube.com/watch?v=XZOrt7TWeKg\">here</a>.</p>",
                   "link":  "/web/news/quarter-degree-test-case"},
                  {"title": "MOM Ported to Fujitsu's FX10 Supercomputer",
                   "author": "Marshall Ward",
                   "email": "marshall.ward@anu.edu.au",
                   "date": "August 21, 2014",
                   "block": "<p>As part of a collaboration between <a href=\"http://nci.org.au\">NCI</a> and Fujitsu, MOM has been updated to run on Fujitsu's FX10 Supercomputers. This work will carry across to other SPARC-based platforms such as the <a href=\"http://www.fujitsu.com/global/about/businesspolicy/tech/k/\">K Computer</a>. It give us the opportunity to run MOM under Fujitsu's highly scalable Tofu interconnect system.</p>", 
                   "link":  "/web/news/mom-on-fx10"},
                   {"title": "MOM 5.1.0 Released",
                   "author": "Stephen Griffies",
                   "email": "stephen.griffies@noaa.gov",
                   "date": "March 25, 2014",
                   "block": "<p>MOM developers are pleased to announce the release of MOM 5.1.0. This version is very close to MOM 5.0.2, but with infrastructure updates to support more platforms; new and improved diagnostic capabilities; many bug fixes as reported through the MOM community; and a new ecosystem model known as COBALT.</p><p>As a general rule for updating code, please test the new code by comparing to your earlier results.</p><p>Happy modeling, Stephen Griffies for the MOM development team.</p>", 
                   "link":  "/web/news/mom-5.1.0-released"},
                  {"title": "New Website Features",
                   "author": "Tim Leslie",
                   "email": "timl@breakawaylabs.com.au",
                   "date": "September 18, 2013",
                   "block": "<p>We've been making some improvements to the MOM website which we'd like to let you know about.</p><p>The first feature is <a href=\"/web/namelists\">namelist documentation</a>.<p>This page contains documentations on all the fortran namelists used by MOM. It serves as a handy interface to the documentation already available within the source code. This page is automatically generated from the source code itself, so if you find any errors, or would like to make any improvements, this can be done by editing the code and submitting the changes to <a href=\"http://www.github.com/BreakawayLabs/mom\">github</a>.</p><p>The second feature is a <a href=\"/web/data\">data portal</a>.</p><p>This portal provides download links to all the test case data used by MOM. This data is usually accessed by <a href=\"/web/docs/git-annex\">git-annex</a> (which is still the preferred form of access). We have had a lot of feedback from people who havn't been able to use git-annex for various reasons, so this alternate download option will let you access the data as needed.</p><p>Both of these features should be considered as being in beta, so you might see some minor changes happening in the coming days. If you find any errors, broken links, etc, please let me know and I'll try to fix them up ASAP.</p>",
                   "link": "/web/news/new-website-features"},
                  {"title": "COBALT - A MOM based ecosystem model",
                   "author": "Stephen Griffies",
                   "email": "stephen.griffies@noaa.gov",
                   "date": "September 1, 2013",
                   "block": "<p>NOAA/GFDL scientists (<a href=\"http://www.gfdl.noaa.gov/charles-stock-homepage\">Stock</a>, Dunne, and John) have developed a new ecosystem model that can be coupled to MOM5 as well as other ocean circulation models.  The ecosystem model, known as COBALT, is documented in <a href=\"http://www.sciencedirect.com/science/article/pii/S0079661113001079\">this paper</a>. Plans are underway to release COBALT in November 2013 as part of the public MOM5 code.  Please stay tuned!</p>",
                   "link": "/web/news/cobalt-a-mom-based-ecosystem-model"
                   },
                  {"title": "Model Development Lab Upgrade",
                   "author": "Tim Leslie",
                   "email": "timl@breakawaylabs.com.au",
                   "date": "August 28, 2013",
                   "block": "<p>We are pleased to announce that the MOM 5 Model Development Lab (this very website) is being relaunched today. Featuring a a cleaner interface and a more powerful underlying framework, the new system will allow the MOM community to continue to grow and thrive.</p>\n<p>One exciting development is a revamp of the front page which will now contain regular news updates. If you have recently published any kind of research using MOM then we'd love to hear from you. Leave a message on <a href=\"https://groups.google.com/forum/#!forum/mom-users\">mailing list</a> and we'll arrange to have your reserach feature front and center on this page.</p><p>nOver the coming months we anticipate a number of announcements, including the release of MOM 5.1. As always, we welcome contributions from all users in the forms of <a href=\"http://www.github.com/BreakawayLabs/mom\">code contributions</a>, <a href=\"https://github.com/BreakawayLabs/mom/issues\">bug reports</a> or news articles.</p>",
                   "link": "/web/news/model-development-lab-upgrade"
                   }
                  ];

var base_params = function () {
    var params = {};
    params.project = "MOM";
    params.project_title = "Modular Ocean Model (MOM)";
    params.project_desc = "MOM is a numerical ocean model based on the hydrostatic primitive equations. MOM development is led by scientists at <a href=\"http://www.gfdl.noaa.gov/ocean-model\">NOAA/GFDL</a> in collaboration with scientists worldwide. Version 5 of MOM (MOM5) is an open source project released under the <a href=\"https://github.com/BreakawayLabs/mom/blob/master/LICENSE\">GPL license</a>.";
    params.project_about = "The Modular Ocean Model (MOM) is a hydrostatic generalized level coordinate numerical ocean code with mass conserving non-Boussinesq or volume conserving Boussinesq kinematics. The model equations are discretized with generalized horizontal coordinates on the sphere using either an Arakawa B-grid or C-grid. MOM has a broad suite of physical parameterizations, diagnostic features, test cases, and documentation. It has been utilized for research and operations from the coasts to the globe. MOM is institutionally sanctioned by NOAA’s Geophysical Fluid Dynamics Laboratory (GFDL), where development is centered. Additional development and use occurs through hundreds of international scientists and engineers comprising the MOM community. MOM is free software distributed under GPLv2 and it is part of an open source community.";
    params.releases = [{"name": "5.1.0", "commit": "f406b4c5b4bbece3b0ae7f376a4ba90ea68ffb1e"},
                       {"name": "5.0.2", "commit": "8e524daedf27c1aaa35b4069efb38abc7575b4b5"},
                       {"name": "5.0.1", "commit": "2534bdc3b4bce6d08424174abda7b1ab6be0c29d"},
                       {"name": "5.0.1-beta0", "commit": "09cae4e1bd838efcb862d45bfc61ff074f849f9b"},
                       {"name": "5.0.0", "commit": "305729e4f67c239802d38eb2446c3cee8fc5276a"},
                       {"name": "5.0.0-beta0", "commit": "7ffd65ae4dd6a4a6c06ebff910326c1bc35c8f01"}];
    params.stable = "5.1.0";
    params.web_docs = [{name: "Quickstart", url: "/web/docs/project/quickstart"},
                        {name: "User Guide", url: "/web/docs/project/user_guide"}];
    params.test_case_docs = [{name: "Test Case: Atlantic", filename: "testcase_atl_regional.pdf"},
                       {name: "Test Case: Baltic", filename: "testcase_baltic.pdf"},
                       {name: "Test Case: ICCM", filename: "testcase_ICCM.pdf"},
                       {name: "Test Case: Coupled Ocean", filename: "testcase_ocean_cpld.pdf"},
                       {name: "Test Case: Solo Ocean", filename: "testcase_ocean_solo.pdf"}
                       ];
    params.manual_docs = [{name: "MOM5 Manual", filename: "MOM5_manual.pdf"},
                       {name: "MOM4p1 Manual", filename: "MOM4p1_manual.pdf"},
                       {name: "MOM4 Manual", filename: "MOM4_manual.pdf"},
                       {name: "MOM3 Manual", filename: "MOM3_manual.pdf"},
                       {name: "MOM2 Manual", filename: "MOM2_manual.pdf"},
                       ];
    params.other_docs = [{name: "Using Git", url: "/web/docs/git"}];
    params.github = "mom";
    params.news_items = NEWS_ITEMS;
    params.namelists = all_namelists;
    params.data_paths = data_paths;
    params.md = md;
    params.title = "Model Development Lab"
    return params;
};


// Controllers
var render = function (template, req, res) {
    var params = base_params();

    params.page = template;
    params.root_page = req.route.path.split("/")[2];

    res.render(template, params);
};

var render_news = function(req, res) {
    var params = base_params();
    var template = "news";

    var news_item, i;
    for (i=0; i < NEWS_ITEMS.length; i++) {
      if (NEWS_ITEMS[i].link === req.route.path) {
        params.news_item = NEWS_ITEMS[i];
        params.title = NEWS_ITEMS[i].title;
        params.page = template;
        params.root_page = req.route.path.split("/")[2];
        params.twitter_url = "http://www.mom-ocean.org" + req.route.path;
        res.render(template, params);
      }
    }
};

var root = function (req, res) {
    render("root", req, res);
};

var tasks = function (req, res) {
    render("tasks", req, res);
};

var about = function (req, res) {
    render("about", req, res);
};

var namelists = function (req, res) {
    render("namelists", req, res);
}

var data = function (req, res) {
    render("data", req, res);
}

var CI = function (req, res) {
    render("CI", req, res);
};

var downloads = function (req, res) {
    render("downloads", req, res);
};

var docs = function (req, res) {
    render("docs", req, res);
};

var quickstart = function (req, res) {
    render("quickstart", req, res);
};

var user_guide = function (req, res) {
    render("user_guide", req, res);
};

var git = function (req, res) {
    render("git", req, res);
};

// Setup routes;

app.get("/web", root);
app.get("/web/tasks", tasks);
app.get("/web/about", about);
app.get("/web/CI", CI);
app.get("/web/downloads", downloads);
app.get("/web/namelists", namelists);
app.get("/web/data", data);
app.get("/web/docs/project/quickstart", quickstart);
app.get("/web/docs/project/user_guide", user_guide);
app.get("/web/docs/git", git);
app.get("/web/docs", docs);

app.get("/web/news/cobalt-a-mom-based-ecosystem-model", render_news);
app.get("/web/news/model-development-lab-upgrade", render_news);
app.get("/web/news/new-website-features", render_news);
app.get("/web/news/mom-5.1.0-released", render_news);
app.get("/web/news/mom-on-fx10", render_news);
app.get("/web/news/quarter-degree-test-case", render_news);
app.get("/web/news/jenkins-continuous-integration", render_news);


app.get("/", function (req, res) { res.redirect("/web"); });


// Static resource routes
var pub = __dirname + '/public';
app.use(express.static(__dirname + '/public'));

// Run the server
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Listening on port ' + port);

