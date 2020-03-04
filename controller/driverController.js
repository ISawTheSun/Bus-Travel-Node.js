const express = require('express');
const router = express.Router();

const Driver = require('../model/driver');
const Schedule = require('../model/schedule');
const City = require('../model/city');

router.get("/", (req, res, next) => {
    const driverList = Driver.list();
    res.render('drivers/driverList', {driverList: driverList});
});

router.get("/showNewForm", (req, res, next) => {
    res.render('drivers/driverForm', { pageTitle: "Nowy kierowca", formAction: "add", driver: {} });
});

router.get("/showEditForm", (req, res, next) => {
	const id = req.param('driver_id');
	const driver = Driver.details(id);
    res.render('drivers/driverEdit', { pageTitle: "Edytuj kierowce", formAction: "edit", driver: driver });
});

router.post("/add", (req, res, next) => {
    const newDriver = new Driver(req.body.first_name, req.body.last_name, req.body.date, req.body.experience, req.body.salary);
    Driver.add(newDriver);
    res.redirect("/drivers");
});

router.post("/edit", (req, res, next) => {
    //FIXME
	const driver = new Driver(req.body.first_name, req.body.last_name, req.body.date, req.body.experience, req.body.salary, req.body.driver_id);
	Driver.edit(driver);
	res.redirect("/drivers");
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
	const id = req.param('driver_id');
	const scheduleList = Schedule.listDrivers(id);
	const cityList = City.list();
    res.render('drivers/driverDetails', {scheduleList: scheduleList, cityList: cityList});
});

router.get("/delete", (req, res, next) => {
    //FIXME
	const id = req.param('driver_id');
	Driver.delete(id);
	res.redirect("/drivers");
});


module.exports.route = router; 