import path from 'path'
import url from 'url'

import { createRequire } from 'module'
import * as snarkjs from 'snarkjs'
const buildPath = '../zksnarkBuild'
const circuitName = 'main'
const require = createRequire(import.meta.url)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const circuitWasmPath = path.join(
    __dirname,
    buildPath,
    `${circuitName}.wasm`
)
const zkeyPath = path.join(__dirname, buildPath, `${circuitName}.zkey`)
const vkey = require(path.join(buildPath, `${circuitName}.vkey.json`))

const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
        product: 32,
        factor: [2,2,2,2,2]
    },
    circuitWasmPath,
    zkeyPath
)

const valid = await snarkjs.groth16.verify(vkey, publicSignals, proof)

console.log('snark proof: ', proof)
console.log('snark public signals: ', publicSignals)
console.log('is the proof valid?', valid)
process.exit(0)