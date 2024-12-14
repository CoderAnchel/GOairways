// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // también se puede definir como
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
