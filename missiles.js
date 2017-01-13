/**
 * Created by Matvey on 05.02.17.
 */
var js = new PointJS('2d', 0, 0, {backgroundColor: "#31e1e2"});
js.system.initFullPage();
var game = js.game;
var point = js.vector.point;
map = new_small_map(100);
js.keyControl.initKeyControl();
var smallmap_size = 100;
var map_size = 15000;
var cell = game.newCircleObject({
    radius: 2,
    fillColor: "white"

});
var reload = 0;
var lc_f = false;
var randpos_x = js.math.random(0, 15000);
var randpos_y = js.math.random(0, 15000);
score = 0;
music = [];

audio1 = js.audio.newAudio("DLYa_IGRY_-Fonovaya_muzyka.mp3");
var lc = game.newImageObject({
    file: "lc.png",
    scale: 1

});

turbo = 0;
cells = [];
function min_map_point(obj) {
    return point(obj.getPositionC().x * (smallmap_size / map_size) + js.game.getWH().w - 110, obj.getPositionC().y * (smallmap_size / map_size) + js.game.getWH().h - 110);
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
    x: 1000,
    y: 1000
});


var time = 0;


var bg = [];
for (var i = 0; i < 1000; i++)
    bg.push(game.newImageObject({
        file: "cloud.png",
        scale: 1,
        x: js.math.random(1, 15000, true),
        y: js.math.random(1, 15000, true)


    }));
game.newLoop("1", function () {
    game.clear();
//////////////////////////////////////





    lc.draw();
    if (plane.getPositionC().x <= 0 || plane.getPositionC().y <= 0 || plane.getPositionC().x >= 15000 || plane.getPositionC().y >= 15000)
        game.setLoop("2");
    for (var j = 0; j < bg.length; j++) {
        bg[j].draw()

    }
    js.camera.setPositionC(plane.getPositionC());
    if (js.keyControl.isDown("UP")) {
        if (turbo >= 0) {
            turbo -= 10;
            plane.moveAngle(-8);
        }
    }
    if (js.keyControl.isDown("LEFT"))
        plane.turn(2);
    if (js.keyControl.isDown("RIGHT"))
        plane.turn(-2);
    if (js.keyControl.isDown("SPACE") && reload >= 1000) {
        lc_f = true;
        reload = 0
    }
    if (lc_f) {
        lc.rotateForAngle(js.vector.getAngle2Points(lc.getPositionC(), point(randpos_x, randpos_y)), 2);
        lc.moveAngle(-8)
    }
    else {
        lc.setPositionC(plane.getPositionC());
        lc.setAngle(plane.getAngle());
    }
    plane.moveAngle(-8);
    map.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 110));
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


        rockets[i].rotateForAngle(js.vector.getAngle2Points(lc.getPositionC(), rockets[i].getPositionC()), 1.5);
        rockets[i].moveAngle(-9);
        // cells.push(game.newCircleObject({
        //     radius: 2,
        //     fillColor: "red"}));
        for (l = 0; l < cells.length; l++) {
            cells[l].setPositionS(min_map_point(rockets[i]));
            cells[l].draw()
        }
        rockets[i].draw();
        if (lc_f != false) {
            if (rockets[i].isDynamicIntersect(lc.getDynamicBox())) {
                lc.setPositionC(plane.getPositionC());
                rockets.splice(i, 1);
                lc_f = false
            }
        }
        //

        if (rockets[i].isDynamicInside(plane.getDynamicBox())) {
            game.setLoop("2");
            //if (intersect(plane.getPosition().x, rockets[i].getPositionC().x, plane.getPosition().y, rockets[i].getPositionC().y, 200, 200, 0, 0))
            // var blast = game.newImageObject({
            //     file: "blast.png",
            //     x: plane.getPosition().x,
            //     y: plane.getPosition().y,
            //     scale: 1
            // });
            // blast.draw();
            lc.setPositionC(plane.getPositionC());


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
    reload++;
    if (turbo < 1000)
        turbo++;
    if (turbo < 1000)
        js.brush.drawTextLinesS({
            lines: ["ускорение:" + turbo.toString()],
            x: 10,
            y: 10,
            color: "black",
            size: 40
        });
    else
        js.brush.drawTextLinesS({
            lines: ["полностью заряжено"],
            x: 10,
            y: 10,
            color: "black",
            size: 40
        });
    score++;
    if (reload < 1000)
        js.brush.drawTextLinesS({
            lines: ["ложная цель:" + reload.toString()],
            x: 10,
            y: 100,
            color: "black",
            size: 40
        });
    if (reload >= 1000)
        js.brush.drawTextLinesS({
            lines: ["ложная цель: готово"],
            x: 10,
            y: 100,
            color: "black",
            size: 40
        });
    js.brush.drawTextLinesS({
        lines: ["твой счёт: " + score.toString()],
        x: 10,
        y: 60,
        color: "black",
        size: 30
    });

});
js.game.setLoopSound("1", [audio1]);

game.start();
game.newLoop("2", function () {
    js.brush.drawTextLinesS({
        x: 400,
        y: 100,
        color: "black",
        size: 20,
        lines: ["чтобы сыграть ещё раз нажми кнопу ENTER", "твой счёт: " + score.toString()]


    });

    if (js.keyControl.isDown("ENTER")) {
        location.reload()
    }


    var time = 0;

});
game.newLoop("3", function () {
    js.brush.drawText({
        text: "чтобы начать игру нажми кнопку 'ENTER'",
        x: 400,
        y: 100,
        color: "black",
        size: 20
    });
    if (js.keyControl.isDown("ENTER"))
        game.setLoop("1")
});
game.setLoop("3");

