<template>
  <div ref="container" class="stl-viewer-container">
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
      <span>Cargando entorno 3D...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
const isLoading = ref(true)
let renderer, scene, camera, controls
let animationFrameId

onMounted(async () => {
  // Importaciones dinámicas (Code Splitting)
  const THREE = await import('three')
  const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js')
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

  // Configuración de escena
  scene = new THREE.Scene()
  scene.background = null // Transparente para adaptarse al fondo de tu web

  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 50)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)

  // Carga del modelo (CAMBIA EL NOMBRE DEL ARCHIVO AQUÍ)
  const loader = new STLLoader()
  loader.load('/tulip.stl', (geometry) => {
    // Material del modelo
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffb6c1, // Un color índigo moderno
      roughness: 0.3, 
      metalness: 0.4 
    })
    
    const mesh = new THREE.Mesh(geometry, material)
    
    geometry.computeBoundingBox()
    geometry.center()
    
    scene.add(mesh)
    isLoading.value = false
  }, undefined, (error) => {
    console.error('Error cargando el STL:', error)
    isLoading.value = false
  })

  // Animación
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.stl-viewer-container {
  width: 100%;
  max-width: 900px; /* Ancho ajustable a tu diseño */
  height: 500px;
  margin: 2rem auto;
  
  /* Estilo Glassmorphism limpio */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: grab;
}

.stl-viewer-container:active {
  cursor: grabbing;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-family: system-ui, sans-serif;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(100, 100, 100, 0.2);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>