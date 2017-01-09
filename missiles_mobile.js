/**
 * Created by Matvey on 09.02.17.
 */
var js = new PointJS('2d', 0, 0, {backgroundColor: "#31e1e2"});
js.system.initFullPage();
var game = js.game;
var point = js.vector.point;
map = new_small_map(100);
js.mouseControl.initMouseControl();
var smallmap_size = 100;
var map_size = 15000;
var cell = game.newCircleObject({
    radius: 2,
    fillColor: "white"

});
var left = false;
var right = false;

score = 0;
music = [];
for (var t = 0; t < 100; t++)
    music.push("DLYa_IGRY_-Fonovaya_muzyka.mp3")
audio1 = js.audio.newAudio("DLYa_IGRY_-Fonovaya_muzyka.mp3");


cells = [];
function min_map_point(obj) {
    return point(obj.getPositionC().x * (smallmap_size / map_size) + js.game.getWH().w - 110, obj.getPositionC().y * (smallmap_size / map_size) + js.game.getWH().h - 145);
}
var rocket = game.newImageObject({
    file: "rocket.png",
    scale: 1


});
rocket.setPosition(point(js.math.random(1, 15000, true), js.math.random(1, 15000, true)));
var rockets = [];
var time_rocket = 0;
rockets.push(rocket);
roc = rocket;
for (j = 0; j < rockets.length; j++)
    cells.push(game.newCircleObject({
        radius: 2,
        fillColor: "red"

    }))

var plane = game.newImageObject({
    file: "plane.png",
    scale: 1,
    x: 10000,
    y: 10000
});


var time = 0;
function intersect(s1_x, s2_x, s1_y, s2_y, s1_size_x, s1_size_y, s2_size_x, s2_size_y) {
    return (s1_x > s2_x - s1_size_x) && (s1_x < s2_x + s2_size_x) && (s1_y > s2_y - s1_size_y) && (
        s1_y < s2_y + s2_size_y);
}
var bg = [];
for (var i = 0; i < 1000; i++)
    bg.push(game.newImageObject({
        file: "cloud.png",
        scale: 1,
        x: js.math.random(1, 15000, true),
        y: js.math.random(1, 15000, true)


    }));
game.clear();
js.GUI.newButton({
    x: 10,
    y: game.getWH().h - 40,
    w: 100,
    h: 30,
    text: "влево",
    fillColor: "#00accc",
    events: {
        mousePress: function () {
            left = true
        },
        mouseUp:function(){
            left = false}
    }
});
js.GUI.newButton({
    x: game.getWH().w - 110,
    y: game.getWH().h - 40,
    w: 100,
    h: 30,
    text: "вправо",
    fillColor: "#00accc",
    events: {
        mousePress: function () {
            right = true
        },
        mouseUp:function(){
            right = false}
    }
});
game.newLoop("1", function () {
    game.clear();

    if (right)
        plane.turn(2);
    if (left)
        plane.turn(-2);
    if (plane.getPositionC().x <= 0 || plane.getPositionC().y <= 0 || plane.getPositionC().x >= 15000 || plane.getPositionC().y >= 15000)
        game.setLoop("2");
    for (var j = 0; j < bg.length; j++) {
        bg[j].draw()
    }

    js.camera.setPositionC(plane.getPositionC());

    plane.moveAngle(-8);
    map.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 145));
    cell.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 110));
    cell.setPositionS(min_map_point(plane));


    // if (angle_r2p_w > 0) {
    //     if (angle_r2p_w <= 5)
    //         rocket.turn(angle_r2p_w);
    //     else
    //         rocket.turn(5);
    // }
    // if (angle_r2p_w < 0) {
    //
    //     angle_r2p_w += 360;
    //     if (angle_r2p_w <= 5)
    //         rocket.turn(-angle_r2p_w);
    //     else
    //         rocket.turn(-5);
    // }

    for (i = 0; i < rockets.length; i++) {


        rockets[i].rotateForAngle(js.vector.getAngle2Points(plane.getPositionC(), rockets[i].getPositionC()), 1.5);
        rockets[i].moveAngle(-9);
        // cells.push(game.newCircleObject({
        //     radius: 2,
        //     fillColor: "red"}));
        for (l = 0; l < cells.length; l++) {
            cells[l].setPositionS(min_map_point(rockets[i]));
            cells[l].draw()
        }
        rockets[i].draw();


        if (rockets[i].isDynamicInside(plane.getDynamicBox())) {
            //if (intersect(plane.getPosition().x, rockets[i].getPositionC().x, plane.getPosition().y, rockets[i].getPositionC().y, 200, 200, 0, 0))
            // var blast = game.newImageObject({
            //     file: "blast.png",
            //     x: plane.getPosition().x,
            //     y: plane.getPosition().y,
            //     scale: 1
            // });
            // blast.draw();
            game.setLoop("2")


        }
        for (o = 0; o < rockets.length; o++) {
            if (i != o) {
                if (rockets[i].isDynamicIntersect(rockets[o].getDynamicBox())) {

                    bl = game.newCircleObject({
                        radius: 10,
                        fillColor: "#d6000a",
                        x: rockets[i].getPosition().x,
                        y: rockets[i].getPosition().y
                    });
                    bl.draw();
                    rockets.splice(i, 1);
                    rockets.splice(o, 1);
                    score += 100;
                }
            }
        }

    }

    if (time >= 300) {
        rockets.push(game.newImageObject({
            file: "rocket.png",
            scale: 1,
            x: js.math.random(1, 15000, true),
            y: js.math.random(1, 15000, true)
        }));
        cells.push(game.newCircleObject({
            radius: 2,
            fillColor: "red"
        }));
        time = 0
    }
    new_map(15000, 15000, 'black');
    map.draw();
    cell.draw();

    plane.draw();
    time++;

    score ++;
    js.brush.drawTextLinesS({
        lines:["твой счёт: " + score.toString()],
        x: 10,
        y: 10,
        color: "black",
        size: 30
    });

});
js.game.setLoopSound("1", [audio1]);

game.start();
game.newLoop("2", function () {
    js.GUI.newButton({
        x: game.getWH().w / 2,
        y: game.getWH().h / 2,
        w: 150,
        h: 45,
        text: "играть",
        fillColor: "#00accc",
        events: {
            mousePress: function () {
                location.reload()}
        }
    });
    var time = 0;

});

game.setLoop("1");

