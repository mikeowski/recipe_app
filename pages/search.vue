<template>
  <div class='sc'>
    <!--SearchBar-->
    <div>
      <div class='search space-y-4 mt-[100px] mb-6'>
        <h2 class='text-6xl text-center'>Search</h2>
        <div class='relative w-[400px] h-10 mx-auto'>
          <input placeholder='Carrot Cake, Beef Wellington etc...' @keyup.enter='getResults(searchText)'
                 class='outline-none p-5 w-full h-full rounded-2xl bg-gray-200' v-model='searchText' type='text'>
          <div @click='getResults(searchText)' class='cursor-pointer absolute right-[10px] top-[7px]'>
            <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
                 stroke='currentColor'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>
      </div>
      <Loading v-if='!isContainerReady'/>
      <!--SearchResults-->
      <h2 v-if='isFailed' class='text-3xl text-center mt-8'>Hmm we're not getting any results<br/>Try againg</h2>
      <div v-if='isContainerReady' class='flex justify-center flex-wrap justify-center  relative'>
        <ul v-for='result in resultsList' :key='result.idMeal' class='cursor-pointer shadow-lg'>
          <nuxt-link :to='"/"+result.idMeal'>
          <li>
            <div class='w-32 m-4'>
              <img :src='result.strMealThumb' :alt='result.strMeal' class='rounded-2xl'>
              <h2 class='text-center'>{{ result.strMeal }}</h2>
            </div>
          </li>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      resultsList: [],
      isFailed: false,
      isContainerReady: true,
    }
  },
  methods: {
    async getResults(payload) {
      let results
      this.isContainerReady= false
      results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${payload}`)
          .then(rs => {
            return rs.json()
          })
        this.resultsList = results.meals
      this.isContainerReady = true
      if(this.resultsList == null) {
        this.isFailed = true
      }
      this.searchText = ''
    },
  }
}
</script>

<style scoped>

</style>
