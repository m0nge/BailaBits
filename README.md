# 🎵🌀 Visualizador de Música 3D

Un visualizador de audio espectacular con gráficos 3D en tiempo real, desarrollado con Three.js y Web Audio API. ¡Convierte tu música en arte visual! 🎨✨

## 🎯 Descripción

Este es un visualizador de música interactivo y profesional que analiza el audio en tiempo real y genera impresionantes visualizaciones 3D sincronizadas con la música. Perfecto para DJs, productores musicales, o cualquiera que quiera experimentar su música de una forma completamente nueva.

## ✨ Características

- 🎨 **4 Modos de Visualización**: Esfera pulsante, barras de frecuencia, onda 3D y partículas dinámicas
- 🎵 **Análisis en Tiempo Real**: Usa Web Audio API para análisis preciso de frecuencias
- 🎮 **Controles Profesionales**: Reproductor completo con todas las funcionalidades
- 🔊 **Control de Sensibilidad**: Ajusta qué tan reactivas son las visualizaciones
- 🌀 **Velocidad de Rotación**: Personaliza la velocidad de animación
- 🎚️ **Control de Volumen**: Ajuste preciso del volumen de reproducción
- 📊 **Barra de Progreso Interactiva**: Navega por tu canción fácilmente
- 🎭 **Efectos de Color Dinámicos**: Los colores cambian con el ritmo de la música
- 📱 **Diseño Responsive**: Funciona perfecto en desktop, tablet y móvil
- 🚀 **Rendimiento Optimizado**: 60 FPS gracias a WebGL

## 🛠️ Tecnologías

- **Three.js (r128)**: Renderizado 3D con WebGL
- **Web Audio API**: Análisis y procesamiento de audio
- **HTML5**: Estructura de la aplicación
- **CSS3**: Diseño moderno con gradientes y glassmorphism
- **JavaScript (Vanilla)**: Lógica de la aplicación

## 🚀 Cómo Usar

1. **Abre el archivo `index.html`** en tu navegador (Chrome recomendado)
2. **Haz clic en "Seleccionar Audio"** o arrastra un archivo de audio
3. **Presiona Play** ▶️ para comenzar la reproducción
4. **Cambia el modo de visualización** con los botones: Esfera, Barras, Onda o Partículas
5. **Ajusta los controles** de sensibilidad y rotación a tu gusto
6. **Disfruta del espectáculo visual** 🎉

## 📦 Instalación

### Opción 1: Descarga Directa
1. Descarga el archivo `index.html` del repositorio
2. Ábrelo en tu navegador (Chrome o Firefox recomendados)
3. ¡Carga tu música y disfruta! 🎵

### Opción 2: Clonar Repositorio
```bash
git clone https://github.com/tuusuario/visualizador-musica-3d.git
cd visualizador-musica-3d
```
Luego abre `index.html` en tu navegador.

### Opción 3: Live Server (Recomendado para desarrollo)
Si tienes VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## 📁 Estructura del Proyecto

```
visualizador-musica-3d/
└── index.html      # Aplicación completa (HTML + CSS + JS)
```

¡Todo en un solo archivo para máxima portabilidad! 🎯

## 🎨 Modos de Visualización

### 🔮 Esfera
Una esfera wireframe que pulsa y cambia de color según las frecuencias del audio. Los colores transicionan suavemente a través del espectro.

### 📊 Barras
64 barras dispuestas en círculo que reaccionan individualmente a diferentes rangos de frecuencia. Perfecto para ver la separación de graves, medios y agudos.

### 🌊 Onda
Una superficie 3D ondulante que se deforma según la intensidad del audio. Crea patrones hipnóticos y fluidos.

### ✨ Partículas
1000 partículas que se mueven aleatoriamente influenciadas por el audio. Perfecto para música ambiental o electrónica.

## 💡 Características Técnicas

### Análisis de Audio
- **FFT Size**: 256 (128 bandas de frecuencia)
- **Algoritmo**: Fast Fourier Transform para análisis espectral
- **Tasa de actualización**: 60 FPS sincronizado con requestAnimationFrame
- **Rango de frecuencias**: 20Hz - 20kHz

### Renderizado 3D
- **Motor**: Three.js con WebGL
- **Anti-aliasing**: Activado para gráficos suaves
- **Iluminación**: Ambient + Point lights dinámicas
- **Geometrías**: Sphere, Box, Plane, BufferGeometry
- **Materiales**: MeshPhongMaterial con propiedades transparentes

