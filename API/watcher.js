import { spawn } from 'node:child_process'
import { watch } from 'node:fs/promises'

const [node, _, file] = process.argv

function spawnNode () {
	const pr = spawn(node, [file])

	pr.stdout.pipe(process.stdout)
	pr.stderr.pipe(process.stderr)
	
	pr.on('close', (code) => {
		if (code !== null)
			process.exit(code)
	})

	return (pr)
}

let nodeChild = spawnNode()

const watcher = watch('./', {recursive:true})

for await (const file of watcher) {
	if (file.filename.endsWith('.js')) {
		nodeChild.kill('SIGKILL')
		nodeChild = spawnNode()
	}
}