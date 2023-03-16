<script>
import delButton from './delButton.vue';
export default {
	components:{
		delButton
	},
  props: {
    sel: {
      type: Object,
      required: false,
    },
  },
  emits: {
		'unselect-tik': (value)=> value === null,
	},
  data() {
    return {
      graph: [],
      maxGraphElements: 1,
    };
  },
  methods: {
    calculateMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }
      this.maxGraphElements = this.$refs.graph.clientWidth / 38;

    },
    UpdateTicker( price) {
      this.graph.push(price);
      while (this.graph.length > this.maxGraphElements) {
        this.graph.shift();
      }
    },

  },
  computed: {
    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      if (maxValue === minValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map((price) => 5 + ((price - minValue) * 95) / (maxValue - minValue));
    },

  },
  mounted() {
		this.calculateMaxGraphElements()
    window.addEventListener('resize', this.calculateMaxGraphElements);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateMaxGraphElements);
  },
  watch: {
    'sel.price'(val){
			this.$nextTick().then(this.calculateMaxGraphElements);
			// this.calculateMaxGraphElements()
    	this.UpdateTicker(val)
    },
		sel(){
			this.graph=[]
		}
  },
};
</script>

<template>
  <section v-if="sel" class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">{{ sel.name }} - USD</h3>
    <div class="flex items-end border-gray-600 border-b border-l h-64" ref="graph">
      <div
        v-for="(bar, idx) in normalizedGraph"
        :key="idx"
        :style="{ height: `${bar}%` }"
        class="bg-purple-800 border w-10"
      ></div>
    </div>
    <del-button @click="$emit('unselect-tik',null)"/>
  </section>
</template>

<style lang="scss" scoped></style>
