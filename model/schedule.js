//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const scheduleExtent = [];

const Driver = require('../model/driver');
const Bus = require('../model/bus');

class Schedule {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(from, to, departure, arrival, departureTime, arrivalTime,  price, driver, bus, id) {
        this.from =  from;
		this.to =  to;
		this.departure = departure;
		this.arrival = arrival;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
		this.price = price;
		this.driver = driver;
		this.bus = bus;
		this.id = id;
    }
	
	 //dodawanie obiektu do bazy
    static add(schedule) {
		if(this.validate(schedule)){
			schedule.id = nextId++;
			scheduleExtent.push(schedule);
			return schedule;
		}
		else{
			console.log("Wprowadzone dane sa niepoprawne");
		}
    }
	
	//pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return scheduleExtent;
    }
	
	
	static listDrivers(id){
		const list = [];
		
		var i;
		for (i = 0; i<scheduleExtent.length; i++){
			if(id == scheduleExtent[i].driver){
				list.push(scheduleExtent[i]);
			}				
		}
		
		return list;
	}
	
	static listBuses(id){
		const list = [];
		
		var i;
		for (i = 0; i<scheduleExtent.length; i++){
			if(id == scheduleExtent[i].bus){
				list.push(scheduleExtent[i]);
			}				
		}
		
		return list;
	}
	
	 //edycja obiektu
    static edit(schedule) {
        //FIXME
		if(this.validate(schedule)){
			
			var deletedSchedule;
			var id = schedule.id;
			var i;
		
			for (i = 0; i<scheduleExtent.length; i++){
				if(id == scheduleExtent[i].id){
					deletedSchedule = scheduleExtent[i];
				}
			}
		
			var index = scheduleExtent.indexOf(deletedSchedule);
		
			if(index > -1){
				scheduleExtent.splice(index, 1);
				scheduleExtent.splice(index, 0, schedule);
				console.log("Dany rekord zostal zaktualizowany");
			}
			else{
				console.log("Error...Nie moge zaktualizowac danego rekordu");
			}
		}
		else{
			console.log("Wprowadzone dane sa niepoprawne");
		}
		
		
    }
    //usuwanie obiektu po id
    static delete(id) {
        //FIXME
		var deletedSchedule;
		var i;
		
		for (i = 0; i<scheduleExtent.length; i++){
			if(id == scheduleExtent[i].id){
				deletedSchedule = scheduleExtent[i];
			}
		}
		
		var index = scheduleExtent.indexOf(deletedSchedule);
		if(index > -1){
			scheduleExtent.splice(index, 1);
			console.log("Dany rekord zostal usuniety");
		}
		else{
			console.log("Error...Nie moge usunac danego rekordu");
		}
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
		
		var schedule;
		var i;
		
		for (i = 0; i<scheduleExtent.length; i++){
			if(id == scheduleExtent[i].id){
				schedule = scheduleExtent[i];
			}
		}
		
		
		return schedule;
    }
	
	static validate(schedule){
		var isCorrect = true;
		
		//to
		if(schedule.to == schedule.from){
		isCorrect = false;
		}
		
		//departure
		var minDate = new Date(2000, 0, 1).toISOString().slice(0, 10);
		var maxDate = new Date(2050, 0 ,1).toISOString().slice(0, 10);
		
		if(schedule.departure <= minDate || schedule.departure > maxDate){
			isCorrect = false;
		}
		
		//arrival
		var minDate = schedule.departure;
		
		if(schedule.arrival < minDate || schedule.arrival > maxDate){
			isCorrect = false;
		}
		
		//departureTime
		if(schedule.departureTime < '00:00'){
			isCorrect = false;
		}
		
		//arrivalTime
		var arrivalDate = new Date(schedule.arrival);
		var departureDate = new Date(schedule.departure);
		
		if(arrivalDate <= departureDate && schedule.departureTime >= schedule.arrivalTime){
			isCorrect = false;
		}
		
		//price
		if(schedule.price.length > 3 ||
		schedule.price < 5){
			isCorrect = false;
		}
		
		
		return isCorrect;
	}
	
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        scheduleExtent.splice(0, scheduleExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Schedule.add(new Schedule(1, 2, 
								new Date(2017, 1, 1).toISOString().slice(0, 10), 
								new Date(2017, 1, 2).toISOString().slice(0, 10),
								'11:00', '12:30',
								100, 1, 3));
		
		Schedule.add(new Schedule(2, 3, 
								new Date(2017, 2, 3).toISOString().slice(0, 10), 
								new Date(2017, 2, 4).toISOString().slice(0, 10),
								'14:15', '16:30',
								80, 2, 1));
		
		Schedule.add(new Schedule(3, 1, 
								new Date(2018, 3, 1).toISOString().slice(0, 10), 
								new Date(2018, 3, 2).toISOString().slice(0, 10),
								'10:00', '12:00',
								90, 1, 1));
   
    }
}

Schedule.initData();

module.exports = Schedule;