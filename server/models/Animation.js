module.exports = {


    newAnimation: function (state, frames, interval, repeat) {

        let animation = {
            state,
            frames,
            frame:{},
            frameIndex: 0,
            interval,
            repeat
        }

        return animation
    },



}