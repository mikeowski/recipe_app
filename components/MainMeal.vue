<template>
  <div class='flex flex-col w-full'>
    <div class='flex flex-col lg:flex-row lg:justify-evenly text-center items-center justify-center'>
        <img :src='meal.strMealThumb' :alt='meal.strMeal' class='lg:w-400  shadow-md lg:my-10'>
        <div class='space-y-1 lg:mt-0 mt-4'>
          <h2 class='text-5xl'>{{meal.strMeal}}</h2>
          <span>{{meal.strCategory}}</span>
        </div>
    </div>
    <div class='space-y-4 mx-8 mt-10 lg:grid grid-cols-2 gap-10 justify-center'>

      <div class='space-y-4'>
        <h2 class='text-4xl font-bold'>Instructions:</h2>
        <p class='font-light text-xl'>{{meal.strInstructions}}</p>
      </div>

      <div class='space-y-4'>
        <h2 class='text-4xl font-bold'>Ingredients:</h2>
        <ul class='space-y-1' v-for='(ingredient,index) in ingredients' :key='index'>
          <li>{{index + 1}}: {{ingredient}}</li>
       </ul>
    </div>
    </div>


  </div>
</template>

<script>
export default {
  name:'MainMeal',
  data(){
    return{
      ingredients:[]
    }
  },

  props:{
    meal:{
      type:Object,
      required:true
    }
  },
  created() {
    this.listIngredients(),
      console.log(this.meal)
  },
  methods:{
    listIngredients(){
      for(let i = 1 ; i <21 ; i++ ){
        if(this.meal[`strIngredient${i}`]){
          this.ingredients.push(`${this.meal[`strIngredient${i}`]} - ${this.meal[`strMeasure${i}`]}`)
        }
      }
      console.log(this.ingredients)
    }
  }
}
</script>

<style scoped>

</style>
