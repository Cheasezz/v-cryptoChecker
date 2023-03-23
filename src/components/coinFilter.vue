<script>
export default {
	props: {
		tickers: {
			type: Array
		},

	},
	emits: {
		'current-coin-list':(value)=> Array.isArray(value),
	},
  data() {
    return {
      page: 1,
      filter: '',
    };
  },
  methods: {},
  computed: {
    startIndex() {
      return (this.page - 1) * 6;
    },
    endIndex() {
      return this.page * 6;
    },
    filteredTickersList() {
      return this.tickers.filter((ticker) => ticker.name.includes(this.filter.toUpperCase()));
    },
    paginatedTickers() {
			const currentCoins =this.filteredTickersList.slice(this.startIndex, this.endIndex)
			this.$emit('current-coin-list', currentCoins)
      return currentCoins;
    },
    hasNextPage() {
      return this.filteredTickersList.length > this.endIndex;
    },
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page,
      };
    },
  },
	mounted() {
		const windowData = Object.fromEntries(new URL(window.location).searchParams.entries());
    const VALID_KEYS = ['filter', 'page'];
    VALID_KEYS.forEach((key) => {
      if (windowData[key]) {
        this[key] = windowData[key];
      }
    });

	},
	updated(){
	},
	watch: {
		filter() {
      this.page = 1;
    },
    pageStateOptions(value) {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${value.filter.toUpperCase()}&page=${value.page}`
      );
    },
    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },
		tickers(newValue,oldValue){
			if(newValue.length>oldValue.length) this.filter=''
		}
	}
};
</script>

<template>
  <div>
    <button
      v-if="page > 1"
      @click="page = page - 1"
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Назад
    </button>
    <button
      v-if="hasNextPage"
      @click="page = +page + 1"
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Вперед
    </button>
    Фильтр:
    <input
      v-model="filter"
      class="block pl-1 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-600 focus:border-gray-600 sm:text-sm rounded-md"
    />
		<hr class="w-full border-t border-gray-600 my-4" />

  </div>
</template>

<style lang="scss" scoped></style>
