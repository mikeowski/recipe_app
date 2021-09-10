<template>
  <div class='sc'>
    <!--Mealİnfo-->
    <div v-if='isInfo'>
      <div class='fixed top-[60px] right-[120px] cursor-pointer' @click='isInfo = false'>
        <svg xmlns='http://www.w3.org/2000/svg' class='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </div>
      <MainMeal :meal='mealInfo' />
    </div>
    <!--SearchBar-->
    <div v-if='!isInfo'>
      <div class='search space-y-4 mt-[100px] mb-6'>
        <div class='relative w-[400px] h-10 mx-auto'>
          <input placeholder='Search' @keyup.enter='getResults("search",searchText)'
                 class='outline-none p-5 w-full h-full rounded-2xl bg-gray-200' v-model='searchText' type='text'>
          <div @click='getResults("search",searchText)' class='cursor-pointer absolute right-[10px] top-[7px]'>
            <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
                 stroke='currentColor'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>
      </div>

      <Loading v-if='!isContainerReady ' />
      <!--Categories-->
      <h2 class='text-center text-2xl'>Categories</h2>
      <div v-if='!isSearched && isContainerReady' class='categories_container, flex flex-wrap space-x-2 justify-center'>
        <ul class='flex justify-center items-center flex-wrap m-1' v-for='categorie in categorieList'>
          <li @click='getResults("categpries",categorie.strCategory)'
              class='w-[140px] h-28 cursor-pointer shadow-xl text-lg p-1'>
            <div class='flex flex-col text-center'>
              <img :src='categorie.strCategoryThumb' :alt='categorie.strCategoryDescription'
                   class='hover:animate-pulse'>
              <h2 class='text-sm'>{{ categorie.strCategory }}</h2>
            </div>
          </li>
        </ul>
      </div>
      <!--SearchResults-->
      <div v-if='isSearched' class='flex justify-center flex-wrap justify-center  relative'>
        <ul v-for='result in resultsList' :key='result.idMeal' class='cursor-pointer shadow-lg'
            @click='getMealInfo(result.idMeal)'>
          <li>
            <div class='w-32 m-4'>
              <img :src='result.strMealThumb' :alt='result.strMeal' class='rounded-full'>
              <h2 class='text-center'>{{ result.strMeal }}</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorieList: [],
      searchText: '',
      resultsList: [],
      isSearched: false,
      mealInfo: [],
      isInfo: false,
      isContainerReady: false
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
        method: 'GET'
      }).then(res => {
        return res.json()
      })
      this.categorieList = categories.categories
      this.isContainerReady = true
    },
    async getResults(mode, payload) {
      let results
      this.isContainerReady = false
      if (mode === 'categpries') {
        results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${payload}`, {
          method: 'GET'
        }).then(rs => {
          return rs.json()
        })
        this.resultsList = results.meals

      } else if (mode === 'search') {
        results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${payload}`)
          .then(rs => {
            return rs.json()
          })
        this.resultsList = results.meals
      }
      if(this.resultsList != null) {
        this.isSearched = true
      }
      this.isContainerReady = true
      this.searchText = ''

    },
    async getMealInfo(id) {
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(rs => {
          return rs.json()
        })
      this.mealInfo = result.meals[0]
      this.isInfo = true
      this.isSearched = false
    }
  }
}
</script>

<style scoped>

</style>
