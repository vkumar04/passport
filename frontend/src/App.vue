<template>
  <div id="app">
    <h1>Passport Challenge</h1>
    <div class="container">
      <div id="tree">
      <p id="root">Root</p>
      <ul v-for="(data, i) in api_data" :key="data._id">
      <div v-if="editFactory === data._id">
        <form id="editFactory">
          <i @click.prevent="editFactory = null" class="close fas fa-times"></i>
          <span>{{ errors.first('Name') }}</span>
          <span>{{ errors.first('minRange') }}</span>
          <span>{{ errors.first('maxRange') }}</span>
          <label for="name">Factory Name:</label>
          <input v-validate="{required: true}" type="text" name="Name" v-model="data.name">
          <label for="minRange">Min Range:</label>
          <input v-validate="{required: true, min_value:0, is_not: formData.maxRange, regex: /^([0-9]+)$/ }" type="text" name="minRange" v-model="data.minRange">
          <label for="maxRange">Max Range:</label>
          <input v-validate="{required: true, min_value:0, is_not: formData.minRange, regex: /^([0-9]+)$/ }" type="text" name="maxRange" v-model="data.maxRange"> 
          <button @click.prevent="updateFactory(data)">update</button>
        </form>
      </div>
      <div v-else>
        <li class="factory">
          <span>
            {{data.name}} 
          <i class="far fa-edit" style="margin-left:10px" @click="editFactory = data._id"></i>
          <i class="far fa-trash-alt" @click="deleteFactory(data._id, i)"></i>
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
      <form id="createFactory">
        <span>{{ errors.first('Name') }}</span>
        <span>{{ errors.first('minRange') }}</span>
        <span>{{ errors.first('maxRange') }}</span>
        <span>{{ errors.first('range') }}</span>
        <input v-validate="{required: true}" placeholder="FACTORY NAME" type="text" name="Name" v-model="formData.name">
        <input v-validate="{required: true, min_value:0, is_not: formData.maxRange, regex: /^([0-9]+)$/ }" placeholder="MIN RANGE" type="text" name="minRange" v-model="formData.minRange">
        <input v-validate="{required: true, min_value:0, is_not: formData.minRange, regex: /^([0-9]+)$/ }" placeholder="MAX RANGE" type="text" name="maxRange" v-model="formData.maxRange">
        <input v-validate="{required: true, min_value:0, max_value:15, regex: /^([0-9]+)$/ }" placeholder="CHILDREN COUNT" type="text" name="range" v-model="formData.range">
        <button id="submit" :disabled="isFormDirty" @click.prevent="createFactory">submit</button>
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
        maxRange: null,
        minRange: null,
        range: null,
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
      axios({
        method: 'patch',
        url: this.api_url + data._id,
        data: {
          name: data.name,
          maxRange: data.maxRange,
          minRange: data.minRange,
          range: data.range,
          children: data.children
        }
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
        this.formData = {
        name: '',
        maxRange: null,
        minRange: null,
        range: null,
        children: []
      }
      })
    }
  },
  computed: {
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
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

span {
  white-space: nowrap;
}

#createFactory, #editFactory{
	display: flex;
	flex-direction: column;
	width: 200px;
  padding: 20px 40px;
  border: 1px solid #000;
  position: relative;
  margin-top: 20px;
  .close{
    position: absolute;
    top: 6px;
    right: 8px;
  }
  label{
    font-size: 12px;
    text-transform: uppercase;
  }
	input[type=text]{
		margin: 10px 0;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    border: 1px black solid;
    color: #000;
	}
  button{
    background: #00A896;
    margin-bottom: 10px;
    padding: 10px 12px;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: none;
    outline: none;
    &:disabled{
      background: darken(#00A896, 40%)
    }
  }
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
      width: 50%;
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 40px;
    }
  }
}

</style>
