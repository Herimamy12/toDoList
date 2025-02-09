import { readFile, writeFile } from "node:fs/promises"
import { NotFoundError } from "./errors.js"

const path = 'storage/todos.json'

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @return {Promise<Todo[]>}
 */
export async function findeTodos ( ) {
	const data = await readFile(path, 'utf8')
	return JSON.parse(data)
}

/**
 * 
 * @param {string} title 
 * @param {boolean} completed 
 * @return {Promise<Todo>} 
 */
export async function createTodo ( {title, completed = false} ) {
	let todos = await findeTodos()
	const todo = {id: todos.length + 1, title, completed}
	todos = [todo, ...todos]
	await writeFile(path, JSON.stringify(todos, null, 2))
	return (todo)
}

/**
 * 
 * @param {number} id 
 * @return {Promise} 
 */
export async function removeTodo ( id ) {
	const todos = await findeTodos()
	const todo = todos.findIndex(todo => todo.id === id)
	if (todo === -1) {
		throw new NotFoundError
	}
	await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id), null, 2))
}

/**
 * 
 * @param {number} id 
 * @param {{title?:string, completed?:boolean}} change 
 * @return {Promise<Todo>} 
 */
export async function updateTodo ( id, change ) {
	let todos = await findeTodos()
	let old = todos.find(todo => todo.id === id)
	if (old === undefined) {
		throw new NotFoundError()
	}
	Object.assign(old, change)
	await writeFile(path, JSON.stringify(todos, null, 2))
	return (old)
}
