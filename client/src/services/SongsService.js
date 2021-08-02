import Api from './Api'

export default {
    index() {
        return Api().get('songs')
    },
    post(song) {
        return Api().post('songs', song)
    },
    show(id) {
        return Api().get(`songs/${id}`)
    },
    put(id, song) {
        return Api().put(`songs/${id}`, song)
    }
}