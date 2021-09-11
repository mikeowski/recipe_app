<template>
  <div class='sc mt-2'>
    <Loading v-if='!isContainerReady'/>
    <h2 class='text-4xl font-bold text-center'>{{this.slug}}</h2>
    <div v-if='isContainerReady' class='categories_container, flex flex-wrap space-x-2 justify-center'>
      <div class='w-2/5' v-for='meal in resultsList'>
        <nuxt-link :to='"/"+meal.idMeal'>
        <div class='items-center m-2 relative'>
            <img :src='meal.strMealThumb' :alt='meal.strMeal'
                 class='hover:animate-pulse rounded-2xl'>
            <div class='text-white text-center font-bold md:text-2xl text-sm bg-[rgba(110,110,110,0.4)] rounded-2xl bottom-0 top-0 right-0 left-0 flex items-center justify-center absolute'>
              {{ meal.strMeal }}
            </div>
        </div>
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isContainerReady: false,
      resultsList:[],

  }},
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  },
  mounted() {
    this.getResults()
  },
  methods:{
    async getResults(){
      let results
        results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.slug}`, {
          method: 'GET'
        }).then(rs => {
          return rs.json()
        })
        this.resultsList = results.meals
      this.isContainerReady = true

    },
  }

}
</script>

<style scoped>

</style>
