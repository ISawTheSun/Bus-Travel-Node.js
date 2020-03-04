const express = require('express');
const router = express.Router();

const Bus = require('../model/bus');
const Schedule = require('../model/schedule');
const City = require('../model/city');

router.get("/", (req, res, next) => {
    const busList = Bus.list();
    res.render('buses/busList', {busList: busList});
});

router.get("/showNewForm", (req, res, next) => {
    res.render('buses/busForm', { pageTitle: "Nowy autobus", formAction: "add", bus: {} });
});

router.get("/showEditForm", (req, res, next) => {
	const id = req.param('bus_id');
	const bus = Bus.details(id);
    res.render('buses/busEdit', { pageTitle: "Edytuj autobusa", formAction: "edit", bus: bus });
});

router.post("/add", (req, res, next) => {
    const newBus = new Bus(req.body.name, req.body.seats, req.body.number, req.body.date, req.body.mileage);
    Bus.add(newBus);
    res.redirect("/buses");
});

router.post("/edit", (req, res, next) => {
    //FIXME
	const bus = new Bus(req.body.name, req.body.seats, req.body.number, req.body.date, req.body.mileage, req.body.bus_id);
	Bus.edit(bus);
	res.redirect("/buses");
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
	const id = req.param('bus_id');
	const scheduleList = Schedule.listBuses(id);
	const cityList = City.list();
    res.render('buses/busDetails', {scheduleList: scheduleList, cityList: cityList});
});

router.get("/delete", (req, res, next) => {
    //FIXME
	const id = req.param('bus_id');
	Bus.delete(id);
	res.redirect("/buses");
});


module.exports.route = router; 