const renderTableContent = (tableWrap, books) => {
	tableWrap.innerHTML = '';

	const _createTemplate = ({phone, name, email, address}, index) => {
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

	if (!books.length) {
		tableWrap.innerHTML = `
			<tr class="text-center">
				 <td colspan="5">
					  Your Address Book Empty. Please Add Something :)       
				  </td>
       		</tr>
		`;
	}

	books.forEach((book, index) => {
		tableWrap.innerHTML += _createTemplate(book, index);
	})
}

export default renderTableContent;