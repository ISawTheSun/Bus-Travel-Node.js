const express = require('express');
const router = express.Router();

const Schedule = require('../model/schedule');
const Driver = require('../model/driver');
const Bus = require('../model/bus');
const City = require('../model/city');

router.get("/", (req, res, next) => {
    const scheduleList = Schedule.list();
	const cityList = City.list();
    res.render('schedules/scheduleList', {scheduleList: scheduleList, cityList: cityList});
});

router.get("/showNewForm", (req, res, next) => {
	const driverList = Driver.list();
	const busList = Bus.list();
	const cityList = City.list();
    res.render('schedules/scheduleForm', { pageTitle: "Nowy rozklad", formAction: "add", schedule: {}, driverList: driverList, busList: busList, cityList: cityList});
});

router.get("/showEditForm", (req, res, next) => {
	const id = req.param('schedule_id');
	const schedule = Schedule.details(id);
	const driverList = Driver.list();
	const busList = Bus.list();
	const cityList = City.list();
    res.render('schedules/scheduleEdit', { pageTitle: "Edytuj rozklad", formAction: "edit", schedule: schedule, driverList: driverList, busList: busList, cityList: cityList});
});

router.post("/add", (req, res, next) => {
    const newSchedule = new Schedule(req.body.from, req.body.to, req.body.departure, req.body.arrival, req.body.departureTime, req.body.arrivalTime, req.body.price, req.body.driver, req.body.bus);
    Schedule.add(newSchedule);
    res.redirect("/schedules");
});

router.post("/edit", (req, res, next) => {
    //FIXME
	const schedule = new Schedule(req.body.from, req.body.to, req.body.departure, req.body.arrival, req.body.departureTime, req.body.arrivalTime, req.body.price, req.body.driver, req.body.bus, req.body.schedule_id);
	Schedule.edit(schedule);
	res.redirect("/schedules");
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
	const id = req.param('schedule_id');
	const schedule = Schedule.details(id); 
	const driver = Driver.details(schedule.driver);
	const bus = Bus.details(schedule.bus);
	const from = City.details(schedule.from);
	const to = City.details(schedule.to);
	res.render('schedules/scheduleDetails', {schedule: schedule, driver: driver, bus: bus, from: from, to: to});
});

router.get("/delete", (req, res, next) => {
    //FIXME
	const id = req.param('schedule_id');
	Schedule.delete(id);
	res.redirect("/schedules");
});


module.exports.route = router; 