/*! 2.6.0 */ 
define(function(require , exports , module){
    module.exports= function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "/assets/", e(e.s = 6)
    }([
        function (t, e, n) {
            "use strict";
            (function (t) {
                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        e = new M,
                        n = e.tween(t);
                    return n.tweenable = e, n
                }
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.Tweenable = e.composeEasingObject = e.scheduleUpdate = e.processTweens = e.tweenProps = void 0;
                var o = function () {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                            }
                        }
                        return function (e, n, r) {
                            return n && t(e.prototype, n), r && t(e, r), e
                        }
                    }(),
                    u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    a = Object.assign || function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = arguments[e];
                            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                        }
                        return t
                    };
                e.tween = i;
                var s = n(5),
                    c = function (t) {
                        if (t && t.__esModule) return t;
                        var e = {};
                        if (null != t)
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                        return e.default = t, e
                    }(s),
                    f = "undefined" != typeof window ? window : t,
                    l = f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.oRequestAnimationFrame || f.msRequestAnimationFrame || f.mozCancelRequestAnimationFrame && f.mozRequestAnimationFrame || setTimeout,
                    h = function () {},
                    p = null,
                    v = null,
                    _ = a({}, c),
                    d = e.tweenProps = function (t, e, n, r, i, o, u) {
                        var a = t < o ? 0 : (t - o) / i;
                        for (var s in e) {
                            var c = u[s],
                                f = c.call ? c : _[c],
                                l = n[s];
                            e[s] = l + (r[s] - l) * f(a)
                        }
                        return e
                    },
                    y = function (t, e) {
                        var n = t._attachment,
                            r = t._currentState,
                            i = t._delay,
                            o = t._easing,
                            u = t._originalState,
                            a = t._duration,
                            s = t._step,
                            c = t._targetState,
                            f = t._timestamp,
                            l = f + i + a,
                            h = e > l ? l : e,
                            p = h >= l,
                            v = a - (l - h);
                        p ? (s(c, n, v), t.stop(!0)) : (t._applyFilter("beforeTween"), h < f + i ? (h = 1, a = 1, f = 1) : f += i, d(h, r, u, c, a, f, o), t._applyFilter("afterTween"), s(r, n, v))
                    },
                    w = e.processTweens = function () {
                        for (var t = M.now(), e = p; e;) y(e, t), e = e._next
                    },
                    m = e.scheduleUpdate = function t() {
                        p && (l.call(f, t, 1e3 / 60), w())
                    },
                    g = e.composeEasingObject = function (t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "linear",
                            n = {},
                            r = void 0 === e ? "undefined" : u(e);
                        if ("string" === r || "function" === r)
                            for (var i in t) n[i] = e;
                        else
                            for (var o in t) n[o] = e[o] || "linear";
                        return n
                    },
                    b = function (t) {
                        if (p)
                            if (t === p) p = t._next, p && (p._previous = null), t === v && (v = null);
                            else if (t === v) v = t._previous, v._next = null;
                        else {
                            var e = t._previous,
                                n = t._next;
                            e._next = n, n._previous = e
                        }
                    },
                    M = e.Tweenable = function () {
                        function t() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                            r(this, t), this._currentState = e, this._configured = !1, this._filters = [], this._next = null, this._previous = null, n && this.setConfig(n)
                        }
                        return o(t, [{
                            key: "_applyFilter",
                            value: function (t) {
                                var e = !0,
                                    n = !1,
                                    r = void 0;
                                try {
                                    for (var i, o = this._filters[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                                        var u = i.value,
                                            a = u[t];
                                        a && a(this)
                                    }
                                } catch (t) {
                                    n = !0, r = t
                                } finally {
                                    try {
                                        !e && o.return && o.return()
                                    } finally {
                                        if (n) throw r
                                    }
                                }
                            }
                        }, {
                            key: "tween",
                            value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
                                    n = this._attachment,
                                    r = this._configured;
                                return this._isTweening ? this : (void 0 === e && r || this.setConfig(e), this._timestamp = t.now(), this._start(this.get(), n), this.resume())
                            }
                        }, {
                            key: "setConfig",
                            value: function (e) {
                                var n = this,
                                    r = e.attachment,
                                    i = e.delay,
                                    o = void 0 === i ? 0 : i,
                                    u = e.duration,
                                    s = void 0 === u ? 500 : u,
                                    c = e.easing,
                                    f = e.from,
                                    l = e.promise,
                                    p = void 0 === l ? Promise : l,
                                    v = e.start,
                                    _ = void 0 === v ? h : v,
                                    d = e.step,
                                    y = void 0 === d ? h : d,
                                    w = e.to;
                                this._configured = !0, this._attachment = r, this._pausedAtTime = null, this._scheduleId = null, this._delay = o, this._start = _, this._step = y, this._duration = s, this._currentState = a({}, f || this.get()), this._originalState = this.get(), this._targetState = a({}, w || this.get());
                                var m = this._currentState;
                                this._targetState = a({}, m, this._targetState), this._easing = g(m, c);
                                var b = t.filters;
                                this._filters.length = 0;
                                for (var M in b) b[M].doesApply(this) && this._filters.push(b[M]);
                                return this._applyFilter("tweenCreated"), this._promise = new p(function (t, e) {
                                    n._resolve = t, n._reject = e
                                }), this._promise.catch(h), this
                            }
                        }, {
                            key: "get",
                            value: function () {
                                return a({}, this._currentState)
                            }
                        }, {
                            key: "set",
                            value: function (t) {
                                this._currentState = t
                            }
                        }, {
                            key: "pause",
                            value: function () {
                                return this._pausedAtTime = t.now(), this._isPaused = !0, b(this), this
                            }
                        }, {
                            key: "resume",
                            value: function () {
                                var e = t.now();
                                return this._isPaused && (this._timestamp += e - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, null === p ? (p = this, v = this, m()) : (this._previous = v, this._previous._next = this, v = this), this._promise
                            }
                        }, {
                            key: "seek",
                            value: function (e) {
                                e = Math.max(e, 0);
                                var n = t.now();
                                return this._timestamp + e === 0 ? this : (this._timestamp = n - e, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, y(this, n), this.pause()), this)
                            }
                        }, {
                            key: "stop",
                            value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                    e = this._attachment,
                                    n = this._currentState,
                                    r = this._easing,
                                    i = this._originalState,
                                    o = this._targetState;
                                return this._isTweening = !1, this._isPaused = !1, b(this), t ? (this._applyFilter("beforeTween"), d(1, n, i, o, 1, 0, r), this._applyFilter("afterTween"), this._applyFilter("afterTweenEnd"), this._resolve(n, e)) : this._reject(n, e), this
                            }
                        }, {
                            key: "isPlaying",
                            value: function () {
                                return this._isTweening && !this._isPaused
                            }
                        }, {
                            key: "setScheduleFunction",
                            value: function (e) {
                                t.setScheduleFunction(e)
                            }
                        }, {
                            key: "dispose",
                            value: function () {
                                for (var t in this) delete this[t]
                            }
                        }]), t
                    }();
                M.setScheduleFunction = function (t) {
                    return l = t
                }, M.formulas = _, M.filters = {}, M.now = Date.now || function () {
                    return +new Date
                }
            }).call(e, n(4))
        },
        function (t, e, n) {
            "use strict";

            function r(t, e, n, r, i, o) {
                var u = 0,
                    a = 0,
                    s = 0,
                    c = 0,
                    f = 0,
                    l = 0,
                    h = function (t) {
                        return ((u * t + a) * t + s) * t
                    },
                    p = function (t) {
                        return ((c * t + f) * t + l) * t
                    },
                    v = function (t) {
                        return (3 * u * t + 2 * a) * t + s
                    },
                    _ = function (t) {
                        return t >= 0 ? t : 0 - t
                    },
                    d = function (t, e) {
                        var n = void 0,
                            r = void 0,
                            i = void 0,
                            o = void 0,
                            u = void 0,
                            a = void 0;
                        for (i = t, a = 0; a < 8; a++) {
                            if (o = h(i) - t, _(o) < e) return i;
                            if (u = v(i), _(u) < 1e-6) break;
                            i -= o / u
                        }
                        if (n = 0, r = 1, (i = t) < n) return n;
                        if (i > r) return r;
                        for (; n < r;) {
                            if (o = h(i), _(o - t) < e) return i;
                            t > o ? n = i : r = i, i = .5 * (r - n) + n
                        }
                        return i
                    };
                return s = 3 * e, a = 3 * (r - e) - s, u = 1 - s - a, l = 3 * n, f = 3 * (i - n) - l, c = 1 - l - f,
                    function (t, e) {
                        return p(d(t, e))
                    }(t, function (t) {
                        return 1 / (200 * t)
                    }(o))
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.unsetBezierFunction = e.setBezierFunction = void 0;
            var i = n(0),
                o = function (t, e, n, i) {
                    return function (o) {
                        return r(o, t, e, n, i, 1)
                    }
                };
            e.setBezierFunction = function (t, e, n, r, u) {
                var a = o(e, n, r, u);
                return a.displayName = t, a.x1 = e, a.y1 = n, a.x2 = r, a.y2 = u, i.Tweenable.formulas[t] = a
            }, e.unsetBezierFunction = function (t) {
                return delete i.Tweenable.formulas[t]
            }
        },
        function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.interpolate = void 0;
            var r = Object.assign || function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                    }
                    return t
                },
                i = n(0),
                o = new i.Tweenable,
                u = i.Tweenable.filters;
            e.interpolate = function (t, e, n, a) {
                var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                    c = r({}, t),
                    f = (0, i.composeEasingObject)(t, a);
                o._filters.length = 0, o.set({}), o._currentState = c, o._originalState = t, o._targetState = e, o._easing = f;
                for (var l in u) u[l].doesApply(o) && o._filters.push(u[l]);
                o._applyFilter("tweenCreated"), o._applyFilter("beforeTween");
                var h = (0, i.tweenProps)(n, c, t, e, 1, s, f);
                return o._applyFilter("afterTween"), h
            }
        },
        function (t, e, n) {
            "use strict";

            function r(t) {
                return parseInt(t, 16)
            }

            function i(t) {
                var e = t._currentState;
                [e, t._originalState, t._targetState].forEach(m), t._tokenData = S(e)
            }

            function o(t) {
                var e = t._currentState,
                    n = t._originalState,
                    r = t._targetState,
                    i = t._easing,
                    o = t._tokenData;
                k(i, o), [e, n, r].forEach(function (t) {
                    return O(t, o)
                })
            }

            function u(t) {
                var e = t._currentState,
                    n = t._originalState,
                    r = t._targetState,
                    i = t._easing,
                    o = t._tokenData;
                [e, n, r].forEach(function (t) {
                    return j(t, o)
                }), x(i, o)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.tweenCreated = i, e.beforeTween = o, e.afterTween = u;
            var a = /(\d|-|\.)/,
                s = /([^\-0-9.]+)/g,
                c = /[0-9.-]+/g,
                f = function () {
                    var t = c.source,
                        e = /,\s*/.source;
                    return new RegExp("rgb\\(" + t + e + t + e + t + "\\)", "g")
                }(),
                l = /^.*\(/,
                h = /#([0-9]|[a-f]){3,6}/gi,
                p = function (t, e) {
                    return t.map(function (t, n) {
                        return "_" + e + "_" + n
                    })
                },
                v = function (t) {
                    var e = t.match(s);
                    return e ? (1 === e.length || t.charAt(0).match(a)) && e.unshift("") : e = ["", ""], e.join("VAL")
                },
                _ = function (t) {
                    return t = t.replace(/#/, ""), 3 === t.length && (t = t.split(""), t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), [r(t.substr(0, 2)), r(t.substr(2, 2)), r(t.substr(4, 2))]
                },
                d = function (t) {
                    return "rgb(" + _(t).join(",") + ")"
                },
                y = function (t, e, n) {
                    var r = e.match(t),
                        i = e.replace(t, "VAL");
                    return r && r.forEach(function (t) {
                        return i = i.replace("VAL", n(t))
                    }), i
                },
                w = function (t) {
                    return y(h, t, d)
                },
                m = function (t) {
                    for (var e in t) {
                        var n = t[e];
                        "string" == typeof n && n.match(h) && (t[e] = w(n))
                    }
                },
                g = function (t) {
                    var e = t.match(c).map(Math.floor);
                    return "" + t.match(l)[0] + e.join(",") + ")"
                },
                b = function (t) {
                    return y(f, t, g)
                },
                M = function (t) {
                    return t.match(c)
                },
                S = function (t) {
                    var e = {};
                    for (var n in t) {
                        var r = t[n];
                        "string" == typeof r && (e[n] = {
                            formatString: v(r),
                            chunkNames: p(M(r), n)
                        })
                    }
                    return e
                },
                O = function (t, e) {
                    for (var n in e)! function (n) {
                        M(t[n]).forEach(function (r, i) {
                            return t[e[n].chunkNames[i]] = +r
                        }), delete t[n]
                    }(n)
                },
                F = function (t, e) {
                    var n = {};
                    return e.forEach(function (e) {
                        n[e] = t[e], delete t[e]
                    }), n
                },
                T = function (t, e) {
                    return e.map(function (e) {
                        return t[e]
                    })
                },
                P = function (t, e) {
                    return e.forEach(function (e) {
                        return t = t.replace("VAL", +e.toFixed(4))
                    }), t
                },
                j = function (t, e) {
                    for (var n in e) {
                        var r = e[n],
                            i = r.chunkNames,
                            o = r.formatString,
                            u = P(o, T(F(t, i), i));
                        t[n] = b(u)
                    }
                },
                k = function (t, e) {
                    for (var n in e)! function (n) {
                        var r = e[n].chunkNames,
                            i = t[n];
                        if ("string" == typeof i) {
                            var o = i.split(" "),
                                u = o[o.length - 1];
                            r.forEach(function (e, n) {
                                return t[e] = o[n] || u
                            })
                        } else r.forEach(function (e) {
                            return t[e] = i
                        });
                        delete t[n]
                    }(n)
                },
                x = function (t, e) {
                    for (var n in e) {
                        var r = e[n].chunkNames,
                            i = t[r[0]];
                        t[n] = "string" == typeof i ? r.map(function (e) {
                            var n = t[e];
                            return delete t[e], n
                        }).join(" ") : i
                    }
                };
            e.doesApply = function (t) {
                var e = t._currentState;
                return Object.keys(e).some(function (t) {
                    return "string" == typeof e[t]
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var r, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };
            r = function () {
                return this
            }();
            try {
                r = r || Function("return this")() || (0, eval)("this")
            } catch (t) {
                "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (r = window)
            }
            t.exports = r
        },
        function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            e.linear = function (t) {
                return t
            }, e.easeInQuad = function (t) {
                return Math.pow(t, 2)
            }, e.easeOutQuad = function (t) {
                return -(Math.pow(t - 1, 2) - 1)
            }, e.easeInOutQuad = function (t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2)
            }, e.easeInCubic = function (t) {
                return Math.pow(t, 3)
            }, e.easeOutCubic = function (t) {
                return Math.pow(t - 1, 3) + 1
            }, e.easeInOutCubic = function (t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2)
            }, e.easeInQuart = function (t) {
                return Math.pow(t, 4)
            }, e.easeOutQuart = function (t) {
                return -(Math.pow(t - 1, 4) - 1)
            }, e.easeInOutQuart = function (t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2)
            }, e.easeInQuint = function (t) {
                return Math.pow(t, 5)
            }, e.easeOutQuint = function (t) {
                return Math.pow(t - 1, 5) + 1
            }, e.easeInOutQuint = function (t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2)
            }, e.easeInSine = function (t) {
                return 1 - Math.cos(t * (Math.PI / 2))
            }, e.easeOutSine = function (t) {
                return Math.sin(t * (Math.PI / 2))
            }, e.easeInOutSine = function (t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            }, e.easeInExpo = function (t) {
                return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
            }, e.easeOutExpo = function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, e.easeInOutExpo = function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
            }, e.easeInCirc = function (t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }, e.easeOutCirc = function (t) {
                return Math.sqrt(1 - Math.pow(t - 1, 2))
            }, e.easeInOutCirc = function (t) {
                return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }, e.easeOutBounce = function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, e.easeInBack = function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, e.easeOutBack = function (t) {
                var e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            }, e.easeInOutBack = function (t) {
                var e = 1.70158;
                return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
            }, e.elastic = function (t) {
                return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1
            }, e.swingFromTo = function (t) {
                var e = 1.70158;
                return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
            }, e.swingFrom = function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, e.swingTo = function (t) {
                var e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            }, e.bounce = function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, e.bouncePast = function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }, e.easeFromTo = function (t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2)
            }, e.easeFrom = function (t) {
                return Math.pow(t, 4)
            }, e.easeTo = function (t) {
                return Math.pow(t, .25)
            }
        },
        function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.unsetBezierFunction = e.setBezierFunction = e.interpolate = e.tween = e.Tweenable = void 0;
            var r = n(2);
            Object.defineProperty(e, "interpolate", {
                enumerable: !0,
                get: function () {
                    return r.interpolate
                }
            });
            var i = n(1);
            Object.defineProperty(e, "setBezierFunction", {
                enumerable: !0,
                get: function () {
                    return i.setBezierFunction
                }
            }), Object.defineProperty(e, "unsetBezierFunction", {
                enumerable: !0,
                get: function () {
                    return i.unsetBezierFunction
                }
            });
            var o = n(0),
                u = n(3),
                a = function (t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e.default = t, e
                }(u);
            o.Tweenable.filters.token = a, e.Tweenable = o.Tweenable, e.tween = o.tween
        }
    ]);
});