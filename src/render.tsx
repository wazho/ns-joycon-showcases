// Node modules.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as JoyCon from 'ns-joycon';
// TODO: Seem only this method for now to require three/examples.
import * as THREE from 'three';
(window as any).THREE = THREE;
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/pmrem/PMREMGenerator');
require('three/examples/js/pmrem/PMREMCubeUVPacker');
// import OrbitControls from 'three/examples/js/controls/OrbitControls';
// import GLTFLoader from 'three/examples/js/loaders/GLTFLoader';
// import PMREMGenerator from 'three/examples/js/pmrem/PMREMGenerator';
// import PMREMCubeUVPacker from 'three/examples/js/pmrem/PMREMCubeUVPacker';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator';
// import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker';
// Local modules.
import Toolbox from './components/Toolbox';

let container: HTMLDivElement;
// let stats: any;
let controls: any;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 5);

    controls = new (THREE as any).OrbitControls(camera);
    controls.target.set(0, -0.2, -0.2);
    controls.update();

    scene = new THREE.Scene();

    const urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    const loader = new THREE.CubeTextureLoader().setPath('../assets/textures/cube/Bridge2/');
    loader.load(urls, function (texture) {
        const pmremGenerator = new (THREE as any).PMREMGenerator(texture);
        pmremGenerator.update(renderer);

        const pmremCubeUVPacker = new (THREE as any).PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);

        const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        const loader = new (THREE as any).GLTFLoader().setPath('../assets/models/gltf/elucidator/');
        loader.load('scene.gltf', function (gltf: any) {
            gltf.scene.traverse(function (child: any) {
                if ((child as any).isMesh) {
                    (child as any).material.envMap = envMap;
                }
            });

            gltf.scene.scale.set(0.25, 0.25, 0.25);
            gltf.scene.position.set(-2.5, 0, 0);
            scene.add(gltf.scene);
        });

        // const geometry = new THREE.ConeGeometry(5, 20, 32);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const cone = new THREE.Mesh(geometry, material);
        // scene.add(cone);

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        scene.background = texture;
    });

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('webgl2');

    renderer = new (THREE as any).WebGLRenderer({ canvas: canvas, context: context } as any);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    // stats
    // stats = new Stats();
    // container.appendChild(stats.dom);
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

const { joycons } = JoyCon.findControllers();

joycons.forEach(async (device) => {
    device.manageHandler('add', (packet) => {
        if (packet.inputReportID._raw[0] === 0x30) {
            const [x, y, z] = (packet as any).actualGyroscope.rps;

            scene && scene.rotation && (scene.rotation.x += x * 20);
            scene && scene.rotation && (scene.rotation.y += y * 20);
            scene && scene.rotation && (scene.rotation.z += z * 20);
        }
    });
});

ReactDOM.render(
    <Toolbox joycons={joycons} />,
    document.getElementById('root')
);
