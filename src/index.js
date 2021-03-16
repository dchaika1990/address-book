
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
					<button onclick="editItem(${index})" type="button" class="btn btn-primary">Edit</button>
					<button data-index="${index}" type="button" class="btn btn-danger">Delete</button>
				</span>
			</td>
		</tr>
	`
}

fillHTML();

form.addEventListener('submit', function (e) {
	e.preventDefault();
	addNewBook(this.querySelectorAll('input'));
	updateLocal();
	fillHTML();
})

const deleteItem = (index) => {
	console.log(index)
	// books.splice(index, 1);
	// updateLocal();
	// fillHTML();
}