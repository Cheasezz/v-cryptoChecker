<script>
import { unsubscribeFromTicker } from '../api';
export default {
  props: {
    currentCoins: {
      type: Array,
    },
    selT: {
      type: Object,
    },
    tickers: {
      type: Array,
    },
  },
  emits: {
    'selected-ticker': (selectedTicker) => typeof selectedTicker === 'object',
    'tickers-arr-after-del-elem': (tickersArr) => Array.isArray(tickersArr),
  },
  data() {
    return {
      sel: null,
      tickersArr: this.tickers,
    };
  },
  methods: {
    formatPrice(price) {
      if (price === '-') {
        return price;
      }
      return price > 1 ? price.toFixed(2) : price.toPrecision(3);
    },

    select(tik) {
      this.sel = tik;
      this.$emit('selected-ticker', this.sel);
      console.log(this.sel);
    },

    deleteTicket(tikerToRemove) {
      if (this.sel === tikerToRemove) {
        this.sel = null;
        this.$emit('selected-ticker', this.sel);
      }
      this.tickersArr = this.tickersArr.filter((t) => t != tikerToRemove);
      unsubscribeFromTicker(tikerToRemove.name);
      this.$emit('tickers-arr-after-del-elem', this.tickersArr);
      // console.log(tikerToRemove);
    },
  },
  // mounted(){
  // 	this.sel=this.selT
  // }

  watch: {
		tickers(){
			this.tickersArr=this.tickers
		},
    sel() {
      // this.$emit('selected-ticker', this.sel);
    },
    selT() {
      this.sel = this.selT;
      // this.$nextTick().then((this.sel = this.selT));
    },
  },
};
</script>
<template>
  <div>
    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        class="flex flex-col justify-between bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        v-for="tik in currentCoins"
        :key="tik.name"
        @click="select(tik)"
        :class="{
          'border-4': sel === tik,
        }"
      >
        <div class="px-4 py-5 sm:p-6 text-center">
          <h4 class="text-sm font-medium text-gray-500 truncate">{{ tik.name }} - USD</h4>
          <span class="block mt-1 text-3xl font-semibold text-gray-900">
            {{ formatPrice(tik.price) }}
          </span>
        </div>
        <button
          class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          @click.stop="deleteTicket(tik)"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#718096"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path></svg
          >Удалить
        </button>
      </div>
    </div>
    <hr class="w-full border-t border-gray-600 my-4" />
  </div>
</template>

<style lang="scss" scoped></style>
