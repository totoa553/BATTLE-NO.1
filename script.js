var array = [
	[43,45,66,53,62,61,51,47,57,58,61,49,50],//普通譜面
	[47,59,74,57,69,73,53,50,62,88,68,59,72],//玄人譜面
	[64,67,81,73,75,80,66,83,75,97,77,64,80]//達人譜面
]

var Json;

var template_panel,template_normal,template_expert,template_master
async function load(){
	const response = await fetch("data.json"); 
  Json = await response.json(); 
	document.getElementById("loading").classList.add("hidden");
	document.getElementById("main").classList.remove("hidden");
	template_panel = document.getElementById('panel');
	template_normal = document.getElementById('normal');
	template_expert = document.getElementById('expert');
	template_master = document.getElementById('master');
	start();
  console.log(Json);
}
load();

function start(){
	document.querySelector("#input").addEventListener("keydown",e=>{
		if(e.key=="Enter"){
			process();
		}
	})

	document.querySelector("#button").addEventListener("click",e=>{
		process();
	})
}
var a=0
var	b=0
function process(){
	var filtered_array=Json.flatMap((a,b)=>(a === parseInt(document.querySelector("#input").value)-3 ? b : []))
	console.log(filtered_array)
	document.querySelector("#panel-container").classList.add("hidden");
	document.querySelector("#panel-container").innerHTML="";
	document.querySelector("#loading2").classList.remove("hidden");
	if(filtered_array.length!=0){
		for(i=0;i<=filtered_array.length-1;i++){
			var tempStr= filtered_array[i].toString(3)
			console.log(( '0000000000000' + tempStr ).slice( -13 ))
			let clone = template_panel.content.cloneNode(true);
			for(a of ( '0000000000000' + tempStr ).slice( -13 )){
				if(a=="0"){
					clone.children[0].append(template_normal.content.cloneNode(true))
				}else if(a=="1"){
					clone.children[0].append(template_expert.content.cloneNode(true))
				}else if(a=="2"){
					clone.children[0].append(template_master.content.cloneNode(true))
				}
			}
			document.querySelector("#panel-container").appendChild(clone)
		}
	}
	document.querySelector("#loading2").classList.add("hidden");
	document.querySelector("#panel-container").classList.remove("hidden");
	console.log(a,b)
	setTimeout(() => {
		a=screen.width
		if(b==0){
			b=document.querySelector("#panel-container").getClientRects()[0].width
		}
	  if(a<b){
			document.querySelector("#panel-container").style.transform=`scale(${a/b})`
			document.querySelector("#panel-container").style.height = document.querySelector("#panel-container").firstElementChild.clientHeight*(a/b)+"px";
		}
	}, 1)
	
}

/* コンボ数を取得するために3^13回動かされる */
/*
for(a=0;a<=2;a++){
	for(b=0;b<=2;b++){
		for(c=0;c<=2;c++){
			for(d=0;d<=2;d++){
				for(e=0;e<=2;e++){
					for(f=0;f<=2;f++){
						for(g=0;g<=2;g++){
							for(h=0;h<=2;h++){
								for(i=0;i<=2;i++){
									for(j=0;j<=2;j++){
										for(k=0;k<=2;k++){
											for(l=0;l<=2;l++){
												for(m=0;m<=2;m++){
													arrayy.push(array[a][0]+array[b][1]+array[c][2]+array[d][3]+array[e][4]+array[f][5]+array[g][6]+array[h][7]+array[i][8]+array[j][9]+array[k][10]+array[l][11]+array[m][12])
													console.log("a")
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
*/