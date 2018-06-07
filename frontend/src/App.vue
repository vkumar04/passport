<template>
  <div id="app">
    <ul v-for="(data, i) in api_data" :key="data._id">
      <li>
        <button @click="deleteFactory(data._id, i)">delete</button>
        {{data.name}}, ({{data.minRange}}:{{data.maxRange}})
      </li>
      <br>
      <li>
        <ul v-for="(child, i) in data.children" :key="i">
          <li>{{child}}</li>
        </ul>
      </li>
    </ul>
    <div>
      <h2>Add Factory</h2>
      <form action="postp">
        <label for="name">Name:</label>
        <input type="text" name="Name" v-model="formData.name">
        <label for="minRange">Min Range:</label>
        <input type="text" name="minRange" v-model="formData.minRange">
        <label for="maxRange">Max Range:</label>
        <input type="text" name="maxRange" v-model="formData.maxRange">
        <label for="range">Child Count:</label>
        <input type="text" name="range" v-model="formData.range">
        <button @click.prevent="createFactory">submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      api_url: 'http://localhost:5000/api/',
      api_data: [],
      formData: {
        name: '',
        maxRange: 0,
        minRange: 0,
        range: 0,
        children: []
      }
    }
  },
  methods: {
    createChildren(){
      console.log(this.formData)
      let max = parseInt(this.formData.maxRange)
      let min = parseInt(this.formData.minRange)
      let range = this.formData.range

      for(let i = 0; i < range; i++){
        let num = Math.floor(Math.random() * (max - min) + min)
        this.formData.children[i] = num
      }
    },
    getData(){
      axios.get(this.api_url)
        .then((res) => {
          console.log(res);
          this.api_data = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteFactory(id, i){
      axios.delete(this.api_url + id)
        .then((res) => {
          console.log('deleted', id)
          this.api_data.splice(i, 1)
      })
    },
    createFactory(){
      this.createChildren()
      console.log(this.data)
      axios({
        method: 'post',
        url: this.api_url,
        data: this.formData
      }).then(res => {
        this.api_data.push(res.data)
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
