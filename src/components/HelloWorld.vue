<template>
<div>
 <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>TOKPEDIA TEST</h2>
	 <form method="POST" action="" @submit.prevent="submitData()">
    <ul>
      <li> 
	<input type="text" v-model="dataInput2" class="form-text">
      </li> 
      <li>
	<button type="submit" class="btn btn-success">Submit</button>
      </li> 
    </ul>
	</form>
	
<div v-for="item in this.dataOutput">	
<p v-if="item.value > 0 && item.out > 0">
 
{{item.lembar}}xRp{{item.value}}
 
</p>
<p v-else>

left Rp{{item.out}} (no available fraction)
</p>
 
 </div>
	
  </div>
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
	  dataOutput	: '',
	  dataInput2	: '',
	  numberInput 	: [],
	  afterComma	: '',
	  errors		: [],
	  dataFix		: [{length:6,value:100000},{length:5,value:50000},{length:5,value:20000},{length:5,value:10000},{length:4,value:5000},{length:4,value:1000},{length:3,value:500},{length:3,value:100},{length:2,value:50}],
	  dataFix2		: [100000,50000,20000,10000,5000,1000,500,100,50],
    }
  }, 
  methods: {  
		  submitData() {
		  this.afterComma = '';		  
		  var data = this.dataInput2;
		  var totalString = this.dataInput2.length;
                 
				 var checkRp = this.invalidSeparatorCharacter(data,totalString); 
				 this.dataOutput =  checkRp; 
		  },
		  
		  invalidSeparatorCharacter(data,total)
		  {
			var Character = data;
			var Character2 = data.substring(0,2); 
			
			if(Character2 == 'Rp' )
			{
				var checkCharacter = data.substring(3,2);
				
				if(isNaN(checkCharacter)){
					this.checkMissingValue(data,total);
				}else{
					if(checkCharacter == ' '){
					var checkCharacter2 = data.substring(4,2);
					if (this.isNumeric(checkCharacter2)) {
							var dataCheck = data.substring(3,total); 
								var checkstringData = this.checkString(dataCheck); 
								if(checkstringData){
									var checkSeparatorComma = this.invalidSeparatorComma(dataCheck); 
										if(checkSeparatorComma){
											var invalidSeparatorDot = this.invalidSeparatorDot(checkSeparatorComma); 
											if(invalidSeparatorDot){
											return invalidSeparatorDot;   
											}else{
											this.checkMissingValue(data,total);
											}
										}else{
											this.checkMissingValue(data,total);
										}
								}else{ 
									this.checkMissingValue(data,total);
								}
							
						}else{ 
									this.checkMissingValue(data,total);
						}
					}else{
							var dataCheck = data.substring(2,total); 
							var checkSeparatorComma = this.invalidSeparatorComma(dataCheck); 
										if(checkSeparatorComma){
											var invalidSeparatorDot = this.invalidSeparatorDot(checkSeparatorComma); 
											if(invalidSeparatorDot){
											return this.calculateFraction(invalidSeparatorDot);   
											}else{
											this.checkMissingValue(data,total);
											}
										}else{
											this.checkMissingValue(data,total);
										} 
						
					}
					  
				} 
				 
			} 
			else{  
					var checkstringData = this.checkString(data);
							if(checkstringData){
								var checkSeparatorComma = this.invalidSeparatorComma(data); 
										if(checkSeparatorComma){
											var invalidSeparatorDot = this.invalidSeparatorDot(checkSeparatorComma); 
											if(invalidSeparatorDot){
											return this.calculateFraction(invalidSeparatorDot);   
											}else{
											this.checkMissingValue(data,total);
											}
										}else{
											this.checkMissingValue(data,total);
										} 
							}else{ 
								this.checkMissingValue(data,total);
							}
			}
		  },
		  
		  calculateFraction(number) {
			  var found = [];
			  var out = Number(number);
				var fraction = this.dataFix2;
			  fraction.forEach(function(element, index) { 
				if (out >= element) {
				  var lembar = parseInt(out/element);
				  found.push({
					value: element,
					lembar: lembar,
					out:out
				  });
				  out = out - (lembar*element);
				   
				}  
			 
			  });
						found.push({
							value: 0,
							lembar: 0,
							out:out 
						  });
			  return found;
			
			
			
			/*
			var dataLength = data.toString().length;
			var dataLastDigit = data.toString().split('').pop();
			var x = dataLength-1;
			var total = 0; 
			var result = [];
			 
			for(var i=0; i < dataLength; i++){
				var digit 			= data.toString()[i];
				var tens 			= Number(digit)*Math.pow(10,x); 
				var tensLength 		= Number(tens.toString().length);  
				var checkFraction	= this.checkLengthDataFix(tensLength);
					if(checkFraction.length > 0){
					var calculateFractionWithNumber = this.calculateFractionWithNumber(checkFraction,tens);
					result[i] = calculateFractionWithNumber;
					}
					 
				x--;		
			}
			 
			result.push({
							value: 0,
							lembar: 0,
							out:Number(dataLastDigit)
						  });
						  
						  
			return result;
			
			*/
			 
		  },
		  
		  calculateFractionWithNumber(fraction, number) {
			  var found = [];
			  var out = number;
		 
			  fraction.forEach(function(element, index) { 
				if (out >= element) {
				  var lembar = parseInt(out/element);
				  found.push({
					value: element,
					lembar: lembar,
					out:out
				  });
				  out = out - (lembar*element);
				 
					  if(out < fraction[index+1] && out > 0){
							found.push({
							value: 0,
							lembar: 0,
							out:out 
						  });
					  }
				}  
			 
			  });

			  return found;
			},
		  
		  checkLengthDataFix(data){
		  var found = [];
		  var i = 0;
		  this.dataFix.forEach(function(element) {
				  if(element.length == data)
				  {
					 found.push(element.value);        
				  }
			 i++;
			});

				return found; 
		  },
		  		 
		  
		  checkString(data)
		  { 
				var isValid = /^[0-9,.]*$/.test(data); 
				if(isValid){
					return true;  
				}else{
					return false;  
				} 
		  },
		  
		  checkMissingValue(data,total){
				var Character2 = data.substring(0,2); 
				var Character3 = data.substring(total,total-2); 
					 if(Character2 == 'Rp' && total == 2)
					{
						this.showTime('warning','missing value');
					} 
					else if(Character3 == 'Rp'){
						this.showTime('warning','valid character in wrong position');
					}
					else{
						this.showTime('warning','invalid separator');
					}
		  },
		   
		  invalidSeparatorComma(data)
		  {
		  var indexOf = data.indexOf(',');
			  if (indexOf > -1) { 
					var splitString = data.split(","); 
					if(splitString.length > 2)
					{
						return false;
					}
					else
					{ 
						if(splitString[1].length > 2){
							return false;
						}else{
							this.afterComma = splitString[1];
							return  splitString[0];			
						}
					}
			  }
			  else
			  {
						return data;			
			  } 		  
		  },
		   
		  invalidSeparatorDot(data)
		  {
		  var indexOf = data.indexOf('.');
			  if (indexOf > -1) { 
					var splitString = data.split("."); 
					
					var errorNya = [];
					 for(var i =0; i < splitString.length; i++){
							if(splitString[i].length > 3){
							 errorNya[i] = 'error';
						}
					  }
					  
					  if(errorNya.length > 0){
						return false;
					  }else{ 
					  var replaceNumber = data.replace(".", "");
					  var countNumber 	= Math.floor(replaceNumber);
					  
					  return countNumber;
					  } 
			  }
			  else
			  {
					  var replaceNumber = data.replace(".", "");
					  var countNumber 	= Math.floor(replaceNumber);
					  
					  return countNumber;
			  } 		  
		  },
		  
		isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
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
		//	console.log(this.calculateFractionWithNumber(this.dataFix2,90011));   
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
