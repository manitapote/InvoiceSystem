$(document).ready(function(){
	var i=1,
	total=0,
	arr=[],
	fname,lname,date,qnt,ct_id;
	function cstmr_prdt_id(prdId,qnty)
	{	
		this.prdId=prdId;
		this.qnty=qnty;
	}
		
	function customerDetail(customerID,FName, LName, Date, totalpay, arr)
	{
		this.customerID=customerID;
		this.FName=FName;
		this.LName=LName;
		this.Date=Date;
		this.totalpay=totalpay;
		this.arr=arr;
	}
		
	$('input[name=lastname]').keydown(function(event){
		var fvalue=$('input[name=firstname]').val();
		var lvalue=$('input[name=lastname]').val();
		if(fvalue){
			if((lvalue) && (event.which==9))
			{
				fname=fvalue;
				lname=lvalue;
			}	
		}
	});
	
	$("#product_details").append("<tr><td>"+
	String(i)+"</td>"+
	"<td class='pdId'>"+'<input type="text" name="productId" placeholder="Enter Product ID">'+"</td>"+
	'<td class="product_name"></td>'+ 
	'<td class="price"></td>'+
	'<td class="pdQty"><input type="text" name="quantity" placeholder="Enter Quantity"></td>'+
	'<td class="discount"></td>');

	$('table').on('keydown','input[name=productId]',function(event){
		var value=$('input[name=productId]').val();
		if((value)&& (event.which==9))
		{
			var product= JSON.parse(localStorage.getItem(value));
			$("#product_details tr:last .product_name").html("<p>"+product.productName+"</p>");
			$("#product_details tr:last .price").html("<p>"+product.price+"</p>");
			$("#product_details tr:last .discount").html("<p>"+product.discount+"</p>");
		}
	});

	$(document).on('keydown','input[name=quantity]',function(event){
			if(($('input[name=productId]').val())&&(event.which==9)){
				i=i+1;
				var qq=Number($("#product_details tr:last .pdQty input[name=quantity]").val());
				var ret=$("#product_details tr:last .pdId input[name=productId]").val();
				var inputs=$("#form1 :input");
				$("#product_details tr:last .pdId").html($('input[name=productId]').val());
				$("#product_details tr:last .pdQty").html($('input[name=quantity]').val());
				$("#product_details tr:last").after("<tr><td>"+
				String(i)+"</td>"+
				"<td class='pdId'>"+'<input type="text" name="productId" placeholder="Enter Product ID">'+"</td>"+
				'<td class="product_name"></td>'+ 
				'<td class="price"></td>'+
				'<td class="pdQty"><input type="text" name="quantity" placeholder="Enter Quantity"></td>'+
				'<td class="discount"></td>');
				var product_ret=JSON.parse(localStorage.getItem(ret));
				var sum=Number(product_ret.price) *qq;
				ttotal=sum-Number(product_ret.discount)/100*sum +total;
				total=(ttotal-0.01*ttotal);
				console.log(total);
				qnt=String(qq);
				var cst= new cstmr_prdt_id( inputs[6].value, inputs[7].value);
				arr.push(cst);
		}
	});
		
	$('#ok').click( function()
	{	
		ct_id=Math.random().toString(36).slice(2);
		var d= new Date();
		var customer= new customerDetail(ct_id,fname,lname, d.toDateString(),String(total.toFixed()), arr);
		localStorage.setItem(customer.customerID,JSON.stringify(customer));
		$(this).prop('value','Saved');
		$(this).css('background-color','black');
		console.log(customer);
	});
	
	$('#reset').click(function()
	{
		$('#form1').remove();
		var d= new Date();
		//$('#container').css('display','block');
		$('#container').append('<p class="bill_style">First Name: '+fname+'</p>');
		$('#container').append('<p class="bill_style">Last Name: '+lname+'</p>');
		$('#container').append('<p class="bill_style">Date: '+d.toDateString()+'</p>');
		$('#container').append('<table id="table_id" ><tr><th>SN</th><th>ProductID</th><th>Product Name</th><th>Price</th><th>Quantity</th><th>Discount%</th></tr></table>');		
		for(var j=0;j<arr.length;j++)
		{	
			var id=arr[j];
			console.log(id);
			var product=JSON.parse(localStorage.getItem(id.prdId));
			console.log(product.productName);
			$('#table_id tr:last').after('<tr><td>'+j+1+'</td><td>'+id.prdId+'</td><td>'+
			product.productName+'</td><td>'+product.price+'</td><td>'+id.qnty+'</td><td>'+product.discount+'</td></tr>');
		}
		var tt=JSON.parse(localStorage.getItem(ct_id));
		console.log(tt);
		var temp=Number(tt.totalpay)+0.01*Number(tt.totalpay)
		$('#container').append('<p class="bill_p">Total Amount in Nrs. '+temp.toFixed(2)+'</p>');
		$('#container').append('<p class="fitalic">Inculuding 1% Tax </p>');
		var ttmp=Number(tt.totalpay);
		$('#container').append('<p class="bill_p">Total amount to be paid in Nrs. '+ttmp.toFixed(2)+' only.</p>');
		$('#container').append('<p class="bill_p">Thank You! Visit Again!</p>');
	});
})
	
	

	





//{"productId":"ID1","productName":"Orange Juice",
//"price":"100","discount":"1"}