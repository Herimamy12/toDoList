
main ()

/**
 * principal function
 * @returns {null}
*/
function main () {

	/* Add new li and new input */
	const form = document.querySelector('form')
	const add = document.querySelector('.btn.btn-primary')
	add.addEventListener('click', (event) => {
		addNew(form, event)
	})

	/* Change button to toDo list */
	const allButton = document.querySelector('[data-filter="all"]')
	const toDoButton = document.querySelector('[data-filter="todo"]')
	const doneButton = document.querySelector('[data-filter="done"]')
	allButton.addEventListener('click', (event) => {
		allList(allButton)
	})
	toDoButton.addEventListener('click', (event) => {
		toDoList(toDoButton)
	})
	doneButton.addEventListener('click', (event) => {
		doneList(doneButton)
	})

	/* Delete button */
	const trashs = document.querySelectorAll('li')
	trashs.forEach((trash) => {
		trash.children[2].firstElementChild.addEventListener('click', (event) => {
			trash.remove()
		})
	})
	return (null)
}

// 
// 
/* All function for added new li and new input in the window */
// 

/**
 * function for new input form
 * @param {HTMLElement} form 
 * @returns {null}
 */
function changeInput(form) {
	const oldInput = document.querySelector('.form-control')

	const newInput = document.createElement('input')
	newInput.required = '""', newInput.className = 'form-control'
	newInput.type = 'text', newInput.name = 'title'
	newInput.placeholder = 'Acheter des patates...'

	const button = document.querySelector('.btn.btn-primary')
	
	oldInput.remove()
	form.append(newInput)
	form.append(button)

	return (null)
}

/**
 * function for button "ajouter" clicked
 * @param {HTMLElement} form 
 * @param {PointerEvent} event 
 * @returns {null}
 */
function addNew(form, event) {
	const data = new FormData(form)
	const content = data.get('title')

	event.preventDefault()
	if (content.length > 1) {
		addToDoList(content)
		changeInput(form)
	}

	return (null)
}

/**
 * function for add li in document
 * @param {string} content 
 * @returns {null}
 */
function addToDoList(content){
	const UL = document.querySelector('ul')

	const newLi = document.createElement('li')
	newLi.className = 'todo list-group-item d-flex align-items-center'

	const newInput = document.createElement('input')
	newInput.className = 'form-check-input', newInput.type = 'checkbox'

	const newLabel1 = document.createElement('label')
	newLabel1.className = 'ms-2 form-check-label', newLabel1.innerText = content

	const newLabel2 = document.createElement('label')
	newLabel2.className = 'ms-auto btn btn-danger btn-sm'

	const trash = document.createElement('i')
	trash.className = 'bi-trash'

	UL.append(newLi)
	newLi.append(newInput)
	newLi.append(newLabel1)
	newLabel2.append(trash)
	newLi.append(newLabel2)

	return (null)
}

// 
// 
/* All function for passed in the three button all, done and to do */
// 

/**
 * function for disable all button before to change one
 * @param {HTMLElement} button 
 * @returns {null}
 */
function disableAllbutton(button) {
	const allButton = document.querySelectorAll('.btn.btn-outline-primary')

	allButton.forEach((button) => {
		button.className = 'btn btn-outline-primary'
	})

	button.className = 'btn btn-outline-primary active'

	return (null)
}

/**
 * functon for listed all event
 * @param {HTMLElement} allButton 
 * @returns {null}
 */
function allList(allButton) {
	disableAllbutton(allButton)

	const allLi = document.querySelectorAll('li')

	allLi.forEach((li) => {
		li.className = 'todo list-group-item d-flex align-items-center'
	})

	return (null)
}

/**
 * functon for listed event to do
 * @param {HTMLElement} toDoButton 
 * @returns {null}
 */
function toDoList(toDoButton) {
	disableAllbutton(toDoButton)

	const allLi = document.querySelectorAll('li')

	allLi.forEach((li) => {
		if (li.firstElementChild.checked) {
			li.className = 'hidden'
			li.style.display = 'none'
		}
		else
			li.className = 'todo list-group-item d-flex align-items-center'
	})

	return (null)
}

/**
 * functon for listed event done
 * @param {HTMLElement} doneButton 
 * @returns {null}
 */
function doneList(doneButton) {
	disableAllbutton(doneButton)

	const allLi = document.querySelectorAll('li')

	allLi.forEach((li) => {
		if (li.firstElementChild.checked)
			li.className = 'todo list-group-item d-flex align-items-center'
		else {
			li.className = 'hidden'
			li.style.display = 'none'
		}
	})

	return (null)
}
