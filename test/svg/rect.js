/**
 * Description: rect 矩形 或 圆角矩形
 * User: hank.online@foxmail.com
 * Date: 2018/3/21
 * Time: 下午4:33
 *
 */
    // x , y 坐标起始点
 // rx 圆角
 // ry 圆角
 
define(['utils','shape'],function(require,exports,module){
    let utils = require('utils');
    let Shape = require('shape');
   
    let Rect = function Square(container, options) {
        this._pathTemplate =
            'M {x} {ys} '+
            'a {rx} {ry} 0 0 1 {rx} -{ry} '+
            'h {width_rx_rx} '+
            'a {rx} {ry} 0 0 1 {rx} {ry} '+
            'v {height_ry_ry} '+
            'a {rx} {ry} 0 0 1 -{rx} {ry} '+
            'h {rx_rx_width} '+
            'a {rx} {ry} 0 0 1 -{rx} -{ry} '+
            'z';
        this._trailTemplate =
            'M {startMargin}  {ys} '+
            'a {rx} {ry} 0 0 1 {rx} -{ry} '+
            'h {width_rx_rx} '+
            'a {rx} {ry} 0 0 1 {rx} {ry} '+
            'v {height_ry_ry}'+
            'a {rx} {ry} 0 0 1 -{rx} {ry} '+
            'h {rx_rx_width} '+
            'a {rx} {ry} 0 0 1 -{rx} -{ry} '+
            'z';
        Shape.apply(this, arguments);
    };
    module.exports =Rect;
    Rect.prototype._trailString = function _trailString(opts) {
        let w = 100 - opts.strokeWidth / 2;
        let x = opts.x||0;
        let y = opts.y||0;
        let rx = opts.rx||0;
        let ry = opts.ry||0;
        rx = rx > w / 2 ? w / 2 : rx;
        ry = ry > w / 2 ? w / 2 : ry;
        return utils.render(this._trailTemplate, {
            width: w,
            x:x,
            y:y,
            rx:rx,
            ry:ry,
            ys:y+ry,
            width_rx_rx:w-rx-rx,
            height_ry_ry:w-ry-ry,
            rx_rx_width:rx+rx-w,
            strokeWidth: opts.strokeWidth,
            startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
        });
    };
});