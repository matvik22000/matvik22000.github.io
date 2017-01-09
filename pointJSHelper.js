/**
 * Created by Matvey on 07.01.2017.
 */

var js = new PointJS('2d', 0, 0, {backgroundColor: "#CCCCCC"});
var game = js.game;
var point = js.vector.point;

function new_small_map(map_size) {
    var map = game.newRectObject({
        w: map_size,
        h: map_size,
        fillColor: "black",
        alpha: 0.4
    });
    map.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 110));
    return map

}
function min_map_point_2(obj, smallmap_size, map_size, indent_x, indent_y) {
    return point(obj.getPositionC().x * (smallmap_size / map_size) + js.game.getWH().w - indent_x, obj.getPositionC().y * (smallmap_size / map_size) + js.game.getWH().h - indent_y)


}
function new_map(map_size_x,map_size_y, color ) {
    var left = game.newRectObject({
        x: 0,
        y: 0,
        w: 2,
        h: map_size_y,
        fillColor: color


    });
    var right = game.newRectObject({
        x: map_size_x,
        y: 0,
        w: 2,
        h: map_size_y,
        fillColor: color

    });
    var top_stop = game.newRectObject({
        x: 0,
        y: 0,
        w: map_size_x,
        h: 2,
        fillColor: color

    });
    var bot = js.game.newRectObject({
        x: 0,
        y: map_size_y,
        w: map_size_x,
        h: 2,
        fillColor: color

    });

    left.draw();
    top_stop.draw();
    right.draw();
    bot.draw();


}
