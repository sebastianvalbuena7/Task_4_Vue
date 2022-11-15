const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            eventsData: [],
            data: [],
            date: undefined,
            name: undefined,
            description: undefined,
            date: undefined,
            place: undefined,
            capacity: undefined,
            assistance: undefined,
            estimate: undefined,
            image: undefined
        }
    },
    created() {
        fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(datos => {
            this.eventsData = datos
            this.data = this.eventsData.events
            this.date = this.eventsData.currentDate
            this.detail()
        })
        .catch(error => console.error(error))
    },
    methods: {
        detail() {
            const params = new URLSearchParams(location.search)
            const id = params.get('id')
            this.card = this.data.find(cards => cards._id === id)
            this.name = this.card.name
            this.date = this.card.date
            this.description = this.card.description
            this.place = this.card.place
            this.capacity = this.card.capacity
            this.assistance = this.card.assistance
            this.estimate = this.card.estimate
            this.image = this.card.image
        }
    }
} )

app.mount('#content')