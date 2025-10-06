let scene, camera, renderer, analyser, dataArray, visualizer;
let audio, audioContext, audioSource;
let isPlaying = false;
let currentMode = 'sphere';
let sensitivity = 2;
let rotationSpeed = 0.5;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    createSphereVisualizer();

    window.addEventListener('resize', onWindowResize);
    animate();
}

function createSphereVisualizer() {
    if (visualizer) scene.remove(visualizer);
    
    const geometry = new THREE.SphereGeometry(10, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    visualizer = new THREE.Mesh(geometry, material);
    scene.add(visualizer);
}

function createBarsVisualizer() {
    if (visualizer) scene.remove(visualizer);
    
    visualizer = new THREE.Group();
    const barCount = 64;
    for (let i = 0; i < barCount; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(`hsl(${(i / barCount) * 360}, 70%, 50%)`)
        });
        const bar = new THREE.Mesh(geometry, material);
        const angle = (i / barCount) * Math.PI * 2;
        bar.position.x = Math.cos(angle) * 15;
        bar.position.z = Math.sin(angle) * 15;
        visualizer.add(bar);
    }
    scene.add(visualizer);
}

function createWaveVisualizer() {
    if (visualizer) scene.remove(visualizer);
    
    const geometry = new THREE.PlaneGeometry(40, 40, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0x7b2ff7,
        wireframe: true,
        side: THREE.DoubleSide
    });
    visualizer = new THREE.Mesh(geometry, material);
    visualizer.rotation.x = -Math.PI / 4;
    scene.add(visualizer);
}

function createParticlesVisualizer() {
    if (visualizer) scene.remove(visualizer);
    
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.3,
        transparent: true,
        opacity: 0.8
    });
    
    visualizer = new THREE.Points(geometry, material);
    scene.add(visualizer);
}

function setupAudio(file) {
    const audio = document.getElementById('audio');
    audio.src = URL.createObjectURL(file);
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        audioSource = audioContext.createMediaElementSource(audio);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
    }

    document.getElementById('trackName').textContent = file.name;
    document.getElementById('playBtn').disabled = false;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('controlsPanel').style.display = 'block';

    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateVisualization() {
    if (!analyser || !dataArray) return;
    
    analyser.getByteFrequencyData(dataArray);
    
    const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const scaleFactor = (avg / 128) * sensitivity;

    if (currentMode === 'sphere') {
        visualizer.rotation.y += 0.01 * rotationSpeed;
        visualizer.scale.set(1 + scaleFactor * 0.3, 1 + scaleFactor * 0.3, 1 + scaleFactor * 0.3);
        visualizer.material.color.setHSL((Date.now() % 10000) / 10000, 0.7, 0.5);
    } else if (currentMode === 'bars') {
        visualizer.rotation.y += 0.01 * rotationSpeed;
        visualizer.children.forEach((bar, i) => {
            const index = Math.floor((i / visualizer.children.length) * dataArray.length);
            const scale = (dataArray[index] / 255) * sensitivity * 5;
            bar.scale.y = Math.max(0.1, scale);
        });
    } else if (currentMode === 'wave') {
        const positions = visualizer.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const index = Math.floor((i / positions.length) * dataArray.length);
            positions[i + 2] = (dataArray[index] / 255) * 10 * sensitivity;
        }
        visualizer.geometry.attributes.position.needsUpdate = true;
        visualizer.rotation.z += 0.005 * rotationSpeed;
    } else if (currentMode === 'particles') {
        const positions = visualizer.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const index = Math.floor((i / positions.length) * dataArray.length);
            const scale = (dataArray[index] / 255) * sensitivity;
            positions[i] += (Math.random() - 0.5) * scale;
            positions[i + 1] += (Math.random() - 0.5) * scale;
            positions[i + 2] += (Math.random() - 0.5) * scale;
        }
        visualizer.geometry.attributes.position.needsUpdate = true;
        visualizer.rotation.y += 0.005 * rotationSpeed;
    }
}

function animate() {
    requestAnimationFrame(animate);
    updateVisualization();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Audio file selection
    document.getElementById('audioFile').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            setupAudio(e.target.files[0]);
        }
    });

    // Play/Pause button
    document.getElementById('playBtn').addEventListener('click', () => {
        const audio = document.getElementById('audio');
        const playBtn = document.getElementById('playBtn');
        
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>';
        } else {
            audio.play();
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
        }
        isPlaying = !isPlaying;
    });

    // Progress bar
    document.getElementById('progressContainer').addEventListener('click', (e) => {
        const audio = document.getElementById('audio');
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Visualization mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            
            if (currentMode === 'sphere') createSphereVisualizer();
            else if (currentMode === 'bars') createBarsVisualizer();
            else if (currentMode === 'wave') createWaveVisualizer();
            else if (currentMode === 'particles') createParticlesVisualizer();
        });
    });

    // Control inputs
    document.getElementById('sensitivity').addEventListener('input', (e) => {
        sensitivity = parseFloat(e.target.value);
        document.getElementById('sensitivityVal').textContent = sensitivity.toFixed(1);
    });

    document.getElementById('rotationSpeed').addEventListener('input', (e) => {
        rotationSpeed = parseFloat(e.target.value);
        document.getElementById('rotationSpeedVal').textContent = rotationSpeed.toFixed(1);
    });

    document.getElementById('volume').addEventListener('input', (e) => {
        const volume = parseInt(e.target.value);
        document.getElementById('audio').volume = volume / 100;
        document.getElementById('volumeVal').textContent = volume;
    });

document.getElementById('toggleControls').addEventListener('click', () => {
        const controls = document.getElementById('controlsPanel');
        controls.classList.toggle('collapsed');
    });

    // Initialize
    init();
});