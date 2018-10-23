/**
 * Description: path 使用任何SVG路径的低级API
 * User: hank.online@foxmail.com
 * Date: 2018/3/20
 * Time: 下午1:51
 *
 */

// Lower level API to animate any kind of svg path
define("mod/svg/path" ,["mod/core/utils","mod/svg/shifty"], function(require , exports , module){
    let utils = require("mod/core/utils");
    debugger;
    let Tweenable = require("mod/svg/shifty"); //https://npm.taobao.org/package/shifty
   

    let EASING_ALIASES = {
        easeIn: 'easeInCubic',
        easeOut: 'easeOutCubic',
        easeInOut: 'easeInOutCubic'
    };

    let Path = function Path(path, opts) {
        // Throw a better error if not initialized with `new` keyword
        if (!(this instanceof Path)) {
            throw new Error('Constructor was called without new keyword');
        }

        // Default parameters for animation
        opts = utils.extend({
            duration: 800,
            easing: 'linear',
            from: {},
            to: {},
            step: function() {}
        }, opts);

        let element;
        if (utils.isString(path)) {
            element = document.querySelector(path);
        } else {
            element = path;
        }

        // Reveal .path as public attribute
        this.path = element;
        this._opts = opts;
        this._tweenable = null;

        // Set up the starting positions
        let length = this.path.getTotalLength();
        this.path.style.strokeDasharray = length + ' ' + length;
        this.set(0);
    };
    
    Path.prototype.value = function value() {
        let offset = this._getComputedDashOffset();
        let length = this.path.getTotalLength();

        let progress = 1 - offset / length;
        // Round number to prevent returning very small number like 1e-30, which
        // is practically 0
        return parseFloat(progress.toFixed(6), 10);
    };

    Path.prototype.set = function set(progress) {
        this.stop();

        this.path.style.strokeDashoffset = this._progressToOffset(progress);

        let step = this._opts.step;
        if (utils.isFunction(step)) {
            let easing = this._easing(this._opts.easing);
            let values = this._calculateTo(progress, easing);
            let reference = this._opts.shape || this;
            step(values, reference, this._opts.attachment);
        }
    };

    Path.prototype.stop = function stop() {
        this._stopTween();
        this.path.style.strokeDashoffset = this._getComputedDashOffset();
    };

    // Method introduced here:
    // http://jakearchibald.com/2013/animated-line-drawing-svg/
    Path.prototype.animate = function animate(progress, opts, cb) {
        opts = opts || {};

        if (utils.isFunction(opts)) {
            cb = opts;
            opts = {};
        }

        let passedOpts = utils.extend({}, opts);

        // Copy default opts to new object so defaults are not modified
        let defaultOpts = utils.extend({}, this._opts);
        opts = utils.extend(defaultOpts, opts);

        let shiftyEasing = this._easing(opts.easing);
        let values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

        this.stop();

        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        this.path.getBoundingClientRect();

        let offset = this._getComputedDashOffset();
        let newOffset = this._progressToOffset(progress);

        let self = this;
        this._tweenable = new Tweenable.Tweenable();
        this._tweenable.tween({
            from: utils.extend({ offset: offset }, values.from),
            to: utils.extend({ offset: newOffset }, values.to),
            duration: opts.duration,
            easing: shiftyEasing,
            step: function(state) {
                self.path.style.strokeDashoffset = state.offset;
                let reference = opts.shape || self;
                opts.step(state, reference, opts.attachment);
            },
            finish: function(state) {
                if (utils.isFunction(cb)) {
                    cb();
                }
            }
        });
    };

    Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
        let computedStyle = window.getComputedStyle(this.path, null);
        return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
    };

    Path.prototype._progressToOffset = function _progressToOffset(progress) {
        let length = this.path.getTotalLength();
        return length - progress * length;
    };

    // Resolves from and to values for animation.
    Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
        if (opts.from && opts.to) {
            return {
                from: opts.from,
                to: opts.to
            };
        }

        return {
            from: this._calculateFrom(easing),
            to: this._calculateTo(progress, easing)
        };
    };

    // Calculate `from` values from options passed at initialization
    Path.prototype._calculateFrom = function _calculateFrom(easing) {
        return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
    };

    // Calculate `to` values from options passed at initialization
    Path.prototype._calculateTo = function _calculateTo(progress, easing) {
        return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
    };

    Path.prototype._stopTween = function _stopTween() {
        if (this._tweenable !== null) {
            this._tweenable.stop();
            this._tweenable = null;
        }
    };

    Path.prototype._easing = function _easing(easing) {
        if (EASING_ALIASES.hasOwnProperty(easing)) {
            return EASING_ALIASES[easing];
        }

        return easing;
    };
    module.exports = Path;
});