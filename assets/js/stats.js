const { createApp } = Vue

const app = createApp({
    data() {
        return {
            eventsData: [],
            data: [],
            date: '',
            compareData: [],
            compareData2: [],
            compareData3: [],
            pastEvents: [],
            upcomingEvents: [],
            pastCategories: [],
            upcomingCategories: [],
            arrayUpcoming: [],
            arrayPast: []
        }
    },
    created() {
        this.eventsData = eventos
        this.data = this.eventsData.events
        this.date = this.eventsData.currentDate
        this.pastEvents = this.data.filter(event => event.date < this.date)
        this.upcomingEvents = this.data.filter(event => event.date > this.date)
        this.upcomingCategories = Array.from(new Set(this.upcomingEvents.map(event => event.category)))
        this.pastCategories = Array.from(new Set(this.pastEvents.map(event => event.category)))
        this.highestAttendance()
        this.lowestAttendance()
        this.largerCapacity()
        this.createUpcoming()
        this.createPast()
    },
    methods: {
        highestAttendance() {
            let filterAssistance = this.data.filter(property => property.assistance).map(property => {
                let array = {
                    name: property.name,
                    assistance: parseInt(property.assistance),
                    capacity: parseInt(property.capacity)
                }
                return array
            }).map(elem => {
                let array = {
                    name: elem.name,
                    value: Math.trunc(elem.assistance * 100 / elem.capacity)
                }
                return array
            })
            let accessValue = filterAssistance.map(property => property.value).reduce((a, b) => Math.max(a, b))
            const object = filterAssistance.filter(property => property.value === accessValue)
            this.compareData = object.shift()
        },
        lowestAttendance() {
            let filterAssistance = this.data.filter(property => property.assistance).map(property => {
                let array = {
                    name: property.name,
                    assistance: parseInt(property.assistance),
                    capacity: parseInt(property.capacity)
                }
                return array
            }).map(elem => {
                let array = {
                    name: elem.name,
                    value: Math.trunc(elem.assistance * 100 / elem.capacity)
                }
                return array
            })
            let accessValue = filterAssistance.map(property => property.value).reduce((a, b) => Math.min(a, b))
            this.compareData2 = filterAssistance.filter(property => property.value == accessValue)
        },
        largerCapacity() {
            let highAttendance = this.data.map(property => parseInt(property.capacity))
            let lCapacity = highAttendance.reduce((a, b) => Math.max(a, b))
            const object = this.data.filter(property => parseInt(property.capacity) == lCapacity)
            this.compareData3 = object.shift()
        },
        createUpcoming() {
            this.upcomingCategories.forEach(property => {
                let eventsCategory = this.upcomingEvents.filter(event => event.category === property)
                let porcentaje = eventsCategory.map(event => (event.estimate * 100 / event.capacity))
                let totals = porcentaje.reduce((a, b) => a + b)
                let averageAssistance = totals / porcentaje.length
                let ingresos = eventsCategory.map(event => event.estimate * event.price).reduce((a, b) => a + b)
                let category = {
                    name: property,
                    estimate: averageAssistance.toFixed(0),
                    revenues: ingresos
                }
                this.arrayUpcoming.push(category)
            })
        },
        createPast() {
            this.pastCategories.forEach(property => {
                let eventsCategory = this.pastEvents.filter(event => event.category === property)
                let porcentaje = eventsCategory.map(event => (event.assistance * 100 / event.capacity))
                let totals = porcentaje.reduce((a, b) => a + b)
                let averageAssistance = totals / porcentaje.length
                let ingresos = eventsCategory.map(event => event.assistance * event.price).reduce((a, b) => a + b)
                let category = {
                    name: property,
                    estimate: averageAssistance.toFixed(0),
                    revenues: ingresos
                }
                this.arrayPast.push(category)
            })
        }
    }
})
app.mount('#content')