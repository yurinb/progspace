module.exports = {


	newAnimation: function (state, frame, interval, maxIndex, repeat, animationIndex) {

		let animation = {
			state,
			frame,
			animationIndex,
			frameIndex: 0,
			maxIndex,
			interval,
			repeat
		}

		return animation
	},



}