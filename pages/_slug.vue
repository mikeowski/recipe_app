<template>
  <div class='sc'>

      <MainMeal v-if='fetchStatus' :meal='meal'/>
       <Loading v-if='!fetchStatus' />
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  },
  data(){
    return{
      meal:{},
      fetchStatus:false
    }
  },
  mounted() {
    this.getMeal()
  },
  methods:{
    async getMeal(){
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.slug}`,{
        method:'GET'
      })
      .then(rs =>{return rs.json()})
      console.log('calıştı',this.slug)
      this.meal = result.meals[0]
      this.fetchStatus = true
    }
  }
}
</script>

<style scoped>

</style>
