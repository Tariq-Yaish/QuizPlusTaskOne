const burger = document.querySelector('.menu_burger');
const nav_list = document.querySelector('.navbar ul');

burger.addEventListener('click', () =>
{
    nav_list.classList.toggle('show_menu');
});

const form = document.querySelector('.form_container');
const data = form.querySelectorAll("input[type='text'], input[type='tel'], input[type='email']");

const isValidEmail = (email) =>
{
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
}

const isValidNumber = (number) =>
{
    if (!number.startsWith('+'))
    {
        return false;
    }

    const digitsOnly = number.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

const showError = (item, message) =>
{
    let exitError = item.nextElementSibling;

    if (!exitError || !exitError.classList.contains('error_text'))
    {
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error_text');
        errorSpan.innerText = message;

        item.classList.add('item_error');
        item.after(errorSpan);
    }
}

const clearErrors = (item) =>
{
    item.style.borderBottom = '';

    let exitError = item.nextElementSibling;

    if (exitError?.classList.contains('error_text'))
    {
        exitError.remove();
        item.classList.remove('item_error');
    }
}

data.forEach((item) =>
{
    item.addEventListener('input', () =>
    {
        if (item.classList.contains('item_error'))
        {
            const value = item.value.trim();

            const is_Email_Field = item.getAttribute('type') === 'email' || item.placeholder.toLowerCase().includes('email');
            const is_Phone_Field = item.getAttribute('type') === 'tel' || item.placeholder.toLowerCase().includes('phone');

            if (is_Email_Field)
            {
                if (isValidEmail(value))
                {
                    clearErrors(item);
                }
            }
            else if (is_Phone_Field)
            {
                if (isValidNumber(value))
                {
                    clearErrors(item);
                }
            }
            else
            {
                if (value !== '')
                {
                    clearErrors(item);
                }
            }
        }
    });
});

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    let isValid = true;

    data.forEach((item) =>
    {
        const value = item.value.trim();
        const field_name = item.getAttribute('aria-label') || item.placeholder || 'This';
        const is_Email_Field = item.getAttribute('type') === 'email' || item.placeholder.toLowerCase().includes('email');
        const is_Phone_Field = item.getAttribute('type') === 'tel' || item.placeholder.toLowerCase().includes('phone');

        if (value === '')
        {
            isValid = false;
            showError(item, `${field_name} field cannot be empty.`);
        }
        else if (is_Email_Field && !isValidEmail(value))
        {
            isValid = false;
            showError(item, `Please enter a valid ${field_name} format.`)
        }
        else if (is_Phone_Field && !isValidNumber(value))
        {
            isValid = false;
            showError(item, `Please enter a valid ${field_name} starting with '+' (7-15 digits).`)
        }
        else
        {
            clearErrors(item);
        }
    });

    if (isValid)
    {
        console.log("All fields are valid and filled");
    }
});

const news_letter_input = document.querySelector('.input_newsletter input');
const news_letter_button = document.querySelector('.input_newsletter button');

news_letter_input.addEventListener('input', () =>
{
    if (news_letter_input.classList.contains('item_error'))
    {
        const value = news_letter_input.value.trim();
        if (isValidEmail(value))
        {
            clearErrors(news_letter_input);
        }
    }
});

news_letter_button.addEventListener('click', (e) =>
{
    e.preventDefault();

    const value = news_letter_input.value.trim();

    if (value === '')
    {
        showError(news_letter_input, 'Email field cannot be empty.');
    }
    else if (!isValidEmail(value))
    {
        showError(news_letter_input, 'Please enter a valid email format.');
    }
    else
    {
        clearErrors(news_letter_input);
        console.log("Newsletter email is valid and ready to subscribe!");
    }
});

