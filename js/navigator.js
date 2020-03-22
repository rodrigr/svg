let sidebar = document.getElementById("sidebar")
let links = document.querySelectorAll('#menu span')
let icon = document.getElementById("mindhub-icon")
let logo = document.getElementById("mindhub-logo")
let menuIcon = document.createElement('DIV')
menuIcon.id = "menu-icon"
let overlay = document.createElement("DIV")
overlay.classList.add('overlay','hide')

function navigate(isMobile){
	
	let sidebarWidth = sidebar.offsetWidth
	let interval
	
	
	removeListeners("all")
	removeMobileListeners()

	if(!isMobile){
		addListeners("mouseenter")
		if(document.querySelector('.showNavbar')){
			document.querySelector('.showNavbar').classList.remove('.showNavbar')
		}
		if(document.querySelector('#menu-icon')){
			document.querySelector('body').removeChild(menuIcon)
		}
		if(document.querySelector('.overlay')){
			document.querySelector('body').removeChild(overlay)
		}
	}else{
		addMobileListeners()
		if(!document.querySelector('#menu-icon')){
			document.querySelector('body').appendChild(menuIcon)
		}
		if(!document.querySelector('.overlay')){
			document.querySelector('body').appendChild(overlay)
		}

	}
	

	function expandSidebar(){
		clearInterval(interval)
		interval = setInterval(frame,20)
		let counter = 0
		
		icon.classList.add("hide")
		logo.classList.remove("hide")
		function frame(){
			counter ++
			if(sidebar.offsetWidth + counter < window.innerWidth / 5){
				sidebar.style.width = (sidebar.offsetWidth + counter) + 'px'
			}else{
				clearInterval(interval)
				links.forEach(e => e.classList.remove('hide'))
				removeListeners("mouseenter")
				addListeners("mouseleave")
			}
		}
	}

	function shrinkSidebar(){
		clearInterval(interval)
		interval = setInterval(frame,20)
		let counter = 0
		links.forEach(e => e.classList.add('hide'))
		
		
		function frame(){
			counter ++
			if(sidebar.offsetWidth - counter >= sidebarWidth){
				sidebar.style.width = (sidebar.offsetWidth - counter) + 'px'
			}else{
				logo.classList.add("hide")
				icon.classList.remove("hide")
				clearInterval(interval)
				removeListeners("mouseleave")
				addListeners("mouseenter")
			}
			

		}
	}

	function showNavbar(){
		menuIcon.classList.add('hide')
		sidebar.classList.add('showNavbar')
		overlay.classList.remove('hide')
	}

	function hideNavbar(){
		menuIcon.classList.remove('hide')
		sidebar.classList.remove('showNavbar')
		overlay.classList.add('hide')
	}

	function addListeners(type){
		if(type == "mouseenter"){
			sidebar.addEventListener("mouseenter",expandSidebar)
		} else if( type == "mouseleave"){
			sidebar.addEventListener("mouseleave",shrinkSidebar)
		} else if(type == "all"){
			sidebar.addEventListener("mouseenter",expandSidebar)
			sidebar.addEventListener("mouseleave",shrinkSidebar)
		}
	}

	function removeListeners(type){
		if(type == "mouseenter"){
			sidebar.removeEventListener("mouseenter",expandSidebar)
		} else if( type == "mouseleave"){
			sidebar.removeEventListener("mouseleave",shrinkSidebar)
		} else if(type == "all"){
			sidebar.removeEventListener("mouseenter",expandSidebar)
			sidebar.removeEventListener("mouseleave",shrinkSidebar)
		}
	}

	function addMobileListeners(type){
		menuIcon.addEventListener('click',showNavbar)
		overlay.addEventListener('click',hideNavbar)
	}

	function removeMobileListeners(type){
		menuIcon.removeEventListener('click',showNavbar)
		overlay.removeEventListener('click',hideNavbar)
	}
}



