<template>
  <div>
    <MainMeal v-if='fetchStatus' :meal='randomMeal' />
    <Loading v-if='!fetchStatus' />

  </div>
</template>

<script>
export default {
  name: 'RandomMeals',
  data() {
    return {
      randomMeal: null,
      fetchStatus: false

    }
  },
  computed: {
    randomMealfunc() {
      return this.randomMeal
    }

  },
  mounted() {
    this.fetchRandomMeal()
  },
  methods: {
    async fetchRandomMeal() {
      const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
        method: 'GET'
      }).then(rs => {
        return rs.json()
      })
      this.randomMeal = result.meals[0]
      this.fetchStatus = true

    }
  }
}
</script>

<style scoped>

</style>
