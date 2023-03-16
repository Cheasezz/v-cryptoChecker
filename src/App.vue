<script>
import addTicker from './components/addTicker.vue';
import addGraph from './components/addGraph.vue';
import loadScreen from './components/loadScreen.vue';
import coinFilter from './components/coinFilter.vue';
import tickersPool from './components/tickersPool.vue';

export default {
  name: 'App',

  components: {
    addTicker,
    addGraph,
    loadScreen,
    coinFilter,
    tickersPool,
  },

  data() {
    return {
      tickers: [],
      sel: null,
      currentCoins: [],
      coinsListFrHints: {},
    };
  },
  methods: {
    loadingScreenEventHandler(obj) {
      this.coinsListFrHints = obj;
    },
    uppdateTickersArr(newTickersArr) {
      this.tickers = newTickersArr;
    },
    selectTik(item) {
      this.sel = item;
    },
  },
};
</script>

<template>
  <div class="mx-auto flex flex-col items-center bg-gray-50 p-4">
    <load-screen @is-load-coin-list="loadingScreenEventHandler" />

    <div class="container">
      <add-ticker
        @give-tickers-arr="uppdateTickersArr"
        :coinList="coinsListFrHints"
        :tickers="tickers"
      />

      <template v-if="tickers.length">
        <coin-filter @current-coin-list="(rez) => (currentCoins = rez)" :tickers="tickers" />

        <tickers-pool
          @selected-ticker="selectTik"
          :selT="sel"
          @tickers-arr-after-del-elem="uppdateTickersArr"
          :currentCoins="currentCoins"
          :tickers="tickers"
        />
        <add-graph @unselect-tik="selectTik" :sel="sel" />
      </template>
    </div>
  </div>
</template>

<style></style>
