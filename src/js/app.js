import {checkAttribute, sortCol, rewriteArray, displayRows} from './helpers';
import renderTableContent from "./renderTableContent";
import validation from "./validation";

//App init
const app = {};

//Create method
app.init = function ({formSelector, wrapSelector, selectMessage}) {
	const form = document.querySelector(formSelector);
	const tableWrap = document.querySelector(wrapSelector);
	const message = document.querySelector(selectMessage)
	let flagSort = true
	let books = [];

	//Create actions
	const actions = {
		edit(elem){
			const index = elem.closest('tr').getAttribute('data-index');
			const elementsToEdit = elem.closest('tr').querySelectorAll('[data-edit]');
			let newBook = {};
			if (elem.getAttribute('data-btn-edit') === 'false') {
				elem.textContent = 'Save';
				elem.dataset.btnEdit = 'true';
				elementsToEdit.forEach(elem => {
					elem.contentEditable = 'true'
				})
			} else {
				elem.textContent = 'Edit';
				elem.dataset.btnEdit = 'false';
				elementsToEdit.forEach(elem => {
					elem.contentEditable = 'false';
					newBook[elem.dataset.edit] = elem.textContent;
				})
				books = rewriteArray(books, newBook, index);
				actions.sendMessage('This item was changed in the address book');
				actions.render();
			}
		},
		delete(elem){
			const index = elem.closest('tr').getAttribute('data-index');
			books.splice(index, 1);
			actions.sendMessage('This item was delete from the address book');
			actions.render();
		},
		sort(elem) {
			const key = elem.getAttribute('data-key');
			flagSort = !flagSort;
			sortCol(books, key, flagSort)
			actions.render();
		},
		search(input){
			const rows = tableWrap.querySelectorAll('tr');
			const searchInput = document.querySelector(input);
			let searchVal = searchInput.value.toLowerCase();

			if (searchVal.length > 0) displayRows(searchInput, rows);
			searchInput.addEventListener('keyup', () => displayRows(searchInput, rows))
		},
		addNewBook(inputs){
			const book = {};
			inputs.forEach(item => {
				const itemType = item.getAttribute('data-input');
				book[itemType] = item.value;
				item.value = '';
			})
			books.push(book);
		},
		checkLocal(){
			!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));
		},
		updateLocal(){
			localStorage.setItem('books', JSON.stringify(books))
		},
		sendMessage(text, time = 5000){
			message.innerHTML = text;
			message.classList.add('active')
			setTimeout(() => message.classList.remove('active'), time);
		},
		submit(e){
			e.preventDefault();
			actions.addNewBook(this.querySelectorAll('input'));
			actions.sendMessage('New item added to the address book');
			actions.render();
		},
		render(){
			validation(form);
			actions.updateLocal();
			renderTableContent(tableWrap, books);
			actions.search('[data-search]');
		}
	}

	//Create listeners
	const listeners = event => {
		const elem = event.target;
		if (checkAttribute(elem, 'data-btn-edit')) actions.edit(elem);
		if (checkAttribute(elem, 'data-btn-delete')) actions.delete(elem);
		if (checkAttribute(elem, 'data-key')) actions.sort(elem);
	}

	//Call listeners
	document.addEventListener('click', listeners);

	//Create new book
	form.addEventListener('submit', actions.submit)

	//Check localStorage
	actions.checkLocal();

	//Render app
	actions.render();
}

export default app;