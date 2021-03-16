const checkInputs = (form) => {
    const inputs = form.querySelectorAll('input');
    const buttonSubmit = form.querySelector('button')
    let valid = {};

    function checkValid() {
        console.log(Object.values(valid).includes(false))
        return ( !Object.values(valid).includes(false) && Object.keys(valid).length > 0)
            ? buttonSubmit.disabled = false
            : buttonSubmit.disabled = true;
    }

    inputs.forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            let type = input.getAttribute('data-input');
            input.value < 2 ? valid[type] = false : valid[type] = true
            if (type === 'email' ) {
                valid[type] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            }
            checkValid();
        })
    })
    checkValid();
}

export default checkInputs;