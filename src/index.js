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
	function iteration(arr) {
		arr.forEach((book, index) => {
			tableWrap.innerHTML += createTemplate(book, index);
		})
	}
	searchBooks.length ? iteration(searchBooks) : books.length ? iteration(books) : null
}

const createTemplate = ({phone, name, email, address}, index) =>{
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

const searchBook = (arr, input) => {
	const searchInput = document.querySelector(input);
	searchInput.addEventListener('keyup', function (e){
		let searchVal = e.target.value;
		let findBooks = [];
		if (searchVal.length > 0) {
            findBooks = arr.filter(book => Object.values(book).some( value => value.toLowerCase().indexOf(searchVal) > -1 ))
            findBooks.length ? searchBooks = findBooks : null;
		} else {
			searchBooks = [];
		}
		fillHTML();
	})
}

searchBook(books, '[data-search]');
fillHTML();
checkInputs(form);

form.addEventListener('submit', function (e) {
	e.preventDefault();
	addNewBook(this.querySelectorAll('input'));
	updateLocal();
	fillHTML();
	checkInputs(form);
})

document.addEventListener( 'click' ,event => {
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