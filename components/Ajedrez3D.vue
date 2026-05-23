<template>
  <div class="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/40 shadow-xl bg-gradient-to-br from-neutral-100/50 to-neutral-200/50 backdrop-blur-sm">
    <div ref="container" class="absolute inset-0 cursor-crosshair outline-none"></div>
    
    <div class="absolute bottom-6 left-6 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm text-xs font-medium text-neutral-600 tracking-wide pointer-events-none transition-all">
      {{ selectedPiece ? 'Selecciona una casilla adyacente para mover' : 'Clic en una pieza para seleccionar • Arrastra para rotar' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const container = ref(null)
let scene, camera, renderer, controls, animationId

// Variables interactivas
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const piecesArray = [] 
const squaresArray = [] 
const selectedPiece = ref(null) 
let originalMaterial = null

const SQUARE_SIZE = 10
const BOARD_OFFSET = (SQUARE_SIZE * 8) / 2 - (SQUARE_SIZE / 2)

// --- FUNCIONES EXTRAÍDAS PARA PODER LIMPIARLAS DESPUÉS ---
const handleResize = () => {
  if (!container.value || !camera || !renderer) return
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

const onClick = (event) => {
  if (!renderer) return
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  // 1. ¿Hicimos clic en una pieza?
  const pieceIntersects = raycaster.intersectObjects(piecesArray)
  
  if (pieceIntersects.length > 0) {
    if (selectedPiece.value) {
      selectedPiece.value.material = originalMaterial
    }
    const clickedMesh = pieceIntersects[0].object
    selectedPiece.value = clickedMesh
    originalMaterial = clickedMesh.userData.isLight ? clickedMesh.material : clickedMesh.material // Mantiene referencia real
    clickedMesh.material = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.4, roughness: 0.2, metalness: 0.8 
    })
    return 
  }

  // 2. ¿Hicimos clic en una casilla?
  if (selectedPiece.value) {
    const squareIntersects = raycaster.intersectObjects(squaresArray)
    if (squareIntersects.length > 0) {
      const targetSquare = squareIntersects[0].object
      const targetRow = targetSquare.userData.row
      const targetCol = targetSquare.userData.col
      
      const currentRow = selectedPiece.value.userData.row
      const currentCol = selectedPiece.value.userData.col

      const rowDiff = Math.abs(targetRow - currentRow)
      const colDiff = Math.abs(targetCol - currentCol)

      if (rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0)) {
        const isOccupied = piecesArray.some(p => p.userData.row === targetRow && p.userData.col === targetCol)
        if (!isOccupied) {
          selectedPiece.value.position.set(
            targetCol * SQUARE_SIZE - BOARD_OFFSET,
            0,
            targetRow * SQUARE_SIZE - BOARD_OFFSET
          )
          selectedPiece.value.userData.row = targetRow
          selectedPiece.value.userData.col = targetCol
        }
      }
      
      selectedPiece.value.material = originalMaterial
      selectedPiece.value = null
    } else {
      selectedPiece.value.material = originalMaterial
      selectedPiece.value = null
    }
  }
}

// --- CICLO DE VIDA ---
onMounted(async () => {
  if (!container.value) return

  // ESPERAMOS a que Nuxt termine de dibujar la caja y tenga un tamaño real
  await nextTick()

  // 1. Escena y Cámara
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 80, 120)

  // 2. Renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  container.value.appendChild(renderer.domElement)

  // 3. Controles
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.maxPolarAngle = Math.PI / 2 - 0.05
  controls.minDistance = 50
  controls.maxDistance = 200

  // 4. Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(40, 80, 40)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.camera.top = 60
  dirLight.shadow.camera.bottom = -60
  dirLight.shadow.camera.left = -60
  dirLight.shadow.camera.right = 60
  scene.add(dirLight)

  const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.3)
  fillLight.position.set(-40, 40, -40)
  scene.add(fillLight)

  // 5. Materiales
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.1 })
  const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2, metalness: 0.1 })
  const boardLightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const boardDarkMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2 })

  // 6. Generar el Tablero
  const boxGeo = new THREE.BoxGeometry(SQUARE_SIZE, 2, SQUARE_SIZE)
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0
      const square = new THREE.Mesh(boxGeo, isLight ? boardLightMat : boardDarkMat)
      
      square.position.set(col * SQUARE_SIZE - BOARD_OFFSET, -1, row * SQUARE_SIZE - BOARD_OFFSET)
      square.receiveShadow = true
      square.userData = { row, col }
      scene.add(square)
      squaresArray.push(square)
    }
  }

  // 7. Gestor de Modelos STL
  const loader = new STLLoader()
  const geometries = {}

  const loadPiece = (name, url) => {
    return new Promise((resolve) => {
      loader.load(url, (geometry) => {
        geometry.center()
        geometry.rotateX(-Math.PI / 2) 
        geometry.computeBoundingBox()
        const box = geometry.boundingBox
        const currentHeight = box.max.y - box.min.y
        
        if (currentHeight > 0) {
          const targetHeight = 8 
          const scaleFactor = targetHeight / currentHeight
          geometry.scale(scaleFactor, scaleFactor, scaleFactor)
        }
        
        geometry.computeBoundingBox()
        geometry.translate(0, -geometry.boundingBox.min.y, 0) 
        geometry.computeVertexNormals()
        
        geometries[name] = geometry
        resolve(geometry)
      })
    })
  }

  const placePiece = (geomName, row, col, isLight) => {
    const geometry = geometries[geomName]
    if (!geometry) return

    const mesh = new THREE.Mesh(geometry, isLight ? lightMaterial : darkMaterial)
    mesh.position.set(col * SQUARE_SIZE - BOARD_OFFSET, 0, row * SQUARE_SIZE - BOARD_OFFSET)
    if (!isLight) mesh.rotation.y = Math.PI
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { row, col, isLight, type: geomName }
    scene.add(mesh)
    piecesArray.push(mesh)
  }

  // 8. Cargar e Instanciar
  Promise.all([
    loadPiece('pawn', '/models/chess-pedone.stl'),
    loadPiece('rook', '/models/chess-torre.stl'),
    loadPiece('knight', '/models/chess-cavallo.stl'),
    loadPiece('bishop', '/models/chess-alfiere.stl'),
    loadPiece('queen', '/models/chess-regina.stl'),
    loadPiece('king', '/models/chess-re.stl')
  ]).then(() => {
    const backline = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    for (let i = 0; i < 8; i++) {
      placePiece('pawn', 6, i, true)
      placePiece(backline[i], 7, i, true)
      placePiece('pawn', 1, i, false)
      placePiece(backline[i], 0, i, false)
    }
  })

  // Asignar Eventos
  container.value.addEventListener('click', onClick)
  window.addEventListener('resize', handleResize)

  // 9. Bucle de Renderizado
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
})

// 10. Limpieza estricta de memoria
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  
  if (container.value) {
    container.value.removeEventListener('click', onClick)
  }
  
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
  }
  
  if (scene) {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose()
        if (object.material.isMaterial) {
          object.material.dispose()
        }
      }
    })
  }
})
</script>