### Optimizaciones
- Geometrías reutilizables
- Buffers actualizados eficientemente
- Cálculos optimizados de transformaciones
- Garbage collection minimizado

## 🎛️ Controles y Ajustes

### Sensibilidad (1x - 5x)
Controla qué tan reactivas son las visualizaciones al audio:
- **1x**: Movimientos suaves y sutiles
- **3x**: Balance perfecto
- **5x**: Máxima reactividad y energía

### Velocidad de Rotación (0x - 2x)
Ajusta la velocidad de rotación de las visualizaciones:
- **0x**: Sin rotación (estático)
- **0.5x**: Rotación lenta y elegante
- **2x**: Rotación rápida y dinámica

### Volumen (0% - 100%)
Control preciso del volumen de reproducción sin afectar el análisis de frecuencias.

## 🎨 Personalización

### Cambiar Colores
Puedes modificar los colores principales editando las variables en el CSS:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%);

/* Colores de las geometrías 3D */
color: 0x00d4ff  // Cian eléctrico
color: 0x7b2ff7  // Morado intenso
```

### Ajustar FFT Size
Para más o menos detalle en el análisis:

```javascript
analyser.fftSize = 512;  // Más detalle (256 bandas)
// o
analyser.fftSize = 128;  // Menos detalle, más performance (64 bandas)
```

## 🌟 Casos de Uso

- 🎧 **DJ Sets**: Proyecta visuales en pantallas grandes
- 🎤 **Conciertos**: Complemento visual para presentaciones en vivo
- 🏠 **Fiestas**: Crea ambiente con visuales sincronizados
- 🎨 **Arte Generativo**: Explora patrones visuales únicos
- 📚 **Educación**: Enseña conceptos de análisis de frecuencias
- 💻 **Portfolio**: Demuestra habilidades en WebGL y Audio API

## 📱 Compatibilidad

- ✅ Chrome 90+ (Recomendado)
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+ (Requiere interacción del usuario)
- ✅ Opera 76+
- ⚠️ IE11: No compatible (requiere Web Audio API)

### Formatos de Audio Soportados
- MP3
- WAV
- OGG
- M4A
- FLAC (según navegador)

## 🐛 Solución de Problemas

### El audio no se reproduce
- Asegúrate de que el formato sea compatible
- Verifica que el navegador tenga permisos de audio
- Prueba con Chrome o Firefox

### Las visualizaciones no se mueven
- Haz clic en Play para iniciar el audio
- Verifica que el volumen no esté en 0
- Intenta aumentar la sensibilidad

### Bajo rendimiento
- Cierra otras pestañas del navegador
- Prueba el modo "Esfera" (más optimizado)
- Reduce la sensibilidad si es necesario

## 🤝 Contribuciones

¡Las contribuciones son súper bienvenidas! 🎉

1. Fork este repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Ideas para Contribuir
- 🎨 Nuevos modos de visualización
- 🎵 Soporte para streaming (Spotify, SoundCloud)
- 💾 Guardar/cargar presets de configuración
- 📹 Exportar visualizaciones como video
- 🎮 Control por MIDI
- 🔊 Ecualizador integrado
- 🌈 Más esquemas de color
- 🎯 Detección de BPM automática
- 📱 Mejoras para móvil
- 🔌 Soporte para audio del micrófono

## 🏆 Logros Técnicos

Este proyecto demuestra:
- ✅ Dominio de Web Audio API
- ✅ Experiencia con Three.js y WebGL
- ✅ Conocimiento de DSP (Digital Signal Processing)
- ✅ Animaciones de alto rendimiento
- ✅ Diseño UX/UI moderno
- ✅ Código limpio y bien estructurado

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - siéntete libre de usarlo, modificarlo y compartirlo.

## 👨‍💻 Autor

Desarrollado con ❤️ y mucha música por **Daniela Monge**
## 🎮 Demo en Vivo

[Ver Demo](#) ← ¡Pruébalo ahora mismo!

## 📸 Capturas de Pantalla

<img width="1814" height="917" alt="image" src="https://github.com/user-attachments/assets/3dc22c29-e70b-4843-a1fb-6415a570504f" />

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor abre un [issue](https://github.com/tuusuario/visualizador-musica-3d/issues) describiendo:
- Navegador y versión
- Archivo de audio usado
- Pasos para reproducir el error
- Comportamiento esperado vs actual

## ⭐ Dale una Estrella

Si te gustó este proyecto y te sirvió para aprender o crear algo increíble, ¡no olvides darle una ⭐ en GitHub!


Hecho con 💜 JavaScript, ☕ café y 🎵 buena música
