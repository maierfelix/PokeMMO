//
// Web Audio and 3D Soundscapes: Implementation
// http://gamedev.tutsplus.com/tutorials/web-audio-and-3d-soundscapes-implementation--cms-22651
//
(function(){
	if (window.AudioContext === undefined) {
		return
	}

	// Helper function.
	function is(o, c) {
		if (o === null || o === undefined) {
			return false
		}

		if (c === null || c === undefined) {
			return false
		}

		if (c === Number) {
			if (o.constructor === c) {
				return isNaN(o) === false
			}

			return false
		}

		return o.constructor === c
	}

	//
	// AudioPlayer constructor.
	//
	function AudioPlayer() {
		if (this.constructor !== AudioPlayer) {
			return
		}

		var m_this = this
		var m_context = new AudioContext()
		var m_gain = m_context.createGain()

		// Sounds will connect to this gain node.
		m_gain.connect(m_context.destination)

		// The common coordinate system used with WebGL.
		// The listener is always facing down the negative Z axis, the
		// positive Y axis points up, the positive X axis points right.
		m_context.listener.setOrientation(0, 0, -1, 0, 1, 0)
		
		var m_loader = new XMLHttpRequest()
		var m_queue = []   // <String>
		var m_buffers = {} // <String,AudioBuffer>
		var m_sounds = {}  // <String,Sound>
		var m_counter = 0

		this.IO_ERROR = 1
		this.DECODING_ERROR = 2

		this.errorText = null
		this.errorType = null
		this.onloadstart = null
		this.onloaderror = null
		this.onloadcomplete = null

		//
		// Loads a sound file.
		// The source paths are queued and loaded sequentially.
		//
		// src: The source path of the sound file to load.
		//
		this.load = function(src) {
			if (is(src, String) === false) {
				throw new Error("Parameter 'src' must be a String")
			}
			
			if (m_queue.push(src) === 1) {
				load()
			}
		}

		//
		// Creates a new sound and returns an identifier for the sound.
		//
		// src: The source path of the sound file the new sound will use.
		//
		this.create = function(src) {
			if (is(src, String) === false) {
				throw new Error("Parameter 'src' must be a String")
			}

			if (m_buffers[src] === undefined) {
				throw new Error("Sound file has not been loaded: " + src)
			}

			var snd = "snd:" + (m_counter++)

			m_sounds[snd] = new Sound()
			m_sounds[snd].snd = snd
			m_sounds[snd].buffer = m_buffers[src]
			
			return snd
		}

		//
		// Destroys a previously created sound. The sound identifier returned
		// from the create() function will be invalidated.
		//
		// snd: The sound identifier.
		//
		this.destroy = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			if (o.source !== null) {
				if (o.source.loop) {
					o.source.stop()
				}
			}

			delete m_sounds[snd]
		}

		//
		// Plays a sound.
		//
		// snd:  The sound identifier.
		// loop: Indicates if the sound should loop. (optional, default = false)
		//
		this.play = function(snd, loop) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			if (is(loop, Boolean) === false) {
				loop = false
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			if (o.playing) {
				o.source.stop()
			}

			o.source = m_context.createBufferSource()
			o.panner = m_context.createPanner()

			o.source.buffer = o.buffer
			o.source.loop = loop
			o.source.onended = onSoundEnded

			// This is a bit of a hack but we need to reference the sound
			// object in the onSoundEnded event handler, and doing things
			// this way is more optimal than binding the handler.
			o.source.sound = o
			
			o.panner.panningModel = "HRTF"
			o.panner.distanceModel = "linear"
			o.panner.setPosition(o.x, o.y, o.z)

			o.source.connect(o.panner)
			o.panner.connect(m_gain)

			o.source.start()
			
			o.playing = true
		}

		//
		// Stops a sound playing.
		//
		// snd: The sound identifier.
		//
		this.stop = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			if (o.playing) {
				o.source.stop()
			}
		}

		//
		// Indicates if a sound is playing.
		//
		// src: The sound identifier.
		//
		this.isPlaying = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			return o.playing
		}

		//
		// Sets the X position of the sound.
		//
		// src: The sound identifier.
		// x:   The position.
		//
		this.setX = function(snd, x) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			if (is(x, Number) === false) {
				throw new Error("Parameter 'x' must be a Number")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			o.x = x

			if (o.panner !== null) {
				o.panner.setPosition(o.x, o.y, o.z)
			}
		}

		//
		// Returns the X position of a sound.
		//
		// src: The sound identifier.
		//
		this.getX = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			return o.x
		}

		//
		// Sets the Y position of the sound.
		//
		// src: The sound identifier.
		// y:   The position.
		//
		this.setY = function(snd, y) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			if (is(y, Number) === false) {
				throw new Error("Parameter 'y' must be a Number")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			o.y = y

			if (o.panner !== null) {
				o.panner.setPosition(o.x, o.y, o.z)
			}
		}

		//
		// Returns the Y position of the sound.
		//
		// src: The sound identifier.
		//
		this.getY = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			return o.y
		}

		//
		// Sets the Z position of the sound.
		//
		// src: The sound identifier.
		// z:   The position.
		//
		this.setZ = function(snd, z) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			if (is(z, Number) === false) {
				throw new Error("Parameter 'z' must be a Number")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			o.z = z

			if (o.panner !== null) {
				o.panner.setPosition(o.x, o.y, o.z)
			}
		}

		//
		// Returns the Z position of the sound.
		//
		// src: The sound identifier.
		//
		this.getZ = function(snd) {
			if (is(snd, String) === false) {
				throw new Error("Parameter 'snd' must be a String")
			}

			var o = m_sounds[snd]

			if (o === undefined) {
				throw new Error("Parameter 'snd' is invalid")
			}

			return o.z
		}

		//
		// Sets the position of a sound.
		//
		// src: The sound identifier.
		// x:   The X position.
		// y:   The Y position.
		// z:   The Z position.
		//
		this.setPosition = function(snd, x, y, z) {
			m_this.setX(snd, x)
			m_this.setY(snd, y)
			m_this.setZ(snd, z)
		}

		//
		// Sets the volume level of the audio player.
		//
		// volume: The volume. (min = 0.0, max = 1.0)
		// time:   The amount of time, in seconds, that the current
		//         volume level should take to reach the new volume level.
		//         (optional, default = 0.01, min = 0.01, max = 120.0)
		//
		this.setVolume = function(volume, time) {
			if (is(volume, Number) === false) {
				throw new Error("Parameter 'volume' must be a Number")
			}

			volume = clamp(volume, 0.0, 1.0)

			if (is(time, Number) === false) {
				time = 0.01
			} else {
				time = clamp(time, 0.01, 120.0)
			}

			var currentTime = m_context.currentTime
			var currentVolume = m_gain.gain.value

			m_gain.gain.cancelScheduledValues(0.0)
			m_gain.gain.setValueAtTime(currentVolume, currentTime)
			m_gain.gain.linearRampToValueAtTime(volume, currentTime + time)
		}

		//
		// Returns the volume level of the audio player.
		//
		this.getVolume = function() {
			return m_gain.gain.value
		}

		//
		// Private.
		//
		function load() {
			m_this.errorText = null
			m_this.errorType = null
			
			if (m_queue.length === 0 || m_loader.readyState !== 0) {
				return
			}

			m_loader.open("GET", m_queue[0])
			m_loader.responseType = "arraybuffer"
			m_loader.onload = onLoad
			m_loader.send()
		}

		//
		// Private.
		// This function will be scoped to the m_loader object.
		//
		function onLoad(event) {
			var data = m_loader.response
			var status = m_loader.status

			// Reset the loader.
			m_loader.abort()

			// Anything higher than 400 will indicate an error.
			if (status < 400) {
				m_context.decodeAudioData(data, onDecode, onDecodeError)
				return
			}

			var src = m_queue.shift()

			// Clear the queue.
			m_queue = []

			m_this.errorText = "Failed to load sound file: " + src
			m_this.errorType = m_this.IO_ERROR

			if (is(m_this.onloaderror, Function)) {
				m_this.onloaderror()
			} else {
				window.console.error(m_this.errorText)
			}
		}

		//
		// Private.
		// This function will be scoped to the window object.
		//
		function onDecode(buffer) {
			var src = m_queue.shift()

			// Store the audio buffer.
			m_buffers[src] = buffer

			// Break the loading loop if the queue is empty.
			if (m_queue.length === 0) {
				if (is(m_this.onloadcomplete, Function)) {
					m_this.onloadcomplete()
				}
			}

			load()
		}

		//
		// Private.
		// This function will be scoped to the window object.
		//
		function onDecodeError() {
			var src = m_queue[0]

			// Clear the queue.
			m_queue = []

			m_this.errorText = "Failed to decode sound file: " + src
			m_this.errorType = m_this.DECODING_ERROR
			
			if (is(m_this.onloaderror, Function)) {
				m_this.onloaderror()
			} else {
				window.console.error(m_this.errorText)
			}
		}

		//
		// Private.
		// This function will be scoped to an AudioSourceBufferNode object.
		//
		function onSoundEnded() {
			var o = this.sound
			
			o.panner.disconnect()
			o.source.disconnect()
			o.source.onended = null

			o.playing = false
		}
	}

	//
	// Sound constructor.
	//
	function Sound() {
		this.x = 0.0
		this.y = 0.0
		this.z = 0.0
		this.snd = null    // String (sound identifier)
		this.buffer = null // AudioBuffer
		this.source = null // AudioBufferSourceNode
		this.panner = null // PannerNode
		this.playing = false
	}

	//
	// Expose the AudioPlayer constructor as a read-only property.
	//
	Object.defineProperty(window, "AudioPlayer", {
		value: AudioPlayer
	})
})()

export { AudioPlayer as AudioPlayer };