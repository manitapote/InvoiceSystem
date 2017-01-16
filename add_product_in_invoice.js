$(document).ready(function(){
	function product(productId, productName, price, discount){
		this.productId=productId;
		this.productName=productName;
		this.price=price;
		this.discount=discount;
	}
	var pr= new product("ID5", "noodles", "10","0");
	localStorage.setItem(pr.productId, JSON.stringify(pr));
	var retrieve=JSON.parse(localStorage.getItem(pr.productId));
	console.log(retrieve.productId);
	console.log(retrieve.productName);
	console.log(retrieve.price);
	console.log(retrieve.discount);



})