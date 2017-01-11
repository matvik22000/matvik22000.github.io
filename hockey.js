/**
 * Created by Matvey on 09.01.2017.
 */
js = new PointJS('2d', 1, 1, {background: '#727272'});
js.system.initFullPage();
var game = js.game;
var point = js.vector.point;
var i = 0;
var fon_m = js.audio.newAudio("Музыка для слушания - песня из игры COLLAPSE 1части (mixpromo.net).mp3", 0.2);
var bump = js.audio.newAudio("zvuk-udar_po_metallu.mp3", 1);
var shayba = game.newImageObject({
    file: "shayba.png",
    scale: 1,
    x: 100,
    y: 100,
    angle: js.math.random(135, 160, false)
});
score1 = 0;
score2 = 0;
var p2 = game.newImageObject({
    file: "bita.png",
    scale: 1,
    x: 10
});

var gate1 = game.newRectObject({
    fillColor: "black",
    w: 5,
    h: game.getWH().h
});
gate1.setPositionC(point(game.getWH().w, game.getWH().h / 2));
var gate2 = game.newRectObject({
    x: 5,
    y: 0,
    h: game.getWH().h,
    w: 5,
    fillColor: "black"
});
shayba.setUserData({
    speed: 30
});
var p1 = game.newImageObject({
    file: "bita.png",
    scale: 1
});

js.mouseControl.initMouseControl();
game.newLoop("1", function () {
    i = 0;
    game.clear();
    p2.moveToC(point(40, shayba.getPositionC().y), 10);
    p2.draw();
    if (shayba.isDynamicIntersect(p2.getDynamicBox())){
        bump.replay();
        shayba.setAngle(180 - shayba.getAngle());}
    if (shayba.getPositionC().x >= game.getWH().w){

        game.setLoop("2");}
    gate2.draw();
    if (shayba.getPositionC().x <= 0){

        game.setLoop("3");}
    js.brush.drawText({
        text: "счёт:" + score1.toString() + ":" + score2.toString(),
        x:15,
        y: 10,
        color: "black",
        size: 20
    });
    gate1.setPositionC(point(game.getWH().w - 10, game.getWH().h / 2));
    sx = shayba.getPositionC().x;
    sy = shayba.getPositionC().y;
    p1.setPositionC(js.mouseControl.getPosition());
    if (shayba.getPositionC().y >= game.getWH().h || shayba.getPositionC().y <= 0) {
        shayba.setAngle(-shayba.getAngle());
    }
    gate1.draw();

    shayba.moveAngle(shayba.speed);
    shayba.draw();


    if (p1.getPosition().x < game.getWH().w - 100) {

        p1.setPositionC(point(game.getWH().w - 100, js.mouseControl.getPosition().y))
    }
    if (shayba.isDynamicIntersect(p1.getDynamicBox())){
            bump.replay();
            shayba.setAngle(180 - shayba.getAngle());
        //if ((shayba.getAngle() <= 45 && shayba.getAngle() >= -45) || (shayba.getAngle() >= 135 && shayba.getAngle() <= -135))
        //if ((shayba.getAngle() >= 45 && shayba.getAngle() <= -45) || (shayba.getAngle() <= 135 && shayba.getAngle() >= -135))
        //else
            //shayba.setAngle(-shayba.getAngle())
    }
    p1.draw();
});


game.start();

game.setLoop("1");
game.newLoop("2", function () {
    js.brush.drawText({
        x:game.getWH().w / 2,
        y:100,
        text: "missed!",
        color: "black",
        size: 60
    });
    i ++;
    shayba.setPositionC(point(game.getWH().w / 2, game.getWH().h / 2));
    shayba.draw();
    if (i >= 100) {
        score1++;
        if (score1 >= 10) {
            js.brush.drawText({
                text: "Поражение!",
                x: game.getWH().w / 2,
                y: game.getWH().h / 2 - 100,
                size: 40,
                color: "black"

            });
            var but = js.GUI.newButton({
                x: game.getWH().w / 2, y: game.getWH().h / 2,
                w: 150, h: 45,
                fillColor: "#c4becc",
                text: "играть ещё раз",
                events: {
                    mousePress: function () {
                        location.reload()
                    }
                }

            });
        }
        else
            game.setLoop("1")
    }
});
game.newLoop("3", function () {
    js.brush.drawText({
        x:game.getWH().w / 2,
        y:100,
        text: "goal!",
        color: "black",
        size: 60
    });
    i++;
    shayba.setPositionC(point(game.getWH().w / 2, game.getWH().h / 2));
    shayba.draw();
    if (i >= 100) {
        score2++;
        if (score2 >= 10) {
            js.brush.drawText({
                text: "Победа!",
                x: game.getWH().w / 2,
                y: game.getWH().h / 2 - 100,
                size: 40,
                color: "black"

            });
            var but = js.GUI.newButton({
                x: game.getWH().w / 2, y: game.getWH().h / 2,
                w: 150, h: 45,
                fillColor: "#c4becc",
                text: "играть ещё раз",
                events: {
                    mousePress: function () {
                        location.reload()
                    }
                }
            });
        }
        else

            game.setLoop("1")
    }
});
