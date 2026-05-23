<script setup>
defineProps(['art']);
defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content custom-scrollbar">
        <button class="close-btn" @click="$emit('close')">&times;</button>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="art.images.web.url" :alt="art.title" />
          </div>
          <div class="modal-text">
            <span class="accession">N° Registro: {{ art.accession_number }}</span>
            <h2>{{ art.title }}</h2>
            <p class="author-large">{{ art.creators[0]?.description }}</p>
            <div class="info-grid">
              <div class="info-item">
                <strong>Técnica</strong>
                <p>{{ art.technique || 'Óleo / Técnica mixta' }}</p>
              </div>
              <div class="info-item">
                <strong>Fecha</strong>
                <p>{{ art.creation_date || 'Sin fecha' }}</p>
              </div>
            </div>
            <div class="description-box">
              <strong>Contexto Histórico</strong>
              <p>{{ art.wall_description || 'Esta pieza es una parte fundamental de la colección.' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);
  z-index: 9999; /* Z-index altísimo para tapar la navbar y todo lo demás */
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-content { 
  background: #111; width: 100%; max-width: 1100px; max-height: 90vh; 
  overflow-y: auto; position: relative; border: 1px solid #333; color: white; 
  border-radius: 12px;
}
.modal-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 50px; }
.modal-image img { width: 100%; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.modal-text { display: flex; flex-direction: column; gap: 15px; }
.accession { color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
.modal-text h2 { font-size: 2.5rem; margin: 0; line-height: 1.1; }
.author-large { font-size: 1.2rem; color: #ccc; margin: 0; font-style: italic; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 10px; padding-top: 20px; border-top: 1px solid #222; }
.info-item strong { color: #888; font-size: 0.9rem; text-transform: uppercase; }
.info-item p { margin: 5px 0 0 0; font-size: 1.1rem; }
.description-box { margin-top: 20px; padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #555; }
.description-box strong { display: block; margin-bottom: 10px; color: #aaa; text-transform: uppercase; font-size: 0.9rem; }
.description-box p { margin: 0; line-height: 1.6; color: #ddd; }
.close-btn { position: absolute; top: 15px; right: 25px; background: none; border: none; color: #aaa; font-size: 2.5rem; cursor: pointer; transition: 0.2s; z-index: 10; }
.close-btn:hover { color: white; transform: scale(1.1); }

/* Scrollbar para el modal */
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 0 12px 12px 0; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #666; }

@media (max-width: 900px) { .modal-body { grid-template-columns: 1fr; padding: 30px; } }
</style>