// Ref: 
const ctrlSize = document.querySelector('#size')
const ctrlposX = document.querySelector('#posX')
const ctrlposY = document.querySelector('#posY')
const rBtns = [...document.querySelectorAll(`input[type='radio']`)]
const gridItems = [...document.querySelectorAll('.grid__item')]
const inputs = [ctrlSize, ctrlposX, ctrlposY]

const gridSize = 6

let checked
let currItem
let size
let props

const getValues = (x) => {
	x.props = {
		size: parseInt(getComputedStyle(x).getPropertyValue('--size')),
		posX: parseInt(getComputedStyle(x).getPropertyValue('--posX')),
		posY: parseInt(getComputedStyle(x).getPropertyValue('--posY'))
	}
}

// Find currently selected item
const findCurrItem = () => {
	rBtns.forEach((el) => {
		if (el.checked) {
			currItem = document.querySelector(`[data-id=${el.value}]`)
		}
	})
	console.log(currItem)
}

// Set sliders to correct positions
rBtns.forEach((el, index) => {
	el.addEventListener('click', () => {
		findCurrItem() // find the currently selected item
		getValues(currItem) //get the current properties of the item
		let currItemProperties = Object.values(currItem.props) // create an array from props
		inputs.forEach((el, index) => {
			el.value = currItemProperties[index] // set the sliders to the corresponding values
		})
	})
})

ctrlSize.addEventListener('change', (e) => {
	findCurrItem()
	getValues(currItem)
	size = parseInt(e.target.value)
	let currPos = currItem.props.posX > currItem.props.posY ? currItem.props.posX : currItem.props.posY
	if (size < gridSize - (currPos - 1)) {
		size = size
		console.log("ctrSize = " + size)
	} else {
		size = gridSize - (currPos - 1)
	}
	currItem.style.setProperty('--size', size)
})

const calcNewProps = (el, str) => {
	let currSize = currItem.props.size
	console.log(currSize)
	if (posX < gridSize - (currSize - 1)) {
		posX = posX
	} else {
		posX = gridSize - (currSize - 1)
	}
	currItem.style.setProperty(str, el)
}

ctrlposX.addEventListener('change', (e) => {
	findCurrItem()
	getValues(currItem)
	posX = parseInt(e.target.value)
	calcNewProps(posX, '--posX')
})

ctrlposY.addEventListener('change', (e) => {
	findCurrItem()
	getValues(currItem)
	posY = parseInt(e.target.value)
	calcNewProps(posY, '--posY')
})