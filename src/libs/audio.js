'use strict';

var GT = {
  Sound: null
};

(function(exports) {

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    (function() {
        if (window.AudioContext) {
            var proto = window.AudioContext.prototype;
            proto.createGain = proto.createGain || proto.createGainNode
            proto.createDelay = proto.createDelay || proto.createDelayNode
        }
    })();

    var noop = function() {
        // do nothing
    };

    var Sound = function(options) {
        var superClass;
        if (options.useWebAudio && window.AudioContext) {
            superClass = WebAudioWrap;
        } else {
            superClass = AudioWrap;
        }
        for (var p in superClass.prototype) {
            this[p] = superClass.prototype[p];
        }
        superClass.call(this, options);
        // console.log(this.constructor);
        // this.constructor = Sound;
        this.init();
    };

    Sound.prototype = {
        constructor: Sound,
        id: 1,
        tag: null,
        channel: 1,
        useWebAudio: true,
    };


    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    var WebAudioWrap = function(options) {
        for (var key in options) {
            this[key] = options[key]
        }
    };

    WebAudioWrap.prototype = {
        constructor: WebAudioWrap,

        context: null,
        gain: null,
        source: null,
        audio: null,
        buffer: null,

        src: null,
        loaded: false,
        error: false,
        playing: false,
        currentTime: 0,
        loop: false,
        volume: 1,
        muted: false,

        beginTime: 0,
        endTime: 0,
        playTime: 0,

        onended: null,

        init: function() {
            this.context = this.context || Sound.context;
            this.gain = this.context.createGain();
            this.gain.connect(this.context.destination);

            this.currentTime = 0;
            Sound.set(this.id, this);

            if (this.audio) {
                this.initAudio();
            }
        },

        initAudio: function() {
            var Me = this;
            var context = this.context;
            if (this.buffer) {
                this.totalDuration = this.buffer.duration;
            } else if (this.audio) {
                this.totalDuration = this.audio.duration;
            }
            this.initRange();
        },

        initRange: function() {
            this.beginTime = Math.min(this.beginTime, this.totalDuration);
            if (this.endTime) {
                this.endTime = Math.min(this.endTime, this.totalDuration);
                this.duration = this.endTime - this.beginTime;
                this.sprite = true;
            } else if (this.duration) {
                this.endTime = Math.min(this.beginTime + this.duration, this.totalDuration);
                this.duration = this.endTime - this.beginTime;
                this.sprite = true;
            } else {
                this.sprite = false;
                this.duration = this.duration || this.totalDuration;
            }
        },

        load: function() {
            if (this.loaded === true) {
                return false;
            }

            var Me = this;
            Me.loaded = false;
            Me.error = false;
            var onLoad = function(event) {
                Me.context.decodeAudioData(xhr.response, function(buffer) {
                    Me.loaded = true;
                    Me.error = false;
                    Me.buffer = buffer;
                    Me.initAudio();
                    Me.onLoad(Me.source);
                    xhr.onload = null;
                    xhr.onerror = null;
                }, onError);
            };
            var onError = function(event) {
                Me.loaded = false;
                Me.error = true;
                Me.onLoadError(event);
                xhr.onload = null;
                xhr.onerror = null;
            };

            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.src, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = onLoad
            xhr.onerror = onError;
            xhr.send(null);
        },

        onLoad: function(source) {
            // console.log("Load " + this.src + " ... OK.  WebAudio:" + this.useWebAudio);
        },
        onLoadError: function(event) {
            console.log("Load " + this.src + " ... Failed");
        },

        play: function(ifNotPlay) {
            if (ifNotPlay && this.playing) {
                return;
            }
            if (this.channel <= 1 && this.source && this.playing) {
                this.source.stop(0);
            }
            this.currentTime = 0;
            this.resume();
        },
        pause: function() {
            this.currentTime += this.context.currentTime - this.playTime;
            this.source.stop(0);
            this.playing = false;
        },
        resume: function() {
            this.playTime = this.context.currentTime;
            var source;
            if (this.audio) {
                source = this.context.createMediaElementSource(this.audio);
            } else {
                // } else if (this.buffer) {
                source = this.context.createBufferSource();
                source.buffer = this.buffer;
            }
            this.source = source;
            source.connect(this.gain);
            source.loop = !!this.loop;
            if (this.onended) {
                source.onended = this.onended;
            }
            this.setVolume(this.volume);
            this.setMute(this.muted);

            if (this.endTime) {
                source.loopStart = this.beginTime;
                source.loopEnd = this.endTime;
            }
            var offset = this.beginTime + this.currentTime;
            if (this.loop) {
                if (this.endTime && offset >= this.endTime) {
                    offset = this.beginTime;
                }
                this.source.start(0, offset);
            } else {
                var duration;
                if (this.endTime) {
                    if (offset >= this.endTime) {
                        return;
                    }
                    duration = this.endTime - offset;
                } else {
                    duration = this.totalDuration;
                }
                this.source.start(0, offset, duration);
            }
            this.playing = true;
        },

        stop: function() {
            if (this.playing) {
                this.source.stop(0);
            }
            this.currentTime = 0;
            this.playTime = 0;
            this.playing = false;
        },

        getCurrentTime: function() {
            return this.currentTime;
        },

        setCurrentTime: function(time) {
            this.pause();
            this.currentTime = time;
            this.resume();
        },

        getDuration: function() {
            return this.duration;
        },

        isLoop: function() {
            return this.loop;
        },
        setLoop: function(loop) {
            this.loop = loop;
            this.source.loop = loop;
        },

        getVolume: function(volume) {
            return this.volume;
        },
        setVolume: function(volume) {
            this.volume = volume;
            this.gain.gain.value = this.volume;
        },
        isMuted: function() {
            return this.muted;
        },
        setMute: function(muted) {
            muted = this.muted = !!muted;
            if (muted) {
                this.gain.gain.value = 0;
            } else {
                this.gain.gain.value = this.volume;
            }
        },

    };


    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////


    var AudioWrap = function(options) {
        for (var key in options) {
            this[key] = options[key]
        }
    };

    AudioWrap.prototype = {
        constructor: AudioWrap,

        audio: null,
        channel: 1,
        lazyClone: false,

        src: null,
        loaded: false,
        error: false,
        playing: false,
        currentTime: 0,
        loop: false,
        volume: 1,
        muted: false,

        duration: 0,
        beginTime: 0,
        endTime: 0,


        init: function() {
            if (!this.audio) {
                this.audio = new Audio();

                this.audio.volume = this.volume;
                this.audio.muted = this.muted;
                this.audio.loop = this.loop;

                this.audio.preload = "auto";
                this.audio.autoplay = false;
                this.audio.autobuffer = true;

                this.audio.src = this.src;
            }


            if (this.channel <= 1) {
                this.play = this.play || this.playSingle;
            } else {
                this.pool = [];
                this.pool.push(this.audio);
                this.audio._index = this.pool.length;
                this.play = this.play || this.playMulti;
            }
            this.index = 0;

            Sound.set(this.id, this);
        },

        initAudio: function() {
            this.totalDuration = this.audio.duration;
            this.initRange();

            if (this.sprite) {
                var Me = this;
                this.onTimeUpdate = function(event) {
                    Me.spriteHandler(event);
                };
                this.audio.addEventListener('timeupdate', this.onTimeUpdate, false);
            }

            if (this.channel > 1) {
                if (!this.lazyClone) {
                    for (var i = 1; i < this.channel; i++) {
                        this.cloneAudio();
                    }
                }
            }
        },

        initRange: function() {
            this.beginTime = Math.min(this.beginTime, this.totalDuration);
            if (this.endTime) {
                this.endTime = Math.min(this.endTime, this.totalDuration);
                this.duration = this.endTime - this.beginTime;
                this.sprite = true;
            } else if (this.duration) {
                this.endTime = Math.min(this.beginTime + this.duration, this.totalDuration);
                this.duration = this.endTime - this.beginTime;
                this.sprite = true;
            } else {
                this.sprite = false;
                this.duration = this.duration || this.totalDuration;
            }
        },

        spriteHandler: function(event) {
            var audio = event.target;
            if (audio.currentTime >= this.endTime && !audio.paused) {
                audio.pause();
                if (!this.loop) {
                    // console.log(audio._index, "paused");
                    // audio.removeEventListener('timeupdate', this.onTimeUpdate);
                    return true;
                }
                audio.currentTime = this.beginTime;
                audio.play();
            }
            return false;
        },

        load: function() {
            if (this.loaded === true) {
                return false;
            }

            var Me = this;
            Me.loaded = false;
            Me.error = false;
            var onLoad = function() {
                Me.loaded = true;
                Me.error = false;
                Me.initAudio();
                Me.onLoad(Me.audio);
                Me.audio.removeEventListener("canplaythrough", onLoad);
                Me.audio.removeEventListener("error", onError);
            };
            var onError = function(event) {
                Me.loaded = false;
                Me.error = true;
                Me.onLoadError(event);
                Me.audio.removeEventListener("canplaythrough", onLoad);
                Me.audio.removeEventListener("error", onError);
            };

            this.audio.addEventListener("canplaythrough", onLoad);
            this.audio.addEventListener("error", onError);

            // this.audio.src = this.src;
            this.audio.load();
        },

        onLoad: function() {
            // console.log("Load " + this.src + " ... OK.  WebAudio:" + this.useWebAudio);
        },
        onLoadError: function(event) {
            console.log("Load " + this.src + " ... Failed");
        },

        play: null,

        pause: function() {
            this.currentTime = this.audio.currentTime - this.beginTime;
            this.playing = false;
            this.audio.pause();
        },
        resume: function() {
            if (this.loaded) {
                this.audio.currentTime = this.beginTime + this.currentTime;
                this.audio.play();
            }
            this.playing = true;
        },
        stop: function() {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.currentTime = 0;
            this.playing = false;
        },

        getCurrentTime: function() {
            return this.audio.currentTime - this.beginTime;
        },

        setCurrentTime: function(time) {
            this.currentTime = time;
            this.audio.currentTime = this.beginTime + time;
        },

        getDuration: function() {
            return this.duration;
        },
        isLoop: function() {
            return this.loop;
        },
        setLoop: function(loop) {
            this.loop = loop;
            if (this.pool) {
                this.pool.forEach(function(audio) {
                    audio.loop = loop;
                });
            } else {
                this.audio.loop = loop;
            }
        },
        getVolume: function(volume) {
            return this.volume;
        },
        setVolume: function(volume) {
            this.volume = volume;
            if (this.pool) {
                this.pool.forEach(function(audio) {
                    audio.volume = volume;
                });
            } else {
                this.audio.volume = volume;
            }
        },

        isMuted: function() {
            return this.muted;
        },

        setMute: function(muted) {
            muted = this.muted = !!muted;
            var Me = this;
            if (this.pool) {
                this.pool.forEach(function(audio) {
                    audio.muted = muted;
                });
            } else {
                this.audio.muted = muted;
            }
        },

        ////////////////////////////////////////////////////////////


        playSingle: function(ifNotPlay) {
            if (ifNotPlay && this.playing) {
                return;
            }
            if (this.channel <= 1) {
                this.audio.pause();
            }
            this.currentTime = 0;
            this.resume();
        },

        playMulti: function(ifNotPlay) {
            if (ifNotPlay && this.playing) {
                return;
            }
            if (this.pool.length <= this.index) {
                this.cloneAudio();
            }
            this.audio = this.pool[this.index];
            this.index = (++this.index) % this.channel;
            this.currentTime = 0;
            this.resume();
        },

        cloneAudio: function() {
            var _a = this.audio.cloneNode();
            _a.loop = this.loop;
            _a.volume = this.volume;
            _a.muted = !!this.muted;
            if (this.sprite) {
                _a.addEventListener('timeupdate', this.onTimeUpdate, false);
            }
            this.pool.push(_a);
            _a._index = this.pool.length;
            return _a;
        },

    };


    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////


    Sound.createContext = function() {
        var context = new AudioContext();
        context.gain = context.createGain();
        context.gain.gain.value = 1;
        context.gain.connect(context.destination);
        return context;
    };
    if (window.AudioContext) {
        Sound.context = Sound.createContext();
        Sound.supportWebAudio = true;
    }

    Sound.activateContext = function(context) {
        context = context || Sound.context;
        if (!context || context && context.currentTime > 0) {
            return false;
        }
        var source = context.createBufferSource();
        source.buffer = context.createBuffer(2, 22050, 22050);
        var gain = context.createGain();
        gain.gain.value = 0;
        gain.connect(context.destination);
        source.connect(gain);
        source.start(0);
        Sound.activateContext.played = true;
        return source;
    };
    // Sound.activateContext();

    var _soundPool = {};

    Sound.get = function(id) {
        return _soundPool[id];
    };
    Sound.set = function(id, sound) {
        _soundPool[id] = sound;
        return sound;
    };
    Sound.clear = function() {
        _soundPool = {};
    };
    Sound.remove = function(id) {
        var s = _soundPool[id];
        delete _soundPool[id];
        return s;
    };
    Sound.size = function() {
        var keys = Object.keys(_soundPool);
        return keys.length;
    };
    Sound.getAll = function() {
        return _soundPool;
    };

    var methods = ["play", "stop", "pause", "resume", "setMute", "isMuted", "setVolume", "getVolume"];

    methods.forEach(function(name) {
        // Sound[name]=function(args){
        //  var id=arguments[0];
        //  var s=Sound.get(id);
        //  if (s && s.audio){
        //      args=Array.prototype.slice.call(arguments,1);
        //      return s[name].apply(s,args);
        //  }
        //  console.log("Sound."+name, id , "failed");
        // }

        Sound[name] = function(id, arg) {
            var s = Sound.get(id);
            if (s && s[name]) {
                return s[name](arg);
            }
            // console.log("Sound."+name, id , "failed");
        }
    });

    Sound.muted = false;

    Sound.setMuteGlobal = function(mute, exclude, isExcludeByTag) {
        mute = !!mute;
        for (var id in _soundPool) {
            if (isExcludeByTag !== true && id === exclude) {
                continue;
            }
            var s = _soundPool[id];
            if (isExcludeByTag === true) {
                if (("tag" in s) && s.tag === tag) {
                    continue;
                }
            }
            s.setMute(mute);
        }
        Sound.muted = mute;
    };


    Sound.setMuteByTag = function(tag, mute) {
        mute = !!mute;
        for (var id in _soundPool) {
            var s = _soundPool[id];
            if (s.tag === tag) {
                s.setMute(mute);
            }
        }
        Sound[tag + "Muted"] = mute;
    };

    Sound.smartPlay = function(id, interval) {
        var s = Sound.get(id);
        if (!s || s.loaded !== true) {
            return false;
        }
        interval = interval || interval === 0 ? interval : 30;
        var t = Sound.smartPlay.timer[id];
        var now = Date.now();
        if (!t || now - t > interval) {
            Sound.smartPlay.timer[id] = now;
            try {
                s.play();
            } catch (e) {
                console.log("Sound.smartPlay ERROR:", s.id, e);
            }
            return true;
        }
        return false;
    };

    Sound.smartPlay.timer = {};

    // uncomment below to remove sound play for ignoring sound
    // Sound.smartPlay = Sound.play = Sound.stop = function (){}


    var _waitingForTouchLoad = [];
    var _onAudioLoaded = function(event) {
        var audio = event.target;
        audio.loaded = true;
        audio.error = false;
        audio.removeEventListener("canplaythrough", _onAudioLoaded);
    };
    Sound.loadSounds = function(sounds, useWebAudio) {
        for (var i = 0; i < sounds.length; i++) {
            var soundInfo = sounds[i];
            soundInfo.useWebAudio = useWebAudio !== false && Sound.supportWebAudio;
            var sound = new Sound(soundInfo);
            sound.load();
        }
    };

    Sound.setTouchLoadSounds = function(sounds, useWebAudio) {
        for (var i = 0; i < sounds.length; i++) {
            var soundInfo = sounds[i];
            soundInfo.useWebAudio = useWebAudio !== false && Sound.supportWebAudio;
            var sound = new Sound(soundInfo);
            sound.load();
            _waitingForTouchLoad.push(sound);
        }
    };

    Sound.touchLoad = function() {
        if (_waitingForTouchLoad.length < 1) {
            return;
        }
        var sound = _waitingForTouchLoad.shift();
        if (sound.loaded) {
            // console.log("Sound.touchLoad: loaded");
            return;
        }
        if (sound.tagName === "AUDIO") {
            sound.addEventListener("canplaythrough", _onAudioLoaded);
        }
        sound.load();
    };

    GT.Sound = Sound;

}(GT));

export { GT as GT};