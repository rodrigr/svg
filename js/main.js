let mobile = innerWidth < 720
homeScreen(mobile)

window.addEventListener("resize",() => {

	mobile = innerWidth < 720 

	homeScreen(mobile)
})



function homeScreen(isMobile){
	let wrapper = document.getElementById("test")
	wrapper.innerHTML = ""
	let width = wrapper.offsetWidth
	let height = wrapper.offsetHeight

	//SVG

	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')		
	svg.setAttribute("width", width)
	svg.setAttribute("height", height)

	//HTML Card

	let html = new Card(
		"html",
		isMobile ? [[0,0],[0,height * 1/2],[width,0],[width,0]] : [[0,0],[0,height],[0,height],[width * 1/2,0]],
		"img/html.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 1/6 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 1/6 - (height * (isMobile ? 1/3 : 1/3))/2
		)


	//CSS Card

	let css = new Card(
		"css",
		isMobile ? [[0,height * 1/2],[width,0],[width,height * 1/2],[0,height]] : [[width * 1/2,0],[0,height],[width * 1/2,height],[width,0]],
		"img/css.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 1/2 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 1/2 - (height * (isMobile ? 1/3 : 1/2))/2
		)

	//JS Card

	let js = new Card(
		"js",
		isMobile ? [[0,height],[0,height],[width,height * 1/2],[width,height]] : [[width,0],[width,0],[width * 1/2,height],[width,height]],
		"img/js.svg",
		isMobile ? width * 1/3 : width * 1/4,
		isMobile ? height * 1/3 : height * 1/2,
		width * 5/6 - (width * (isMobile ? 1/3 : 1/4))/2,
		height * 5/6 - (height * (isMobile ? 1/3 : 7/10))/2
		)

	//DOM Insertion

	svg.appendChild(html.group)
	svg.appendChild(css.group)
	svg.appendChild(js.group)

	wrapper.appendChild(svg)

	//Event Handling

	html.group.addEventListener('mouseover',htmlGrow)
	html.group.addEventListener('mouseout',htmlShrink)
	html.group.addEventListener('click',htmlExpand)

	css.group.addEventListener('mouseover',cssGrow)
	css.group.addEventListener('mouseout',cssShrink)
	css.group.addEventListener('click',cssExpand)	

	js.group.addEventListener('mouseover',jsGrow)
	js.group.addEventListener('mouseout',jsShrink)
	js.group.addEventListener('click',jsExpand)

	function removeListeners(){
		html.group.removeEventListener('mouseover',htmlGrow)
		html.group.removeEventListener('mouseout',htmlShrink)
		html.group.removeEventListener('click',htmlExpand)

		css.group.removeEventListener('mouseover',cssGrow)
		css.group.removeEventListener('mouseout',cssShrink)
		css.group.removeEventListener('click',cssExpand)	

		js.group.removeEventListener('mouseover',jsGrow)
		js.group.removeEventListener('mouseout',jsShrink)
		js.group.removeEventListener('click',jsExpand)
	}

	function htmlGrow(){
		clearInterval(interval)
		html.reset('img')
		css.reset('img')
		js.reset('img')
		html.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {1:{1:{fraction: 1/2,counter: 1}}, 2:{1:{fraction: 0,counter: 1}}} : {2:{0:{fraction: 0,counter: 1}}, 3:{0:{fraction: 1/2,counter: 1}}},
			'left-top')
	}

	function htmlShrink(){
		clearInterval(interval)
		html.resize(
			"shrink",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {1:{1:{fraction: 2/3,counter: -1}}, 2:{1:{fraction: 1/6,counter: -1}}} : {2:{0:{fraction: 1/6,counter: -1}}, 3:{0:{fraction: 2/3,counter: -1}}},
			"left-top")
	}
	
	function htmlExpand(){
		clearInterval(interval)
		expandHTML(html,
			css,
			js,
			width,
			height,
			isMobile,
			svg
			)
		removeListeners()
	}

	function cssGrow(){
		clearInterval(interval)
		html.reset('img')
		css.reset('img')
		js.reset('img')
		css.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/2,
			(isMobile ? height : width) * 2/3,
			isMobile ? {0:{1:{fraction: 1/2,counter: -1}}, 2:{1:{fraction: 1/2,counter: 1}}} : {0:{0:{fraction: 1/2,counter: -1}}, 2:{0:{fraction: 1/2,counter: 1}}},
			'center')
	}	

	function cssShrink(){
		clearInterval(interval)
		css.resize(
			"shrink",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) *  1/2,
			isMobile ? {0:{1:{fraction: 1/3,counter: 1}}, 2:{1:{fraction: 4/6,counter: -1}}} : {0:{0:{fraction: 1/3,counter: 1}}, 2:{0:{fraction: 2/3,counter: -1}}},
			'center')
	}

	function cssExpand(){
		clearInterval(interval)
		expandCSS(html,
			css,
			js,
			width,
			height,
			isMobile,
			svg
			)
		removeListeners()
	}

	

	function jsGrow(){
		clearInterval(interval)
		html.reset('img')
		css.reset('img')
		js.reset('img')
		js.resize(
			"grow",
			svg,
			isMobile ? height: width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) * 1/2,
			isMobile ? {1:{1:{fraction: 1,counter: -1}}, 2:{1:{fraction: 1/2,counter: -1}}} : {1:{0:{fraction: 1,counter: -1}}, 2:{0:{fraction: 1/2,counter: -1}}},
			'right-bottom')
	}

	

	function jsShrink(){
		clearInterval(interval)
		js.resize(
			'shrink',
			svg,
			isMobile ? height : width,
			2,
			(isMobile ? height : width) * 1/3,
			(isMobile ? height : width) *  1/2,
			isMobile ? {1:{1:{fraction: 5/6,counter: 1}}, 2:{1:{fraction: 1/3,counter: 1}}} : {1:{0:{fraction: 5/6,counter: 1}}, 2:{0:{fraction: 1/3,counter: 1}}},
			'right-bottom')
	}

	

	function jsExpand(){
		clearInterval(interval)
		expandJS(html,
			css,
			js,
			width,
			height,
			isMobile,
			svg
			)
		removeListeners()
	}

}

