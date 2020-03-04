//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const busExtent = [];

class Bus {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(name, seats, number, date, mileage, id) {
        this.id = id;
        this.name = name;
        this.seats = seats;
		this.number = number;
		this.date = date;
		this.mileage = mileage;
    }
	
	 //dodawanie obiektu do bazy
    static add(bus) {
		
		if(this.validate(bus)){
			bus.id = nextId++;
			busExtent.push(bus);
			return bus;
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
        return busExtent;
    }
	
	 //edycja obiektu
    static edit(bus) {
        //FIXME
		
		if(this.validate(bus)){
		
			var deletedBus;
			var id = bus.id;
			var i;
		
			for (i = 0; i<busExtent.length; i++){
				if(id == busExtent[i].id){
					deletedBus = busExtent[i];
				}
			}
		
			var index = busExtent.indexOf(deletedBus);
		
			if(index > -1){
				busExtent.splice(index, 1);
				busExtent.splice(index, 0, bus);
				console.log("Dany autobus zostal zaktualizowany");
			}
			else{
				console.log("Error...Nie moge zaktualizowac danego autobusa");
			}
		}
		else{
			console.log("Wprowadzone dane sa niepoprawne");
		}
		
    }
    //usuwanie obiektu po id
    static delete(id) {
        //FIXME
		var deletedBus;
		var i;
		
		for (i = 0; i<busExtent.length; i++){
			if(id == busExtent[i].id){
				deletedBus = busExtent[i];
			}
		}
		
		var index = busExtent.indexOf(deletedBus);
		if(index > -1){
			if(this.check(id)){
				busExtent.splice(index, 1);
				console.log("Dany autobus zostal usuniety");
			}
			else{
				console.log("Nie moge usunac danego autobusa poniewaz jest on przypisany do rozkladu jazdy");
			}
		}
		else{
			console.log("Error...Nie moge usunac danego autobusa");
		}
    } 
	
	static check(id){
		
		const Schedule = require('../model/schedule');
		const scheduleList = Schedule.list();
		
		var canDelete = true;
		var i;
		
		for(i=0; i< scheduleList.length; i++){
			if(scheduleList[i].bus == id){
				canDelete = false;
				break;
			}
		}
		
		return canDelete;
	}
	
	static validate(bus){
		var isCorrect = true;
		
		//name
		if(bus.name.trim().length < 3 ||
		bus.name.trim().length > 30){
			isCorrect = false;
		}
		
		//seats
		if(bus.seats < 0 || 
		bus.seats > 200){
			isCorrect = false;
		}
		
		//number
		if(bus.number.trim().length < 3 ||
		bus.number.trim().length > 10){
			isCorrect = false;
		}
		
		//date
		var minDate = new Date(2000, 0, 1).toISOString().slice(0, 10);
		var maxDate = new Date().toISOString().slice(0, 10);
		
		if(bus.date <= minDate || bus.date > maxDate){
			isCorrect = false;
		}
		
		//mileage
		if(bus.mileage.length > 8 || bus.mileage.length < 1 ||
		bus.mileage < 0){
			isCorrect = false;
		}
		
		return isCorrect;
	}
	
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
		
		var bus;
		var i;
		
		for (i = 0; i< busExtent.length; i++){
			if(id == busExtent[i].id){
				bus = busExtent[i];
			}
		}
		
		
		return bus;
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        busExtent.splice(0, busExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Bus.add(new Bus('Neoplan', 57, 'BR123A', new Date(2017, 0, 1).toISOString().slice(0, 10), 30000));
        Bus.add(new Bus('Setra', 49, 'AT002B', new Date(2018, 1, 2).toISOString().slice(0, 10), 45000));
		Bus.add(new Bus('MAN', 60, 'CW734C', new Date(2019, 2, 3).toISOString().slice(0, 10), 22000));
    }
}

Bus.initData();

module.exports = Bus;