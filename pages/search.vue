<template>
  <div class='sc'>

    <div class='search space-y-4 mt-[200px] mb-6'>
      <h2 class='text-4xl text-center'>Search</h2>
      <div class='relative w-[400px] h-10 mx-auto'>
      <input @keyup.enter='getResults("search",searchText)' class='outline-none p-5 w-full h-full rounded-2xl bg-gray-200' v-model='searchText' type='text'>
      <div @click='getResults("search",searchText)'  class='cursor-pointer absolute right-[10px] top-[7px]'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      </div>
    </div>



    <div class='categories_container, flex flex-wrap space-x-2 justify-center'>
      <ul class='flex justify-center items-center flex-wrap m-1' v-for='categorie in categorieList'>
        <li @click='getResults("categpries",categorie.strCategory)' class='w-[140px] h-28 cursor-pointer shadow-xl text-lg p-1'>
          <div class='flex flex-col text-center'>
            <img :src='categorie.strCategoryThumb' :alt='categorie.strCategoryDescription' class='hover:animate-pulse'>
            <h2 class='text-sm'>{{categorie.strCategory}}</h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      categorieList:[],
      searchText:'',
      resultsList:[]
    }
  },
  created() {
    this.getCategories()
  },
  methods:{
    async getCategories(){
      const categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php',{
        method:'GET'
      }).then(res =>{return res.json()})
      this.categorieList = categories.categories
    },
    async getResults(mode,payload){
      let results;
      if(mode == 'categpries'){
        results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${payload}`,{
          method:'GET'
        }).then(rs =>{return rs.json()})
        this.resultsList = results.meals

      }else if(mode =='search'){
        results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${payload}`)
          .then(rs =>{return rs.json()})
        this.resultsList = results.meals
      }
      console.log(this.resultsList)
    }
  }
}
</script>

<style scoped>

</style>
