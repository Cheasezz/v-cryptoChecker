d
<script>
import { unsubscribeFromTicker } from '../api';
import delButton from './delButton.vue';
export default {
  components: {
    delButton,
  },
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
    tickers() {
      this.tickersArr = this.tickers;
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
        <del-button @click.stop="deleteTicket(tik)" />
      </div>
    </div>
    <hr class="w-full border-t border-gray-600 my-4" />
  </div>
</template>

<style lang="scss" scoped></style>
