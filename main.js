import './style.css';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const group = new TWEEN.Group();

const table = [
    'H', 'Hydrogen', '1.00794', 1, 1,
    'He', 'Helium', '4.002602', 18, 1,
    'Li', 'Lithium', '6.941', 1, 2,
    'Be', 'Beryllium', '9.012182', 2, 2,
    'B', 'Boron', '10.811', 13, 2,
    'C', 'Carbon', '12.0107', 14, 2,
    'N', 'Nitrogen', '14.0067', 15, 2,
    'O', 'Oxygen', '15.9994', 16, 2,
    'F', 'Fluorine', '18.9984032', 17, 2,
    'Ne', 'Neon', '20.1797', 18, 2,
    'Na', 'Sodium', '22.98976...', 1, 3,
    'Mg', 'Magnesium', '24.305', 2, 3,
    'Al', 'Aluminium', '26.9815386', 13, 3,
    'Si', 'Silicon', '28.0855', 14, 3,
    'P', 'Phosphorus', '30.973762', 15, 3,
    'S', 'Sulfur', '32.065', 16, 3,
    'Cl', 'Chlorine', '35.453', 17, 3,
    'Ar', 'Argon', '39.948', 18, 3,
    'K', 'Potassium', '39.948', 1, 4,
    'Ca', 'Calcium', '40.078', 2, 4,
    'Sc', 'Scandium', '44.955912', 3, 4,
    'Ti', 'Titanium', '47.867', 4, 4,
    'V', 'Vanadium', '50.9415', 5, 4,
    'Cr', 'Chromium', '51.9961', 6, 4,
    'Mn', 'Manganese', '54.938045', 7, 4,
    'Fe', 'Iron', '55.845', 8, 4,
    'Co', 'Cobalt', '58.933195', 9, 4,
    'Ni', 'Nickel', '58.6934', 10, 4,
    'Cu', 'Copper', '63.546', 11, 4,
    'Zn', 'Zinc', '65.38', 12, 4,
    'Ga', 'Gallium', '69.723', 13, 4,
    'Ge', 'Germanium', '72.63', 14, 4,
    'As', 'Arsenic', '74.9216', 15, 4,
    'Se', 'Selenium', '78.96', 16, 4,
    'Br', 'Bromine', '79.904', 17, 4,
    'Kr', 'Krypton', '83.798', 18, 4,
    'Rb', 'Rubidium', '85.4678', 1, 5,
    'Sr', 'Strontium', '87.62', 2, 5,
    'Y', 'Yttrium', '88.90585', 3, 5,
    'Zr', 'Zirconium', '91.224', 4, 5,
    'Nb', 'Niobium', '92.90628', 5, 5,
    'Mo', 'Molybdenum', '95.96', 6, 5,
    'Tc', 'Technetium', '(98)', 7, 5,
    'Ru', 'Ruthenium', '101.07', 8, 5,
    'Rh', 'Rhodium', '102.9055', 9, 5,
    'Pd', 'Palladium', '106.42', 10, 5,
    'Ag', 'Silver', '107.8682', 11, 5,
    'Cd', 'Cadmium', '112.411', 12, 5,
    'In', 'Indium', '114.818', 13, 5,
    'Sn', 'Tin', '118.71', 14, 5,
    'Sb', 'Antimony', '121.76', 15, 5,
    'Te', 'Tellurium', '127.6', 16, 5,
    'I', 'Iodine', '126.90447', 17, 5,
    'Xe', 'Xenon', '131.293', 18, 5,
    'Cs', 'Caesium', '132.9054', 1, 6,
    'Ba', 'Barium', '132.9054', 2, 6,
    'La', 'Lanthanum', '138.90547', 4, 9,
    'Ce', 'Cerium', '140.116', 5, 9,
    'Pr', 'Praseodymium', '140.90765', 6, 9,
    'Nd', 'Neodymium', '144.242', 7, 9,
    'Pm', 'Promethium', '(145)', 8, 9,
    'Sm', 'Samarium', '150.36', 9, 9,
    'Eu', 'Europium', '151.964', 10, 9,
    'Gd', 'Gadolinium', '157.25', 11, 9,
    'Tb', 'Terbium', '158.92535', 12, 9,
    'Dy', 'Dysprosium', '162.5', 13, 9,
    'Ho', 'Holmium', '164.93032', 14, 9,
    'Er', 'Erbium', '167.259', 15, 9,
    'Tm', 'Thulium', '168.93421', 16, 9,
    'Yb', 'Ytterbium', '173.054', 17, 9,
    'Lu', 'Lutetium', '174.9668', 18, 9,
    'Hf', 'Hafnium', '178.49', 4, 6,
    'Ta', 'Tantalum', '180.94788', 5, 6,
    'W', 'Tungsten', '183.84', 6, 6,
    'Re', 'Rhenium', '186.207', 7, 6,
    'Os', 'Osmium', '190.23', 8, 6,
    'Ir', 'Iridium', '192.217', 9, 6,
    'Pt', 'Platinum', '195.084', 10, 6,
    'Au', 'Gold', '196.966569', 11, 6,
    'Hg', 'Mercury', '200.59', 12, 6,
    'Tl', 'Thallium', '204.3833', 13, 6,
    'Pb', 'Lead', '207.2', 14, 6,
    'Bi', 'Bismuth', '208.9804', 15, 6,
    'Po', 'Polonium', '(209)', 16, 6,
    'At', 'Astatine', '(210)', 17, 6,
    'Rn', 'Radon', '(222)', 18, 6,
    'Fr', 'Francium', '(223)', 1, 7,
    'Ra', 'Radium', '(226)', 2, 7,
    'Ac', 'Actinium', '(227)', 4, 10,
    'Th', 'Thorium', '232.03806', 5, 10,
    'Pa', 'Protactinium', '231.0588', 6, 10,
    'U', 'Uranium', '238.02891', 7, 10,
    'Np', 'Neptunium', '(237)', 8, 10,
    'Pu', 'Plutonium', '(244)', 9, 10,
    'Am', 'Americium', '(243)', 10, 10,
    'Cm', 'Curium', '(247)', 11, 10,
    'Bk', 'Berkelium', '(247)', 12, 10,
    'Cf', 'Californium', '(251)', 13, 10,
    'Es', 'Einstenium', '(252)', 14, 10,
    'Fm', 'Fermium', '(257)', 15, 10,
    'Md', 'Mendelevium', '(258)', 16, 10,
    'No', 'Nobelium', '(259)', 17, 10,
    'Lr', 'Lawrencium', '(262)', 18, 10,
    'Rf', 'Rutherfordium', '(267)', 4, 7,
    'Db', 'Dubnium', '(268)', 5, 7,
    'Sg', 'Seaborgium', '(271)', 6, 7,
    'Bh', 'Bohrium', '(272)', 7, 7,
    'Hs', 'Hassium', '(270)', 8, 7,
    'Mt', 'Meitnerium', '(276)', 9, 7,
    'Ds', 'Darmstadium', '(281)', 10, 7,
    'Rg', 'Roentgenium', '(280)', 11, 7,
    'Cn', 'Copernicium', '(285)', 12, 7,
    'Nh', 'Nihonium', '(286)', 13, 7,
    'Fl', 'Flerovium', '(289)', 14, 7,
    'Mc', 'Moscovium', '(290)', 15, 7,
    'Lv', 'Livermorium', '(293)', 16, 7,
    'Ts', 'Tennessine', '(294)', 17, 7,
    'Og', 'Oganesson', '(294)', 18, 7
];

