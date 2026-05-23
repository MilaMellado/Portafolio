<template>
  <!-- Le agregamos min-h-[500px] para que no se aplaste -->
  <div class="w-full min-h-[500px] flex flex-col items-center justify-center bg-neutral-900 rounded-3xl relative overflow-hidden shadow-2xl border border-purple-500/30">
    
    <div class="absolute top-6 text-center z-20 pointer-events-none">
      <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wider">
        DESINTEGRADOR 3D
      </h2>
      <p class="text-gray-400 text-xs mt-1 uppercase tracking-widest">
        {{ desintegrando ? 'Desintegración en curso...' : 'Clic y arrastra para mover' }}
      </p>
    </div>

    <!-- Quitamos el ClientOnly interno y usamos absolute inset-0 para que llene el div -->
    <div ref="container" class="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing outline-none"></div>

    <div class="absolute bottom-8 z-20">
      <button 
        @click="desintegrando ? restaurarModelo() : desintegrar()" 
        class="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105">
        {{ desintegrando ? 'Restaurar Modelo' : '¡Desintegrar!' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
// Si estas dos líneas de abajo te dan error en rojo en F12, 
// cámbialas por 'three/examples/jsm/...'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

const container = ref(null)
const desintegrando = ref(false)
let scene, camera, renderer, particleSystem, animationId
let originalPositions = null
let velocities = null

const initThree = () => {
  if (!container.value) return // Evita errores si el DOM no está listo

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.z = 50

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const loader = new STLLoader()
  loader.load('/models/chess-cavallo.stl', (geometry) => {
    geometry.center()
    geometry.scale(0.5, 0.5, 0.5)
    
    const material = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.5 })
    particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Guardar física
    const pos = geometry.attributes.position.array
    originalPositions = new Float32Array(pos)
    velocities = new Float32Array(pos.length).map(() => (Math.random() - 0.5) * 0.5)
  }, undefined, (error) => {
    console.error("No se encontró el archivo STL:", error)
  })

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    if (desintegrando.value && particleSystem) {
      const pos = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < pos.length; i++) {
        pos[i] += velocities[i]
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
    }
    renderer.render(scene, camera)
  }
  animate()
}

const desintegrar = () => { desintegrando.value = true }

const restaurarModelo = () => {
  if (!particleSystem) return
  desintegrando.value = false
  const pos = particleSystem.geometry.attributes.position.array
  pos.set(originalPositions)
  particleSystem.geometry.attributes.position.needsUpdate = true
}

onMounted(async () => {
  await nextTick() // Espera a que Vue termine de pintar el HTML antes de inyectar Three.js
  initThree()
})

onBeforeUnmount(() => { 
  if (animationId) cancelAnimationFrame(animationId) 
})
</script>