import expiredStorage from "expired-storage"
var defaultStorage = {
    // internal storage
    _storage: {},

    // basic API
    getItem: function (key) {
        return this._storage[key];
    },
    setItem: function (key, val) {
        this._storage[key] = val;
    },
    removeItem: function (key) {
        delete this._storage[key];
    },
    clear: function () {
        this._storage = {};
    },

    // you can implement keys() function that will be used to retrieve storage keys.
    keys: function () {
        var ret = [];
        for (var key in this._storage) {
            if (this._storage.hasOwnProperty(key)) {
                ret.push(key);
            }
        }
        return ret;
    }
};

export const expStorage = new expiredStorage(defaultStorage);
