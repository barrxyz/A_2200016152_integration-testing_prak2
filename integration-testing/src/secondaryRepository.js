class secondaryRepository {
    constructor() {
        this.data = [
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
        ];

    }

    getitembyid(id) {
        return this.data.find(item => item.id === id);
    }
}
Module.exports = secondaryRepository;