let camera, scene, renderer, controls;

const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

let webglScene, webglRenderer;
let stars;

let mouseX = 0, mouseY = 0;
let targetCameraRotationX = 0, targetCameraRotationY = 0;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // Mouse drift tracking
    document.addEventListener('mousemove', onDocumentMouseMove);

    // WebGL Background Scene
    webglScene = new THREE.Scene();

    // Create Cosmic Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10000;

        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.8); // Blueish/Cyan stars
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starsMaterial = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    stars = new THREE.Points(starsGeometry, starsMaterial);
    webglScene.add(stars);

    // table

    for (let i = 0; i < table.length; i += 5) {

        const element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
        element.tabIndex = 0; // Make element focusable for keyboard navigation

        // Wrap the detail call in a reusable function
        const openDetail = () => showElementDetail(table[i], table[i + 1], (i / 5) + 1, table[i + 2]);

        // Multiple event listeners for maximum reliability
        element.addEventListener('click', openDetail);
        element.addEventListener('dblclick', openDetail);
        element.addEventListener('touchend', (e) => {
            // Prevent interference with dragging but allow clear taps
            if (!controls.active) openDetail();
        });
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetail();
            }
        });

        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = (i / 5) + 1;
        element.appendChild(number);

        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = table[i];
        element.appendChild(symbol);

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
        element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);

        //

        const object = new THREE.Object3D();
        object.position.x = (table[i + 3] * 140) - 1330;
        object.position.y = - (table[i + 4] * 180) + 990;

        targets.table.push(object);

    }

    // sphere

    const vector = new THREE.Vector3();

    for (let i = 0, l = objects.length; i < l; i++) {

        const phi = Math.acos(- 1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(800, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);

    }

    // helix

    for (let i = 0, l = objects.length; i < l; i++) {

        const theta = i * 0.175 + Math.PI;
        const y = - (i * 8) + 450;

        const object = new THREE.Object3D();

        object.position.setFromCylindricalCoords(900, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        targets.helix.push(object);

    }

    // grid

    for (let i = 0; i < objects.length; i++) {

        const object = new THREE.Object3D();

        object.position.x = ((i % 5) * 400) - 800;
        object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
        object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

        targets.grid.push(object);

    }

    // WebGL Renderer (Background)
    webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.domElement.style.position = 'absolute';
    webglRenderer.domElement.style.top = '0';
    webglRenderer.domElement.style.zIndex = '0'; // Background
    document.getElementById('container').appendChild(webglRenderer.domElement);

    // CSS3D Renderer (Foreground)
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.zIndex = '1'; // Foreground
    renderer.domElement.style.pointerEvents = 'none'; // Pass through to WebGL
    document.getElementById('container').appendChild(renderer.domElement);


    //

    controls = new TrackballControls(camera, webglRenderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    console.log('Total objects:', objects.length);
    console.log('Targets table:', targets.table.length);

    const buttonTable = document.getElementById('table');
    buttonTable.addEventListener('click', function () {

        transform(targets.table, 2000);

    });

    const buttonSphere = document.getElementById('sphere');
    buttonSphere.addEventListener('click', function () {

        transform(targets.sphere, 2000);

    });

    const buttonHelix = document.getElementById('helix');
    buttonHelix.addEventListener('click', function () {

        transform(targets.helix, 2000);

    });

    const buttonGrid = document.getElementById('grid');
    buttonGrid.addEventListener('click', function () {

        transform(targets.grid, 2000);

    });

    transform(targets.table, 2000);

    // Modal Close Event
    document.getElementById('close-button').addEventListener('click', hideElementDetail);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') hideElementDetail();
    });

    // Keyboard support
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '1': case 't': case 'T': transform(targets.table, 2000); break;
            case '2': case 's': case 'S': transform(targets.sphere, 2000); break;
            case '3': case 'h': case 'H': transform(targets.helix, 2000); break;
            case '4': case 'g': case 'G': transform(targets.grid, 2000); break;
            case 'Escape': hideElementDetail(); break;
        }
    });

    //
    window.addEventListener('resize', onWindowResize);

}

