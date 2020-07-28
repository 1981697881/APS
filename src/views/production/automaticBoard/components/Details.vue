<template>
  <div class="list-details">
    <p v-for="(t,i) in pArray" :key="i">{{(i+1) +':'+t.note}}</p>
  </div>
</template>

<script>
    export default {
      name: "Details",
      data() {
        return {
          pArray: [],
        };
      },
      methods: {
        fetchData(value) {
          console.log(value)
          this.pArray = value
        }
      }
    }
</script>


<style lang="scss" scoped>
  .list-details {
    text-align: left;
    height: calc(100vh/3);
  }
  .list-details p{
    text-indent: 22px;
  }
</style>
