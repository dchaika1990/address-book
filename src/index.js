import {checkAttribute} from './js/hooks';
import checkInputs from "./js/checkInputs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.scss";

const form = document.querySelector('form');
const tableWrap = document.querySelector('.table tbody');
let books = [];

!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));

const editItem = (index) => {
	console.log(index)
}

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
	if (books.length) {
		books.forEach((book, index) => {
			tableWrap.innerHTML += createTemplate(book, index);
		})
	}
}

const createTemplate = ({phone, name, email, address}, index) =>{
	return `
		<tr data-index="${index}">
			<td>${phone}</td>
			<td>${name}</td>
			<td>${email}</td>
			<td>${address}</td>
			<td>
				<span class="btn-group" role="group">
					<button data-btn-edit type="button" class="btn btn-primary">Edit</button>
					<button data-btn-delete type="button" class="btn btn-danger">Delete</button>
				</span>
			</td>
		</tr>
	`
}

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
		console.log(elem.closest('tr').getAttribute('data-index'))
	}
	if (checkAttribute(elem, 'data-btn-delete')) {
		index = elem.closest('tr').getAttribute('data-index');
		books.splice(index, 1);
		updateLocal();
		fillHTML();
	}
})