<script>
import { subscribeToTicker, unsubscribeFromTicker, socket } from '../api';
import addButton from './addButton.vue';

export default {
  components: {
    addButton,
  },
  props: {
    tickers: {
      type: Array,
    },
    coinList: {
      type: Object,
    },
  },
  emits: {
    'give-tickers-arr': (tickersArr) => Array.isArray(tickersArr),
  },
  data() {
    return {
      ticker: '',
      tickersArr: this.tickers,
      isAdded: false,
      hints: [],
    };
  },
  methods: {
    add(item = this.ticker.toUpperCase()) {
      // if (this.tickersArr.length === 0) return;
      this.checkUniqTiker(item);
      if (!this.isAdded) {
        const newTicker = { name: item, price: '-' };
        this.tickersArr = [...this.tickersArr, newTicker];
        subscribeToTicker(item, (newPrice) => this.UpdateTicker(item, newPrice));
        this.$emit('give-tickers-arr', this.tickersArr);
        this.ticker = '';
      }
      this.hints = [];
    },
    UpdateTicker(tickerName, price) {
      this.tickersArr
        .filter((t) => t.name === tickerName)
        .forEach((t) => {
          t.price = price;
        });
    },
    checkUniqTiker(item) {
      const checkTickersArray = this.tickersArr.map((t) => t.name == item);
      checkTickersArray.includes(true) ? (this.isAdded = true) : (this.isAdded = false);
    },

  },
  computed: {
    tooManyTickersAdded() {
      return this.tickersArr.length >= 12;
    },
  },
	mounted() {
    const tickersData = localStorage.getItem('cryptoList');
    if (tickersData) {
      this.tickersArr = JSON.parse(tickersData);
      this.tickersArr.forEach((ticker) => {
        subscribeToTicker(ticker.name, (newPrice) => {
          this.UpdateTicker(ticker.name, newPrice);
        });
      });
			this.$emit('give-tickers-arr', this.tickersArr);
    }
  },
  watch: {
    ticker() {
      this.isAdded = false;
      if (this.ticker.length === 0) return (this.hints = []);

      this.hints = Object.keys(this.coinList.Data)
        .filter((item) => item.startsWith(this.ticker.toUpperCase()))
        .slice(0, 4);
    },
    tickers() {
      this.tickersArr = this.tickers;
			localStorage.setItem('cryptoList', JSON.stringify(this.tickersArr));
    },

  },
};
</script>

<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700">Тикер</label>
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
            v-model="ticker"
            @keydown.enter="add()"
          />
        </div>
        <div v-if="hints.length > 0" class="flex bg-white shadow-md p-1 rounded-md flex-wrap">
          <span
            v-for="(item, idx) in hints"
            :key="idx"
            @click="add(item)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ item }}
          </span>
        </div>
        <div v-if="isAdded" class="text-sm text-red-600">Такой тикер уже добавлен</div>
      </div>
    </div>
    <add-button @click="add()" type="button" :disabled="tooManyTickersAdded" />
    <input type="button" />
  </section>
</template>
