'use strict';
import {colours, difficulties, modes, states} from './declare.js';
import {padZeroes, shuffle} from './helpers.js';

export class MapGame {
    constructor(name, lang) {
        this.id = 0;
        this.name = name;
        this.lang = lang;
        this.regions = [];
        this.board = [];
        this.amount = 0;
        this.empty = {};
        this.errors = {current: 0, extra: 0, total: 0};
        this.current = {index: 0, element: null, name: ''};
        this.state = 0;
        this.boxies = null;
        this.score = 0;
        this.slang = {};
        this.session = 0
    }

    refresh() {
        this.current.element = this.board[this.current.index];
        this.current.name = this.current.element.data('name')
    }

    start() {
        for (let i = 0; i < this.board.length; i++) {
            let region = this.board[i];
            let name = region.data('name');
            region.attr('fill', colours.base);
            if (name in this.empty) {
                this.empty[name].attr('fill', colours.base)
            }
        }
        this.current.index = 0;
        this.session += 1;
        this.state = states.started;
        this.refresh();
        this.errors.current = 0;
        this.errors.extra = 0;
        this.errors.total = 0;
        this.boxies.forEach(element = > {element.style.background = colours.base
    })
        ;shuffle(this.board)
    }
}

export class Settings {
    constructor() {
        this.difficulty = difficulties.normal;
        this.mode = modes.regions;
        this.lang = '';
        this.colourCorrect = true;
        this.limitErrors = true;
        this.showRegionName = true
    }

    change() {
        switch (this.difficulty) {
            case difficulties.normal:
                this.colourCorrect = true;
                this.limitErrors = true;
                this.showRegionName = true;
                break;
            case difficulties.hard:
                this.colourCorrect = true;
                this.limitErrors = false;
                this.showRegionName = false;
                break;
            case difficulties.extreme:
                this.colourCorrect = false;
                this.limitErrors = false;
                this.showRegionName = false;
                break;
        }
    }
}

export class Hymn {
    constructor() {
        this.audio = null;
        this.on = true
    }

    play() {
        if (!this.on) {
            return
        }
        if (this.audio === null) {
            return
        }
        setTimeout(() = > {if(this.audio.paused
    )
        {
            this.audio.play()
        }
    },
        150
    )
    }

    stop() {
        if (!this.on) {
            return
        }
        if (this.audio === null) {
            return
        }
        this.audio.pause();
        this.audio.currentTime = 0
    }
}

export class Timer {
    constructor(element) {
        this.total = 0;
        this.text = '';
        this.interval = null;
        this.on = true;
        this.element = element
    }

    start() {
        if (this.off === false) {
            return
        }
        this.total = 0;
        this.element.classList.remove('blue');
        clearInterval(this.interval);
        this.interval = setInterval(() = > {this.tick()
    },
        10
    )
    }

    stop() {
        clearInterval(this.interval);
        this.element.classList.add('blue')
    }

    tick() {
        this.total++;
        let ms = padZeroes(this.total % 100, 2);
        let s = padZeroes(parseInt(this.total % 6000 / 100), 2);
        let m = padZeroes(parseInt(this.total / 6000), 2);
        this.text = m + ':' + s + '.' + ms;
        this.element.innerHTML = this.text
    }
}

export class Zoom {
    constructor() {
        this.panzoom = null;
        this.on = true
    }

    toggle() {
        if (this.on) {
            this.panzoom.enable()
        } else {
            this.panzoom.zoomTo(0);
            this.panzoom.disable()
        }
        this.on = !this.on
    }
}

export class Sound {
    constructor(elements) {
        this.on = true;
        this.elements = elements;
        this.pack = 'default'
    }

    play(sound) {
        if (!this.on) {
            return
        }
        let audio = document.createElement('audio');
        audio.src = '/sounds/' + sound + '.ogg';
        audio.play()
    }

    toggle() {
        this.on = !this.on;
        for (let element of this.elements) {
            element.checked = this.on
        }
        if (this.on) {
            this.play(this.pack + '_beep')
        }
    }
}