function showElementDetail(symbol, name, number, mass) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-symbol').textContent = symbol;
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-number').textContent = 'Atomic Number: ' + number;
    document.getElementById('modal-mass').textContent = 'Atomic Mass: ' + mass;
    document.getElementById('modal-link').href = 'https://en.wikipedia.org/wiki/' + name;

    // Simple description based on position or default
    let desc = `<b>${name}</b> (${symbol}) is an element with atomic number ${number}. `;
    desc += `It has an atomic mass of ${mass}. Explore its properties and history on Wikipedia.`;
    document.getElementById('modal-description').innerHTML = desc;

    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('active'), 10);

    controls.enabled = false; // Disable 3D controls when modal is open
}

function hideElementDetail() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.style.display = 'none';
        controls.enabled = true; // Re-enable 3D controls
    }, 300);
}

function transform(targets, duration) {

    group.removeAll();

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        // Elastic position tween
        new TWEEN.Tween(object.position, group)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Back.Out)
            .start();

        // Smooth rotation tween
        new TWEEN.Tween(object.rotation, group)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

    }

    // Camera impact effect (subtle zoom pulse)
    new TWEEN.Tween(camera)
        .to({ fov: 45 }, 500)
        .easing(TWEEN.Easing.Quartic.Out)
        .onComplete(() => {
            new TWEEN.Tween(camera).to({ fov: 40 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).start();
        })
        .start();

    new TWEEN.Tween({}, group)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    group.update();

    // Cinematic Lazy Camera Follow
    targetCameraRotationX = (mouseY / window.innerHeight - 0.5) * 0.1;
    targetCameraRotationY = (mouseX / window.innerWidth - 0.5) * 0.1;

    // Weighty smoothing (lerp)
    scene.rotation.x += (targetCameraRotationX - scene.rotation.x) * 0.05;
    scene.rotation.y += (targetCameraRotationY - scene.rotation.y) * 0.05;

    controls.update();

    // Subtle background animation
    if (stars) {
        stars.rotation.y += 0.0003;
        stars.rotation.x += 0.0001;
        // Background slightly reacts to mouse too for depth
        stars.position.x += (mouseX / 100 - stars.position.x) * 0.01;
        stars.position.y += (-mouseY / 100 - stars.position.y) * 0.01;
    }

    render();

}

function onDocumentMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function render() {

    renderer.render(scene, camera);
    webglRenderer.render(webglScene, camera);

}
