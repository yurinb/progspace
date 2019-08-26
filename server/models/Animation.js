module.exports = {


	newAnimation: function (state, frame, interval, maxIndex, repeat, animationIndex) {

		let animation = {
			state,
			frame,
			animationIndex,
			frameIndex: 1,
			maxIndex,
			interval,
			repeat
		}

		return animation
	},



}