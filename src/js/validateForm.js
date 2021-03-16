const validateForm = (form) => {
    form.noValidate = true;
    const inputs = form.querySelectorAll('input');
    const buttonSubmit = form.querySelector('button')
    let valid = {};

    function checkValid() {
        return ( !Object.values(valid).includes(false))
            ? buttonSubmit.disabled = false
            : buttonSubmit.disabled = true;
    }

    inputs.forEach(input => {
        let type = input.getAttribute('type');
        valid[type] = false;
        if (type === 'email' ) {
            valid[name] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        } else {
            input.value < 2 ? valid[name] = false : valid[name] = true
        }
        checkValid();
    })

    checkValid();
    console.log(valid)
}

export default validateForm;