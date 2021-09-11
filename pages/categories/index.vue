<template>
  <div class='sc'>
    <Loading v-if='!isContainerReady'/>
    <div v-if='isContainerReady' class='categories_container, flex flex-wrap space-x-2 justify-center'>
      <ul class='flex justify-center items-center flex-wrap m-1' v-for='category in categoryList'>
        <li class='cursor-pointer shadow-xl text-lg p-1'>
          <nuxt-link :to='"categories/" + category.strCategory' class='flex flex-col text-center'>
            <img :src='category.strCategoryThumb' :alt='category.strCategoryDescription'
                 class='hover:animate-pulse'>
            <h2 class=''>{{ category.strCategory }}</h2>
          </nuxt-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      categoryList:[],
      isContainerReady: false,
    }
  },

  mounted() {
    this.getCategories()
  },
  methods:{
    async getCategories() {
      const categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
        method: 'GET'
      }).then(res => {
        return res.json()
      })
      this.categoryList = categories.categories
      this.isContainerReady = true
    },
  }
}
</script>

<style scoped>

</style>
