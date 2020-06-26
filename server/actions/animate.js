function animateLoop(elem, intervalID, setCurrentState) {
	if (elem) {
		
		setCurrentState(elem.state)

		if (elem.state == 'removible') {
			clearInterval(intervalID)
		}


		if (elem.animation.frameIndex >= elem.animation.maxIndex) {
			if (elem.animation.repeat) {
				elem.animation.frameIndex = 1
			} else {
				clearInterval(intervalID)
			}
		} else {
			elem.animation.frameIndex++
		}


		// elem.animation.frame = elem.animation.frames[elem.animation.frameIndex]
	}
}

module.exports = {
	animate: (elem) => {
		let currentState = elem.state

		const intervalID = setInterval(() => {
			animateLoop(elem, intervalID, setCurrentState)
		}, elem.animation.interval)
		
		const refreshAnimationIntervalID = setInterval(() => {
			if (elem.state == 'removible') clearInterval(refreshAnimationIntervalID)
			if (elem.state != currentState) {
				clearInterval(intervalID)
				const newIntervalID = setInterval(function () {
					animateLoop(elem, newIntervalID, setCurrentState)
				}, elem.animation.interval)
			}
		}, 250)

		function setCurrentState(state) {
			currentState = state
		}

		animateLoop(elem, intervalID, setCurrentState)
	}
}