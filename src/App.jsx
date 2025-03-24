import { useEffect, useState } from 'react';
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入 GLTFLoader 用于加载 glTF 格式的模型
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = -1;

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 创建地面
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    // 添加灯光
    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(7, 5, 10);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 5);
    light2.position.set(-15, 10, -10);
    scene.add(light2);
    const light3 = new THREE.DirectionalLight(0xffffff, 2);
    light3.position.set(-15, -5, -10);
    scene.add(light3);


    // 加载自定义模型
    const loader = new GLTFLoader();
    loader.load(
      '../public/draco/gltf/珍珠耳环少女.gltf', // 替换为你的模型文件路径
      (gltf) => {
        const model = gltf.scene; // 获取模型场景
        model.scale.set(1, 1, 1); // 调整模型大小
        model.position.set(0, 3, 0); // 设置模型位置
        scene.add(model); // 将模型添加到场景中
      },
      undefined,
      (error) => {
        console.error("模型加载失败:", error);
      }
    );
    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // 更新轨道控制器
      renderer.render(scene, camera);
    }
    animate();

    // 清理函数
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;