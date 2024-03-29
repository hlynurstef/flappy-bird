
/**
 * Key codes we're interested in.
 */
var KEYS = {
    32: 'space',
    1:  'leftClick',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

/**
 * A singleton class which abstracts all player input,
 * should hide complexity of dealing with keyboard, mouse
 * and touch devices.
 * @constructor
 */
class Controls {
    constructor (game) {
        this.game = game;
        this._didJump = false;
        this.showCollisions = false;
        this.keys = {};
        $(window).on('keydown', this._onKeyDown.bind(this))
                    .on('keyup', this._onKeyUp.bind(this));
        $(window).on('mousedown', this._onMouseDown.bind(this))
                    .on('mouseup', this._onMouseUp.bind(this));
    }

    _onKeyDown (e) {
        if (e.keyCode === 67) {
            this.showCollisions = !this.showCollisions;
        }

        if (e.keyCode === 77) {
            this.game.gameSounds.toggleAudio();
        }

        if (this.game.currentState !== this.game.states.gameover) {
            // Only jump if space wasn't pressed.
            if (e.keyCode === 32 && !this.keys.space) {
                this._didJump = true;
            }
            // Remember that this button is down.
            if (e.keyCode in KEYS) {
                var keyName = KEYS[e.keyCode];
                this.keys[keyName] = true;
                return false;
            }
        }
    }

    _onKeyUp (e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    }

    _onMouseDown (e) {
        if (this.game.currentState !== this.game.states.gameover) {
            if (e.which === 1 && !this.keys.leftClick) {
                this._didJump = true;
            }

            // Remember that this button is down.
            if (e.which in KEYS) {
                var keyName = KEYS[e.which];
                this.keys[keyName] = true;
                return false;
            }
        }
    }

    _onMouseUp (e) {
        if (e.which in KEYS) {
            var keyName = KEYS[e.which];
            this.keys[keyName] = false;
            return false;
        }

    }

    /**
     * Only answers true once until a key is pressed again.
     */
    didJump () {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    }
}    

