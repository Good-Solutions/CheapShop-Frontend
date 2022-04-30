import http from './http.common';
class CategoriesApiService {
    getAll() {
        return http.get('/categories');
    }
    get(id) {
        return http.get(`/categories/${id}`);
    }

    create(data) {
        return http.post("/categories", data);
    }

    update(id, data) {
        return http.put(`/categories/${id}`, data);
    }

    delete(id) {
        return http.delete(`/categories/${id}`);
    }

    deleteAll() {
        return http.delete(`/categories`);
    }

    findByName(name) {
        return http.get(`/categories?name=${name}`);
    }
}

export default new CategoriesApiService();