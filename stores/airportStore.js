// stores/counter.js
import { defineStore } from 'pinia'
import { setTipoFunc } from '../logic/basic.js'

export const useAirportsStore = defineStore('routeCreator', {
    state: () => ({
        airportFrom: null,
        airportTo: null,
        showDistance: true,
        tipo: null,
        selectedModels: [],
        dailyFrequ: null,
        DaysAWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        SelectedDays: [],
        takeOffTime: null,
        landingTime: null,
        flightTime: { hours: 0, minutes: 0 },
        takeOffTickets: []
    }),
    actions: {
        setAirportFrom(airport) {
            this.airportFrom = airport
        },
        setAirportTo(airport) {
            this.airportTo = airport
        },
        setTipo(distance) {
            this.tipo = setTipoFunc(distance)
        },
        appendModel(model) {
            if (this.selectedModels.includes(model)) {
                this.selectedModels = this.selectedModels.filter((m) => m !== model)
                return
            }

            this.selectedModels.push(model)
        },
        setDayFreq(freeq) {
            this.dailyFrequ = freeq
        },
        addDay(day) {
            if (this.SelectedDays.includes(day)) {
                this.SelectedDays = this.SelectedDays.filter((d) => d !== day)
                return
            }

            this.SelectedDays.push(day)
        },
        createTickets() {
            let number = 1
            this.takeOffTickets = []
            for (let i = 0; i < this.dailyFrequ; i++) {
                this.takeOffTickets.push({
                    id: number++,
                    airportFrom: this.airportFrom,
                    airportTo: this.airportTo,
                    takeOffTime: this.takeOffTime,
                    landingTime: this.landingTime,
                    flightTime: this.flightTime,
                    selectedModels: this.selectedModels,
                    SelectedDays: this.SelectedDays
                })
            }
        }
    },
})

