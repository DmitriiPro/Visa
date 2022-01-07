
    const inputCartName = document.querySelector('.cart__input-name');

    const inputCartNumber = document.querySelector('.cart__input-number');
    const cartNumMask = new Inputmask('9999 9999 9999 9999');
    cartNumMask.mask(inputCartNumber);


    const inputCartDate = document.querySelector('.cart__inp-num-one');
    const cartCartDate = new Inputmask('99 / 99');
    cartCartDate.mask(inputCartDate);

    const inputCartCvv = document.querySelector('.cart__inp-num-two');
    const cartCvv = new Inputmask('999');
    cartCvv.mask(inputCartCvv);

    const cartForm = document.querySelector('.cart__form');
    const cartBtnCheck = document.querySelector('.cart__btn-check');

    ///////////////////////////////////////////////
    // третий вариант написания последний 

    const validation = new JustValidate('.cart__form');
    validation
        .addField('.cart__input-name', [
            {
                validator: function() {
                    const name = inputCartName.value;
                    return String(name).length > 0;
                },
                errorMessage: 'Введите имя',
            },
            {
                validator: function() {
                    const name = inputCartName.value;
                    return String(name).length > 3;
                },
                errorMessage: 'Имя должно быть больше 3 символов',
            }
        ])
        .addField('.cart__input-number', [
            {        
                validator: function() {
                    const number = inputCartNumber.inputmask.unmaskedvalue();
                    return String(number).length > 0;
                },
                errorMessage: 'Введите номер карты',
            },
            {
                validator: function() {
                    const number = inputCartNumber.inputmask.unmaskedvalue();
                    return String(number).length === 16;
                },
                errorMessage: 'Номер карты состоит из 16 цифр',
            }
        ])
        .addField('.cart__inp-num-one', [
            {        
                validator: function() {
                    const date = inputCartDate.inputmask.unmaskedvalue();
                    return String(date).length > 0;
                },
                errorMessage: 'Введите месяц и год',
            },
            {
                validator: function() {
                    const date = inputCartDate.inputmask.unmaskedvalue();
                    return String(date).length === 4;
                },
                errorMessage: 'Дата из 4 цифр',
            },
            {
                validator: function() {
                    const date = inputCartDate.inputmask.unmaskedvalue();

                    const monthExper = Number(date.slice(0,2)) - 1;
                    console.log(monthExper)
                    const yearExper = Number('20' + date.slice(2));
                    const dateUser = new Date(yearExper, monthExper);

                    const dateCurrent = new Date()
                    // console.log(dateCurrent)
                    const dateMaximum = new Date('2030');
                    if (dateMaximum.getTime() > dateUser.getTime() && dateUser.getTime() >= dateCurrent.getTime()) {
                    return true;
                    } else {
                    return false;
                    }
                },
                
                errorMessage: 'Неверно ',
            },
            // {
            //     validator: function() {
            //         const monthExper = Number(date.slice(0,2)) - 1;
            //         if ( monthExper > 0 &&  monthExper <= 12) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     },
            //     errorMessage: 'ошибка',
            // }
            
        ])
        .addField('.cart__inp-num-two', [
            {        
                validator: function() {
                    const cvv = inputCartCvv.inputmask.unmaskedvalue();
                    return String(cvv).length > 0;
                },
                errorMessage: 'Введите cvv',
            },
            {
                validator: function() {
                    const cvv = inputCartCvv.inputmask.unmaskedvalue();
                    return String(cvv).length === 3;
                },
                errorMessage: 'введите 3 цифры',
            } 
            
        ])
        .onSuccess((event) => {
            const name = inputCartName.value;
            const number = inputCartNumber.inputmask.unmaskedvalue();
            const date = inputCartDate.inputmask.unmaskedvalue();
            const cvv = inputCartCvv.inputmask.unmaskedvalue();

            const request = {
                name: name,
                number: number,
                date: date,
                cvv: cvv
            }

            console.log('Валидация успешна. Отправка данных...');

            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: 'POST',
                data: request,
                async: true,
                success: function(){
                    console.log('Запрос выполнен успешно!')
                },
                error() {
                    // cartForm.disabled = false;
                    console.log(`Произошла ошибка!`);
                
                }

            }); 
        });


    /////////////////////////////////////////
    // другой вариант написания

    // const validation = new JustValidate('cart__form', {
    //     errorLabelStyle: {
    //       color: '#33cccc',
    //     //   textDecoration: 'underlined',
    //     }
    //   });
      
    //   validation
    //     .addField('#cartName', [
    //       {
    //         rule: 'required',
    //         errorMessage: 'Как вас зовут?',
    //       },
    //       {
    //         rule: 'minLength',
    //         value: 3,
    //         errorMessage: 'Не короче 3 символов',
    //       },
    //       {
    //         rule: 'maxLength',
    //         value: 30,
    //         errorMessage: 'Слишком длинное имя',
    //       }
    //     ])
    //       .addField('#cartNumber', [
    //       {
    //         rule: 'required',
    //         errorMessage: 'Введите номер карты',
    //       },
    //       {
    //         rule: 'maxLength',
    //         value: 16,
    //         errorMessage: 'Номер введен неверно'
    //       },
    //       {
    //         validator: (value) => {
    //             const numCart = inputCartNumber.inputmask.unmaskedvalue()
    //             console.log(numCart)
    //             return Number(numCart) && numCart.length === 16;
    //       }
    //     ])
    //     .addField('#cartDate', [
    //       {
    //         rule: 'required',
    //         errorMessage: 'Введите цифры',
    //       },
    //       {
    //         rule: 'maxLength',
    //         value: 4,
    //         errorMessage: 'Номер введен неверно'
    //       },
    //       {
    //         validator: (value) => {
    //           const dateCart = inputCartDate.inputmask.unmaskedvalue()
    //           console.log(dateCart)
    //           return Number(dateCart) && dateCart.length === 4;
    //         }
            
         
    //     ])
    //     .addField('#cartCv', [
    //         {
    //           rule: 'required',
    //           errorMessage: 'Введите цифры',
    //         },
    //         {
    //           rule: 'maxLength',
    //           value: 3,
    //           errorMessage: 'Номер введен неверно'
    //         },
    //         {
    //           validator: (value) => {
    //              const cvCart =  inputCartCvv.inputmask.unmaskedvalue()
    //             console.log(cvCart)
    //             return Number(cvCart) && cvCart.length === 3;
    //           },
              
           
    //       ])
    //       .onSuccess((event) => {
    //         const name = inputCartName.value;
    //         const number = inputCartNumber.inputmask.unmaskedvalue();
    //         const date = inputCartDate.inputmask.unmaskedvalue();
    //         const cvv = inputCartCvv.inputmask.unmaskedvalue();

    //         const request = {
    //             name: name,
    //             number: number,
    //             date: date,
    //             cvv: cvv
    //         }

    //         console.log('Валидация успешна. Отправка данных...');

    //         $.ajax({
    //               url: "https://jsonplaceholder.typicode.com/posts",
    //               method: 'POST',
    //               data: request,
    //             //   context: document.body,
    //               success: function(){
    //                 console.log('Запрос выполнен успешно!')
    //               }

    //         }); 
    //     });






    //////////////////////////////////////////

    // new JustValidate('.cart__form', {
    //     colorWrong: 'green',

    //     rules: {
    //         name: {
    //             required: true,
    //             minLength: 2,
    //             maxLength: 30
    //         },

    //         number: {
    //             required: true,
    //             maxLength: 16,
    //             function() {
    //                 const num = inputCartNumber.inputmask.unmaskedvalue()
    //                 console.log(num)
    //                 return num.length === 16;
    //             }
    //         },

    //         date: {
    //             required: true,
    //             maxLength: 4,
    //             function() {
    //                 const date = inputCartDate.inputmask.unmaskedvalue()
    //                 return date.length === 4;
    //             }
    //         },

    //         cvv: {
    //             required: true,
    //             maxLength: 3,
    //             function() {
    //                 const cv = inputCartCvv.inputmask.unmaskedvalue()
    //                 return cv.length === 3;
    //             }
    //         },
    //     },
    //     messages: {
    //         name: 'Введите ваше имя',
    //         number: {
    //             required: 'Введите номер карты',
    //             function: 'Номер введен не полностью'
    //         }, 
    //         date: {
    //             required: 'Введите месяц и дата',
    //             function: 'Неверно'
    //         },
    //         cvv: {
    //             required: 'Введите cvv',
    //             function: 'Неверно'
    //         }
    //     },
    //     submitHandler: function (form, data, ajax) {

    //         cartForm.disabled = true;

    //         ajax({
    //             url: 'https://just-validate-api.herokuapp.com/submit',
    //             method: 'POST',
    //             data,
    //             async: true,
    //             callback(response) {
    //                 console.log(response)
    //                 // form.reset();
    //                 cartForm.disabled = true;
                    
    //             },
    //             error(response) {
    //                 cartForm.disabled = false;
    //                 console.log(`Произошла ошибка: ${response}`);

    //             }
    //         });
    //     }, 
    // });


