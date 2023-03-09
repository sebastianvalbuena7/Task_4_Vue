const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            eventsData: [],
            data: [],
            dataFilters: [],
            categories: [],
            checked: [],
            inputText: '',
        }
    },
    created() {
            this.eventsData = eventos
            this.data = this.eventsData.events
            this.dataCheckbox()
    },
    methods: {
        dataCheckbox() {
            this.categories = [... new Set(this.data.map( event => event.category ))]
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