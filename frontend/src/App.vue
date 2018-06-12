<template>
  <div id="app">
    <!-- <h1>Passport Challenge</h1> -->
    <div class="container">
      <div id="tree">
      <p id="root">Root</p>
      <ul v-for="(data, i) in api_data" :key="data._id">
      <div v-if="editFactory === data._id">
        <form id="editForm">
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
        <li class="factory">
          <span>
            {{data.name}} 
          <i class="far fa-edit fa-lg" @click="editFactory = data._id"></i>
          <i class="far fa-trash-alt fa-lg" @click="deleteFactory(data._id, i)"></i>
           </span> 
          ({{data.minRange}}:{{data.maxRange}})
      </li>
      <li class="children" v-for="(child, i) in data.children" :key="i">
        {{child}}
      </li>
      </div>
    </ul>
    </div>
    <div id="form">
      <h2>Add Factory</h2>
      <form>
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
    createChildren(max, min, range, children){
      for(let i = 0; i < range; i++){
        let num = Math.floor(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))
        children[i] = num
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
      this.createChildren(data.maxRange, data.minRange, data.range, data.children)
      console.log(data)
      axios({

        method: 'put',
        url: this.api_url + data._id,
        data: data
      }).then(res => {this.editFactory = null; console.log(res)})
    },
    createFactory(){
      this.createChildren(this.formData.maxRange, this.formData.minRange, this.formData.range, this.formData.children)
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
*{
  margin: 0;
  padding: 0;
}

h1, h2{
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}

i{
  cursor: pointer;
}

li{
  list-style-type: none;
}

h1{
  margin-bottom: 10px;
}
#app{
  max-width: 1200px;
  margin: 25px auto;
  
  .container{
    display: flex;
    height: 80vh;

    #tree{
      padding: 20px;
      width: 50%;
      height: 80vh;
      overflow-y: scroll;
      font-family: 'Roboto', sans-serif;
      

      #root{
        background: #05668D;
        padding: 6px;
        margin-bottom: 4px;
        color: #fff;
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .factory{
        margin: 16px 0 16px 16px;
        display: flex;
        justify-content: space-between;
        background: #00A896;
        padding: 12px;
        color: #fff;
      }
      .children{
        margin-left: 30px;
      }
    }

    #form{
      background: lightblue;
      width: 50%;
      height: 80vh
    }
  }
}
</style>
