import {
    CubeTextureLoader,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator';
import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker';
// import * as THREE from 'three';
// (global as any).THREE = THREE;
// import OrbitControls from 'three/examples/js/controls/OrbitControls';
// import GLTFLoader from 'three/examples/js/loaders/GLTFLoader';
// import PMREMGenerator from 'three/examples/js/pmrem/PMREMGenerator';
// import PMREMCubeUVPacker from 'three/examples/js/pmrem/PMREMCubeUVPacker';

console.log(PMREMGenerator);

// if (WEBGL.isWebGLAvailable() === false) {
//     document.body.appendChild(WEBGL.getWebGLErrorMessage());
// }

let container: HTMLDivElement;
// let stats: Stats;
let controls: any;
let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;

init();
// animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.9, 2.7);

    // controls = new OrbitControls(camera);
    // controls.target.set(0, -0.2, -0.2);
    // controls.update();

    scene = new Scene();

    const urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    const loader = new CubeTextureLoader().setPath('../assets/textures/cube/Bridge2/');
    loader.load(urls, function (texture) {
        console.log(texture);
        const pmremGenerator = new PMREMGenerator(texture);
        // pmremGenerator.update(renderer);

        // const pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
        // pmremCubeUVPacker.update(renderer);

        // const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        // const loader = new GLTFLoader().setPath('../assets/models/gltf/elucidator/');
        // loader.load('scene.gltf', function (gltf) {
        //     gltf.scene.traverse(function (child) {
        //         if ((child as any).isMesh) {
        //             (child as any).material.envMap = envMap;
        //         }
        //     });

        //     scene.add(gltf.scene);
        // });

        // pmremGenerator.dispose();
        // pmremCubeUVPacker.dispose();

        // scene.background = texture;
    });

    // var canvas = document.createElement('canvas');
    // var context = canvas.getContext('webgl2');

    // renderer = new WebGLRenderer({ canvas: canvas, context: context } as any);
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.gammaOutput = true;
    // container.appendChild(renderer.domElement);

    // window.addEventListener('resize', onWindowResize, false);

    // // stats
    // // stats = new Stats();
    // // container.appendChild(stats.dom);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // stats.update();
}


// // Node modules.
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import * as JoyCon from 'ns-joycon';
// import * as Three from 'three';
// // Local modules.
// import Toolbox from './components/Toolbox';

// let mesh: Three.Mesh;

// const { joycons } = JoyCon.findControllers();

// joycons.forEach(async (device) => {
//     device.manageHandler('add', (packet) => {
//         if (packet.inputReportID._raw[0] === 0x30) {
//             const [x, y, z] = (packet as any).actualGyroscope.rps;

//             mesh && mesh.rotation && (mesh.rotation.x += x);
//             mesh && mesh.rotation && (mesh.rotation.y += y);
//             mesh && mesh.rotation && (mesh.rotation.z += z);
//         }
//     });
// });

// initApp();

// function initApp() {
//     let scene: Three.Scene;
//     let camera: Three.PerspectiveCamera;
//     let renderer: Three.WebGLRenderer;
//     let geometry: Three.BoxGeometry;
//     let material: Three.MeshBasicMaterial;

//     init();
//     animate();

//     function init() {
//         scene = new Three.Scene();

//         camera = new Three.PerspectiveCamera(300, window.innerWidth / window.innerHeight, 1, 1000);
//         camera.position.z = 500;

//         geometry = new Three.BoxGeometry(200, 200, 200);
//         material = new Three.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

//         mesh = new Three.Mesh(geometry, material);
//         scene.add(mesh);

//         renderer = new Three.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);

//         document.body.appendChild(renderer.domElement);
//     }

//     function animate() {
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     }
// }

// ReactDOM.render(
//     <Toolbox joycons={joycons} />,
//     document.getElementById('root')
// );
