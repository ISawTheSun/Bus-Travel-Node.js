//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const cityExtent = [];

class City {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(cityName, id) {
        this.id = id;
        this.cityName = cityName;
    }
	
	//pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return cityExtent;
    }
	
	 //dodawanie obiektu do bazy
    static add(city) {
		
		city.id = nextId++;
		cityExtent.push(city);
		return city;
    }
	
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
		
		var city;
		var i;
		
		for (i = 0; i<cityExtent.length; i++){
			if(id == cityExtent[i].id){
				city = cityExtent[i];
			}
		}
		
		return city;
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        cityExtent.splice(0, cityExtent.length);
        //resetujemy licznik id
        nextId = 1;
        City.add(new City('Warszawa'));
        City.add(new City('Kraków'));
        City.add(new City('Łódź'));
		City.add(new City('Lublin'));
        City.add(new City('Wrocław'));
        City.add(new City('Gdańsk'));
    }
}

City.initData();

module.exports = City;