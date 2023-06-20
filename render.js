import { toggleLike, checkCommentFields, addCommentReplyHandlers } from "./main.js";

export const renderUsersComments = (usersComments, listElement) => {

    const appEl = document.getElementById("app");

    const usersCommentsHTML = usersComments.map((usersComment, index) => {
        return `<ul id="list" class="comment">
        <div class="comment-header">
        <div>${usersComment.name}</div>
        <div>${usersComment.date}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${usersComment.text}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span id="like-count" class="likes-counter">${usersComment.likes}</span>
            <button id="like" data-index="${index}" class="like-button liked ${usersComment.isLiked ? '-active-like' : ''}"></button>
        </div>
        </div>
    </ul>`;
    }).join('');

    const appHtml = `    <div class="container">
    <div id="loader" class="loader">Пожалуйста, подождите, загружаю комментарии...</div>
    <ul id="list" class="comments">
    ${usersCommentsHTML}
    </ul>
    <div class="form-loading" id="loadingForm">
        Комментарий добавляется...
    </div>
    <div id="add-form-block" class="add-form">
        <input id="name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
        <textarea id="comment-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
        <div class="add-form-row">
            <button id="add-button" class="add-form-button">Написать</button>
        </div>
    </div>
    <div id="add-form-block" class="add-form">
        <h3>Форма входа</h3>
        <input id="name" type="text" class="add-form-name" placeholder="Имя" /><br>
        <input id="name" type="text" class="add-form-name" placeholder="Логин" /><br>
        <input id="name" type="text" class="add-form-name" placeholder="Пароль" />
        <div class="add-form-row">
            <button id="add-button" class="add-form-button">Войти</button>
        </div>
    </div>

</div>
`














    appEl.innerHTML = appHtml;
    toggleLike();
    checkCommentFields();
    addCommentReplyHandlers();


    buttonElement.addEventListener("click", () => {

        // Условное ветвление для проверки заполненности input

        inputNameElement.classList.remove('error');
        inputTextElement.classList.remove('error');
        buttonElement.classList.remove('error-button');

        if (inputNameElement.value === "" && inputTextElement.value === "") {
            inputNameElement.classList.add('error');
            inputTextElement.classList.add('error');
            buttonElement.classList.add('error-button');
            return;
        } else if (inputNameElement.value === " " || inputTextElement.value === "") {
            inputTextElement.classList.add('error');
            buttonElement.classList.add('error-button');
            return;
        } else if (inputNameElement.value === "" || inputTextElement.value === " ") {
            inputNameElement.classList.add('error');
            buttonElement.classList.add('error-button');
            return;
        }

        // Функция текущей даты и времени

        function formatDateTime(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const timeString = hours + ':' + minutes;
            const formatedDate = `${day}.${month}.${year} ${timeString}`;
            return formatedDate;
        }

        const currentDate = new Date();
        formatDateTime(currentDate);

        // Пуш комментариев пользователя в массив с заменой html символов 

        // usersComments.push({
        //   name: inputNameElement.value
        //     .replaceAll("&", "&amp;")
        //     .replaceAll("<", "&lt;")
        //     .replaceAll(">", "&gt;")
        //     .replaceAll('"', "&quot;"),
        //   comment: inputTextElement.value
        //     .replaceAll("&", "&amp;")
        //     .replaceAll("<", "&lt;")
        //     .replaceAll(">", "&gt;")
        //     .replaceAll('"', "&quot;"),
        //   time: formatDateTime(currentDate),
        //   likes: 0,
        //   isLiked: false,
        // });

        // Получение новых комментов на сервер с помощью API
        fetchPromise();
        checkCommentFields();
    });


};

