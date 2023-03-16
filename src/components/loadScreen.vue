<script>
import { getCoinList } from '../api';
export default {
  emits: {
    'is-load-coin-list': (obj) =>typeof obj === 'object',
  },
  data() {
    return {
      isLoading: true,
      coinList: {},
    };
  },
	methods: {
    async requestCoinList() {
      try {

        this.coinList = await getCoinList();

        this.isLoading = false;

        this.$emit('is-load-coin-list',  this.coinList);
      } catch (error) {
        console.log(error);
      }
    },
	},
  mounted() {
		this.requestCoinList()
    // this.isLoadedList = false;
		// console.log(getCoinList());
    // this.coinList = getCoinList();
    // this.isLoadedList = true;
    // this.$emit('is-load-coin-list', this.isLoadedList);
  },
};
</script>

<template>
  <div
	v-if="isLoading"
    class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
  	>
    <svg
      class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
