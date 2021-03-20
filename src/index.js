import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.scss";
import app from "./js/app";

// App init
document.addEventListener('DOMContentLoaded', () =>{
	app.init({
		formSelector: '.add-info',
		wrapSelector: '.table tbody',
		selectMessage: '.message'
	});
})