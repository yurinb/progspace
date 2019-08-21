function animateLoop(elem, intervalID) {
	if (elem) {
		if (elem.state != elem.animation.state) {
			elem.animation.frameIndex = -1
			clearInterval(intervalID)
			
			let newIntervalID = setInterval(function () {
				animateLoop(elem, newIntervalID)
			}, elem.animation.interval)
		}

		elem.animation.frameIndex++

		if (elem.animation.frameIndex >= elem.animation.frames.length) {
			if (elem.animation.repeat) {
				elem.animation.frameIndex = 0
			} else {
				elem.animation.frameIndex = elem.animation.frames.length - 1
				clearInterval(intervalID)
			}
		}
		elem.animation.frame = elem.animation.frames[elem.animation.frameIndex]
	}
}

module.exports = {
	animate: (elem) => {
		let intervalID = setInterval(function () {
			animateLoop(elem, intervalID)
		}, elem.animation.interval)
		animateLoop(elem, intervalID)
	}
}