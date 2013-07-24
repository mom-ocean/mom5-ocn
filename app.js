var express = require('express');
var jade = require('jade');

var app = express();

// Setup template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Controllers
var render = function (template, req, res) {
    var params = {};
    params.project = "MOM";
    params.project_title = "Modular Ocean Model (MOM)";
    params.project_desc = "MOM is a numerical ocean model based on the hydrostatic primitive equations. MOM development is led by scientists at <a href=\"http://www.gfdl.noaa.gov/ocean-model\">NOAA/GFDL</a> in collaboration with scientists worldwide. Version 5 of MOM (MOM5) is an open source project released under the <a href=\"https://github.com/BreakawayLabs/mom/blob/master/LICENSE\">GPL license</a>.";
    params.project_about = "The Modular Ocean Model (MOM) is a hydrostatic generalized level coordinate numerical ocean code with mass conserving non-Boussinesq or volume conserving Boussinesq kinematics. The model equations are discretized with generalized horizontal coordinates on the sphere using either an Arakawa B-grid or C-grid. MOM has a broad suite of physical parameterizations, diagnostic features, test cases, and documentation. It has been utilized for research and operations from the coasts to the globe. MOM is institutionally sanctioned by NOAA’s Geophysical Fluid Dynamics Laboratory (GFDL), where development is centered. Additional development and use occurs through hundreds of international scientists and engineers comprising the MOM community. MOM is free software distributed under GPLv2 and it is part of an open source community.";
    params.releases = [{"name": "5.0.2", "commit": "8e524daedf27c1aaa35b4069efb38abc7575b4b5"},
                       {"name": "5.0.1", "commit": "2534bdc3b4bce6d08424174abda7b1ab6be0c29d"},
                       {"name": "5.0.1-beta0", "commit": "09cae4e1bd838efcb862d45bfc61ff074f849f9b"},
                       {"name": "5.0.0", "commit": "305729e4f67c239802d38eb2446c3cee8fc5276a"},
                       {"name": "5.0.0-beta0", "commit": "7ffd65ae4dd6a4a6c06ebff910326c1bc35c8f01"}];
    params.stable = "5.0.2";
    params.web_docs = [{name: "Quickstart", url: "quickstart"},
                        {name: "User Guide", url: "user_guide"}];
    params.pdf_docs = [{name: "Elements of MOM 5", filename: "MOM5_elements.pdf"},
                       {name: "MOM 4 Technical Guide", filename: "MOM4_guide.pdf"},
                       {name: "Test Case: Atlantic", filename: "testcase_atl_regional.pdf"},
                       {name: "Test Case: Baltic", filename: "testcase_baltic.pdf"},
                       {name: "Test Case: ICCM", filename: "testcase_ICCM.pdf"},
                       {name: "Test Case: Coupled Ocean", filename: "testcase_ocean_cpld.pdf"},
                       {name: "Test Case: Solo Ocean", filename: "testcase_ocean_solo.pdf"}
                       ];
    params.other_docs = [{name: "Using Git", url: "git"},
                         {name: "Using Git Annxes", url: "git-annex"}];
    params.github = "mom";
    params.page = template;
    res.render(template, params);
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

var CI = function (req, res) {
    render("CI", req, res);
};

var downloads = function (req, res) {
    render("downloads", req, res);
};

var docs = function (req, res) {
    render("docs", req, res);
};

// Setup routes;

app.get("/", root);
app.get("/tasks", tasks);
app.get("/about", about);
app.get("/CI", CI);
app.get("/downloads", downloads);
app.get("/docs", docs);

// Static resource routes
var pub = __dirname + '/public';
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bootstrap'));

// Run the server
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Listening on port ' + port);

