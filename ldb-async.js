/*
Async local storage for Windows 96.
Copyright (C) Windows 96 Team 2019.
*/

! function() {
    function e(t, o) {
        return n ? void(n.transaction("lse").objectStore("lse").get(t).onsuccess = function(e) {
            var t = e.target.result && e.target.result.v || null;
            o(t)
        }) : void setTimeout(function() {
            e(t, o)
        }, 100)
    }
    var t = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!t) return void console.error("indexDB not supported");
    var n, o = {
            k: "",
            v: ""
        },
        r = t.open("W96FS", 1);
    r.onsuccess = function(e) {
        n = this.result
    }, r.onerror = function(e) {
        console.error("indexedDB request error"), console.log(e)
    }, r.onupgradeneeded = function(e) {
        n = null;
        var t = e.target.result.createObjectStore("lse", {
            keyPath: "k"
        });
        t.transaction.oncomplete = function(e) {
            n = e.target.db
        }
    }, window.localStorageDB = {
        getItem: e,
        setItem: function(e, t) {
            o.k = e, o.v = t, n.transaction("lse", "readwrite").objectStore("lse").put(o)
        },removeItem: function(e) {
            n.transaction("lse", "readwrite").objectStore("lse").delete(e)
        }
    }
}();