/**
 * Created by Matvey on 09.01.2017.
 */
js = new PointJS('2d', 1, 1, {background: '#CCCCCC'});
js.system.initFullPage();
var game = js.game;
var point = js.vector.point;
var shayba = game.newImageObject({
    file: "shayba.png",
    scale: 1,
    x: 100,
    y: 100,
    angle: 50
});
var gate1 = game.newRectObject({
    fillColor: "black",
    w: 5,
    h: game.getWH().h
});
gate1.setPositionC(point(game.getWH().w, game.getWH().h / 2));

shayba.setUserData({
    speed: 30
});
var p1 = game.newImageObject({
    file: "bita.png",
    scale: 1
});

js.mouseControl.initMouseControl();
game.newLoop("1", function () {
    if (shayba.getPositionC().x >= game.getWH().w)
        game.setLoop("2");

    game.clear();
    gate1.setPositionC(point(game.getWH().w - 10, game.getWH().h / 2));
    sx = shayba.getPositionC().x;
    sy = shayba.getPositionC().y;
    p1.setPositionC(js.mouseControl.getPosition());
    if (shayba.getPositionC().y >= game.getWH().h || shayba.getPositionC().y <= 0) {
        shayba.setAngle(-shayba.getAngle());
    }
    gate1.draw();

    console.log(game.getWH().h);
    console.log(shayba.getPositionC().y);
    shayba.moveAngle(shayba.speed);
    shayba.draw();
    if (shayba.getPosition().x >= game.getWH().w || shayba.getPosition().x <= 0)
        shayba.setAngle(180 - shayba.getAngle());

    if (p1.getPosition().x < game.getWH().w / 2) {

        p1.setPositionC(point(game.getWH().w / 2, js.mouseControl.getPosition().y))
    }
    if (shayba.isDynamicIntersect(p1.getDynamicBox()))
        shayba.setAngle(180 - shayba.getAngle());
    p1.draw();
});


game.start();
game.setLoop("1");
game.newLoop("2", function () {
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
    })
});
