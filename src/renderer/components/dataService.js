class DataService {
    constructor() {
        this.employees = [
            {
                name: "Nancy Freehafer",
                phone: "(123)555-5100",
                country: "US",
                email: "mailto:nancy@northwindtraders.com",
                onJob: true
            },
            {
                name: "Andrew Cencini",
                phone: "(123)555-5101",
                country: "UK",
                email: "mailto:andrew@northwindtraders.com",
                onJob: false
            },
            {
                name: "Jan Kotas",
                phone: "(123)555-5102",
                country: "Germany",
                email: "mailto:jan@northwindtraders.com",
                onJob: true
            }
        ];
        this.airports = [
            {
                "name": "Hartsfield Jackson Atlanta International Airport",
                "code": "ATL",
                "city": "Atlanta",
                "state": "GA",
                "lat": 33.64,
                "lon": -84.444,
                "pop2011": 432427,
                "vol2011": 44414121,
                "vol2010": 43130585,
                "vol2009": 42280868,
                "vol2008": 43236665,
                "vol2007": 43236665,
                "vol2006": 41352038,
                "vol2005": 42402653
            },
            {
                "name": "O'Hare International Airport",
                "code": "ORD",
                "city": "Chicago",
                "state": "IL",
                "lat": 41.9794,
                "lon": -87.9044,
                "pop2011": 2707120,
                "vol2011": 31892301,
                "vol2010": 32171831,
                "vol2009": 31135732,
                "vol2008": 33683991,
                "vol2007": 36521585,
                "vol2006": 36825097,
                "vol2005": 36720005
            },
            {
                "name": "Los Angeles International Airport",
                "code": "LAX",
                "city": "Los Angeles",
                "state": "CA",
                "lat": 33.9425,
                "lon": -118.4081,
                "pop2011": 3819702,
                "vol2011": 30528737,
                "vol2010": 28857755,
                "vol2009": 27439897,
                "vol2008": 28861477,
                "vol2007": 30113985,
                "vol2006": 29357327,
                "vol2005": 29372272
            }

        ];
    }
    getAirpotsData() {
        return this.airports;
    }

    getEmployeesData() {
        return this.employees;
    }

    getPersonAddressData() {
        return this.personAddress;
    }
}

export default new DataService()