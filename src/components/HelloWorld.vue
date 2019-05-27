<template>
 <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>TOKPEDIA TEST</h2>
	 <form method="POST" action="" @submit.prevent="submitData()">
    <ul>
      <li>
	  <vue-numeric currency="Rp" separator="." v-model="dataInput" class="form-text"></vue-numeric> 
	<input type="text" v-model="dataInput2" class="form-text">
      </li> 
      <li>
	<button type="submit" class="btn btn-success">Submit</button>
      </li> 
    </ul>
	</form> 
  </div>
</template>

<script>

import VueNumeric from 'vue-numeric'


export default {
  name: 'HelloWorld',
  components: {
            VueNumeric
        },   
  data () {
    return {
      msg			: 'Front End Use Vue.js App',
	  dataInput		: '',
	  dataInput2	: '',
	  afterComma	: '',
	  errors		: [],
	  dataFix		: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
    }
  }, 
  methods: {  
		  submitData() {
		  this.afterComma = '';		  
		  var data = this.dataInput2;
		  var totalString = this.dataInput2.length;
                 
				 var checkRp = this.invalidSeparatorCharacter(data,totalString); 
				 this.showTime('success',checkRp); 
		  },
		  
		  invalidSeparatorCharacter(data,total)
		  {
			var Character = data;
			var Character2 = data.substring(0,2);
			var Character3 = data.substring(0,3);
			
			if(Character2 == 'Rp' )
			{
				var checkCharacter = data.substring(3,2);
				
				if(isNaN(checkCharacter)){
					this.showTime('warning','invalid separator');
				}else{
					if(checkCharacter == ' '){
					var checkCharacter2 = data.substring(4,2);
						if(isNaN(checkCharacter)){
							this.showTime('warning','invalid separator');
						}else{
							return checkCharacter2; 
						}
					}else{
						return 'no';  
						
					}
					  
				} 
				 
			} 
			else{ 
				var isValid = /^[0-9,.]*$/.test(data); 
				if(isValid){
					var checkSeparatorComma = this.invalidSeparatorComma(data); 
					return checkSeparatorComma;  
				}else{
					this.showTime('warning','invalid separator');
				} 
			}
		  },
		   
		  invalidSeparatorComma(data)
		  {
		  var indexOf = data.indexOf(',');
			  if (indexOf > -1) { 
					var splitString = data.split(","); 
					if(splitString.length > 2)
					{
						this.showTime('warning','invalid separator');
					}
					else
					{ 
						if(splitString[1].length > 2){
							this.showTime('warning','invalid separator');
						}else{
							this.afterComma = splitString[1];
							return true; 						
						}
					}
			  }
			  else
			  {
						return data;
			  } 		  
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