function expandHTML(html,css,js,width,height,isMobile,svg){
	interval = setInterval(frame,5)
	let counter = 0

	svg.removeChild(html.group)
	svg.appendChild(html.group)

	function frame(){
		
		if( (isMobile ? height : width) * 1/6 + counter  <= (isMobile ? height : width) ){
			counter+= 5

			html.polygon.setAttribute("points",isMobile ? 
				`0,0 0,${height * 2/3 + counter} ${width},${height * 1/6 + counter} ${width},0`:
				`0,0 0,${height} ${(width * 1/6) + counter},${height} ${(width * 2/3) + counter},0`)
			
		}else{
			clearInterval(interval)
		}
	}
}

function expandCSS(html,css,js,width,height,isMobile,svg){
	interval = setInterval(frame,5)
	let counter = 0

	svg.removeChild(css.group)
	svg.appendChild(css.group)

	function frame(){
		
		if( (isMobile ? height : width) * 4/6 + counter  <= (isMobile ? height : width) ){
			counter+= 5

			css.polygon.setAttribute("points",isMobile ? 
				`0,${height * 1/3 - counter} ${width},0 ${width},${height * 4/6 + counter} 0,${height}` :
				`${width * 1/3 - counter},0 0,${height} ${width * 4/6 + counter},${height} ${width},0`)
			
		}else{
			clearInterval(interval)
		}
	}
}

function expandJS(html,css,js,width,height,isMobile,svg){
	interval = setInterval(frame,5)
	let counter = 0

	svg.removeChild(js.group)
	svg.appendChild(js.group)

	function frame(){
		
		if( (isMobile ? height : width) * 5/6 - counter  >= 0 ){
			counter+= 5

			js.polygon.setAttribute("points",isMobile ? 
				`0,${height} 0,${height * 5/6 - counter} ${width},${height * 1/3 - counter} ${width},${height}`:
				`${width},0 ${width * 5/6 - counter},0 ${width * 1/3 - counter},${height} ${width},${height}`);
			
		}else{
			clearInterval(interval)
		}
	}
}