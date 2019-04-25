import * as JoyCon from 'ns-joycon';
import * as Three from 'three';

let mesh: Three.Mesh;

const { joycons } = JoyCon.findControllers();

joycons.forEach(async (device) => {
    device.manageHandler('add', (packet) => {
        if (packet.inputReportID._raw[0] === 0x30) {
            const [x, y, z] = (packet as any).actualGyroscope.rps;

            mesh && mesh.rotation && (mesh.rotation.x += x);
            mesh && mesh.rotation && (mesh.rotation.y += y);
            mesh && mesh.rotation && (mesh.rotation.z += z);
        }
    });

    await device.enableIMU();
});

initApp();

function initApp() {
    let scene: Three.Scene;
    let camera: Three.PerspectiveCamera;
    let renderer: Three.WebGLRenderer;
    let geometry: Three.BoxGeometry;
    let material: Three.MeshBasicMaterial;

    init();
    animate();

    function init() {
        scene = new Three.Scene();

        camera = new Three.PerspectiveCamera(300, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 500;

        geometry = new Three.BoxGeometry(200, 200, 200);
        material = new Three.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

        mesh = new Three.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new Three.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
    }

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}
