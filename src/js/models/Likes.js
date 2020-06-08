export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLikes(obj) {
        this.likes.push(obj);
        this.setStorage();
    }

    deleteLike(e) {
        let id = parseInt(e.target.parentElement.getAttribute('href').slice(1), 10);
        let index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.setStorage();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    likesCounter(position) {
        position.textContent = this.likes.length;
    }

    setStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    getStorage() {
        let storage = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
        this.likes = storage;
    }
}