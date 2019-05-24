<template>
 <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>TOKPEDIA TEST</h2>
	 <form method="POST" action="" @submit.prevent="submitData()">
    <ul>
      <li>
	<input type="text" v-model="datainput" class="form-text">
      </li> 
      <li>
	<button type="submit" class="btn btn-success">Submit</button>
      </li> 
    </ul>
	</form> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Front End Use Vue.js App',
	  datainput: '',
	  errors:[],
    }
  }, 
  methods: {  
		  submitData() {
                    this.showTime('error',this.datainput) 
		  },
          showTime(type,pesan) {
              this.$toasted.show(pesan, { 
                  type : type,  
                  theme: 'bubble',
                  position: 'top-right',
                  duration: 5000
              })
          },
		},  
	mounted() {   
	} 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
