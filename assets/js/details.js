const { createApp } = Vue

const app = createApp({
    data() {
        return {
            eventsData: [],
            data: [],
            card: [],
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
        this.eventsData = eventos
        this.data = this.eventsData.events
        this.date = this.eventsData.currentDate
        this.detail()
    },
    methods: {
        detail() {
            const params = new URLSearchParams(location.search)
            const id = params.get('id')
            this.card = this.data.filter(cards => cards._id == id)
            const { name, date, description, place, capacity, assistance, estimate, image } = this.card[0]
            this.name = name
            this.date = date
            this.description = description
            this.place = place
            this.capacity = capacity
            this.assistance = assistance
            this.estimate = estimate
            this.image = image
        }
    }
})

app.mount('#content')