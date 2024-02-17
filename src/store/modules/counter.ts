import { acceptHMRUpdate, defineStore } from 'pinia'

const delay = (t: number) => new Promise(r => setTimeout(r, t))

export const useCounter = defineStore({
    actions: {
        changeMe() {
            console.log('change me to test HMR')
        },

        async decrementToZero(interval: number = 300) {
            if (this.n <= 0)
                return

            while (this.n > 0) {
                this.$patch((state) => {
                    state.n--
                    state.decrementedTimes++
                })
                await delay(interval)
            }
        },

        async fail() {
            const n = this.n
            await delay(1000)
            this.numbers.push(n)
            await delay(1000)
            if (this.n !== n)
                throw new Error('Someone changed n!')

            return n
        },

        increment(amount = 1) {
            this.incrementedTimes++
            this.n += amount
        },
    },

    getters: {
        double: state => state.n * 2,
    },

    id: 'counter',

    state: () => ({
        decrementedTimes: 0,
        incrementedTimes: 0,
        n: 2,
        numbers: [] as number[],
    }),
})
