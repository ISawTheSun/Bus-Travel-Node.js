//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const driverExtent = [];

class Driver {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, date, experience, salary, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
		this.date = date;
		this.experience = experience;
		this.salary = salary;
    }
	
	 //dodawanie obiektu do bazy
    static add(driver) {
		if(this.validate(driver)){

			driver.id = nextId++;
			driverExtent.push(driver);
			return driver;
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
        return driverExtent;
    }
	
	 //edycja obiektu
    static edit(driver) {
        //FIXME
		
		if(this.validate(driver)){
		
			console.log("Driver: "+driver.firstName);
		
			var deletedDriver;
			var id = driver.id;
			var i;
		
			for (i = 0; i<driverExtent.length; i++){
				if(id == driverExtent[i].id){
					deletedDriver = driverExtent[i];
				}
			}
		
			var index = driverExtent.indexOf(deletedDriver);
		
			if(index > -1){
				driverExtent.splice(index, 1);
				driverExtent.splice(index, 0, driver);
				console.log("Dany kierowca zostal zaktualizowany");
			}
			else{
				console.log("Error...Nie moge zaktualizowac danego kierowce");
			}
		}
		else{
			console.log("Wprowadzone dane sa niepoprawne");
		}
		
		
		
		
		//driverExtent[index].firstName = driver.firstName;
		//driverExtent[index].lastName = driver.lastName;
		//driverExtent[index].date = driver.date;
		//driverExtent[index].experience = driver.experience;
		//driverExtent[index].salary = driver.salary;
		
    }
    //usuwanie obiektu po id
    static delete(id) {
        //FIXME
		
		var deletedDriver;
		var i;
		
		for (i = 0; i<driverExtent.length; i++){
			if(id == driverExtent[i].id){
				deletedDriver = driverExtent[i];
			}
		}
		
		var index = driverExtent.indexOf(deletedDriver);
		if(index > -1){
			if(this.check(id)){
				driverExtent.splice(index, 1);
				console.log("Dany kierowca zostal usuniety");
			}
			else{
				console.log("Nie moge usunac danego kierowce poniewaz jest on przypisany do rozkladu jazdy");
			}
		}
		else{
			console.log("Error...Nie moge usunac danego kierowce");
		}
    }
	
	static check(id){
		
		const Schedule = require('../model/schedule');
		const scheduleList = Schedule.list();
		
		var canDelete = true;
		
		var i;
		
		for(i=0; i< scheduleList.length; i++){
			if(scheduleList[i].driver == id){
				canDelete = false;
				break;
			}
		}
		
		return canDelete;
	}
	
	static validate(driver){
		var isCorrect = true;
		
		//firstName
		if(driver.firstName.trim().length < 3 || 
		driver.firstName.trim().length > 30){
			isCorrect = false;
		}

        //lastName
		if(driver.lastName.trim().length < 3 || 
		driver.lastName.trim().length > 30){
			isCorrect = false;
		}

		//date
		var minDate = new Date(2000, 0, 1).toISOString().slice(0, 10);
		var maxDate = new Date().toISOString().slice(0, 10);
		
		if(driver.date <= minDate || driver.date > maxDate){
			isCorrect = false;
		}
		
		//experience
		if(driver.experience.length > 2 ||
		driver.experience.length < 1 ||
		driver.experience < 0){
			isCorrect = false;
		}
		
		//salary
		if(driver.salary.length > 5 ||
		driver.salary < 500){
			isCorrect = false;
		}
		
		return isCorrect;
	}
	
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
		
		var driver;
		var i;
		
		for (i = 0; i<driverExtent.length; i++){
			if(id == driverExtent[i].id){
				driver = driverExtent[i];
			}
		}
		
		
		return driver;
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        driverExtent.splice(0, driverExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Driver.add(new Driver('Jan', 'Kowalski', new Date(2017, 1, 1).toISOString().slice(0, 10), 4, 3000));
        Driver.add(new Driver('Anna', 'Wiśniewska', new Date(2018, 1, 2).toISOString().slice(0, 10), 3, 2500));
        Driver.add(new Driver('Andrzej', 'Nowak', new Date(2019, 1, 3).toISOString().slice(0, 10), 2, 2000));
    }
}

Driver.initData();

module.exports = Driver;