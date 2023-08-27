document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', ev => {
        if (ev.target.tagName !== 'A') {
            show(ev)
            play()
        }
    })

    document.querySelector('.xf-btnMusic').addEventListener('click', () => {
        setInterval(() => {
            play()
        }, 400);
    })

    let si = 0

    const show = ev => {
        const x = ev.pageX,
            y = ev.pageY,
            ss = '♪ ♩ ♫ ♬ ¶ ‖ ♭ ♯ § ∮'.split(' '),  
            $b = document.createElement('strong')

        $b.innerText = ss[si]  
        si = (si + 1) % ss.length

        $b.style.top = `${y - 20}px`
        $b.style.left = `${x}px`
        $b.style.zIndex = '99999999'
        $b.style.position = 'absolute'
        $b.style.userSelect = 'none'
        $b.style.fontSize = `${16 + 24 * Math.random()}px`
        $b.style.color = `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`

        document.body.appendChild($b)
        $b.animate(
            [
                { top: `${y - 20}px`, opacity: 1 },
                { top: `${y - 120}px`, opacity: 0 }
            ],
            { duration: 600, fill: 'forwards' }
        ).onfinish = () => {
            $b.remove()
        }
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const sheet = '880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 659 698 659 698 1046 659 1046 1046 1046 987 698 698 987 987 880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 698 1046 987 1046 1174 1174 1174 1046 1046 880 987 784 880 1046 1174 1318 1174 1318 1567 1046 987 1046 1318 1318 1174 784 784 880 1046 987 1174 1046 784 784 1396 1318 1174 659 1318 1046 1318 1760 1567 1567 1318 1174 1046 1046 1174 1046 1174 1567 1318 1318 1760 1567 1318 1174 1046 1046 1174 1046 1174 987 880 880 987 880'.split(' ')
    let ctx, i = 0

    const play = () => {
        if (AudioContext) {
            if (!sheet[i]) {
                i = 0
            }

            if (!ctx) {
                ctx = new AudioContext()
            }

            const c = ctx.createOscillator(),
                l = ctx.createGain(),
                m = ctx.createGain()

            c.connect(l)  
            l.connect(m)
            m.connect(ctx.destination)

            m.gain.setValueAtTime(1, ctx.currentTime)

			c.type = 'triangle'
            c.frequency.value = sheet[i++]

            l.gain.setValueAtTime(0, ctx.currentTime)  
            l.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.01)

            c.start(ctx.currentTime)
            l.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1)
            c.stop(ctx.currentTime + 1)
        }
    }
})