const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            eventsData: [],
            data: [],
            dataFilters: [],
            categories: [],
            checked: [],
            date: '',
            inputText: ''
        }
    },
    created() {
            this.eventsData = eventos
            this.data = this.eventsData.events
            this.date = this.eventsData.currentDate
            this.dataFilters = this.data
            this.dataCheckbox()
    },
    methods: {
        dataCheckbox() {
            this.categories = [... new Set(this.data.filter( event => event.category ).map( event => event.category ))]
        },
        search() {
            this.dataFilters = this.data.filter( event => event.name.toLowerCase().trim().includes( this.inputText.toLowerCase().trim()))
        }
    },
    computed: {
        filterAll() {
            const filterChecked = this.data.filter(event => this.checked.includes( event.category ) || this.checked.length === 0)
            this.dataFilters = filterChecked.filter( event => event.name.toLowerCase().trim().includes( this.inputText.toLowerCase().trim()))
        }
    }
} )

app.mount('#content')