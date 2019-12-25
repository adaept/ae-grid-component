const ctrlSize = document.querySelector('#size')
const ctrlposX = document.querySelector('#posX')
const ctrlposY = document.querySelector('#posY')
const rBtns = [...document.querySelectorAll(`input[type='radio']`)]
const gridItems = [...document.querySelectorAll('.grid__item')]
const inputs = [ctrlSize, ctrlposX, ctrlposY]

const gridSize = 4

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
			currItem = document.querySelector(`[data-id=${el.value}]`),
				console.log("A findCurrItem el.value = " + el.value)
		}
	})
	console.log("B findCurrItem currItem = " + currItem)
}

// Set sliders to correct positions
rBtns.forEach((el, index) => {
	el.addEventListener('click', () => {
		findCurrItem() // Find the currently selected item
		getValues(currItem) // Get the current properties of the item
		let currItemProperties = Object.values(currItem.props) // Create an array from props
		inputs.forEach((el, index) => {
			el.value = currItemProperties[index] // Set the sliders to the corresponding values
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
		console.log("A ctrlSize size = " + size)
	} else {
		size = gridSize - (currPos - 1)
		console.log("B ctrlSize size = " + size)
	}
	currItem.style.setProperty('--size', size)
})

const calcNewProps = (el, str) => {
	let currSize = currItem.props.size
	console.log("calcNewProps currSize = " + currSize)
	if (posX < gridSize - (currSize - 1)) {
		posX = posX
		console.log("A calcNewProps posX = " + posX)
	} else {
		posX = gridSize - (currSize - 1)
		console.log("B calcNewProps posX = " + posX)
	}
	currItem.style.setProperty(str, el)
}

ctrlposX.addEventListener('change', (e) => {
	findCurrItem()
	getValues(currItem)
	posX = parseInt(e.target.value)
	console.log("ctrlposX posX = " + posX)
	calcNewProps(posX, '--posX')
})

ctrlposY.addEventListener('change', (e) => {
	findCurrItem()
	getValues(currItem)
	posY = parseInt(e.target.value)
	console.log("ctrlposY posY = " + posY)
	calcNewProps(posY, '--posY')
})