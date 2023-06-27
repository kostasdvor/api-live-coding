import { usersComments, updateUsersComments } from "./main.js";
import { renderUsersComments } from "./render.js";

const listElement = document.getElementById("list");
const host = 'https://webdev-hw-api.vercel.app/api/v2/kostasdvor/comments';
let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

export const fetchAndRenderTasks = (token) => {
    return fetch(
        host,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    )
        .then((response) => response.json())
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                const commentDate = new Date(comment.date);
                const day = commentDate.getDate();
                const month = commentDate.getMonth() + 1;
                const year = commentDate.getFullYear();
                const formattedDate = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;
                const hours = commentDate.getHours();
                const minutes = commentDate.getMinutes();
                const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
                const formattedDateTime = `${formattedDate} ${formattedTime}`;

                return {
                    name: comment.author.name,
                    date: formattedDateTime,
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                };
            });
            updateUsersComments(appComments);

            renderUsersComments(appComments, listElement);
        }).catch((error) => {
            alert("Что-то пошло не так, повторите попытку позже.");
            console.warn(error);
        });
}

// let loadingForm = document.querySelector('.form-loading');

// loadingForm.style.display = 'none';
// addForm.style.display = 'block';

export const fetchComments = (text, name) => {
    return fetch(
        host,
        {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                // date: formatDateTime(currentDate),
                // likes: 0,
                // isLiked: false,
                text: text,
                name: name,
            }),
        }
    ).then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер упал");
        } else if (response.status === 400) {
            throw new Error("Плохой запрос");
        } else {
            return response.json();
        }
    }).then((responseData) => {
        return fetchAndRenderTasks();
    }).then(() => {
        // loadingForm.style.display = 'none';
        // addForm.style.display = 'block';
        renderUsersComments(usersComments, listElement);
    }).catch((error) => {
        if (error.message === "Сервер упал") {
            alert("Сервер упал, повторите попытку позже");
        } else if (error.message === "Плохой запрос") {
            alert("Поля ввода должны содержать минимум 3 символа");
        } else {
            alert("Что-то пошло не так, повторите попытку позже.");
        }
        console.warn(error);
        // loadingForm.style.display = 'block';
        // addForm.style.display = 'none';
    });
};


export function login({ login, password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}






