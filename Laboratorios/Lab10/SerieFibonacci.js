(() => {
    const App = {
        htmlElements: {
            InputElement: document.getElementById('inputNumber'),
            ButtonElement: document.getElementById('btnResult'),
            ResultElement: document.getElementById('lblNumber'),
            ButtonElementClear: document.getElementById('btnClear'),
        },
        init() {
            App.handlers.btnResultClick();
            App.handlers.btnClearClick();
        },
        methods: {
            SerieFibonacci() {
                let number = App.htmlElements.InputElement.value;

                if (number === '' || number == null) {
                    alert('Ingrese un número');
                    return;
                } else {
                    let a = 1;
                    let b = 1;
                    let serie = '';

                    for (let i = 0; i < number; i++) {
                        const card = document.createElement('div');
                        card.classList.add('card');

                        card.textContent = a;

                        const deleteButton = document.createElement('span');
                        deleteButton.classList.add('delete');
                        deleteButton.textContent = 'X';

                        deleteButton.addEventListener('click', () => {
                            card.remove();
                        });

                        card.appendChild(deleteButton);

                        card.addEventListener('mouseover', () => {
                            deleteButton.style.visibility = 'visible';
                        });

                        card.addEventListener('mouseout', () => {
                            deleteButton.style.visibility = 'hidden';
                        });

                        App.htmlElements.ResultElement.appendChild(card);

                        let next = a + b;
                        a = b;
                        b = next;
                    }
                }
            },
        },
        handlers: {
            btnResultClick() {
                App.htmlElements.ButtonElement.addEventListener('click', function (e) {
                    e.preventDefault();
                    App.htmlElements.ResultElement.style.opacity = 1;
                    App.methods.SerieFibonacci();
                });
            },
            btnClearClick() {
                App.htmlElements.ButtonElementClear.addEventListener('click', function (e) {
                    e.preventDefault();
                    App.htmlElements.ResultElement.style.opacity = 0;
                    App.htmlElements.InputElement.value = '';
                    App.htmlElements.ResultElement.innerHTML = ''; // Limpiar el resultado
                });
            },
        },
    };
    App.init();
})();
