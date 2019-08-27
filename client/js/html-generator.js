function startScore(units) {
    setInterval(() => {
        let players = []
        for (id in units) {
            if (units[id].isPlayer) players.push(units[id])
        }

        players.sort((a, b) => { return b.score.score - a.score.score })

        players = players.slice(0, 10)

        document.querySelectorAll('.ranking-username').forEach(el => el.parentNode.removeChild(el))
        document.querySelector('.ranking-username-column').insertAdjacentHTML("beforeend",
            players.reduce((acc, player, i) => {
                acc += `
            <div class="ranking-username">
            ` +
                `#` + (i + 1) + ` ` + player.username +
                    `
            </div>
            `
                return acc
            }, "")
        )
        document.querySelectorAll('.ranking-asteroids').forEach(el => el.parentNode.removeChild(el))
        document.querySelector('.ranking-asteroids-column').insertAdjacentHTML("beforeend",
            players.reduce((acc, player, i) => {
                acc += `
            <div class="ranking-asteroids">
            ` +
                    player.score.asteroids +
                    `
            </div>
            `
                return acc
            }, "")
        )
        document.querySelectorAll('.ranking-kills').forEach(el => el.parentNode.removeChild(el))
        document.querySelector('.ranking-kills-column').insertAdjacentHTML("beforeend",
            players.reduce((acc, player, i) => {
                acc += `
            <div class="ranking-kills">
            ` +
                    player.score.kills +
                    `
            </div>
            `
                return acc
            }, "")
        )
        document.querySelectorAll('.ranking-score').forEach(el => el.parentNode.removeChild(el))
        document.querySelector('.ranking-score-column').insertAdjacentHTML("beforeend",
            players.reduce((acc, player, i) => {
                acc += `
            <div class="ranking-score">
            ` +
                    player.score.score +
                    `
            </div>
            `
                return acc
            }, "")
        )
    }, 500)
}