<script>
import { subscribeToTicker} from '../api';
import hintsForInput from './hintsForInput.vue';
import addButton from './addButton.vue';

export default {
  components: {
    addButton,
		hintsForInput,
  },
  props: {
    tickers: {
      type: Array,
    },
  },
  emits: {
    'give-tickers-arr': (tickersArr) => Array.isArray(tickersArr),
    'loading-coin-list-finished': (bool) => typeof bool === 'boolean',
  },
  data() {
    return {
      ticker: '',
      tickersArr: [],
      isAdded: false,
    };
  },
  methods: {
    add(item = this.ticker.toUpperCase()) {
      this.checkUniqTiker(item);
      if (!this.isAdded && item!=='') {
        const newTicker = { name: item, price: '-' };
        this.tickersArr = [...this.tickersArr, newTicker];
				console.log(this.tickersArr);
        subscribeToTicker(item, (newPrice) => this.UpdateTicker(item, newPrice));

        this.$emit('give-tickers-arr', this.tickersArr);
        this.ticker = '';
      }
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

		hoistingEmitValue(emitValue){
			this.$emit('loading-coin-list-finished',emitValue)
		}
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
            v-model.trim="ticker"
            @keydown.enter="add()"
          />
        </div>

				<hintsForInput @loading-coin-finished="hoistingEmitValue" @selected-hint="add" :ticker="ticker"/>
        <span v-if="isAdded" class="text-sm text-red-600">Такой тикер уже добавлен</span>
      </div>
    </div>
    <add-button @click="add()" type="button" :disabled="tooManyTickersAdded" />
  </section>
</template>
