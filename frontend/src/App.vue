<template>
  <div id="app">
    <ul v-for="(data, i) in api_data" :key="data._id">
      <div v-if="editFactory === data._id">
        <form>
          <label for="name">Name:</label>
          <input type="text" name="Name" v-model="data.name">
          <label for="minRange">Min Range:</label>
          <input type="text" name="minRange" v-model="data.minRange">
          <label for="maxRange">Max Range:</label>
          <input type="text" name="maxRange" v-model="data.maxRange">
          <label for="range">Child Count:</label>
          <input type="text" name="range" v-model="data.range">
          <button @click.prevent="updateFactory(data)">update</button>
          <button @click.prevent="editFactory = null">cancel</button>
        </form>
      </div>
      <div v-else>
        <li>
          <button @click="editFactory = data._id">edit</button>
          <button @click="deleteFactory(data._id, i)">delete</button>
          {{data.name}}, ({{data.minRange}}:{{data.maxRange}})
      </li>
      <br>
      <li>
        <ul v-for="(child, i) in data.children" :key="i">
          <li>{{child}}</li>
        </ul>
      </li>
      </div>
    </ul>
    <div>
      <h2>Add Factory</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" name="Name" v-model="formData.name">
        <label for="minRange">Min Range:</label>
        <input type="text" name="minRange" v-model="formData.minRange">
        <label for="maxRange">Max Range:</label>
        <input type="text" name="maxRange" v-model="formData.maxRange">
        <label for="range">Child Count:</label>
        <input type="number" name="range" min="1" max="15" v-model="formData.range">
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
      editFactory: null,
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
      let range = toString(this.formData.range)

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
    updateFactory(data){
      console.log(data)
      axios.put(this.api_url + data._id)
      .then(res => this.editFactory = null)
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
