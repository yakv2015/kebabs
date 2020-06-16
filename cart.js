var itemBox = document.querySelectorAll('.item-box'),
    cartCont = document.getElementById('cart_content');

// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler){
    if(elem.addEventListener){
      elem.addEventListener(type, handler, false);
    } else {
      elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
  }


// Получаем данные из LocalStorage
function getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
}


// Записываем данные в LocalStorage
function setCartData(a){
    localStorage.setItem('cart', JSON.stringify(a));
    return false;
}

// Добавляем товар в корзину
function addToCart(q){
    var cartData = getCartData() || {},
        parentBox = this.parentNode,
        itemId = this.getAttribute('data-id'),
        itemTitle = parentBox.querySelector('.item-text').innerHTML,
        itemPrice = parentBox.querySelector('.item-price').innerHTML;

        if(cartData.hasOwnProperty(itemId)){
            cartData[itemId][2] += 1;
        } else {
            cartData[itemId] = [itemTitle, itemPrice, 1];
        }
        
        if(!setCartData(cartData)){
            setCartData(cartData);
        }
    return false;
}


// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
for(let i = 0; i < itemBox.length; i++){
    addEvent(itemBox[i].querySelector('.add-item'), 'click', addToCart);
  }


// Открываем корзину со списком добавленных товаров
function openCart(e){
    var cartData = getCartData(), 
        totalItems = '';

    if(cartData !== null){
        totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
        for(var items in cartData){
            totalItems += '<tr>';
            for(var i = 0; i < cartData[items].length; i++){
                totalItems += '<td>' + cartData[items][i] + '</td>';
            }
            totalItems += '</tr>';
        }
      totalItems += '</table>';
      cartCont.innerHTML = totalItems;
    } else {
        cartCont.innerHTML = 'В корзине пусто!';
    }
    return false;
}

/* Открыть корзину */
addEvent(document.getElementById('checkout'), 'click', openCart);


/* Очистить корзину по нажатию на кнопку*/
addEvent(document.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Корзина очишена.';
});

/*Очистить корзину при закрытии вкладки*/

/*Сначала исключаем очистку корзины при переходе по ссылкам сайта*/
var  unnec = true;
document.addEventListener("click", function(event) {
    if(event.target.matches("a")) {
         unnec = false;
    }
});

/*Очищаем корзину при обновлении или закрытии вкладки*/
window.onbeforeunload = function () {
    if( unnec === true) {
        localStorage.removeItem('cart');
    } 
}


