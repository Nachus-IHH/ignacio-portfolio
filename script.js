const nav=document.querySelector('.topbar nav');
document.querySelector('.menu-toggle').addEventListener('click',e=>{const open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');}));
document.querySelector('#print-cv').addEventListener('click',()=>window.print());

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.section-heading,.timeline-item,.project-row,.research-layout,.learning-block,.contact h2').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

const nodes=[
{id:'math',label:'Mathematics',x:105,y:90,cat:'FOUNDATIONS',desc:'La base conceptual que conecta razonamiento, estructuras discretas y análisis de algoritmos.',links:['Graph Theory','Algorithms']},
{id:'graphs',label:'Graph Theory',x:285,y:65,cat:'THEORY',desc:'Un lenguaje para representar relaciones, restricciones y estructuras combinatorias. Es central en mi acercamiento a Vertex Cover.',links:['Mathematics','Vertex Cover','Databases']},
{id:'vertex',label:'Vertex Cover',x:490,y:115,cat:'RESEARCH',desc:'El problema que estudio en mi tesis: encontrar un conjunto de vértices que cubra todas las aristas de un grafo.',links:['Graph Theory','FPT','Kernelization']},
{id:'algorithms',label:'Algorithms',x:105,y:245,cat:'FOUNDATIONS',desc:'Me interesa diseñar algoritmos y comprender por qué funcionan, qué recursos consumen y cuándo son eficientes.',links:['Mathematics','FPT','Optimization']},
{id:'fpt',label:'FPT',x:330,y:220,cat:'RESEARCH',desc:'Parameterized Complexity permite estudiar problemas considerando un parámetro y analizar la dependencia de la complejidad respecto a él.',links:['Algorithms','Vertex Cover','Kernelization']},
{id:'kernel',label:'Kernelization',x:550,y:275,cat:'RESEARCH',desc:'Técnica de reducción que transforma una instancia en otra equivalente y acotada por el parámetro. Es uno de los ejes de mi investigación.',links:['FPT','Vertex Cover']},
{id:'backend',label:'Backend',x:105,y:395,cat:'ENGINEERING',desc:'Experiencia académica construyendo la lógica y los servicios que permiten operar a una aplicación.',links:['Spring Boot','Architecture','Databases']},
{id:'spring',label:'Spring Boot',x:285,y:405,cat:'TOOLS',desc:'Tecnología con la que he trabajado dentro del desarrollo backend y la construcción de aplicaciones.',links:['Backend','Architecture']},
{id:'db',label:'Databases',x:490,y:405,cat:'ENGINEERING',desc:'Me interesa cómo los sistemas gestores organizan información y resuelven concurrencia, consultas y optimización.',links:['Graph Theory','PostgreSQL','Backend']},
{id:'arch',label:'Architecture',x:660,y:200,cat:'ENGINEERING',desc:'Modularidad, separación de responsabilidades y patrones como Ports & Adapters y Event Subscriber forman parte de mis intereses.',links:['Backend','Spring Boot']},
{id:'postgres',label:'PostgreSQL',x:660,y:420,cat:'TOOLS',desc:'Sistema gestor de bases de datos con el que he trabajado; también he explorado PostGIS para información espacial.',links:['Databases']},
{id:'optimization',label:'Optimization',x:285,y:300,cat:'INTEREST',desc:'La búsqueda de soluciones eficientes conecta mis intereses en algoritmos, matemáticas y sistemas.',links:['Algorithms','FPT']}
];
const edges=[['math','graphs'],['math','algorithms'],['graphs','vertex'],['graphs','db'],['algorithms','fpt'],['algorithms','optimization'],['fpt','vertex'],['fpt','kernel'],['vertex','kernel'],['backend','spring'],['backend','db'],['backend','arch'],['spring','arch'],['db','postgres'],['optimization','fpt']];
const svgNS='http://www.w3.org/2000/svg', edgeLayer=document.querySelector('#kg-edges'),nodeLayer=document.querySelector('#kg-nodes');
const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));
edges.forEach(([a,b])=>{const p=document.createElementNS(svgNS,'line');p.setAttribute('x1',byId[a].x);p.setAttribute('y1',byId[a].y);p.setAttribute('x2',byId[b].x);p.setAttribute('y2',byId[b].y);p.classList.add('kg-edge');p.dataset.pair=[a,b].join('|');edgeLayer.appendChild(p)});
function selectNode(n){document.querySelectorAll('.kg-node').forEach(el=>el.classList.toggle('selected',el.dataset.id===n.id));document.querySelectorAll('.kg-edge').forEach(el=>el.classList.toggle('active',el.dataset.pair.split('|').includes(n.id)));document.querySelector('#node-category').textContent=n.cat+' / KNOWLEDGE';document.querySelector('#node-title').textContent=n.label;document.querySelector('#node-description').textContent=n.desc;document.querySelector('#node-links').textContent=n.links.join(' · ')}
nodes.forEach(n=>{const g=document.createElementNS(svgNS,'g');g.setAttribute('transform',`translate(${n.x},${n.y})`);g.setAttribute('class','kg-node');g.setAttribute('tabindex','0');g.setAttribute('role','button');g.setAttribute('aria-label',`Explorar ${n.label}`);g.dataset.id=n.id;const c=document.createElementNS(svgNS,'circle');c.setAttribute('r',n.label.length>12?39:34);const t=document.createElementNS(svgNS,'text');t.setAttribute('dy','4');t.textContent=n.label;g.append(c,t);g.addEventListener('click',()=>selectNode(n));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectNode(n)}});nodeLayer.appendChild(g)});
selectNode(byId.math);

// Contact details are intentionally placeholders until real links are supplied.
document.querySelectorAll('[data-placeholder]').forEach(el=>el.addEventListener('click',e=>{if(el.getAttribute('href')==='#'||el.dataset.placeholder==='email'&&el.getAttribute('href').includes('EJEMPLO')){e.preventDefault();alert('Este enlace es un placeholder. Sustitúyelo por tu dato real antes de publicar.');}}));