<script>
import { getCoinList } from '../api';
import closeButton from './closeButton.vue';

export default {
	components: {
		closeButton,
	},
	props:{
		ticker: {
			type: String
		}
	},
	emits:{
		'loading-coin-finished':(bool) => typeof bool === 'boolean',
		'selected-hint': (tickerHint)=> typeof tickerHint === 'string' 
	},
  data() {
    return {
      hints: [],
      coinsListFrHints: [],
    };
  },
	methods: {
		async requestCoinList() {
      try {
        this.coinsListFrHints = await getCoinList();
      } catch (error) {
        console.log(error.message);
        this.coinsListFrHints = null;
      } finally {
        this.$emit('loading-coin-finished', false);
      }
    },
		selectHintValue(item){
			this.$emit('selected-hint',item)
		},
		closeWarningForEmptyHints() {
      this.coinsListFrHints = [];
    },
	},
	mounted(){
		this.requestCoinList();
	},
	watch: {
		ticker() {
      if (this.ticker.length === 0) return (this.hints = []);

      if (this.coinsListFrHints) {
        this.hints = this.coinsListFrHints
          .filter((item) => item.startsWith(this.ticker.toUpperCase()))
          .slice(0, 4);
      }
    }
	}
};
</script>
<template>
  <div v-if="!coinsListFrHints" class="relative bg-red-200 shadow-md p-1 rounded-md flex-wrap">
    <span class="py-1 rounded-md text-gray-600"> Подсказки не загрузились :( </span>
    <closeButton @click="closeWarningForEmptyHints" class="-right-7" />
  </div>
  <div v-if="hints.length" class="flex bg-white shadow-md p-1 rounded-md flex-wrap">
    <span
      v-for="(item, idx) in hints"
      :key="idx"
      @click="selectHintValue(item)"
      class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
    >
      {{ item }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
