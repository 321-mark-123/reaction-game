

let scene, camera, renderer, shape;

function initScene() {
  const canvas = document.getElementById('three-canvas');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 2);
  scene.add(light);

  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  camera.position.z = 5;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function setVisualState(state) {
  if (state === 'waiting') shape.material.color.set('#2196F3');
  if (state === 'ready') shape.material.color.set('#4CAF50');
  if (state === 'foul') shape.material.color.set('#FF5722');
}

export { initScene, setVisualState };

