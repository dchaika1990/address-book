import {checkAttribute, sortCol, rewriteArray} from './js/helpers';
import checkInputs from "./js/checkInputs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.scss";

const form = document.querySelector('form');
const tableWrap = document.querySelector('.table tbody');
let flagSort = true
let books = [];
let searchBooks = '';

!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));

const addNewBook = (inputs) => {
	const book = {};
	inputs.forEach(item => {
		const itemType = item.getAttribute('data-input');
		book[itemType] = item.value;
		item.value = '';
	})
	books.push(book);
}

const updateLocal = () => {
	localStorage.setItem('books', JSON.stringify(books))
}

const fillHTML = () => {
	tableWrap.innerHTML = '';
	books.forEach((book, index) => {
		tableWrap.innerHTML += createTemplate(book, index);
	})
	searchBook('.table tbody tr', '[data-search]');
}

const createTemplate = ({phone, name, email, address}, index) => {
	return `
		<tr data-index="${index}">
			<td data-edit="phone">${phone}</td>
			<td data-edit="name">${name}</td>
			<td data-edit="email">${email}</td>
			<td data-edit="address">${address}</td>
			<td>
				<span class="btn-group" role="group">
					<button data-btn-edit="false" type="button" class="btn btn-primary">Edit</button>
					<button data-btn-delete type="button" class="btn btn-danger">Delete</button>
				</span>
			</td>
		</tr>
	`
}

const searchBook = (rowsTable, input) => {
	const rows = document.querySelectorAll(rowsTable);
	const searchInput = document.querySelector(input);
	let searchVal = searchInput.value.toLowerCase();
	const searchFoo = (input) => {
		let searchValue = input.value;
		rows.forEach( row => {
			[...row.querySelectorAll('[data-edit]')].some( value => value.textContent.toLowerCase().indexOf(searchValue) > -1 )
				? row.style.display = 'table-row'
				: row.style.display = 'none'
		} )
	}
	if (searchVal.length > 0) searchFoo(searchInput);
	searchInput.addEventListener('keyup', function (e) {
		searchFoo(searchInput);
	})
}

checkInputs(form);
fillHTML();

form.addEventListener('submit', function (e) {
	e.preventDefault();
	addNewBook(this.querySelectorAll('input'));
	checkInputs(form);
	updateLocal();
	fillHTML();
})

document.addEventListener('click', event => {
	const elem = event.target;
	let index;
	if (checkAttribute(elem, 'data-btn-edit')) {
		index = elem.closest('tr').getAttribute('data-index');
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
			updateLocal();
			fillHTML();
		}
	}
	if (checkAttribute(elem, 'data-btn-delete')) {
		index = elem.closest('tr').getAttribute('data-index');
		books.splice(index, 1);
		updateLocal();
		fillHTML();
	}
	if (checkAttribute(elem, 'data-key')) {
		const key = elem.getAttribute('data-key');
		flagSort = !flagSort;
		sortCol(books, key, flagSort)
		updateLocal();
		fillHTML();
	}
})