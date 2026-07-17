function initRobot() {
  const container = document.getElementById('robotContainer');
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight || 220;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a24);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(3, 2, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Свет
  const ambient = new THREE.AmbientLight(0x404060);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(2, 5, 3);
  scene.add(dirLight);
  const backLight = new THREE.DirectionalLight(0x2b8cff, 0.5);
  backLight.position.set(-2, 1, -3);
  scene.add(backLight);

  // Робот из простых геометрий
  const group = new THREE.Group();

  // Голова
  const headGeo = new THREE.SphereGeometry(0.6, 32, 32);
  const headMat = new THREE.MeshStandardMaterial({ color: 0x2b8cff, roughness: 0.3, metalness: 0.7 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 1.2;
  group.add(head);

  // Глаза
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x88ccff });
  const eyeGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.25, 1.35, 0.5);
  group.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.25, 1.35, 0.5);
  group.add(eyeR);

  // Зрачки
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const pupilGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const pL = new THREE.Mesh(pupilGeo, pupilMat);
  pL.position.set(-0.25, 1.32, 0.65);
  group.add(pL);
  const pR = new THREE.Mesh(pupilGeo, pupilMat);
  pR.position.set(0.25, 1.32, 0.65);
  group.add(pR);

  // Тело
  const bodyGeo = new THREE.CylinderGeometry(0.7, 0.8, 1.2, 32);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x445566, roughness: 0.5, metalness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0;
  group.add(body);

  // Руки
  const armMat = new THREE.MeshStandardMaterial({ color: 0x2b8cff, roughness: 0.4, metalness: 0.6 });
  const armGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.9, 8);
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-0.9, 0.4, 0);
  armL.rotation.z = 0.3;
  group.add(armL);
  const armR = new THREE.Mesh(armGeo, armMat);
  armR.position.set(0.9, 0.4, 0);
  armR.rotation.z = -0.3;
  group.add(armR);

  // Ноги
  const legMat = new THREE.MeshStandardMaterial({ color: 0x445566, roughness: 0.6 });
  const legGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 8);
  const legL = new THREE.Mesh(legGeo, legMat);
  legL.position.set(-0.3, -0.9, 0);
  group.add(legL);
  const legR = new THREE.Mesh(legGeo, legMat);
  legR.position.set(0.3, -0.9, 0);
  group.add(legR);

  scene.add(group);

  // Drag-вращение
  let isDragging = false;
  let prevX = 0;
  let rotationSpeed = 0.01;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
  });
  container.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const delta = e.clientX - prevX;
      group.rotation.y += delta * 0.01;
      prevX = e.clientX;
    }
  });
  container.addEventListener('mouseup', () => { isDragging = false; });
  container.addEventListener('mouseleave', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    prevX = e.touches[0].clientX;
  });
  container.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const delta = e.touches[0].clientX - prevX;
      group.rotation.y += delta * 0.01;
      prevX = e.touches[0].clientX;
    }
  });
  container.addEventListener('touchend', () => { isDragging = false; });

  // Клик по роботу → переход на ботов
  container.addEventListener('click', () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    navigateTo('bots');
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
      group.rotation.y += rotationSpeed;
    }
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight || 220;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initRobot);
