import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        DNI: null,
        Password: null,
        PIN: null,
        PIN_isActive: false,
        inactiveValue: "Click send PIN to receive a PIN",
    }),
    actions: {
        setDNI(DNI) {
            this.DNI = DNI
        },
        setPassword(Password) {
            this.Password = Password
        },
        setPIN(PIN) {
            this.PIN = PIN
        }
    }
});
