(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=[],n={data:null,snapshot:null,cache:{}},r={cache:null,snapshot:null},i={cache:null,snapshot:null,active:!1},a={cache:null,snapshot:null,active:!1},o=()=>{},s=()=>{},c=()=>{},l=()=>{};function u(e){o=e.addToHistoria,s=e.resetDeadCode,c=e.resetBadPatterns,l=e.prefetchAll}function d(){return e.map(e=>e.code.replace(/<[^>]+>/g,``)).join(`
`)}function f(){let t=document.getElementById(`editor`);t.innerHTML=``,e.forEach(function(e,n){let r=document.createElement(`div`);r.className=`code-line`+(e.dead?` dead`:``)+(e.warn?` warn-line`:``);let i=document.createElement(`span`);i.className=`line-num`,i.textContent=n+1;let a=document.createElement(`span`);if(a.className=`line-content`,a.innerHTML=e.code,r.appendChild(i),r.appendChild(a),e.tip){let t=document.createElement(`button`);t.className=`question-btn`,t.innerHTML=`?<div class="tooltip"><div class="tooltip-label">Co robi ta linia?</div>`+e.tip+`</div>`,r.appendChild(t)}t.appendChild(r)})}var p=/\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g;function ee(e,t){let n=e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);return(t===`py`||t===`python`)&&(n=n.replace(/(#.*)$/,`<span class="cm">$1</span>`),n=n.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,`<span class="str">$1</span>`),n=n.replace(/(@\w+)/g,`<span class="op">$1</span>`),n=n.replace(p,`<span class="kw">$1</span>`),n=n.replace(/\b(\w+)(?=\s*\()/g,`<span class="fn">$1</span>`),n=n.replace(/\b(\d+\.?\d*)\b/g,`<span class="str">$1</span>`),n=n.replace(/(__\w+__)/g,`<span class="var">$1</span>`)),n}function m(t){let r=t.files[0];if(!r)return;let i=r.name.split(`.`).pop().toLowerCase(),a=new FileReader;a.onload=function(a){let u=a.target.result,p=u.split(`
`);e.length=0,p.forEach(t=>e.push({code:ee(t,i),tip:null}));let m=document.querySelector(`.file-tab`);m&&(m.textContent=`📄 `+r.name),n.data=null,n.snapshot=null,s(),c(),f(),t.value=``,o(r.name,p.length,u);let ne=d();l(ne,r.name),te(u)},a.readAsText(r)}function te(t){fetch(`http://localhost:8000/line-tooltip/analyze`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:t})}).then(e=>e.json()).then(t=>{e.forEach(function(e,n){let r=ne(t.blocks,n+1);r&&(e.tip=`<strong>`+r.blok+`</strong><br>`+r.wyjasnienie)}),f()}).catch(()=>{})}function ne(e,t){for(let n=0;n<e.length;n++)if(e[n].start<=t&&t<=e[n].end)return e[n];return null}e.push({code:`<span class="kw">from</span> flask <span class="kw">import</span> Flask, jsonify`,tip:`Importujemy Flask — bibliotekę do budowania serwerów webowych, oraz jsonify — funkcję która zamienia dane Pythona na format JSON.`},{code:`<span class="kw">import</span> sqlite3`,tip:`Importujemy sqlite3 — wbudowaną bibliotekę Pythona do obsługi bazy danych SQLite.`},{code:``,tip:null},{code:`DB_PASSWORD = <span class="str">"haslo123"</span>  <span class="cm"># ⚠️ hardcoded!</span>`,tip:`PROBLEM: Hasło jest wpisane bezpośrednio w kodzie. Użyj: os.environ.get('DB_PASSWORD')`,warn:!0},{code:`app = Flask(<span class="var">__name__</span>)`,tip:`Tworzymy instancję aplikacji Flask.`},{code:``,tip:null},{code:`<span class="kw">def</span> <span class="fn">get_db_connection</span>():`,tip:`Definiujemy funkcję która tworzy połączenie z bazą danych.`},{code:`    conn = sqlite3.<span class="fn">connect</span>(<span class="str">'users.db'</span>)`,tip:`Otwieramy plik bazy danych o nazwie 'users.db'.`},{code:`    conn.row_factory = sqlite3.Row`,tip:`Ustawiamy sposób zwracania wyników — obiekty zamiast krotek.`},{code:`    <span class="kw">return</span> conn`,tip:`Zwracamy połączenie z bazą danych.`},{code:``,tip:null},{code:`<span class="op">@</span>app.<span class="fn">route</span>(<span class="str">'/users'</span>)`,tip:`Dekorator — Flask wywoła tę funkcję gdy przyjdzie żądanie na /users.`},{code:`<span class="kw">def</span> <span class="fn">get_users</span>():`,tip:`Definiujemy funkcję obsługującą endpoint /users.`},{code:`    conn = <span class="fn">get_db_connection</span>()`,tip:`Otwieramy połączenie z bazą danych.`},{code:`    users = conn.<span class="fn">execute</span>(<span class="str">'SELECT * FROM users'</span>).<span class="fn">fetchall</span>()`,tip:`Pobieramy wszystkich użytkowników z tabeli.`},{code:`    <span class="kw">return</span> <span class="fn">jsonify</span>([<span class="fn">dict</span>(u) <span class="kw">for</span> u <span class="kw">in</span> users])`,tip:`Zwracamy JSON z listą użytkowników.`},{code:``,tip:null},{code:`<span class="cm"># === STARY KOD — nigdy nie wywoływany ===</span>`,tip:`To jest komentarz — Python go ignoruje.`,dead:!0},{code:`<span class="kw">def</span> <span class="fn">old_get_users</span>():  <span class="cm"># 💀 martwy kod</span>`,tip:`PROBLEM: Ta funkcja nigdy nie jest wywoływana. Martwy kod — można usunąć.`,dead:!0},{code:`    <span class="kw">return</span> []`,tip:`Zwraca pustą listę. Martwy kod.`,dead:!0},{code:``,tip:null},{code:`<span class="kw">if</span> <span class="var">__name__</span> == <span class="str">"__main__"</span>:`,tip:`Ten blok wykona się tylko gdy uruchomisz plik bezpośrednio.`},{code:`    app.<span class="fn">run</span>(debug=<span class="kw">True</span>)`,tip:`Uruchamiamy serwer Flask w trybie debug.`}),document.addEventListener(`DOMContentLoaded`,f);var re=`checki_historia`,h=-2,ie=e=>e,g=()=>{},ae=()=>``,oe=()=>{},se=()=>{},ce=()=>{},le=()=>{};function ue(e){ie=e.highlightLine,g=e.renderEditor,ae=e.getOriginalCodeText,oe=e.resetDeadCode,se=e.resetBadPatterns,ce=e.applyDeadCodeResults,le=e.applyBadPatternResults}function de(){try{let e=localStorage.getItem(re),n=e?JSON.parse(e):[];t.length=0,n.forEach(e=>t.push(e))}catch{}}function _(){try{localStorage.setItem(re,JSON.stringify(t))}catch{}}function v(){h===-1?y():h>=0&&pe(h)}function y(){h=-1;let e=document.getElementById(`panel-body`);if(t.length===0){e.innerHTML=`<div style="font-size:12px;color:#94a3b8;padding:8px 0;">Brak historii — wgraj plik aby zacząć.</div>`;return}e.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Ostatnio analizowane pliki</div>`+t.map(function(e,t){let n=e.opis===`Wgrany plik — analiza w toku.`;return`<div class="analysis-card `+(e.bledy>0?`error`:e.ostrzezenia>0?`warn`:`ok`)+`" style="cursor:pointer;transition:transform 0.1s;" onclick="showHistoriaDetail(`+t+`)" onmouseover="this.style.transform='translateX(3px)'" onmouseout="this.style.transform='translateX(0)'"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><div class="card-title" style="flex:1">📄 `+e.nazwa+`</div><span style="font-size:10px;background:#0f1117;padding:2px 8px;border-radius:10px;color:#94a3b8">`+e.jezyk+`</span></div><div class="card-desc">`+(n?`⏳ Analiza w toku...`:e.opis)+`</div><div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;align-items:center;"><span style="font-size:11px;color:#4a5568">🕓 `+e.data+`</span><span style="font-size:11px;color:#4a5568">`+e.linie+` linii</span>`+fe(e)+`</div></div>`}).join(``)}function fe(e){let t=``;return e.bledy>0&&(t+=`<span style="font-size:11px;color:#ef4444">● `+e.bledy+` błędów</span>`),e.ostrzezenia>0&&(t+=`<span style="font-size:11px;color:#f59e0b">● `+e.ostrzezenia+` ostrzeżeń</span>`),e.bledy===0&&e.ostrzezenia===0&&e.opis!==`Wgrany plik — analiza w toku.`&&(t+=`<span style="font-size:11px;color:#22c55e">● Czysto</span>`),t}function pe(e){h=e;let n=t[e],r=document.getElementById(`panel-body`),i=n.opis===`Wgrany plik — analiza w toku.`;r.innerHTML=`<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;"><button onclick="showHistoria()" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">← Wróć</button><span style="font-size:13px;font-weight:600;color:#e2e8f0">📄 `+n.nazwa+`</span><span style="font-size:10px;background:#1a1d2e;padding:2px 8px;border-radius:10px;color:#94a3b8;border:1px solid #2d3148">`+n.jezyk+`</span>`+(n.kod?`<button onclick="loadKodFromHistoria(`+e+`)" style="margin-left:auto;background:#4f46e5;border:none;color:#fff;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">⬆ Wczytaj</button>`:``)+`</div><div class="analysis-card ok"><div class="card-title">📋 Co zawiera kod?</div><div class="card-desc">`+(i?`⏳ Trwa analiza...`:n.opis)+`</div><div style="display:flex;gap:12px;margin-top:8px;"><span style="font-size:11px;color:#4a5568">🕓 `+n.data+`</span><span style="font-size:11px;color:#4a5568">📏 `+n.linie+` linii</span></div></div>`+me(n,e)+(n.problemy&&n.problemy.length>0?`<div class="analysis-card error"><div class="card-title">🔴 Problemy (`+n.problemy.length+`)</div>`+n.problemy.map(e=>`<div class="card-desc" style="margin-top:6px;">• `+e+`</div>`).join(``)+`</div>`:i?``:`<div class="analysis-card ok"><div class="card-title">✅ Brak błędów</div><div class="card-desc">Nie wykryto krytycznych problemów.</div></div>`)+(n.sugestie&&n.sugestie.length>0?`<div class="analysis-card warn"><div class="card-title">💡 Sugestie (`+n.sugestie.length+`)</div>`+n.sugestie.map(e=>`<div class="card-desc" style="margin-top:6px;">• `+e+`</div>`).join(``)+`</div>`:``)}function me(e,t){function n(e,t,n,r){return`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #1a1d2e;"><span style="font-size:13px">`+e+`</span><span style="font-size:12px;color:#e2e8f0;flex:1">`+t+`</span>`+(n?`<span style="font-size:11px;color:#22c55e">✓ Gotowe`+(r?` · `+r:``)+`</span>`:`<span style="font-size:11px;color:#4a5568">⏳ ładowanie...</span>`)+`</div>`}let r=e.deadCodeData?e.deadCodeData.length:null,i=e.badPatternsData?e.badPatternsData.length:null;return`<div class="analysis-card" style="margin-bottom:8px;"><div class="card-title" style="margin-bottom:6px;">📊 Status analiz</div>`+n(`📄`,`Tłumacz kodu`,!!e.translatorData)+n(`🔬`,`Vivisekcja`,!!e.vivisekcjaData)+n(`💀`,`Martwy kod`,r!==null,r===null?``:r>0?r+` problemów`:`czysto`)+n(`⚠️`,`Złe wzorce`,i!==null,i===null?``:i>0?i+` problemów`:`czysto`)+(e.translatorData?`<div style="margin-top:8px;"><button onclick="openTranslatorFromHistoria(historia[`+t+`].translatorData)" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px;font-family:inherit">📄 Otwórz tłumaczenie</button></div>`:``)+`</div>`}function he(e,n,r){let i=new Date,a=i.getHours()+`:`+String(i.getMinutes()).padStart(2,`0`);if(t.length>0&&t[0].nazwa===e){r&&(t[0].kod=r),t[0].translatorData=null,t[0].vivisekcjaData=null,t[0].deadCodeData=null,t[0].badPatternsData=null,t[0].problemy=[],t[0].sugestie=[],t[0].bledy=0,t[0].ostrzezenia=0,t[0].opis=`Wgrany plik — analiza w toku.`,_();return}t.unshift({nazwa:e,jezyk:_e(e),data:`dzisiaj, `+a,linie:n,bledy:0,ostrzezenia:0,opis:`Wgrany plik — analiza w toku.`,problemy:[],sugestie:[],translatorData:null,vivisekcjaData:null,deadCodeData:null,badPatternsData:null,kod:r||null}),t.length>20&&t.splice(20),_()}function ge(o){let s=t[o];if(!s.kod)return;let c=s.nazwa.split(`.`).pop().toLowerCase(),l=s.kod.split(`
`);e.length=0,l.forEach(t=>e.push({code:ie(t,c),tip:null}));let u=document.querySelector(`.file-tab`);u&&(u.textContent=`📄 `+s.nazwa),oe(),se(),g();let d=ae();n.data=s.translatorData||null,n.snapshot=s.translatorData?d:null,s.translatorData&&(n.cache[d]=s.translatorData),r.cache=s.vivisekcjaData||null,r.snapshot=s.vivisekcjaData?d:null,s.deadCodeData&&s.deadCodeData.length>0&&(i.cache=s.deadCodeData,i.snapshot=d,i.active=!0,ce(s.deadCodeData)),s.badPatternsData&&s.badPatternsData.length>0&&(a.cache=s.badPatternsData,a.snapshot=d,a.active=!0,le(s.badPatternsData)),h=-2,y()}function _e(e){let t=e.split(`.`).pop().toLowerCase();return{py:`Python`,js:`JavaScript`,ts:`TypeScript`,html:`HTML`,css:`CSS`,json:`JSON`,txt:`Text`}[t]||t.toUpperCase()}de();var ve=()=>``;function ye(e){ve=e.getOriginalCodeText,e.addToHistoria}var b=!1;function be(){let e=document.getElementById(`translator-drawer`);if(!e)return;e.classList.add(`open`);let t=ve();if(n.data){n.snapshot=t,b?Te():x();return}if(n.cache[t]){n.data=n.cache[t],n.snapshot=t,b=!1,x();return}n.data=null,n.snapshot=null,b=!1,Ce(),Se(t)}function xe(){let e=document.getElementById(`translator-drawer`);e&&e.classList.remove(`open`)}function Se(e){fetch(`http://localhost:8000/translator/explain-lines`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(t=>{n.data=t.lines,n.snapshot=e,n.cache[e]=t.lines,t.lines,x()}).catch(we)}function Ce(){let e=document.getElementById(`translator-body`);e&&(e.innerHTML=`<div style="color:#94a3b8;font-size:12px;padding:16px;text-align:center;">⏳ Tłumaczę kod...</div>`)}function we(){let e=document.getElementById(`translator-body`);e&&(e.innerHTML=`<div style="color:#ef4444;font-size:12px;padding:16px;">❌ Błąd połączenia z backendem.</div>`)}function x(){let e=document.getElementById(`translator-body`);!e||!n.data||(e.innerHTML=n.data.map(function(e,t){return`<div style="padding:8px 0;border-bottom:1px solid #1a1d2e;"><div style="display:flex;gap:8px;align-items:baseline;"><span style="font-size:11px;color:#4a5568;min-width:20px">`+(t+1)+`</span><code style="font-size:11px;color:#98c379;flex:1;word-break:break-all">`+ke(e.code||``)+`</code></div>`+(e.tip?`<div style="font-size:12px;color:#c8d0e0;margin-top:4px;margin-left:28px;line-height:1.5">`+e.tip+`</div>`:``)+`</div>`}).join(``))}function Te(){let e=document.getElementById(`translator-body`);!e||!n.data||(e.innerHTML=`<div style="font-size:13px;color:#c8d0e0;line-height:1.8;padding:8px 0;">`+n.data.filter(e=>e.tip).map(e=>`<p style="margin:0 0 8px">`+e.tip+`</p>`).join(``)+`</div>`)}function Ee(){b=!b,De(),n.data&&(b?Te():x())}function De(){let e=document.querySelector(`.translator-wand-btn`);e&&(e.style.opacity=b?`1`:`0.5`,e.title=b?`Wróć do footnotes`:`Scal w tekst`)}function Oe(e){if(!e)return;n.data=e,n.snapshot=null,b=!1;let t=document.getElementById(`translator-drawer`);t&&t.classList.add(`open`),x()}function ke(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var S=()=>``,C=()=>{};function Ae(e){S=e.getOriginalCodeText,C=e.saveHistoria}function je(){let e=document.getElementById(`vivisekcja-panel`);if(!e)return;e.classList.add(`open`);let t=S();if(r.cache){r.snapshot=t,w(r.cache);return}r.cache=null,r.snapshot=null,Pe(),Ne(t)}function Me(){let e=document.getElementById(`vivisekcja-panel`);e&&e.classList.remove(`open`)}function Ne(e){fetch(`http://localhost:8000/vivisekcja/analyze`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(n=>{if(r.cache=n.markdown,r.snapshot=e,w(n.markdown),t.length>0){t[0].vivisekcjaData=n.markdown;let e=n.markdown.split(`
`).find(e=>e.trim()&&!e.startsWith(`#`))||``;e&&(t[0].opis=e.replace(/\*\*/g,``).trim()),C()}}).catch(Fe)}function Pe(){let e=document.getElementById(`vivisekcja-body`);e&&(e.innerHTML=`<div class="viv-loading">⏳ Analizuję kod krok po kroku...</div>`)}function Fe(){let e=document.getElementById(`vivisekcja-body`);e&&(e.innerHTML=`<div class="viv-error">❌ Nie można połączyć się z backendem. Upewnij się że serwer działa na porcie 8000.</div>`)}function w(e){let t=document.getElementById(`vivisekcja-body`);t&&(t.innerHTML=Ie(e))}function Ie(e){let t=e.split(`
`),n=``,r=!1,i=!1,a=``,o=[];function s(){if(o.length<2){r=!1,o=[];return}let e=`<table class="viv-table">`;o.forEach(function(t,n){let r=t.split(`|`).map(e=>e.trim()).filter(e=>e);if(n===1)return;let i=n===0?`th`:`td`;e+=`<tr>`+r.map(e=>`<`+i+`>`+T(e)+`</`+i+`>`).join(``)+`</tr>`}),n+=e+`</table>`,r=!1,o=[]}return t.forEach(function(e){if(e.startsWith("```")){i?(n+=`<pre class="viv-code"><code>`+Le(a.trim())+`</code></pre>`,a=``,i=!1):(r&&s(),i=!0);return}if(i){a+=e+`
`;return}if(e.trim().startsWith(`|`)){r||=!0,o.push(e.trim());return}else r&&s();if(e.startsWith(`### `)){n+=`<h3 class="viv-h3">`+T(e.slice(4))+`</h3>`;return}if(e.startsWith(`## `)){n+=`<h2 class="viv-h2">`+T(e.slice(3))+`</h2>`;return}if(e.startsWith(`# `)){n+=`<h1 class="viv-h1">`+T(e.slice(2))+`</h1>`;return}if(e.trim()===`---`){n+=`<hr class="viv-hr">`;return}if(e.trim()===``){n+=`<div class="viv-gap"></div>`;return}n+=`<p class="viv-p">`+T(e)+`</p>`}),r&&s(),n}function T(e){return e.replace(/`([^`]+)`/g,`<code class="viv-inline-code">$1</code>`).replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`).replace(/\*([^*]+)\*/g,`<em>$1</em>`)}function Le(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var E=()=>``,Re=()=>{},ze=()=>{};function Be(e){E=e.getOriginalCodeText,Re=e.saveHistoria,ze=e.refreshHistoriaIfVisible}function Ve(){i.active=!0;let e=E();if(i.cache&&i.snapshot===e){D(i.cache);return}Ue(),He(e)}function He(e){fetch(`http://localhost:8000/dead-code/detect`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(n=>{i.cache=n.dead,i.snapshot=e,D(n.dead),t.length>0&&(t[0].deadCodeData=n.dead,t[0].problemy=(t[0].problemy||[]).concat(n.dead.map(e=>e.label+` (linia `+e.lines[0]+`)`)),t[0].bledy=(t[0].bledy||0)+n.dead.length,Re(),ze())}).catch(We)}function D(e){if(O(),e.length===0){Ge([]);return}let t={};e.forEach(e=>e.lines.forEach(n=>t[n]=e)),document.querySelectorAll(`#editor .code-line`).forEach(function(e,n){t[n+1]&&e.classList.add(`dead-highlight`)});let n=document.querySelector(`.dead-code-badge`);n&&(n.textContent=e.length,n.style.display=``),Ge(e)}function O(){document.querySelectorAll(`#editor .code-line.dead-highlight`).forEach(e=>e.classList.remove(`dead-highlight`))}function Ue(){let e=document.getElementById(`panel-body`);e&&(e.innerHTML=`<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Szukam martwego kodu...</div>`)}function We(){let e=document.getElementById(`panel-body`);e&&(e.innerHTML=`<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>`),i.active=!1}function Ge(e){let t=document.getElementById(`panel-body`);if(t){if(e.length===0){t.innerHTML=`<div class="analysis-card ok"><div class="card-title">✅ Brak martwego kodu</div><div class="card-desc">Nie znaleziono nieużywanego ani nieosiągalnego kodu.</div></div>`;return}t.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">💀 Znaleziono `+e.length+` problem`+(e.length>1?`y`:``)+`:</div>`+e.map(function(e){let t=e.lines.length===1?`linia `+e.lines[0]:`linie `+e.lines[0]+`–`+e.lines[e.lines.length-1];return`<div class="analysis-card error" style="cursor:pointer;" onclick="highlightDeadLines(`+JSON.stringify(e.lines)+`)"><div class="card-title">💀 `+e.label+`</div><div class="card-desc">`+e.reason+`</div><div class="card-line">→ `+t+`</div></div>`}).join(``)}}function Ke(e){document.querySelectorAll(`#editor .code-line.dead-pulse`).forEach(e=>e.classList.remove(`dead-pulse`));let t=document.querySelectorAll(`#editor .code-line`);e.forEach(function(n){let r=t[n-1];r&&(r.classList.add(`dead-pulse`),n===e[0]&&r.scrollIntoView({behavior:`smooth`,block:`center`}))})}function qe(){i.active=!1,i.cache=null,i.snapshot=null,O();let e=document.querySelector(`.dead-code-badge`);e&&(e.textContent=``,e.style.display=`none`)}var Je=()=>``,Ye=()=>{},Xe=()=>{};function Ze(e){Je=e.getOriginalCodeText,Ye=e.saveHistoria,Xe=e.refreshHistoriaIfVisible}var Qe={critical:`#ef4444`,high:`#f97316`,medium:`#f59e0b`,low:`#94a3b8`},$e={critical:`🔴 Krytyczny`,high:`🟠 Wysoki`,medium:`🟡 Średni`,low:`⚪ Niski`},et={security:`🔒`,reliability:`⚙️`,maintainability:`🧹`,performance:`⚡`,best_practices:`📐`};function tt(){a.active=!0;let e=Je();if(a.cache&&a.snapshot===e){k(a.cache);return}it(),nt(e)}function nt(e){fetch(`http://localhost:8000/bad-patterns/detect`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(n=>{if(a.cache=n.issues,a.snapshot=e,k(n.issues),t.length>0){let e=n.issues.filter(e=>e.severity===`critical`||e.severity===`high`),r=n.issues.filter(e=>e.severity===`medium`||e.severity===`low`);t[0].badPatternsData=n.issues,t[0].problemy=(t[0].problemy||[]).concat(e.map(e=>`[`+e.category+`] `+e.label+` (linia `+e.lines[0]+`)`)),t[0].sugestie=(t[0].sugestie||[]).concat(r.map(e=>`[`+e.category+`] `+e.label+` (linia `+e.lines[0]+`)`)),t[0].bledy=(t[0].bledy||0)+e.length,t[0].ostrzezenia=(t[0].ostrzezenia||0)+r.length,Ye(),Xe()}}).catch(at)}function k(e){if(A(),e.length===0){ot([]);return}let t={};e.forEach(e=>e.lines.forEach(n=>{(!t[n]||rt(e.severity)<rt(t[n].severity))&&(t[n]=e)})),document.querySelectorAll(`#editor .code-line`).forEach(function(e,n){t[n+1]&&(e.classList.add(`bad-pattern-highlight`),e.style.setProperty(`--bad-color`,Qe[t[n+1].severity]||`#f59e0b`))});let n=document.querySelector(`.bad-patterns-badge`);n&&(n.textContent=e.length,n.style.display=``),ot(e)}function A(){document.querySelectorAll(`#editor .code-line.bad-pattern-highlight`).forEach(e=>{e.classList.remove(`bad-pattern-highlight`),e.style.removeProperty(`--bad-color`)}),document.querySelectorAll(`#editor .code-line.bad-pattern-pulse`).forEach(e=>e.classList.remove(`bad-pattern-pulse`))}function rt(e){return{critical:0,high:1,medium:2,low:3}[e]||3}function it(){let e=document.getElementById(`panel-body`);e&&(e.innerHTML=`<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Analizuję wzorce...</div>`)}function at(){let e=document.getElementById(`panel-body`);e&&(e.innerHTML=`<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>`),a.active=!1}function ot(e){let t=document.getElementById(`panel-body`);if(t){if(e.length===0){t.innerHTML=`<div class="analysis-card ok"><div class="card-title">✅ Brak złych wzorców</div><div class="card-desc">Kod wygląda czysto we wszystkich 5 kategoriach.</div></div>`;return}t.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">⚠️ Znaleziono `+e.length+` problem`+(e.length>1?`ów`:``)+`:</div>`+e.map(function(e){let t=e.severity||`medium`,n=Qe[t]||`#f59e0b`,r=e.lines.length===1?`linia `+e.lines[0]:`linie `+e.lines[0]+`–`+e.lines[e.lines.length-1];return`<div class="analysis-card" style="border-left:3px solid `+n+`;cursor:pointer;" onclick="highlightBadPatternLines(`+JSON.stringify(e.lines)+`)"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:10px;color:`+n+`;font-weight:600">`+$e[t]+`</span><span style="font-size:10px;color:#4a5568">`+(et[e.category]||`⚠️`)+` `+e.category+`</span></div><div class="card-title">`+e.label+`</div><div class="card-desc">`+e.reason+`</div>`+(e.fix?`<div class="card-desc" style="margin-top:4px;color:#22c55e;font-size:11px;">💡 `+e.fix+`</div>`:``)+`<div class="card-line">→ `+r+`</div></div>`}).join(``)}}function st(e){document.querySelectorAll(`#editor .code-line.bad-pattern-pulse`).forEach(e=>e.classList.remove(`bad-pattern-pulse`));let t=document.querySelectorAll(`#editor .code-line`);e.forEach(function(n){let r=t[n-1];r&&(r.classList.add(`bad-pattern-pulse`),n===e[0]&&r.scrollIntoView({behavior:`smooth`,block:`center`}))})}function ct(){a.active=!1,a.cache=null,a.snapshot=null,A();let e=document.querySelector(`.bad-patterns-badge`);e&&(e.textContent=``,e.style.display=`none`)}var j=null,M={eco:`🌿 Eco`,comfort:`☕ Comfort`,sport:`🏎️ Sport`,enterprise:`🏢 Enterprise`,security:`🔒 Security`};function lt(e){if(j===e){ut();return}j&&document.body.classList.remove(`mode-`+j),j=e,document.body.classList.add(`mode-`+e),document.querySelectorAll(`.mode-btn`).forEach(e=>e.classList.remove(`active`));let t=document.querySelector(`.mode-btn[data-mode="`+e+`"]`);t&&t.classList.add(`active`);let n=document.getElementById(`editor-mode-tabs`);if(n){n.style.display=`flex`;let t=document.getElementById(`tab-rewritten-btn`);t&&(t.textContent=`✨ `+M[e])}N(`original`,document.getElementById(`tab-original-btn`));let r=document.getElementById(`editor-rewritten`);r&&(r.innerHTML=`<div style="color:#4a5568;font-size:12px;">Kliknij "▶ Analizuj" aby przepisać kod w trybie `+M[e]+`...</div>`),pt(M[e])}function ut(){j&&document.body.classList.remove(`mode-`+j),j=null,document.querySelectorAll(`.mode-btn`).forEach(e=>e.classList.remove(`active`));let e=document.getElementById(`editor-mode-tabs`);e&&(e.style.display=`none`);let t=document.getElementById(`editor`),n=document.getElementById(`editor-rewritten`);t&&(t.style.display=``),n&&(n.style.display=`none`);let r=document.getElementById(`statusbar-mode`);r&&r.remove()}function N(e,t){document.querySelectorAll(`.editor-tab`).forEach(e=>e.classList.remove(`active`)),t&&t.classList.add(`active`);let n=document.getElementById(`editor`),r=document.getElementById(`editor-rewritten`);e===`original`?(n&&(n.style.display=``),r&&(r.style.display=`none`)):(n&&(n.style.display=`none`),r&&(r.style.display=``))}function dt(){return e.map(function(e){let t=document.createElement(`div`);return t.innerHTML=e.code,t.textContent||t.innerText||``}).join(`
`)}function ft(){if(!j)return;let e=document.getElementById(`editor-rewritten`);e&&(N(`rewritten`,document.getElementById(`tab-rewritten-btn`)),e.innerHTML=`<div style="color:#94a3b8;font-size:12px;">⏳ Przepisuję kod w trybie `+M[j]+`...</div>`,fetch(`http://localhost:8000/programming-mode/rewrite`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:dt(),mode:j})}).then(e=>e.json()).then(t=>{e.innerHTML=``;let n=document.createElement(`pre`);Object.assign(n.style,{fontFamily:`'Courier New', monospace`,fontSize:`13px`,color:`#e2e8f0`,whiteSpace:`pre-wrap`,lineHeight:`1.6`,margin:`0`}),n.textContent=t.rewritten_code,e.appendChild(n)}).catch(()=>{e.innerHTML=`<div style="color:#ef4444;font-size:12px;">❌ Nie można połączyć się z backendem.</div>`}))}function pt(e){let t=document.querySelector(`.statusbar`);if(!t)return;let n=document.getElementById(`statusbar-mode`);n||(n=document.createElement(`span`),n.id=`statusbar-mode`,t.insertBefore(n,t.firstChild)),n.textContent=`Tryb: `+e}var mt=()=>{},ht=()=>{},P=()=>{};function gt(e){mt=e.renderujArchiwum,ht=e.clearDeadCodeHighlights,P=e.clearBadPatternHighlights}function _t(e,t){document.querySelectorAll(`.tab`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let n=document.getElementById(`panel-body`);t===`nauka`?n.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Tryb nauki — AI pisze najprostszy możliwy kod</div><div class="analysis-card ok"><div class="card-title">🎓 Zasada trybu nauki</div><div class="card-desc">AI będzie pisać kod bez skrótów, bez magii. Każdy krok osobno, z komentarzami. Idealny do nauki przez czytanie.</div></div><div class="analysis-card"><div class="card-title">Przykład — tryb normalny:</div><div class="card-desc"><code style="color:#a78bfa">users = [u for u in db.execute('SELECT * FROM users')]</code></div></div><div class="analysis-card ok"><div class="card-title">Przykład — tryb nauki:</div><div class="card-desc" style="line-height:2"><code style="color:#98c379">wyniki = db.execute('SELECT * FROM users')</code><br><code style="color:#98c379">lista_uzytkownikow = []</code><br><code style="color:#98c379">for uzytkownik in wyniki:</code><br><code style="color:#98c379">&nbsp;&nbsp;&nbsp;&nbsp;lista_uzytkownikow.append(uzytkownik)</code></div></div>`:t===`text2code`?n.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Opisz co chcesz zrobić</div><div class="analysis-card"><div class="card-title">Przykładowe polecenie:</div><div class="card-desc">"stwórz funkcję która pobiera użytkowników z bazy i zwraca tylko tych którzy mają więcej niż 18 lat"</div></div><div class="analysis-card ok"><div class="card-title">✅ Wygenerowany kod:</div><div class="card-desc" style="line-height:2"><code style="color:#98c379">def pobierz_doroslych():</code><br><code style="color:#98c379">&nbsp;&nbsp;conn = get_db_connection()</code><br><code style="color:#98c379">&nbsp;&nbsp;query = 'SELECT * FROM users WHERE wiek > 18'</code><br><code style="color:#98c379">&nbsp;&nbsp;return conn.execute(query).fetchall()</code></div></div>`:t===`agenci`?n.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Wybierz agenta</div><div class="analysis-card" style="cursor:pointer"><div class="card-title">🤖 Agent Backend</div><div class="card-desc">Pisze profesjonalny kod serwerowy — API, bazy danych, autentykacja.</div></div><div class="analysis-card warn" style="cursor:pointer"><div class="card-title">🛡️ Agent Security</div><div class="card-desc">Analizuje kod pod kątem luk bezpieczeństwa i proponuje poprawki.</div></div><div class="analysis-card" style="cursor:pointer"><div class="card-title">🎨 Agent Frontend</div><div class="card-desc">Tworzy komponenty UI, style, responsywny layout.</div></div>`:t===`archiwum`?mt(n):n.innerHTML=`<div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">Podsumowanie kodu:</div><div class="analysis-card ok"><div class="card-title">📄 Co robi ten kod?</div><div class="card-desc">Prosta aplikacja Flask z jednym endpointem <code style="color:#a78bfa">/users</code>. Pobiera użytkowników z bazy danych i zwraca jako JSON.</div></div><div class="analysis-card error"><div class="card-title">💀 Martwy kod</div><div class="card-desc">Funkcja <code style="color:#a78bfa">old_get_users()</code> nigdy nie jest wywoływana.</div><div class="card-line">→ linia 18–22</div></div><div class="analysis-card warn"><div class="card-title">⚠️ Złe rozwiązanie</div><div class="card-desc">Hasło do bazy danych jest wpisane bezpośrednio w kodzie.</div><div class="card-line">→ linia 4</div></div>`}function vt(e){document.querySelectorAll(`.sidebar-item`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),ht(),i.active=!1,P(),a.active=!1}function yt(){let e=document.getElementById(`ai-input`),t=e.value.trim();if(!t)return;let n=document.getElementById(`panel-body`),r=document.createElement(`div`);r.className=`analysis-card ok`,r.innerHTML=`<div class="card-title">💬 Ty: `+t+`</div><div class="card-desc" style="color:#a78bfa">🤖 AI analizuje... (to demo, AI odpowie po podpięciu backendu)</div>`,n.prepend(r),e.value=``}document.addEventListener(`DOMContentLoaded`,function(){let e=document.getElementById(`ai-input`);e&&e.addEventListener(`keydown`,e=>{e.key===`Enter`&&yt()})});var F=[{nazwa:`os`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`System plików i procesy`,opis:`Moduł os daje dostęp do funkcji zależnych od systemu operacyjnego. Pozwala na pracę ze ścieżkami plików, folderami, zmiennymi środowiskowymi i procesami — wszystko to w sposób przenośny między Windows, Mac i Linux.`,zawiera:[`os.path — operacje na ścieżkach (join, exists, dirname)`,`os.environ — zmienne środowiskowe`,`os.listdir, os.makedirs — przeglądanie i tworzenie folderów`,`os.getpid, os.system — informacje o procesach`,`os.walk — rekurencyjne przechodzenie przez katalogi`],imp:`import os`},{nazwa:`sys`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Interpreter i środowisko`,opis:`Moduł sys daje dostęp do zmiennych i funkcji ściśle związanych z interpreterem Pythona. Jest niezbędny gdy chcesz manipulować ścieżkami importu, czytać argumenty z linii poleceń lub kontrolować wyjście programu.`,zawiera:[`sys.argv — lista argumentów z linii poleceń`,`sys.path — lista ścieżek przeszukiwanych przy imporcie`,`sys.exit — kończenie programu z kodem wyjścia`,`sys.stdin/stdout/stderr — standardowe strumienie I/O`,`sys.version — informacja o wersji Pythona`],imp:`import sys`},{nazwa:`json`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Format wymiany danych`,opis:`Moduł json pozwala na serializację i deserializację danych w formacie JSON — standardowym formacie wymiany danych w internecie. Zamienia słowniki i listy Pythona na tekst JSON i odwrotnie.`,zawiera:[`json.dumps — Python → JSON string`,`json.loads — JSON string → Python`,`json.dump — zapis do pliku`,`json.load — odczyt z pliku`,`indent, ensure_ascii, sort_keys — opcje formatowania`],imp:`import json`},{nazwa:`re`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wyrażenia regularne`,opis:`Moduł re implementuje wyrażenia regularne — potężny język do wyszukiwania i zamiany wzorców w tekście. Pozwala w kilku znakach wyrazić złożone reguły dopasowania.`,zawiera:[`re.search — szuka wzorca gdziekolwiek w tekście`,`re.match — sprawdza czy tekst ZACZYNA SIĘ od wzorca`,`re.findall — zwraca listę wszystkich dopasowań`,`re.sub — zamienia dopasowania na inny tekst`,`re.compile — kompiluje wzorzec do wielokrotnego użytku`],imp:`import re`},{nazwa:`math`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Funkcje matematyczne`,opis:`Moduł math zawiera funkcje i stałe matematyczne. Operuje na liczbach zmiennoprzecinkowych i jest szybszy niż implementacje w czystym Pythonie bo korzysta z bibliotek C.`,zawiera:[`math.sqrt, math.pow — pierwiastek i potęga`,`math.floor, math.ceil — zaokrąglanie w dół i górę`,`math.sin, math.cos, math.tan — trygonometria`,`math.log, math.exp — logarytm i eksponenta`,`math.pi, math.e — stałe matematyczne`],imp:`import math`},{nazwa:`datetime`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Daty i czas`,opis:`Moduł datetime dostarcza klas do pracy z datami i czasem. Pozwala tworzyć, porównywać i formatować daty oraz obliczać różnice czasowe.`,zawiera:[`datetime.datetime — data i czas razem`,`datetime.date — tylko data`,`datetime.timedelta — różnica między datami`,`strftime — formatowanie daty jako tekst`,`strptime — parsowanie tekstu jako datę`],imp:`from datetime import datetime, timedelta`},{nazwa:`time`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Czas i pauzy`,opis:`Moduł time daje dostęp do funkcji związanych z czasem na poziomie systemu. Najczęściej używany do wstrzymywania programu i mierzenia czasu wykonania.`,zawiera:[`time.sleep — zatrzymuje program na N sekund`,`time.time — aktualny czas jako timestamp (float)`,`time.perf_counter — precyzyjny licznik do benchmarków`,`time.strftime — formatowanie czasu systemowego`,`time.monotonic — czas który nigdy nie cofa się wstecz`],imp:`import time`},{nazwa:`random`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Losowość`,opis:`Moduł random implementuje generatory liczb pseudolosowych. Używany do symulacji, gier, losowania próbek i tasowania danych. Nie nadaje się do celów kryptograficznych.`,zawiera:[`random.choice — losuje jeden element z listy`,`random.choices — losuje N elementów (z powtórzeniami)`,`random.sample — losuje N unikalnych elementów`,`random.shuffle — tasuje listę w miejscu`,`random.randint — losowa liczba całkowita z zakresu`],imp:`import random`},{nazwa:`collections`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Zaawansowane kolekcje`,opis:`Moduł collections dostarcza wyspecjalizowane struktury danych będące alternatywami dla wbudowanych dict, list, set i tuple. Każda rozwiązuje konkretny problem wydajnościowy lub ergonomiczny.`,zawiera:[`Counter — zlicza wystąpienia elementów`,`defaultdict — słownik z wartością domyślną`,`deque — kolejka dwustronna z szybkim dodawaniem z obu stron`,`namedtuple — krotka z nazwanymi polami`,`OrderedDict — słownik pamiętający kolejność wstawiania`],imp:`from collections import Counter, defaultdict, deque`},{nazwa:`itertools`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Narzędzia iteratorów`,opis:`Moduł itertools zawiera funkcje do tworzenia i łączenia iteratorów. Inspirowany funkcjonalnymi językami programowania — pozwala budować efektywne pipelines bez tworzenia list pośrednich.`,zawiera:[`chain — łączy wiele iteratorów w jeden`,`combinations, permutations — kombinatoryka`,`product — iloczyn kartezjański`,`groupby — grupuje elementy według klucza`,`islice — wycina fragment iteratora bez indeksowania`],imp:`import itertools`},{nazwa:`functools`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Programowanie funkcyjne`,opis:`Moduł functools zawiera narzędzia do programowania wyższego rzędu — operowania na funkcjach jako obiektach. Szczególnie przydatny do optymalizacji i dekoratorów.`,zawiera:[`lru_cache — cache wyników funkcji (memoizacja)`,`partial — tworzy funkcję z częściowo wypełnionymi argumentami`,`reduce — redukuje sekwencję do jednej wartości`,`wraps — zachowuje metadane funkcji w dekoratorze`,`cached_property — właściwość obliczana raz i cachowana`],imp:`from functools import lru_cache, partial`},{nazwa:`pathlib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Ścieżki jako obiekty`,opis:`Moduł pathlib wprowadza obiektowy interfejs do pracy ze ścieżkami systemu plików. Jest czytelniejszy i bardziej elegancki niż os.path, a operator / pozwala budować ścieżki intuicyjnie.`,zawiera:[`Path / "folder" / "plik.txt" — budowanie ścieżek operatorem /`,`Path.exists, is_file, is_dir — sprawdzanie co istnieje`,`Path.read_text, write_text — prosty odczyt i zapis pliku`,`Path.glob — wyszukiwanie plików według wzorca`,`Path.mkdir, unlink, rename — operacje na plikach`],imp:`from pathlib import Path`},{nazwa:`typing`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Adnotacje typów`,opis:`Moduł typing dostarcza narzędzia do adnotacji typów w kodzie Pythona. Nie wymusza typów w runtime, ale pozwala narzędziom (mypy, IDE) wykrywać błędy przed uruchomieniem.`,zawiera:[`List, Dict, Set, Tuple — typy kolekcji`,`Optional — wartość lub None`,`Union — jedna z kilku możliwych typów`,`Any — wyłącza sprawdzanie typów`,`Callable — typ funkcji, TypeVar — zmienne typów`],imp:`from typing import List, Dict, Optional, Union`},{nazwa:`asyncio`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Programowanie asynchroniczne`,opis:`Moduł asyncio implementuje pętlę zdarzeń do programowania asynchronicznego. Pozwala na wykonywanie wielu operacji I/O jednocześnie bez blokowania — idealne dla serwerów i klientów sieciowych.`,zawiera:[`asyncio.run — uruchamia funkcję async`,`asyncio.gather — czeka na wiele coroutines jednocześnie`,`asyncio.sleep — asynchroniczne opóźnienie`,`asyncio.create_task — tworzy zadanie działające w tle`,`asyncio.Queue — kolejka dla async producent-konsument`],imp:`import asyncio`},{nazwa:`subprocess`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Zewnętrzne procesy`,opis:`Moduł subprocess pozwala uruchamiać zewnętrzne programy i polecenia systemowe z Pythona, przechwytywać ich wyjście i sprawdzać kody błędów.`,zawiera:[`subprocess.run — uruchamia polecenie i czeka na wynik`,`capture_output=True — przechwytuje stdout i stderr`,`check=True — rzuca błąd gdy program zwróci kod != 0`,`subprocess.Popen — zaawansowana kontrola procesu`,`shell=True — uruchamia przez powłokę systemową`],imp:`import subprocess`},{nazwa:`threading`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wątki`,opis:`Moduł threading pozwala na wielowątkowość w Pythonie. Ze względu na GIL (Global Interpreter Lock) wątki nie przyspieszają obliczeń CPU, ale są skuteczne przy operacjach I/O.`,zawiera:[`Thread — tworzenie i uruchamianie wątku`,`Thread.start, join — start i czekanie na zakończenie`,`Lock, RLock — synchronizacja dostępu do zasobów`,`Event — sygnalizowanie między wątkami`,`ThreadPoolExecutor (concurrent.futures) — pula wątków`],imp:`import threading`},{nazwa:`logging`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Logowanie`,opis:`Moduł logging dostarcza elastyczny system logowania dla Pythona. Pozwala na zapisywanie informacji diagnostycznych do pliku, konsoli lub zewnętrznych serwisów z różnymi poziomami ważności.`,zawiera:[`DEBUG, INFO, WARNING, ERROR, CRITICAL — poziomy logów`,`logging.basicConfig — szybka konfiguracja`,`FileHandler, StreamHandler — cel logowania`,`Formatter — format wiadomości (czas, poziom, treść)`,`getLogger — osobne loggery dla różnych modułów`],imp:`import logging`},{nazwa:`unittest`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Testy (wbudowane)`,opis:`Moduł unittest to wbudowany framework do testów jednostkowych, wzorowany na JUnit z Javy. Choć pytest jest popularniejszy, unittest jest zawsze dostępny bez instalacji.`,zawiera:[`TestCase — klasa bazowa testów`,`assertEqual, assertTrue, assertRaises — asercje`,`setUp, tearDown — kod przed i po każdym teście`,`mock.patch — zastępowanie obiektów w testach`,`unittest.main — uruchamianie testów z linii poleceń`],imp:`import unittest`},{nazwa:`dataclasses`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Klasy danych`,opis:`Moduł dataclasses (Python 3.7+) automatycznie generuje metody __init__, __repr__, __eq__ dla klas służących głównie do przechowywania danych. Eliminuje powtarzalny kod.`,zawiera:[`@dataclass — dekorator generujący metody`,`field() — konfiguracja pól (default, factory)`,`frozen=True — niemutowalna dataklasa`,`__post_init__ — kod po automatycznym __init__`,`asdict, astuple — konwersja do słownika/krotki`],imp:`from dataclasses import dataclass, field`},{nazwa:`abc`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Klasy abstrakcyjne`,opis:`Moduł abc (Abstract Base Classes) pozwala definiować interfejsy w Pythonie. Klasa abstrakcyjna wymusza implementację określonych metod w podklasach — program rzuci błąd przy próbie pominięcia.`,zawiera:[`ABC — klasa bazowa do dziedziczenia`,`@abstractmethod — dekorator metody którą TRZEBA zaimplementować`,`@abstractproperty — abstrakcyjna właściwość`,`ABCMeta — metaclass dla klas abstrakcyjnych`,`register — rejestrowanie wirtualnych podklas`],imp:`from abc import ABC, abstractmethod`},{nazwa:`copy`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kopiowanie obiektów`,opis:`Moduł copy rozwiązuje kluczowy problem Pythona: przypisanie zmiennej nie tworzy kopii obiektu. copy() tworzy płytką kopię, deepcopy() — pełną niezależną kopię całej struktury.`,zawiera:[`copy.copy — płytka kopia (listy wewnętrzne są współdzielone)`,`copy.deepcopy — głęboka kopia (wszystko niezależne)`,`__copy__, __deepcopy__ — własna implementacja kopiowania`],imp:`import copy`},{nazwa:`hashlib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Funkcje skrótu`,opis:`Moduł hashlib implementuje kryptograficzne funkcje skrótu. Używany do weryfikacji integralności danych, przechowywania haseł i podpisów cyfrowych.`,zawiera:[`hashlib.sha256, sha512 — skróty SHA`,`hashlib.md5 — MD5 (nie do haseł, tylko weryfikacji)`,`hashlib.blake2b — nowoczesny szybki skrót`,`hexdigest() — wynik jako string szesnastkowy`,`pbkdf2_hmac — bezpieczne haszowanie haseł`],imp:`import hashlib`},{nazwa:`csv`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Pliki CSV`,opis:`Moduł csv obsługuje popularne pliki CSV (Comma-Separated Values). Rozwiązuje problemy ze znakami specjalnymi, cudzysłowami i różnymi separatorami, które pojawiają się przy ręcznym parsowaniu.`,zawiera:[`csv.reader — iterator przez wiersze CSV`,`csv.writer — zapis do CSV`,`csv.DictReader — wiersze jako słowniki`,`csv.DictWriter — zapis ze słowników`,`delimiter, quotechar — konfiguracja formatu`],imp:`import csv`},{nazwa:`sqlite3`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Baza danych w pliku`,opis:`Moduł sqlite3 daje dostęp do bazy danych SQLite — lekkiej, bezserwerowej bazy przechowującej dane w jednym pliku. Idealna do małych projektów, prototypów i aplikacji lokalnych.`,zawiera:[`connect — otwiera/tworzy plik bazy danych`,`execute — wykonuje zapytanie SQL`,`fetchall, fetchone — pobieranie wyników`,`commit, rollback — zarządzanie transakcjami`,`Row factory — wyniki jako słowniki`],imp:`import sqlite3`},{nazwa:`argparse`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Argumenty CLI`,opis:`Moduł argparse to standardowy sposób na tworzenie interfejsów linii poleceń w Pythonie. Automatycznie generuje pomoc (--help), waliduje typy argumentów i obsługuje flagi.`,zawiera:[`add_argument — definiowanie parametrów`,`type= — automatyczna konwersja typu`,`required=, default= — walidacja i wartości domyślne`,`nargs — przyjmowanie wielu wartości`,`subparsers — podkomendy (jak git commit, git push)`],imp:`import argparse`},{nazwa:`enum`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Typy wyliczeniowe`,opis:`Moduł enum pozwala tworzyć typy wyliczeniowe — zbiory nazwanych stałych. Zamiast magicznych liczb (0, 1, 2) używasz czytelnych nazw (Status.PENDING, Status.DONE).`,zawiera:[`Enum — podstawowy typ wyliczeniowy`,`IntEnum — enum kompatybilny z int`,`auto() — automatyczne wartości`,`.name, .value — nazwa i wartość elementu`,`@unique — gwarancja unikalności wartości`],imp:`from enum import Enum, auto`},{nazwa:`contextlib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Context managery`,opis:`Moduł contextlib ułatwia tworzenie własnych context managerów (bloków with) bez pisania pełnej klasy z __enter__ i __exit__. Generator z yield zastępuje całą klasę.`,zawiera:[`@contextmanager — dekorator zamiast klasy`,`contextlib.suppress — ignoruje wybrane wyjątki`,`contextlib.redirect_stdout — przekierowuje wyjście`,`ExitStack — dynamiczne łączenie context managerów`,`asynccontextmanager — wersja async`],imp:`from contextlib import contextmanager`},{nazwa:`decimal`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Precyzyjne obliczenia`,opis:`Moduł decimal rozwiązuje klasyczny problem Pythona: float(0.1) + float(0.2) != 0.3. Decimal daje pełną kontrolę nad precyzją i zaokrąglaniem — niezbędny w systemach finansowych.`,zawiera:[`Decimal("0.1") — tworzenie z tekstu (nie float!)`,`getcontext().prec — ustawienie precyzji`,`ROUND_HALF_UP, ROUND_DOWN — tryby zaokrąglania`,`Decimal.quantize — zaokrąglanie do N miejsc po przecinku`,`Dzialania arytmetyczne jak na zwyklych liczbach`],imp:`from decimal import Decimal, getcontext`},{nazwa:`statistics`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Statystyki`,opis:`Moduł statistics (Python 3.4+) zawiera podstawowe funkcje statystyczne. Dla prostych analiz nie trzeba instalować NumPy czy SciPy.`,zawiera:[`mean — średnia arytmetyczna`,`median — mediana (środkowa wartość)`,`mode — moda (najczęstsza wartość)`,`stdev, variance — odchylenie std i wariancja`,`NormalDist — rozkład normalny`],imp:`import statistics`},{nazwa:`flask`,pip:`pip install flask`,kat:`web`,tworca:`Armin Ronacher / Pallets Projects`,krotki:`Mikro-framework webowy`,opis:`Flask to minimalistyczny framework webowy dla Pythona. Nie narzuca struktury projektu ani wyboru bazy danych — dajesz mu to co chcesz. Idealny do API, małych serwisów i szybkich prototypów. Jeden z najpopularniejszych frameworków Python na świecie.`,zawiera:[`@app.route — definiowanie endpointów URL`,`request — dane przychodzącego żądania HTTP`,`jsonify — zamiana danych na odpowiedź JSON`,`Blueprint — podział aplikacji na moduły`,`Flask-SQLAlchemy, Flask-Login — popularne rozszerzenia`],imp:`from flask import Flask, request, jsonify`},{nazwa:`fastapi`,pip:`pip install fastapi uvicorn`,kat:`web`,tworca:`Sebastián Ramírez`,krotki:`Nowoczesne API z typami`,opis:`FastAPI to nowoczesny, bardzo szybki framework do budowania API w Pythonie 3.6+. Automatycznie generuje dokumentację Swagger, waliduje dane przez Pydantic i obsługuje async. Jeden z najszybciej rosnących frameworków Python.`,zawiera:[`@app.get, @app.post — dekoratory endpointów`,`Pydantic BaseModel — automatyczna walidacja danych`,`Dependency Injection — wstrzykiwanie zależności`,`Swagger UI pod /docs — automatyczna dokumentacja`,`async/await — natywna obsługa asynchroniczna`],imp:`from fastapi import FastAPI, HTTPException`},{nazwa:`django`,pip:`pip install django`,kat:`web`,tworca:`Django Software Foundation`,krotki:`Pełny framework webowy`,opis:`Django to kompletny framework webowy "batteries included" — zawiera ORM, panel administracyjny, system autentykacji, szablony i wiele więcej. Używany przez Instagram, Pinterest, Disqus. Dla dużych projektów wymagających szybkiego startu.`,zawiera:[`ORM — modele bazy danych jako klasy Python`,`Admin panel — automatyczny interfejs zarządzania danymi`,`Django REST Framework — budowanie API`,`migrations — wersjonowanie schematu bazy danych`,`django.auth — gotowy system logowania i uprawnień`],imp:`import django`},{nazwa:`requests`,pip:`pip install requests`,kat:`web`,tworca:`Kenneth Reitz`,krotki:`HTTP dla ludzi`,opis:`Requests to najpopularniejsza biblioteka Python do wysyłania żądań HTTP. Jej motto "HTTP for Humans" idealnie opisuje cel: tam gdzie urllib wymaga dziesiątek linii, requests daje jedną.`,zawiera:[`requests.get, post, put, delete — metody HTTP`,`response.json() — automatyczne parsowanie JSON`,`session — utrzymanie cookies między żądaniami`,`timeout, retry — obsługa błędów sieciowych`,`headers, params, json — parametry żądania`],imp:`import requests`},{nazwa:`httpx`,pip:`pip install httpx`,kat:`web`,tworca:`Encode`,krotki:`Nowoczesny klient HTTP`,opis:`HTTPX to nowoczesna alternatywa dla requests z obsługą async/await, HTTP/2 i typami. API jest niemal identyczne z requests co ułatwia migrację. Idealny dla aplikacji FastAPI i asyncio.`,zawiera:[`httpx.get, post — synchroniczny interfejs jak requests`,`async with httpx.AsyncClient — asynchroniczne żądania`,`HTTP/2 — multipleksowanie połączeń`,`Automatyczne przekierowania i retry`,`httpx.Client — sesja z connection poolingiem`],imp:`import httpx`},{nazwa:`aiohttp`,pip:`pip install aiohttp`,kat:`web`,tworca:`aio-libs team`,krotki:`Async HTTP klient i serwer`,opis:`aiohttp to asynchroniczna biblioteka HTTP dla Pythona — zarówno klient jak i serwer. Pozwala obsługiwać tysiące połączeń jednocześnie. Popularna w aplikacjach wymagających high concurrency.`,zawiera:[`aiohttp.ClientSession — asynchroniczny klient HTTP`,`aiohttp.web.Application — serwer webowy`,`WebSocket — obsługa websocketów`,`response.json() — async parsowanie JSON`,`TCPConnector — konfiguracja connection poola`],imp:`import aiohttp`},{nazwa:`uvicorn`,pip:`pip install uvicorn`,kat:`web`,tworca:`Encode`,krotki:`Serwer ASGI`,opis:`Uvicorn to błyskawiczny serwer ASGI dla Pythona oparty na uvloop i httptools. Służy do uruchamiania aplikacji FastAPI i innych frameworków ASGI. Jeden z najszybszych serwerów Python.`,zawiera:[`uvicorn main:app --reload — development z autorestart`,`--workers N — wiele procesów (produkcja)`,`--host, --port — konfiguracja adresu`,`--ssl-keyfile, --ssl-certfile — HTTPS`,`Gunicorn + UvicornWorker — produkcyjne wdrożenie`],imp:`import uvicorn`},{nazwa:`pydantic`,pip:`pip install pydantic`,kat:`web`,tworca:`Samuel Colvin`,krotki:`Walidacja danych`,opis:`Pydantic to biblioteka do walidacji danych i ustawień w Pythonie. Definiujesz schemat jako klasę Python z typami, a Pydantic automatycznie waliduje dane wejściowe i konwertuje typy. Podstawa FastAPI.`,zawiera:[`BaseModel — klasa bazowa dla modeli danych`,`Field() — konfiguracja pól (default, validation)`,`@validator — własne reguły walidacji`,`model.dict(), model.json() — serializacja`,`BaseSettings — walidowane ustawienia z env vars`],imp:`from pydantic import BaseModel, Field`},{nazwa:`celery`,pip:`pip install celery redis`,kat:`web`,tworca:`Ask Solem`,krotki:`Kolejki zadań`,opis:`Celery to system kolejkowania zadań asynchronicznych dla Pythona. Pozwala wykonywać długotrwałe operacje w tle (wysyłanie maili, generowanie raportów) bez blokowania serwera webowego.`,zawiera:[`@app.task — dekorator tworzący zadanie`,`task.delay() — wysłanie zadania do kolejki`,`task.apply_async() — zadanie z opóźnieniem`,`Redis/RabbitMQ — broker kolejki`,`Flower — monitoring zadań w przeglądarce`],imp:`from celery import Celery`},{nazwa:`websockets`,pip:`pip install websockets`,kat:`web`,tworca:`Aymeric Augustin`,krotki:`Komunikacja w czasie rzeczywistym`,opis:`Biblioteka websockets implementuje protokół WebSocket w Pythonie — dwukierunkową komunikację między klientem a serwerem w czasie rzeczywistym. Używana w chatach, grach online i dashboardach live.`,zawiera:[`websockets.serve — serwer WebSocket`,`websockets.connect — klient WebSocket`,`send, recv — wysyłanie i odbieranie wiadomości`,`Obsługa wielu klientów jednocześnie przez asyncio`,`Ping/pong keepalive — utrzymanie połączenia`],imp:`import websockets`},{nazwa:`jinja2`,pip:`pip install jinja2`,kat:`web`,tworca:`Armin Ronacher / Pallets Projects`,krotki:`Szablony HTML`,opis:`Jinja2 to silnik szablonów dla Pythona wbudowany we Flask. Pozwala na dynamiczne generowanie HTML przez wstawianie zmiennych i logiki (pętle, warunki) bezpośrednio w plikach HTML.`,zawiera:[`{{ zmienna }} — wstawianie wartości`,`{% if %}, {% for %} — logika w szablonie`,`{% extends %}, {% block %} — dziedziczenie szablonów`,`Filtry: | upper, | truncate, | default`,`Environment — konfiguracja i bezpieczeństwo`],imp:`from jinja2 import Environment, FileSystemLoader`},{nazwa:`numpy`,pip:`pip install numpy`,kat:`data`,tworca:`Travis Oliphant / NumPy community`,krotki:`Obliczenia numeryczne`,opis:`NumPy to podstawowa biblioteka do obliczeń naukowych w Pythonie. Dostarcza wydajne tablice wielowymiarowe (ndarray) i funkcje matematyczne działające na nich. Jest podstawą większości bibliotek data science.`,zawiera:[`np.array — tworzenie tablic`,`np.zeros, ones, arange, linspace — generowanie danych`,`Operacje wektorowe: +, -, *, / na całych tablicach`,`np.dot, np.matmul — mnożenie macierzy`,`np.reshape, transpose, stack — manipulacja kształtem`],imp:`import numpy as np`},{nazwa:`pandas`,pip:`pip install pandas`,kat:`data`,tworca:`Wes McKinney`,krotki:`Analiza danych`,opis:`Pandas to najpopularniejsza biblioteka do analizy i manipulacji danymi w Pythonie. DataFrame to tabela z nazwanymi kolumnami — jak Excel w kodzie. Niezbędna w data science i automatyzacji raportów.`,zawiera:[`DataFrame — tabela z danymi`,`read_csv, read_excel — wczytywanie danych`,`groupby — grupowanie i agregacja`,`merge, join — łączenie tabel jak SQL`,`plot — szybkie wykresy z danych`],imp:`import pandas as pd`},{nazwa:`matplotlib`,pip:`pip install matplotlib`,kat:`data`,tworca:`John Hunter`,krotki:`Wykresy i wizualizacje`,opis:`Matplotlib to klasyczna biblioteka wizualizacji danych w Pythonie. Daje pełną kontrolę nad każdym elementem wykresu. Choć wymaga więcej kodu niż seaborn czy plotly, jest najpotężniejsza i najszerzej wspierana.`,zawiera:[`plt.plot, scatter, bar, hist — typy wykresów`,`plt.figure, subplot — wielokrotne wykresy`,`plt.xlabel, ylabel, title — opisy osi`,`plt.savefig — zapis do PNG/PDF/SVG`,`Axes API — pełna kontrola nad każdym elementem`],imp:`import matplotlib.pyplot as plt`},{nazwa:`seaborn`,pip:`pip install seaborn`,kat:`data`,tworca:`Michael Waskom`,krotki:`Wykresy statystyczne`,opis:`Seaborn to biblioteka wizualizacji zbudowana na matplotlib, specjalizująca się w wykresach statystycznych. Piękniejsze wykresy mniejszym kosztem kodu — szczególnie do eksploracji danych.`,zawiera:[`sns.heatmap — mapa cieplna korelacji`,`sns.pairplot — pary zmiennych naraz`,`sns.boxplot, violinplot — rozkłady`,`sns.barplot z przedziałami ufności`,`Integracja z pandas DataFrame`],imp:`import seaborn as sns`},{nazwa:`scipy`,pip:`pip install scipy`,kat:`data`,tworca:`Travis Oliphant / SciPy community`,krotki:`Obliczenia naukowe`,opis:`SciPy rozszerza NumPy o zaawansowane algorytmy naukowe. Zawiera narzędzia do optymalizacji, algebry liniowej, przetwarzania sygnałów i statystyki używane w nauce i inżynierii.`,zawiera:[`scipy.optimize — minimalizacja funkcji`,`scipy.stats — testy statystyczne, rozkłady`,`scipy.linalg — algebra liniowa`,`scipy.signal — przetwarzanie sygnałów`,`scipy.spatial — struktury przestrzenne (KDTree)`],imp:`import scipy`},{nazwa:`plotly`,pip:`pip install plotly`,kat:`data`,tworca:`Plotly Inc.`,krotki:`Interaktywne wykresy`,opis:`Plotly tworzy interaktywne wykresy które działają w przeglądarce — można je przybliżać, filtrować i eksportować. Plotly Express to uproszczone API do szybkiego tworzenia wizualizacji.`,zawiera:[`px.scatter, bar, line, histogram — szybkie wykresy`,`go.Figure — pełna kontrola nad wykresem`,`fig.show() — wyświetlenie w przeglądarce`,`Dash — budowanie dashboardów webowych`,`Eksport do HTML, PNG, SVG`],imp:`import plotly.express as px`},{nazwa:`pillow`,pip:`pip install Pillow`,kat:`data`,tworca:`Alex Clark / PIL team`,krotki:`Obróbka obrazów`,opis:`Pillow (PIL Fork) to podstawowa biblioteka do pracy z obrazami w Pythonie. Obsługuje dziesiątki formatów i pozwala na przycinanie, skalowanie, filtrowanie i konwersję obrazów.`,zawiera:[`Image.open — wczytanie obrazu`,`Image.resize, crop, rotate — transformacje`,`ImageFilter — filtry (blur, sharpen, edge)`,`Image.save — zapis w dowolnym formacie`,`ImageDraw — rysowanie na obrazie`],imp:`from PIL import Image, ImageFilter`},{nazwa:`openpyxl`,pip:`pip install openpyxl`,kat:`data`,tworca:`Eric Gazoni, Charlie Clark`,krotki:`Pliki Excel`,opis:`openpyxl pozwala czytać i tworzyć pliki Excel (.xlsx) w Pythonie bez instalacji Office. Obsługuje formatowanie, wykresy, formuły i duże arkusze. Pandas używa go jako silnika dla read_excel.`,zawiera:[`load_workbook — otwieranie pliku xlsx`,`Workbook, Worksheet — tworzenie od zera`,`ws.cell, ws.append — zapis danych`,`Formatowanie: czcionki, kolory, obramowania`,`Wykresy i formuły Excela`],imp:`from openpyxl import load_workbook`},{nazwa:`scikit-learn`,pip:`pip install scikit-learn`,kat:`ai`,tworca:`David Cournapeau / scikit-learn team`,krotki:`Uczenie maszynowe`,opis:`scikit-learn to najpopularniejsza biblioteka uczenia maszynowego w Pythonie. Oferuje spójny interfejs (fit/predict) dla setek algorytmów ML — od regresji po sieci neuronowe.`,zawiera:[`fit/predict/transform — jednolite API`,`Klasyfikacja: SVM, RandomForest, KNN`,`Regresja: LinearRegression, Ridge, Lasso`,`Klasteryzacja: KMeans, DBSCAN`,`Pipeline, GridSearchCV — walidacja i tuning`],imp:`from sklearn.ensemble import RandomForestClassifier`},{nazwa:`torch`,pip:`pip install torch`,kat:`ai`,tworca:`Facebook AI Research (Meta)`,krotki:`Sieci neuronowe (PyTorch)`,opis:`PyTorch to wiodący framework do głębokiego uczenia. Popularny w badaniach AI dzięki dynamicznemu grafowi obliczeniowemu i Pythonowej naturze. Podstawa większości nowoczesnych modeli językowych.`,zawiera:[`torch.Tensor — podstawowa struktura danych`,`nn.Module — budowanie modeli warstwa po warstwie`,`autograd — automatyczne różniczkowanie`,`DataLoader — ładowanie danych w batchach`,`torch.save/load — zapisywanie modeli`],imp:`import torch
import torch.nn as nn`},{nazwa:`tensorflow`,pip:`pip install tensorflow`,kat:`ai`,tworca:`Google Brain Team`,krotki:`Głębokie uczenie (Google)`,opis:`TensorFlow to framework do uczenia maszynowego od Google. Popularny w produkcji dzięki TensorFlow Serving, TFLite (mobile) i TensorFlow.js. Keras jest jego oficjalnym API wysokiego poziomu.`,zawiera:[`tf.keras — wysokopoziomowe API do budowania modeli`,`tf.data — efektywne pipeline danych`,`tf.function — kompilacja do grafu`,`TensorBoard — wizualizacja trenowania`,`TFLite — modele na urządzenia mobilne`],imp:`import tensorflow as tf`},{nazwa:`transformers`,pip:`pip install transformers`,kat:`ai`,tworca:`Hugging Face`,krotki:`Modele językowe`,opis:`Transformers od Hugging Face to biblioteka z tysiącami gotowych modeli językowych (BERT, GPT, T5, LLaMA). Pozwala w kilku linijkach użyć modeli do klasyfikacji tekstu, generowania, tłumaczenia i embeddings.`,zawiera:[`pipeline — gotowe modele w jednej linii`,`AutoModel, AutoTokenizer — ładowanie modeli`,`Trainer — trenowanie własnych modeli`,`from_pretrained — pobieranie z Hugging Face Hub`,`Obsługa PyTorch i TensorFlow`],imp:`from transformers import pipeline, AutoTokenizer`},{nazwa:`openai`,pip:`pip install openai`,kat:`ai`,tworca:`OpenAI`,krotki:`GPT-4, DALL-E, Whisper`,opis:`Oficjalny klient Python API OpenAI. Daje dostęp do modeli GPT-4, GPT-4o, DALL-E (generowanie obrazów), Whisper (transkrypcja audio) i Embeddings.`,zawiera:[`chat.completions.create — GPT-4/3.5 chat`,`images.generate — DALL-E generowanie obrazów`,`audio.transcriptions.create — Whisper STT`,`embeddings.create — wektory semantyczne`,`Streaming — odpowiedzi w czasie rzeczywistym`],imp:`from openai import OpenAI`},{nazwa:`anthropic`,pip:`pip install anthropic`,kat:`ai`,tworca:`Anthropic`,krotki:`Modele Claude`,opis:`Oficjalny klient Python API Anthropic. Daje dostęp do modeli Claude — asystentów AI znanych z bezpieczeństwa i długiego kontekstu (200k tokenów). Ten projekt używa tej właśnie biblioteki.`,zawiera:[`messages.create — chat z Claude`,`Streaming — odpowiedzi na żywo`,`Tool use — narzędzia i wywołania funkcji`,`Vision — analiza obrazów`,`claude-3-5-sonnet, claude-opus-4 — modele`],imp:`from anthropic import Anthropic`},{nazwa:`google-genai`,pip:`pip install google-genai`,kat:`ai`,tworca:`Google DeepMind`,krotki:`Modele Gemini`,opis:`Oficjalny klient Python dla API Google Gemini. Daje dostęp do modeli Gemini 2.5 Flash i Pro — wielomodalnych modeli AI obsługujących tekst, obrazy, audio i wideo.`,zawiera:[`client.models.generate_content — generowanie tekstu`,`Gemini 2.5 Flash — najszybszy i najtańszy`,`Gemini 2.0 Pro — najwyższa jakość`,`Multimodal — tekst + obraz + audio w jednym prompcie`,`Długi kontekst — do 2 milionów tokenów`],imp:`from google import genai`},{nazwa:`langchain`,pip:`pip install langchain`,kat:`ai`,tworca:`Harrison Chase / LangChain Inc.`,krotki:`Framework dla LLM`,opis:`LangChain to framework do budowania aplikacji opartych na modelach językowych. Dostarcza gotowe komponenty do łańcuchów promptów, agentów, pamięci i RAG (wyszukiwania w dokumentach).`,zawiera:[`LLMChain — łańcuchy wywołań LLM`,`PromptTemplate — dynamiczne prompty`,`VectorStore — wyszukiwanie semantyczne`,`Memory — pamięć konwersacji`,`Agents + Tools — autonomiczne agenty`],imp:`from langchain.chat_models import ChatOpenAI`},{nazwa:`langgraph`,pip:`pip install langgraph`,kat:`ai`,tworca:`LangChain Inc.`,krotki:`Agenci jako grafy`,opis:`LangGraph to biblioteka do budowania agentów AI jako grafów stanów. Daje pełną kontrolę nad przepływem między krokami — każdy węzeł to krok agenta, krawędzie to warunki przejścia.`,zawiera:[`StateGraph — definicja grafu stanów`,`add_node, add_edge — budowanie grafu`,`Conditional edges — warunkowe przejścia`,`Checkpointing — wznawianie po błędzie`,`Wsparcie dla multi-agent architectures`],imp:`from langgraph.graph import StateGraph`},{nazwa:`sentence-transformers`,pip:`pip install sentence-transformers`,kat:`ai`,tworca:`UKP Lab / Nils Reimers`,krotki:`Embeddingi tekstu`,opis:`Sentence Transformers to biblioteka do tworzenia gęstych wektorów reprezentujących znaczenie tekstu. Używana w wyszukiwaniu semantycznym, RAG i wykrywaniu podobieństwa tekstów.`,zawiera:[`SentenceTransformer.encode — zamiana tekstu na wektor`,`util.cos_sim — podobieństwo cosinusowe`,`util.semantic_search — szybkie wyszukiwanie`,`multilingual-e5-large — wielojęzyczny model`,`Integracja z Pinecone, Chroma, FAISS`],imp:`from sentence_transformers import SentenceTransformer`},{nazwa:`ollama`,pip:`pip install ollama`,kat:`ai`,tworca:`Ollama Inc.`,krotki:`Lokalne modele LLM`,opis:`Biblioteka Python do Ollamy — narzędzia do uruchamiania dużych modeli językowych lokalnie na własnym komputerze. Llama, Mistral, Gemma i setki innych modeli bez wysyłania danych w chmurę.`,zawiera:[`ollama.chat — rozmowa z lokalnym modelem`,`ollama.generate — generowanie tekstu`,`ollama.embeddings — lokalne embeddingi`,`Streaming odpowiedzi`,`Wsparcie dla GPU (NVIDIA, Apple Silicon)`],imp:`import ollama`},{nazwa:`sqlalchemy`,pip:`pip install sqlalchemy`,kat:`db`,tworca:`Mike Bayer`,krotki:`ORM dla SQL`,opis:`SQLAlchemy to najpopularniejszy ORM (Object-Relational Mapper) dla Pythona. Pozwala opisywać tabele bazy danych jako klasy Python i pisać zapytania SQL w Pythonie. Obsługuje PostgreSQL, MySQL, SQLite i inne.`,zawiera:[`declarative_base — definiowanie modeli jako klas`,`Column, Integer, String — typy kolumn`,`session.add, commit, query — operacje CRUD`,`relationship — relacje między tabelami`,`Alembic — migracje schematu bazy danych`],imp:`from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import declarative_base`},{nazwa:`psycopg2`,pip:`pip install psycopg2-binary`,kat:`db`,tworca:`Federico Di Gregorio`,krotki:`PostgreSQL driver`,opis:`psycopg2 to najpopularniejszy adapter PostgreSQL dla Pythona. Szybki, bezpieczny i w pełni obsługujący specyficzne cechy PostgreSQL jak JSONB, tablice i transakcje.`,zawiera:[`connect — połączenie z PostgreSQL`,`cursor.execute — wykonanie zapytania`,`cursor.fetchall, fetchone — pobieranie wyników`,`%s placeholders — bezpieczne parametry (ochrona przed SQL injection)`,`connection.commit, rollback — transakcje`],imp:`import psycopg2`},{nazwa:`pymongo`,pip:`pip install pymongo`,kat:`db`,tworca:`MongoDB Inc.`,krotki:`MongoDB driver`,opis:`PyMongo to oficjalny driver Python dla MongoDB — dokumentowej bazy danych NoSQL. Dane są przechowywane jako dokumenty JSON, bez sztywnego schematu.`,zawiera:[`MongoClient — połączenie z bazą`,`db.collection.insert_one, insert_many — dodawanie`,`find, find_one — wyszukiwanie z filtrami`,`update_one, delete_one — modyfikacje`,`aggregate — zaawansowane zapytania pipeline`],imp:`from pymongo import MongoClient`},{nazwa:`redis-py`,pip:`pip install redis`,kat:`db`,tworca:`Andy McCurdy / Redis Ltd.`,krotki:`Cache i kolejki`,opis:`redis-py to klient Python dla Redis — błyskawicznej bazy danych klucz-wartość w pamięci RAM. Używana jako cache, sesje, kolejki wiadomości i liczniki w czasie rzeczywistym.`,zawiera:[`r.set, r.get — zapis i odczyt`,`r.expire — automatyczne wygasanie kluczy`,`r.lpush, rpop — kolejka (lista)`,`r.hset, hget — hash mapy`,`r.publish, subscribe — pub/sub komunikacja`],imp:`import redis`},{nazwa:`motor`,pip:`pip install motor`,kat:`db`,tworca:`A. Jesse Jiryu Davis / MongoDB Inc.`,krotki:`Async MongoDB`,opis:`Motor to asynchroniczny driver Python dla MongoDB, zaprojektowany do pracy z asyncio i Tornado. API jest niemal identyczne z PyMongo, ale wszystkie operacje są nieblokujące.`,zawiera:[`AsyncIOMotorClient — połączenie async`,`await collection.find_one — asynchroniczne zapytanie`,`async for doc in collection.find() — streaming wyników`,`Kompatybilność z FastAPI i asyncio`,`Wszystkie metody PyMongo w wersji async`],imp:`from motor.motor_asyncio import AsyncIOMotorClient`},{nazwa:`alembic`,pip:`pip install alembic`,kat:`db`,tworca:`Mike Bayer`,krotki:`Migracje bazy danych`,opis:`Alembic to narzędzie do migracji schematu bazy danych dla SQLAlchemy. Śledzi zmiany w modelach i generuje skrypty SQL do aktualizacji produkcyjnej bazy.`,zawiera:[`alembic init — inicjalizacja projektu migracji`,`alembic revision --autogenerate — auto-wykrywanie zmian`,`alembic upgrade head — aplikowanie migracji`,`alembic downgrade — cofanie zmian`,`Historia wersji schematu bazy`],imp:`# używany z CLI: alembic upgrade head`},{nazwa:`python-dotenv`,pip:`pip install python-dotenv`,kat:`utils`,tworca:`Saurabh Kumar`,krotki:`Zmienne środowiskowe`,opis:`python-dotenv wczytuje zmienne środowiskowe z pliku .env do os.environ. Standardowy sposób na przechowywanie kluczy API, haseł i konfiguracji poza kodem — szczególnie ważne żeby nie wpakowywać sekretów do gita.`,zawiera:[`load_dotenv() — wczytanie pliku .env`,`os.getenv("KLUCZ") — pobranie zmiennej`,`dotenv_values() — słownik bez modyfikacji environ`,`Wsparcie dla zagnieżdżonych .env`,`Automatyczne wyszukiwanie pliku .env`],imp:`from dotenv import load_dotenv
import os
load_dotenv()`},{nazwa:`click`,pip:`pip install click`,kat:`utils`,tworca:`Armin Ronacher / Pallets Projects`,krotki:`Narzędzia CLI`,opis:`Click to biblioteka do tworzenia interfejsów linii poleceń (CLI) w Pythonie. Za pomocą dekoratorów definiujesz komendy, opcje i argumenty — Click zajmuje się resztą łącznie z --help.`,zawiera:[`@click.command — definicja komendy`,`@click.option, @click.argument — parametry`,`@click.group — podkomendy (jak git)`,`click.echo, click.style — kolorowy output`,`Automatyczna generacja --help`],imp:`import click`},{nazwa:`rich`,pip:`pip install rich`,kat:`utils`,tworca:`Will McGuire`,krotki:`Piękny terminal`,opis:`Rich to biblioteka do bogatego formatowania wyjścia w terminalu. Kolorowy tekst, tabele, paski postępu, drzewa, kod z podświetlaniem składni — wszystko bez żadnej konfiguracji.`,zawiera:[`rich.print — kolorowe wypisywanie`,`Console — zaawansowane formatowanie`,`Table — tabele z kolorami i wyrównaniem`,`Progress — wieloliniowe paski postępu`,`Syntax — podświetlanie kodu w terminalu`],imp:`from rich import print
from rich.console import Console`},{nazwa:`tqdm`,pip:`pip install tqdm`,kat:`utils`,tworca:`Casper da Costa-Luis`,krotki:`Pasek postępu`,opis:`tqdm (arabskie "postęp") to biblioteka dodająca paski postępu do pętli w Pythonie. Jedna linijka kodu — zamiast for i in lista: piszesz for i in tqdm(lista): — i masz pasek z ETA.`,zawiera:[`tqdm(iterable) — pasek postępu w pętli`,`tqdm.notebook — wersja dla Jupyter`,`desc= — opis przy pasku`,`unit= — jednostka (pliki, wiersze)`,`trange — tqdm + range w jednym`],imp:`from tqdm import tqdm`},{nazwa:`pyyaml`,pip:`pip install pyyaml`,kat:`utils`,tworca:`Kirill Simonov`,krotki:`Format YAML`,opis:`PyYAML pozwala czytać i zapisywać pliki YAML — popularny format konfiguracji używany przez Docker Compose, Kubernetes, GitHub Actions i wiele innych narzędzi DevOps.`,zawiera:[`yaml.safe_load — wczytanie pliku YAML`,`yaml.dump — zapis do YAML`,`yaml.safe_load_all — wiele dokumentów w pliku`,`Obsługa typów: string, int, lista, słownik, None`,`safe_load zamiast load — ochrona przed code injection`],imp:`import yaml`},{nazwa:`boto3`,pip:`pip install boto3`,kat:`utils`,tworca:`Amazon Web Services`,krotki:`AWS SDK`,opis:`boto3 to oficjalny Python SDK dla Amazon Web Services. Pozwala zarządzać zasobami AWS z kodu — przechowywać pliki w S3, uruchamiać funkcje Lambda, korzystać z DynamoDB i setek innych usług.`,zawiera:[`s3.upload_file, download_file — operacje na S3`,`dynamodb.Table — baza NoSQL`,`lambda.invoke — wywołanie funkcji Lambda`,`ec2.instances — zarządzanie maszynami wirtualnymi`,`SQS — kolejki wiadomości`],imp:`import boto3`},{nazwa:`celery`,pip:`pip install celery`,kat:`utils`,tworca:`Ask Solem`,krotki:`Zadania w tle`,opis:`Celery to system kolejkowania zadań dla Pythona. Pozwala delegować długotrwałe operacje (wysyłanie maili, generowanie PDF, ML inference) do procesów roboczych działających w tle.`,zawiera:[`@app.task — definicja zadania`,`task.delay() — wysłanie do kolejki`,`task.apply_async(countdown=60) — z opóźnieniem`,`Redis/RabbitMQ — broker`,`Flower — webowy monitoring zadań`],imp:`from celery import Celery`},{nazwa:`paramiko`,pip:`pip install paramiko`,kat:`utils`,tworca:`Jeff Forcier`,krotki:`SSH z Pythona`,opis:`Paramiko to implementacja protokołu SSH2 w czystym Pythonie. Pozwala na zdalne połączenia SSH, transfer plików SFTP i tunele — bez potrzeby wywoływania zewnętrznych programów.`,zawiera:[`SSHClient.connect — połączenie SSH`,`exec_command — wykonanie polecenia`,`SFTPClient — transfer plików`,`Autentykacja kluczem lub hasłem`,`Przekierowanie portów (tunneling)`],imp:`import paramiko`},{nazwa:`cryptography`,pip:`pip install cryptography`,kat:`utils`,tworca:`Python Cryptographic Authority`,krotki:`Kryptografia`,opis:`cryptography to podstawowa biblioteka kryptograficzna dla Pythona. Oferuje wysokopoziomowe i niskopoziomowe API do szyfrowania, podpisów cyfrowych i certyfikatów SSL.`,zawiera:[`Fernet — symetryczne szyfrowanie AES`,`RSA, ECDSA — asymetryczne szyfrowanie`,`X.509 — certyfikaty SSL/TLS`,`HMAC — uwierzytelnianie wiadomości`,`hazmat — niskopoziomowe algorytmy kryptograficzne`],imp:`from cryptography.fernet import Fernet`},{nazwa:`structlog`,pip:`pip install structlog`,kat:`utils`,tworca:`Hynek Schlawack`,krotki:`Structured logging`,opis:`structlog to nowoczesna biblioteka logowania dla Pythona. Zamiast zwykłego tekstu produkuje ustrukturyzowane logi (JSON) które są łatwe do parsowania przez systemy monitoringu jak Datadog czy ELK.`,zawiera:[`structlog.get_logger — ustrukturyzowany logger`,`bound_logger — logger z kontekstem`,`Procesory: add_timestamp, format_exc_info`,`JSON/konsola renderer — wybór formatu`,`Integracja z Django, Flask, FastAPI`],imp:`import structlog`},{nazwa:`schedule`,pip:`pip install schedule`,kat:`utils`,tworca:`Daniel Bader`,krotki:`Planowanie zadań`,opis:`schedule to prosta biblioteka do uruchamiania zadań Pythona według harmonogramu — bez Cron, bez Celery. Idealna dla prostych automatyzacji: codziennych raportów, czyszczenia bazy itp.`,zawiera:[`schedule.every(10).minutes.do(zadanie)`,`schedule.every().hour.do`,`schedule.every().day.at("10:00").do`,`schedule.run_pending() — w głównej pętli`,`Obsługa wyjątków w zadaniach`],imp:`import schedule, time`},{nazwa:`arrow`,pip:`pip install arrow`,kat:`utils`,tworca:`Chris Smith`,krotki:`Lepsze daty`,opis:`Arrow to biblioteka do pracy z datami i czasem w Pythonie, która naprawia bolączki standardowego datetime — strefy czasowe, parsowanie, formatowanie i czytelne API.`,zawiera:[`arrow.now() — aktualny czas ze strefą czasową`,`arrow.get("2024-01-15") — parsowanie wielu formatów`,`arrow.humanize() — "3 godziny temu"`,`arrow.shift(days=+1) — dodawanie czasu`,`Automatyczna obsługa stref czasowych`],imp:`import arrow`},{nazwa:`beautifulsoup4`,pip:`pip install beautifulsoup4 lxml`,kat:`scraping`,tworca:`Leonard Richardson`,krotki:`Parsowanie HTML`,opis:`BeautifulSoup4 to biblioteka do parsowania HTML i XML. Zamienia chaotyczny HTML ze stron internetowych w drzewo obiektów Pythona po którym można łatwo nawigować i wyszukiwać elementy.`,zawiera:[`BeautifulSoup(html, "lxml") — parsowanie`,`find, find_all — wyszukiwanie elementów`,`.text, .get_text() — pobieranie tekstu`,`.attrs["href"] — dostęp do atrybutów`,`CSS selectors: soup.select("div.class")`],imp:`from bs4 import BeautifulSoup`},{nazwa:`selenium`,pip:`pip install selenium`,kat:`scraping`,tworca:`Jason Huggins`,krotki:`Automatyzacja przeglądarki`,opis:`Selenium to narzędzie do automatyzacji przeglądarek internetowych. Pozwala sterować Chrome/Firefox jak prawdziwy użytkownik — klikać, wypełniać formularze i scrpować dynamiczne strony (JavaScript).`,zawiera:[`webdriver.Chrome — uruchamianie przeglądarki`,`find_element — znajdowanie elementów`,`click, send_keys — interakcja z elementami`,`WebDriverWait — czekanie na element`,`screenshot — zrzut ekranu`],imp:`from selenium import webdriver
from selenium.webdriver.common.by import By`},{nazwa:`playwright`,pip:`pip install playwright && playwright install`,kat:`scraping`,tworca:`Microsoft`,krotki:`Nowoczesna automatyzacja`,opis:`Playwright to nowoczesna alternatywa dla Selenium od Microsoftu. Szybszy, stabilniejszy i z lepszą obsługą nowoczesnych stron. Obsługuje Chrome, Firefox i Safari. Ma też wersję async.`,zawiera:[`browser.new_page() — nowa strona`,`page.goto(url) — nawigacja`,`page.click, fill — interakcja`,`page.wait_for_selector — czekanie na element`,`page.screenshot, pdf — eksport`],imp:`from playwright.sync_api import sync_playwright`},{nazwa:`scrapy`,pip:`pip install scrapy`,kat:`scraping`,tworca:`Zyte (dawniej Scrapinghub)`,krotki:`Framework do scrapingu`,opis:`Scrapy to kompletny framework do web scrapingu i crawlingu. Zarządza kolejką URL, obsługuje robots.txt, rotację IP i równoległe pobieranie — wszystko czego potrzebujesz do profesjonalnego scrapingu.`,zawiera:[`Spider — klasa definiująca co i jak scrpować`,`yield scrapy.Request — dodawanie URL do kolejki`,`ItemLoader — wyciąganie i czyszczenie danych`,`Pipeline — przetwarzanie i zapis wyników`,`scrapy crawl — uruchamianie z CLI`],imp:`import scrapy`},{nazwa:`curl_cffi`,pip:`pip install curl_cffi`,kat:`scraping`,tworca:`yifeikong`,krotki:`HTTP omijający boty`,opis:`curl_cffi to klient HTTP który naśladuje fingerprint przeglądarek (Chrome, Safari, Firefox) na poziomie protokołu TLS. Pomaga ominąć niektóre systemy anty-botowe jak Cloudflare.`,zawiera:[`requests.get z parametrem impersonate=`,`impersonate="chrome124" — naśladowanie Chrome`,`Obsługa cookies i sesji`,`Async wersja z asyncio`,`Kompatybilne API z biblioteką requests`],imp:`from curl_cffi import requests as cf_requests`},{nazwa:`pytest`,pip:`pip install pytest`,kat:`testing`,tworca:`Holger Krekel / pytest-dev team`,krotki:`Framework testów`,opis:`pytest to najpopularniejszy framework testów dla Pythona. Prostszy niż wbudowany unittest, z potężnym systemem fixtures, parametryzacji i pluginów. Standardowy wybór w większości projektów.`,zawiera:[`def test_cokolwiek() — prosta funkcja testowa`,`assert — naturalne asercje (nie self.assertEqual)`,`@pytest.fixture — wielokrotnie używane dane testowe`,`@pytest.mark.parametrize — wiele zestawów danych`,`pytest-cov — pokrycie kodu testami`],imp:`import pytest`},{nazwa:`unittest.mock`,pip:`wbudowana`,kat:`testing`,tworca:`Python Software Foundation`,krotki:`Atrapy obiektów`,opis:`unittest.mock pozwala zastępować prawdziwe obiekty (bazy danych, API, pliki) atrapami (mock) w testach. Dzięki temu testy są szybkie, niezależne i nie mają efektów ubocznych.`,zawiera:[`Mock() — atrapa dowolnego obiektu`,`patch — tymczasowe zastąpienie obiektu`,`MagicMock — mock z magicznymi metodami`,`assert_called_with — sprawdzenie wywołania`,`side_effect — symulowanie wyjątków`],imp:`from unittest.mock import Mock, patch, MagicMock`},{nazwa:`faker`,pip:`pip install faker`,kat:`testing`,tworca:`joke2k`,krotki:`Dane testowe`,opis:`Faker generuje realistyczne fałszywe dane do testów — imiona, adresy, e-maile, numery telefonów, tekst lorem ipsum i setki innych typów. Obsługuje lokalizację pl_PL.`,zawiera:[`fake.name, fake.email, fake.address — podstawowe dane`,`fake.text, fake.paragraph — lorem ipsum`,`fake.date_between — daty z zakresu`,`Faker("pl_PL") — polskie dane`,`fake.unique — unikalne wartości`],imp:`from faker import Faker
fake = Faker("pl_PL")`},{nazwa:`hypothesis`,pip:`pip install hypothesis`,kat:`testing`,tworca:`David MacIver`,krotki:`Property-based testing`,opis:`Hypothesis implementuje property-based testing — zamiast pisać konkretne przypadki testowe, opisujesz właściwości które kod powinien spełniać, a Hypothesis generuje setki przypadków testowych automatycznie.`,zawiera:[`@given(st.integers()) — generowanie danych`,`st.text, st.lists, st.floats — strategie`,`@settings(max_examples=500) — konfiguracja`,`Automatyczne minimalizowanie błędów`,`Wykrywanie edge cases których nie wymyśliłbyś`],imp:`from hypothesis import given, strategies as st`},{nazwa:`black`,pip:`pip install black`,kat:`devtools`,tworca:`Łukasz Langa / PSF`,krotki:`Formatowanie kodu`,opis:`Black to "bezkompromisowy" formatter kodu Python. Automatycznie formatuje cały projekt według jednego, spójnego stylu. Koniec dyskusji o formatowaniu — Black decyduje za ciebie.`,zawiera:[`black plik.py — formatowanie pliku`,`black . — formatowanie całego projektu`,`--check — tylko sprawdzenie bez zmian`,`--line-length — długość linii (domyślnie 88)`,`Integracja z VS Code, PyCharm, pre-commit`],imp:`# CLI: black src/ --check`},{nazwa:`ruff`,pip:`pip install ruff`,kat:`devtools`,tworca:`Astral (Charlie Marsh)`,krotki:`Linter i formatter (szybki)`,opis:`Ruff to niezwykle szybki linter i formatter dla Pythona napisany w Rust. Zastępuje flake8, isort, pyupgrade i wiele innych narzędzi. 10-100x szybszy od poprzedników.`,zawiera:[`ruff check . — linting projektu`,`ruff format . — formatowanie jak Black`,`ruff check --fix — automatyczne naprawianie`,`Setki reguł (PEP8, flake8, isort)`,`Konfiguracja w pyproject.toml`],imp:`# CLI: ruff check . && ruff format .`},{nazwa:`mypy`,pip:`pip install mypy`,kat:`devtools`,tworca:`Jukka Lehtosalo / Dropbox`,krotki:`Statyczne typowanie`,opis:`mypy to statyczny analizator typów dla Pythona. Sprawdza czy typy w kodzie są poprawne bez uruchamiania programu — jak kompilator w językach statycznie typowanych.`,zawiera:[`mypy plik.py — sprawdzenie typów`,`--strict — rygorystyczne sprawdzanie`,`ignore[attr-defined] — ignorowanie błędu`,`reveal_type() — podgląd typu zmiennej`,`Integracja z IDE (VS Code, PyCharm)`],imp:`# CLI: mypy src/ --strict`},{nazwa:`pre-commit`,pip:`pip install pre-commit`,kat:`devtools`,tworca:`Anthony Sottile`,krotki:`Hooki git`,opis:`pre-commit to framework do zarządzania hookami git. Automatycznie uruchamia black, ruff, mypy i inne narzędzia przed każdym commitem — gwarantuje jakość kodu w repozytorium.`,zawiera:[`pre-commit install — instalacja hooków`,`pre-commit run --all-files — ręczne uruchomienie`,`.pre-commit-config.yaml — konfiguracja`,`Setki gotowych hooków na pre-commit.com`,`Integracja z CI/CD (GitHub Actions)`],imp:`# CLI: pre-commit install`},{nazwa:`sentry-sdk`,pip:`pip install sentry-sdk`,kat:`devtools`,tworca:`Sentry Inc.`,krotki:`Monitoring błędów`,opis:`Sentry SDK automatycznie przechwytuje błędy w aplikacji produkcyjnej i wysyła je do dashboardu Sentry z pełnym stack trace, kontekstem i informacją o użytkowniku. Niezbędne w produkcji.`,zawiera:[`sentry_sdk.init(dsn=...) — inicjalizacja`,`Automatyczne przechwytywanie wyjątków`,`capture_exception, capture_message — ręczne raporty`,`Performance monitoring — śledzenie czasu`,`Integracja z Flask, Django, FastAPI`],imp:`import sentry_sdk
sentry_sdk.init(dsn="https://...")`},{nazwa:`io`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Strumienie I/O`,opis:`Moduł io dostarcza narzędzia do pracy ze strumieniami wejścia/wyjścia. StringIO i BytesIO tworzą pliki w pamięci RAM — przydatne do testów i przetwarzania danych bez zapisu na dysk.`,zawiera:[`io.StringIO — plik tekstowy w pamięci`,`io.BytesIO — plik binarny w pamięci`,`io.TextIOWrapper — owijanie strumieni`,`Kompatybilny interfejs z prawdziwymi plikami`,`Używany przez pandas, requests, PIL`],imp:`import io
buf = io.StringIO()`},{nazwa:`shutil`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Operacje na plikach`,opis:`Moduł shutil (shell utilities) oferuje operacje wysokiego poziomu na plikach i folderach — kopiowanie, przenoszenie, usuwanie całych drzew katalogów i archiwa.`,zawiera:[`shutil.copy, copy2 — kopiowanie pliku`,`shutil.copytree — kopiowanie całego folderu`,`shutil.rmtree — usuwanie folderu z zawartością`,`shutil.move — przenoszenie/zmiana nazwy`,`shutil.make_archive — tworzenie ZIP/TAR`],imp:`import shutil`},{nazwa:`glob`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wyszukiwanie plików`,opis:`Moduł glob wyszukuje pliki według wzorców uniksowych (wildcards). Szybszy i prostszy niż os.walk gdy potrzebujesz tylko listy pasujących plików.`,zawiera:[`glob.glob("*.py") — lista plików`,`glob.glob("**/*.py", recursive=True) — rekurencyjnie`,`glob.iglob — generator (oszczędność pamięci)`,`Wzorce: *, ?, [abc] — jak w powłoce`,`Alternatywa: Path.glob() z pathlib`],imp:`import glob`},{nazwa:`pickle`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Serializacja obiektów`,opis:`Moduł pickle serializuje obiekty Pythona do bajtów i deserializuje z powrotem. Pozwala zapisywać i wczytywać złożone struktury (słowniki, klasy, listy). UWAGA: nie wczytuj pickle z niezaufanych źródeł.`,zawiera:[`pickle.dump — zapis obiektu do pliku`,`pickle.load — wczytanie obiektu z pliku`,`pickle.dumps/loads — konwersja do/z bytes`,`Obsługuje klasy, lambdy, closures`,`Nie używaj do komunikacji między aplikacjami`],imp:`import pickle`},{nazwa:`socket`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Komunikacja sieciowa`,opis:`Moduł socket to niskopoziomowy interfejs do komunikacji sieciowej TCP/UDP. Podstawa wszystkich bibliotek sieciowych Pythona. Bezpośrednio używany przy pisaniu własnych protokołów i narzędzi sieciowych.`,zawiera:[`socket.socket() — tworzenie gniazda`,`socket.connect — połączenie do serwera`,`socket.bind, listen, accept — serwer`,`send, recv — wysyłanie i odbieranie danych`,`socket.gethostbyname — rozwiązywanie DNS`],imp:`import socket`},{nazwa:`urllib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`HTTP bez zewnętrznych bibliotek`,opis:`Moduł urllib to wbudowany klient HTTP Pythona. Mniej wygodny niż requests, ale nie wymaga instalacji czegokolwiek — przydatny w środowiskach gdzie nie można instalować pakietów.`,zawiera:[`urllib.request.urlopen — proste żądanie GET`,`urllib.parse.urlencode — kodowanie parametrów URL`,`urllib.parse.urlparse — parsowanie URL`,`urllib.error — obsługa błędów HTTP`,`urllib.robotparser — obsługa robots.txt`],imp:`from urllib import request, parse`},{nazwa:`heapq`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kolejka priorytetowa`,opis:`Moduł heapq implementuje algorytm kopca (heap) — struktury danych gdzie najmniejszy element zawsze jest na górze. Idealne gdy potrzebujesz zawsze mieć dostęp do N najmniejszych lub największych elementów.`,zawiera:[`heapq.heappush — dodanie elementu`,`heapq.heappop — pobranie najmniejszego elementu`,`heapq.nlargest, nsmallest — top N elementów`,`heapq.heapify — zamiana listy w kopiec`,`Priorytetowa kolejka zadań`],imp:`import heapq`},{nazwa:`queue`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kolejki wielowątkowe`,opis:`Moduł queue dostarcza bezpiecznych wątkowo kolejek do komunikacji między wątkami. Rozwiązuje problem producent-konsument bez ręcznego zarządzania lockami.`,zawiera:[`Queue — kolejka FIFO (first in, first out)`,`LifoQueue — stos (last in, first out)`,`PriorityQueue — kolejka z priorytetami`,`put, get — dodawanie i pobieranie elementów`,`join, task_done — synchronizacja wątków`],imp:`from queue import Queue`},{nazwa:`textwrap`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Formatowanie tekstu`,opis:`Moduł textwrap formatuje długi tekst — zawija wiersze, usuwa wcięcia, skraca. Przydatny przy generowaniu dokumentacji, formatowaniu wiadomości i wyświetlaniu w terminalu.`,zawiera:[`textwrap.wrap — dzielenie tekstu na linie`,`textwrap.fill — gotowy tekst z zawijaniem`,`textwrap.dedent — usuwanie wspólnych wcięć`,`textwrap.shorten — skracanie z "..."`,`textwrap.indent — dodawanie wcięcia do każdej linii`],imp:`import textwrap`},{nazwa:`string`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Stałe i szablony`,opis:`Moduł string zawiera stałe z zestawami znaków oraz klasę Template do prostego podstawiania zmiennych. Częściej używany do stałych jak ascii_letters niż do formatowania.`,zawiera:[`string.ascii_letters — "abcABC...xyz"`,`string.digits — "0123456789"`,`string.punctuation — znaki interpunkcyjne`,`string.Template("$imie") — prosty szablon`,`string.capwords — kapitalizacja słów`],imp:`import string`},{nazwa:`starlette`,pip:`pip install starlette`,kat:`web`,tworca:`Encode`,krotki:`Bazowy framework ASGI`,opis:`Starlette to lekki framework ASGI będący fundamentem FastAPI. Zawiera routing, middleware, WebSocket i obsługę plików statycznych. Można używać samodzielnie lub przez FastAPI.`,zawiera:[`Request, Response — abstrakcje HTTP`,`Router — grupowanie endpointów`,`Middleware — przetwarzanie żądań`,`WebSocket — obsługa websocketów`,`StaticFiles — serwowanie plików statycznych`],imp:`from starlette.applications import Starlette
from starlette.routing import Route`},{nazwa:`gunicorn`,pip:`pip install gunicorn`,kat:`web`,tworca:`Benoît Chesneau`,krotki:`Serwer produkcyjny WSGI`,opis:`Gunicorn to produkcyjny serwer HTTP dla aplikacji Python WSGI (Flask, Django). Uruchamia wiele procesów roboczych dla lepszej wydajności i stabilności.`,zawiera:[`--workers N — liczba procesów roboczych`,`--bind host:port — adres nasłuchiwania`,`--timeout — limit czasu żądania`,`UvicornWorker — dla aplikacji ASGI (FastAPI)`,`Integracja z Nginx jako reverse proxy`],imp:`# CLI: gunicorn app:app --workers 4`},{nazwa:`pinecone`,pip:`pip install pinecone`,kat:`ai`,tworca:`Pinecone Systems Inc.`,krotki:`Wektorowa baza danych`,opis:`Pinecone to zarządzana wektorowa baza danych w chmurze. Przechowuje embeddingi tekstu i umożliwia błyskawiczne wyszukiwanie semantyczne — kluczowy element systemów RAG.`,zawiera:[`Index.upsert — dodawanie wektorów`,`Index.query — wyszukiwanie podobnych`,`Integrated indexes — wbudowane modele embeddingów`,`Namespaces — partycjonowanie danych`,`Serverless i dedykowane indeksy`],imp:`from pinecone import Pinecone
pc = Pinecone(api_key="...")`},{nazwa:`chromadb`,pip:`pip install chromadb`,kat:`ai`,tworca:`Chroma Inc.`,krotki:`Lokalna baza wektorów`,opis:`ChromaDB to otwarta wektorowa baza danych działająca lokalnie. Idealna do prototypowania RAG bez rejestracji i kosztów. Przechowuje wektory, metadane i oryginalne dokumenty razem.`,zawiera:[`collection.add — dodawanie dokumentów`,`collection.query — wyszukiwanie semantyczne`,`Automatyczne embeddingi przez SentenceTransformers`,`Trwały zapis na dysku`,`Filtrowanie po metadanych`],imp:`import chromadb
client = chromadb.PersistentClient(path="./db")`},{nazwa:`loguru`,pip:`pip install loguru`,kat:`utils`,tworca:`Delgan`,krotki:`Prostsze logowanie`,opis:`Loguru to alternatywa dla wbudowanego logging — dużo prostsza w konfiguracji. Jeden import i od razu masz kolorowe logi z rotacją plików, stack trace i filtrowaniem.`,zawiera:[`from loguru import logger — gotowe od razu`,`logger.info, warning, error, debug`,`@logger.catch — dekorator łapiący wyjątki`,`logger.add("plik.log", rotation="1 MB")`,`Kolorowe logi z pełnym kontekstem`],imp:`from loguru import logger`},{nazwa:`tenacity`,pip:`pip install tenacity`,kat:`utils`,tworca:`Julien Danjou`,krotki:`Retry i ponowne próby`,opis:`Tenacity to biblioteka do automatycznego ponawiania operacji które mogą się nie udać — wywołania API, połączenia sieciowe, zapis do pliku. Dekoratorem @retry konfigurujesz strategię.`,zawiera:[`@retry — podstawowy dekorator ponownych prób`,`stop_after_attempt(N) — limit prób`,`wait_exponential — narastające opóźnienie`,`retry_if_exception_type — warunkowe ponowienie`,`before_sleep — callback przed kolejną próbą`],imp:`from tenacity import retry, stop_after_attempt, wait_exponential`},{nazwa:`pydantic-settings`,pip:`pip install pydantic-settings`,kat:`utils`,tworca:`Samuel Colvin`,krotki:`Ustawienia aplikacji`,opis:`pydantic-settings to rozszerzenie Pydantic do zarządzania ustawieniami aplikacji. Wczytuje konfigurację z pliku .env, zmiennych środowiskowych lub pliku TOML z walidacją typów.`,zawiera:[`BaseSettings — klasa bazowa ustawień`,`Automatyczne wczytywanie z .env`,`Walidacja typów (int, bool, URL)`,`model_config — konfiguracja źródeł`,`Obsługa sekretów i zagnieżdżonych ustawień`],imp:`from pydantic_settings import BaseSettings`},{nazwa:`multiprocessing`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Prawdziwy równoległy Python`,opis:`Moduł multiprocessing omija GIL przez tworzenie osobnych procesów zamiast wątków. Idealne do obliczeń CPU-bound — każdy proces ma własną pamięć i interpreter Pythona.`,zawiera:[`Process — tworzenie nowego procesu`,`Pool — pula procesów (map, starmap)`,`Queue, Pipe — komunikacja między procesami`,`shared_memory — wspólna pamięć`,`Manager — zarządzane obiekty między procesami`],imp:`from multiprocessing import Process, Pool, Queue`},{nazwa:`concurrent.futures`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wątki i procesy wysokiego poziomu`,opis:`concurrent.futures to wysokopoziomowy interfejs do równoległego wykonania zadań — zarówno przez wątki (ThreadPoolExecutor) jak i procesy (ProcessPoolExecutor). Prostszy niż threading i multiprocessing.`,zawiera:[`ThreadPoolExecutor — pula wątków dla I/O`,`ProcessPoolExecutor — pula procesów dla CPU`,`executor.submit — wysłanie zadania`,`as_completed — wyniki w kolejności ukończenia`,`executor.map — map z równoległością`],imp:`from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor`},{nazwa:`tempfile`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Pliki tymczasowe`,opis:`Moduł tempfile tworzy bezpieczne pliki i foldery tymczasowe, automatycznie usuwane po zamknięciu. Kluczowe przy przetwarzaniu danych, testach i operacjach wymagających plików pośrednich.`,zawiera:[`NamedTemporaryFile — plik tymczasowy z nazwą`,`TemporaryDirectory — folder tymczasowy`,`mkstemp — niskie API, plik bez auto-usunięcia`,`mkdtemp — folder bez auto-usunięcia`,`context manager — auto-sprzątanie`],imp:`import tempfile
from tempfile import NamedTemporaryFile, TemporaryDirectory`},{nazwa:`zipfile`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Archiwa ZIP`,opis:`Moduł zipfile umożliwia tworzenie, czytanie i modyfikowanie archiwów ZIP bezpośrednio w Pythonie. Obsługuje kompresję, hasła i wiele plików w jednym archiwum.`,zawiera:[`ZipFile.read — odczyt pliku z archiwum`,`ZipFile.write — dodanie pliku do archiwum`,`ZipFile.extractall — rozpakowanie całości`,`ZipFile.namelist — lista plików w archiwum`,`zipfile.is_zipfile — sprawdzenie formatu`],imp:`import zipfile`},{nazwa:`tarfile`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Archiwa TAR`,opis:`Moduł tarfile obsługuje archiwa TAR — popularne na systemach Unix (tar.gz, tar.bz2, tar.xz). Pozwala tworzyć, czytać i rozpakowywać skompresowane archiwa.`,zawiera:[`tarfile.open — otwieranie archiwum`,`addfile, add — dodawanie plików`,`extractall — rozpakowywanie`,`getmembers — lista plików`,`Kompresja: gz, bz2, xz`],imp:`import tarfile`},{nazwa:`uuid`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Unikalne identyfikatory`,opis:`Moduł uuid generuje Universally Unique Identifiers (UUID) — 128-bitowe identyfikatory gwarantujące unikalność w systemach rozproszonych. Standardowy sposób na ID w bazach danych i API.`,zawiera:[`uuid.uuid4() — losowy UUID (najczęściej używany)`,`uuid.uuid1() — UUID z MAC i timestampem`,`uuid.uuid5() — deterministyczny UUID z namespace`,`str(uuid.uuid4()) — UUID jako string`,`UUID jako klucz główny w bazie danych`],imp:`import uuid
uid = uuid.uuid4()`},{nazwa:`secrets`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Bezpieczna losowość`,opis:`Moduł secrets (Python 3.6+) generuje kryptograficznie bezpieczne losowe liczby i tokeny. W odróżnieniu od random — nadaje się do generowania haseł, tokenów API i soli kryptograficznych.`,zawiera:[`secrets.token_hex(32) — losowy token szesnastkowy`,`secrets.token_urlsafe — bezpieczny URL token`,`secrets.choice — losowy element (bezpieczny)`,`secrets.randbelow — losowa liczba < N`,`secrets.token_bytes — losowe bajty`],imp:`import secrets
token = secrets.token_urlsafe(32)`},{nazwa:`struct`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Dane binarne`,opis:`Moduł struct pakuje i rozpakowuje dane binarne według specyfikowanego formatu. Niezbędny przy parsowaniu protokołów sieciowych, plików binarnych i komunikacji z C.`,zawiera:[`struct.pack — Python → bajty`,`struct.unpack — bajty → Python`,`struct.calcsize — rozmiar struktury w bajtach`,`Format strings: i (int), f (float), s (string)`,`Endianness: < (little), > (big), = (native)`],imp:`import struct`},{nazwa:`base64`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kodowanie Base64`,opis:`Moduł base64 koduje i dekoduje dane binarne do tekstu ASCII. Używany w emailach, API (Basic Auth, Base64 obrazy w HTML), JWT i wszędzie gdzie binarne dane muszą być transportowane jako tekst.`,zawiera:[`base64.b64encode — kodowanie binarne → ASCII`,`base64.b64decode — dekodowanie ASCII → binarne`,`base64.urlsafe_b64encode — wersja bezpieczna dla URL`,`base64.b32encode, b16encode — alternatywne kodowania`,`Podstawa JWT i HTTP Basic Auth`],imp:`import base64`},{nazwa:`hmac`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Uwierzytelnianie wiadomości`,opis:`Moduł hmac implementuje Hash-based Message Authentication Code. Pozwala weryfikować że wiadomość pochodzi od zaufanego nadawcy i nie została zmodyfikowana. Używany w API signatures i webhookach.`,zawiera:[`hmac.new(key, msg, digestmod) — tworzenie HMAC`,`hmac.compare_digest — bezpieczne porównanie`,`hashlib.sha256 jako digestmod`,`Weryfikacja webhook signatures (GitHub, Stripe)`,`Bezpieczne porównanie bez timing attacks`],imp:`import hmac, hashlib`},{nazwa:`ipaddress`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Adresy IP`,opis:`Moduł ipaddress (Python 3.3+) pozwala na pracę z adresami IPv4 i IPv6 — walidację, porównywanie, sprawdzanie czy IP należy do sieci i wyliczanie zakresów.`,zawiera:[`ip_address("192.168.1.1") — parsowanie IP`,`ip_network("192.168.1.0/24") — sieć`,`network.hosts() — lista hostów`,`addr in network — sprawdzenie przynależności`,`is_private, is_loopback — typ adresu`],imp:`import ipaddress`},{nazwa:`smtplib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wysyłanie emaili`,opis:`Moduł smtplib implementuje klienta SMTP do wysyłania emaili. Razem z modułem email pozwala budować i wysyłać wiadomości email z załącznikami z kodu Pythona.`,zawiera:[`smtplib.SMTP — połączenie z serwerem`,`smtp.login — uwierzytelnienie`,`smtp.sendmail — wysyłanie emaila`,`smtp.starttls() — szyfrowanie TLS`,`email.mime — budowanie wiadomości z załącznikami`],imp:`import smtplib
from email.mime.text import MIMEText`},{nazwa:`xml.etree.ElementTree`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Parsowanie XML`,opis:`Wbudowany moduł do parsowania XML. Zamienia dokument XML w drzewo obiektów Pythona. Prostszy niż lxml, ale wystarczający dla podstawowych operacji na XML.`,zawiera:[`ET.parse — wczytanie pliku XML`,`ET.fromstring — parsowanie stringa`,`root.iter — iteracja po elementach`,`element.find, findall — wyszukiwanie`,`ET.tostring — zamiana drzewa na XML string`],imp:`import xml.etree.ElementTree as ET`},{nazwa:`configparser`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Pliki konfiguracyjne INI`,opis:`Moduł configparser czyta i zapisuje pliki konfiguracyjne w formacie INI — klasycznym formacie z sekcjami [SEKCJA] i parami klucz=wartość. Popularne w starszych projektach i narzędziach DevOps.`,zawiera:[`ConfigParser.read — wczytanie pliku INI`,`config["SEKCJA"]["klucz"] — dostęp do wartości`,`config.get, getint, getfloat, getboolean`,`config.write — zapis konfiguracji`,`Obsługa wartości domyślnych i interpolacji`],imp:`import configparser`},{nazwa:`pprint`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Czytelne wypisywanie`,opis:`Moduł pprint (pretty-print) formatuje złożone struktury Pythona (słowniki, listy, zagnieżdżone obiekty) w czytelny sposób z wcięciami. Niezastąpiony przy debugowaniu.`,zawiera:[`pprint.pprint(dane) — czytelne wypisywanie`,`pprint.pformat — czytelny string (do logowania)`,`sort_dicts=False — zachowaj kolejność kluczy`,`width= — maksymalna szerokość linii`,`depth= — głębokość zagłębienia`],imp:`from pprint import pprint`},{nazwa:`difflib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Porównywanie tekstu`,opis:`Moduł difflib porównuje sekwencje tekstu i generuje "diff" — listę różnic jak narzędzie diff Unix. Używany w code review, patch generowaniu i porównywaniu dokumentów.`,zawiera:[`SequenceMatcher.ratio() — podobieństwo 0-1`,`unified_diff — diff w formacie Unix`,`ndiff — czytelniejszy diff z kontekstem`,`get_close_matches — fuzzy matching`,`HtmlDiff — diff jako HTML`],imp:`import difflib`},{nazwa:`inspect`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Introspekcja kodu`,opis:`Moduł inspect pozwala badać kod w czasie wykonania — sprawdzać sygnatury funkcji, kod źródłowy, hierarchię klas, argumenty. Używany w frameworkach, dekoratorach i debugerach.`,zawiera:[`inspect.signature — sygnatura funkcji`,`inspect.getsource — kod źródłowy`,`inspect.getmembers — lista atrybutów obiektu`,`inspect.isfunction, isclass — sprawdzanie typów`,`inspect.stack — aktualny call stack`],imp:`import inspect`},{nazwa:`traceback`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Obsługa wyjątków`,opis:`Moduł traceback formatuje i wypisuje stack trace wyjątków. Pozwala na zaawansowaną obsługę błędów — przechwytywanie, formatowanie i logowanie wyjątków w czytelny sposób.`,zawiera:[`traceback.print_exc() — wypisz aktualny wyjątek`,`traceback.format_exc() — string ze stack trace`,`traceback.format_tb — formatowanie traceback`,`TracebackException — obiektowy interfejs`,`Użycie w except: blokach do logowania`],imp:`import traceback`},{nazwa:`warnings`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`System ostrzeżeń`,opis:`Moduł warnings kontroluje ostrzeżenia Pythona — wyświetlane gdy używasz przestarzałych funkcji lub podejrzanego kodu. Pozwala też tłumić lub podnosić własne ostrzeżenia.`,zawiera:[`warnings.warn("msg", DeprecationWarning)`,`warnings.filterwarnings("ignore") — tłumienie`,`warnings.catch_warnings — kontekst`,`@deprecated — oznaczanie funkcji jako przestarzałej`,`simplefilter("error") — ostrzeżenia jako błędy`],imp:`import warnings`},{nazwa:`atexit`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kod przy wyjściu`,opis:`Moduł atexit rejestruje funkcje wywoływane przy zamknięciu programu — bez względu na sposób zakończenia (normalnie lub przez wyjątek). Używany do czyszczenia zasobów.`,zawiera:[`atexit.register(funkcja) — rejestracja`,`atexit.unregister — wyrejestrowanie`,`Wywołanie przy sys.exit() i końcu modułu`,`Kolejność LIFO — ostatni zarejestrowany, pierwszy wywołany`,`Alternatywa: context managers i try/finally`],imp:`import atexit`},{nazwa:`timeit`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Mierzenie czasu wykonania`,opis:`Moduł timeit precyzyjnie mierzy czas wykonania małych fragmentów kodu Pythona. Automatycznie powtarza pomiar wielokrotnie dla wiarygodnych wyników, eliminując szum systemowy.`,zawiera:[`timeit.timeit("kod", number=1000) — pomiar kodu`,`timeit.repeat — wielokrotny pomiar`,`%timeit w Jupyter — magic command`,`python -m timeit "..." — z linii poleceń`,`Timer klasa — zaawansowana konfiguracja`],imp:`import timeit
result = timeit.timeit("sum(range(1000))", number=10000)`},{nazwa:`ast`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Drzewo składniowe Pythona`,opis:`Moduł ast (Abstract Syntax Tree) parsuje kod Pythona do drzewa składniowego i pozwala go analizować lub modyfikować. Podstawa narzędzi do analizy kodu, linterów i code generation.`,zawiera:[`ast.parse("kod") — parsowanie do AST`,`ast.dump — czytelna reprezentacja drzewa`,`ast.NodeVisitor — odwiedzanie węzłów`,`ast.NodeTransformer — modyfikacja drzewa`,`ast.literal_eval — bezpieczne eval dla literałów`],imp:`import ast`},{nazwa:`importlib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Dynamiczne importy`,opis:`Moduł importlib daje dostęp do mechanizmu importu Pythona. Pozwala dynamicznie importować moduły po nazwie jako stringu — używane w pluginach, ładowaniu konfiguracji i frameworkach.`,zawiera:[`importlib.import_module("nazwa") — dynamiczny import`,`importlib.reload — przeładowanie modułu`,`spec_from_file_location — import z pliku`,`find_spec — sprawdzenie czy moduł istnieje`,`Tworzenie własnych finderów i loaderów`],imp:`import importlib
mod = importlib.import_module("os.path")`},{nazwa:`weakref`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Słabe referencje`,opis:`Moduł weakref tworzy słabe referencje do obiektów — referencje które nie zapobiegają garbage collection. Używane w cache, obserwatorach i zapobieganiu cyklicznym referencjom.`,zawiera:[`weakref.ref(obj) — słaba referencja`,`weakref.proxy — proxy do obiektu`,`WeakValueDictionary — słownik ze słabymi wartościami`,`WeakSet — set ze słabymi elementami`,`finalize — callback przy usunięciu obiektu`],imp:`import weakref`},{nazwa:`gc`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Garbage collector`,opis:`Moduł gc daje kontrolę nad garbage collectorem Pythona — systemem automatycznego usuwania nieużywanych obiektów. Szczególnie ważny przy diagnozowaniu wycieków pamięci.`,zawiera:[`gc.collect() — wymuś garbage collection`,`gc.disable, enable — włącz/wyłącz GC`,`gc.get_objects() — lista wszystkich obiektów`,`gc.get_referrers — co referencjonuje obiekt`,`tracemalloc — śledzenie alokacji pamięci`],imp:`import gc`},{nazwa:`bisect`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Przeszukiwanie binarne`,opis:`Moduł bisect implementuje algorytm przeszukiwania binarnego dla posortowanych list. Pozwala szybko znaleźć miejsce wstawienia elementu bez sortowania całej listy od nowa.`,zawiera:[`bisect.bisect_left — pozycja wstawienia (lewa)`,`bisect.bisect_right — pozycja wstawienia (prawa)`,`bisect.insort — wstawienie z zachowaniem sortowania`,`Złożoność: O(log n) zamiast O(n)`,`Użycie z SortedList dla pełnego API`],imp:`import bisect`},{nazwa:`array`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Tablice typowane`,opis:`Moduł array dostarcza efektywne tablice jednego typu (jak w C) — zużywają mniej pamięci niż listy Pythona bo nie boxują każdego elementu. Używane przy dużych zbiorach liczb.`,zawiera:[`array.array('i', dane) — tablica int-ów`,`array.array('f', dane) — tablica float-ów`,`append, extend, insert — modyfikacje`,`tofile/fromfile — zapis/odczyt binarny`,`tobytes — konwersja do bytes`],imp:`from array import array
arr = array('i', [1, 2, 3])`},{nazwa:`fractions`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Ułamki dokładne`,opis:`Moduł fractions implementuje arytmetykę ułamkową z dokładną reprezentacją. Gdzie float 1/3 = 0.333..., Fraction(1,3) to dokładna jedna trzecia. Idealne dla obliczeń wymagających precyzji.`,zawiera:[`Fraction(1, 3) — ułamek 1/3`,`Fraction("0.25") — z tekstu`,`Arytmetyka: +, -, *, / na ułamkach`,`Automatyczne upraszczanie`,`limit_denominator — zaokrąglanie mianownika`],imp:`from fractions import Fraction`},{nazwa:`cmath`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Matematyka zespolona`,opis:`Moduł cmath zawiera funkcje matematyczne dla liczb zespolonych. Analogiczny do math, ale operujący na obiektach complex Pythona — używany w sygnałach, elektrotechnice i kwantowych obliczeniach.`,zawiera:[`cmath.sqrt(-1) → 1j — pierwiastek ujemnej`,`cmath.exp, log — eksponenta i logarytm`,`cmath.phase — argument (kąt) liczby`,`cmath.polar — zamiana na postać biegunową`,`cmath.rect — z postaci biegunowej`],imp:`import cmath`},{nazwa:`mmap`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Pliki mapowane w pamięci`,opis:`Moduł mmap pozwala mapować pliki bezpośrednio do pamięci RAM — bez wczytywania całości. Idealne do pracy z bardzo dużymi plikami, dzieloną pamięcią między procesami i szybkiego I/O.`,zawiera:[`mmap.mmap(fd, length) — mapowanie pliku`,`Dostęp jak do bytes — mmap[0:100]`,`mmap.seek, read, write — operacje I/O`,`ACCESS_READ, WRITE, COPY — tryby dostępu`,`Współdzielenie pamięci między procesami`],imp:`import mmap`},{nazwa:`profile`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Profilowanie kodu`,opis:`Moduł cProfile (i profile) mierzy czas spędzony w każdej funkcji programu. Wskazuje "wąskie gardła" — funkcje które spowalniają program, pozwalając skupić optymalizację tam gdzie ma sens.`,zawiera:[`python -m cProfile skrypt.py`,`cProfile.run("kod") — profilowanie kodu`,`pstats.Stats — analiza wyników`,`sort_stats("cumulative") — sortowanie`,`Wizualizacja: snakeviz, kcachegrind`],imp:`import cProfile
cProfile.run("twój_kod()")`},{nazwa:`PyJWT`,pip:`pip install PyJWT`,kat:`web`,tworca:`José Padilla`,krotki:`JSON Web Tokens`,opis:`PyJWT koduje i dekoduje JSON Web Tokens — standard bezpiecznego przekazywania informacji między serwisami. Podstawa stateless autoryzacji w FastAPI, Flask i mikroserwisach.`,zawiera:[`jwt.encode(payload, key, algorithm) — tworzenie tokenu`,`jwt.decode(token, key, algorithms) — weryfikacja i odczyt`,`Algorytmy: HS256, RS256, ES256`,`exp — czas wygaśnięcia tokenu`,`Obsługa wyjątków: ExpiredSignatureError, InvalidTokenError`],imp:`import jwt
token = jwt.encode({"user": "jan", "exp": ...}, "secret", algorithm="HS256")`},{nazwa:`passlib`,pip:`pip install passlib[bcrypt]`,kat:`web`,tworca:`Eli Collins`,krotki:`Haszowanie haseł`,opis:`passlib to biblioteka do bezpiecznego haszowania haseł w Pythonie. Obsługuje bcrypt, argon2, scrypt i inne algorytmy. Automatycznie obsługuje salt i iteracje — właściwie konfiguruje bezpieczeństwo.`,zawiera:[`CryptContext — kontekst kryptograficzny`,`pwd_context.hash("hasło") — haszowanie`,`pwd_context.verify("hasło", hash) — weryfikacja`,`Automatyczne upgradowanie algorytmu`,`bcrypt, argon2 — zalecane algorytmy`],imp:`from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"])`},{nazwa:`python-multipart`,pip:`pip install python-multipart`,kat:`web`,tworca:`Andrew Dunstan`,krotki:`Upload plików (multipart)`,opis:`python-multipart parsuje multipart/form-data — format używany przy uploadeowaniu plików przez HTML formularze. Wymagany przez FastAPI do obsługi File() i Form() w endpointach.`,zawiera:[`Automatyczny upload przez FastAPI File()`,`Obsługa chunked upload`,`multipart.multipart — niskopoziomowy parser`,`Streaming — nie wczytuje całości do RAM`,`MIME type detection`],imp:`# Wymagany przez FastAPI File() i Form()
# pip install python-multipart`},{nazwa:`email-validator`,pip:`pip install email-validator`,kat:`web`,tworca:`Joshua Tauberer`,krotki:`Walidacja adresów email`,opis:`email-validator sprawdza czy adres email jest składniowo poprawny i (opcjonalnie) czy domena ma prawidłowe rekordy DNS. Wymagany przez Pydantic do używania typu EmailStr.`,zawiera:[`validate_email("jan@example.com") — walidacja`,`check_deliverability — sprawdzenie DNS`,`Zwraca znormalizowany adres`,`EmailNotValidError — przy błędzie`,`Używany automatycznie przez Pydantic EmailStr`],imp:`from email_validator import validate_email, EmailNotValidError`},{nazwa:`apscheduler`,pip:`pip install apscheduler`,kat:`web`,tworca:`Alex Grönholm`,krotki:`Zaawansowane harmonogramowanie`,opis:`APScheduler (Advanced Python Scheduler) to potężna biblioteka do uruchamiania zadań według harmonogramu. Obsługuje cron-style, interwałowe i jednorazowe zadania. Działa z asyncio i można go osadzić w FastAPI.`,zawiera:[`AsyncScheduler — dla asyncio/FastAPI`,`CronTrigger — harmonogram cron-style`,`IntervalTrigger — cykliczne zadania`,`DateTrigger — jednorazowe o konkretnej dacie`,`Persystencja harmonogramu w bazie danych`],imp:`from apscheduler.schedulers.asyncio import AsyncIOScheduler`},{nazwa:`grpcio`,pip:`pip install grpcio grpcio-tools`,kat:`web`,tworca:`Google`,krotki:`Komunikacja gRPC`,opis:`gRPC to framework RPC od Google oparty na Protocol Buffers. Szybszy od REST, binarny protokół, silne typowanie. Używany w mikroserwisach wymagających wysokiej wydajności i streaming.`,zawiera:[`Definiowanie API w plikach .proto`,`grpc.server — serwer gRPC`,`grpc.channel — połączenie klienta`,`Streaming: unary, server-side, client-side, bidirectional`,`grpc_tools.protoc — generowanie kodu z .proto`],imp:`import grpc`},{nazwa:`pika`,pip:`pip install pika`,kat:`web`,tworca:`Tony Garnock-Jones`,krotki:`RabbitMQ klient`,opis:`Pika to biblioteka Python do komunikacji z RabbitMQ — popularnym brokerem wiadomości. Implementuje protokół AMQP dla niezawodnej kolejki wiadomości między serwisami.`,zawiera:[`BlockingConnection — synchroniczny klient`,`channel.basic_publish — wysyłanie wiadomości`,`channel.basic_consume — odbieranie wiadomości`,`exchange, queue — routing wiadomości`,`Potwierdzenia (ACK/NACK) dostarczenia`],imp:`import pika
conn = pika.BlockingConnection(pika.ConnectionParameters("localhost"))`},{nazwa:`aiokafka`,pip:`pip install aiokafka`,kat:`web`,tworca:`aio-libs team`,krotki:`Kafka klient async`,opis:`aiokafka to asynchroniczny klient Apache Kafka dla Pythona. Kafka to platforma streamingu danych — obsługuje miliony zdarzeń na sekundę. Używana w data pipelines i event-driven architekturach.`,zawiera:[`AIOKafkaProducer — wysyłanie wiadomości`,`AIOKafkaConsumer — odbieranie wiadomości`,`consumer_group — partycjonowanie między konsumentami`,`offset — pozycja w logu Kafka`,`Kompatybilny z asyncio i FastAPI`],imp:`from aiokafka import AIOKafkaProducer, AIOKafkaConsumer`},{nazwa:`aiofiles`,pip:`pip install aiofiles`,kat:`web`,tworca:`Tin Tvrtković`,krotki:`Async operacje na plikach`,opis:`aiofiles to biblioteka do asynchronicznego czytania i zapisu plików w asyncio. Standardowe operacje plików blokują event loop — aiofiles wykonuje je w thread pool nie blokując innych coroutines.`,zawiera:[`async with aiofiles.open("plik.txt") as f`,`await f.read(), await f.write()`,`aiofiles.os — async wersje os.path`,`Kompatybilny z FastAPI i asyncio`,`Nie blokuje event loop przy dużych plikach`],imp:`import aiofiles
async with aiofiles.open("plik.txt", "r") as f:
    content = await f.read()`},{nazwa:`slowapi`,pip:`pip install slowapi`,kat:`web`,tworca:`Laurent Savaête`,krotki:`Rate limiting dla FastAPI`,opis:`SlowAPI to middleware rate limiting dla FastAPI i Starlette. Ogranicza liczbę żądań na klienta lub endpoint. Kompatybilny z Flask-Limiter API — prosty do integracji.`,zawiera:[`@limiter.limit("10/minute") — limit na endpoint`,`Limiter(key_func=get_remote_address)`,`In-memory lub Redis backend`,`Custom error responses`,`Whitelist IP lub userów`],imp:`from slowapi import Limiter
from slowapi.util import get_remote_address`},{nazwa:`polars`,pip:`pip install polars`,kat:`data`,tworca:`Ritchie Vink`,krotki:`Szybkie DataFrames`,opis:`Polars to biblioteka DataFrame napisana w Rust — wielokrotnie szybsza niż pandas, szczególnie na dużych zbiorach danych. Lazy API pozwala budować zapytania optymalizowane przed wykonaniem.`,zawiera:[`pl.DataFrame, pl.LazyFrame — struktury danych`,`Lazy API: .lazy().filter().select().collect()`,`Wyrażenia: pl.col("x").sum(), pl.when()`,`Natywna obsługa Arrow — zero-copy z PyArrow`,`groupby, join, pivot — pełne API analityczne`],imp:`import polars as pl`},{nazwa:`dask`,pip:`pip install dask[complete]`,kat:`data`,tworca:`Matthew Rocklin / Anaconda`,krotki:`Równoległa analiza danych`,opis:`Dask rozszerza NumPy i pandas na dane większe niż RAM i na wiele rdzeni/maszyn. API jest celowo zbliżone do pandas — zamiana import pandas as pd na import dask.dataframe as dd w wielu przypadkach wystarczy.`,zawiera:[`dask.dataframe — pandas na dużych danych`,`dask.array — numpy na dużych danych`,`dask.distributed — klaster obliczeniowy`,`Lazy evaluation — obliczenia na żądanie`,`Wizualizacja grafu DAG z .visualize()`],imp:`import dask.dataframe as dd`},{nazwa:`pyarrow`,pip:`pip install pyarrow`,kat:`data`,tworca:`Apache Software Foundation`,krotki:`Apache Arrow format`,opis:`PyArrow to Python binding dla Apache Arrow — kolumnowego formatu danych zoptymalizowanego dla analityki. Standard wymiany danych między pandas, Spark, DuckDB i innymi narzędziami data.`,zawiera:[`pa.Table — tabela Arrow`,`pyarrow.parquet — zapis/odczyt Parquet`,`pyarrow.feather — szybki format binarny`,`pa.csv.read_csv — szybki odczyt CSV`,`Zero-copy z NumPy i pandas`],imp:`import pyarrow as pa
import pyarrow.parquet as pq`},{nazwa:`duckdb`,pip:`pip install duckdb`,kat:`data`,tworca:`DuckDB Labs`,krotki:`SQL na plikach i DataFrames`,opis:`DuckDB to analityczna baza danych działająca w procesie (bez serwera). Pozwala uruchamiać SQL bezpośrednio na plikach CSV, Parquet, pandas DataFrame. Bardzo szybka dla OLAP.`,zawiera:[`duckdb.sql("SELECT ...") — zapytanie SQL`,`Bezpośrednio na plikach: FROM "data.parquet"`,`Integracja z pandas i polars — bez kopiowania`,`duckdb.connect("baza.db") — plik bazy`,`Wsparcie dla window functions, JSON, list`],imp:`import duckdb
result = duckdb.sql("SELECT * FROM 'data.csv'").df()`},{nazwa:`joblib`,pip:`pip install joblib`,kat:`data`,tworca:`Gael Varoquaux`,krotki:`Równoległość i cache`,opis:`Joblib upraszcza równoległe wykonywanie zadań Python i cache wyników funkcji na dysku. Kluczowy w scikit-learn — może też przyspieszyć każde obliczenia numpy przez Parallel.`,zawiera:[`Parallel(n_jobs=-1)(delayed(f)(x) for x in lst)`,`Memory.cache — cache wyników na dysku`,`dump/load — szybki zapis numpy tablic`,`n_jobs=-1 — wszystkie CPU`,`Używany wewnętrznie przez scikit-learn`],imp:`from joblib import Parallel, delayed, Memory`},{nazwa:`tabulate`,pip:`pip install tabulate`,kat:`data`,tworca:`Sergey Astanin`,krotki:`Tabele ASCII/Markdown`,opis:`tabulate formatuje listy i słowniki jako czytelne tabele tekstowe — ASCII, Markdown, HTML, LaTeX i wiele innych formatów. Idealne do wypisywania wyników skryptów w terminalu.`,zawiera:[`tabulate(data, headers=) — prosta tabela`,`tablefmt="grid" — styl tabeli`,`tablefmt="markdown" — Markdown`,`tablefmt="html" — HTML table`,`Formatowanie liczb: floatfmt=".2f"`],imp:`from tabulate import tabulate
print(tabulate(data, headers="keys"))`},{nazwa:`xlsxwriter`,pip:`pip install xlsxwriter`,kat:`data`,tworca:`John McNamara`,krotki:`Tworzenie plików Excel`,opis:`XlsxWriter tworzy pliki Excel (.xlsx) z pełnym formatowaniem — kolory, czcionki, wykresy, formuły, formatowanie warunkowe. Więcej możliwości niż openpyxl przy tworzeniu nowych plików.`,zawiera:[`workbook.add_worksheet — nowy arkusz`,`worksheet.write — zapis komórek`,`worksheet.set_column — szerokość kolumn`,`workbook.add_chart — tworzenie wykresów`,`Formatowanie warunkowe i formuły`],imp:`import xlsxwriter
workbook = xlsxwriter.Workbook("raport.xlsx")`},{nazwa:`reportlab`,pip:`pip install reportlab`,kat:`data`,tworca:`ReportLab Inc.`,krotki:`Generowanie PDF`,opis:`ReportLab to potężna biblioteka do tworzenia dokumentów PDF w Pythonie. Od prostych plików z tekstem po skomplikowane raporty z tabelami, wykresami i grafiką.`,zawiera:[`canvas.Canvas — rysowanie strona po stronie`,`Paragraph, Table — wysokopoziomowe elementy`,`Platypus — layout engine`,`Image — wstawianie obrazów`,`Obsługa czcionek, kolorów i stylów`],imp:`from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4`},{nazwa:`fpdf2`,pip:`pip install fpdf2`,kat:`data`,tworca:`Lucas Cimon`,krotki:`Prosty PDF`,opis:`fpdf2 to lekka biblioteka do generowania PDF. Prostsze API niż ReportLab — szybkie tworzenie dokumentów z tekstem, tabelami i obrazami bez dużej krzywej uczenia.`,zawiera:[`FPDF() — dokument PDF`,`pdf.add_page() — nowa strona`,`pdf.cell, multi_cell — tekst w komórkach`,`pdf.image — wstawianie obrazów`,`pdf.output("plik.pdf") — zapis`],imp:`from fpdf import FPDF`},{nazwa:`statsmodels`,pip:`pip install statsmodels`,kat:`data`,tworca:`Skipper Seabold / Josef Perktold`,krotki:`Modele statystyczne`,opis:`statsmodels to biblioteka do statystyki i ekonometrii. Zawiera modele regresji, szeregi czasowe, testy statystyczne i analizę wariancji — uzupełnienie scikit-learn o klasyczne metody statystyczne.`,zawiera:[`OLS — regresja liniowa z pełną statystyką`,`ARIMA, SARIMA — modele szeregów czasowych`,`Logit, Probit — regresja logistyczna`,`Testy statystyczne: t-test, chi-kwadrat, ANOVA`,`Pełne podsumowania z p-values i CI`],imp:`import statsmodels.api as sm`},{nazwa:`opencv-python`,pip:`pip install opencv-python`,kat:`ai`,tworca:`Intel / OpenCV team`,krotki:`Wizja komputerowa`,opis:`OpenCV to najpopularniejsza biblioteka wizji komputerowej. Obsługuje obrazy i wideo — detekcja obiektów, twarzy, krawędzi, śledzenie ruchu, przetwarzanie w czasie rzeczywistym z kamerą.`,zawiera:[`cv2.imread, imwrite — wczytanie i zapis`,`cv2.VideoCapture — kamera i wideo`,`cv2.resize, flip, rotate — transformacje`,`cv2.HoughLines — wykrywanie linii`,`cv2.CascadeClassifier — detekcja twarzy`],imp:`import cv2`},{nazwa:`spacy`,pip:`pip install spacy`,kat:`ai`,tworca:`Explosion AI (Matthew Honnibal)`,krotki:`NLP przemysłowe`,opis:`spaCy to biblioteka NLP nastawiona na szybkość i gotowość produkcyjną. Tokenizacja, POS tagging, NER (rozpoznawanie podmiotów), analiza zależności — wszystko w jednym, szybkim pipeline.`,zawiera:[`nlp = spacy.load("pl_core_news_sm") — model NLP`,`doc = nlp("tekst") — przetwarzanie`,`doc.ents — rozpoznane podmioty (osoby, miejsca)`,`token.pos_, token.dep_ — gramatyka`,`displacy — wizualizacja w przeglądarce`],imp:`import spacy
nlp = spacy.load("pl_core_news_sm")`},{nazwa:`nltk`,pip:`pip install nltk`,kat:`ai`,tworca:`Steven Bird / NLTK Project`,krotki:`Narzędzia NLP`,opis:`NLTK (Natural Language Toolkit) to klasyczna biblioteka NLP z ogromnym zestawem zasobów językowych: słowniki, korpusy, parsery. Bardziej akademicki niż spaCy, ale bogatszy w zasoby.`,zawiera:[`nltk.tokenize — tokenizacja tekstu`,`nltk.stem — stemming słów`,`nltk.corpus — gotowe korpusy (WordNet)`,`nltk.sentiment — analiza sentymentu`,`nltk.download — pobieranie danych`],imp:`import nltk
from nltk.tokenize import word_tokenize`},{nazwa:`xgboost`,pip:`pip install xgboost`,kat:`ai`,tworca:`Tianqi Chen`,krotki:`Gradient boosting`,opis:`XGBoost to implementacja gradient boosting używana na wszystkich prestiżowych konkursach ML. Szybszy od GradientBoosting w scikit-learn, obsługuje GPU i missing values natywnie.`,zawiera:[`XGBClassifier, XGBRegressor — modele`,`fit(X, y) — trenowanie`,`predict, predict_proba — predykcja`,`feature_importances_ — ważność cech`,`early_stopping — zapobieganie overfittingowi`],imp:`from xgboost import XGBClassifier
model = XGBClassifier(n_estimators=100, learning_rate=0.1)`},{nazwa:`lightgbm`,pip:`pip install lightgbm`,kat:`ai`,tworca:`Microsoft`,krotki:`Gradient boosting (szybki)`,opis:`LightGBM to gradient boosting od Microsoft — szybszy i bardziej pamięciooszczędny niż XGBoost na dużych zbiorach. Używa leaf-wise tree growth zamiast level-wise.`,zawiera:[`LGBMClassifier, LGBMRegressor — modele`,`Dataset — efektywna struktura danych`,`lgb.train — niskie API`,`Kategoryczne cechy — natywna obsługa`,`DART, GOSS — algorytmy próbkowania`],imp:`import lightgbm as lgb
model = lgb.LGBMClassifier()`},{nazwa:`optuna`,pip:`pip install optuna`,kat:`ai`,tworca:`Preferred Networks`,krotki:`Optymalizacja hiperparametrów`,opis:`Optuna to framework do automatycznej optymalizacji hiperparametrów ML. Używa Bayesowskiego przeszukiwania zamiast grid search — inteligentnie wybiera kombinacje do przetestowania.`,zawiera:[`study = optuna.create_study() — definicja zadania`,`study.optimize(objective, n_trials=100)`,`trial.suggest_float, suggest_int, suggest_categorical`,`Pruning — zatrzymywanie złych prób`,`Wizualizacja historii optymalizacji`],imp:`import optuna
study = optuna.create_study(direction="maximize")`},{nazwa:`mlflow`,pip:`pip install mlflow`,kat:`ai`,tworca:`Databricks`,krotki:`Śledzenie eksperymentów ML`,opis:`MLflow to platforma do zarządzania cyklem życia modeli ML — śledzenie eksperymentów, przechowywanie modeli, porównywanie metryk i wdrożenie. Integruje się z scikit-learn, PyTorch, TensorFlow.`,zawiera:[`mlflow.start_run() — rozpocznij eksperyment`,`mlflow.log_param, log_metric — logowanie`,`mlflow.sklearn.log_model — zapis modelu`,`mlflow ui — przeglądarka eksperymentów`,`mlflow.register_model — rejestr modeli`],imp:`import mlflow
with mlflow.start_run():
    mlflow.log_param("lr", 0.01)`},{nazwa:`litellm`,pip:`pip install litellm`,kat:`ai`,tworca:`BerriAI`,krotki:`Ujednolicone API dla LLM`,opis:`LiteLLM udostępnia jednolite API dla ponad 100 modeli LLM — OpenAI, Anthropic, Gemini, Mistral, Ollama. Zamień model="gpt-4o" na model="claude-3-5-sonnet" bez zmiany reszty kodu.`,zawiera:[`litellm.completion — jednolite API chat`,`Fallback na alternatywny model`,`load balancing między providerami`,`Streaming dla wszystkich modeli`,`Automatyczny retry i logging`],imp:`import litellm
response = litellm.completion(model="gpt-4o", messages=[...])`},{nazwa:`instructor`,pip:`pip install instructor`,kat:`ai`,tworca:`Jason Liu`,krotki:`Strukturalne odpowiedzi LLM`,opis:`Instructor rozszerza OpenAI/Anthropic SDK o zwracanie strukturowanych danych przez Pydantic. Zamiast parsować JSON z LLM ręcznie — definiujesz model Pydantic i dostajesz gotowy obiekt.`,zawiera:[`instructor.from_openai — patch klienta`,`response_model=MójModel — typ odpowiedzi`,`Automatyczna walidacja i retry`,`Pydantic modele jako schemat JSON Schema`,`Wsparcie dla OpenAI, Anthropic, Gemini`],imp:`import instructor
from openai import OpenAI
client = instructor.from_openai(OpenAI())`},{nazwa:`crewai`,pip:`pip install crewai`,kat:`ai`,tworca:`João Moura`,krotki:`Multi-agent framework`,opis:`CrewAI to framework do budowania zespołów agentów AI. Każdy agent ma rolę, cel i narzędzia — razem realizują złożone zadania przez podział pracy między wyspecjalizowane "role".`,zawiera:[`Agent — definicja agenta z rolą i narzędziami`,`Task — zadanie przypisane do agenta`,`Crew — zespół agentów i workflow`,`Process.sequential / hierarchical — tryb pracy`,`Narzędzia: wyszukiwarka, kod, pliki`],imp:`from crewai import Agent, Task, Crew`},{nazwa:`dspy`,pip:`pip install dspy-ai`,kat:`ai`,tworca:`Omar Khattab / Stanford NLP`,krotki:`Programowanie modeli językowych`,opis:`DSPy to framework do programowania (nie promptowania) modeli językowych. Zamiast pisać prompty ręcznie, definiujesz moduły i metrykę — DSPy automatycznie optymalizuje prompty.`,zawiera:[`dspy.Signature — interfejs modułu`,`dspy.ChainOfThought — łańcuch myślenia`,`dspy.Teleprompter — optymalizator promptów`,`dspy.evaluate — ocena systemu`,`Bootstrapping few-shot examples`],imp:`import dspy
lm = dspy.LM("openai/gpt-4o")`},{nazwa:`pytesseract`,pip:`pip install pytesseract`,kat:`ai`,tworca:`Samuel Hoffstaetter / Matthias Lee`,krotki:`OCR — tekst z obrazów`,opis:`pytesseract to wrapper Pythona dla silnika OCR Tesseract od Google. Pozwala wyciągać tekst z obrazów i PDF-ów. Obsługuje ponad 100 języków, w tym polski.`,zawiera:[`pytesseract.image_to_string — tekst z obrazu`,`lang="pol" — język polski`,`image_to_data — tekst ze współrzędnymi`,`image_to_pdf_or_hocr — PDF z warstą tekstu`,`Wymaga zainstalowanego Tesseract na systemie`],imp:`import pytesseract
from PIL import Image
text = pytesseract.image_to_string(Image.open("skan.png"), lang="pol")`},{nazwa:`mediapipe`,pip:`pip install mediapipe`,kat:`ai`,tworca:`Google`,krotki:`ML dla mediów (real-time)`,opis:`MediaPipe to framework Google do real-time przetwarzania mediów przez ML. Detekcja twarzy, dłoni, póz ciała, gestów — wszystko działa w czasie rzeczywistym na kamerze bez GPU.`,zawiera:[`mp.solutions.hands — detekcja dłoni`,`mp.solutions.face_detection — detekcja twarzy`,`mp.solutions.pose — poza ciała`,`results.multi_hand_landmarks — punkty charakterystyczne`,`Działa na CPU — zoptymalizowany dla edge`],imp:`import mediapipe as mp`},{nazwa:`datasets`,pip:`pip install datasets`,kat:`ai`,tworca:`Hugging Face`,krotki:`Datasets ML`,opis:`Datasets od Hugging Face to biblioteka do efektywnego ładowania i przetwarzania datasetów ML. Tysiące gotowych zbiorów, streaming dla zbyt dużych do RAM, i Apache Arrow pod spodem.`,zawiera:[`load_dataset("imdb") — gotowy dataset`,`dataset.map — transformacja równoległa`,`dataset.filter — filtrowanie`,`Streaming mode — bez wczytywania do RAM`,`Push do Hugging Face Hub`],imp:`from datasets import load_dataset
ds = load_dataset("squad")`},{nazwa:`accelerate`,pip:`pip install accelerate`,kat:`ai`,tworca:`Hugging Face`,krotki:`Trenowanie na wielu GPU`,opis:`Accelerate od Hugging Face upraszcza trenowanie modeli PyTorch na wielu GPU, TPU i mixed precision. Minimalne zmiany w kodzie — dodajesz Accelerator i ten sam kod działa na 1 lub 8 GPU.`,zawiera:[`Accelerator — główna klasa`,`accelerator.prepare — przygotowanie modelu i danych`,`accelerator.backward — backward pass`,`mixed_precision — fp16/bf16 automatycznie`,`Wsparcie dla DeepSpeed i FSDP`],imp:`from accelerate import Accelerator
accelerator = Accelerator()`},{nazwa:`asyncpg`,pip:`pip install asyncpg`,kat:`db`,tworca:`MagicStack Inc.`,krotki:`Async PostgreSQL (najszybszy)`,opis:`asyncpg to najszybszy async driver PostgreSQL dla Pythona — implementuje protokół wire bezpośrednio w Cython, bez overhead. Używany przez SQLAlchemy async i bezpośrednio w FastAPI.`,zawiera:[`asyncpg.connect — połączenie async`,`await conn.fetch — wykonanie zapytania`,`await conn.execute — insert/update/delete`,`connection_pool — pula połączeń`,`Natywna obsługa JSONB, arrays, hstore`],imp:`import asyncpg
conn = await asyncpg.connect(DSN)`},{nazwa:`aiosqlite`,pip:`pip install aiosqlite`,kat:`db`,tworca:`Omnilib`,krotki:`Async SQLite`,opis:`aiosqlite to wrapper na moduł sqlite3 dla asyncio. Operacje SQLite domyślnie blokują — aiosqlite wykonuje je w thread pool nie blokując event loop w FastAPI i asyncio aplikacjach.`,zawiera:[`async with aiosqlite.connect("db.sqlite3") as db`,`await db.execute — SQL async`,`await db.fetchall — pobranie wyników`,`await db.commit — zatwierdzenie transakcji`,`Identyczne API jak sqlite3`],imp:`import aiosqlite
async with aiosqlite.connect("database.db") as db:
    await db.execute("INSERT ...")`},{nazwa:`tortoise-orm`,pip:`pip install tortoise-orm`,kat:`db`,tworca:`Nicklas Øvrebø Aaseth`,krotki:`Async ORM dla Python`,opis:`Tortoise ORM to asynchroniczny ORM inspirowany Django ORM. API jest celowo podobne do Django — jeśli znasz Django, Tortoise będzie znajome. Natywna obsługa asyncio i FastAPI.`,zawiera:[`class User(Model) — definicja modelu`,`await User.create() — zapis do bazy`,`await User.filter(name="Jan").all()`,`ForeignKeyField — relacje`,`Aerich — narzędzie do migracji`],imp:`from tortoise import fields, Model
from tortoise.models import Model`},{nazwa:`peewee`,pip:`pip install peewee`,kat:`db`,tworca:`Charles Leifer`,krotki:`Lekki ORM`,opis:`Peewee to mały, ekspresyjny ORM dla Pythona. Prostszy od SQLAlchemy, szybszy do nauki. Obsługuje SQLite, MySQL i PostgreSQL. Dobry dla małych projektów gdzie Django ORM to zbyt dużo.`,zawiera:[`class User(Model) — definicja modelu`,`User.create, save — zapis`,`User.select().where() — zapytania`,`IntegerField, CharField, ForeignKeyField`,`Migracje przez peewee-migrate`],imp:`from peewee import *
db = SqliteDatabase("app.db")`},{nazwa:`elasticsearch-py`,pip:`pip install elasticsearch`,kat:`db`,tworca:`Elastic`,krotki:`Elasticsearch klient`,opis:`Oficjalny klient Python dla Elasticsearch — wyszukiwarki pełnotekstowej i bazy analitycznej. Używana do wyszukiwania, logów (ELK Stack), i analityki w czasie rzeczywistym.`,zawiera:[`es.index — indeksowanie dokumentu`,`es.search — wyszukiwanie`,`Match, Term, Range — typy zapytań`,`es.bulk — masowe operacje`,`AsyncElasticsearch — wersja async`],imp:`from elasticsearch import Elasticsearch
es = Elasticsearch("http://localhost:9200")`},{nazwa:`pymysql`,pip:`pip install pymysql`,kat:`db`,tworca:`PyMySQL contributors`,krotki:`MySQL driver (pure Python)`,opis:`PyMySQL to klient MySQL napisany w czystym Pythonie — bez kompilacji C. Kompatybilny API z MySQLdb, ale łatwiejszy w instalacji. Używany z SQLAlchemy i bezpośrednio.`,zawiera:[`pymysql.connect — połączenie z MySQL`,`cursor.execute — wykonanie SQL`,`cursor.fetchall, fetchone — wyniki`,`DictCursor — wyniki jako słowniki`,`Obsługa transakcji i prepared statements`],imp:`import pymysql
conn = pymysql.connect(host="localhost", user="root", password="...", db="mydb")`},{nazwa:`neo4j`,pip:`pip install neo4j`,kat:`db`,tworca:`Neo4j Inc.`,krotki:`Graf baza danych`,opis:`Oficjalny Python driver dla Neo4j — wiodącej grafowej bazy danych. Używana gdy relacje między danymi są tak ważne jak dane same — sieci społecznościowe, recommendation engines, knowledge graphs.`,zawiera:[`GraphDatabase.driver — połączenie`,`session.run("CYPHER") — zapytanie Cypher`,`MATCH (n:User)-[:KNOWS]->(m) — Cypher`,`CREATE, MERGE — tworzenie węzłów i relacji`,`Async driver dla asyncio`],imp:`from neo4j import GraphDatabase
driver = GraphDatabase.driver("bolt://localhost", auth=("neo4j", "pass"))`},{nazwa:`psutil`,pip:`pip install psutil`,kat:`utils`,tworca:`Giampaolo Rodolà`,krotki:`Monitorowanie systemu`,opis:`psutil (process and system utilities) pobiera informacje o systemie i procesach — użycie CPU, RAM, dysku, sieci, listę procesów. Działa na Windows, Mac i Linux przez jedno API.`,zawiera:[`psutil.cpu_percent() — użycie CPU`,`psutil.virtual_memory() — stan RAM`,`psutil.disk_usage("/") — użycie dysku`,`psutil.Process(pid) — informacje o procesie`,`psutil.net_io_counters — statystyki sieci`],imp:`import psutil
print(f"CPU: {psutil.cpu_percent()}%, RAM: {psutil.virtual_memory().percent}%")`},{nazwa:`humanize`,pip:`pip install humanize`,kat:`utils`,tworca:`Jason Moiron`,krotki:`Czytelne wartości`,opis:`humanize zamienia liczby i daty na czytelny dla człowieka tekst. 1000000 → "1 million", datetime.now() - 3h → "3 hours ago". Idealne do interfejsów użytkownika i logów.`,zawiera:[`humanize.naturalsize(1024**3) → "1.1 GB"`,`humanize.naturaltime(dt) → "3 hours ago"`,`humanize.intcomma(1000000) → "1,000,000"`,`humanize.naturalday(date) → "yesterday"`,`Obsługa wielu języków przez locale`],imp:`import humanize
print(humanize.naturalsize(1024**3))  # 1.1 GB`},{nazwa:`pendulum`,pip:`pip install pendulum`,kat:`utils`,tworca:`Sébastien Eustace`,krotki:`Lepsze daty i strefy czasowe`,opis:`Pendulum to zaawansowana biblioteka do pracy z datami i czasem, naprawiająca bolączki standardowego datetime. Immutable, zawsze świadoma strefy czasowej i z czytelnym API.`,zawiera:[`pendulum.now("Europe/Warsaw") — aktualny czas`,`pendulum.parse("2024-01-15") — parsowanie`,`dt.in_timezone("UTC") — zmiana strefy`,`dt.diff_for_humans() → "3 hours ago"`,`dt.add(days=1, hours=2) — dodawanie`],imp:`import pendulum
now = pendulum.now("Europe/Warsaw")`},{nazwa:`dateparser`,pip:`pip install dateparser`,kat:`utils`,tworca:`Scrapinghub`,krotki:`Parsowanie dowolnych dat`,opis:`dateparser parsuje daty z niemal dowolnego formatu tekstowego — "yesterday", "3 days ago", "15 January 2024", "2024-01-15" — we wszystkich tych formatach i wielu językach.`,zawiera:[`dateparser.parse("yesterday") — dowolny format`,`dateparser.parse("3 days ago")`,`Obsługa wielu języków`,`dateparser.search.search_dates — daty w tekście`,`Konfiguracja timezone i preferencji`],imp:`import dateparser
date = dateparser.parse("3 dni temu", languages=["pl"])`},{nazwa:`orjson`,pip:`pip install orjson`,kat:`utils`,tworca:`ijl`,krotki:`Szybki JSON (Rust)`,opis:`orjson to najszybsza biblioteka JSON dla Pythona — napisana w Rust. Obsługuje datetime, numpy, UUID natywnie. Zastąp json.dumps/loads przez orjson.dumps/loads dla 10-100x przyspieszenia.`,zawiera:[`orjson.dumps(obj) → bytes`,`orjson.loads(data) → Python`,`Natywna obsługa datetime, UUID, numpy`,`OPT_INDENT_2 — formatowanie`,`Strict UTF-8, obsługa dataclasses`],imp:`import orjson
data = orjson.dumps({"key": "value"})
obj = orjson.loads(data)`},{nazwa:`msgpack`,pip:`pip install msgpack`,kat:`utils`,tworca:`Sadayuki Furuhashi`,krotki:`Binarna serializacja`,opis:`MessagePack to binarny format serializacji — jak JSON ale szybszy i mniejszy. Idealny do komunikacji między serwisami, cache w Redis i protokołów sieciowych gdzie rozmiar ma znaczenie.`,zawiera:[`msgpack.packb(obj) — Python → bytes`,`msgpack.unpackb(data) — bytes → Python`,`use_bin_type=True — obsługa bytes`,`Obsługa streaming przez Packer/Unpacker`,`2-5x mniejszy i szybszy niż JSON`],imp:`import msgpack
packed = msgpack.packb({"key": "value"}, use_bin_type=True)`},{nazwa:`attrs`,pip:`pip install attrs`,kat:`utils`,tworca:`Hynek Schlawack`,krotki:`Klasy danych (zaawansowane)`,opis:`attrs upraszcza tworzenie klas w Pythonie przez automatyczne generowanie __init__, __repr__, __eq__ i walidację. Starszy i potężniejszy od dataclasses — ma walidatory, konwertery i więcej opcji.`,zawiera:[`@attrs.define — nowoczesna klasa attrs`,`attr.ib, attr.field — definicja pola`,`validator — walidacja przy przypisaniu`,`converter — konwersja typów przy init`,`frozen=True — immutable klasy`],imp:`import attrs

@attrs.define
class User:
    name: str
    age: int = attrs.field(validator=attrs.validators.ge(0))`},{nazwa:`cachetools`,pip:`pip install cachetools`,kat:`utils`,tworca:`Thomas Kemmer`,krotki:`Cache w pamięci`,opis:`cachetools dostarcza różne strategie cache w pamięci — LRU, LFU, TTL, RR. Dekorator @cached działa jak functools.lru_cache, ale z więcej opcjami i wymiennym backenden.`,zawiera:[`LRUCache(maxsize=128) — cache LRU`,`TTLCache(maxsize=128, ttl=60) — z wygasaniem`,`@cached(cache) — dekorator`,`cache.popitem() — usunięcie elementu`,`Thread-safe wersje z RLock`],imp:`from cachetools import LRUCache, TTLCache, cached
cache = TTLCache(maxsize=100, ttl=60)`},{nazwa:`watchdog`,pip:`pip install watchdog`,kat:`utils`,tworca:`Yesudeep Mangalapilly`,krotki:`Monitorowanie systemu plików`,opis:`watchdog monitoruje zmiany w systemie plików — nowe pliki, modyfikacje, usunięcia. Używany w narzędziach dev (auto-reload), synchronizacji plików i systemach automatyzacji.`,zawiera:[`Observer — wątek monitorujący`,`FileSystemEventHandler — obsługa zdarzeń`,`on_created, on_modified, on_deleted — zdarzenia`,`observer.schedule(handler, path, recursive=True)`,`PatternMatchingEventHandler — filtrowanie`],imp:`from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler`},{nazwa:`filelock`,pip:`pip install filelock`,kat:`utils`,tworca:`Benedikt Schmitt`,krotki:`Blokada pliku`,opis:`filelock implementuje blokadę pliku (file lock) między procesami. Gwarantuje że tylko jeden proces może w danym momencie modyfikować plik — kluczowe w skryptach i harmonogramach.`,zawiera:[`FileLock("plik.lock") — tworzenie blokady`,`with lock: — sekcja krytyczna`,`Timeout — limit czekania na blokadę`,`lock.acquire, release — ręczna kontrola`,`Thread-safe i process-safe`],imp:`from filelock import FileLock
lock = FileLock("config.lock")`},{nazwa:`pyperclip`,pip:`pip install pyperclip`,kat:`utils`,tworca:`Al Sweigart`,krotki:`Schowek systemowy`,opis:`pyperclip pozwala kopiować i wklejać tekst ze schowka systemowego (Ctrl+C/V) z poziomu skryptu Python. Przydatny w automatyzacji, generatorach haseł i narzędziach desktopowych.`,zawiera:[`pyperclip.copy("tekst") — kopiowanie`,`pyperclip.paste() — wklejanie`,`Działa na Windows, Mac, Linux`,`Wymaga xclip/xsel na Linux`,`Integracja z PyAutoGUI w automatyzacji GUI`],imp:`import pyperclip
pyperclip.copy("Skopiowany tekst")
tekst = pyperclip.paste()`},{nazwa:`qrcode`,pip:`pip install qrcode[pil]`,kat:`utils`,tworca:`Lincoln Loop`,krotki:`Generowanie kodów QR`,opis:`qrcode generuje kody QR jako obraz PNG lub ASCII w terminalu. Proste API — jedna linia kodu i masz kod QR z dowolną treścią (URL, tekst, vCard).`,zawiera:[`qrcode.make("https://...") — szybki kod QR`,`QRCode — zaawansowana konfiguracja`,`error_correction — korekcja błędów`,`box_size, border — rozmiar`,`img.save("kod.png") — zapis PNG`],imp:`import qrcode
img = qrcode.make("https://example.com")
img.save("qr.png")`},{nazwa:`more-itertools`,pip:`pip install more-itertools`,kat:`utils`,tworca:`Erik Rose`,krotki:`Rozszerzenie itertools`,opis:`more-itertools dodaje setki użytecznych funkcji do pracy z iteratorami i sekwencjami — rozszerza standardowe itertools. Chunking, windowing, grouping, partitioning i wiele więcej.`,zawiera:[`chunked(lista, 10) — porcje po 10 elementów`,`windowed(lista, n) — okna przesuwne`,`flatten — spłaszczanie zagnieżdżonych iterabli`,`peekable — iterator z podglądem`,`partition — podział według predykatu`],imp:`from more_itertools import chunked, windowed, flatten`},{nazwa:`colorama`,pip:`pip install colorama`,kat:`utils`,tworca:`Jonathan Hartley`,krotki:`Kolory terminala (Windows)`,opis:`colorama sprawia że kolorowy output terminala (ANSI escape codes) działa na Windows. Na Mac/Linux jest zbędny — ale używanie go wszędzie zapewnia przenośność skryptów.`,zawiera:[`Fore.RED, GREEN, BLUE — kolor tekstu`,`Back.RED — kolor tła`,`Style.BRIGHT, DIM — jasność`,`Style.RESET_ALL — reset kolorów`,`init(autoreset=True) — auto reset po każdej linii`],imp:`from colorama import Fore, Back, Style, init
init()
print(Fore.RED + "Błąd!" + Style.RESET_ALL)`},{nazwa:`questionary`,pip:`pip install questionary`,kat:`utils`,tworca:`Tom Bocklisch`,krotki:`Interaktywne pytania CLI`,opis:`questionary tworzy ładne, interaktywne pytania w terminalu — listy wyboru, pola tekstowe, checkboxy, potwierdzenia. Idealne do interaktywnych skryptów CLI i konfiguratorów.`,zawiera:[`questionary.select — lista wyboru z strzałkami`,`questionary.text — pole tekstowe`,`questionary.confirm — tak/nie`,`questionary.checkbox — wielokrotny wybór`,`questionary.password — hasło (ukryte)`],imp:`import questionary
answer = questionary.select("Wybierz opcję:", choices=["A", "B", "C"]).ask()`},{nazwa:`typer`,pip:`pip install typer`,kat:`utils`,tworca:`Sebastián Ramírez (tiangolo)`,krotki:`CLI od twórcy FastAPI`,opis:`Typer to nowoczesna biblioteka do tworzenia CLI oparta na type hints — od twórcy FastAPI. Definiujesz funkcję z typami → Typer generuje CLI z automatyczną walidacją i --help.`,zawiera:[`@app.command() — definicja komendy`,`Automatyczne --help z docstringów`,`Opcje: Annotated[str, typer.Option()]`,`Argumenty: Annotated[str, typer.Argument()]`,`Podkomendy przez app.add_typer()`],imp:`import typer
app = typer.Typer()

@app.command()
def hello(name: str):
    print(f"Hello {name}")`},{nazwa:`environs`,pip:`pip install environs`,kat:`utils`,tworca:`Steven Loria`,krotki:`Zmienne środowiskowe z typami`,opis:`environs to biblioteka do czytania zmiennych środowiskowych z automatyczną konwersją typów. Prostsze niż pydantic-settings dla małych projektów — czyta .env i konwertuje bool, int, list.`,zawiera:[`env.str("API_KEY") — string ze środowiska`,`env.int("PORT", default=8000) — int`,`env.bool("DEBUG", default=False) — bool`,`env.list("CORS_ORIGINS") — lista`,`env.read_env() — wczytanie .env`],imp:`from environs import Env
env = Env()
env.read_env()`},{nazwa:`undetected-chromedriver`,pip:`pip install undetected-chromedriver`,kat:`scraping`,tworca:`ultrafunkamsterdam`,krotki:`Selenium bez wykrycia botów`,opis:`undetected-chromedriver to patched wersja ChromeDriver która omija wiele systemów wykrywania botów. Strony sprawdzające navigator.webdriver, fingerprint i inne sygnały widzą "prawdziwego" użytkownika.`,zawiera:[`uc.Chrome() — browser bez wykrycia`,`Automatyczne łatanie ChromeDriver`,`Losowe user agents i viewport`,`Omijanie Cloudflare i podobnych`,`Kompatybilne API z selenium`],imp:`import undetected_chromedriver as uc
driver = uc.Chrome()`},{nazwa:`mechanize`,pip:`pip install mechanize`,kat:`scraping`,tworca:`John J Lee`,krotki:`Emulacja przeglądarki bez JS`,opis:`mechanize to klient HTTP który naśladuje przeglądarkę — obsługuje cookies, formularze, nawigację historią. Szybszy od Selenium bo nie renderuje JS. Idealny dla starych stron z prostymi formularzami.`,zawiera:[`br.open(url) — otwarcie strony`,`br.select_form — wybór formularza`,`br.form["pole"] = "wartość" — wypełnienie`,`br.submit() — wysłanie formularza`,`br.links() — lista linków na stronie`],imp:`import mechanize
br = mechanize.Browser()`},{nazwa:`pyppeteer`,pip:`pip install pyppeteer`,kat:`scraping`,tworca:`Takayuki Shimizukawa`,krotki:`Puppeteer dla Pythona (async)`,opis:`pyppeteer to port Puppeteer (Node.js) dla Pythona — sterowanie Chrome/Chromium przez DevTools Protocol z pełną obsługą async. Alternatywa dla Playwright z podobnym API do Puppeteer.`,zawiera:[`await launch() — uruchomienie Chromium`,`await browser.newPage() — nowa zakładka`,`await page.goto(url) — nawigacja`,`await page.evaluate("JS kod") — JavaScript`,`await page.screenshot — zrzut ekranu`],imp:`import asyncio
from pyppeteer import launch`},{nazwa:`pytest-asyncio`,pip:`pip install pytest-asyncio`,kat:`testing`,tworca:`Tin Tvrtković`,krotki:`Async testy w pytest`,opis:`pytest-asyncio dodaje obsługę async/await do pytest. Pozwala pisać async def test_ funkcje i async fixtures. Wymagany do testowania FastAPI async endpointów i asyncio kodu.`,zawiera:[`@pytest.mark.asyncio — oznaczenie async testu`,`asyncio_mode = "auto" — auto-wykrywanie`,`async def test_endpoint — async test`,`Async fixtures z yield`,`Kompatybilny z httpx.AsyncClient`],imp:`import pytest

@pytest.mark.asyncio
async def test_coś():
    await asyncio.sleep(0)
    assert True`},{nazwa:`pytest-mock`,pip:`pip install pytest-mock`,kat:`testing`,tworca:`Bruno Oliveira`,krotki:`Mockowanie w pytest`,opis:`pytest-mock dodaje fixture mocker — wygodny wrapper na unittest.mock. Prostsze API niż mock.patch, automatyczny cleanup po każdym teście. Standard w pytest projektach.`,zawiera:[`mocker.patch("module.function") — podmiana`,`mocker.spy(obj, "method") — szpiegowanie`,`mocker.MagicMock() — tworzenie mocka`,`mock.assert_called_once_with() — weryfikacja`,`Automatyczny cleanup po teście`],imp:`def test_coś(mocker):
    mock_fn = mocker.patch("app.external_api.call")
    mock_fn.return_value = {"data": "test"}`},{nazwa:`factory_boy`,pip:`pip install factory-boy`,kat:`testing`,tworca:`Raphaël Barrois`,krotki:`Fabryki danych testowych`,opis:`factory_boy generuje obiekty testowe (Django models, SQLAlchemy, Pydantic) z sensownymi wartościami domyślnymi. Eliminuje powtarzalny kod tworzenia fixture — define once, use everywhere.`,zawiera:[`class UserFactory(factory.Factory)`,`factory.LazyAttribute — wartości zależne`,`factory.SubFactory — zagnieżdżone obiekty`,`create, build — z i bez zapisu do DB`,`faker integration — realistyczne dane`],imp:`import factory
from factory import LazyAttribute

class UserFactory(factory.Factory):
    class Meta:
        model = User
    name = factory.Faker("name")`},{nazwa:`vcrpy`,pip:`pip install vcrpy`,kat:`testing`,tworca:`Kevin McCarthy`,krotki:`Nagrywanie i odtwarzanie HTTP`,opis:`VCR.py nagrywa prawdziwe HTTP requesty do kaset i odtwarza je w kolejnych testach — bez dostępu do sieci. Testy są szybkie, deterministyczne i działają offline.`,zawiera:[`@vcr.use_cassette("kaseta.yaml") — użyj kasety`,`Nagranie przy pierwszym uruchomieniu`,`Odtwarzanie w kolejnych testach`,`record_mode — kontrola kiedy nagrywać`,`Filtrowanie nagłówków i danych wrażliwych`],imp:`import vcr

@vcr.use_cassette("fixtures/kaseta.yaml")
def test_api():
    response = requests.get("https://api.example.com/users")`},{nazwa:`pytest-cov`,pip:`pip install pytest-cov`,kat:`testing`,tworca:`Ned Batchelder / Marc Schlaich`,krotki:`Coverage dla pytest`,opis:`pytest-cov to plugin pytest integrujący coverage.py. Mierzy które linie kodu są uruchamiane podczas testów — wskazuje nieobjęte obszary wymagające testów.`,zawiera:[`pytest --cov=src — mierzenie coverage`,`--cov-report=html — raport HTML`,`--cov-fail-under=80 — próg w CI/CD`,`term-missing — numery linii bez testów`,`.coveragerc / pyproject.toml — konfiguracja`],imp:`# CLI: pytest --cov=src --cov-report=html`},{nazwa:`bandit`,pip:`pip install bandit`,kat:`devtools`,tworca:`PyCQA`,krotki:`Skaner bezpieczeństwa`,opis:`bandit to narzędzie do statycznej analizy bezpieczeństwa kodu Python. Wykrywa potencjalne luki bezpieczeństwa — hardcoded hasła, niebezpieczne użycie subprocess, podatności SQL injection itp.`,zawiera:[`bandit -r src/ — skanowanie projektu`,`Poziomy: LOW, MEDIUM, HIGH`,`bandit -ll — tylko poważne problemy`,`Integracja z CI/CD i pre-commit`,`.bandit — konfiguracja ignorowania`],imp:`# CLI: bandit -r src/ -ll`},{nazwa:`pylint`,pip:`pip install pylint`,kat:`devtools`,tworca:`PyCQA`,krotki:`Kompleksowy linter`,opis:`pylint to jeden z najstarszych i najbardziej szczegółowych linterów Python. Sprawdza styl, błędy logiczne, złożoność, brakujące docstringi. Bardziej restrykcyjny niż flake8 czy ruff.`,zawiera:[`pylint src/ — analiza projektu`,`--disable=C — wyłącz konwencje`,`.pylintrc — plik konfiguracji`,`pylint --generate-rcfile — generuj konfigurację`,`Score 0-10 — ocena jakości kodu`],imp:`# CLI: pylint src/ --fail-under=8`},{nazwa:`vulture`,pip:`pip install vulture`,kat:`devtools`,tworca:`Jendrik Seipp`,krotki:`Detekcja martwego kodu`,opis:`vulture znajduje nieużywany kod Python — funkcje, klasy, zmienne i importy które nie są nigdzie używane. Pomaga utrzymać czystą bazę kodu i usunąć nagromadzony dead code.`,zawiera:[`vulture src/ — skanowanie projektu`,`vulture src/ tests/ — uwzględnij testy`,`--min-confidence=80 — próg pewności`,`whitelist — ignorowanie false positives`,`Wsparcie dla dynamicznych atrybutów`],imp:`# CLI: vulture src/ --min-confidence 80`},{nazwa:`safety`,pip:`pip install safety`,kat:`devtools`,tworca:`pyup.io`,krotki:`Skanowanie podatności`,opis:`safety sprawdza zainstalowane paczki Python pod kątem znanych podatności bezpieczeństwa (CVE). Porównuje z bazą danych znanych podatności — używany w CI/CD do blokowania niebezpiecznych zależności.`,zawiera:[`safety check — sprawdzenie środowiska`,`safety check -r requirements.txt`,`--json — JSON output dla CI`,`Baza danych PyUp Safety DB`,`Integracja z GitHub Actions`],imp:`# CLI: pip install safety && safety check`},{nazwa:`isort`,pip:`pip install isort`,kat:`devtools`,tworca:`Timothy Edmund Crosley`,krotki:`Sortowanie importów`,opis:`isort automatycznie sortuje i grupuje importy Python według standardu PEP8 — stdlib, third-party, local. Eliminuje ręczne porządkowanie importów. Ruff może to zastąpić, ale isort jest bardziej konfigurowalny.`,zawiera:[`isort . — sortowanie całego projektu`,`isort --check — tylko sprawdzanie`,`--profile black — kompatybilność z Black`,`Sekcje: FUTURE, STDLIB, THIRDPARTY, FIRSTPARTY, LOCALFOLDER`,`Konfiguracja w pyproject.toml lub setup.cfg`],imp:`# CLI: isort . --profile black`},{nazwa:`http.server`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Prosty serwer HTTP`,opis:`Wbudowany serwer HTTP do szybkiego serwowania plików z lokalnego folderu. Uruchomienie jedną komendą — idealny do testowania frontendu, dzielenia plików w sieci LAN i developmentu.`,zawiera:[`python -m http.server 8080 — szybki start`,`SimpleHTTPRequestHandler — podstawowa obsługa`,`BaseHTTPRequestHandler — własna obsługa`,`HTTPServer — tworzenie serwera`,`Serwowanie plików statycznych z folderu`],imp:`# python -m http.server 8080
# lub:
from http.server import HTTPServer, SimpleHTTPRequestHandler`},{nazwa:`http.client`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Niskopoziomowy klient HTTP`,opis:`http.client to wbudowany klient HTTP bez zewnętrznych zależności. Mniej wygodny niż requests, ale zawsze dostępny. Używaj gdy nie możesz instalować pakietów zewnętrznych.`,zawiera:[`HTTPConnection — połączenie HTTP`,`HTTPSConnection — połączenie HTTPS`,`conn.request(method, url) — żądanie`,`response.read() — odczyt odpowiedzi`,`response.getheaders() — nagłówki`],imp:`import http.client
conn = http.client.HTTPSConnection("api.example.com")`},{nazwa:`email`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Budowanie wiadomości email`,opis:`Moduł email (razem ze smtplib) pozwala budować pełne wiadomości email — z treścią HTML i plaintext, załącznikami, nagłówkami i wieloma odbiorcami. Standardowy sposób na emaile w Pythonie.`,zawiera:[`MIMEMultipart — wiadomość z częściami`,`MIMEText — część tekstowa lub HTML`,`MIMEBase — binarne załączniki`,`email.utils.formataddr — formatowanie adresu`,`Header — nagłówki z polskimi znakami`],imp:`from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText`},{nazwa:`ftplib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Klient FTP`,opis:`Moduł ftplib implementuje klienta FTP do transferu plików przez protokół FTP. Prosty do użycia do automatyzacji pobierania/wysyłania plików z serwerów FTP.`,zawiera:[`FTP.connect — połączenie z serwerem`,`FTP.login — logowanie`,`FTP.retrlines — pobieranie tekstu`,`FTP.retrbinary — pobieranie pliku binarnego`,`FTP.storbinary — wysyłanie pliku`],imp:`from ftplib import FTP
ftp = FTP("ftp.example.com")`},{nazwa:`tkinter`,pip:`wbudowana (CPython)`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`GUI — graficzne okna`,opis:`tkinter to wbudowana biblioteka GUI Pythona — jedyna w standardowej bibliotece. Pozwala tworzyć okna, przyciski, pola tekstowe i inne elementy interfejsu graficznego. Prosta, ale wystarczająca dla narzędzi wewnętrznych.`,zawiera:[`Tk() — główne okno`,`Label, Button, Entry — widgety`,`pack, grid, place — layout`,`StringVar, IntVar — zmienne powiązane`,`ttk — nowocześniejszy zestaw widgetów`],imp:`import tkinter as tk
root = tk.Tk()
tk.Label(root, text="Hej!").pack()
root.mainloop()`},{nazwa:`ctypes`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wywołania funkcji C`,opis:`ctypes pozwala wywoływać funkcje z bibliotek C (.dll/.so) bezpośrednio z Pythona — bez pisania rozszerzeń C. Podstawa interoperacyjności Python-C i dostępu do systemowych API.`,zawiera:[`ctypes.cdll.LoadLibrary — ładowanie biblioteki C`,`CDLL, WinDLL, OleDLL — typy bibliotek`,`c_int, c_char_p, c_void_p — typy C`,`Structure — struktury C`,`byref, pointer — wskaźniki`],imp:`import ctypes
lib = ctypes.CDLL("libc.so.6")`},{nazwa:`platform`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Informacje o systemie`,opis:`Moduł platform dostarcza informacje o systemie operacyjnym, architekturze CPU i wersji Pythona. Używany do warunkowego kodu dla różnych platform (Windows vs Linux vs Mac).`,zawiera:[`platform.system() — "Windows"/"Linux"/"Darwin"`,`platform.version() — wersja systemu`,`platform.machine() — architektura (x86_64, arm64)`,`platform.python_version() — wersja Pythona`,`sys.platform — szybki string platformy`],imp:`import platform
print(platform.system(), platform.machine())`},{nazwa:`signal`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Sygnały systemowe`,opis:`Moduł signal obsługuje sygnały UNIX — przechwytuje Ctrl+C (SIGINT), SIGTERM i inne sygnały systemowe. Używany do graceful shutdown serwerów i skryptów długotrwałych.`,zawiera:[`signal.signal(SIGINT, handler) — rejestracja handlera`,`SIGINT — Ctrl+C`,`SIGTERM — żądanie zakończenia (kill)`,`signal.pause() — czekanie na sygnał`,`Graceful shutdown serwerów`],imp:`import signal
def handler(signum, frame):
    print("Zamykam...")
signal.signal(signal.SIGINT, handler)`},{nazwa:`pdb`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Interaktywny debugger`,opis:`pdb to wbudowany debugger Pythona. Pozwala zatrzymać program w dowolnym miejscu i interaktywnie sprawdzać zmienne, wykonywać kod krok po kroku i znaleźć przyczynę błędu.`,zawiera:[`breakpoint() — punkt przerwania (Python 3.7+)`,`import pdb; pdb.set_trace() — starszy sposób`,`n (next) — kolejna linia`,`s (step) — wejście do funkcji`,`l (list) — kod wokół bieżącej linii`,`p zmienna — wypisz wartość`],imp:`# W kodzie:
breakpoint()  # Python 3.7+
# lub:
import pdb; pdb.set_trace()`},{nazwa:`dis`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Deasembler bajtkodu`,opis:`Moduł dis disassembluje kod Pythona do czytelnego bajtkodu. Pozwala zrozumieć jak Python wykonuje kod — przydatne przy optymalizacji i rozumieniu Python internals.`,zawiera:[`dis.dis(funkcja) — deasembler funkcji`,`dis.disassemble — deasembler obiektu kodu`,`dis.get_instructions — iterator instrukcji`,`Instrukcje: LOAD_FAST, CALL_FUNCTION, RETURN_VALUE`,`Analiza efektywności różnych konstrukcji`],imp:`import dis
def f(x):
    return x + 1
dis.dis(f)`},{nazwa:`code`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Interaktywny interpreter`,opis:`Moduł code pozwala osadzić interaktywny interpreter Pythona w aplikacji. Użytkownik może wpisywać komendy Pythona jak w REPL — przydatne w narzędziach diagnostycznych i debugowaniu.`,zawiera:[`code.interact(local=locals()) — uruchom REPL`,`InteractiveConsole — klasa do osadzenia`,`runsource — wykonanie kodu`,`InteractiveInterpreter.runcode`,`Osadzanie w grach, narzędziach, IDE`],imp:`import code
code.interact(local={"x": 42, **globals()})`},{nazwa:`tracemalloc`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Śledzenie alokacji pamięci`,opis:`tracemalloc (Python 3.4+) śledzi alokacje pamięci — wskazuje gdzie i ile pamięci jest alokowane. Podstawowe narzędzie do znajdowania wycieków pamięci w długotrwałych procesach.`,zawiera:[`tracemalloc.start() — rozpoczęcie śledzenia`,`tracemalloc.take_snapshot() — migawka`,`snapshot.statistics("lineno") — alokacje wg linii`,`Top N allocations — największe alokacje`,`Porównanie dwóch migawek — wykrycie wycieku`],imp:`import tracemalloc
tracemalloc.start()
# ... kod ...
snap = tracemalloc.take_snapshot()`},{nazwa:`venv`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Wirtualne środowiska`,opis:`Moduł venv tworzy izolowane środowiska Python z własnymi paczkami. Każdy projekt powinien mieć własne venv — unika konfliktów wersji między projektami i systemowym Pythonem.`,zawiera:[`python -m venv venv — tworzenie środowiska`,`source venv/bin/activate — aktywacja (Linux/Mac)`,`venv\\Scripts\\activate — aktywacja (Windows)`,`deactivate — wyłączenie środowiska`,`Alternatywy: virtualenv, conda, uv`],imp:`# Tworzenie: python -m venv venv
# Aktywacja: source venv/bin/activate
# Instalacja: pip install -r requirements.txt`},{nazwa:`doctest`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Testy w docstringach`,opis:`doctest uruchamia przykłady z docstringów jako testy. Jeśli przykład w docstringu pokazuje wynik, doctest go weryfikuje — dokumentacja i testy w jednym miejscu.`,zawiera:[`python -m doctest modul.py — uruchomienie`,`>>> wyrażenie — przykład do przetestowania`,`... — kontynuacja linii`,`doctest.testmod() — z kodu`,`Integracja z pytest: pytest --doctest-modules`],imp:`def add(a, b):
    """
    >>> add(2, 3)
    5
    >>> add(-1, 1)
    0
    """
    return a + b`},{nazwa:`python-jose`,pip:`pip install python-jose[cryptography]`,kat:`web`,tworca:`Michael Davis`,krotki:`JOSE / JWT implementacja`,opis:`python-jose implementuje JOSE (JSON Object Signing and Encryption) — standard dla JWT, JWS, JWE i JWK. Bogatsza implementacja niż PyJWT, obsługuje więcej algorytmów i JWKS.`,zawiera:[`jwt.encode — tworzenie JWT`,`jwt.decode — weryfikacja i odczyt`,`Algorytmy: RS256, ES256, HS256`,`JWKS — weryfikacja kluczem publicznym`,`JWE — szyfrowane JWT`],imp:`from jose import jwt
token = jwt.encode({"sub": "user"}, "secret", algorithm="HS256")`},{nazwa:`stytch`,pip:`pip install stytch`,kat:`web`,tworca:`Stytch Inc.`,krotki:`Uwierzytelnianie (Auth-as-a-Service)`,opis:`Stytch to platforma uwierzytelniania — magic links, OTP, OAuth, passkeys i sessions bez budowania własnego systemu auth. SDK dla Pythona integruje się z FastAPI i Django.`,zawiera:[`Magic links — bez hasła`,`OTP — SMS i email kody`,`OAuth — Google, GitHub, Apple`,`Session management — tokeny sesji`,`API dla każdej metody auth`],imp:`from stytch import Client
client = Client(project_id="...", secret="...")`},{nazwa:`sse-starlette`,pip:`pip install sse-starlette`,kat:`web`,tworca:`Sander Wapstra`,krotki:`Server-Sent Events dla FastAPI`,opis:`sse-starlette dodaje obsługę Server-Sent Events (SSE) do FastAPI i Starlette. SSE to jednokierunkowy streaming HTTP — idealny dla powiadomień na żywo, postępu zadań i AI streaming.`,zawiera:[`EventSourceResponse — endpoint SSE`,`Async generator jako źródło danych`,`Klient w JS: new EventSource("/stream")`,`Automatyczny retry przy zerwaniu`,`Lżejsze od WebSocket dla jednokirunkowego streaming`],imp:`from sse_starlette import EventSourceResponse

@app.get("/stream")
async def stream():
    async def generate():
        yield {"data": "hello"}
    return EventSourceResponse(generate())`},{nazwa:`httpcore`,pip:`pip install httpcore`,kat:`web`,tworca:`Encode`,krotki:`Transport HTTP (niskopoziomowy)`,opis:`httpcore to niskopoziomowy transport HTTP używany wewnętrznie przez httpx. Bezpośrednio rzadko używany, ale zrozumienie go pomaga debugować httpx. Obsługuje HTTP/1.1 i HTTP/2.`,zawiera:[`ConnectionPool — pula połączeń`,`SyncHTTPTransport, AsyncHTTPTransport`,`Bezpośredni dostęp do protokołu`,`Podstawa httpx — zamień transport`,`Obsługa proxy i SSL`],imp:`import httpcore
with httpcore.ConnectionPool() as pool:
    response = pool.request("GET", "https://example.com/")`},{nazwa:`dependency-injector`,pip:`pip install dependency-injector`,kat:`web`,tworca:`Roman Mogylatov`,krotki:`Dependency Injection container`,opis:`Dependency Injector to framework DI dla Pythona. Definiujesz zależności w kontenerach — biblioteka automatycznie je tworzy i wstrzykuje. Bardziej zaawansowany niż natywny Depends() FastAPI.`,zawiera:[`Container — kontener zależności`,`providers.Singleton — singleton`,`providers.Factory — nowy obiekt`,`@inject — dekorator wstrzykiwania`,`Configuration — zależności z konfiguracji`],imp:`from dependency_injector import containers, providers

class Container(containers.DeclarativeContainer):
    db = providers.Singleton(Database, url=config.db.url)`},{nazwa:`h5py`,pip:`pip install h5py`,kat:`data`,tworca:`Andrew Collette`,krotki:`Pliki HDF5`,opis:`h5py to Python interfejs dla formatu HDF5 — hierarchicznego formatu danych naukowych. Używany w ML do przechowywania dużych tensorów, w nauce do zbiorów eksperymentalnych.`,zawiera:[`h5py.File("dane.h5", "w") — tworzenie pliku`,`f.create_dataset("tensor", data=arr) — zapis`,`f["tensor"][:] — odczyt (lazy)`,`Grupy — jak foldery w pliku`,`Atrybuty — metadane do zbiorów`],imp:`import h5py
with h5py.File("model.h5", "r") as f:
    weights = f["layer1/weights"][:]`},{nazwa:`netCDF4`,pip:`pip install netCDF4`,kat:`data`,tworca:`Jeff Whitaker`,krotki:`Dane klimatyczne/naukowe`,opis:`netCDF4 obsługuje format NetCDF — standard w naukach o Ziemi (meteorologia, oceanografia, klimatologia). Przechowuje wielowymiarowe dane (temperatura, ciśnienie w siatce lat/lon/czas).`,zawiera:[`Dataset("plik.nc") — otwieranie pliku`,`dataset.variables — dostępne zmienne`,`var[:] — odczyt jako numpy array`,`createVariable — zapis nowych danych`,`Obsługa CF Conventions i metadanych`],imp:`from netCDF4 import Dataset
nc = Dataset("temperatura.nc", "r")`},{nazwa:`xarray`,pip:`pip install xarray`,kat:`data`,tworca:`Stephan Hoyer / xarray team`,krotki:`N-wymiarowe tablice z etykietami`,opis:`xarray rozszerza numpy o wymiary z nazwami i współrzędnymi (jak pandas ale n-wymiarowy). Idealne dla danych naukowych — klimat, satelity, neuroimaging. Integruje się z Dask i NetCDF.`,zawiera:[`DataArray — n-wymiarowa tablica z etykietami`,`Dataset — zbiór DataArrays (jak dict tablic)`,`da.sel(time="2024-01") — selekcja po etykiecie`,`da.mean(dim="lat") — agregacja po wymiarze`,`Eksport do NetCDF, Zarr, Parquet`],imp:`import xarray as xr
ds = xr.open_dataset("climate.nc")`},{nazwa:`altair`,pip:`pip install altair`,kat:`data`,tworca:`UW Interactive Data Lab`,krotki:`Deklaratywne wykresy`,opis:`Altair to biblioteka wizualizacji oparta na specyfikacji Vega-Lite. Deklaratywne API — opisujesz CO chcesz pokazać, nie JAK. Integruje się z Jupyter i generuje interaktywne wykresy HTML.`,zawiera:[`alt.Chart(df).mark_point() — podstawowy wykres`,`.encode(x="kolumna", y="wartość") — mapowanie`,`.interactive() — zoom i pan`,`Transformacje: fold, aggregate, bin`,`Kompozycja: hconcat, vconcat, layer`],imp:`import altair as alt
chart = alt.Chart(df).mark_bar().encode(x="kategoria", y="count()")`},{nazwa:`bokeh`,pip:`pip install bokeh`,kat:`data`,tworca:`Anaconda / Bokeh contributors`,krotki:`Interaktywne wykresy webowe`,opis:`Bokeh tworzy interaktywne wykresy dla przeglądarki — zoom, pan, hover tooltips, widgets. Może serwować live dashboardy przez serwer Bokeh z aktualizacją danych w czasie rzeczywistym.`,zawiera:[`figure() — nowy wykres`,`plot.circle, line, rect — geometrie`,`ColumnDataSource — źródło danych`,`HoverTool — tooltips przy najechaniu`,`curdoc().add_root — serwer Bokeh`],imp:`from bokeh.plotting import figure, show
from bokeh.io import output_notebook`},{nazwa:`faiss-cpu`,pip:`pip install faiss-cpu`,kat:`ai`,tworca:`Facebook AI Research`,krotki:`Wyszukiwanie wektorów (szybkie)`,opis:`FAISS (Facebook AI Similarity Search) to biblioteka do bardzo szybkiego wyszukiwania podobnych wektorów. Skaluje się do miliardów wektorów. Podstawa wielu systemów RAG i rekomendacji.`,zawiera:[`IndexFlatL2 — dokładne wyszukiwanie`,`IndexIVFFlat — przybliżone wyszukiwanie`,`index.add(vectors) — dodawanie`,`index.search(query, k) — top-k podobnych`,`GPU wersja: faiss-gpu`],imp:`import faiss
import numpy as np
index = faiss.IndexFlatL2(768)  # dim=768`},{nazwa:`tiktoken`,pip:`pip install tiktoken`,kat:`ai`,tworca:`OpenAI`,krotki:`Tokenizer OpenAI`,opis:`tiktoken to szybki tokenizer od OpenAI używany przez modele GPT. Pozwala precyzyjnie liczyć tokeny przed wysłaniem do API — uniknięcie przekroczenia limitu kontekstu i planowanie kosztów.`,zawiera:[`encoding_for_model("gpt-4o") — tokenizer modelu`,`encode("tekst") → lista tokenów`,`decode(tokeny) → tekst`,`len(tokens) — liczba tokenów`,`Obsługa cl100k_base, o200k_base i innych`],imp:`import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o")
tokens = enc.encode("Witaj świecie!")`},{nazwa:`anthropic`,pip:`pip install anthropic`,kat:`ai`,tworca:`Anthropic`,krotki:`Modele Claude (API)`,opis:`Oficjalny Python SDK Anthropic do komunikacji z modelami Claude. Obsługuje streaming, tool use (wywołania funkcji), analizę obrazów i długi kontekst. Claude 3.5 Sonnet / Claude 4.`,zawiera:[`messages.create — chat z Claude`,`Streaming — tokeny na żywo`,`Tool use — wywoływanie narzędzi (funkcji)`,`Vision — analiza obrazów i PDF`,`claude-opus-4, claude-sonnet-4-6 — modele`],imp:`from anthropic import Anthropic
client = Anthropic()
response = client.messages.create(model="claude-sonnet-4-6", max_tokens=1024, messages=[{"role": "user", "content": "Cześć!"}])`},{nazwa:`google-generativeai`,pip:`pip install google-generativeai`,kat:`ai`,tworca:`Google DeepMind`,krotki:`Gemini API (stary SDK)`,opis:`Starszy Python SDK dla API Google Gemini (google.generativeai). Dostępne modele: Gemini 2.0 Flash, Gemini 2.5 Pro. Zastępowany przez google-genai ale wciąż szeroko używany.`,zawiera:[`GenerativeModel — model Gemini`,`generate_content — generowanie`,`Streaming chat`,`Multimodal — tekst + obraz`,`Safety settings — filtry bezpieczeństwa`],imp:`import google.generativeai as genai
model = genai.GenerativeModel("gemini-2.0-flash")`},{nazwa:`cohere`,pip:`pip install cohere`,kat:`ai`,tworca:`Cohere Inc.`,krotki:`Embeddingi i reranking`,opis:`Cohere udostępnia API do embeddings i rerankingu dokumentów. Szczególnie silny w wyszukiwaniu semantycznym i RAG — model rerank podnosi trafność wyników wyszukiwania.`,zawiera:[`embed — generowanie embeddings`,`rerank — poprawianie rankingu wyników`,`command — modele generatywne`,`classify — klasyfikacja tekstu`,`Wsparcie dla wielu języków`],imp:`import cohere
co = cohere.Client(api_key="...")`},{nazwa:`whisper`,pip:`pip install openai-whisper`,kat:`ai`,tworca:`OpenAI`,krotki:`Transkrypcja audio (lokalnie)`,opis:`Whisper to model ASR (Automatic Speech Recognition) od OpenAI dostępny lokalnie. Transkrybuje mowę na tekst w ponad 99 językach, w tym polskim — bez wysyłania danych do chmury.`,zawiera:[`whisper.load_model("base") — ładowanie modelu`,`model.transcribe("audio.mp3") — transkrypcja`,`Modele: tiny, base, small, medium, large`,`language="pl" — wskazanie języka`,`word_timestamps — timestampy dla słów`],imp:`import whisper
model = whisper.load_model("base")
result = model.transcribe("audio.mp3", language="pl")`},{nazwa:`ultralytics`,pip:`pip install ultralytics`,kat:`ai`,tworca:`Ultralytics`,krotki:`YOLO — detekcja obiektów`,opis:`Ultralytics to biblioteka do YOLO (You Only Look Once) — najszybszego modelu detekcji obiektów na obrazach i wideo. Prosta API: załaduj model, uruchom na obrazie, dostań bounding boxy.`,zawiera:[`YOLO("yolov8n.pt") — załaduj model`,`model.predict("obraz.jpg") — detekcja`,`results.boxes — wykryte obiekty z klasami i confidence`,`model.train(data="dataset.yaml") — trening`,`Segmentacja, klasyfikacja, pose estimation`],imp:`from ultralytics import YOLO
model = YOLO("yolov8n.pt")
results = model.predict("foto.jpg")`},{nazwa:`httpx-cache`,pip:`pip install hishel`,kat:`utils`,tworca:`hishel contributors`,krotki:`Cache dla httpx`,opis:`hishel to cache dla httpx zgodny z RFC 9111 (HTTP Caching). Automatycznie cache'uje odpowiedzi GET według nagłówków Cache-Control. Zmniejsza liczbę requestów do zewnętrznych API.`,zawiera:[`CacheClient — httpx z cache`,`Backends: InMemory, FileCache, Redis`,`Zgodność z Cache-Control, ETag, Last-Modified`,`cache.close() — czyszczenie cache`,`AsyncCacheClient — wersja async`],imp:`import hishel
storage = hishel.FileStorage(base_path="./cache")
with hishel.CacheClient(storage=storage) as client:
    response = client.get("https://api.example.com/data")`},{nazwa:`diskcache`,pip:`pip install diskcache`,kat:`utils`,tworca:`Grant Jenks`,krotki:`Cache na dysku`,opis:`diskcache to trwały cache na dysku — dane przeżywają restarty procesu. Prosty słownikowy interfejs, obsługuje TTL, tagowanie i eviction policies. Szybki dzięki SQLite.`,zawiera:[`Cache("./cache") — otwieranie cache`,`cache["klucz"] = wartość — zapis`,`cache.get("klucz", default) — odczyt`,`cache.set("klucz", wartość, expire=3600) — z TTL`,`cache.memoize() — dekorator cache dla funkcji`],imp:`import diskcache
cache = diskcache.Cache("./cache")
cache.set("wynik", dane, expire=3600)`},{nazwa:`retry`,pip:`pip install retry`,kat:`utils`,tworca:`Invl Fern`,krotki:`Dekorator retry`,opis:`retry to prosty dekorator do automatycznego ponawiania funkcji które mogą zawieść — wywołania API, operacje sieciowe, zapis do pliku. Prostszy w użyciu niż tenacity dla podstawowych przypadków.`,zawiera:[`@retry(tries=3, delay=1) — podstawowe ponawianie`,`@retry(exceptions=ConnectionError) — dla konkretnych błędów`,`delay — opóźnienie między próbami`,`backoff — mnożnik opóźnienia`,`logger — logowanie prób`],imp:`from retry import retry

@retry(tries=3, delay=2, backoff=2)
def call_api():
    return requests.get("https://api.example.com")`},{nazwa:`limits`,pip:`pip install limits`,kat:`utils`,tworca:`Ali-Akber Saifee`,krotki:`Rate limiting (biblioteka)`,opis:`limits to biblioteka do implementacji rate limitingu w Pythonie — po stronie klienta lub serwera. Obsługuje różne strategie (fixed window, sliding window, token bucket) i backend Redis.`,zawiera:[`parse_many("10/minute") — definicja limitu`,`MovingWindowRateLimiter — sliding window`,`FixedWindowRateLimiter — stałe okno`,`RedisStorage — backend Redis`,`hit() — sprawdzenie i użycie limitu`],imp:`from limits import storage, strategies, parse_many
limiter = strategies.MovingWindowRateLimiter(storage.MemoryStorage())`},{nazwa:`APScheduler`,pip:`pip install APScheduler`,kat:`utils`,tworca:`Alex Grönholm`,krotki:`Harmonogramowanie zadań`,opis:`APScheduler (Advanced Python Scheduler) to biblioteka do uruchamiania zadań według harmonogramu wewnątrz aplikacji Python. Obsługuje cron, interwały i jednorazowe zadania z persistencją w bazie.`,zawiera:[`AsyncScheduler — dla asyncio`,`CronTrigger — harmonogram cron`,`IntervalTrigger — co N sekund/minut`,`scheduler.add_job — dodawanie zadania`,`Persystencja w SQLAlchemy, MongoDB, Redis`],imp:`from apscheduler.schedulers.asyncio import AsyncIOScheduler
scheduler = AsyncIOScheduler()`},{nazwa:`natsort`,pip:`pip install natsort`,kat:`utils`,tworca:`Seth M. Morton`,krotki:`Naturalne sortowanie`,opis:`natsort sortuje stringi "po ludzku" — file2.txt < file10.txt zamiast file10.txt < file2.txt. Idealne do sortowania nazw plików, wersji i każdego tekstu zawierającego liczby.`,zawiera:[`natsorted(lista) — naturalne sortowanie`,`natsort_key — klucz do sorted()`,`ns.LOCALE — sortowanie z locale`,`ns.REAL — sortowanie liczb zmiennoprzecinkowych`,`humansorted — jak natsorted ale case-insensitive`],imp:`from natsort import natsorted
files = natsorted(["file10.txt", "file2.txt", "file1.txt"])`},{nazwa:`httpx`,pip:`pip install httpx`,kat:`scraping`,tworca:`Encode`,krotki:`Async HTTP klient (nowoczesny)`,opis:`httpx to nowoczesny klient HTTP obsługujący async/await i HTTP/2. API identyczne z requests — prosta migracja. Używany w FastAPI TestClient i jako zamiennik requests w kodzie async.`,zawiera:[`httpx.get, post — sync jak requests`,`async with httpx.AsyncClient() as c — async`,`Obsługa HTTP/2`,`httpx.Client(timeout=10) — timeout`,`httpx.Client(follow_redirects=True) — przekierowania`],imp:`import httpx
# Sync:
response = httpx.get("https://api.example.com")
# Async:
async with httpx.AsyncClient() as client:
    r = await client.get(url)`},{nazwa:`drissionpage`,pip:`pip install DrissionPage`,kat:`scraping`,tworca:`g1879`,krotki:`Scraping bez wykrycia`,opis:`DrissionPage łączy sterowanie prawdziwą przeglądarką Chrome (przez CDP) z lekkim requestem HTTP. Płynne przełączanie między trybami — JavaScript gdy potrzeba, szybkie requesty gdy można.`,zawiera:[`ChromiumPage — sterowanie Chrome`,`SessionPage — szybkie requesty`,`page.get(url) — nawigacja`,`page.ele("css:div.title") — znajdowanie elementów`,`Automatyczna obsługa shadow DOM i iFrame`],imp:`from DrissionPage import ChromiumPage
page = ChromiumPage()`},{nazwa:`parsel`,pip:`pip install parsel`,kat:`scraping`,tworca:`Zyte / Scrapy team`,krotki:`CSS i XPath selektory`,opis:`parsel to biblioteka do wyciągania danych z HTML/XML za pomocą selektorów CSS i XPath. Używana wewnętrznie przez Scrapy — ale działa samodzielnie i jest szybsza niż BeautifulSoup dla prostych przypadków.`,zawiera:[`Selector(html) — tworzenie selektora`,`sel.css("div.title::text").get()`,`sel.xpath("//a/@href").getall()`,`sel.re(r"\\d+") — regex na wyniku`,`Łączenie CSS z XPath`],imp:`from parsel import Selector
sel = Selector(html)
titles = sel.css("h2.title::text").getall()`},{nazwa:`coverage`,pip:`pip install coverage`,kat:`devtools`,tworca:`Ned Batchelder`,krotki:`Pomiar pokrycia kodu testami`,opis:`coverage.py mierzy które linie kodu są wykonywane podczas testów. Generuje raporty HTML, XML i JSON. Używany bezpośrednio lub przez pytest-cov.`,zawiera:[`coverage run -m pytest — pomiar przy testach`,`coverage report — raport w terminalu`,`coverage html — raport HTML`,`coverage.rc — konfiguracja`,`branch coverage — pomiar gałęzi kodu`],imp:`# CLI: coverage run -m pytest && coverage html
# lub:
import coverage
cov = coverage.Coverage()`},{nazwa:`pyinstaller`,pip:`pip install pyinstaller`,kat:`devtools`,tworca:`Hartmut Goebel / PyInstaller team`,krotki:`Aplikacje .exe z Pythona`,opis:`PyInstaller pakuje skrypt Python razem z interpreterem i wszystkimi zależnościami w jeden plik wykonywalny (.exe, .app). Nie wymaga instalacji Pythona na docelowym komputerze.`,zawiera:[`pyinstaller skrypt.py — podstawowe pakowanie`,`--onefile — jeden plik wykonywalny`,`--windowed — bez okna konsoli (GUI)`,`--add-data — dołączanie plików zasobów`,`--icon — ikona aplikacji`],imp:`# CLI: pyinstaller --onefile --windowed app.py`},{nazwa:`nuitka`,pip:`pip install nuitka`,kat:`devtools`,tworca:`Kay Hayen`,krotki:`Kompilator Python → C`,opis:`Nuitka kompiluje kod Python do kodu C, który jest kompilowany przez GCC/MSVC. Efekt: szybszy program, brak zależności od interpretera Pythona. Alternatywa dla PyInstaller z lepszą wydajnością.`,zawiera:[`python -m nuitka skrypt.py — kompilacja`,`--onefile — jeden plik wykonywalny`,`--follow-imports — dołącz biblioteki`,`--plugin-enable=numpy — pluginy`,`5-10x szybszy niż PyInstaller output`],imp:`# CLI: python -m nuitka --onefile --follow-imports app.py`},{nazwa:`pip-tools`,pip:`pip install pip-tools`,kat:`devtools`,tworca:`Jazzband`,krotki:`Zarządzanie zależnościami`,opis:`pip-tools generuje deterministyczne requirements.txt z abstrakcyjnych requirements.in. pip-compile rozwiązuje całe drzewo zależności i przypina wersje — gwarantuje reprodukowalne środowisko.`,zawiera:[`pip-compile requirements.in → requirements.txt`,`pip-sync — synchronizacja środowiska`,`requirements.in — główne zależności (bez pinowania)`,`requirements.txt — pin wszystkiego (auto)`,`Oddzielne pliki dla prod i dev`],imp:`# pip-compile requirements.in
# pip-sync requirements.txt`},{nazwa:`shelve`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Prosta baza klucz-wartość`,opis:`Moduł shelve tworzy trwały słownik Pythona przechowywany na dysku — jak dict, ale dane przeżywają restarty programu. Prostszy od pickle dla trwałego przechowywania obiektów.`,zawiera:[`shelve.open("baza") — otwarcie/tworzenie`,`shelf["klucz"] = obiekt — zapis`,`shelf["klucz"] — odczyt`,`del shelf["klucz"] — usunięcie`,`writeback=True — auto-zapis zmian`],imp:`import shelve
with shelve.open("baza") as db:
    db["user"] = {"name": "Jan", "age": 30}`},{nazwa:`cmd`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Framework dla CLI REPL`,opis:`Moduł cmd ułatwia budowanie interaktywnych interpreterów poleceń — jak mini-shell. Automatycznie obsługuje help, history i tab completion. Dobry do narzędzi administracyjnych.`,zawiera:[`Cmd — klasa bazowa interpretera`,`do_komenda — definicja komendy`,`help_komenda — pomoc do komendy`,`cmdloop() — pętla główna`,`default — obsługa nieznanych komend`],imp:`import cmd

class MójShell(cmd.Cmd):
    prompt = "> "
    def do_cześć(self, line):
        print("Cześć!")`},{nazwa:`curses`,pip:`wbudowana (Linux/Mac)`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`TUI — terminal UI`,opis:`curses daje pełną kontrolę nad terminalem — pozycjonowanie kursora, kolory, okna, przechwytywanie klawiszy. Podstawa aplikacji tekstowych (TUI) takich jak edytory, panele monitoringu.`,zawiera:[`curses.wrapper(main) — bezpieczne uruchomienie`,`stdscr.addstr(y, x, tekst) — wypisywanie`,`curses.color_pair — kolory tekstu`,`getch() — czekanie na klawisz`,`newwin — tworzenie okna`],imp:`import curses
def main(stdscr):
    stdscr.addstr(0, 0, "Witaj!")
    stdscr.getch()
curses.wrapper(main)`},{nazwa:`uu`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kodowanie UUencode`,opis:`Historyczny moduł kodowania UUencode — binarny → ASCII. Deprecated w Python 3.11, usunięty w 3.13. Wymieniony tu jako przestroga — używaj base64 zamiast tego.`,zawiera:[`uu.encode, uu.decode — przestarzałe`,`Historyczny format przesyłania emailem`,`DEPRECATED w Python 3.11`,`USUNIĘTY w Python 3.13`,`Zastąp przez base64 lub binascii`],imp:`# DEPRECATED — nie używaj
# Użyj: import base64`},{nazwa:`zlib`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kompresja zlib/gzip`,opis:`Moduł zlib implementuje algorytm kompresji DEFLATE (używany w ZIP i gzip). Pozwala kompresować i dekompresować dane binarne bez tworzenia pliku — w pamięci.`,zawiera:[`zlib.compress(data) — kompresja do bytes`,`zlib.decompress(data) — dekompresja`,`zlib.compressobj — strumieniowa kompresja`,`level= — poziom kompresji (0-9)`,`zlib.crc32 — suma kontrolna CRC32`],imp:`import zlib
compressed = zlib.compress(b"dane do kompresji", level=6)`},{nazwa:`gzip`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Pliki .gz`,opis:`Moduł gzip czyta i zapisuje pliki skompresowane w formacie gzip (.gz). Można otworzyć plik .gz jak zwykły plik — automatyczna kompresja/dekompresja przy odczycie/zapisie.`,zawiera:[`gzip.open("plik.gz", "rt") — jak open()`,`gzip.compress(data) — kompresja bytes`,`gzip.decompress(data) — dekompresja bytes`,`GzipFile — niskopoziomowe API`,`Obsługa plików JSON.gz, CSV.gz`],imp:`import gzip
with gzip.open("dane.json.gz", "rt") as f:
    data = json.load(f)`},{nazwa:`lzma`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Kompresja LZMA / XZ`,opis:`Moduł lzma obsługuje kompresję LZMA i XZ — algorytmy dające lepszą kompresję niż gzip kosztem szybkości. Używane w archiwach .xz i .lzma popularnych na Linuksie.`,zawiera:[`lzma.compress(data) — kompresja`,`lzma.decompress(data) — dekompresja`,`lzma.open("plik.xz", "rb") — pliki XZ`,`LZMACompressor — strumieniowe`,`CHECK_CRC64 — weryfikacja integralności`],imp:`import lzma
with lzma.open("archiwum.xz", "rb") as f:
    data = f.read()`},{nazwa:`telnetlib`,pip:`wbudowana (deprecated 3.11)`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`Klient Telnet`,opis:`telnetlib implementuje klienta Telnet. Deprecated w Python 3.11 — ale wciąż używany do automatyzacji starszych urządzeń sieciowych (routery, switche) które obsługują tylko Telnet.`,zawiera:[`Telnet(host, port) — połączenie`,`read_until(b"promot") — czekaj na tekst`,`write(b"komenda\\n") — wyślij`,`open — otwieranie sesji`,`Alternatywa: paramiko dla SSH`],imp:`import telnetlib
tn = telnetlib.Telnet("192.168.1.1", 23)`},{nazwa:`xmlrpc`,pip:`wbudowana`,kat:`stdlib`,tworca:`Python Software Foundation`,krotki:`XML-RPC klient i serwer`,opis:`Moduł xmlrpc implementuje protokół XML-RPC — prosty protokół RPC przez HTTP z XML. Wbudowany klient i serwer — rzadko używany w nowych projektach, ale często w legacy systemach.`,zawiera:[`xmlrpc.client.ServerProxy — klient RPC`,`ServerProxy.metoda() — zdalne wywołanie`,`xmlrpc.server.SimpleXMLRPCServer — serwer`,`register_function — rejestrowanie metod`,`multicall — wiele wywołań w jednym`],imp:`import xmlrpc.client
proxy = xmlrpc.client.ServerProxy("http://serwer/RPC2")`},{nazwa:`strawberry-graphql`,pip:`pip install strawberry-graphql`,kat:`web`,tworca:`Patrick Arminio`,krotki:`GraphQL dla FastAPI`,opis:`Strawberry to biblioteka GraphQL dla Pythona oparta na dataclasses. Czyste API, integracja z FastAPI i Django. Definiujesz schema przez klasy Python z dekoratorami.`,zawiera:[`@strawberry.type — typ GraphQL`,`@strawberry.field — pole w typie`,`Schema(query=Query) — definicja schema`,`GraphQLRouter — integracja z FastAPI`,`GraphiQL — wbudowany explorer`],imp:`import strawberry
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "world"`},{nazwa:`authlib`,pip:`pip install Authlib`,kat:`web`,tworca:`Hsiaoming Yang`,krotki:`OAuth 2.0 i OpenID Connect`,opis:`Authlib to kompletna implementacja OAuth 2.0 i OpenID Connect dla Pythona. Obsługuje role serwera (authorization server) i klienta. Używany z Flask, Django i FastAPI.`,zawiera:[`OAuth2Session — klient OAuth 2.0`,`AuthorizationCodeFlow — flow autoryzacji`,`JWT — JSON Web Tokens`,`JWKS — klucze publiczne`,`Serwer autoryzacji OAuth 2.0`],imp:`from authlib.integrations.httpx_client import OAuth2Client
client = OAuth2Client(client_id="...", client_secret="...")`},{nazwa:`httpretty`,pip:`pip install httpretty`,kat:`testing`,tworca:`Gabriel Falcão`,krotki:`Mockowanie HTTP (interceptor)`,opis:`HTTPretty przechwytuje wywołania socket i HTTP na poziomie systemu — działa ze wszystkimi bibliotekami HTTP (requests, httpx, urllib) bez ich modyfikacji. Alternatywa dla responses.`,zawiera:[`@httpretty.activate — aktywacja przechwytywania`,`httpretty.register_uri(GET, url, body=...)`,`HTTPretty.last_request — ostatni request`,`Obsługa streaming, chunked, websocket`,`Działa z requests, httpx, urllib`],imp:`import httpretty

@httpretty.activate
def test():
    httpretty.register_uri(httpretty.GET, "http://api.com/users", body='[{"id":1}]')`},{nazwa:`guidance`,pip:`pip install guidance`,kat:`ai`,tworca:`Microsoft`,krotki:`Kontrolowane generowanie LLM`,opis:`guidance umożliwia precyzyjną kontrolę nad wyjściem modelu językowego — gwarantowane struktury (JSON, lista), interleaving kodu i generowania, ograniczenia do dozwolonych wartości. Inny paradygmat niż prompting.`,zawiera:[`@guidance — dekorator programu guidance`,`gen() — generowanie tekstu`,`select() — wybór z listy wartości`,`json() — gwarantowany JSON output`,`Wsparcie dla OpenAI, Llama, Phi`],imp:`import guidance
from guidance import models
lm = models.OpenAI("gpt-4o")`},{nazwa:`haystack`,pip:`pip install haystack-ai`,kat:`ai`,tworca:`deepset`,krotki:`Framework RAG i NLP pipeline`,opis:`Haystack to framework do budowania aplikacji NLP i RAG. Komponenty (retriever, reader, generator) łączysz w pipeline. Obsługuje wiele źródeł danych i modeli LLM.`,zawiera:[`Pipeline — łańcuch komponentów`,`InMemoryDocumentStore — baza dokumentów`,`SentenceTransformersRanker — reranking`,`PromptNode — integracja z LLM`,`YAML/JSON konfiguracja pipeline`],imp:`from haystack.pipelines import Pipeline
from haystack.nodes import DensePassageRetriever`},{nazwa:`great-expectations`,pip:`pip install great-expectations`,kat:`data`,tworca:`Superconductive Inc.`,krotki:`Walidacja i dokumentacja danych`,opis:`Great Expectations to framework do testowania jakości danych — definiujesz oczekiwania (expectations) i sprawdzasz czy dane je spełniają. Generuje raporty HTML z wynikami.`,zawiera:[`Expectation Suite — zestaw oczekiwań`,`expect_column_values_to_not_be_null`,`expect_column_values_to_be_between`,`DataContext — kontekst projektu`,`Data Docs — dokumentacja w HTML`],imp:`import great_expectations as gx
context = gx.get_context()`},{nazwa:`pandera`,pip:`pip install pandera`,kat:`data`,tworca:`Niels Bantilan`,krotki:`Walidacja pandas DataFrame`,opis:`pandera umożliwia definiowanie schematu dla pandas DataFrame i walidację danych przy użyciu deklaratywnego API. Dekoratorami sprawdza typy kolumn, zakresy wartości i wzorce.`,zawiera:[`DataFrameSchema — schemat dla DataFrame`,`Column(pa.Int, nullable=False) — definicja kolumny`,`@pa.check_input, @pa.check_output — dekoratory`,`coerce=True — automatyczna konwersja typów`,`Integracja z pydantic`],imp:`import pandera as pa
schema = pa.DataFrameSchema({"kolumna": pa.Column(pa.Int, pa.Check.ge(0))})`},{nazwa:`icecream`,pip:`pip install icecream`,kat:`utils`,tworca:`Ansgar Grunseid`,krotki:`Lepszy print do debugowania`,opis:`IceCream to ulepszony print() do debugowania. ic(zmienna) wypisuje nazwę zmiennej, jej wartość i linię kodu — dużo bardziej informatywny niż print("x =", x).`,zawiera:[`ic(zmienna) — wypisz z kontekstem`,`ic() — bez argumentów: pokaż linię kodu`,`ic.disable() — wyłącz wszystkie ic()`,`ic.configureOutput — własny format`,`Zamień print() na ic() do debugowania`],imp:`from icecream import ic
x = 42
ic(x)  # ic| x: 42`},{nazwa:`alive-progress`,pip:`pip install alive-progress`,kat:`utils`,tworca:`rsalmei`,krotki:`Animowany pasek postępu`,opis:`alive-progress to animowany, nowoczesny pasek postępu z ETA, prędkością przetwarzania i dziesiątkami stylów animacji. Bardziej atrakcyjny wizualnie niż tqdm.`,zawiera:[`with alive_bar(total) as bar — kontekst`,`bar() — aktualizacja paska`,`title= — tytuł paska`,`Dziesiątki stylów animacji`,`Automatyczne ETA i throughput`],imp:`from alive_progress import alive_bar
with alive_bar(100, title="Przetwarzam") as bar:
    for item in dane:
        process(item)
        bar()`},{nazwa:`nox`,pip:`pip install nox`,kat:`devtools`,tworca:`Thea Flowers`,krotki:`Automatyzacja testów i zadań`,opis:`nox to narzędzie do automatyzacji — uruchamia testy, lintery i inne zadania w izolowanych środowiskach venv. Prostszy od tox, konfiguracja w czystym Pythonie (noxfile.py).`,zawiera:[`noxfile.py — konfiguracja w Pythonie`,`@nox.session — definicja sesji`,`session.install, run — instalacja i uruchamianie`,`nox -s lint — uruchomienie sesji`,`Testowanie na wielu wersjach Pythona`],imp:`import nox

@nox.session
def tests(session):
    session.install("-r", "requirements.txt")
    session.run("pytest")`},{nazwa:`tox`,pip:`pip install tox`,kat:`devtools`,tworca:`Holger Krekel`,krotki:`Testowanie na wielu Pythonach`,opis:`tox uruchamia testy na wielu wersjach Pythona w izolowanych środowiskach. Standard dla bibliotek publicznych — gwarantuje że kod działa na Python 3.9, 3.10, 3.11, 3.12.`,zawiera:[`tox.ini lub pyproject.toml — konfiguracja`,`envlist = py39,py310,py311 — wersje Pythona`,`commands = pytest — komenda testów`,`tox -e py311 — konkretna wersja`,`Integracja z GitHub Actions CI`],imp:`# tox.ini:
[tox]
envlist = py39,py310,py311
[testenv]
deps = pytest
commands = pytest`},{nazwa:`pyproject-toml`,pip:`wbudowana (PEP 517/518)`,kat:`devtools`,tworca:`Python Packaging Authority`,krotki:`Konfiguracja projektu Python`,opis:`pyproject.toml to standardowy plik konfiguracyjny dla projektów Python (PEP 517/518). Zastępuje setup.py, setup.cfg i wiele innych plików. Zawiera metadane pakietu, zależności i konfigurację narzędzi.`,zawiera:[`[project] — metadane pakietu`,`dependencies — zależności`,`[tool.pytest.ini_options] — konfiguracja pytest`,`[tool.ruff] — konfiguracja Ruff`,`[tool.mypy] — konfiguracja mypy`],imp:`# pyproject.toml
[project]
name = "moja-app"
version = "0.1.0"
dependencies = ["fastapi", "uvicorn"]`},{nazwa:`uv`,pip:`pip install uv`,kat:`devtools`,tworca:`Astral`,krotki:`Ultra-szybki package manager`,opis:`uv to niezwykle szybki package manager Python napisany w Rust (od twórców Ruff). Zastępuje pip, pip-tools i virtualenv — działa 10-100x szybciej. Staje się nowym standardem.`,zawiera:[`uv pip install — szybszy od pip`,`uv venv — tworzenie venv`,`uv pip compile — jak pip-compile`,`uv pip sync — synchronizacja środowiska`,`uv run skrypt.py — uruchamianie bez aktywacji venv`],imp:`# CLI: uv pip install fastapi uvicorn
# uv venv && source .venv/bin/activate
# uv pip compile requirements.in -o requirements.txt`},{nazwa:`pypdf`,pip:`pip install pypdf`,kat:`data`,tworca:`Matthias Büchler`,krotki:`Czytanie i edycja PDF`,opis:`pypdf (następnik PyPDF2) pozwala czytać, mergować, splitować i modyfikować pliki PDF w Pythonie. Bez zewnętrznych zależności — czysty Python.`,zawiera:[`PdfReader — odczyt PDF`,`reader.pages[0].extract_text() — tekst ze strony`,`PdfWriter — zapis i modyfikacja`,`merge_page — łączenie stron`,`PdfMerger — scalanie plików PDF`],imp:`from pypdf import PdfReader
reader = PdfReader("dokument.pdf")
text = reader.pages[0].extract_text()`},{nazwa:`pdfplumber`,pip:`pip install pdfplumber`,kat:`data`,tworca:`Jeremy Singer-Vine`,krotki:`Ekstrakcja danych z PDF`,opis:`pdfplumber to biblioteka do wyciągania tekstu i tabel z PDF. Lepsza od pypdf przy złożonych układach — obsługuje tabele, informacje o pozycji tekstu i renderowanie stron do obrazów.`,zawiera:[`pdfplumber.open("plik.pdf") — otwieranie`,`page.extract_text() — tekst ze strony`,`page.extract_table() — tabela`,`page.to_image() — renderowanie strony`,`Informacje o pozycji i stylu tekstu`],imp:`import pdfplumber
with pdfplumber.open("raport.pdf") as pdf:
    for page in pdf.pages:
        print(page.extract_text())`},{nazwa:`pygments`,pip:`pip install pygments`,kat:`utils`,tworca:`Georg Brandl`,krotki:`Podświetlanie składni`,opis:`Pygments to biblioteka do podświetlania składni kodu — obsługuje ponad 500 języków i generuje HTML, ANSI, LaTeX i inne formaty. Używana przez Sphinx, MkDocs, IPython i wiele innych.`,zawiera:[`highlight(code, lexer, formatter) — główna funkcja`,`get_lexer_by_name("python") — lexer języka`,`HtmlFormatter — output HTML z CSS`,`TerminalFormatter — kolorowy terminal`,`Obsługa 500+ języków programowania`],imp:`from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter
html = highlight(code, PythonLexer(), HtmlFormatter())`},{nazwa:`jedi`,pip:`pip install jedi`,kat:`devtools`,tworca:`David Halter`,krotki:`Autouzupełnianie Python`,opis:`Jedi to biblioteka do analizy statycznej kodu Python z funkcjami IDE — autouzupełnianie, przejście do definicji, znajdowanie referencji, refaktoryzacja. Używana przez vim, emacs, Jupyter i inne edytory.`,zawiera:[`jedi.Script — interfejs do analizy kodu`,`completions() — lista uzupełnień`,`goto() — definicja symbolu`,`infer() — typ wyrażenia`,`get_references() — wszystkie użycia`],imp:`import jedi
script = jedi.Script("import os
os.path.")
completions = script.complete(2, len("os.path."))`},{nazwa:`pyzmq`,pip:`pip install pyzmq`,kat:`utils`,tworca:`Brian Granger / ØMQ community`,krotki:`Komunikacja asynchroniczna (ZeroMQ)`,opis:`pyzmq to Python binding dla ZeroMQ — wysokowydajnej biblioteki do asynchronicznej komunikacji między procesami i przez sieć. Używana w Jupyter (kernels), systemach rozproszonych i message passing.`,zawiera:[`zmq.Context() — kontekst ZeroMQ`,`socket.bind, connect — połączenie`,`PUB/SUB — wzorzec publikuj-subskrybuj`,`REQ/REP — request-reply`,`PUSH/PULL — pipeline`],imp:`import zmq
ctx = zmq.Context()
socket = ctx.socket(zmq.PUB)`},{nazwa:`trio`,pip:`pip install trio`,kat:`utils`,tworca:`Nathaniel J. Smith`,krotki:`Structured concurrency (async)`,opis:`Trio to framework async z "structured concurrency" — podejście gdzie zadania asynchroniczne mają jasną hierarchię i gwarantowane sprzątanie. Bezpieczniejszy model niż asyncio dla złożonych aplikacji.`,zawiera:[`trio.run(main) — uruchomienie trio`,`async with trio.open_nursery() as n — nursery`,`n.start_soon(coro) — uruchamianie zadań`,`trio.sleep — async sleep`,`Gwarantowane zakończenie zadań podrzędnych`],imp:`import trio

async def main():
    async with trio.open_nursery() as n:
        n.start_soon(task1)
        n.start_soon(task2)

trio.run(main)`},{nazwa:`anyio`,pip:`pip install anyio`,kat:`utils`,tworca:`Alex Grönholm`,krotki:`Kompatybilność asyncio / trio`,opis:`AnyIO to warstwa abstrakcji nad asyncio i trio — kod napisany z anyio działa na obu bibliotekach bez zmian. Używana przez Starlette (FastAPI) i httpx jako backend async.`,zawiera:[`anyio.run(main) — uruchomienie (asyncio lub trio)`,`anyio.sleep — przenośny async sleep`,`anyio.create_task_group — przenośne zadania`,`CancelScope — zarządzanie anulowaniem`,`Testowanie z pytest-anyio`],imp:`import anyio

async def main():
    async with anyio.create_task_group() as tg:
        tg.start_soon(task)`},{nazwa:`networkx`,pip:`pip install networkx`,kat:`data`,tworca:`Aric Hagberg / NetworkX team`,krotki:`Grafy i sieci`,opis:`NetworkX to biblioteka do tworzenia, analizy i wizualizacji grafów i sieci. Algorytmy teorii grafów: najkrótsze ścieżki, spanning trees, wykrywanie społeczności, centrality.`,zawiera:[`G = nx.Graph() — tworzenie grafu`,`G.add_node, add_edge — budowanie grafu`,`nx.shortest_path(G, src, dst) — najkrótsza ścieżka`,`nx.pagerank — PageRank (jak Google)`,`nx.draw — wizualizacja przez matplotlib`],imp:`import networkx as nx
G = nx.Graph()
G.add_edges_from([(1,2), (2,3), (3,1)])`},{nazwa:`sympy`,pip:`pip install sympy`,kat:`data`,tworca:`SymPy Development Team`,krotki:`Symboliczna matematyka`,opis:`SymPy to biblioteka matematyki symbolicznej dla Pythona — obliczenia algebraiczne, całkowanie, różniczkowanie, równania różniczkowe. Jak Wolfram Alpha ale w kodzie Python.`,zawiera:[`symbols("x y") — zmienne symboliczne`,`integrate(x**2, x) — całka symboliczna`,`diff(sin(x), x) — pochodna`,`solve(x**2 - 4, x) — równanie`,`latex(wyrażenie) — LaTeX z wyrażenia`],imp:`from sympy import symbols, integrate, diff, sin
x = symbols("x")
print(integrate(x**2, x))  # x**3/3`},{nazwa:`pyserial`,pip:`pip install pyserial`,kat:`utils`,tworca:`Chris Liechti`,krotki:`Komunikacja RS-232/serial`,opis:`pyserial obsługuje komunikację szeregową (RS-232, USB-Serial) — odczyt i zapis danych do urządzeń przez port szeregowy. Używany w IoT, Arduino, Raspberry Pi i automatyzacji hardware.`,zawiera:[`serial.Serial(port, baudrate) — otwieranie portu`,`ser.write(b"dane") — wysyłanie`,`ser.readline() — odczyt linii`,`ser.read(n) — odczyt N bajtów`,`Dostępne porty: serial.tools.list_ports`],imp:`import serial
ser = serial.Serial("/dev/ttyUSB0", 9600, timeout=1)`},{nazwa:`pynput`,pip:`pip install pynput`,kat:`utils`,tworca:`Moses Palmér`,krotki:`Kontrola klawiatury i myszy`,opis:`pynput kontroluje i monitoruje klawiaturę i mysz — jak PyAutoGUI ale z pełnym listenerem zdarzeń. Idealny do nagrywania makr, hotkeys globalnych i monitorowania aktywności.`,zawiera:[`keyboard.Controller — klawiatura`,`mouse.Controller — mysz`,`keyboard.Listener — nasłuchiwanie klawiszy`,`mouse.Listener — nasłuchiwanie myszy`,`Globalne hotkeys: HotKey`],imp:`from pynput.keyboard import Key, Controller
keyboard = Controller()
keyboard.press(Key.space)
keyboard.release(Key.space)`},{nazwa:`plyer`,pip:`pip install plyer`,kat:`utils`,tworca:`Kivy Organization`,krotki:`Powiadomienia systemowe`,opis:`plyer udostępnia przenośne API do funkcji systemowych — powiadomienia toast, wibracje, GPS, aparaty, systemowy tray. Jeden kod działa na Windows, Mac, Linux, Android i iOS.`,zawiera:[`notification.notify(title, message) — powiadomienie toast`,`notification.notify(app_icon=...) — z ikoną`,`Obsługa Windows, Mac, Linux`,`Timeout powiadomienia`,`Integracja z Kivy (mobile apps)`],imp:`from plyer import notification
notification.notify(
    title="Gotowe!",
    message="Scraping zakończony",
    timeout=5
)`},{nazwa:`keyboard`,pip:`pip install keyboard`,kat:`utils`,tworca:`BoppreH`,krotki:`Globalne skróty klawiszowe`,opis:`keyboard pozwala rejestrować globalne hotkeys, symulować naciśnięcia klawiszy i nagrywać/odtwarzać sekwencje klawiszy. Prostsze API niż pynput dla podstawowej automatyzacji klawiatury.`,zawiera:[`keyboard.add_hotkey("ctrl+c", fn) — global hotkey`,`keyboard.send("enter") — symulacja klawisza`,`keyboard.write("tekst") — pisanie`,`keyboard.record() — nagrywanie`,`keyboard.play() — odtwarzanie`],imp:`import keyboard
keyboard.add_hotkey("ctrl+alt+h", lambda: print("Hotkey!"))
keyboard.wait()`},{nazwa:`mouse`,pip:`pip install mouse`,kat:`utils`,tworca:`BoppreH`,krotki:`Kontrola myszy`,opis:`mouse to biblioteka do kontroli i monitorowania myszy — symulowanie kliknięć, ruchu, przewijania i nasłuchiwanie zdarzeń. Uzupełnienie biblioteki keyboard od tego samego autora.`,zawiera:[`mouse.click("left") — kliknięcie`,`mouse.move(x, y) — ruch myszy`,`mouse.scroll(0, 3) — przewijanie`,`mouse.on_click(fn) — listener`,`mouse.get_position() — aktualna pozycja`],imp:`import mouse
mouse.move(100, 100)
mouse.click("left")`},{nazwa:`pygetwindow`,pip:`pip install PyGetWindow`,kat:`utils`,tworca:`Al Sweigart`,krotki:`Zarządzanie oknami`,opis:`pygetwindow pozwala wyszukiwać, przenosić, zmieniać rozmiar i aktywować okna aplikacji z poziomu Pythona. Używane razem z PyAutoGUI do automatyzacji GUI na poziomie okien.`,zawiera:[`getWindowsWithTitle("Chrome") — znajdź okno`,`win.activate() — przenieś na wierzch`,`win.move(x, y) — zmień pozycję`,`win.resize(w, h) — zmień rozmiar`,`win.minimize, maximize, restore`],imp:`import pygetwindow as gw
win = gw.getWindowsWithTitle("Chrome")[0]
win.activate()`},{nazwa:`python-docx`,pip:`pip install python-docx`,kat:`data`,tworca:`Steve Canny`,krotki:`Pliki Word (.docx)`,opis:`python-docx tworzy i modyfikuje dokumenty Microsoft Word (.docx). Dodawanie paragrafów, tabel, obrazów, nagłówków i formatowania — bez potrzeby instalacji Microsoft Office.`,zawiera:[`Document() — nowy dokument`,`doc.add_paragraph("tekst") — paragraf`,`doc.add_heading("Tytuł", level=1) — nagłówek`,`doc.add_table(rows, cols) — tabela`,`doc.save("plik.docx") — zapis`],imp:`from docx import Document
doc = Document()
doc.add_heading("Raport", 0)
doc.add_paragraph("Treść raportu.")
doc.save("raport.docx")`},{nazwa:`python-pptx`,pip:`pip install python-pptx`,kat:`data`,tworca:`Steve Canny`,krotki:`Pliki PowerPoint (.pptx)`,opis:`python-pptx tworzy i modyfikuje prezentacje PowerPoint. Dodawanie slajdów, tekstu, tabel, wykresów i obrazów — automatyczne generowanie raportów jako prezentacje.`,zawiera:[`Presentation() — nowa prezentacja`,`prs.slides.add_slide(layout) — nowy slajd`,`slide.shapes.add_textbox — pole tekstowe`,`slide.shapes.add_picture — obraz`,`prs.save("plik.pptx") — zapis`],imp:`from pptx import Presentation
from pptx.util import Inches
prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[0])`},{nazwa:`Pillow`,pip:`pip install Pillow`,kat:`data`,tworca:`Alex Clark / PIL contributors`,krotki:`Manipulacja obrazów`,opis:`Pillow (PIL Fork) to standardowa biblioteka do pracy z obrazami — otwieranie, edycja, konwersja formatów, filtry, rysowanie. Obsługuje JPEG, PNG, GIF, WebP, TIFF i dziesiątki innych.`,zawiera:[`Image.open("foto.jpg") — wczytanie`,`image.resize((800, 600)) — zmiana rozmiaru`,`image.crop((x1,y1,x2,y2)) — przycinanie`,`ImageDraw.Draw — rysowanie kształtów i tekstu`,`image.filter(ImageFilter.BLUR) — filtry`],imp:`from PIL import Image, ImageDraw, ImageFont
img = Image.open("foto.jpg").resize((800, 600))`},{nazwa:`cairosvg`,pip:`pip install cairosvg`,kat:`data`,tworca:`Kozea community`,krotki:`Konwersja SVG → PNG/PDF`,opis:`CairoSVG konwertuje pliki SVG do PNG, PDF i innych formatów przez bibliotekę Cairo. Idealne do generowania obrazów z wykresów wektorowych i eksportu SVG z Matplotlib/Plotly.`,zawiera:[`cairosvg.svg2png — SVG → PNG`,`cairosvg.svg2pdf — SVG → PDF`,`cairosvg.svg2ps — SVG → PostScript`,`scale — skalowanie wyjścia`,`write_to — zapis do pliku lub bytes`],imp:`import cairosvg
cairosvg.svg2png(url="wykres.svg", write_to="wykres.png", scale=2)`},{nazwa:`Wand`,pip:`pip install Wand`,kat:`data`,tworca:`Hong Minhee`,krotki:`ImageMagick binding`,opis:`Wand to Python binding dla ImageMagick — profesjonalnego narzędzia do przetwarzania obrazów. Obsługuje ponad 200 formatów i oferuje operacje niedostępne w Pillow: GIF, PDF konwersja, zaawansowane filtry.`,zawiera:[`Image(filename="foto.jpg") — wczytanie`,`image.resize(800, 600) — zmiana rozmiaru`,`image.transform_colorspace("cmyk") — przestrzeń kolorów`,`image.composite — nakładanie obrazów`,`image.sequence — animacje GIF`],imp:`from wand.image import Image
with Image(filename="dokument.pdf") as img:
    img.save(filename="strona.png")`},{nazwa:`pillow-heif`,pip:`pip install pillow-heif`,kat:`data`,tworca:`bigcat38`,krotki:`Obsługa HEIC/HEIF (iPhone)`,opis:`pillow-heif dodaje obsługę formatu HEIC/HEIF (używanego przez iPhone) do Pillow. Pozwala otwierać zdjęcia z iPhone bezpośrednio w Pythonie i konwertować do JPEG/PNG.`,zawiera:[`register_heif_opener() — rejestracja w Pillow`,`Image.open("foto.heic") — po rejestracji`,`Konwersja HEIC → JPEG/PNG`,`Obsługa EXIF metadata`,`Wsparcie dla animacji HEIF`],imp:`from pillow_heif import register_heif_opener
register_heif_opener()
from PIL import Image
img = Image.open("foto.heic")`},{nazwa:`pint`,pip:`pip install pint`,kat:`utils`,tworca:`Hernan E. Grecco`,krotki:`Jednostki miary`,opis:`pint to biblioteka do operacji na fizycznych jednostkach miary. Zapobiega błędom konwersji — np. dodawaniu kilometrów do metrów. Automatyczna konwersja i sprawdzanie kompatybilności jednostek.`,zawiera:[`ureg = UnitRegistry() — rejestr jednostek`,`5 * ureg.meter — liczba z jednostką`,`quantity.to("km") — konwersja`,`Arytmetyka: m/s * s = m`,`@ureg.wraps — dekorator dla funkcji z jednostkami`],imp:`from pint import UnitRegistry
ureg = UnitRegistry()
v = 60 * ureg.km / ureg.hour
print(v.to("m/s"))  # 16.67 m/s`},{nazwa:`boltons`,pip:`pip install boltons`,kat:`utils`,tworca:`Mahmoud Hashemi`,krotki:`Rozszerzona stdlib`,opis:`boltons to kolekcja ~230 narzędzi które mogłyby być w standardowej bibliotece — operacje na listach, słownikach, plikach, datach, iteratorach. Każdy moduł możesz importować niezależnie.`,zawiera:[`iterutils.chunked — podział na kawałki`,`strutils.slugify — bezpieczny URL slug`,`fileutils.atomic_save — bezpieczny zapis`,`timeutils.relative_time — "3 hours ago"`,`mathutils.clamp — ograniczenie do zakresu`],imp:`from boltons.iterutils import chunked
for chunk in chunked(lista, 10):
    process(chunk)`},{nazwa:`glom`,pip:`pip install glom`,kat:`utils`,tworca:`Mahmoud Hashemi`,krotki:`Ekstrakcja danych z zagnieżdżonych struktur`,opis:`glom to biblioteka do deklaratywnej ekstrakcji danych z głęboko zagnieżdżonych struktur Python (dict, list, obiekty). Alternatywa dla wielokrotnych .get() i try/except przy opcjonalnych polach.`,zawiera:[`glom(data, "a.b.c") — wyciągnięcie pola`,`Coalesce — pierwsza istniejąca wartość`,`T.attribute — dostęp do atrybutu obiektu`,`Iter — transformacja listy`,`glom(data, (spec, ), default=None)`],imp:`from glom import glom, Coalesce
val = glom(data, Coalesce("user.address.city", "user.city", default="Unknown"))`}],I={all:`Wszystkie`,stdlib:`🐍 Stdlib`,web:`🌐 Web`,data:`📊 Data`,ai:`🤖 AI / ML`,db:`🗄️ Bazy danych`,utils:`🔧 Narzędzia`,scraping:`🕷️ Scraping`,testing:`🧪 Testy`,devtools:`⚙️ Dev Tools`};function bt(e){e.innerHTML=`<div style="margin-bottom:12px;"><input id="archSearch" placeholder="🔍 Szukaj biblioteki..." style="width:100%;padding:8px 12px;background:#13151f;border:1px solid #2d3148;border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;"></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;" id="archKats">`+Object.entries(I).map(([e,t])=>{let n=e===`all`;return`<button onclick="filtrujArch('`+e+`')" class="arch-kat`+(n?` arch-kat-active`:``)+`" data-kat="`+e+`" style="padding:4px 10px;border-radius:6px;border:1px solid #2d3148;background:`+(n?`#7c6af7`:`transparent`)+`;color:`+(n?`#fff`:`#94a3b8`)+`;font-size:12px;cursor:pointer;">`+t+`</button>`}).join(``)+`</div><div id="archGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"></div><div id="archCount" style="font-size:11px;color:#4a5568;margin-top:10px;text-align:right;"></div>`;let t=`all`,n=``;function r(){let e=F.filter(e=>(t===`all`||e.kat===t)&&(!n||e.nazwa.toLowerCase().includes(n)||e.opis.toLowerCase().includes(n)));document.getElementById(`archGrid`).innerHTML=e.map(e=>`<div onclick="pokazModal('`+e.nazwa+`')" style="background:#13151f;border:1px solid #2d3148;border-radius:10px;padding:10px 12px;cursor:pointer;transition:border-color 0.15s;" onmouseenter="this.style.borderColor='#7c6af7'" onmouseleave="this.style.borderColor='#2d3148'"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:13px;font-weight:600;color:#e2e8f0">`+e.nazwa+`</span><span style="font-size:10px;background:#1e2235;color:#7c6af7;padding:1px 7px;border-radius:10px">`+I[e.kat]+`</span></div><div style="font-size:11px;color:#94a3b8;line-height:1.4;margin-bottom:6px">`+e.krotki+`</div><div style="font-family:monospace;font-size:10px;color:#98c379;background:#0f1117;padding:3px 7px;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">`+e.pip+`</div></div>`).join(``),document.getElementById(`archCount`).textContent=e.length+` z `+F.length+` bibliotek`}window.filtrujArch=function(e){t=e,document.querySelectorAll(`.arch-kat`).forEach(t=>{t.style.background=t.dataset.kat===e?`#7c6af7`:`transparent`,t.style.color=t.dataset.kat===e?`#fff`:`#94a3b8`}),r()},document.getElementById(`archSearch`).addEventListener(`input`,e=>{n=e.target.value.toLowerCase().trim(),r()}),r()}function xt(e){let t=F.find(t=>t.nazwa===e);t&&(document.getElementById(`archModalNazwa`).textContent=t.nazwa,document.getElementById(`archModalKat`).textContent=I[t.kat],document.getElementById(`archModalTworca`).textContent=t.tworca,document.getElementById(`archModalOpis`).textContent=t.opis,document.getElementById(`archModalZawiera`).innerHTML=t.zawiera.map(e=>`<li style="margin-bottom:5px;color:#b0b8d0">`+e+`</li>`).join(``),document.getElementById(`archModalImp`).textContent=t.imp,document.getElementById(`archModalPip`).textContent=t.pip,document.getElementById(`archModal`).style.display=`flex`)}function St(){document.getElementById(`archModal`).style.display=`none`}document.addEventListener(`keydown`,e=>{e.key===`Escape`&&St()});var L=()=>{},R=()=>{};function Ct(e){L=e.saveHistoria,R=e.refreshHistoriaIfVisible}function wt(e,t){Tt(e,t),Et(e,t),Dt(e,t),Ot(e,t)}function z(e){return t.findIndex(t=>t.nazwa===e)}function Tt(e,r){fetch(`http://localhost:8000/translator/explain-lines`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(i=>{n.data=i.lines,n.snapshot=e,n.cache[e]=i.lines;let a=z(r);a>=0&&(t[a].translatorData=i.lines,L(),R())}).catch(()=>{})}function Et(e,n){fetch(`http://localhost:8000/vivisekcja/analyze`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(i=>{r.cache=i.markdown,r.snapshot=e;let a=z(n);if(a>=0){t[a].vivisekcjaData=i.markdown;let e=i.markdown.split(`
`).find(e=>e.trim()&&!e.startsWith(`#`))||``;e&&(t[a].opis=e.replace(/\*\*/g,``).trim()),L(),R()}}).catch(()=>{})}function Dt(e,n){fetch(`http://localhost:8000/dead-code/detect`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(r=>{i.cache=r.dead,i.snapshot=e;let a=document.querySelector(`.dead-code-badge`);a&&r.dead.length>0&&(a.textContent=r.dead.length,a.style.display=``);let o=z(n);o>=0&&(t[o].deadCodeData=r.dead,t[o].problemy=r.dead.map(e=>`💀 `+e.label+` (linia `+e.lines[0]+`)`),t[o].bledy=r.dead.length,L(),R())}).catch(()=>{})}function Ot(e,n){fetch(`http://localhost:8000/bad-patterns/detect`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}).then(e=>e.json()).then(r=>{a.cache=r.issues,a.snapshot=e;let i=document.querySelector(`.bad-patterns-badge`);i&&r.issues.length>0&&(i.textContent=r.issues.length,i.style.display=``);let o=z(n);if(o>=0){let e=r.issues.filter(e=>e.severity===`critical`||e.severity===`high`),n=r.issues.filter(e=>e.severity===`medium`||e.severity===`low`);t[o].badPatternsData=r.issues,t[o].problemy=(t[o].problemy||[]).concat(e.map(e=>`⚠️ [`+e.category+`] `+e.label+` (linia `+e.lines[0]+`)`)),t[o].sugestie=n.map(e=>`[`+e.category+`] `+e.label+` (linia `+e.lines[0]+`)`),t[o].ostrzezenia=n.length,L(),R()}}).catch(()=>{})}var kt=[{name:`React`,icon:`⚛️`,color:`#61dafb`,lang:`JavaScript`,cat:`Frontend`,desc:`Biblioteka UI od Meta`},{name:`Vue.js`,icon:`💚`,color:`#42b883`,lang:`JavaScript`,cat:`Frontend`,desc:`Progresywny framework UI`},{name:`Angular`,icon:`🔺`,color:`#dd0031`,lang:`TypeScript`,cat:`Frontend`,desc:`Framework od Google`},{name:`Svelte`,icon:`🔥`,color:`#ff3e00`,lang:`JavaScript`,cat:`Frontend`,desc:`Kompilowany, zero runtime`},{name:`Solid.js`,icon:`⚡`,color:`#2c4f7c`,lang:`JavaScript`,cat:`Frontend`,desc:`Reaktywny bez Virtual DOM`},{name:`Qwik`,icon:`🦋`,color:`#18b6f6`,lang:`TypeScript`,cat:`Frontend`,desc:`Resumowalny framework UI`},{name:`Lit`,icon:`🕯️`,color:`#324fff`,lang:`JavaScript`,cat:`Frontend`,desc:`Web Components od Google`},{name:`Alpine.js`,icon:`🏔️`,color:`#8bc0d0`,lang:`JavaScript`,cat:`Frontend`,desc:`Lekki reaktywny JS`},{name:`Preact`,icon:`⚛️`,color:`#673ab8`,lang:`JavaScript`,cat:`Frontend`,desc:`React 3KB`},{name:`Stencil`,icon:`🔩`,color:`#4d7fff`,lang:`TypeScript`,cat:`Frontend`,desc:`Web Components compiler`},{name:`Next.js`,icon:`▲`,color:`#ffffff`,lang:`JavaScript`,cat:`Frontend`,desc:`Full-stack z React i SSR`},{name:`Nuxt`,icon:`💚`,color:`#00dc82`,lang:`JavaScript`,cat:`Frontend`,desc:`Full-stack z Vue`},{name:`SvelteKit`,icon:`🔥`,color:`#ff3e00`,lang:`JavaScript`,cat:`Frontend`,desc:`Full-stack z Svelte`},{name:`Remix`,icon:`💿`,color:`#e8f2ff`,lang:`JavaScript`,cat:`Frontend`,desc:`Webowy full-stack React`},{name:`Astro`,icon:`🚀`,color:`#ff5d01`,lang:`JavaScript`,cat:`Frontend`,desc:`Content-first, zero JS`},{name:`Gatsby`,icon:`💜`,color:`#663399`,lang:`JavaScript`,cat:`Frontend`,desc:`React SSG dla treści`},{name:`Tailwind CSS`,icon:`🌊`,color:`#38bdf8`,lang:`CSS`,cat:`Frontend`,desc:`Utility-first CSS`},{name:`Bootstrap`,icon:`🅱️`,color:`#7952b3`,lang:`CSS`,cat:`Frontend`,desc:`Najpopularniejszy CSS kit`},{name:`Bulma`,icon:`💡`,color:`#00d1b2`,lang:`CSS`,cat:`Frontend`,desc:`Flexbox CSS framework`},{name:`Shadcn/ui`,icon:`🎨`,color:`#09090b`,lang:`TypeScript`,cat:`Frontend`,desc:`Komponenty do kopiowania`},{name:`Chakra UI`,icon:`⚡`,color:`#319795`,lang:`TypeScript`,cat:`Frontend`,desc:`Dostępne komponenty React`},{name:`Ant Design`,icon:`🐜`,color:`#1677ff`,lang:`TypeScript`,cat:`Frontend`,desc:`Design system od Alibaby`},{name:`Vite`,icon:`⚡`,color:`#646cff`,lang:`JavaScript`,cat:`Narzędzia`,desc:`Superszybki bundler`},{name:`Webpack`,icon:`📦`,color:`#8dd6f9`,lang:`JavaScript`,cat:`Narzędzia`,desc:`Najpopularniejszy bundler`},{name:`Rollup`,icon:`🌀`,color:`#ff3333`,lang:`JavaScript`,cat:`Narzędzia`,desc:`Bundler dla bibliotek`},{name:`esbuild`,icon:`⚡`,color:`#ffcf00`,lang:`Go`,cat:`Narzędzia`,desc:`Ekstremalnie szybki bundler`},{name:`Turbopack`,icon:`🌀`,color:`#ffffff`,lang:`Rust`,cat:`Narzędzia`,desc:`Następca Webpacka`},{name:`Bun`,icon:`🍞`,color:`#fbf0df`,lang:`Zig`,cat:`Narzędzia`,desc:`Runtime + bundler + PM`},{name:`requests`,icon:`🌐`,color:`#2C3E50`,lang:`Python`,cat:`Backend`,desc:`HTTP dla ludzi`},{name:`asyncio`,icon:`⚡`,color:`#5865F2`,lang:`Python`,cat:`Backend`,desc:`Asynchroniczny Python`},{name:`BeautifulSoup`,icon:`🍲`,color:`#3CB371`,lang:`Python`,cat:`Backend`,desc:`Parsowanie HTML i XML`},{name:`PyAutoGUI`,icon:`🖱️`,color:`#FF6B6B`,lang:`Python`,cat:`Backend`,desc:`Automatyzacja UI i GUI`},{name:`Django`,icon:`🎸`,color:`#44b78b`,lang:`Python`,cat:`Backend`,desc:`Bateryjny framework webowy`},{name:`Flask`,icon:`🌶️`,color:`#a0a0a0`,lang:`Python`,cat:`Backend`,desc:`Mikro-framework webowy`},{name:`FastAPI`,icon:`🚀`,color:`#009688`,lang:`Python`,cat:`Backend`,desc:`Nowoczesne API z type hints`},{name:`Tornado`,icon:`🌪️`,color:`#336699`,lang:`Python`,cat:`Backend`,desc:`Async serwer webowy`},{name:`Starlette`,icon:`⭐`,color:`#009688`,lang:`Python`,cat:`Backend`,desc:`ASGI micro-framework`},{name:`Litestar`,icon:`💫`,color:`#edb641`,lang:`Python`,cat:`Backend`,desc:`Wydajny ASGI framework`},{name:`Celery`,icon:`🥬`,color:`#a9cc54`,lang:`Python`,cat:`Backend`,desc:`Task queue dla Pythona`},{name:`Express.js`,icon:`🟨`,color:`#f7df1e`,lang:`JavaScript`,cat:`Backend`,desc:`Minimalny framework Node`},{name:`Fastify`,icon:`⚡`,color:`#ffffff`,lang:`JavaScript`,cat:`Backend`,desc:`Szybki framework Node`},{name:`NestJS`,icon:`🐱`,color:`#e0234e`,lang:`TypeScript`,cat:`Backend`,desc:`Angular-style backend`},{name:`Koa`,icon:`🍃`,color:`#33333d`,lang:`JavaScript`,cat:`Backend`,desc:`Następnik Express od autora`},{name:`Hono`,icon:`🔥`,color:`#e36002`,lang:`TypeScript`,cat:`Backend`,desc:`Ultra-szybki web framework`},{name:`Elysia`,icon:`🦊`,color:`#a855f7`,lang:`TypeScript`,cat:`Backend`,desc:`Ergonomiczny Bun framework`},{name:`Strapi`,icon:`🎯`,color:`#8e75ff`,lang:`JavaScript`,cat:`Backend`,desc:`Open-source headless CMS`},{name:`Spring Boot`,icon:`🌿`,color:`#6db33f`,lang:`Java`,cat:`Backend`,desc:`Enterprise framework Java`},{name:`Laravel`,icon:`🔴`,color:`#ff2d20`,lang:`PHP`,cat:`Backend`,desc:`Elegancki PHP framework`},{name:`Symfony`,icon:`♾️`,color:`#1a171b`,lang:`PHP`,cat:`Backend`,desc:`Dojrzały PHP framework`},{name:`Rails`,icon:`💎`,color:`#cc0000`,lang:`Ruby`,cat:`Backend`,desc:`Convention over config`},{name:`ASP.NET Core`,icon:`🔷`,color:`#512bd4`,lang:`C#`,cat:`Backend`,desc:`Microsoft web framework`},{name:`Phoenix`,icon:`🦅`,color:`#fd4f00`,lang:`Elixir`,cat:`Backend`,desc:`Real-time Elixir framework`},{name:`Gin`,icon:`🍸`,color:`#00acd7`,lang:`Go`,cat:`Backend`,desc:`Szybki HTTP framework Go`},{name:`Echo`,icon:`🔊`,color:`#00acd7`,lang:`Go`,cat:`Backend`,desc:`Minimalny Go web framework`},{name:`Fiber`,icon:`🧵`,color:`#00acd7`,lang:`Go`,cat:`Backend`,desc:`Express-style dla Go`},{name:`Actix-web`,icon:`⚙️`,color:`#ef3b2d`,lang:`Rust`,cat:`Backend`,desc:`Najszybszy web framework`},{name:`Axum`,icon:`⚓`,color:`#dea584`,lang:`Rust`,cat:`Backend`,desc:`Tokio-based web framework`},{name:`SQLAlchemy`,icon:`🗄️`,color:`#d71f00`,lang:`Python`,cat:`Database`,desc:`ORM i SQL toolkit`},{name:`Prisma`,icon:`◈`,color:`#5a67d8`,lang:`TypeScript`,cat:`Database`,desc:`Type-safe ORM nowej ery`},{name:`TypeORM`,icon:`🔷`,color:`#e83524`,lang:`TypeScript`,cat:`Database`,desc:`ORM dla TypeScript/Node`},{name:`Sequelize`,icon:`🔗`,color:`#52b0e7`,lang:`JavaScript`,cat:`Database`,desc:`Promise-based Node ORM`},{name:`Mongoose`,icon:`🍃`,color:`#47a248`,lang:`JavaScript`,cat:`Database`,desc:`MongoDB ODM dla Node`},{name:`Drizzle`,icon:`💧`,color:`#c5f74f`,lang:`TypeScript`,cat:`Database`,desc:`Lekki type-safe ORM`},{name:`GORM`,icon:`🐱`,color:`#00acd7`,lang:`Go`,cat:`Database`,desc:`ORM dla Go`},{name:`PostgreSQL`,icon:`🐘`,color:`#336791`,lang:`SQL`,cat:`Database`,desc:`Zaawansowana baza relacyjna`},{name:`MySQL`,icon:`🐬`,color:`#4479a1`,lang:`SQL`,cat:`Database`,desc:`Najpopularniejsza relacyjna`},{name:`SQLite`,icon:`🗃️`,color:`#003b57`,lang:`SQL`,cat:`Database`,desc:`Wbudowana baza danych`},{name:`MongoDB`,icon:`🍃`,color:`#47a248`,lang:`NoSQL`,cat:`Database`,desc:`Dokumentowa baza danych`},{name:`Redis`,icon:`⚡`,color:`#dc382d`,lang:`In-Memory`,cat:`Database`,desc:`Cache i key-value store`},{name:`Elasticsearch`,icon:`🔍`,color:`#f04e98`,lang:`Java`,cat:`Database`,desc:`Silnik wyszukiwania`},{name:`Firebase`,icon:`🔥`,color:`#ffca28`,lang:`NoSQL`,cat:`Database`,desc:`BaaS od Google`},{name:`Supabase`,icon:`⚡`,color:`#3ecf8e`,lang:`PostgreSQL`,cat:`Database`,desc:`Open-source Firebase`},{name:`PlanetScale`,icon:`🪐`,color:`#ffffff`,lang:`MySQL`,cat:`Database`,desc:`Serverless MySQL`},{name:`ChromaDB`,icon:`🌈`,color:`#e91e63`,lang:`Python`,cat:`Database`,desc:`Wektorowa baza dla AI`},{name:`Pinecone`,icon:`🌲`,color:`#0099ff`,lang:`Python`,cat:`Database`,desc:`Managed vector database`},{name:`AWS`,icon:`☁️`,color:`#FF9900`,lang:`Multi`,cat:`Cloud`,desc:`Amazon Web Services — największa platforma cloud`},{name:`Azure`,icon:`🔷`,color:`#0078D4`,lang:`Multi`,cat:`Cloud`,desc:`Microsoft Cloud — enterprise i .NET`},{name:`GCP`,icon:`🌈`,color:`#4285F4`,lang:`Multi`,cat:`Cloud`,desc:`Google Cloud — ML/AI i Kubernetes`},{name:`DigitalOcean`,icon:`🌊`,color:`#0080FF`,lang:`Multi`,cat:`Cloud`,desc:`Prosty VPS dla developerów`},{name:`Hetzner`,icon:`🟠`,color:`#D50C2D`,lang:`Multi`,cat:`Cloud`,desc:`Najtańszy europejski cloud`},{name:`Git`,icon:`🌿`,color:`#F05033`,lang:`Shell`,cat:`DevOps`,desc:`Rozproszony system kontroli wersji`},{name:`Docker`,icon:`🐳`,color:`#2496ed`,lang:`YAML`,cat:`DevOps`,desc:`Konteneryzacja aplikacji`},{name:`Kubernetes`,icon:`☸️`,color:`#326ce5`,lang:`YAML`,cat:`DevOps`,desc:`Orkiestracja kontenerów`},{name:`Terraform`,icon:`🏗️`,color:`#7b42bc`,lang:`HCL`,cat:`DevOps`,desc:`Infrastruktura jako kod`},{name:`Ansible`,icon:`🔴`,color:`#ee0000`,lang:`YAML`,cat:`DevOps`,desc:`Automatyzacja konfiguracji`},{name:`Helm`,icon:`⛵`,color:`#0f1689`,lang:`YAML`,cat:`DevOps`,desc:`Package manager dla K8s`},{name:`CI/CD`,icon:`🔁`,color:`#F05033`,lang:`YAML`,cat:`DevOps`,desc:`Ciągła integracja i wdrażanie`},{name:`WSL`,icon:`🐧`,color:`#E95420`,lang:`Shell`,cat:`DevOps`,desc:`Linux na Windows`},{name:`GitHub Actions`,icon:`⚙️`,color:`#2088ff`,lang:`YAML`,cat:`DevOps`,desc:`CI/CD w repozytorium`},{name:`GitLab CI`,icon:`🦊`,color:`#fc6d26`,lang:`YAML`,cat:`DevOps`,desc:`CI/CD GitLab`},{name:`Jenkins`,icon:`🤖`,color:`#d33833`,lang:`Groovy`,cat:`DevOps`,desc:`Klasyczny serwer CI`},{name:`ArgoCD`,icon:`🐙`,color:`#ef7b4d`,lang:`YAML`,cat:`DevOps`,desc:`GitOps dla Kubernetes`},{name:`Nginx`,icon:`🟩`,color:`#009900`,lang:`Config`,cat:`DevOps`,desc:`Serwer i reverse proxy`},{name:`Caddy`,icon:`🦆`,color:`#22b638`,lang:`Config`,cat:`DevOps`,desc:`Auto-HTTPS web server`},{name:`Prometheus`,icon:`📊`,color:`#e6522c`,lang:`PromQL`,cat:`DevOps`,desc:`Monitoring i alerty`},{name:`Grafana`,icon:`📈`,color:`#f46800`,lang:`Config`,cat:`DevOps`,desc:`Dashboardy metryk`},{name:`Kafka`,icon:`📨`,color:`#231f20`,lang:`Java`,cat:`DevOps`,desc:`Distributed event streaming`},{name:`Jest`,icon:`🃏`,color:`#c21325`,lang:`JavaScript`,cat:`Testing`,desc:`Najpopularniejszy test runner`},{name:`Vitest`,icon:`⚡`,color:`#646cff`,lang:`TypeScript`,cat:`Testing`,desc:`Vite-native test runner`},{name:`pytest`,icon:`🧪`,color:`#0A9EDC`,lang:`Python`,cat:`Testing`,desc:`Najpopularniejszy dla Python`},{name:`Playwright`,icon:`🎭`,color:`#2ead33`,lang:`TypeScript`,cat:`Testing`,desc:`E2E testing przeglądarek`},{name:`Cypress`,icon:`🌲`,color:`#69d3a7`,lang:`JavaScript`,cat:`Testing`,desc:`E2E testing dla web`},{name:`Selenium`,icon:`🔬`,color:`#43b02a`,lang:`Java`,cat:`Testing`,desc:`Klasyczna automatyzacja UI`},{name:`PyTorch`,icon:`🔥`,color:`#ee4c2c`,lang:`Python`,cat:`AI`,desc:`ML/research od Meta`},{name:`TensorFlow`,icon:`🧠`,color:`#ff6f00`,lang:`Python`,cat:`AI`,desc:`ML na masową skalę od Google`},{name:`Keras`,icon:`🔴`,color:`#d00000`,lang:`Python`,cat:`AI`,desc:`High-level API dla DL`},{name:`scikit-learn`,icon:`📊`,color:`#f89939`,lang:`Python`,cat:`AI`,desc:`Klasyczne ML, data science`},{name:`Hugging Face`,icon:`🤗`,color:`#ffd21e`,lang:`Python`,cat:`AI`,desc:`Centrum modeli i transformerów`},{name:`LangChain`,icon:`🔗`,color:`#1c3c3c`,lang:`Python`,cat:`AI`,desc:`Orkiestracja aplikacji LLM`},{name:`LlamaIndex`,icon:`🦙`,color:`#fbaf3f`,lang:`Python`,cat:`AI`,desc:`Framework RAG i data`},{name:`OpenAI SDK`,icon:`✦`,color:`#10a37f`,lang:`Python`,cat:`AI`,desc:`Najpopularniejsze API LLM`},{name:`Anthropic SDK`,icon:`🔷`,color:`#d4a96a`,lang:`Python`,cat:`AI`,desc:`SDK do modeli Claude`},{name:`MCP`,icon:`🔌`,color:`#a78bfa`,lang:`Python`,cat:`AI`,desc:`Model Context Protocol`},{name:`LangGraph`,icon:`🕸️`,color:`#1c3c3c`,lang:`Python`,cat:`AI`,desc:`Agenci jako grafy stanów`},{name:`CrewAI`,icon:`👥`,color:`#ff4b4b`,lang:`Python`,cat:`AI`,desc:`Multi-agent framework`},{name:`AutoGen`,icon:`🤖`,color:`#0078d4`,lang:`Python`,cat:`AI`,desc:`Konwersacje między agentami`},{name:`Pandas`,icon:`🐼`,color:`#150458`,lang:`Python`,cat:`AI`,desc:`Analiza i manipulacja danych`},{name:`NumPy`,icon:`🔢`,color:`#4dabcf`,lang:`Python`,cat:`AI`,desc:`Obliczenia numeryczne`},{name:`Ollama`,icon:`🦙`,color:`#ffffff`,lang:`Go`,cat:`AI`,desc:`Uruchamiaj LLM lokalnie`},{name:`React Native`,icon:`📱`,color:`#61dafb`,lang:`JavaScript`,cat:`Mobile`,desc:`Natywne apki z React`},{name:`Flutter`,icon:`🐦`,color:`#54c5f8`,lang:`Dart`,cat:`Mobile`,desc:`Cross-platform od Google`},{name:`Ionic`,icon:`💙`,color:`#3880ff`,lang:`TypeScript`,cat:`Mobile`,desc:`Hybrydowe apki mobilne`},{name:`Expo`,icon:`⭐`,color:`#000020`,lang:`JavaScript`,cat:`Mobile`,desc:`React Native bez konfiguracji`},{name:`Electron`,icon:`⚡`,color:`#47848f`,lang:`JavaScript`,cat:`Desktop`,desc:`Desktop z web technologiami`},{name:`Tauri`,icon:`🦀`,color:`#ffc131`,lang:`Rust`,cat:`Desktop`,desc:`Lżejszy Electron (Rust)`},{name:`Apollo`,icon:`🚀`,color:`#311c87`,lang:`JavaScript`,cat:`API`,desc:`GraphQL client i server`},{name:`tRPC`,icon:`🔷`,color:`#398ccb`,lang:`TypeScript`,cat:`API`,desc:`End-to-end typesafe API`},{name:`GraphQL`,icon:`⬡`,color:`#e10098`,lang:`JavaScript`,cat:`API`,desc:`Query language dla API`},{name:`NextAuth.js`,icon:`🔐`,color:`#7c3aed`,lang:`TypeScript`,cat:`Auth`,desc:`Auth dla Next.js`},{name:`Passport.js`,icon:`🛂`,color:`#34e27a`,lang:`JavaScript`,cat:`Auth`,desc:`Auth middleware Node.js`},{name:`Lucia`,icon:`🔑`,color:`#5f57ff`,lang:`TypeScript`,cat:`Auth`,desc:`Auth library TypeScript`}],At={frontend:[{id:`react`,name:`React`,icon:`⚛️`,color:`#61dafb`,lang:`JavaScript`,desc:`Biblioteka UI od Meta`},{id:`nextjs`,name:`Next.js`,icon:`▲`,color:`#ffffff`,lang:`JavaScript`,desc:`Full-stack z React i SSR`},{id:`vue`,name:`Vue.js`,icon:`💚`,color:`#42b883`,lang:`JavaScript`,desc:`Progresywny framework UI`},{id:`svelte`,name:`Svelte`,icon:`🔥`,color:`#ff3e00`,lang:`JavaScript`,desc:`Kompilowany, zero runtime`},{id:`angular`,name:`Angular`,icon:`🔺`,color:`#dd0031`,lang:`TypeScript`,desc:`Framework od Google`},{id:`tailwind`,name:`Tailwind`,icon:`🌊`,color:`#38bdf8`,lang:`CSS`,desc:`Utility-first CSS framework`}],backend:[{id:`fastapi`,name:`FastAPI`,icon:`🚀`,color:`#009688`,lang:`Python`,desc:`Nowoczesne API z type hints`},{id:`requests`,name:`requests`,icon:`🌐`,color:`#2C3E50`,lang:`Python`,desc:`HTTP dla ludzi`},{id:`asyncio`,name:`asyncio`,icon:`⚡`,color:`#5865F2`,lang:`Python`,desc:`Asynchroniczny Python`},{id:`beautifulsoup`,name:`BeautifulSoup`,icon:`🍲`,color:`#3CB371`,lang:`Python`,desc:`Parsowanie HTML i XML`},{id:`pyautogui`,name:`PyAutoGUI`,icon:`🖱️`,color:`#FF6B6B`,lang:`Python`,desc:`Automatyzacja UI i GUI`},{id:`flask`,name:`Flask`,icon:`🌶️`,color:`#a0a0a0`,lang:`Python`,desc:`Mikro-framework webowy`}],database:[{id:`postgresql`,name:`PostgreSQL`,icon:`🐘`,color:`#336791`,lang:`SQL`,desc:`Zaawansowana baza relacyjna`},{id:`mongodb`,name:`MongoDB`,icon:`🍃`,color:`#47a248`,lang:`NoSQL`,desc:`Dokumentowa baza danych`},{id:`redis`,name:`Redis`,icon:`⚡`,color:`#dc382d`,lang:`In-Memory`,desc:`Cache i baza key-value`},{id:`sqlalchemy`,name:`SQLAlchemy`,icon:`🗄️`,color:`#d71f00`,lang:`Python`,desc:`ORM i SQL toolkit`},{id:`prisma`,name:`Prisma`,icon:`◈`,color:`#5a67d8`,lang:`TypeScript`,desc:`Type-safe ORM nowej ery`},{id:`firebase`,name:`Firebase`,icon:`🔥`,color:`#ffca28`,lang:`NoSQL`,desc:`BaaS od Google`}],devops:[{id:`git`,name:`Git`,icon:`🌿`,color:`#F05033`,lang:`Shell`,desc:`Rozproszony system kontroli wersji`},{id:`docker`,name:`Docker`,icon:`🐳`,color:`#2496ed`,lang:`YAML`,desc:`Konteneryzacja aplikacji`},{id:`terraform`,name:`Terraform`,icon:`🏗️`,color:`#7b42bc`,lang:`HCL`,desc:`Infrastruktura jako kod`},{id:`cicd`,name:`CI/CD`,icon:`🔁`,color:`#F05033`,lang:`YAML`,desc:`Ciągła integracja i wdrażanie`},{id:`wsl`,name:`WSL`,icon:`🐧`,color:`#E95420`,lang:`Shell`,desc:`Linux na Windows`},{id:`k8s`,name:`Kubernetes`,icon:`☸️`,color:`#326ce5`,lang:`YAML`,desc:`Orkiestracja kontenerów`}],testing:[{id:`pytest`,name:`pytest`,icon:`🧪`,color:`#0A9EDC`,lang:`Python`,desc:`Najpopularniejszy dla Python`},{id:`playwright`,name:`Playwright`,icon:`🎭`,color:`#2ead33`,lang:`TypeScript`,desc:`E2E testing przeglądarek`},{id:`jest`,name:`Jest`,icon:`🃏`,color:`#c21325`,lang:`JavaScript`,desc:`Najpopularniejszy JS test runner`},{id:`vitest`,name:`Vitest`,icon:`⚡`,color:`#646cff`,lang:`TypeScript`,desc:`Vite-native test runner`},{id:`cypress`,name:`Cypress`,icon:`🌲`,color:`#69d3a7`,lang:`JavaScript`,desc:`E2E testing dla web`},{id:`selenium`,name:`Selenium`,icon:`🔬`,color:`#43b02a`,lang:`Python`,desc:`Klasyczna automatyzacja UI`}],ai:[{id:`langgraph`,name:`LangGraph`,icon:`🕸️`,color:`#1c3c3c`,lang:`Python`,desc:`Agenci jako grafy stanów`},{id:`mcp`,name:`MCP`,icon:`🔌`,color:`#a78bfa`,lang:`Python`,desc:`Model Context Protocol`},{id:`pytorch`,name:`PyTorch`,icon:`🔥`,color:`#ee4c2c`,lang:`Python`,desc:`ML/research od Meta`},{id:`tensorflow`,name:`TensorFlow`,icon:`🧠`,color:`#ff6f00`,lang:`Python`,desc:`ML na masową skalę od Google`},{id:`huggingface`,name:`Hugging Face`,icon:`🤗`,color:`#ffd21e`,lang:`Python`,desc:`Centrum modeli i transformerów`},{id:`openai`,name:`OpenAI SDK`,icon:`✦`,color:`#10a37f`,lang:`Python`,desc:`Najpopularniejsze API do LLM`}]},B=()=>{};function jt(e){B=e.openFramework}function Mt(e){let t=document.getElementById(`checki-page`),n=document.getElementById(`framework-page`),r=document.querySelector(`.logo-checki`),i=document.querySelector(`.logo-framework`);e===`framework`?(t.style.display=`none`,n.style.display=`flex`,r.classList.remove(`active`),i.classList.add(`active`),V(`frontend`),setTimeout(()=>{let e=document.querySelector(`.fw-section[data-theme="frontend"]`);e&&e.scrollIntoView({behavior:`instant`})},0)):(n.style.display=`none`,t.style.display=`flex`,r.classList.add(`active`),i.classList.remove(`active`),document.getElementById(`framework-page`).className=``)}var Nt={frontend:{bg:`#0d0a1f`},backend:{bg:`#050f05`},database:{bg:`#08050f`},devops:{bg:`#050a10`},ai:{bg:`#0f0a05`}};function V(e){let t=Nt[e];if(!t)return;let n=document.getElementById(`framework-page`);n.style.background=t.bg,n.style.transition=`background 0.6s ease`}function H(e,t){e=e.replace(`#`,``),e.length===3&&(e=e.split(``).map(e=>e+e).join(``));let n=parseInt(e.substring(0,2),16),r=parseInt(e.substring(2,4),16),i=parseInt(e.substring(4,6),16);return`rgba(`+n+`,`+r+`,`+i+`,`+t+`)`}function U(e,t){let n=document.getElementById(t);n&&(At[e]||[]).forEach(function(e){let t=document.createElement(`div`);t.className=`fw-tile`,t.style.background=H(e.color,.07),t.style.borderColor=H(e.color,.2),t.style.setProperty(`--tc-bg`,H(e.color,.18)),t.style.setProperty(`--tc-border`,H(e.color,.6)),t.style.setProperty(`--tc-glow`,H(e.color,.25)),t.onclick=()=>B(e),t.innerHTML=`<div class="fw-tile-icon">`+e.icon+`</div><div class="fw-tile-name">`+e.name+`</div><div class="fw-tile-desc">`+e.desc+`</div><div class="fw-tile-lang">`+e.lang+`</div>`,n.appendChild(t)})}function Pt(e){let t=document.getElementById(`fw-suggestions`);if(t.innerHTML=``,!e.trim())return;let n=e.toLowerCase(),r=kt.filter(e=>e.name.toLowerCase().includes(n)||e.cat.toLowerCase().includes(n)).slice(0,10);r.forEach(function(e){let n=document.createElement(`button`);n.className=`fw-suggestion-chip`,n.style.borderColor=H(e.color,.4),n.style.color=e.color,n.innerHTML=`<span class="fw-chip-icon">`+e.icon+`</span><span class="fw-chip-name">`+e.name+`</span><span class="fw-chip-cat">`+e.cat+`</span><span class="fw-chip-arrow" style="color:`+e.color+`">→</span>`,n.onclick=()=>{W(),B(e)},t.appendChild(n)}),r.length>0&&(document.getElementById(`fw-search-input`).onkeydown=e=>{e.key===`Enter`&&(W(),B(r[0]))})}function W(){document.getElementById(`fw-result-view`).style.display=`none`,document.getElementById(`fw-search-view`).style.display=`flex`,document.getElementById(`fw-search-input`).value=``,document.getElementById(`fw-suggestions`).innerHTML=``}function Ft(){let e=document.getElementById(`framework-page`),t=e.querySelectorAll(`.fw-section`);new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&V(e.target.dataset.theme)})},{root:e,threshold:.4}).observe&&t.forEach(t=>{new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&V(e.target.dataset.theme)})},{root:e,threshold:.4}).observe(t)})}document.addEventListener(`DOMContentLoaded`,function(){U(`frontend`,`fw-tiles-frontend`),U(`backend`,`fw-tiles-backend`),U(`database`,`fw-tiles-database`),U(`devops`,`fw-tiles-devops`),U(`ai`,`fw-tiles-ai`),U(`testing`,`fw-tiles-testing`),Ft()});function G(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function It(e,t){let n=t&&t.codeLang?t.codeLang:`Code`,r=e.labels||{},i=r.concepts||`Kluczowe koncepcje`,a=r.whenToUse||`Kiedy używać?`,o=r.firstComponent||`Pierwszy przykład`,s=r.firstComponentLang||n,c=`<div class="fwd-card fwd-card-accent"><div class="fwd-card-title">`+(t&&t.icon?t.icon+` `:``)+e.intro.title+`</div><div class="fwd-card-desc">`+e.intro.desc+`</div></div><div class="fwd-section-title">`+i+`</div><div class="fwd-intro-grid">`;return e.concepts.forEach(e=>{c+=`<div class="fwd-concept-card"><div class="fwd-concept-icon">`+e.icon+`</div><div class="fwd-concept-title">`+G(e.title)+`</div><div class="fwd-concept-desc">`+G(e.desc)+`</div></div>`}),c+=`</div><div class="fwd-section-title">`+a+`</div><div class="fwd-card"><ul class="fwd-when-list">`,e.whenToUse.forEach(e=>{c+=`<li>`+e+`</li>`}),c+=`</ul></div><div class="fwd-section-title">`+o+`</div><div class="fwd-card"><div class="fwd-code-wrap"><span class="fwd-code-lang">`+s+`</span><pre class="fwd-code">`+G(e.firstComponent)+`</pre></div></div>`,c}function K(e,t){let n=t&&t.codeLang?t.codeLang:`Code`,r=e.title?`<div class="fwd-section-title">`+G(e.title)+`</div>`:``;return(e.items||[]).forEach(function(e,t){r+=`<div class="fwd-card" style="animation-delay:`+t*.05+`s"><div class="fwd-card-title">`+G(e.name||e.title||``)+`</div><div class="fwd-card-desc">`+G(e.desc||``)+`</div>`+(e.code?`<div class="fwd-code-wrap"><span class="fwd-code-lang">`+G(e.lang||n)+`</span><pre class="fwd-code">`+G(e.code)+`</pre></div>`:``)+`</div>`}),r}function Lt(e,t){let n=t&&t.codeLang?t.codeLang:`Code`;return e.map((e,t)=>`<div class="fwd-card" style="animation-delay:`+t*.05+`s"><div class="fwd-card-title">`+e.title+`</div><div class="fwd-card-desc">`+e.desc+`</div><div class="fwd-code-wrap"><span class="fwd-code-lang">`+(e.lang||n)+`</span><pre class="fwd-code">`+G(e.code)+`</pre></div></div>`).join(``)}function Rt(e){return`<div class="fwd-hooks-grid">`+e.map((e,t)=>`<div class="fwd-hook-card" style="animation-delay:`+t*.04+`s"><div class="fwd-hook-name" style="color:var(--fw-color)">`+e.name+`</div><div class="fwd-hook-desc">`+e.desc+`</div><div class="fwd-hook-when">💡 `+e.when+`</div><div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">`+G(e.code)+`</pre></div></div>`).join(``)+`</div>`}function zt(e,t){let n=t&&t.codeLang?t.codeLang:`Code`,r=`<div class="fwd-install-bar"><span class="fwd-install-label">Instalacja</span><span>$ `+e.install+`</span><span style="font-size:10px;color:rgba(255,255,255,0.2);margin-left:auto">`+e.version+`</span></div>`;return e.sections.forEach((e,t)=>{r+=`<div class="fwd-card" style="animation-delay:`+t*.05+`s"><div class="fwd-card-title">`+e.title+`</div><div class="fwd-code-wrap"><span class="fwd-code-lang">`+(e.lang||n)+`</span><pre class="fwd-code">`+G(e.code)+`</pre></div></div>`}),r}function Bt(e){return`<div class="fwd-state-grid">`+e.map((e,t)=>`<div class="fwd-state-card" style="animation-delay:`+t*.05+`s;border-left:3px solid `+e.color+`"><div class="fwd-state-header"><span style="font-size:20px">`+e.icon+`</span><div class="fwd-state-name">`+e.name+`</div></div><div class="fwd-state-meta"><span class="fwd-state-badge">📦 `+e.bundle+`</span><span class="fwd-state-badge">⚙️ `+e.complexity+`</span></div><div class="fwd-state-when">`+e.when+`</div><div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">`+G(e.code)+`</pre></div></div>`).join(``)+`</div>`}function Vt(e){return`<div class="fwd-rivals-grid">`+e.map((e,t)=>`<div class="fwd-rival-card" style="animation-delay:`+t*.06+`s;border-left:3px solid `+e.color+`"><div class="fwd-rival-header"><span class="fwd-rival-icon">`+e.icon+`</span><div><div class="fwd-rival-name" style="color:`+e.color+`">`+e.name+`</div><div class="fwd-rival-tagline">`+e.tagline+`</div></div></div><div class="fwd-pros-cons"><ul class="fwd-pro-list">`+e.pros.map(e=>`<li>`+e+`</li>`).join(``)+`</ul><ul class="fwd-con-list">`+e.cons.map(e=>`<li>`+e+`</li>`).join(``)+`</ul></div><div class="fwd-vs-react">🆚 `+e.vsReact+`</div></div>`).join(``)+`</div>`}function Ht(e){return`<div class="fwd-plugins-grid">`+e.map((e,t)=>`<div class="fwd-plugin-card" style="animation-delay:`+t*.05+`s;border-left:3px solid `+e.color+`"><div class="fwd-plugin-header"><span style="font-size:22px">`+e.icon+`</span><div><div class="fwd-plugin-name" style="color:`+e.color+`">`+G(e.name)+`</div><div class="fwd-plugin-tagline">`+G(e.tagline)+`</div></div></div><div class="fwd-plugin-install"><code>`+G(e.install)+`</code></div><div class="fwd-plugin-use">`+G(e.use)+`</div>`+(e.example?`<div class="fwd-code-wrap" style="margin-top:10px"><pre class="fwd-code" style="font-size:11px">`+G(e.example)+`</pre></div>`:``)+`</div>`).join(``)+`</div>`}function Ut(e){return(Array.isArray(e)?e:e.groups||[]).map(function(e,t){let n=e.category||e.name||``,r=e.items||e.commands||[];return`<div class="fwd-cmd-group"><div class="fwd-cmd-group-title"><span>`+e.icon+`</span>`+n+`</div><div class="fwd-terminal">`+r.map(function(e,n){let r=e.cmd||e.code||``,i=e.desc||``,a=!!e.detail;return r.includes(`
`)?`<div class="fwd-terminal-row fwd-terminal-row--block"><div class="fwd-terminal-desc fwd-terminal-desc--block">`+G(i)+`</div><pre class="fwd-code" style="font-size:11px;margin:4px 0 0">`+G(r.trim())+`</pre></div>`:`<div class="fwd-terminal-row`+(a?` fwd-terminal-row--clickable`:``)+`"`+(a?` onclick="openCmdModal(`+t+`,`+n+`)"`:``)+`><span class="fwd-terminal-cmd">`+G(r)+`</span><span class="fwd-terminal-desc">`+G(i)+`</span>`+(a?`<span class="fwd-terminal-hint">→</span>`:``)+`</div>`}).join(``)+`</div></div>`}).join(``)}var q=null;function Wt(e){q=e}function Gt(e,t){if(!q)return;let n=q[e].items[t];if(!n||!n.detail)return;let r=n.detail,i=r.flags&&r.flags.length?`<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">⚙️ Flagi / Opcje</div><div class="fwd-cmd-flags">`+r.flags.map(e=>`<div class="fwd-cmd-flag-row"><code class="fwd-cmd-flag-name">`+G(e.flag)+`</code><span class="fwd-cmd-flag-desc">`+e.desc+`</span></div>`).join(``)+`</div></div>`:``,a=r.tips&&r.tips.length?`<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">💡 Wskazówki dla juniora</div><ul class="fwd-cmd-tips">`+r.tips.map(e=>`<li>`+e+`</li>`).join(``)+`</ul></div>`:``,o=document.getElementById(`fwd-cmd-modal`);o&&(o.querySelector(`.fwd-cmd-modal-cmd-text`).textContent=n.cmd,o.querySelector(`.fwd-cmd-modal-body`).innerHTML=`<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">📌 Co robi</div><div class="fwd-cmd-modal-text">`+r.what+`</div></div><div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">⚡ Jak działa</div><div class="fwd-cmd-modal-text">`+r.how+`</div></div>`+i+a+(r.note?`<div class="fwd-cmd-note">`+r.note+`</div>`:``),o.classList.add(`fwd-cmd-modal--visible`),document.addEventListener(`keydown`,Kt))}function J(){let e=document.getElementById(`fwd-cmd-modal`);e&&e.classList.remove(`fwd-cmd-modal--visible`),document.removeEventListener(`keydown`,Kt)}function Kt(e){e.key===`Escape`&&J()}function qt(){let e=document.querySelector(`.fwd-cmd-modal-cmd-text`);e&&navigator.clipboard.writeText(e.textContent).then(()=>{let e=document.querySelector(`.fwd-cmd-copy-btn`);e&&(e.textContent=`✓ Skopiowano`,setTimeout(()=>{e.textContent=`📋 Kopiuj`},1500))})}document.addEventListener(`DOMContentLoaded`,function(){if(document.getElementById(`fwd-cmd-modal`))return;let e=document.createElement(`div`);e.id=`fwd-cmd-modal`,e.innerHTML=`<div class="fwd-cmd-modal-box"><div class="fwd-cmd-modal-header"><div class="fwd-cmd-modal-cmd-wrap"><span class="fwd-cmd-modal-dollar">$</span><span class="fwd-cmd-modal-cmd-text"></span></div><div class="fwd-cmd-modal-actions"><button class="fwd-cmd-copy-btn" onclick="copyCmdText()">📋 Kopiuj</button><button class="fwd-cmd-modal-close" onclick="closeCmdModal()">✕</button></div></div><div class="fwd-cmd-modal-body"></div></div>`,e.addEventListener(`click`,t=>{t.target===e&&J()}),document.body.appendChild(e)});var Jt={routing:{install:`npm install react-router-dom`,version:`React Router v7 (API zgodne z v6)`,sections:[{title:`Konfiguracja podstawowa`,code:`import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`},{title:`Nawigacja — Link i NavLink`,code:`import { Link, NavLink } from 'react-router-dom';

// Link — podstawowy
<Link to="/about">O nas</Link>

// NavLink — dodaje className "active" gdy URL pasuje
<NavLink
  to="/users"
  className={({ isActive }) => isActive ? 'nav-active' : ''}
>
  Użytkownicy
</NavLink>`},{title:`Dynamiczne trasy i useParams`,code:`// Definicja
<Route path="/users/:id" element={<UserProfile />} />

// Komponent
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  return <div>Użytkownik #{id}</div>;
}`},{title:`Zagnieżdżone trasy i Outlet`,code:`<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
  <Route path="profile" element={<Profile />} />
</Route>

// Dashboard.jsx — Outlet renderuje aktywną podtrasę
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <main><Outlet /></main>
    </div>
  );
}`},{title:`Programatyczna nawigacja i useNavigate`,code:`import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(credentials);
    navigate('/dashboard'); // przekieruj po logowaniu
    // lub navigate(-1) — cofnij
  };
}`},{title:`Protected Route — ochrona tras`,code:`function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Użycie
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />`}]},state:[{name:`useState`,icon:`⚛️`,color:`#61dafb`,useCase:`Lokalny stan komponentu`,complexity:`Prosta`,bundle:`0 KB (wbudowany)`,when:`Toggle, liczniki, wartości formularzy w jednym komponencie`,code:`const [open, setOpen] = useState(false);`},{name:`Context + useReducer`,icon:`🔄`,color:`#a78bfa`,useCase:`Stan współdzielony bez bibliotek`,complexity:`Średnia`,bundle:`0 KB (wbudowany)`,when:`Motyw, język, auth — gdy prop drilling boli ale nie chcesz biblioteki`,code:`const StateContext = createContext();
const [state, dispatch] = useReducer(reducer, init);
<StateContext.Provider value={{ state, dispatch }}>
  <App />
</StateContext.Provider>`},{name:`Zustand`,icon:`🐻`,color:`#f59e0b`,useCase:`Global state — proste i szybkie`,complexity:`Niska`,bundle:`~1 KB`,when:`Średnie aplikacje, gdy Context jest za wolny lub za dużo boilerplate`,code:`import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set(s => ({ count: s.count + 1 })),
}));

// W komponencie
const { count, increment } = useStore();`},{name:`Redux Toolkit`,icon:`🟣`,color:`#764abc`,useCase:`Global state — enterprise`,complexity:`Wysoka`,bundle:`~15 KB`,when:`Duże aplikacje, time-travel debugging, wiele osób w teamie`,code:`const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++ },
  },
});

const { increment } = counterSlice.actions;
dispatch(increment());`}]},Yt={rywale:[{name:`Vue.js`,icon:`💚`,color:`#42b883`,tagline:`Progresywny framework UI`,pros:[`Łagodniejsza krzywa uczenia`,`Single File Components (SFC)`,`Wbudowany system reaktywności`,`Świetna dokumentacja`],cons:[`Mniejszy ekosystem niż React`,`Mniej ofert pracy`,`Mniej komponentów od firm trzecich`],vsReact:`Vue jest prostszy na start. React ma większy ekosystem i więcej ofert pracy. Vue preferują mniejsze teamy i projekty gdzie developer doświadczenia jest ważny.`,bestFor:`Małe-średnie projekty, płynne przejście z jQuery/Vanilla JS`},{name:`Angular`,icon:`🔺`,color:`#dd0031`,tagline:`Pełny framework od Google`,pros:[`Pełna bateria (router, HTTP, forms, DI)`,`TypeScript first`,`Jasna architektura dla dużych teamów`,`Dobre narzędzia CLI`],cons:[`Stroma krzywa uczenia`,`Więcej boilerplate`,`Cięższa paczka wyjściowa`,`Szybko ewoluuje — breaking changes`],vsReact:`Angular to framework, React to biblioteka. Angular narzuca strukturę (dobrze dla dużych teamów), React daje wolność (wymaga własnych decyzji).`,bestFor:`Enterprise, duże teamy, projekty wymagające rygorystycznej architektury`},{name:`Svelte`,icon:`🔥`,color:`#ff3e00`,tagline:`Kompilowany framework — zero runtime`,pros:[`Kompiluje do vanilla JS — mały bundle`,`Brak Virtual DOM — bezpośrednie aktualizacje`,`Prosta, zwięzła składnia`,`Svelte 5 (2024): nowy model reaktywności przez runes ($state, $derived, $effect)`],cons:[`Mniejszy ekosystem`,`Mniej bibliotek UI`,`Mniejsza społeczność`,`SvelteKit jest młodszy niż Next.js`],vsReact:`Svelte kompiluje się do czystego JS — zero runtime overhead. Svelte 5 wprowadził runes jako nowy model reaktywności. Kod jest krótszy, ale React ma nieporównywalnie większy ekosystem.`,bestFor:`Projekty gdzie liczy się rozmiar paczki, interaktywne widgety do osadzania`},{name:`Solid.js`,icon:`⚡`,color:`#2c4f7c`,tagline:`Prawdziwa reaktywność bez Virtual DOM`,pros:[`Najszybszy główny framework UI`,`Fine-grained reactivity`,`API zbliżone do React (znajome hooki)`,`Mały bundle`],cons:[`Mała społeczność`,`Mało bibliotek`,`Nie dla wszystkich wzorce reactivity`,`Mniej ofert pracy`],vsReact:`Solid jest szybszy od React bo nie ma Virtual DOM — aktualizuje DOM bezpośrednio przez signals. Składnia podobna do React, ale semantyka inna.`,bestFor:`Projekty performance-critical, deweloperzy znający React chcący więcej wydajności`},{name:`Next.js`,icon:`▲`,color:`#ffffff`,tagline:`React meta-framework z SSR/SSG`,pros:[`SSR, SSG, ISR out of the box`,`App Router + React Server Components (RSC)`,`Server Actions — mutacje bez API endpoints`,`Świetna optymalizacja (Image, Font)`,`Vercel deployment`],cons:[`Vendor lock-in (Vercel)`,`App Router i RSC mają stromą krzywą uczenia`,`Pages Router vs App Router — dwie różne architektury`],vsReact:`Next.js jest zbudowany na React — to nie rywal tylko rozszerzenie. App Router (Next.js 13+) wprowadził React Server Components: komponenty które renderują się na serwerze, zero JS na klienta. Większość nowych projektów React używa Next.js.`,bestFor:`Produkcyjne aplikacje, SEO, e-commerce, blogi, portale`},{name:`Qwik`,icon:`🦋`,color:`#18b6f6`,tagline:`Resumowalny framework — zero JS na start`,pros:[`Natychmiastowe ładowanie strony`,`Resumability zamiast hydration`,`Automatyczny code splitting`,`Dobry dla Core Web Vitals`],cons:[`Mała społeczność`,`Nowa technologia — ryzyko`,`Inny model myślenia niż React`,`Mało tutoriali`],vsReact:`Qwik rozwiązuje problem hydration który React ma w SSR. Zamiast pobierać i uruchamiać JS na kliencie, wznawia stan serwera. Futurystyczne podejście.`,bestFor:`Strony gdzie liczy się Core Web Vitals, content-heavy sites`}],pluginy:[{name:`Next.js`,icon:`▲`,color:`#e2e8f0`,tagline:`Full-stack React framework — SSR, SSG, API routes`,install:`npx create-next-app@latest my-app --typescript`,use:`React na serwerze — SEO, szybkie first load, API routes w tym samym projekcie, file-based routing, Image optimization. Standard dla produkcyjnych aplikacji React.`,example:`// app/page.tsx — Server Component (domyślnie)
export default async function Home() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <PostList posts={posts} />
}

// app/api/hello/route.ts — API endpoint
export async function GET() {
  return Response.json({ message: 'Hello from API' })
}`},{name:`React Router`,icon:`🛣️`,color:`#CA4245`,tagline:`Routing po stronie klienta (SPA)`,install:`npm install react-router-dom`,use:`Nawigacja między widokami bez przeładowania strony. Zagnieżdżone trasy, parametry URL, lazy loading komponentów. Standard dla aplikacji SPA bez Next.js.`,example:`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

<BrowserRouter>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/users">Users</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<UserPage />} />
  </Routes>
</BrowserRouter>`},{name:`TanStack Query`,icon:`🔄`,color:`#FF4154`,tagline:`Server state — fetching, caching, synchronizacja`,install:`npm install @tanstack/react-query`,use:`Zarządzanie danymi z serwera — automatyczne cachowanie, background refetch, loading/error states, pagination. Zastępuje useState+useEffect do fetchowania. Must-have w każdym projekcie.`,example:`const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  staleTime: 5 * 60 * 1000,  // 5 min cache
})

const mutation = useMutation({
  mutationFn: (data) => fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
})`}]},Xt=[{category:`Tworzenie projektu`,icon:`🚀`,items:[{cmd:`npm create vite@latest moja-apka -- --template react`,desc:`Nowy projekt React z Vite (zalecane)`,detail:{what:`Tworzy nowy projekt React z bundlerem Vite. Vite jest ~10x szybszy od CRA bo używa natywnych ES modules w dev — nie bundle'uje całości, ładuje tylko to co przeglądarka prosi.`,how:"`npm create` = `npm init`. Pobiera pakiet create-vite i odpala wizard. `@latest` = zawsze najnowsza wersja. `--` oddziela argumenty npm od argumentów create-vite.",flags:[{flag:`--template react`,desc:`JavaScript`},{flag:`--template react-ts`,desc:`TypeScript`},{flag:`--template react-swc`,desc:`JS z kompilatorem SWC (jeszcze szybszy HMR)`}],tips:[`Po stworzeniu: cd moja-apka → npm install → npm run dev`,`Struktura: src/main.jsx (entry), src/App.jsx (root)`,`Port domyślny: 5173`]}},{cmd:`npm create vite@latest moja-apka -- --template react-ts`,desc:`React + TypeScript z Vite`,detail:{what:`To samo co wyżej ale z TypeScriptem. Dostajesz tsconfig.json i pliki .tsx zamiast .jsx. TypeScript wykrywa błędy przed uruchomieniem.`,how:`Vite generuje projekt z @vitejs/plugin-react, TypeScript i @types/react już w package.json. Kompilacja TS jest obsługiwana przez Vite, nie przez tsc.`,tips:[`.tsx = TypeScript + JSX`,`Props typujesz: interface Props { name: string }`,`npx tsc --noEmit żeby sprawdzić typy bez budowania`,`Vite nie blokuje na błędach TS — sprawdź je osobno!`]}},{cmd:`yarn create vite moja-apka --template react`,desc:`Vite + Yarn`,detail:{what:`To samo co npm create vite ale z Yarn jako package manager. Yarn jest szybszy od npm przy pierwszej instalacji dzięki równoległemu pobieraniu.`,how:"`yarn create` = globalny install create-vite + wywołanie. Używa yarn.lock zamiast package-lock.json.",tips:[`Instalacja Yarn: npm install -g yarn`,`Komendy Yarn: yarn dev, yarn build, yarn add pakiet`,`yarn.lock musi być w git — gwarantuje te same wersje dla wszystkich`]}},{cmd:`pnpm create vite moja-apka --template react`,desc:`Vite + pnpm (najszybszy)`,detail:{what:`Vite z pnpm — najszybszy package manager. Używa hard linków zamiast kopiowania. Jeśli masz 10 projektów z react, pnpm przechowuje go raz na dysku.`,how:`pnpm tworzy centralny store w ~/.pnpm-store. Każdy projekt linkuje się do store zamiast kopiować. node_modules jest wirtualny.`,tips:[`Instalacja: npm install -g pnpm`,`Komendy: pnpm dev, pnpm build, pnpm add pakiet`,`Oszczędza gigabajty na dysku przy wielu projektach`]}},{cmd:`npx create-react-app moja-apka`,desc:`Klasyczny CRA (legacy, wolniejszy)`,detail:{what:`Oficjalny starter Reacta od Meta. Działa od razu, zero konfiguracji. W 2024 uważany za legacy — Vite jest szybszy i ma lepsze DX.`,how:`CRA używa webpack pod spodem. Webpack bundle'uje cały kod przed startem — stąd wolne cold start. Konfiguracja jest ukryta.`,flags:[{flag:`--template typescript`,desc:`Z TypeScript`},{flag:`--template cra-template-redux`,desc:`Z Redux`}],tips:[`Preferuj Vite zamiast CRA`,`Folder: build/ (nie dist/ jak w Vite)`,`Port domyślny: 3000 (nie 5173)`],note:`⚠️ CRA nie jest aktywnie rozwijany — Meta przestała go utrzymywać w 2023.`}},{cmd:`npx create-react-app moja-apka --template typescript`,desc:`CRA + TypeScript`,detail:{what:`CRA z TypeScript. Dostajesz tsconfig.json, pliki .tsx i @types/react w package.json.`,how:`CRA konfiguruje babel z preset-typescript. W odróżnieniu od Vite, CRA sprawdza typy podczas kompilacji.`,tips:[`Stary ale działa`,`Jeśli coś nie gra — npm install -D typescript@latest`,`Rozważ migrację do Vite + TS zamiast`]}},{cmd:`npx create-next-app@latest moja-apka`,desc:`Next.js — full-stack React`,detail:{what:`Tworzy projekt Next.js — React z SSR, file-system routingiem, API routes i React Server Components. To nie alternatywa dla React, to React + supermoc.`,how:`Next.js renderuje komponenty na serwerze (RSC) lub kliencie. App Router (folder app/) = nowy standard. Pages Router (folder pages/) = legacy.`,flags:[{flag:`--typescript`,desc:`TypeScript`},{flag:`--tailwind`,desc:`Tailwind CSS`},{flag:`--app`,desc:`App Router (domyślnie)`},{flag:`--src-dir`,desc:`Folder src/ zamiast root`}],tips:[`App Router = Server Components domyślnie`,`"use client" na górze pliku = komponent działa w przeglądarce`,`Port domyślny: 3000`]}},{cmd:`npx create-remix@latest`,desc:`Remix — alternatywny meta-framework React`,detail:{what:`Tworzy projekt Remix — meta-framework skupiony na web standardach, formularzach i loaderach. Inny model myślenia niż Next.js.`,how:`Loader = fetch danych przed renderem. Action = mutacja (POST/PUT/DELETE). Formularz bez useState — web standardy.`,tips:[`Mniej popularny niż Next.js ale bardzo solidny`,`Świetny dla form-heavy aplikacji`,`Kompiluje się na Node, Deno, Cloudflare Workers`]}}]},{category:`Development`,icon:`⚙️`,items:[{cmd:`npm run dev`,desc:`Serwer deweloperski Vite — port 5173`,detail:{what:`Uruchamia serwer deweloperski Vite z HMR (Hot Module Replacement). Zmiana kodu = natychmiastowa aktualizacja w przeglądarce BEZ przeładowania — stan aplikacji zostaje zachowany.`,how:`Vite serwuje pliki jako ES modules. Przeglądarka importuje dokładnie to co potrzebuje. Nie bundle'uje całości jak webpack — stąd błyskawiczny start (< 1s).`,tips:[`Ctrl+C żeby zatrzymać`,`http://localhost:5173 domyślnie`,`HMR zachowuje stan — edytuj styl i widzisz zmianę bez resetu`],note:`Jeśli port 5173 zajęty, Vite automatycznie wybierze następny wolny.`}},{cmd:`npm run dev -- --port 3000`,desc:`Vite na konkretnym porcie`,detail:{what:`Uruchamia Vite dev server na porcie 3000 zamiast domyślnego 5173. Przydatne gdy inna aplikacja zajmuje 5173.`,how:"`--` oddziela argumenty npm od argumentów Vite CLI. Wszystko po `--` trafia bezpośrednio do vite.",flags:[{flag:`--port NUMER`,desc:`Ustaw port`},{flag:`--host`,desc:`Dostępny w LAN`},{flag:`--open`,desc:`Otwórz przeglądarkę automatycznie`},{flag:`--https`,desc:`HTTPS lokalnie`}],tips:[`Możesz to ustawić na stałe w vite.config.ts: server: { port: 3000 }`]}},{cmd:`npm run dev -- --host`,desc:`Vite dostępny w sieci LAN (telefon, tablet)`,detail:{what:`Serwer deweloperski dostępny z innych urządzeń w tej samej sieci WiFi. Testuj aplikację na telefonie bez deployu.`,how:`Domyślnie Vite nasłuchuje tylko na localhost (127.0.0.1). --host zmienia to na 0.0.0.0 — wszystkie interfejsy sieciowe.`,tips:[`Vite wyświetli dwa adresy: localhost i IP LAN (np. http://192.168.1.100:5173)`,`Telefon musi być w tej samej sieci WiFi`,`Sprawdź firewall jeśli nie działa z innych urządzeń`]}},{cmd:`npm start`,desc:`Serwer deweloperski CRA — port 3000`,detail:{what:`Uruchamia serwer deweloperski Create React App na porcie 3000. Automatycznie otwiera przeglądarkę.`,how:`CRA używa webpack-dev-server pod spodem. Wolniejszy od Vite — bundle'uje cały kod przy starcie (może trwać kilka sekund).`,tips:[`Tylko dla CRA — w projektach Vite używaj npm run dev`,`Zapyta o zmianę portu jeśli 3000 zajęty`,`Przeglądarka otwiera się automatycznie`]}},{cmd:`npm run build`,desc:`Buduj produkcyjną wersję`,detail:{what:`Buduje zoptymalizowaną wersję aplikacji: minifikuje kod, usuwa martwy kod (tree shaking), dzieli na chunki, hashuje nazwy plików.`,how:`Vite używa Rollup do bundlowania produkcji. Wynik ląduje w dist/. Pliki mają hashe w nazwach (app-D3Kv2.js) — przeglądarka wie kiedy pobrać nową wersję.`,tips:[`Nigdy nie commituj folderu dist/ — dodaj do .gitignore`,`Po build sprawdź: npm run preview`,`Rozmiar bundla widoczny w terminalu po build`,`CRA generuje do build/ zamiast dist/`]}},{cmd:`npm run preview`,desc:`Podejrzyj build lokalnie (Vite)`,detail:{what:`Uruchamia lokalny serwer HTTP serwujący zbudowaną wersję z dist/. Symuluje produkcję bez deployu.`,how:`To statyczny serwer — brak HMR, brak kompilacji. Używaj do weryfikacji czy build działa poprawnie przed deployem.`,tips:[`Zawsze uruchom npm run build przed preview`,`Jeśli działa w dev ale nie w preview — problem z import paths lub env vars`,`Port domyślny: 4173`],note:`preview ≠ deploy — to tylko lokalny podgląd.`}},{cmd:`npx serve -s dist`,desc:`Serwuj dist statycznie (Vite)`,detail:{what:`Serwuje statyczne pliki z folderu dist/ przez HTTP. Alternatywa dla npm run preview, działa bez Vite w projekcie.`,how:"serve to minimalistyczny HTTP server. `-s` = SPA mode — wszystkie ścieżki /users/1 etc. kieruje do index.html zamiast szukać pliku.",tips:["`-s` jest KLUCZOWY dla React Router — bez tego /users/1 zwraca 404 przy odświeżeniu",`Zmień port: npx serve -s dist -p 8080`,`Instaluj globalnie jeśli używasz często: npm install -g serve`]}},{cmd:`npx serve -s build`,desc:`Serwuj build statycznie (CRA)`,detail:{what:`To samo co serve -s dist ale dla projektów CRA, które budują do folderu build/ zamiast dist/.`,how:`Identyczne działanie — różni się tylko nazwa folderu.`,tips:[`CRA → build/, Vite → dist/`,`Sprawdź w package.json skrypt build żeby wiedzieć gdzie ląduje output`]}},{cmd:`npm run eject`,desc:`CRA: wysunij ukrytą konfigurację (NIEODWRACALNE)`,detail:{what:`Wysuwa ukrytą konfigurację webpack/babel/jest z CRA do twojego projektu. Zyskujesz pełną kontrolę ale też pełną odpowiedzialność.`,how:`CRA ukrywa ~1000 linii konfiguracji. Po eject dostajesz folder config/ z webpack.config.js i scripts/ z pełną logiką.`,tips:[`Zrób commit PRZED ejectem — nieodwracalne!`,`W 99% przypadków nie potrzebujesz ejecta — użyj CRACO lub przejdź na Vite`,`Po eject aktualizacje konfiguracji są twoje — nie ma auto-update`],note:`⚠️ NIEODWRACALNE. Po eject nie możesz wrócić do ukrytej konfiguracji CRA.`}}]},{category:`TypeScript`,icon:`🔷`,items:[{cmd:`npx tsc --noEmit`,desc:`Sprawdź typy — bez generowania plików JS`,detail:{what:`Sprawdza błędy TypeScript BEZ generowania plików .js. Czysty type check — tylko raport błędów.`,how:`Normalnie tsc kompiluje .ts → .js. --noEmit mówi "sprawdź tylko, nic nie generuj". Vite sam kompiluje TS w dev — tsc używasz tylko do weryfikacji typów.`,tips:[`Uruchom przed committem żeby sprawdzić czy typy są OK`,`Błędy TS nie blokują Vite dev (tylko ostrzeżenia) — stąd potrzeba osobnego check`,`Dodaj do CI: npx tsc --noEmit || exit 1`]}},{cmd:`npx tsc --watch`,desc:`Type check w trybie ciągłym`,detail:{what:`Sprawdza typy TypeScript w tle i raportuje błędy przy każdej zmianie pliku.`,how:`tsc obserwuje system plików. Tylko zmienione pliki są rekompilowane (incremental check).`,tips:[`Uruchom w osobnym terminalu obok npm run dev`,`Szybsze niż pełne --noEmit po każdej zmianie`]}},{cmd:`npx tsc --init`,desc:`Utwórz tsconfig.json`,detail:{what:`Generuje plik tsconfig.json z komentarzami do wszystkich dostępnych opcji. Punkt startowy konfiguracji TypeScript.`,how:`Tworzy tsconfig.json z domyślnymi ustawieniami i ~100 zakomentowanymi opcjami jako dokumentacja.`,tips:[`Dla React + Vite potrzebujesz: "jsx": "react-jsx", "strict": true`,`Projekty Vite mają już tsconfig.json — nie nadpisuj przez tsc --init`,`strict: true = włącza wszystkie rygorystyczne checks (zalecane)`]}},{cmd:`npm install -D typescript @types/react @types/react-dom`,desc:`Dodaj TypeScript do projektu JS`,detail:{what:`Dodaje TypeScript i typy React do istniejącego projektu JavaScript.`,how:`@types/react = deklaracje typów dla całej biblioteki React. @types/react-dom = typy dla ReactDOM (createRoot itp.). Razem umożliwiają type checking kodu React.`,tips:[`Wersja @types/react powinna być zgodna z wersją react w package.json`,`Po instalacji zmień pliki .jsx → .tsx`,`Dodaj tsconfig.json ręcznie lub npx tsc --init`]}},{cmd:`npm install -D @types/node`,desc:`Typy dla Node.js w projekcie React`,detail:{what:`Dodaje typy TypeScript dla Node.js API: process.env, Buffer, __dirname, path itp. Potrzebne gdy w projekcie React używasz zmiennych środowiskowych lub narzędzi Node.`,how:`@types/node = deklaracje dla wszystkich wbudowanych modułów Node.js. Bez tego TypeScript nie rozpoznaje process.env.VITE_API_URL.`,tips:[`W Vite używaj import.meta.env zamiast process.env`,`Potrzebne głównie w plikach konfiguracyjnych (vite.config.ts, jest.config.ts)`]}}]},{category:`Testy`,icon:`🧪`,items:[{cmd:`npm test`,desc:`Uruchom testy w trybie watch (CRA/Jest)`,detail:{what:`Uruchamia testy i obserwuje zmiany. Przy każdej modyfikacji pliku odpowiednie testy odpalam automatycznie.`,how:`CRA używa Jest. Testy to pliki *.test.js, *.spec.js lub w folderze __tests__/. Watch mode = nie musisz ręcznie odpalać po każdej zmianie.`,tips:[`"a" — uruchom wszystkie testy`,`"p" — filtruj po nazwie pliku`,`"t" — filtruj po nazwie testu`,`"q" — wyjdź z watch mode`]}},{cmd:`npm test -- --coverage`,desc:`Testy + raport pokrycia kodu`,detail:{what:`Uruchamia testy i generuje raport coverage — pokazuje które linie/funkcje/gałęzie kodu są (nie)testowane.`,how:`Istanbul (Jest coverage) instrumentuje kod i śledzi co zostało wykonane. Wynik w folderze coverage/. Otwórz coverage/lcov-report/index.html w przeglądarce.`,tips:[`80%+ coverage to dobry cel dla większości projektów`,`Coverage ≠ dobre testy — można mieć 100% złych asercji`,`Czerwone linie w raporcie = nieobjęte testami`]}},{cmd:`npm test -- --watchAll=false`,desc:`Testy jednorazowo bez watch (CI)`,detail:{what:`Uruchamia wszystkie testy raz i kończy. Do użycia w pipeline CI/CD gdzie nie chcesz watch mode.`,how:`Domyślnie CRA uruchamia testy w watch mode jeśli jesteś w interaktywnym terminalu. --watchAll=false wymusza tryb jednorazowy.`,tips:[`Dodaj do package.json: "test:ci": "react-scripts test --watchAll=false"`,`Zwraca exit code 1 gdy testy padną — CI wychwytuje błąd`,`Dla Vitest użyj zamiast: npx vitest run`]}},{cmd:`npx vitest`,desc:`Vitest — szybki test runner dla Vite`,detail:{what:`Nowoczesny test runner zaprojektowany dla Vite. Dużo szybszy od Jest, natywnie rozumie ES modules i TypeScript bez konfiguracji.`,how:`Vitest używa tej samej konfiguracji Vite co dev. Testy w *.test.ts, *.spec.ts. Domyślnie watch mode.`,tips:[`describe(), it(), expect() — identyczne API jak Jest`,`Skonfiguruj w vite.config.ts: test: { environment: "jsdom" }`,`Dużo szybszy od Jest dla projektów TypeScript`]}},{cmd:`npx vitest run`,desc:`Vitest jednorazowo (CI)`,detail:{what:`Vitest w trybie CI — uruchamia testy raz i wychodzi z kodem 0 (sukces) lub 1 (błąd).`,how:`Bez watch mode. Idealny do GitHub Actions, GitLab CI i innych pipeline'ów.`,tips:[`W package.json: "test:ci": "vitest run"`,`Dodaj --reporter=verbose dla szczegółowych wyników w CI`]}},{cmd:`npx vitest --ui`,desc:`Vitest — graficzny UI w przeglądarce`,detail:{what:`Otwiera graficzny interfejs Vitest w przeglądarce. Widzisz listę testów, ich status, kod, coverage.`,how:`Vitest UI to web app działająca lokalnie. Możesz klikać testy, filtrować, widzieć szczegóły błędów.`,tips:[`Wymaga: npm install -D @vitest/ui`,`Świetne do debugowania konkretnych testów`,`Działa razem z watch mode`]}},{cmd:`npx vitest --coverage`,desc:`Vitest + raport pokrycia kodu`,detail:{what:`Vitest z raportem coverage — pokazuje które linie kodu są objęte testami.`,how:`Vitest używa @vitest/coverage-v8 lub @vitest/coverage-istanbul. Generuje raport w coverage/.`,tips:[`Wymaga: npm install -D @vitest/coverage-v8`,`Skonfiguruj progi: coverage: { thresholds: { lines: 80 } }`]}},{cmd:`npx playwright install`,desc:`Playwright — pobierz przeglądarki do testów e2e`,detail:{what:`Pobiera przeglądarki (Chromium, Firefox, WebKit) potrzebne do testów e2e Playwright. Pierwszy krok przed pisaniem testów.`,how:`Playwright steruje prawdziwymi przeglądarkami przez DevTools Protocol. Testy symulują realne kliknięcia, wpisywanie, nawigację.`,flags:[{flag:`chromium`,desc:`Tylko Chromium`},{flag:`firefox`,desc:`Tylko Firefox`},{flag:`--with-deps`,desc:`Zainstaluj systemowe zależności`}],tips:[`Przeglądarki lądują w ~/.cache/ms-playwright`,`Pierwszy install: może trwać kilka minut (pobiera ~300MB)`,`Bez tego kroku: npx playwright test zwróci błąd`]}},{cmd:`npx playwright test`,desc:`Uruchom testy e2e Playwright`,detail:{what:`Uruchamia testy end-to-end Playwright. Otwiera prawdziwe przeglądarki, klika po aplikacji, sprawdza wyniki.`,how:`Szuka plików *.spec.ts w folderze tests/ lub e2e/. Domyślnie headless (bez okna przeglądarki).`,flags:[{flag:`--headed`,desc:`Pokaż okno przeglądarki`},{flag:`--ui`,desc:`Graficzny interfejs do debugowania`},{flag:`--debug`,desc:`Debugger krok po kroku`},{flag:`--project=chromium`,desc:`Tylko konkretna przeglądarka`}],tips:[`npx playwright show-report — raport HTML po testach`,`Playwright vs Cypress: Playwright jest szybszy i obsługuje wiele zakładek`]}},{cmd:`npx cypress open`,desc:`Cypress — graficzny interfejs testów e2e`,detail:{what:`Otwiera graficzny interfejs Cypress. Widzisz aplikację i testy na żywo — możesz klikać po aplikacji i debugować testy interaktywnie.`,how:`Cypress uruchamia własną przeglądarkę. Time-travel debugging — możesz cofać się do każdego kroku testu i widzieć stan aplikacji.`,tips:[`Cypress vs Playwright: Cypress łatwiejszy na start, Playwright szybszy i bardziej zaawansowany`,`Testy lądują w cypress/e2e/`,`Świetne do nauki testowania bo widzisz co się dzieje`]}},{cmd:`npx cypress run`,desc:`Cypress headless — dla CI/CD`,detail:{what:`Uruchamia testy Cypress bez GUI. Zapisuje video i screenshoty. Dla pipeline'ów CI/CD.`,how:`Domyślnie używa Electron. Można wybrać Chrome lub Firefox.`,flags:[{flag:`--browser chrome`,desc:`Chrome zamiast Electron`},{flag:`--spec "cypress/e2e/login.cy.js"`,desc:`Tylko jeden plik testów`},{flag:`--headless`,desc:`Bez okna (domyślnie w cypress run)`}],tips:[`Video i screenshoty w cypress/videos/ i cypress/screenshots/`,`Dodaj do CI: npx cypress run --record żeby nagrywać w Cypress Cloud`]}},{cmd:`npm install -D vitest @vitest/ui jsdom`,desc:`Zainstaluj Vitest + jsdom (środowisko DOM)`,detail:{what:`Instaluje Vitest, jego graficzny UI i jsdom — symulację przeglądarki dla testów jednostkowych komponentów React.`,how:`jsdom implementuje DOM API w Node.js — dzięki temu testy React mogą renderować komponenty bez prawdziwej przeglądarki.`,tips:[`Po instalacji dodaj do vite.config.ts: test: { environment: "jsdom" }`,`jsdom ≠ prawdziwa przeglądarka — dla pełnych e2e użyj Playwright/Cypress`]}},{cmd:`npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event`,desc:`Testing Library — testuj komponenty jak użytkownik`,detail:{what:`Testing Library to zestaw narzędzi do testowania komponentów React z perspektywy użytkownika — nie implementacji. Klikasz, wpisujesz, sprawdzasz co widać na ekranie.`,how:`@testing-library/react = renderowanie komponentów w testach. @testing-library/jest-dom = dodatkowe matchery (toBeInTheDocument, toHaveValue). @testing-library/user-event = symulacja akcji użytkownika.`,tips:[`Filozofia: testuj co widzi użytkownik, nie szczegóły implementacji`,`getByRole, getByText zamiast getById — bardziej odporne na refaktor`,`userEvent.click() > fireEvent.click() — bardziej realistyczna symulacja`]}}]},{category:`Zarządzanie paczkami`,icon:`📦`,items:[{cmd:`npm install`,desc:`Zainstaluj wszystkie zależności z package.json`,detail:{what:`Instaluje wszystkie paczki zdefiniowane w package.json. Pierwsze co robisz po sklonowaniu cudzego repo.`,how:`npm czyta package.json, pobiera paczki z npmjs.com, instaluje dokładne wersje z package-lock.json (jeśli istnieje). Tworzy folder node_modules.`,tips:[`npm install = npm i (skrót)`,`Po git clone zawsze: npm install`,`node_modules NIGDY nie commituj — jest w .gitignore`,`Usuń node_modules i npm install od nowa jeśli coś dziwnego`]}},{cmd:`npm install react-router-dom`,desc:`Dodaj paczkę jako zależność produkcyjną`,detail:{what:`Dodaje paczkę do dependencies w package.json. Dependencies = paczki potrzebne w produkcji (kod który trafia do użytkownika).`,how:`npm pobiera paczkę i jej zależności, aktualizuje package.json (dodaje wpis) i package-lock.json (blokuje wersję).`,flags:[{flag:`-D lub --save-dev`,desc:`Dodaj jako devDependency (tylko dla developmentu)`},{flag:`@wersja`,desc:`react@18.2.0 — konkretna wersja`},{flag:`@latest`,desc:`Zawsze najnowsza wersja`},{flag:`--legacy-peer-deps`,desc:`Ignoruj konflikty peer deps`}],tips:[`dependencies = produkcja (np. react, axios)`,`devDependencies = tylko dev (np. vitest, eslint)`,`npm i pakiet@latest — gwarantuje najnowszą`]}},{cmd:`npm install -D vitest`,desc:`Dodaj paczkę jako devDependency`,detail:{what:`Dodaje paczkę do devDependencies — paczek używanych tylko podczas developmentu. Nie trafiają do produkcyjnego bundla.`,how:`-D = --save-dev. Paczka ląduje w sekcji devDependencies w package.json zamiast dependencies.`,tips:[`DevDeps: vitest, eslint, prettier, @types/*, storybook`,`Deps: react, axios, zustand, react-router-dom`,`npm install --production = zainstaluje tylko dependencies (pomija devDeps)`]}},{cmd:`npm uninstall nazwa-paczki`,desc:`Usuń paczkę z projektu`,detail:{what:`Usuwa paczkę z node_modules I z package.json jednocześnie. Jedyny prawidłowy sposób usuwania paczek.`,how:`npm usuwa folder paczki, aktualizuje package.json i package-lock.json. Opcjonalne zależności paczki zostają jeśli ktoś inny ich używa.`,tips:[`npm uninstall = npm un lub npm rm (skróty)`,`NIE usuwaj ręcznie z node_modules — użyj npm uninstall`,`Dodaj -D żeby usunąć z devDependencies: npm uninstall -D eslint`]}},{cmd:`npm update`,desc:`Zaktualizuj paczki (w ramach semver)`,detail:{what:`Aktualizuje zainstalowane paczki do najnowszych wersji ZGODNYCH z ograniczeniami w package.json.`,how:`Semver: ^18.0.0 = akceptuje 18.x.x ale nie 19.0.0. ~18.0.0 = tylko 18.0.x. npm update = max co semver pozwala.`,tips:[`Bezpieczne — nie łamie API (tylko patch i minor updates)`,`Dla major update: npm install pakiet@latest`,`npm outdated pokazuje co można zaktualizować przed update`]}},{cmd:`npm outdated`,desc:`Sprawdź które paczki mają nowsze wersje`,detail:{what:`Wyświetla tabelę paczek z dostępnymi nowszymi wersjami: Current (zainstalowana), Wanted (max semver), Latest (absolutnie najnowsza).`,how:`npm odpytuje rejestr npmjs.com i porównuje z zainstalowanymi wersjami.`,tips:[`Czerwone = chcesz update (w zakresie semver)`,`Żółte = dostępny update major`,`Sprawdzaj regularnie dla security patches`,`npm install pakiet@latest żeby przejść na najnowszą major`]}},{cmd:`npm audit`,desc:`Skanuj paczki pod kątem luk bezpieczeństwa`,detail:{what:`Skanuje zainstalowane paczki pod kątem znanych luk bezpieczeństwa (CVE). Raportuje severity: critical / high / moderate / low.`,how:`npm sprawdza package-lock.json względem bazy bezpieczeństwa npm (advisory database). Lista CVE aktualizowana na bieżąco.`,tips:[`Uruchamiaj przed deployem produkcyjnym`,`npm audit --json dla machine-readable output`,`Nie panikuj przy low/moderate — oceń czy twoja aplikacja jest podatna`]}},{cmd:`npm audit fix`,desc:`Automatycznie napraw luki bezpieczeństwa`,detail:{what:`Automatycznie aktualizuje zależności z lukami do bezpiecznych wersji.`,how:`npm stara się znaleźć i zainstalować wersje bez CVE. Może nie naprawić wszystkiego — niektóre wymagają major update.`,flags:[{flag:`--force`,desc:`Wymuś aktualizacje major (może złamać API!)`}],tips:[`Sprawdź zmiany po audit fix: npm test`,`--force to ostateczność — może zepsuć aplikację`,`Przejrzyj co zostało zmienione w package-lock.json`],note:`⚠️ --force może zmienić major wersje i złamać Twój kod. Testuj po użyciu.`}},{cmd:`npm install --legacy-peer-deps`,desc:`Instaluj mimo konfliktów peer dependencies`,detail:{what:`Instaluje paczki ignorując konflikty peer dependencies. Używaj gdy npm blokuje instalację z błędem o peer dep conflict.`,how:`npm 7+ jest rygorystyczny ws. peer deps. --legacy-peer-deps wraca do zachowania npm 6 gdzie konflikty były ignorowane (nie blokowane).`,tips:[`To obejście, nie naprawa — sprawdź czy paczki są naprawdę kompatybilne`,`Częsty problem: stare paczki z React 17 w projekcie React 18`,`Alternatywa: --force (bardziej agresywne)`],note:`⚠️ Użyj gdy wiesz co robisz — ignorowanie peer deps może powodować runtime błędy.`}},{cmd:`npm list --depth=0`,desc:`Lista zainstalowanych paczek (bez zagnieżdżeń)`,detail:{what:`Wyświetla zainstalowane paczki pierwszego poziomu — tylko twoje bezpośrednie zależności, bez ich zależności.`,how:`Bez --depth=0 widać całe drzewo — setki lub tysiące linii. depth=0 = tylko co masz w package.json.`,tips:[`npm list = npm ls (skrót)`,`npm list react — sprawdź wersję konkretnej paczki`,`npm list --global — globalnie zainstalowane paczki`]}},{cmd:`npm cache clean --force`,desc:`Wyczyść cache npm`,detail:{what:`Czyści lokalny cache npm (~/.npm). Rozwiązuje problemy z uszkodzonymi lub niekompletnymi paczkami.`,how:`npm cachuje pobrane paczki żeby nie pobierać ponownie przy kolejnym install. Czasem cache się psuje i powoduje dziwne błędy.`,tips:[`Używaj gdy: npm install się wiesza, błędy ENOENT, dziwne zachowanie po aktualizacji npm`,`Po clean następny npm install pobierze wszystko od nowa (wolniejszy)`,`Bezpieczne — cache można zawsze odbudować`]}}]},{category:`Popularne paczki UI`,icon:`🎨`,items:[{cmd:`npm install react-router-dom`,desc:`Routing — nawigacja między stronami`,detail:{what:`Routing dla React — zarządzanie ścieżkami URL. /home → <Home />, /users/1 → <UserProfile />. Bez tego aplikacja to jedna strona bez nawigacji.`,how:`Używa HTML5 History API. BrowserRouter otacza aplikację, Routes/Route definiują mapę URL→komponent. Link zamiast <a> — nie przeładowuje strony.`,tips:[`v7 jest aktualny (API zgodne z v6)`,`useNavigate() do programatycznej nawigacji`,`useParams() do czytania parametrów z URL (/users/:id)`]}},{cmd:`npm install zustand`,desc:`State management — prosty, ~1KB`,detail:{what:`Minimalistyczny globalny state management. Zastępuje Context + useReducer bez boilerplate. ~1KB gzip.`,how:`create() definiuje store ze stanem i akcjami. useStore() hook daje dostęp. Automatyczne re-rendery tylko gdy używany fragment stanu się zmienia.`,tips:[`Brak Provider! Store jest globalny przez import`,`Devtools: middleware devtools do Redux DevTools`,`Immer middleware dla mutacji: set(state => { state.count++ })`]}},{cmd:`npm install @reduxjs/toolkit react-redux`,desc:`Redux Toolkit — enterprise state management`,detail:{what:`Redux Toolkit to oficjalny, nowoczesny sposób pisania Reduxa. Eliminuje ~70% boilerplate starego Reduxa. Dla dużych aplikacji z wieloma developerami.`,how:`createSlice() generuje reducer + action creators. configureStore() łączy wszystko. Immer wbudowany — możesz "mutować" state bezpośrednio.`,tips:[`Zustand dla małych-średnich projektów, RTK dla dużych teamów`,`Redux DevTools Extension — time-travel debugging`,`RTK Query wbudowany — odpowiednik TanStack Query`]}},{cmd:`npm install @tanstack/react-query`,desc:`Server state — dane z API z cache`,detail:{what:`Zarządza danymi z API: cache, automatyczny refetch, loading/error state, retry, optimistic updates. Zastępuje useEffect + useState do fetchowania.`,how:`useQuery() pobiera i cachuje dane. useMutation() do POST/PUT/DELETE. QueryClient zarządza globalnym cache. staleTime kontroluje jak długo dane są "świeże".`,tips:[`Wrap aplikacji w <QueryClientProvider client={queryClient}>`,`queryKey to unikalna tablica — klucz cache`,`Devtools: npm install -D @tanstack/react-query-devtools`,`staleTime: 5 * 60 * 1000 = dane świeże przez 5 minut`]}},{cmd:`npm install jotai`,desc:`Atomowy state management`,detail:{what:`State management oparty na atomach — małych kawałkach stanu. Każdy komponent subskrybuje tylko atomy których używa.`,how:`atom() definiuje kawałek stanu. useAtom() = jak useState ale globalny. Atomy można łączyć i derywować z innych atomów.`,tips:[`Prostszy model niż Redux, podobny do Recoil`,`atom(get => get(aAtom) + get(bAtom)) = derived atom`,`Brak boilerplate — atom + useAtom i gotowe`]}},{cmd:`npm install axios`,desc:`HTTP client — alternatywa dla fetch`,detail:{what:`Biblioteka do zapytań HTTP. Automatycznie parsuje JSON, obsługuje błędy, interceptory, timeout, cancel token.`,how:`Wrappuje fetch/XMLHttpRequest. Zwraca Promise z { data, status, headers }. Błędy HTTP (404, 500) automatycznie rzucają wyjątek (fetch tego nie robi!).`,tips:[`axios.get/post/put/delete — metody HTTP`,`Interceptory: axios.interceptors.request.use() — dodaj token auth do każdego requesta`,`Twórz instancje: axios.create({ baseURL: "/api" })`]}},{cmd:`npm install react-hook-form`,desc:`Wydajne formularze z minimalną liczbą re-renderów`,detail:{what:`Biblioteka do formularzy w React. Używa uncontrolled inputs (ref zamiast state) — zero re-renderów przy wpisywaniu. Integruje się z Zod do walidacji.`,how:`useForm() zwraca register (łączy input z formularzem), handleSubmit, formState. Walidacja przy submit lub onChange.`,tips:[`react-hook-form + zod = potężna kombinacja do typowanej walidacji`,`register("email") zamiast useState + onChange`,`formState.errors.email?.message — błędy walidacji`]}},{cmd:`npm install zod`,desc:`Walidacja danych + automatyczne typy TypeScript`,detail:{what:`Biblioteka do walidacji i parsowania danych z TypeScript-first podejściem. Definiujesz schemat → automatycznie infurujesz typ TypeScript.`,how:`z.object() tworzy schemat. .parse() rzuca błąd jeśli dane nie pasują. .safeParse() zwraca {success, data/error}. z.infer<typeof schema> = typ TS.`,tips:[`Idealna para: react-hook-form + zodResolver(schema)`,`Używaj do walidacji odpowiedzi API — upewnij się że backend zwraca to co myślisz`,`z.string().email().min(5) — chain walidatorów`]}},{cmd:`npm install framer-motion`,desc:`Animacje i przejścia komponentów`,detail:{what:`Biblioteka animacji dla React. Deklaratywne animacje, physics-based spring animations, layout animations, gesture handling.`,how:`<motion.div animate={{ opacity: 1 }}> zamiast CSS transitions. AnimatePresence do animowania unmount komponentów.`,tips:[`<motion.div whileHover={{ scale: 1.1 }}> — hover animacja`,`AnimatePresence = animuj wyjście komponentów`,`Warianty: definiuj stany animacji i przełączaj je`]}},{cmd:`npm install tailwindcss @tailwindcss/vite`,desc:`Tailwind CSS — utility-first styling`,detail:{what:`CSS framework oparty na klasach narzędziowych. Budujesz UI bezpośrednio w JSX przez klasy: className="flex items-center gap-4 bg-blue-500 text-white p-4 rounded-lg".`,how:`Tailwind generuje tylko CSS klas których używasz (tree shaking). Wynik: minimalne pliki CSS w produkcji.`,tips:[`Zainstaluj rozszerzenie Tailwind CSS IntelliSense w VS Code`,`cn() z clsx lub tailwind-merge do warunkowych klas`,`tailwind.config.ts do rozszerzania motywu (kolory, fonty)`]}},{cmd:`npm install @mui/material @emotion/react @emotion/styled`,desc:`Material UI — gotowe komponenty Google Material Design`,detail:{what:`Kompletna biblioteka komponentów UI w stylu Google Material Design. Button, TextField, Dialog, Table, DatePicker i 50+ innych — wszystko gotowe.`,how:`@emotion = CSS-in-JS engine pod spodem MUI. @mui/material = komponenty. Duży bundle ale bogaty ekosystem.`,tips:[`Opatrz całą aplikację w <ThemeProvider theme={theme}>`,`Customizacja: sx prop lub createTheme()`,`MUI v5+ używa emotion — nie mylić z starym JSS`]}},{cmd:`npm install @radix-ui/react-dialog`,desc:`Radix UI — dostępne prymitywy komponentów`,detail:{what:`Nieostylowane, ale w pełni dostępne (a11y) prymitywy UI. Dialog, Dropdown, Tooltip, Select — logika bez narzuconego wyglądu. Styluj sam.`,how:`Każdy prymityw to osobna paczka. Obsługuje keyboard navigation, screen readers, focus management automatycznie.`,tips:[`Idealne razem z Tailwind — logika z Radix, style z Tailwind`,`shadcn/ui = gotowe komponenty oparte na Radix + Tailwind`,`Dostępność (ARIA) obsługiwana automatycznie`]}},{cmd:`npm install lucide-react`,desc:`Ikony SVG dla React`,detail:{what:`1000+ ikon SVG jako komponenty React. Lekkie, tree-shakeable, łatwe w customizacji.`,how:`Każda ikona to osobny komponent SVG. Importujesz tylko te których używasz — reszta nie trafia do bundla.`,tips:[`import { Home, Settings, User } from "lucide-react"`,`<Home size={24} color="#fff" strokeWidth={1.5} />`,`Alternatywy: react-icons (5000+ ikon, ale większe), heroicons`]}},{cmd:`npm install date-fns`,desc:`Manipulacja datami — lekka alternatywa dla moment.js`,detail:{what:`Biblioteka do pracy z datami: formatowanie, parsowanie, obliczenia (addDays, differenceInDays, isAfter). Tree-shakeable — płacisz tylko za to czego używasz.`,how:`Czyste funkcje (nie mutują). Każda funkcja to osobny import.`,tips:[`format(new Date(), "dd.MM.yyyy") = "05.06.2026"`,`Alternatywy: dayjs (mniejsza), Temporal API (nadchodzi w JS)`,`Unikaj moment.js — 67KB gzip, deprecated`]}},{cmd:`npm install react-hot-toast`,desc:`Powiadomienia toast — lekkie i piękne`,detail:{what:`Minimalistyczna biblioteka do powiadomień (toastów). Mały bundle, obsługuje promise, emoji, custom style.`,how:`Dodaj <Toaster /> do root. Wywołaj toast("Sukces!") z dowolnego miejsca.`,tips:[`toast.success("Zapisano!"), toast.error("Błąd!")`,`toast.promise(fetchData(), { loading: "...", success: "OK", error: "Błąd" })`,`Alternatywy: sonner, react-toastify`]}}]},{category:`Analiza bundla`,icon:`📊`,items:[{cmd:`npm install -D source-map-explorer`,desc:`Analizuj rozmiar bundla CRA`,detail:{what:`Narzędzie do analizy rozmiaru bundla — pokazuje treemap ile miejsca zajmuje każda paczka i plik. Pomaga znaleźć "pożeracze" rozmiaru.`,how:`Odczytuje source mapy generowane przez build. Wynik to interaktywna mapa treemap w przeglądarce.`,tips:[`Po instalacji: npx source-map-explorer build/static/js/*.js`,`Typowe odkrycia: lodash zamiast lodash-es, moment.js (użyj date-fns), duplikaty paczek`,`Duży kwadrat = kandydat do lazy loading lub zastąpienia`]}},{cmd:`npx source-map-explorer build/static/js/*.js`,desc:`Uruchom analizę bundla (CRA)`,detail:{what:`Otwiera interaktywną wizualizację zawartości bundla CRA. Widzisz co zajmuje ile bajtów.`,how:`Parsuje source mapy z folderu build/static/js/. Każdy plik i paczka ma swój prostokąt proporcjonalny do rozmiaru.`,tips:[`Uruchom npm run build przed tym poleceniem`,`Szukaj nieoczekiwanych dużych paczek`,`Vite odpowiednik: rollup-plugin-visualizer`]}},{cmd:`npm install -D rollup-plugin-visualizer`,desc:`Wizualizacja bundla Vite`,detail:{what:`Plugin Vite/Rollup generujący interaktywną mapę rozmiaru bundla. Odpowiednik source-map-explorer dla projektów Vite.`,how:`Dodaj do vite.config.ts: import { visualizer } from "rollup-plugin-visualizer"; plugins: [visualizer({ open: true })]. Po build automatycznie otwiera stats.html.`,tips:[`open: true = automatycznie otwórz po build`,`gzipSize: true = pokaż rozmiar po kompresji (bardziej realistyczny)`,`Szukaj dużych kwadratów — dynamiczny import() dzieli je na osobne chunki`]}},{cmd:`npm run build -- --mode analyze`,desc:`Build z raportem bundle size`,detail:{what:`Uruchamia build z trybem "analyze" — jeśli skonfigurowany, generuje raport rozmiaru bundla.`,how:`Wymaga konfiguracji w vite.config.ts: jeśli mode === "analyze", dodaj plugin visualizer.`,tips:[`Musi być skonfigurowany ręcznie w vite.config.ts`,`Alternatywa: zawsze miej visualizer w pluginach z opcją open: process.env.ANALYZE`]}},{cmd:`npx bundlephobia nazwa-paczki`,desc:`Sprawdź rozmiar paczki PRZED instalacją`,detail:{what:`Sprawdza rozmiar paczki npm zanim ją zainstalujesz — minified + gzip size, czas ładowania na różnych połączeniach.`,how:`Pobiera paczkę, buduje ją i mierzy rozmiar. Używa API bundlephobia.com.`,tips:[`Alternatywa: bundlephobia.com w przeglądarce`,`Zawsze sprawdź przed instalacją — moment.js to 67KB gzip!`,`Szukaj "tree-shakeable" w opisie — płacisz tylko za to czego używasz`]}}]},{category:`Deploy`,icon:`🚢`,items:[{cmd:`npx vercel`,desc:`Deploy na Vercel (preview)`,detail:{what:`Deployuje aplikację na Vercel — platformę hostingową od twórców Next.js. Automatycznie wykrywa framework (Vite, Next, CRA) i konfiguruje build.`,how:`Vercel buduje aplikację na swoich serwerach, deployuje na globalny CDN. Każdy deploy dostaje unikalny URL.`,tips:[`Pierwsze użycie: vercel login`,`Bez --prod = deploy preview (do testowania)`,`Połącz repo GitHub: każdy push na main = auto deploy`,`Darmowy tier: 100GB bandwidth/miesiąc`]}},{cmd:`npx vercel --prod`,desc:`Deploy produkcyjny na Vercel`,detail:{what:`Deploy na produkcyjny URL (twoja-apka.vercel.app). Bez --prod Vercel tworzy preview URL (twoja-apka-abc123.vercel.app).`,how:`Promuje build do produkcji. Vercel zachowuje poprzednie deploye — możesz rollback jednym kliknięciem w dashboardzie.`,tips:[`Upewnij się że build przechodzi lokalnie przed --prod`,`Sprawdź environment variables w Vercel Dashboard`,`Instant rollback: vercel rollback w przypadku problemów`]}},{cmd:`npx netlify deploy`,desc:`Deploy na Netlify (draft)`,detail:{what:`Deploy na Netlify — alternatywna platforma hostingowa. Tworzy draft deploy z unikalnym URL do podglądu.`,how:`Netlify serwuje statyczne pliki z CDN. Plik netlify.toml do konfiguracji build command i publish directory.`,flags:[{flag:`--prod`,desc:`Deploy produkcyjny`},{flag:`--dir dist`,desc:`Wskaż folder (domyślnie pyta)`}],tips:[`netlify login — pierwsze użycie`,`netlify.toml: [build] command = "npm run build" publish = "dist"`,`Netlify Functions = serverless functions bez dodatkowej konfiguracji`]}},{cmd:`npx netlify deploy --prod`,desc:`Deploy produkcyjny na Netlify`,detail:{what:`Publikuje na produkcyjnym URL Netlify. Bez --prod to tylko draft.`,how:`Netlify wysyła pliki z folderu dist/ lub build/ na CDN i aktualizuje produkcyjny URL.`,tips:[`Darmowy tier: 100GB/miesiąc`,`Formularz bez backendu: Netlify Forms (dodaj netlify do <form>)`,`Zmienne środowiskowe: Site Settings → Environment Variables`]}},{cmd:`npm install -D gh-pages`,desc:`GitHub Pages — zainstaluj narzędzie deploy`,detail:{what:`Instaluje gh-pages — narzędzie do publikowania na GitHub Pages. Darmowy hosting statycznych stron bezpośrednio z repozytorium GitHub.`,how:`gh-pages tworzy lub aktualizuje branch gh-pages w repozytorium, pushuje tam zawartość dist/. GitHub automatycznie serwuje ten branch.`,tips:[`Po instalacji dodaj do package.json scripts: "deploy": "npm run build && gh-pages -d dist"`,`W vite.config.ts ustaw: base: "/nazwa-repo/" (ważne!)`,`URL: https://username.github.io/nazwa-repo/`],note:`⚠️ Ustaw base w vite.config.ts! Bez tego assety nie załadują się na GitHub Pages.`}},{cmd:`npx gh-pages -d dist`,desc:`GitHub Pages — opublikuj dist/ (Vite)`,detail:{what:`Publikuje folder dist/ na branch gh-pages → automatycznie dostępne na GitHub Pages. Dla projektów Vite.`,how:`gh-pages commituje zawartość dist/ na branch gh-pages. GitHub serwuje ten branch przez CDN.`,tips:[`Zawsze uruchom npm run build przed gh-pages`,`Może minąć 1-2 minuty zanim zmiany będą widoczne`,`Sprawdź repo Settings → Pages → Source = gh-pages branch`]}},{cmd:`npx gh-pages -d build`,desc:`GitHub Pages — opublikuj build/ (CRA)`,detail:{what:`To samo co gh-pages -d dist ale dla projektów CRA które budują do folderu build/ zamiast dist/.`,how:`Identyczne działanie — różni się tylko nazwa folderu wyjściowego.`,tips:[`CRA → build/, Vite → dist/`,`W CRA ustaw "homepage" w package.json: "https://username.github.io/repo"`]}}]},{category:`Jakość kodu`,icon:`🔧`,items:[{cmd:`npm run lint`,desc:`Uruchom ESLint — znajdź problemy w kodzie`,detail:{what:`Uruchamia ESLint — statyczny analizator kodu. Wykrywa błędy, problematyczne wzorce (unused vars, missing deps w useEffect), wymusza styl.`,how:`ESLint czyta konfigurację (eslint.config.js). Analizuje pliki bez uruchamiania kodu.`,tips:[`Dodaj do scripts: "lint": "eslint src --ext .js,.jsx,.ts,.tsx"`,`Vite generuje podstawową konfigurację ESLint`,`Disable dla linii: // eslint-disable-next-line`]}},{cmd:`npx eslint . --fix`,desc:`ESLint z auto-naprawą problemów`,detail:{what:`ESLint automatycznie poprawia co da się naprawić: formatowanie, cudzysłowy, średniki, import ordering. Problemy logiczne musisz naprawić ręcznie.`,how:`Nie wszystko da się auto-naprawić. Fixable = problemy ze stylem. Unfixable = logiczne błędy (react-hooks/exhaustive-deps, unused vars).`,tips:[`Sprawdź co zmieniło: git diff po --fix`,`--fix-dry-run = pokaż co by naprawił bez zmian`,`Uruchom przed committem żeby wyczyścić styl`]}},{cmd:`npx prettier --write .`,desc:`Prettier — sformatuj cały projekt`,detail:{what:`Prettier formatuje cały kod w projekcie: wcięcia, długość linii, cudzysłowy, przecinki. Jedno źródło prawdy dla stylu — koniec z dyskusjami o formatowaniu.`,how:`Prettier parsuje kod i regeneruje go od zera według swoich reguł. Deterministyczny — zawsze ten sam wynik niezależnie od autora.`,tips:[`Konfiguracja: .prettierrc: {"semi": false, "singleQuote": true, "tabWidth": 2}`,`.prettierignore: pomiń node_modules, dist, .env`,`VS Code: Format on Save z Prettier extension`]}},{cmd:`npx prettier --check .`,desc:`Prettier — sprawdź formatowanie (CI)`,detail:{what:`Sprawdza czy kod jest sformatowany przez Prettier BEZ zmian. Dla pipeline'ów CI/CD — blokuje nieoformatowany kod.`,how:`Zwraca exit code 1 jeśli cokolwiek wymaga formatowania. CI widzi błąd i blokuje merge.`,tips:[`Dodaj do CI: npx prettier --check . || exit 1`,`Lokalnie: uruchom --write, commit formatuje CI --check`,`Dobre jako pre-commit hook z husky`]}},{cmd:`npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks`,desc:`Zainstaluj ESLint z pluginami React`,detail:{what:`Instaluje ESLint i pluginy specyficzne dla React: eslint-plugin-react (reguły komponentów) i eslint-plugin-react-hooks (reguły hooków — brakujące zależności useEffect).`,how:`eslint-plugin-react-hooks/exhaustive-deps to jeden z najważniejszych pluginów — wykrywa brakujące zależności w tablicy deps useEffect.`,tips:[`eslint-plugin-react-hooks jest KLUCZOWY — ratuje przed subtelnym bugami`,`Vite dodaje ESLint domyślnie w projektach TS`,`Sprawdź eslint.config.js po instalacji`]}},{cmd:`npm install -D prettier eslint-config-prettier`,desc:`Prettier + integracja z ESLint`,detail:{what:`Prettier do formatowania + eslint-config-prettier wyłącza reguły ESLint które kolidują z Prettier. Obie działają razem bez konfliktu.`,how:`eslint-config-prettier wyłącza wszystkie reguły ESLint dotyczące formatowania. Prettier przejmuje formatowanie, ESLint zajmuje się logiką.`,tips:[`Dodaj do eslint.config.js: extends: ["prettier"]`,`Jeśli ESLint i Prettier się kłócą — eslint-config-prettier to fix`,`eslint-plugin-prettier — opcjonalnie: Prettier jako reguła ESLint`]}},{cmd:`npx storybook@latest init`,desc:`Storybook — inicjalizuj środowisko komponentów`,detail:{what:`Instaluje i konfiguruje Storybook — izolowane środowisko do developmentu i dokumentacji komponentów. Budujesz komponenty bez uruchamiania całej apki.`,how:`Storybook automatycznie wykrywa framework (React, Vite/webpack) i konfiguruje się. Tworzy folder .storybook/ z konfiguracją.`,tips:[`Story = jeden stan komponentu: <Button variant="primary" disabled />  `,`Świetne do design systems i bibliotek komponentów`,`Obsługuje: React, Vue, Angular, Svelte, Web Components`]}},{cmd:`npm run storybook`,desc:`Storybook — uruchom dev server`,detail:{what:`Uruchamia Storybook dev server na porcie 6006. Widzisz wszystkie story (stany komponentów) w przeglądarce.`,how:`Storybook kompiluje story i serwuje własne środowisko. Zmiany w komponentach odświeżają się przez HMR.`,tips:[`http://localhost:6006 domyślnie`,`Dodawaj story w plikach *.stories.tsx obok komponentów`,`Controls panel = zmieniaj propsy komponentu na żywo`]}},{cmd:`npm run build-storybook`,desc:`Storybook — zbuduj statyczną dokumentację`,detail:{what:`Buduje Storybook jako statyczną stronę HTML w folderze storybook-static/. Możesz ją hostować jako dokumentację komponentów dla całego teamu.`,how:`Wynik to statyczny HTML/JS/CSS — możesz deployować na Vercel, Netlify, GitHub Pages.`,tips:[`Deploy na Chromatic (platforma dla Storybook): npx chromatic`,`Dobra dokumentacja dla teamów designerów i developerów`,`Snapshot testing przez Chromatic — wykrywa wizualne regresje`]}},{cmd:`React DevTools (Chrome/Firefox extension)`,desc:`Inspektor komponentów, state, props i profiler`,detail:{what:`Rozszerzenie przeglądarki do debugowania aplikacji React. Widzisz drzewo komponentów, state każdego komponentu, props, context i możesz profilować wydajność.`,how:`DevTools dodają dwie zakładki w Chrome DevTools: ⚛️ Components (drzewo, state, props) i ⚛️ Profiler (gdzie traci czas rendering).`,tips:[`Zainstaluj: "React Developer Tools" w Chrome Web Store`,`Components: kliknij komponent → edytuj state i props na żywo`,`Profiler: nagraj sesję → znajdź wolno renderujące komponenty`,`Highlight Updates: włącz żeby widzieć które komponenty się re-renderują`]}}]}],Zt={meta:{id:`react`,name:`React`,icon:`⚛️`,color:`#61dafb`,color2:`#7c5af7`,tagline:`Biblioteka UI do budowania interfejsów użytkownika`,year:2013,author:`Meta (Facebook)`,lang:`JavaScript / TypeScript`,github:`facebook/react`,stars:`220k+`,codeLang:`JSX`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Komponenty`},{id:`hooki`,label:`Hooki`},{id:`routing`,label:`Routing`},{id:`state`,label:`State`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać React?`,firstComponent:`Twój pierwszy komponent`,firstComponentLang:`JSX`},intro:{title:`Czym jest React?`,desc:`React to deklaratywna biblioteka JavaScript do budowania interfejsów użytkownika. Stworzona przez Meta w 2013 roku, jest dziś najpopularniejszym narzędziem frontendowym na świecie — używana przez Facebook, Instagram, Airbnb, Netflix i tysiące innych produktów.`},concepts:[{title:`Virtual DOM`,desc:`React utrzymuje lekką kopię DOM w pamięci. Gdy coś się zmienia, porównuje nowy Virtual DOM ze starym (diffing) i aktualizuje tylko zmienione fragmenty prawdziwego DOM — to sprawia że UI jest szybkie.`,icon:`🧠`},{title:`Komponenty`,desc:`UI dzielisz na małe, wielokrotnego użytku kawałki zwane komponentami. Każdy komponent to funkcja która przyjmuje dane (props) i zwraca JSX — opis tego co ma się wyświetlić.`,icon:`🧩`},{title:`Jednokierunkowy przepływ danych`,desc:`Dane w React płyną zawsze z góry do dołu — od komponentu rodzica do dzieci przez props. To ułatwia debugowanie bo zawsze wiesz skąd dane przyszły.`,icon:`↓`},{title:`JSX`,desc:`JSX to rozszerzenie składni JavaScript które wygląda jak HTML. Piszesz tagi (div, h1, MyComponent) bezpośrednio w JS — Babel kompiluje to do React.createElement() wywołań.`,icon:`📝`}],whenToUse:[`Aplikacje SPA (Single Page Application)`,`Dashboardy i panele admina`,`Sklepy internetowe i marketplace`,`Duże zespoły — komponentowa architektura skaluje się dobrze`,`Gdy potrzebujesz bogatego ekosystemu (Next.js, React Native, biblioteki)`],firstComponent:`function Powitanie({ imie }) {
  return (
    <div className="powitanie">
      <h1>Cześć, {imie}! 👋</h1>
      <p>To jest twój pierwszy komponent React.</p>
    </div>
  );
}

// Użycie:
<Powitanie imie="Łukasz" />`},komponenty:[{title:`Komponent funkcyjny (standard)`,desc:`Nowoczesny sposób pisania komponentów. Zwykła funkcja JavaScript która zwraca JSX. Używaj zawsze — klasy są legacy.`,code:`function UserCard({ name, email, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}`},{title:`Props — przekazywanie danych`,desc:`Props to dane przekazywane z rodzica do dziecka. Są readonly — komponent nie może ich modyfikować.`,code:`// Rodzic
<Button color="blue" size="lg" onClick={handleClick}>
  Kliknij mnie
</Button>

// Komponent Button
function Button({ color, size, onClick, children }) {
  return (
    <button
      className={\`btn btn-\${color} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`},{title:`Children — kompozycja komponentów`,desc:`Specjalny prop children pozwala zagnieżdżać komponenty jak HTML. Klucz do budowania elastycznych, wielokrotnego użytku layoutów.`,code:`function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Użycie:
<Card title="Profil">
  <Avatar />
  <UserInfo />
</Card>`},{title:`Renderowanie warunkowe`,desc:`React nie ma specjalnej składni dla if/else w JSX — używasz zwykłego JS: operator trójkowy, &&, lub zmienne.`,code:`function Status({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Witaj, {userName}!</p>
      ) : (
        <button>Zaloguj się</button>
      )}

      {/* Pokaż tylko gdy true */}
      {isLoggedIn && <LogoutButton />}
    </div>
  );
}`},{title:`Renderowanie list`,desc:`Listy renderujesz przez .map(). Każdy element musi mieć unikalny prop key — React używa go do optymalnego re-renderowania.`,code:`function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  );
}`},{title:`Formularze — controlled components`,desc:`W React formularz kontrolujesz przez state — każda zmiana inputa aktualizuje state, a state kontroluje wartość inputa. Pełna kontrola nad danymi.`,code:`function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Hasło"
      />
      <button type="submit">Zaloguj</button>
    </form>
  );
}`}],hooki:[{name:`useState`,desc:`Lokalny stan komponentu. Zwraca parę: wartość i funkcję do jej aktualizacji. Re-renderuje komponent gdy stan się zmienia.`,when:`Dane które się zmieniają i wpływają na UI (licznik, formularz, toggle)`,code:`const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);

// Aktualizacja
setCount(count + 1);
setCount(prev => prev + 1); // bezpieczniejsze`},{name:`useEffect`,desc:`Synchronizuje komponent z zewnętrznym systemem — fetch, subskrypcje, DOM. ⚠️ W React 18 Strict Mode efekt odpala się DWA RAZY w dev (mount → unmount → mount) — cleanup musi działać poprawnie.`,when:`Fetch API, timery, event listenery, synchronizacja z zewnętrznymi systemami`,code:`// Przy każdym renderze
useEffect(() => { ... });

// Tylko przy montowaniu (⚠️ 2x w Strict Mode dev)
useEffect(() => { ... }, []);

// Gdy zmieni się userId
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

// Z cleanup — WYMAGANY dla subskrypcji/timerów
useEffect(() => {
  const sub = subscribe(channel);
  return () => sub.unsubscribe(); // cleanup
}, [channel]);`},{name:`useContext`,desc:`Dostęp do kontekstu bez prop drillingu. Pozwala przekazywać dane przez całe drzewo komponentów bez ręcznego przekazywania przez każdy poziom.`,when:`Motyw, język, zalogowany użytkownik — dane potrzebne wszędzie`,code:`const ThemeContext = createContext('light');

// Provider (wyżej w drzewie)
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Konsumpcja (gdziekolwiek w drzewie)
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Klik</button>;
}`},{name:`useRef`,desc:`Referencja która nie powoduje re-renderu. Dwa zastosowania: dostęp do elementu DOM i przechowywanie wartości między renderami.`,when:`Focus na input, animacje, integracja z bibliotekami DOM, timery`,code:`// Dostęp do DOM
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// Wartość bez re-renderu
const countRef = useRef(0);
countRef.current++; // nie re-renderuje`},{name:`useMemo`,desc:`Memoizuje wynik drogiego obliczenia. Przelicza tylko gdy zmienią się zależności. ⚠️ React nie gwarantuje zachowania cache — to hint dla wydajności, nie kontrakt. Nie używaj przedwcześnie.`,when:`Ciężkie obliczenia (filtrowanie dużych list, transformacje danych) wywoływane często`,code:`const filteredUsers = useMemo(() => {
  return users.filter(u =>
    u.name.toLowerCase().includes(query)
  );
}, [users, query]); // przelicz tylko gdy zmieni się users lub query`},{name:`useCallback`,desc:`Memoizuje funkcję. Zwraca tę samą referencję funkcji między renderami. ⚠️ Działa tylko gdy dziecko jest opakowane w React.memo() — bez tego i tak się re-renderuje.`,when:`Callbacki przekazywane do React.memo() komponentów lub jako zależności useEffect`,code:`const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // pusta lista = ta sama funkcja zawsze

<ExpensiveList onDelete={handleDelete} />`},{name:`useReducer`,desc:`Zaawansowane zarządzanie stanem przez reducer pattern (jak Redux ale lokalnie). Lepsze od useState gdy logika jest złożona lub powiązana.`,when:`Formularze z wieloma polami, stan z wieloma akcjami, gdy useState robi się nieczytelny`,code:`const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'RESET':     return { count: 0 };
    default:          return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });`},{name:`useId`,desc:`Generuje stabilne, unikalne ID które jest spójne między server-side i client-side renderowaniem. React 18+.`,when:`Łączenie label z inputem, atrybuty aria-* wymagające unikalnego ID`,code:`function FormField({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}`},{name:`Custom Hook`,desc:`Własny hook to funkcja zaczynająca się od "use" która może używać innych hooków. Pozwala wydzielić i re-używać logikę stanową.`,when:`Gdy ta sama logika pojawia się w wielu komponentach`,code:`// Custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Użycie
const { data, loading } = useFetch('/api/users');`}],...Jt,...Yt,komendy:Xt}},Qt={routing:{install:`pip install fastapi uvicorn[standard]`,version:`FastAPI 0.110+ / Pydantic v2`,sections:[{title:`Pydantic BaseModel — walidacja danych`,code:`from pydantic import BaseModel, Field, field_validator

class ScrapingJob(BaseModel):
    url: str = Field(..., description="URL do scrapowania")
    depth: int = Field(default=1, ge=1, le=5)
    timeout: float = Field(default=30.0, gt=0)
    tags: list[str] = []

    @field_validator('url')
    @classmethod
    def url_must_be_http(cls, v):
        if not v.startswith(('http://', 'https://')):
            raise ValueError('URL musi zaczynać się od http(s)://')
        return v

# FastAPI automatycznie waliduje i zwraca 422 przy błędzie`},{title:`Query Parameters z walidacją`,code:`from fastapi import FastAPI, Query
from typing import Annotated

app = FastAPI()

@app.get("/items")
def list_items(
    q: Annotated[str | None, Query(min_length=3, max_length=50)] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    tags: list[str] = Query(default=[])
):
    # FastAPI waliduje: limit musi być 1-100
    # q musi mieć 3-50 znaków (lub być None)
    return {"q": q, "limit": limit, "tags": tags}`},{title:`Nested Models — zagnieżdżone modele`,code:`from pydantic import BaseModel

class Address(BaseModel):
    street: str
    city: str
    country: str = "PL"

class Company(BaseModel):
    name: str
    address: Address         # zagnieżdżony model
    employees: list[str] = []

@app.post("/companies")
def create_company(company: Company):
    # Pydantic waliduje rekurencyjnie
    return company.model_dump()`},{title:`Enum jako parametr`,code:`from enum import Enum
from fastapi import FastAPI

class ScrapingMode(str, Enum):
    fast = "fast"
    deep = "deep"
    stealth = "stealth"

app = FastAPI()

@app.get("/scrape/{mode}")
def scrape(mode: ScrapingMode):
    # FastAPI waliduje: tylko "fast", "deep", "stealth"
    # Swagger pokazuje dropdown z opcjami
    if mode == ScrapingMode.stealth:
        return {"headers": "rotated", "delay": "random"}
    return {"mode": mode}`},{title:`File Upload — wgrywanie plików`,code:`from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    return {
        "filename": file.filename,
        "size": len(contents),
        "content_type": file.content_type
    }

@app.post("/upload-multiple")
async def upload_multiple(files: list[UploadFile] = File(...)):
    return [{"filename": f.filename} for f in files]`},{title:`Custom Response — zwracanie różnych formatów`,code:`from fastapi import FastAPI
from fastapi.responses import (
    JSONResponse, HTMLResponse,
    StreamingResponse, FileResponse
)

app = FastAPI()

@app.get("/html", response_class=HTMLResponse)
def get_html():
    return "<h1>Hello!</h1>"

@app.get("/download")
def download_file():
    return FileResponse("data.csv", filename="export.csv")

@app.get("/stream")
def stream_data():
    def generator():
        for i in range(100):
            yield f"data: {i}\\n\\n"
    return StreamingResponse(generator(), media_type="text/event-stream")`}]},state:[{name:`Synchroniczny endpoint`,icon:`🔄`,color:`#009688`,complexity:`Prosta`,bundle:`def (sync)`,when:`Szybkie operacje, bez I/O, prosta logika. FastAPI odpala w thread pool.`,code:`@app.get("/compute")
def heavy_compute(n: int):
    # CPU-bound — OK jako sync
    result = sum(i**2 for i in range(n))
    return {"result": result}`},{name:`Asynchroniczny endpoint`,icon:`⚡`,color:`#00bcd4`,complexity:`Średnia`,bundle:`async def`,when:`I/O-bound: HTTP requests, baza danych, Redis, pliki. Nie blokuje serwera podczas oczekiwania.`,code:`import httpx

@app.get("/fetch")
async def fetch_data(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
    # Podczas await — serwer obsługuje inne requesty`},{name:`asyncio.gather — równoległe requesty`,icon:`🚀`,color:`#4caf50`,complexity:`Średnia`,bundle:`asyncio`,when:`Scrapowanie wielu URLi naraz. 10 requestów równolegle zamiast sekwencyjnie.`,code:`import asyncio, httpx

@app.post("/scrape-many")
async def scrape_many(urls: list[str]):
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        # Wszystkie requesty lecą równolegle!
        responses = await asyncio.gather(*tasks)
    return [r.status_code for r in responses]`},{name:`asyncio.Queue — kolejka tasków`,icon:`📋`,color:`#ff9800`,complexity:`Wysoka`,bundle:`asyncio.Queue`,when:`Pipeline automatyzacji: producent dodaje zadania, worker je przetwarza w tle.`,code:`queue = asyncio.Queue()

async def worker():
    while True:
        task = await queue.get()
        await process_task(task)
        queue.task_done()

@app.on_event("startup")
async def start_worker():
    asyncio.create_task(worker())

@app.post("/tasks")
async def add_task(url: str):
    await queue.put(url)
    return {"queued": url, "size": queue.qsize()}`},{name:`Redis + aioredis — async cache`,icon:`🔴`,color:`#ef5350`,complexity:`Średnia`,bundle:`redis.asyncio`,when:`Cache wyników scrapowania. Nie scraper tego samego URL dwa razy w ciągu godziny.`,code:`import redis.asyncio as aioredis

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = await aioredis.from_url("redis://localhost")
    yield
    await app.state.redis.close()

@app.get("/scrape")
async def scrape_cached(url: str, request: Request):
    r = request.app.state.redis
    cached = await r.get(url)
    if cached:
        return {"source": "cache", "data": cached}

    data = await fetch(url)
    await r.set(url, data, ex=3600)  # cache 1h
    return {"source": "fresh", "data": data}`},{name:`WebSockets — live updates`,icon:`🔌`,color:`#9c27b0`,complexity:`Wysoka`,bundle:`WebSocket`,when:`Live status scrapowania, streaming wyników agenta AI do frontendu.`,code:`from fastapi import WebSocket

@app.websocket("/ws/scrape")
async def websocket_scrape(ws: WebSocket):
    await ws.accept()
    urls = await ws.receive_json()

    for url in urls:
        result = await scrape(url)
        await ws.send_json({
            "url": url,
            "status": "done",
            "data": result
        })

    await ws.close()`}]},$t={rywale:[{name:`Flask`,icon:`🌶️`,color:`#a0a0a0`,tagline:`Mikro-framework Python — stary standard`,pros:[`Ogromna społeczność`,`Mnóstwo tutoriali`,`Minimalistyczny core`,`Prosta nauka`],cons:[`Brak async natywnie`,`Brak walidacji — musisz sam`,`Brak auto-dokumentacji`,`Wolniejszy od FastAPI`],vsReact:`Flask jest prostszy na start ale brakuje mu tego co FastAPI daje za darmo: walidacji, typów, docs. Dla nowych projektów FastAPI jest lepszym wyborem.`,bestFor:`Małe aplikacje, legacy projekty, gdy team zna Flask`},{name:`Django REST`,icon:`🎸`,color:`#44b78b`,tagline:`Pełny framework — bateryjny`,pros:[`Wbudowany ORM, admin, auth`,`Świetna dla CRUD aplikacji`,`DRF Serializers`,`Duży ekosystem`],cons:[`Ciężki i wolny`,`Trudna integracja async`,`Dużo boilerplate`,`Słabszy dla czystego API`],vsReact:`Django to cały framework (ORM, admin, auth, templates). FastAPI to czyste API. Jeśli potrzebujesz tylko REST API — FastAPI. Jeśli potrzebujesz też panelu admina — Django.`,bestFor:`Duże aplikacje webowe, systemy z panelem admina, CRUD-heavy projekty`},{name:`Litestar`,icon:`💫`,color:`#edb641`,tagline:`Wydajny ASGI framework`,pros:[`Bardzo wydajny`,`Pydantic + attrs`,`Wbudowane caching`,`Podobne API do FastAPI`],cons:[`Mniejsza społeczność`,`Mniej tutoriali`,`Mniejszy ekosystem`,`Nowszy — mniej battle-tested`],vsReact:`Litestar jest szybszy od FastAPI w benchmarkach i ma więcej wbudowanych funkcji. Ale FastAPI ma 10x większą społeczność i więcej zasobów do nauki.`,bestFor:`Projekty wymagające maksymalnej wydajności, gdy FastAPI jest za wolny`},{name:`aiohttp`,icon:`🌊`,color:`#2196f3`,tagline:`Async HTTP serwer i klient`,pros:[`Dojrzały async framework`,`Świetny jako klient HTTP`,`Niski overhead`,`Dobra wydajność`],cons:[`Brak walidacji`,`Brak auto-docs`,`Starszy design API`,`Mniej ergonomiczny`],vsReact:`aiohttp to bardziej niski poziom — świetny jako klient HTTP (scraping), słabszy jako framework API. FastAPI jako serwer + aiohttp/httpx jako klient = dobra kombinacja.`,bestFor:`Klient HTTP w automatyzacji, gdy potrzebujesz niskiego overhead`},{name:`Express (Node)`,icon:`🟨`,color:`#f7df1e`,tagline:`Minimalistyczny framework Node.js`,pros:[`Ogromny ekosystem npm`,`Szybki`,`Jeden język full-stack`,`TypeScript support`],cons:[`JavaScript/TypeScript zamiast Python`,`Brak walidacji natywnie`,`Callback hell (historycznie)`,`Nie dla Python developerów`],vsReact:`Express jeśli już jesteś w Node.js ekosystemie. FastAPI jeśli pracujesz w Pythonie — szczególnie przy automatyzacji, ML i scrapingu gdzie Python ma przewagę.`,bestFor:`Full-stack JS/TS, gdy backend i frontend w tym samym języku`},{name:`Tornado`,icon:`🌪️`,color:`#336699`,tagline:`Async Python — stary weteran`,pros:[`Dojrzały async (przed asyncio)`,`WebSockets natywnie`,`Sprawdzony w produkcji`,`Niski footprint`],cons:[`Starszy design`,`Mniej ergonomiczny`,`Mniejsza społeczność`,`Brak nowoczesnych features`],vsReact:`Tornado był async przed erą asyncio. Dziś FastAPI + asyncio robi to samo lepiej i bardziej ergonomicznie. Tornado to głównie legacy projekty.`,bestFor:`Legacy projekty, long-polling, specyficzne przypadki WebSocket`}],pluginy:[{name:`SQLModel`,icon:`🗄️`,color:`#009688`,tagline:`ORM łączący SQLAlchemy + Pydantic — od autora FastAPI`,install:`pip install sqlmodel`,use:`Jeden model = schemat DB + schemat API. Zero duplikacji klas. Walidacja Pydantic + SQL przez SQLAlchemy. Projektowany razem z FastAPI.`,example:`from sqlmodel import SQLModel, Field, Session, create_engine

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    power: str

engine = create_engine("sqlite:///heroes.db")
SQLModel.metadata.create_all(engine)`},{name:`fastapi-users`,icon:`👤`,color:`#3F51B5`,tagline:`Kompletny system auth i zarządzania użytkownikami`,install:`pip install fastapi-users[sqlalchemy]`,use:`Rejestracja, logowanie, reset hasła, OAuth2 (Google, GitHub) gotowe w 5 minutach. JWT + cookie auth. Nie pisz auth od zera.`,example:`from fastapi_users import FastAPIUsers

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager, [auth_backend])

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt")`},{name:`slowapi`,icon:`🚦`,color:`#F44336`,tagline:`Rate limiting — ogranicz requesty per IP/user`,install:`pip install slowapi`,use:`Ogranicza liczbę requestów per użytkownik/IP. Port flask-limiter dla FastAPI. Jeden dekorator na endpoint. Backend: memory lub Redis.`,example:`from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/data")
@limiter.limit("10/minute")
async def get_data(request: Request):
    return {"data": "ok"}`},{name:`fastapi-pagination`,icon:`📄`,color:`#FF9800`,tagline:`Automatyczna paginacja list`,install:`pip install fastapi-pagination`,use:`Paginacja z parametrami page/size w query string. Obsługuje SQLAlchemy, SQLModel. Zero boilerplate — jeden dekorator.`,example:`from fastapi_pagination import Page, paginate, add_pagination

@app.get("/users", response_model=Page[UserRead])
def get_users(db: Session = Depends(get_db)):
    return paginate(db.query(User).all())

add_pagination(app)`},{name:`pydantic-settings`,icon:`⚙️`,color:`#9C27B0`,tagline:`Konfiguracja z env vars i pliku .env`,install:`pip install pydantic-settings`,use:`Zarządzanie konfiguracją przez zmienne środowiskowe i .env. Walidacja typów Pydantic, wartości domyślne. Standard w każdym projekcie FastAPI.`,example:`from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False
    allowed_hosts: list[str] = ["*"]

    model_config = {"env_file": ".env"}

settings = Settings()`},{name:`fastapi-cache2`,icon:`⚡`,color:`#00BCD4`,tagline:`Cache odpowiedzi endpointów (Redis / in-memory)`,install:`pip install fastapi-cache2[redis]`,use:`Cachuje odpowiedzi endpointów. Jeden dekorator, konfigurujesz TTL. Backend: Redis lub in-memory. Drastycznie redukuje obciążenie DB.`,example:`from fastapi_cache.decorator import cache
from fastapi_cache.backends.redis import RedisBackend

@app.get("/expensive-query")
@cache(expire=300)  # cache 5 minut
async def get_stats():
    return await compute_heavy_stats()`},{name:`Alembic`,icon:`🔄`,color:`#795548`,tagline:`Migracje schematu bazy danych`,install:`pip install alembic`,use:`Wersjonowanie i migracje schematu DB. Generuje skrypty SQL przy zmianach w modelach. Niezbędny w każdym projekcie z SQLAlchemy — bez niego tracisz dane przy zmianach.`,example:`alembic init alembic
alembic revision --autogenerate -m "add users table"
alembic upgrade head       # zastosuj migracje
alembic downgrade -1       # cofnij ostatnią migrację`},{name:`Celery`,icon:`🌿`,color:`#37B24D`,tagline:`Kolejka zadań w tle (background tasks)`,install:`pip install celery redis`,use:`Ciężkie zadania (email, przetwarzanie obrazów, raporty PDF) poza cyklem request-response. FastAPI ma wbudowane BackgroundTasks — Celery dla cięższych i powtarzalnych operacji z retry.`,example:`from celery import Celery

celery = Celery('tasks', broker='redis://localhost/0')

@celery.task(bind=True, max_retries=3)
def send_report(self, user_id: int):
    try:
        generate_and_send_pdf(user_id)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)`}]},en=[{category:`Instalacja i setup`,icon:`🚀`,items:[{cmd:`pip install fastapi uvicorn[standard]`,desc:`FastAPI + serwer ASGI (zalecane)`,detail:{what:`Instaluje FastAPI i Uvicorn — serwer ASGI który uruchamia aplikację. [standard] dodaje WebSockets, HTTP/2 i szybszy parser (uvloop, httptools).`,how:`FastAPI to framework, Uvicorn to serwer. Razem jak Flask + Gunicorn. ASGI = Asynchronous Server Gateway Interface — nowoczesny standard dla async Python.`,tips:[`uvicorn[standard] = +uvloop (szybszy event loop), +httptools (szybszy parser)`,`Alternatywa: hypercorn (obsługuje HTTP/2, HTTP/3)`,`Produkcja: gunicorn z workerami uvicorn`]}},{cmd:`pip install "fastapi[all]"`,desc:`FastAPI ze wszystkimi opcjonalnymi zależnościami`,detail:{what:`Instaluje FastAPI z wszystkimi dodatkami: email-validator, python-multipart (upload plików), jinja2 (templates), pydantic-settings.`,how:`[all] to zbiorcza zależność — instaluje paczki które mogą być potrzebne w różnych przypadkach użycia.`,tips:[`Wygodne na dev, na produkcji instaluj tylko to czego używasz`,`python-multipart jest wymagane do File Upload`,`email-validator do walidacji emaili w Pydantic`]}},{cmd:`pip install httpx pytest pytest-asyncio`,desc:`Klient HTTP + testowanie async`,detail:{what:`httpx = nowoczesny HTTP client (async + sync). pytest = test runner. pytest-asyncio = testy dla async funkcji FastAPI.`,how:`FastAPI TestClient oparty jest na httpx. pytest-asyncio pozwala pisać testy jako async def z @pytest.mark.asyncio.`,tips:[`httpx zastępuje requests dla async kodu`,`TestClient = synchroniczny wrapper do testowania FastAPI`,`pytest-asyncio: dodaj asyncio_mode = "auto" do pytest.ini`]}},{cmd:`pip install sqlalchemy alembic`,desc:`ORM + migracje bazy danych`,detail:{what:`SQLAlchemy = ORM (Object Relational Mapper) — praca z bazą przez klasy Python. Alembic = migracje schematu bazy — wersjonowanie zmian w strukturze tabel.`,how:`SQLAlchemy 2.0 wspiera async. Alembic śledzi zmiany modeli i generuje skrypty SQL migracji.`,tips:[`alembic init alembic — inicjalizuj`,`alembic revision --autogenerate -m "add users" — generuj migrację`,`alembic upgrade head — zastosuj migracje`]}},{cmd:`pip install pydantic-settings`,desc:`Konfiguracja przez zmienne środowiskowe`,detail:{what:`pydantic-settings to Pydantic dla konfiguracji aplikacji. Czyta z pliku .env i zmiennych środowiskowych z walidacją typów.`,how:`Klasa Settings dziedziczy po BaseSettings. Pola są automatycznie wypełniane z .env lub os.environ.`,tips:[`DATABASE_URL, SECRET_KEY, API_KEY — nigdy hardcode w kodzie!`,`model_config = SettingsConfigDict(env_file=".env")`,`Użyj w Depends(): def get_settings(): return Settings()`]}}]},{category:`Uruchamianie serwera`,icon:`⚡`,items:[{cmd:`uvicorn main:app --reload`,desc:`Dev serwer z auto-reload przy zmianach`,detail:{what:`Uruchamia FastAPI w trybie deweloperskim. --reload = restart serwera przy każdej zmianie pliku. main = nazwa pliku (main.py), app = zmienna FastAPI.`,how:`uvicorn nasłuchuje na zmianach w systemie plików (watchfiles). Zmienisz kod → serwer restartuje automatycznie.`,flags:[{flag:`--reload`,desc:`Auto-restart przy zmianach (dev only)`},{flag:`--port 8080`,desc:`Zmień port (domyślnie 8000)`},{flag:`--host 0.0.0.0`,desc:`Dostępny z sieci LAN`},{flag:`--workers 4`,desc:`Ilość procesów (tylko bez --reload)`}],tips:[`http://localhost:8000/docs — Swagger UI`,`http://localhost:8000/redoc — ReDoc`,`Ctrl+C żeby zatrzymać`]}},{cmd:`uvicorn main:app --host 0.0.0.0 --port 8080`,desc:`Serwer dostępny w sieci na porcie 8080`,detail:{what:`Uruchamia serwer na wszystkich interfejsach sieciowych — dostępny z innych urządzeń i kontenerów Docker.`,how:`0.0.0.0 = nasłuchuj na wszystkich interfejsach (localhost + LAN + Docker bridge). Potrzebne w kontenerach Docker (domyślnie 127.0.0.1 nie jest dostępne z zewnątrz).`,tips:[`W Docker MUSISZ użyć --host 0.0.0.0`,`Nie używaj w produkcji bez firewall / reverse proxy (nginx)`,"PORT jako env var: uvicorn main:app --port ${PORT:-8000}"]}},{cmd:`gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker`,desc:`Produkcyjny serwer z wieloma workerami`,detail:{what:`Gunicorn jako process manager + Uvicorn jako ASGI worker. 4 workery = 4 procesy obsługujące requesty równolegle. Standard produkcyjny.`,how:`Gunicorn zarządza procesami, Uvicorn obsługuje ASGI. -w 4 = 4 workery. Reguła: 2 × CPU + 1.`,flags:[{flag:`-w 4`,desc:`4 workery (2×CPU+1)`},{flag:`-b 0.0.0.0:8000`,desc:`Bind adres`},{flag:`--timeout 120`,desc:`Timeout requesta w sekundach`},{flag:`--access-logfile -`,desc:`Logi do stdout`}],tips:[`Nie używaj --reload z gunicorn`,`W Docker: CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]`]}},{cmd:`python -m uvicorn main:app --reload`,desc:`Alternatywny sposób uruchamiania`,detail:{what:`Identyczne z uvicorn main:app --reload ale uruchamiane przez moduł Python. Przydatne gdy uvicorn nie jest w PATH.`,how:`-m uvicorn = uruchom pakiet uvicorn jako skrypt. Gwarantuje użycie uvicorn z aktywnego venv.`,tips:[`Używaj gdy: command not found po pip install uvicorn`,`Upewnij się że venv jest aktywowany: source venv/bin/activate`]}}]},{category:`Testowanie`,icon:`🧪`,items:[{cmd:`pytest`,desc:`Uruchom wszystkie testy`,detail:{what:`Uruchamia wszystkie pliki test_*.py i *_test.py. FastAPI TestClient symuluje requesty bez uruchamiania prawdziwego serwera.`,how:`pytest automatycznie wykrywa pliki testów. Dla FastAPI używasz from fastapi.testclient import TestClient.`,tips:[`pytest -v = verbose, widać każdy test`,`pytest tests/test_users.py = tylko jeden plik`,`pytest -k "test_scrape" = testy zawierające "test_scrape" w nazwie`]}},{cmd:`pytest -v --asyncio-mode=auto`,desc:`Testy async z auto-wykryciem`,detail:{what:`Uruchamia testy async z pytest-asyncio w trybie auto — nie musisz dekorować każdego async testu @pytest.mark.asyncio.`,how:`asyncio-mode=auto = wszystkie async def test_ automatycznie traktowane jako async testy.`,tips:[`Dodaj do pytest.ini: [pytest] asyncio_mode = auto`,`Używaj httpx.AsyncClient zamiast TestClient dla async testów`,`AsyncClient wymaga app jako argument: AsyncClient(app=app, base_url="http://test")`]}},{cmd:`pytest --cov=app --cov-report=html`,desc:`Testy z raportem pokrycia kodu`,detail:{what:`Uruchamia testy i generuje raport HTML coverage — widzisz które linie kodu są objęte testami.`,how:`Wymaga: pip install pytest-cov. Raport ląduje w htmlcov/index.html.`,tips:[`Otwórz htmlcov/index.html w przeglądarce`,`Czerwone linie = nieobjęte testami`,`Cel: 80%+ dla kluczowych endpointów`]}},{cmd:`pip install pytest-asyncio httpx`,desc:`Zainstaluj narzędzia do testów async`,detail:{what:`pytest-asyncio = obsługa async testów w pytest. httpx = klient HTTP używany przez FastAPI TestClient.`,how:`FastAPI TestClient używa httpx pod spodem. httpx jest wymagane do testowania async endpointów.`,tips:[`TestClient = sync testy (prostsze)`,`httpx.AsyncClient = async testy (pełna kontrola)`,`Oba działają bez uruchamiania serwera`]}}]},{category:`Pydantic i walidacja`,icon:`🔒`,items:[{cmd:`pip install pydantic[email]`,desc:`Pydantic z walidacją emaili`,detail:{what:`Dodaje EmailStr do Pydantic — typ który waliduje czy string jest poprawnym adresem email.`,how:`EmailStr = string z walidacją RFC 5322. Bez tej paczki FastAPI wyrzuci błąd przy próbie użycia EmailStr.`,tips:[`from pydantic import EmailStr`,`class User(BaseModel): email: EmailStr`,`Pydantic v2 wymaga email-validator >= 2.0`]}},{cmd:`python -c "from pydantic import BaseModel; print(BaseModel.__version__)"`,desc:`Sprawdź wersję Pydantic`,detail:{what:`Sprawdza zainstalowaną wersję Pydantic. Ważne bo Pydantic v1 i v2 mają inne API.`,how:`Pydantic v2 (2023+) jest przepisany w Rust — 5-50x szybszy. Zmienione API: .dict() → .model_dump(), .schema() → .model_json_schema().`,tips:[`FastAPI 0.100+ wymaga Pydantic v2`,`.model_dump() zamiast .dict()`,`.model_validate() zamiast parse_obj()`],note:`⚠️ Pydantic v1 i v2 mają inne API — sprawdź wersję jeśli migrowujesz stary projekt.`}},{cmd:`pip install pydantic-settings python-dotenv`,desc:`Konfiguracja z pliku .env`,detail:{what:`pydantic-settings = konfiguracja przez klasy Pydantic. python-dotenv = ładowanie .env do os.environ.`,how:`BaseSettings automatycznie czyta zmienne z .env i środowiskowych. Waliduje typy — DATABASE_URL: str = "..." zamiast os.getenv().`,tips:[`Nigdy nie commituj .env do git — dodaj do .gitignore!`,`Trzymaj .env.example z placeholder wartościami`,`Na produkcji: zmienne środowiskowe zamiast .env`]}}]},{category:`Baza danych`,icon:`🗄️`,items:[{cmd:`pip install asyncpg`,desc:`Async driver PostgreSQL (najszybszy)`,detail:{what:`asyncpg = najszybszy async driver PostgreSQL dla Python. Bezpośredni protokół wire, zero overhead.`,how:`Napisany w Cython. Działa z SQLAlchemy async lub bezpośrednio. Wymaga PostgreSQL >= 9.4.`,tips:[`SQLAlchemy async używa asyncpg pod spodem`,`Bezpośrednio: conn = await asyncpg.connect(DSN)`,`Alternatywa: psycopg3 (nowszy, też async)`]}},{cmd:`pip install redis[asyncio]`,desc:`Redis z obsługą async`,detail:{what:`Oficjalny Python klient Redis z obsługą async/await. Cache, kolejki, pub/sub, rate limiting.`,how:`redis.asyncio = async interface. Połączenie przez pool — wiele requesty współdzielą połączenia.`,tips:[`redis.asyncio.from_url("redis://localhost")`,`await r.set("key", "value", ex=3600) — z TTL`,`await r.get("key") — odczyt`,`Używaj connection pool w lifespan!`]}},{cmd:`alembic init alembic`,desc:`Inicjalizuj migracje bazy danych`,detail:{what:`Tworzy folder alembic/ z konfiguracją i env.py. Punkt startowy systemu migracji schematu bazy.`,how:`Alembic śledzi wersje schematu w tabeli alembic_version w bazie. Każda migracja to plik Python z upgrade() i downgrade().`,tips:[`Po init: ustaw DATABASE_URL w alembic.ini`,`alembic revision --autogenerate -m "add table" — generuj z modeli`,`alembic upgrade head — zastosuj wszystkie`],note:`Uruchom tylko raz na projekt!`}},{cmd:`alembic revision --autogenerate -m "add users table"`,desc:`Generuj migrację z modeli SQLAlchemy`,detail:{what:`Porównuje obecny stan modeli SQLAlchemy z bazą i generuje plik migracji z różnicami.`,how:`Alembic importuje twoje modele, łączy się z bazą i generuje ALTER TABLE / CREATE TABLE na podstawie różnic.`,tips:[`Zawsze przejrzyj wygenerowaną migrację przed zastosowaniem`,`Autogenerate nie wykrywa wszystkiego (np. zmian CHECK constraint)`,`alembic upgrade head żeby zastosować`]}},{cmd:`alembic upgrade head`,desc:`Zastosuj wszystkie migracje`,detail:{what:`Uruchamia wszystkie niezastosowane migracje do najnowszej wersji (head). Aktualizuje strukturę bazy danych.`,how:`Alembic sprawdza tabelę alembic_version, wykonuje migracje w kolejności, aktualizuje wersję.`,flags:[{flag:`head`,desc:`Najnowsza wersja`},{flag:`+1`,desc:`Następna migracja`},{flag:`revision_id`,desc:`Konkretna wersja`}],tips:[`alembic downgrade -1 — cofnij ostatnią migrację`,`alembic history — pokaż historię migracji`,`alembic current — pokaż aktualną wersję bazy`]}}]},{category:`Deployment`,icon:`🚢`,items:[{cmd:`pip freeze > requirements.txt`,desc:`Zapisz zależności projektu`,detail:{what:`Generuje plik requirements.txt ze wszystkimi zainstalowanymi paczkami i ich dokładnymi wersjami.`,how:`pip freeze listuje wszystko w aktywnym środowisku (venv). Wersje są pinned (==) — gwarantuje reprodukowalność.`,tips:[`Zawsze twórz venv przed projektem: python -m venv venv`,`Aktywuj: source venv/bin/activate (Linux/Mac) lub venv\\Scripts\\activate (Windows)`,`pip install -r requirements.txt — zainstaluj u innego dewelopera`],note:`⚠️ pip freeze listuje WSZYSTKIE paczki łącznie z zależnościami zależności. Alternatywa: pip-tools dla czystszego zarządzania.`}},{cmd:`pip install -r requirements.txt`,desc:`Zainstaluj zależności z pliku`,detail:{what:`Instaluje wszystkie paczki z pliku requirements.txt — odtworzy identyczne środowisko.`,how:`pip czyta każdą linię requirements.txt i instaluje paczki z podanymi wersjami.`,tips:[`pip install -r requirements.txt --no-deps — bez sprawdzania zależności`,`pip install -r requirements.txt -q — cicho (mniej output)`,`Pierwszy krok po git clone projektu FastAPI`]}},{cmd:`docker build -t my-api .`,desc:`Zbuduj Docker image`,detail:{what:`Buduje Docker image z aplikacją FastAPI na podstawie Dockerfile w bieżącym folderze.`,how:`Docker czyta Dockerfile, instaluje paczki, kopiuje kod, konfiguruje CMD. -t my-api = nadaj nazwę (tag).`,tips:[`Dockerfile dla FastAPI: FROM python:3.11-slim, COPY requirements.txt, RUN pip install -r requirements.txt, COPY . ., CMD uvicorn main:app --host 0.0.0.0`,`docker build . --no-cache — wymuś rebuild od zera`,`docker images — lista zbudowanych obrazów`]}},{cmd:`docker run -p 8000:8000 my-api`,desc:`Uruchom kontener FastAPI`,detail:{what:`Uruchamia kontener z aplikacją i mapuje port 8000 kontenera na port 8000 hosta.`,how:`-p HOST:CONTAINER. Aplikacja wewnątrz kontenera nasłuchuje na 8000, dostępna na localhost:8000.`,flags:[{flag:`-p 8000:8000`,desc:`Mapowanie portów`},{flag:`-e DATABASE_URL=...`,desc:`Zmienne środowiskowe`},{flag:`-d`,desc:`Uruchom w tle (detached)`},{flag:`--rm`,desc:`Usuń kontener po zatrzymaniu`}],tips:[`docker run -d -p 8000:8000 --env-file .env my-api — z plikiem .env`,`docker logs -f container_id — logi na żywo`,`docker ps — lista działających kontenerów`]}}]},{category:`Narzędzia dev`,icon:`🔧`,items:[{cmd:`pip install ruff`,desc:`Szybki linter i formatter Python (zastępuje flake8+black)`,detail:{what:`Ruff = ultraszybki linter i formatter Python napisany w Rust. Zastępuje flake8, black, isort w jednym narzędziu. 10-100x szybszy.`,how:`Ruff sprawdza styl, błędy, importy. Może też auto-formatować (ruff format .).`,tips:[`ruff check . — sprawdź błędy`,`ruff check . --fix — auto-napraw`,`ruff format . — formatuj (jak black)`,`Dodaj do pyproject.toml: [tool.ruff] line-length = 88`]}},{cmd:`pip install mypy`,desc:`Statyczna analiza typów Python`,detail:{what:`Mypy sprawdza type hints w kodzie Python — wykrywa błędy typów bez uruchamiania kodu. Jak tsc dla TypeScript.`,how:`mypy main.py — sprawdź jeden plik. mypy . — cały projekt. Czyta type annotations i sprawdza spójność.`,tips:[`mypy . — sprawdź całość`,`Dla FastAPI: pip install types-redis types-requests`,`Ignoruj linię: # type: ignore`,`Konfiguracja w pyproject.toml: [tool.mypy]`]}},{cmd:`pip install pre-commit`,desc:`Git hooks — auto-check przed commitem`,detail:{what:`Pre-commit uruchamia linters i formattery automatycznie przy git commit. Blokuje commit jeśli kod nie przejdzie sprawdzeń.`,how:`Konfigurujesz w .pre-commit-config.yaml. Przy git commit: ruff check, mypy, ruff format — wszystko automatycznie.`,tips:[`pre-commit install — zainstaluj hooki w repo`,`pre-commit run --all-files — uruchom ręcznie na całym projekcie`,`Standardowy .pre-commit-config.yaml: ruff + ruff-format`]}},{cmd:`curl http://localhost:8000/docs`,desc:`Sprawdź czy API działa`,detail:{what:`Szybki test czy serwer FastAPI odpowiada. /docs to Swagger UI — jeśli zwraca HTML to API działa.`,how:`curl to command-line HTTP klient. Domyślnie GET. Wynik wypisany w terminalu.`,tips:[`curl http://localhost:8000/ — test root endpoint`,`curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"test"}'`,`curl -s http://localhost:8000/health | python3 -m json.tool — ładny JSON`]}}]}],tn={meta:{id:`fastapi`,name:`FastAPI`,icon:`🚀`,color:`#009688`,color2:`#ff5722`,tagline:`Nowoczesne, szybkie API w Pythonie z automatyczną dokumentacją`,year:2018,author:`Sebastián Ramírez (tiangolo)`,lang:`Python 3.8+`,github:`tiangolo/fastapi`,stars:`75k+`,codeLang:`Python`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Endpointy`},{id:`hooki`,label:`Zależności`},{id:`routing`,label:`Walidacja`},{id:`state`,label:`Async`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Rozszerzenia`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać FastAPI?`,firstComponent:`Pierwszy endpoint`,firstComponentLang:`Python`},intro:{title:`Czym jest FastAPI?`,desc:`FastAPI to nowoczesny framework do budowania API w Pythonie. Oparty na standardach OpenAPI i JSON Schema. Automatycznie generuje interaktywną dokumentację (Swagger UI). Jeden z najszybszych frameworków Python — wydajnością dorównuje NodeJS i Go dzięki ASGI i async/await.`},concepts:[{title:`Type Hints`,desc:`FastAPI używa type hints Pythona do automatycznej walidacji, serializacji i generowania dokumentacji. Piszesz typy → FastAPI robi resztę.`,icon:`🏷️`},{title:`Pydantic`,desc:`Walidacja danych przez modele Pydantic. Definiujesz schemat jako klasę Python — FastAPI waliduje request i zwraca czytelne błędy automatycznie.`,icon:`🔒`},{title:`Async / Await`,desc:`Natywna obsługa async/await. Endpoint może być synchroniczny lub asynchroniczny — FastAPI sam obsłuży oba przypadki przez ASGI (Starlette).`,icon:`⚡`},{title:`Auto Docs`,desc:`Swagger UI dostępny na /docs, ReDoc na /redoc. Zero konfiguracji — dokumentacja generuje się z kodu automatycznie przy każdej zmianie.`,icon:`📄`}],whenToUse:[`REST API do automatyzacji i scrapingu (odbieranie wyników, wyzwalanie tasków)`,`Backend dla agentów AI (LangGraph, MCP endpoints)`,`Mikroserwisy i pipeline'y danych`,`Szybkie prototypy API z automatyczną dokumentacją`,`Zastąpienie Flask gdy potrzebujesz walidacji, async i typów`],firstComponent:`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}

# Uruchom: uvicorn main:app --reload
# Docs:    http://localhost:8000/docs`},komponenty:[{title:`GET — pobieranie danych`,desc:`Podstawowy endpoint GET. Path parameters w URL, query params jako argumenty funkcji z domyślnymi wartościami.`,code:`from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, active: bool = True):
    # user_id z URL: /users/42
    # active z query: /users/42?active=false
    return {"id": user_id, "active": active}

@app.get("/search")
def search(q: str, limit: int = 10, offset: int = 0):
    # /search?q=python&limit=5&offset=10
    return {"query": q, "limit": limit, "offset": offset}`},{title:`POST — wysyłanie danych (Pydantic)`,desc:`Endpoint POST z walidacją body przez model Pydantic. FastAPI automatycznie parsuje JSON i waliduje pola.`,code:`from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str
    age: int | None = None  # opcjonalne

@app.post("/users", status_code=201)
def create_user(user: UserCreate):
    # user.name, user.email są już zwalidowane
    # Błędny JSON → automatyczny 422 z opisem błędu
    return {"created": user.model_dump()}`},{title:`PUT / PATCH / DELETE`,desc:`Pełne CRUD — update i usuwanie zasobów. status_code kontroluje kod odpowiedzi HTTP.`,code:`from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.put("/users/{user_id}")
def update_user(user_id: int, user: UserCreate):
    if user_id not in db:
        raise HTTPException(status_code=404, detail="User not found")
    db[user_id] = user
    return db[user_id]

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    if user_id not in db:
        raise HTTPException(status_code=404, detail="Not found")
    del db[user_id]`},{title:`Response Model — kontrola odpowiedzi`,desc:`response_model filtruje co zwraca API. Możesz mieć inny model wejściowy (z hasłem) i wyjściowy (bez hasła).`,code:`from pydantic import BaseModel

class UserIn(BaseModel):
    name: str
    password: str  # przyjmujemy od klienta

class UserOut(BaseModel):
    name: str      # ale NIE zwracamy hasła!
    id: int

@app.post("/users", response_model=UserOut)
def create_user(user: UserIn):
    # FastAPI automatycznie odfiltruje 'password'
    return {"name": user.name, "id": 1}`},{title:`Obsługa błędów — HTTPException`,desc:`HTTPException do zwracania błędów HTTP z czytelnym komunikatem. Custom exception handlers dla globalnej obsługi błędów.`,code:`from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id < 0:
        raise HTTPException(
            status_code=400,
            detail="ID nie może być ujemne"
        )
    if item_id > 1000:
        raise HTTPException(status_code=404, detail="Not found")
    return {"id": item_id}

# Globalny handler
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(status_code=422, content={"error": str(exc)})`},{title:`Background Tasks — zadania w tle`,desc:`Uruchom zadanie po zwróceniu odpowiedzi. Idealne do automatyzacji: scraping, zapis do DB, wysyłka emaila — bez blokowania klienta.`,code:`from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def scrape_url(url: str):
    # długo działający task — nie blokuje odpowiedzi
    result = requests.get(url)
    save_to_db(result)

@app.post("/scrape")
def start_scrape(url: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(scrape_url, url)
    # Klient dostaje odpowiedź natychmiast
    return {"status": "started", "url": url}`}],hooki:[{name:`Depends() — Dependency Injection`,desc:`System zależności FastAPI. Funkcja zależności jest wywoływana przed endpointem i jej wynik wstrzykiwany jako argument.`,when:`Autoryzacja, połączenie z DB, wspólna logika między wieloma endpointami`,code:`from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

# Zależność — sprawdza token
def verify_token(token: str):
    if token != "secret":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"user": "admin"}

@app.get("/protected")
def protected_route(user = Depends(verify_token)):
    return {"message": "Witaj!", "user": user}`},{name:`Depends() — połączenie z bazą`,desc:`Klasyczny wzorzec: zależność zarządza sesją DB, endpoint jej używa, sesja zamykana automatycznie po request.`,when:`Każdy endpoint potrzebujący połączenia z bazą danych`,code:`from sqlalchemy.orm import Session
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db          # udostępnij sesję
    finally:
        db.close()        # zamknij po request

@app.get("/users/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(404, "Not found")
    return user`},{name:`Lifespan — startup i shutdown`,desc:`Kod uruchamiany przy starcie i zamknięciu aplikacji. Inicjalizacja połączeń, ładowanie modeli ML, cache.`,when:`Połączenie z Redis, inicjalizacja klienta AI, ładowanie dużych modeli`,code:`from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup — przy starcie serwera
    print("Łączę z Redis...")
    app.state.redis = await create_redis()
    app.state.model = load_ml_model()

    yield  # aplikacja działa

    # Shutdown — przy zamknięciu
    await app.state.redis.close()
    print("Redis rozłączony")

app = FastAPI(lifespan=lifespan)`},{name:`Middleware — przetwarzanie requestów`,desc:`Middleware to kod który wykonuje się dla KAŻDEGO requestu — przed i po endpoint. Logowanie, CORS, timing, auth.`,when:`Logowanie requestów, mierzenie czasu odpowiedzi, dodawanie nagłówków`,code:`import time
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()

    # Przed endpointem
    print(f"→ {request.method} {request.url}")

    response = await call_next(request)

    # Po endpoincie
    duration = time.time() - start
    print(f"← {response.status_code} ({duration:.2f}s)")

    return response`},{name:`OAuth2 / JWT — autoryzacja`,desc:`Wbudowana obsługa OAuth2 z Bearer tokenem. Łatwa integracja z JWT dla stateless autoryzacji.`,when:`Chronione endpointy wymagające zalogowania`,code:`from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    user = verify_jwt_token(token)  # twoja logika
    if not user:
        raise HTTPException(401, "Invalid token")
    return user

@app.get("/me")
def read_me(user = Depends(get_current_user)):
    return user`},{name:`APIRouter — podział na moduły`,desc:`APIRouter pozwala podzielić API na osobne pliki/moduły. Każdy router ma własny prefix i tagi w dokumentacji.`,when:`Gdy app.py robi się za duże — podział na users.py, items.py, scraper.py`,code:`# routers/scraper.py
from fastapi import APIRouter

router = APIRouter(prefix="/scraper", tags=["Scraper"])

@router.post("/run")
def run_scraper(url: str):
    return {"status": "started"}

@router.get("/results")
def get_results():
    return []

# main.py
from routers import scraper
app.include_router(scraper.router)`}],...Qt,...$t,komendy:en}},nn={routing:{install:`pip install pytest`,version:`pytest 8.x`,sections:[{title:`@pytest.mark.parametrize — jeden test, wiele przypadków`,code:`import pytest

def add(a, b):
    return a + b

# Test uruchomi się 4 razy z różnymi danymi
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

# Parametryzacja URL scrapera
@pytest.mark.parametrize("url", [
    "https://python.org",
    "https://github.com",
    "https://stackoverflow.com",
])
def test_scrape_url(url):
    assert url.startswith("https://")`},{title:`@pytest.mark.skip — pomijanie testów`,code:`import pytest
import sys

# Zawsze pomijaj
@pytest.mark.skip(reason="Nie gotowe jeszcze")
def test_feature_in_progress():
    assert False  # nigdy nie uruchomi się

# Pomijaj warunkowo
@pytest.mark.skipif(sys.platform == "win32", reason="Nie działa na Windows")
def test_linux_only():
    assert True

# Pomijaj w kodzie testu
def test_skip_dynamically():
    if not external_service_available():
        pytest.skip("Serwis zewnętrzny niedostępny")
    assert call_service() == "ok"`},{title:`@pytest.mark.xfail — oczekiwany błąd`,code:`import pytest

# Oczekujemy że test PADNIE — jeśli padnie, to OK (XFAIL)
# Jeśli przejdzie niespodziewanie — XPASS (ostrzeżenie)
@pytest.mark.xfail(reason="Znany bug #123, naprawimy w v2")
def test_known_bug():
    assert 1 == 2  # pada, ale to OK

# strict=True — XPASS = błąd (wymusza że bug naprawiony = zmień marker)
@pytest.mark.xfail(strict=True, reason="Musi się nie powieść")
def test_strict_xfail():
    assert 1 == 2`},{title:`Własne markery — grupowanie testów`,code:`# pytest.ini lub pyproject.toml:
# [pytest]
# markers =
#     slow: testy które trwają długo
#     integration: testy integracyjne z zewnętrznymi serwisami
#     smoke: podstawowe testy sanity check

import pytest

@pytest.mark.slow
def test_large_dataset_processing():
    # trwa 30 sekund...
    pass

@pytest.mark.integration
def test_database_connection():
    # wymaga działającej bazy
    pass

@pytest.mark.smoke
def test_api_is_alive():
    pass

# Uruchamianie:
# pytest -m slow           — tylko wolne testy
# pytest -m "not slow"     — wszystko oprócz wolnych
# pytest -m "smoke or integration"`},{title:`pytest.ini / pyproject.toml — konfiguracja`,code:`# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]          # gdzie szukać testów
addopts = "-v --tb=short"      # domyślne flagi
asyncio_mode = "auto"          # pytest-asyncio
markers = [
    "slow: testy które trwają długo",
    "integration: wymaga zewnętrznych serwisów",
    "smoke: szybkie testy sanity check",
]

# Lub pytest.ini
[pytest]
testpaths = tests
addopts = -v --tb=short
asyncio_mode = auto`},{title:`Struktura projektu testów`,code:`projekt/
├── src/
│   ├── scraper.py
│   ├── parser.py
│   └── api.py
├── tests/
│   ├── conftest.py          # wspólne fixtures
│   ├── test_scraper.py
│   ├── test_parser.py
│   ├── integration/
│   │   ├── conftest.py      # fixtures dla integracji
│   │   └── test_api.py
│   └── e2e/
│       └── test_full_flow.py
├── pyproject.toml
└── requirements.txt

# pytest automatycznie wykryje wszystkie test_*.py`}]},state:[{name:`pytest-asyncio — async testy`,icon:`⚡`,color:`#0A9EDC`,complexity:`Średnia`,bundle:`pytest-asyncio`,when:`Testowanie async funkcji, FastAPI endpoints, aiohttp, asyncio kodu`,code:`import pytest
import asyncio

# pip install pytest-asyncio
# W pyproject.toml: asyncio_mode = "auto"

async def fetch_async(url):
    await asyncio.sleep(0.1)  # symulacja I/O
    return {"url": url, "status": 200}

@pytest.mark.asyncio
async def test_async_fetch():
    result = await fetch_async("https://example.com")
    assert result["status"] == 200

# Z asyncio_mode = "auto" — nie trzeba dekoratora:
async def test_auto_async():
    result = await fetch_async("https://test.com")
    assert "url" in result`},{name:`httpx.AsyncClient — testowanie FastAPI async`,icon:`🔌`,color:`#009688`,complexity:`Średnia`,bundle:`httpx + pytest-asyncio`,when:`Testy endpointów FastAPI — async klient HTTP w testach`,code:`import pytest
import httpx
from fastapi.testclient import TestClient
from main import app

# Sync — prostsze
def test_sync():
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200

# Async — pełna kontrola
@pytest.fixture
async def async_client():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        yield client

async def test_async_endpoint(async_client):
    response = await async_client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)`},{name:`pytest-asyncio gather — testy równoległe`,icon:`🚀`,color:`#F5C518`,complexity:`Wysoka`,bundle:`asyncio.gather`,when:`Testowanie równoległych requestów, race conditions, concurrent operations`,code:`import pytest
import asyncio
import httpx

async def test_concurrent_requests():
    urls = [
        "https://api.example.com/item/1",
        "https://api.example.com/item/2",
        "https://api.example.com/item/3",
    ]
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)

    assert all(r.status_code == 200 for r in responses)
    assert len(responses) == 3`},{name:`pytest-cov — pokrycie kodu`,icon:`📊`,color:`#4CAF50`,complexity:`Niska`,bundle:`pytest-cov`,when:`Sprawdź które linie kodu nie są testowane. CI/CD — blokuj przy < 80% coverage.`,code:`# pip install pytest-cov
# pytest --cov=src --cov-report=html

# pyproject.toml
[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/migrations/*"]

[tool.coverage.report]
fail_under = 80    # fail jeśli coverage < 80%
show_missing = true

# W CI:
# pytest --cov=src --cov-fail-under=80`},{name:`freezegun — mockowanie czasu`,icon:`⏱️`,color:`#9C27B0`,complexity:`Niska`,bundle:`freezegun`,when:`Testowanie logiki zależnej od datetime.now() — crontaby, TTL, expiry dates`,code:`from freezegun import freeze_time
from datetime import datetime

def get_greeting():
    hour = datetime.now().hour
    if hour < 12:
        return "Dzień dobry"
    return "Dobry wieczór"

@freeze_time("2024-01-15 08:30:00")
def test_morning_greeting():
    assert get_greeting() == "Dzień dobry"

@freeze_time("2024-01-15 20:00:00")
def test_evening_greeting():
    assert get_greeting() == "Dobry wieczór"`},{name:`responses — mockowanie HTTP`,icon:`🌐`,color:`#FF5722`,complexity:`Niska`,bundle:`responses`,when:`Mockowanie requests.get() bez monkeypatching — czystsze API`,code:`import responses as resp
import requests

def fetch_user(user_id):
    r = requests.get(f"https://api.example.com/users/{user_id}")
    return r.json()

@resp.activate
def test_fetch_user():
    # Zdefiniuj mock response
    resp.add(
        resp.GET,
        "https://api.example.com/users/1",
        json={"id": 1, "name": "Alice"},
        status=200
    )

    result = fetch_user(1)
    assert result["name"] == "Alice"
    # Prawdziwy HTTP NIE jest wywołany!`}]},rn={rywale:[{name:`unittest`,icon:`🐍`,color:`#3776ab`,tagline:`Wbudowany framework testowy Pythona`,pros:[`Wbudowany — zero instalacji`,`Klasy i metody — znajome dla Java/C# developerów`,`TestCase z setUp/tearDown`,`Dobra integracja z IDE`],cons:[`Dużo boilerplate (klasy, self)`,`Słabsze raporty błędów niż pytest`,`Brak fixtures`,`Verbose asercje (assertEqual, assertTrue)`],vsReact:`unittest jest wbudowany — nie trzeba nic instalować. Ale pytest jest prostszy (zwykłe funkcje), ma lepsze raporty i fixtures. pytest może też uruchamiać testy unittest.`,bestFor:`Legacy kod, gdy nie możesz instalować zewnętrznych paczek`},{name:`nose2`,icon:`👃`,color:`#795548`,tagline:`Następca nose — rozszerzenie unittest`,pros:[`Plugin-based`,`Kompatybilny z unittest`,`Lekki`],cons:[`Mniejsza społeczność niż pytest`,`Mniej aktywny rozwój`,`Mniej pluginów`,`Gorsze raportowanie`],vsReact:`nose2 to de facto martwy projekt — społeczność przeniosła się na pytest. Unikaj w nowych projektach.`,bestFor:`Legacy projekty które już używają nose`},{name:`doctest`,icon:`📖`,color:`#607D8B`,tagline:`Testy w docstringach`,pros:[`Dokumentacja = test`,`Wbudowany w Python`,`Zero boilerplate`,`Wymusza aktualną dokumentację`],cons:[`Tylko proste przypadki`,`Kruche na formatowanie`,`Brak fixtures`,`Brak parametryzacji`],vsReact:`Doctest jest świetny do prostych przykładów w dokumentacji. Do poważnych testów używaj pytest.`,bestFor:`Biblioteki gdzie przykłady w docs muszą działać`},{name:`tox`,icon:`☣️`,color:`#009688`,tagline:`Testowanie na wielu wersjach Pythona`,pros:[`Testuje na Python 3.9, 3.10, 3.11, 3.12`,`Izolowane środowiska`,`Integracja z CI/CD`,`Uruchamia pytest + linters`],cons:[`Wolniejszy (tworzy venv)`,`Dodatkowa konfiguracja`,`Nie zastępuje pytest`],vsReact:`Tox nie zastępuje pytest — uruchamia pytest na wielu wersjach Python. Razem: tox jako orchestrator, pytest jako test runner.`,bestFor:`Biblioteki publiczne, projekty wspierające wiele wersji Python`},{name:`pytest-bdd`,icon:`🥒`,color:`#4CAF50`,tagline:`Behaviour-Driven Development w pytest`,pros:[`Testy w języku naturalnym (Gherkin)`,`Czytelne dla non-techów`,`Given/When/Then struktura`,`Integracja z pytest`],cons:[`Dużo boilerplate`,`Narzut dla prostych projektów`,`Wymaga pisania w dwóch miejscach`,`Nie dla każdego projektu`],vsReact:`pytest-bdd dla projektów gdzie product owner lub klient czyta testy. Zwykły pytest dla typowych projektów automatyzacji.`,bestFor:`Projekty z requirement'ami w języku naturalnym, praca z klientami`}],pluginy:[{name:`pytest-cov`,icon:`📊`,color:`#4CAF50`,tagline:`Pokrycie kodu (code coverage)`,install:`pip install pytest-cov`,use:`Mierzy które linie kodu są testowane. Generuje raporty HTML, XML (CI) lub terminal. Niezbędny przy CI/CD — blokuje merge gdy coverage spada.`,example:`pytest --cov=src --cov-report=html --cov-report=term-missing
pytest --cov=src --cov-fail-under=80   # fail poniżej 80%`},{name:`pytest-mock`,icon:`🎭`,color:`#9C27B0`,tagline:`Wygodne mockowanie przez fixture mocker`,install:`pip install pytest-mock`,use:`Dodaje fixture mocker — wrapper na unittest.mock. Zamiast @patch dekoratora używasz mocker.patch() w ciele testu. Auto-cleanup po teście.`,example:`def test_api_call(mocker):
    mock = mocker.patch('myapp.requests.get')
    mock.return_value.json.return_value = {'ok': True}
    result = myapp.fetch_data()
    assert result == {'ok': True}`},{name:`pytest-asyncio`,icon:`⚡`,color:`#00BCD4`,tagline:`Testowanie async/await`,install:`pip install pytest-asyncio`,use:`Pozwala pisać async def test_* funkcje. Bez tego pytest nie wie jak uruchomić korutyny. Wymagane do testowania FastAPI, aiohttp, asyncio kodu.`,example:`# pyproject.toml: asyncio_mode = "auto"

async def test_async_fetch():
    result = await fetch_data_async()
    assert result is not None`},{name:`pytest-xdist`,icon:`🚀`,color:`#FF5722`,tagline:`Równoległe uruchamianie testów`,install:`pip install pytest-xdist`,use:`Uruchamia testy równolegle na wielu CPU. Przy dużym projekcie skraca czas testów 4-8x. Uwaga: fixtures z shared state mogą wymagać dostosowania.`,example:`pytest -n auto    # tyle workerów ile CPU
pytest -n 4       # dokładnie 4 workery`},{name:`responses`,icon:`🌐`,color:`#2196F3`,tagline:`Mockowanie HTTP requestów (biblioteka requests)`,install:`pip install responses`,use:`Przechwytuje wywołania requests.get/post i zwraca zdefiniowane odpowiedzi. Zero prawdziwych połączeń HTTP w testach.`,example:`import responses, requests

@responses.activate
def test_github_api():
    responses.add(responses.GET,
        'https://api.github.com/users/test',
        json={'login': 'test'}, status=200)
    r = requests.get('https://api.github.com/users/test')
    assert r.json()['login'] == 'test'`},{name:`pytest-httpx`,icon:`🔗`,color:`#607D8B`,tagline:`Mockowanie HTTPX (async HTTP client)`,install:`pip install pytest-httpx`,use:`Jak responses, ale dla biblioteki httpx. Niezbędny gdy testujesz FastAPI z TestClient lub kod używający async http.`,example:`async def test_fetch(httpx_mock):
    httpx_mock.add_response(json={"status": "ok"})
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com")
    assert r.json() == {"status": "ok"}`},{name:`hypothesis`,icon:`🎲`,color:`#E91E63`,tagline:`Property-based testing — generowanie danych`,install:`pip install hypothesis`,use:`Automatycznie generuje setki przypadków testowych z reguł które definiujesz. Znajduje edge casy których nie przewidziałeś. Minimalizuje failing przykład do najprostszej formy.`,example:`from hypothesis import given, strategies as st

@given(st.integers(), st.integers())
def test_komutywnosc_dodawania(a, b):
    assert a + b == b + a

@given(st.text())
def test_odwrocenie_nie_zmienia_dlugosci(s):
    assert len(s) == len(s[::-1])`},{name:`pytest-benchmark`,icon:`⏱️`,color:`#FF9800`,tagline:`Benchmarki wydajności w testach`,install:`pip install pytest-benchmark`,use:`Mierzy czas wykonania funkcji. Automatycznie uruchamia wielokrotnie i uśrednia. Wykrywa regressje wydajności między wersjami.`,example:`def test_sorting_speed(benchmark):
    data = list(range(10000, 0, -1))
    result = benchmark(sorted, data)
    assert result[0] == 1`},{name:`freezegun`,icon:`🕐`,color:`#795548`,tagline:`Mockowanie daty i czasu`,install:`pip install freezegun`,use:`Podmienia datetime.now(), date.today(), time.time() na kontrolowaną wartość. Testuj kod zależny od czasu bez czekania i bez flaky testów.`,example:`from freezegun import freeze_time
from datetime import datetime

@freeze_time("2024-01-15 12:00:00")
def test_wygasniecie_tokenu():
    token = create_token(expires_in=3600)
    assert not token.is_expired()  # "teraz" = 2024-01-15 12:00:00`},{name:`pytest-randomly`,icon:`🎯`,color:`#9E9E9E`,tagline:`Losowa kolejność testów — wykrywa flaky testy`,install:`pip install pytest-randomly`,use:`Losuje kolejność testów przy każdym uruchomieniu. Wykrywa testy które zależą od kolejności wykonania (flaky tests). Seed można powtórzyć do debugowania.`,example:`pytest                        # losowa kolejność
pytest -p no:randomly         # wyłącz losowanie
pytest --randomly-seed=1234   # powtórz konkretne losowanie`}]},an=[{category:`Uruchamianie testów`,icon:`▶️`,items:[{cmd:`pytest`,desc:`Uruchom wszystkie testy w projekcie`,detail:{what:`Znajduje i uruchamia wszystkie pliki test_*.py i *_test.py w bieżącym folderze i podfolderach. Wyświetla podsumowanie passed/failed/error.`,how:`pytest skanuje drzewo katalogów szukając plików testów. Automatycznie dodaje bieżący folder do sys.path.`,tips:[`pytest -v — verbose, widać każdy test osobno`,`pytest -q — quiet, tylko podsumowanie`,`Uruchom w folderze projektu (gdzie pyproject.toml)`]}},{cmd:`pytest -v`,desc:`Verbose — wyświetl każdy test osobno`,detail:{what:`Pokazuje nazwę każdego testu i jego wynik (PASSED/FAILED/SKIPPED). Bez -v widać tylko kropki i F.`,how:`Każda linia to jeden test: tests/test_scraper.py::test_fetch_returns_html PASSED`,tips:[`-v = verbose, -vv = bardzo verbose (pokazuje diff asercji)`,`Combine z -s: pytest -vs — verbose + print output`]}},{cmd:`pytest tests/test_scraper.py`,desc:`Uruchom tylko jeden plik testów`,detail:{what:`Uruchamia testy tylko z podanego pliku. Szybsze przy developmencie gdy pracujesz nad konkretnym modułem.`,how:`Podaj ścieżkę względną lub absolutną do pliku testów.`,tips:[`pytest tests/test_scraper.py::test_fetch_url — jeden konkretny test`,`pytest tests/test_scraper.py -v — plik + verbose`,`Tab completion działa dla ścieżek`]}},{cmd:`pytest -k "scraper"`,desc:`Uruchom testy zawierające słowo w nazwie`,detail:{what:`Filtruje testy po nazwie funkcji lub pliku. -k przyjmuje wyrażenie — możesz łączyć przez and, or, not.`,how:`pytest porównuje -k z nazwami plików, klas i funkcji testowych.`,flags:[{flag:`-k "scraper"`,desc:`Zawierające "scraper" w nazwie`},{flag:`-k "not slow"`,desc:`Wszystko oprócz "slow"`},{flag:`-k "fetch or parse"`,desc:`fetch LUB parse`}],tips:[`Wygodne przy pracy nad konkretną funkcją`,`Case-insensitive`]}},{cmd:`pytest -m smoke`,desc:`Uruchom testy z konkretnym markerem`,detail:{what:`Uruchamia tylko testy oznaczone @pytest.mark.smoke. Markery musisz zdefiniować w pytest.ini/pyproject.toml.`,how:`pytest filtruje po markerach przed uruchomieniem.`,flags:[{flag:`-m smoke`,desc:`Tylko smoke testy`},{flag:`-m "not slow"`,desc:`Pomiń wolne testy`},{flag:`-m "smoke or integration"`,desc:`smoke lub integration`}],tips:[`Zdefiniuj markery w pyproject.toml żeby uniknąć ostrzeżeń`,`pytest --markers — pokaż wszystkie dostępne markery`]}},{cmd:`pytest -x`,desc:`Zatrzymaj przy pierwszym błędzie`,detail:{what:`Przerywa wykonywanie testów przy pierwszym FAILED. Przydatne gdy debug ujesz konkretny problem.`,how:`Normalne pytest uruchamia wszystkie testy i zbiera błędy. -x zatrzymuje się natychmiast.`,flags:[{flag:`-x`,desc:`Zatrzymaj przy 1. błędzie`},{flag:`--maxfail=3`,desc:`Zatrzymaj po 3 błędach`}],tips:[`Łącz z -v: pytest -xvs — zatrzymaj + verbose + stdout`,`Świetne gdy naprawiasz testy jeden po drugim`]}},{cmd:`pytest --lf`,desc:`Uruchom tylko ostatnio popsute testy`,detail:{what:`--lf = --last-failed. Uruchamia tylko testy które padły w poprzednim uruchomieniu. Oszczędza czas przy naprawianiu błędów.`,how:`pytest zapamiętuje wyniki w pliku .pytest_cache/. --lf czyta ten cache.`,tips:[`--lf — tylko failed`,`--ff — failed first, potem reszta`,`Świetne workflow: pytest → napraw błędy → pytest --lf`]}},{cmd:`pytest --tb=short`,desc:`Skróć traceback przy błędach`,detail:{what:`Kontroluje format traceback przy błędach. short = skrócony, long = pełny (domyślny), no = bez traceback, line = jedna linia.`,how:`Domyślny traceback może być bardzo długi. short pokazuje najważniejsze — gdzie błąd i jakie wartości.`,flags:[{flag:`--tb=short`,desc:`Skrócony traceback`},{flag:`--tb=long`,desc:`Pełny traceback (domyślny)`},{flag:`--tb=no`,desc:`Bez traceback`},{flag:`--tb=line`,desc:`Jedna linia na błąd`}],tips:[`Dodaj do pytest.ini: addopts = --tb=short`,`short jest czytelniejszy dla większości przypadków`]}}]},{category:`Coverage i raporty`,icon:`📊`,items:[{cmd:`pytest --cov=src`,desc:`Uruchom testy z pomiarem pokrycia kodu`,detail:{what:`Mierzy które linie kodu są uruchamiane podczas testów. Wymaga: pip install pytest-cov.`,how:`coverage.py instrumentuje kod — śledzi każdą wykonaną linię. Wynik: % linii objętych testami.`,tips:[`--cov=src — mierz tylko folder src/ (nie biblioteki)`,`pytest --cov=. — mierz cały projekt`,`Pierwszy krok: uruchom i sprawdź raport`]}},{cmd:`pytest --cov=src --cov-report=html`,desc:`Coverage z raportem HTML`,detail:{what:`Generuje interaktywny raport HTML w folderze htmlcov/. Kliknij plik i zobaczysz które linie są czerwone (nieobjęte).`,how:`coverage.py generuje HTML ze wszystkimi plikami źródłowymi. Czerwone linie = brak testu, zielone = objęte.`,tips:[`Otwórz htmlcov/index.html w przeglądarce`,`Szukaj funkcji z niskim % — to kandydaci do testów`,`Dodaj htmlcov/ do .gitignore`]}},{cmd:`pytest --cov=src --cov-fail-under=80`,desc:`Fail gdy coverage < 80%`,detail:{what:`Zwraca exit code 1 (błąd) gdy pokrycie kodu spada poniżej 80%. Idealne do CI/CD — blokuje merge gdy testy nie pokrywają wystarczająco dużo.`,how:`Po uruchomieniu testów coverage sprawdza % i zwraca odpowiedni exit code.`,tips:[`Zacznij od niższego progu (np. 60%) i podnoś stopniowo`,`Ustaw w pyproject.toml: [tool.coverage.report] fail_under = 80`,`80% to dobry cel — 100% często nie jest praktyczne`]}},{cmd:`pytest --cov=src --cov-report=term-missing`,desc:`Pokaż brakujące linie w terminalu`,detail:{what:`Wyświetla raport coverage bezpośrednio w terminalu z numerami linii które nie są objęte testami.`,how:`Każdy plik: nazwa, % coverage, numery brakujących linii. Szybsze niż otwieranie HTML.`,tips:[`Kolumna "Missing" pokazuje numery linii bez testów`,`Łącz z -v: pytest -v --cov=src --cov-report=term-missing`]}}]},{category:`Instalacja pluginów`,icon:`🔌`,items:[{cmd:`pip install pytest-asyncio`,desc:`Plugin dla async testów`,detail:{what:`Pozwala pisać async def test_ funkcje. Wymagane do testowania asyncio, FastAPI async endpoints, aiohttp.`,how:`pytest-asyncio uruchamia async testy przez asyncio event loop.`,tips:[`Dodaj do pyproject.toml: asyncio_mode = "auto"`,`Bez asyncio_mode = "auto" musisz dekorować: @pytest.mark.asyncio`,`Wersja 0.21+ wymaga explicit konfiguracji mode`]}},{cmd:`pip install pytest-mock`,desc:`Mockowanie z mocker fixture`,detail:{what:`Dodaje fixture mocker — wrapper na unittest.mock. Prostsze API niż bezpośredni mock.patch.`,how:`mocker.patch() = context manager mock który automatycznie czyści po teście. Nie musisz pamiętać o stop().`,tips:[`mocker.patch("module.function") — podmień funkcję`,`mocker.spy(obj, "method") — obserwuj wywołania bez podmiany`,`mocker.MagicMock() — twórz mock obiekty`]}},{cmd:`pip install pytest-cov`,desc:`Pomiar pokrycia kodu`,detail:{what:`Integracja coverage.py z pytest. Dodaje flagę --cov do pytest.`,how:`coverage.py mierzy które linie kodu są wykonywane podczas testów.`,tips:[`Zawsze instaluj razem: pip install pytest pytest-cov`,`Konfiguracja w pyproject.toml: [tool.coverage.run]`]}},{cmd:`pip install pytest-xdist`,desc:`Równoległe wykonywanie testów`,detail:{what:`Uruchamia testy na wielu CPU równolegle. Drastycznie przyspiesza duże zestawy testów.`,how:`Dzieli testy między wątki/procesy. Każdy worker dostaje podzbiór testów.`,flags:[{flag:`-n auto`,desc:`Tyle workerów ile CPU`},{flag:`-n 4`,desc:`4 równoległe workery`},{flag:`-n 0`,desc:`Wyłącz (serial)`}],tips:[`pytest -n auto — automatyczna liczba workerów`,`Fixtures z scope=session mogą mieć problemy z xdist`,`Nie używaj gdy testy mają shared state`]}},{cmd:`pip install freezegun`,desc:`Mockowanie daty i czasu`,detail:{what:`Podmienia datetime.now(), date.today(), time.time() na kontrolowaną wartość. Testuj kod zależny od czasu bez czekania.`,how:`@freeze_time("2024-01-15") dekorator lub context manager. Podmienia we wszystkich modułach jednocześnie.`,tips:[`@freeze_time("2024-01-15 12:00:00") — konkretna data i czas`,`with freeze_time("2024-01-01"): — context manager`,`Działa też na asyncio i threading`]}},{cmd:`pip install responses`,desc:`Mockowanie HTTP requests`,detail:{what:`Przechwytuje wywołania requests.get/post itp. i zwraca zdefiniowane odpowiedzi. Testy bez prawdziwego HTTP.`,how:`@responses.activate dekorator + responses.add() definiuje mock response. Wszystkie niezdefinowane requesty rzucają ConnectionError.`,tips:[`Lepsze niż monkeypatch dla requests`,`responses.calls — sprawdź ile razy wywołano endpoint`,`Dla httpx: pip install respx (analogiczne API)`]}}]},{category:`Debugowanie testów`,icon:`🐛`,items:[{cmd:`pytest -s`,desc:`Pokaż print() output podczas testów`,detail:{what:`pytest domyślnie przechwytuje stdout (ukrywa print()). -s = --capture=no, wyłącza przechwytywanie.`,how:`Bez -s: print() w testach jest ukryte (tylko przy błędzie). Z -s: widzisz wszystkie print() na bieżąco.`,tips:[`pytest -vs — verbose + stdout (najczęstsze combo przy debugowaniu)`,`Alternatywa: użyj capfd fixture zamiast print()`]}},{cmd:`pytest --pdb`,desc:`Wejdź w debugger przy pierwszym błędzie`,detail:{what:`Przy padnięciu testu automatycznie otwiera Python debugger (pdb). Możesz interaktywnie sprawdzić zmienne, wywołać funkcje.`,how:`pdb uruchamia się w miejscu gdzie test padł. Masz dostęp do wszystkich lokalnych zmiennych.`,tips:[`n = next line, s = step into, c = continue, q = quit`,`p zmienna — wypisz wartość`,`--pdb --pdbcls=IPython.core.debugger:Pdb — IPython debugger (ładniejszy)`]}},{cmd:`pytest -v --tb=long 2>&1 | head -100`,desc:`Ogranicz output do pierwszych 100 linii`,detail:{what:`Przy wielu błędach output może być ogromny. Pipe do head ogranicza wyświetlane linie.`,how:`2>&1 = przekieruj stderr do stdout. head -100 = pokaż pierwsze 100 linii.`,tips:[`Przydatne gdy masz setki testów i wiele błędów`,`Alternatywa: pytest -x — zatrzymaj przy pierwszym błędzie`]}},{cmd:`pytest --co`,desc:`Pokaż jakie testy zostaną uruchomione (bez uruchamiania)`,detail:{what:`--co = --collect-only. Wyświetla listę wszystkich testów które zostaną znalezione i uruchomione. Bez faktycznego uruchamiania.`,how:`pytest zbiera testy, wypisuje ich nazwy i kończy. Zero wykonania.`,tips:[`Sprawdź przed uruchomieniem czy -k filtruje właściwie`,`pytest --co -q — lista bez verbose`,`Zobaczysz hierarchię: plik → klasa → funkcja`]}}]}],on={meta:{id:`pytest`,name:`pytest`,icon:`🧪`,color:`#0A9EDC`,color2:`#F5C518`,tagline:`Najpopularniejszy framework testowy dla Pythona`,year:2004,author:`Holger Krekel`,lang:`Python 3.8+`,github:`pytest-dev/pytest`,stars:`12k+`,codeLang:`Python`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Asercje`},{id:`hooki`,label:`Fixtures`},{id:`routing`,label:`Markery`},{id:`state`,label:`Async`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Pluginy`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać pytest?`,firstComponent:`Pierwszy test`,firstComponentLang:`Python`},intro:{title:`Czym jest pytest?`,desc:`pytest to framework do testowania kodu Python. Pozwala pisać testy jako zwykłe funkcje (nie klasy jak w unittest). Automatycznie wykrywa pliki testów, daje czytelne raporty błędów i ma ogromny ekosystem pluginów. Standard branżowy w automatyzacji i backend developmencie.`},concepts:[{title:`Auto-discovery`,desc:`pytest automatycznie znajduje testy w plikach test_*.py lub *_test.py, funkcjach test_* i klasach Test*. Zero konfiguracji — po prostu uruchom pytest.`,icon:`🔍`},{title:`Fixtures`,desc:`Fixtures to funkcje przygotowujące dane/zasoby dla testów. Wstrzykiwane automatycznie przez nazwę argumentu. Scope kontroluje czas życia (function, class, module, session).`,icon:`🔧`},{title:`Asercje`,desc:`Używasz zwykłego assert Pythona. pytest automatycznie pokazuje wartości zmiennych gdy asercja padnie — nie potrzebujesz assertEqual, assertTrue itp.`,icon:`✅`},{title:`Markery`,desc:`Markery (@pytest.mark.*) oznaczają testy: skip, xfail, parametrize. Możesz też tworzyć własne markery do grupowania testów.`,icon:`🏷️`}],whenToUse:[`Testowanie skryptów automatyzacji (sprawdź czy scraper zwraca dane)`,`Testy jednostkowe funkcji i klas Python`,`Testy integracyjne FastAPI, bazy danych, Redis`,`Testy parametryczne — jeden test, wiele przypadków wejściowych`,`CI/CD — automatyczne testy przed deployem`],firstComponent:`# test_scraper.py
import pytest
from scraper import fetch_page, parse_links

def test_fetch_returns_html():
    result = fetch_page("https://example.com")
    assert result is not None
    assert "<html" in result.lower()

def test_parse_links_finds_urls():
    html = '<a href="https://google.com">link</a>'
    links = parse_links(html)
    assert len(links) == 1
    assert "google.com" in links[0]

# Uruchom: pytest test_scraper.py -v`},komponenty:[{title:`Podstawowe asercje — assert`,desc:`Używasz zwykłego Python assert. Gdy test padnie, pytest pokazuje dokładnie co porównywał — wartości zmiennych, różnice.`,code:`def test_basic_assertions():
    # Równość
    assert 1 + 1 == 2
    assert "hello".upper() == "HELLO"

    # Zawieranie
    assert "python" in "i love python"
    assert 3 in [1, 2, 3, 4]

    # Prawdziwość
    assert bool([1, 2, 3])    # niepusta lista = True
    assert not bool([])        # pusta lista = False

    # Porównania
    assert 10 > 5
    assert 0.1 + 0.2 == pytest.approx(0.3)  # floaty!`},{title:`pytest.approx — porównywanie liczb zmiennoprzecinkowych`,desc:`Nigdy nie porównuj floatów przez ==. pytest.approx obsługuje tolerancję przy porównaniach.`,code:`import pytest

def test_float_comparison():
    # ❌ To PADNIE — 0.1 + 0.2 = 0.30000000000000004
    # assert 0.1 + 0.2 == 0.3

    # ✅ Prawidłowo
    assert 0.1 + 0.2 == pytest.approx(0.3)
    assert 0.1 + 0.2 == pytest.approx(0.3, rel=1e-6)

    # Działa też na listach
    assert [0.1 + 0.2, 0.4 + 0.1] == pytest.approx([0.3, 0.5])`},{title:`pytest.raises — testowanie wyjątków`,desc:`Sprawdź czy kod rzuca wyjątek którego oczekujesz. Kluczowe przy testowaniu walidacji.`,code:`import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)

def test_raises_with_message():
    with pytest.raises(ValueError, match="divide by zero"):
        divide(10, 0)

def test_raises_and_inspect():
    with pytest.raises(KeyError) as exc_info:
        {}["missing_key"]
    assert "missing_key" in str(exc_info.value)`},{title:`Porównywanie słowników i list`,desc:`pytest pokazuje czytelne diff przy porównywaniu złożonych struktur danych.`,code:`def test_dict_comparison():
    result = {"name": "Alice", "age": 30, "active": True}
    expected = {"name": "Alice", "age": 30, "active": True}
    assert result == expected

def test_list_subset():
    scraped_urls = ["https://a.com", "https://b.com", "https://c.com"]
    assert "https://b.com" in scraped_urls
    assert len(scraped_urls) == 3

def test_dict_contains_key():
    data = {"status": "ok", "count": 42}
    assert "status" in data
    assert data["count"] > 0`},{title:`capfd — przechwytywanie output`,desc:`Testuj co twój kod wypisuje na stdout/stderr. Przydatne dla skryptów automatyzacji.`,code:`def greet(name):
    print(f"Hello, {name}!")

def test_output(capfd):
    greet("Łukasz")
    captured = capfd.readouterr()
    assert "Hello, Łukasz!" in captured.out
    assert captured.err == ""  # nic na stderr

def test_log_output(capfd):
    import logging
    logging.warning("Test warning")
    # caplog fixture dla logowania:
    # assert "Test warning" in caplog.text`},{title:`monkeypatch — podmiana obiektów`,desc:`Podmień funkcję, metodę lub zmienną środowiskową na czas testu. Kluczowe przy testowaniu bez zewnętrznych API.`,code:`import requests

def get_status(url):
    response = requests.get(url)
    return response.status_code

def test_get_status_mocked(monkeypatch):
    class FakeResponse:
        status_code = 200

    # Podmieniamy requests.get — NIE wywołuje prawdziwego HTTP
    monkeypatch.setattr(requests, "get", lambda url: FakeResponse())

    result = get_status("https://example.com")
    assert result == 200

def test_env_variable(monkeypatch):
    monkeypatch.setenv("API_KEY", "test_key_123")
    import os
    assert os.environ["API_KEY"] == "test_key_123"`}],hooki:[{name:`Fixture — podstawy`,desc:`Fixture to funkcja dekorowana @pytest.fixture. Jej zwracana wartość jest wstrzykiwana do testu przez nazwę argumentu.`,when:`Dane testowe, połączenia z DB, klienci HTTP, pliki tymczasowe`,code:`import pytest

@pytest.fixture
def sample_data():
    return {
        "urls": ["https://a.com", "https://b.com"],
        "timeout": 30
    }

@pytest.fixture
def empty_list():
    return []

def test_scraper_config(sample_data):
    # pytest automatycznie wstrzykuje sample_data
    assert len(sample_data["urls"]) == 2
    assert sample_data["timeout"] == 30

def test_with_multiple(sample_data, empty_list):
    # Możesz użyć wielu fixtures naraz
    empty_list.extend(sample_data["urls"])
    assert len(empty_list) == 2`},{name:`Fixture scope — czas życia`,desc:`Scope kontroluje jak często fixture jest tworzona. session = raz na całą sesję testów. Idealne dla drogich zasobów (połączenie DB).`,when:`Optymalizacja — np. jeden client HTTP dla wszystkich testów zamiast tworzenia przy każdym`,code:`import pytest
import httpx

# function (domyślnie) — nowy dla każdego testu
@pytest.fixture
def fresh_data():
    return []

# module — raz na plik testów
@pytest.fixture(scope="module")
def http_client():
    client = httpx.Client()
    yield client       # yield zamiast return = cleanup po testach
    client.close()     # cleanup

# session — raz na całą sesję pytest
@pytest.fixture(scope="session")
def db_connection():
    conn = connect_to_db()
    yield conn
    conn.close()`},{name:`Fixture z yield — setup i teardown`,desc:`yield w fixture = kod przed yield to setup, kod po yield to teardown (cleanup). Gwarantowane wykonanie nawet gdy test padnie.`,when:`Pliki tymczasowe, połączenia z bazą, serwery mock — cokolwiek wymagającego sprzątania`,code:`import pytest
import tempfile, os

@pytest.fixture
def temp_file():
    # SETUP — przed testem
    fd, path = tempfile.mkstemp(suffix=".txt")
    os.write(fd, b"test content")
    os.close(fd)

    yield path  # przekaż ścieżkę do testu

    # TEARDOWN — po teście (zawsze!)
    os.unlink(path)

def test_reads_file(temp_file):
    with open(temp_file) as f:
        content = f.read()
    assert "test content" in content
    # Plik usunięty automatycznie po teście`},{name:`conftest.py — wspólne fixtures`,desc:`Fixtures w conftest.py są dostępne dla wszystkich testów w tym folderze i podfolderach. Bez importowania.`,when:`Fixtures używane w wielu plikach testów — baza danych, klient HTTP, dane testowe`,code:`# conftest.py (w folderze tests/)
import pytest
import httpx

@pytest.fixture(scope="session")
def api_client():
    """Dostępne we WSZYSTKICH testach bez importu."""
    client = httpx.Client(base_url="http://localhost:8000")
    yield client
    client.close()

@pytest.fixture
def sample_user():
    return {"name": "Test User", "email": "test@test.com"}

# test_users.py — używa bez importu!
def test_create_user(api_client, sample_user):
    response = api_client.post("/users", json=sample_user)
    assert response.status_code == 201`},{name:`pytest-mock — mockowanie`,desc:`pytest-mock to wrapper na unittest.mock. mocker fixture daje łatwy dostęp do patch, MagicMock, spy.`,when:`Mockowanie zewnętrznych API, baz danych, plików — testy bez efektów ubocznych`,code:`# pip install pytest-mock
import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()

def test_fetch_mocked(mocker):
    # Mockuj requests.get
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"data": "test"}

    result = fetch_data("https://api.example.com")

    assert result == {"data": "test"}
    mock_get.assert_called_once_with("https://api.example.com")`},{name:`Fixture parametryzacja`,desc:`Fixture z params uruchamia test wielokrotnie — raz dla każdego parametru. Idealne do testowania wielu konfiguracji.`,when:`Testowanie tej samej logiki na różnych danych wejściowych, różne środowiska`,code:`import pytest

@pytest.fixture(params=["https://google.com", "https://github.com"])
def test_url(request):
    return request.param

def test_url_is_valid(test_url):
    # Test uruchomi się DWA razy:
    # raz z google.com, raz z github.com
    assert test_url.startswith("https://")
    assert len(test_url) > 10`}],...nn,...rn,komendy:an}},sn={routing:{install:`pip install requests`,version:`requests 2.31+`,sections:[{title:`Headers — nagłówki requestu`,code:`import requests

# Globalne headers dla session
with requests.Session() as session:
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
        "Accept": "application/json",
        "Accept-Language": "pl-PL,pl;q=0.9",
        "Referer": "https://google.com",
    })

    # Nadpisz header dla konkretnego requestu
    response = session.get(
        "https://api.example.com/data",
        headers={"Authorization": "Bearer TOKEN"},
        timeout=10
    )

# Sprawdź nagłówki odpowiedzi
print(response.headers["Content-Type"])
print(response.headers.get("X-Rate-Limit-Remaining", "brak"))`},{title:`Autoryzacja — Basic, Bearer, API Key`,code:`import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth

# Basic Auth
response = requests.get(
    "https://api.example.com/data",
    auth=HTTPBasicAuth("username", "password"),
    timeout=10
)
# Lub skrót:
response = requests.get(url, auth=("username", "password"), timeout=10)

# Bearer Token (JWT, OAuth)
headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9..."}
response = requests.get(url, headers=headers, timeout=10)

# API Key w nagłówku
headers = {"X-API-Key": "your-api-key-here"}
response = requests.get(url, headers=headers, timeout=10)

# API Key w query param
response = requests.get(url, params={"api_key": "KEY"}, timeout=10)`},{title:`Proxies — routing przez proxy`,code:`import requests

proxies = {
    "http": "http://proxy.example.com:8080",
    "https": "http://proxy.example.com:8080",
}

response = requests.get(
    "https://example.com",
    proxies=proxies,
    timeout=10
)

# SOCKS proxy (pip install requests[socks])
proxies = {
    "http": "socks5://user:pass@proxy:1080",
    "https": "socks5://user:pass@proxy:1080",
}

# Dla Session
with requests.Session() as session:
    session.proxies.update(proxies)
    response = session.get("https://example.com")`},{title:`SSL — weryfikacja certyfikatów`,code:`import requests

# Domyślnie — weryfikacja SSL włączona
response = requests.get("https://secure.example.com", timeout=10)

# Wyłącz weryfikację (DEV ONLY — nigdy w produkcji!)
response = requests.get(
    "https://self-signed.example.com",
    verify=False,          # ⚠️ niebezpieczne
    timeout=10
)
# Wycisz warning:
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Własny certyfikat CA
response = requests.get(
    "https://internal.company.com",
    verify="/path/to/ca-bundle.crt",
    timeout=10
)

# Certyfikat klienta (mTLS)
response = requests.get(url, cert=("client.crt", "client.key"))`},{title:`Timeouts — zawsze ustawiaj`,code:`import requests

# ❌ BEZ TIMEOUTU — może czekać w nieskończoność!
# response = requests.get(url)

# ✅ Zawsze podaj timeout
response = requests.get(url, timeout=10)  # 10s dla wszystkiego

# Rozdziel timeout na connect i read
response = requests.get(
    url,
    timeout=(5, 30)  # 5s połączenie, 30s odczyt
)
# Dla dużych plików: timeout=(5, None) — bez limitu odczytu

# Domyślny timeout dla całej sesji
with requests.Session() as session:
    session.request = lambda *a, **kw: (
        kw.setdefault("timeout", 10),
        super(requests.Session, session).request(*a, **kw)
    )[1]`},{title:`Redirecty — kontrola przekierowań`,code:`import requests

# Domyślnie requests podąża za redirectami (max 30)
response = requests.get("https://httpbin.org/redirect/3", timeout=10)
print(response.url)        # finalny URL
print(response.history)    # lista Response z redirectami

# Wyłącz podążanie za redirectami
response = requests.get(
    "https://httpbin.org/redirect/1",
    allow_redirects=False,
    timeout=10
)
print(response.status_code)  # 301 lub 302
print(response.headers["Location"])  # dokąd redirect`}]},state:[{name:`Scraping z User-Agent rotation`,icon:`🔄`,color:`#2C3E50`,complexity:`Średnia`,bundle:`requests + fake-useragent`,when:`Produkcyjny scraping gdzie chcesz unikać wykrycia bota`,code:`from fake_useragent import UserAgent
import requests, random, time

ua = UserAgent()

def random_session():
    session = requests.Session()
    session.headers["User-Agent"] = ua.random
    return session

urls = ["https://example.com/page/1", "https://example.com/page/2"]

for url in urls:
    with random_session() as s:
        response = s.get(url, timeout=10)
        print(f"{s.headers['User-Agent'][:50]}...")
    time.sleep(random.uniform(1, 3))  # losowy delay`},{name:`Concurrent requests — ThreadPoolExecutor`,icon:`⚡`,color:`#E74C3C`,complexity:`Średnia`,bundle:`concurrent.futures`,when:`Pobieranie wielu URLi jednocześnie przez wątki (requests jest sync)`,code:`import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

def fetch(url):
    try:
        r = requests.get(url, timeout=10)
        return url, r.status_code, len(r.content)
    except Exception as e:
        return url, None, str(e)

urls = [f"https://httpbin.org/get?n={i}" for i in range(10)]

with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(fetch, url): url for url in urls}

    for future in as_completed(futures):
        url, status, size = future.result()
        print(f"{status} | {size} bytes | {url}")`},{name:`Requests + BeautifulSoup pipeline`,icon:`🍲`,color:`#27AE60`,complexity:`Niska`,bundle:`requests + bs4`,when:`Klasyczny pipeline scrapingu: requests pobiera HTML, BeautifulSoup parsuje`,code:`import requests
from bs4 import BeautifulSoup

def scrape_links(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("http"):
            links.append({"text": a.text.strip(), "url": href})

    return links

results = scrape_links("https://python.org")
for link in results[:5]:
    print(f"{link['text']}: {link['url']}")`},{name:`Requests + FastAPI webhook`,icon:`🔔`,color:`#9B59B6`,complexity:`Niska`,bundle:`requests`,when:`Wysyłanie wyników automatyzacji do FastAPI, Slack, Discord, Telegram`,code:`import requests

def send_to_slack(message: str, webhook_url: str):
    payload = {
        "text": message,
        "username": "Automation Bot",
        "icon_emoji": ":robot_face:"
    }
    response = requests.post(webhook_url, json=payload, timeout=10)
    response.raise_for_status()
    return response.status_code

def notify_fastapi(data: dict, api_url: str, api_key: str):
    response = requests.post(
        f"{api_url}/webhook/results",
        json=data,
        headers={"X-API-Key": api_key},
        timeout=10
    )
    response.raise_for_status()
    return response.json()`},{name:`HTTP caching — nie scrape tego samego`,icon:`💾`,color:`#F39C12`,complexity:`Niska`,bundle:`requests-cache`,when:`Podczas developmentu — cache odpowiedzi żeby nie bombardować serwisów`,code:`import requests_cache
# pip install requests-cache

# Zainstaluj globalny cache (SQLite)
requests_cache.install_cache(
    "scraping_cache",
    expire_after=3600  # cache 1h
)

import requests

# Pierwszy request — prawdziwy HTTP
r = requests.get("https://api.github.com/users/torvalds", timeout=10)
print(r.from_cache)  # False

# Drugi request — z cache (natychmiastowy!)
r = requests.get("https://api.github.com/users/torvalds", timeout=10)
print(r.from_cache)  # True

# Wyczyść cache
requests_cache.clear()`},{name:`GraphQL przez requests`,icon:`🔷`,color:`#E10098`,complexity:`Niska`,bundle:`requests`,when:`API które używa GraphQL zamiast REST — GitHub API v4, Shopify, wiele nowoczesnych API`,code:`import requests

def graphql_query(endpoint, query, variables=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    payload = {"query": query, "variables": variables or {}}
    response = requests.post(endpoint, json=payload, headers=headers, timeout=10)
    response.raise_for_status()

    result = response.json()
    if "errors" in result:
        raise Exception(result["errors"])
    return result["data"]

# GitHub GraphQL API
query = """
query($login: String!) {
  user(login: $login) {
    name
    repositories { totalCount }
  }
}
"""
data = graphql_query(
    "https://api.github.com/graphql",
    query,
    variables={"login": "torvalds"},
    token="YOUR_GITHUB_TOKEN"
)`}]},cn={rywale:[{name:`httpx`,icon:`⚡`,color:`#009688`,tagline:`Nowoczesny HTTP client — sync i async`,pros:[`Async natywnie (await client.get())`,`API identyczne z requests`,`HTTP/2 support`,`Timeout domyślnie włączony`,`Używany przez FastAPI TestClient`],cons:[`Mniejsza społeczność niż requests`,`Mniej tutoriali`,`Trochę więcej RAM`],vsReact:`httpx to requests z async. Jeśli używasz asyncio lub FastAPI — httpx jest lepszym wyborem. Jeśli piszesz sync kod — requests jest prostszy i szybszy.`,bestFor:`Projekty async, FastAPI, kod z asyncio`},{name:`aiohttp`,icon:`🌊`,color:`#2196F3`,tagline:`Async HTTP — klient i serwer`,pros:[`Bardzo szybki async`,`Klient i serwer w jednej paczce`,`Streaming`,`WebSockets`],cons:[`Inne API niż requests (nie drop-in)`,`Więcej boilerplate`,`Tylko async`],vsReact:`aiohttp był standardem async zanim pojawił się httpx. Dziś httpx jest łatwiejszy (to samo API co requests). aiohttp wciąż lider w wydajności.`,bestFor:`Wysokowydajne serwisy async, WebSocket klienty, gdy potrzeba maksymalnej prędkości`},{name:`urllib3`,icon:`🔧`,color:`#607D8B`,tagline:`Niski poziom — requests używa urllib3 pod spodem`,pros:[`Niski overhead`,`Connection pooling`,`Wbudowany w requests`,`Pełna kontrola`],cons:[`Bardziej verbose API`,`Brak auto JSON parse`,`Trudniejszy w użyciu`,`Niższy poziom abstrakcji`],vsReact:`requests używa urllib3 pod spodem. Bezpośrednio urllib3 tylko gdy potrzebujesz maksymalnej kontroli lub minimalizujesz zależności.`,bestFor:`Biblioteki które nie chcą zależności od requests, niski overhead`},{name:`Scrapy`,icon:`🕷️`,color:`#60A839`,tagline:`Framework do scrapingu — nie biblioteka`,pros:[`Asynchroniczny scraping out of the box`,`Middleware, pipelines, extensions`,`Throttling, retry, robots.txt`,`Eksport do CSV, JSON, XML`],cons:[`Overkill dla prostych przypadków`,`Stroma krzywa uczenia`,`Trudna integracja z asyncio`,`Opinionated architektura`],vsReact:`requests = narzędzie (jedno zapytanie). Scrapy = framework (cały spider). Dla prostego scrapingu requests + BS4. Dla dużego projektu scrapingu z middleware i pipelines — Scrapy.`,bestFor:`Duże projekty scrapingu, crawling wielu stron, produkcyjne pipelines`},{name:`Playwright / Selenium`,icon:`🎭`,color:`#45BA4B`,tagline:`Browser automation — JavaScript rendering`,pros:[`Renderuje JavaScript`,`Prawdziwa przeglądarka`,`Obsługa dynamicznych stron (SPA)`,`Screenshots, PDF`],cons:[`100x wolniejszy niż requests`,`Duże zasoby (RAM, CPU)`,`Wymaga przeglądarki`,`Trudniejszy w skalowaniu`],vsReact:`requests działa na statycznym HTML (szybki, lekki). Playwright/Selenium uruchamia prawdziwą przeglądarkę (wolniejszy, ale scrape'uje strony z JS). Użyj requests gdzie możesz.`,bestFor:`Strony z dużo JavaScriptem, SPA (React, Vue), gdy requests zwraca pusty HTML`},{name:`httplib2`,icon:`📡`,color:`#9E9E9E`,tagline:`HTTP z caching — stara biblioteka`,pros:[`Wbudowany cache HTTP`,`Obsługuje ETag, Last-Modified`,`Małe zależności`],cons:[`Stary, mało aktywny`,`Gorsze API niż requests`,`Mała społeczność`,`Zastąpiony przez requests-cache`],vsReact:`httplib2 to historyczna alternatywa. Dziś requests + requests-cache robi to samo lepiej. Unikaj w nowych projektach.`,bestFor:`Legacy projekty które już go używają`}],pluginy:[{name:`responses`,icon:`🎭`,color:`#2196F3`,tagline:`Mockowanie HTTP w testach — najpopularniejszy`,install:`pip install responses`,use:`Przechwytuje wywołania requests i zwraca zdefiniowane odpowiedzi. Niezbędny do testowania kodu który robi HTTP bez dostępu do sieci. Integracja z pytest przez dekorator lub context manager.`,example:`import responses, requests

@responses.activate
def test_github_user():
    responses.add(responses.GET,
        'https://api.github.com/users/octocat',
        json={'login': 'octocat', 'public_repos': 8},
        status=200)
    r = requests.get('https://api.github.com/users/octocat')
    assert r.json()['login'] == 'octocat'
    assert len(responses.calls) == 1`},{name:`requests-mock`,icon:`🔧`,color:`#9C27B0`,tagline:`Alternatywne mockowanie — pytest fixture lub adapter`,install:`pip install requests-mock`,use:`Mockowanie przez pytest fixture lub context manager. Bardziej minimalistyczne niż responses. Dobra alternatywa gdy wolisz fixture-based approach.`,example:`def test_get_user(requests_mock):
    requests_mock.get(
        'http://api.example.com/users/1',
        json={'id': 1, 'name': 'Jan'})

    import requests
    r = requests.get('http://api.example.com/users/1')
    assert r.json()['name'] == 'Jan'`},{name:`requests-cache`,icon:`⚡`,color:`#FF9800`,tagline:`Automatyczne cachowanie odpowiedzi HTTP`,install:`pip install requests-cache`,use:`Cachuje odpowiedzi na dysku (SQLite) lub Redis. Przydatne przy scrapingu i prototypowaniu — API nie jest wywoływane wielokrotnie. Jeden import — zero zmian w kodzie.`,example:`import requests_cache
import requests

requests_cache.install_cache(
    'api_cache', expire_after=3600)  # 1 godzina TTL

# Wszystkie requesty są teraz cachowane:
r = requests.get('https://api.example.com/data')
print(r.from_cache)  # True przy kolejnym wywołaniu`},{name:`requests-toolbelt`,icon:`🛠️`,color:`#607D8B`,tagline:`Narzędzia do zaawansowanych przypadków`,install:`pip install requests-toolbelt`,use:`Oficjalne rozszerzenie maintainerów requests. Multipart upload z progress bar, retry adapter, dump request/response do debugowania, threaded downloader.`,example:`from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Automatyczne retry na błędy połączenia
retry_strategy = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[429, 500, 502, 503, 504]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)`},{name:`requests-oauthlib`,icon:`🔐`,color:`#4CAF50`,tagline:`OAuth 1.0 i OAuth 2.0`,install:`pip install requests-oauthlib`,use:`Autoryzacja OAuth dla API (Twitter, GitHub, Google). Automatycznie dodaje i odświeża tokeny. Obsługuje pełny flow OAuth — authorization code, client credentials, refresh.`,example:`from requests_oauthlib import OAuth2Session

# Client Credentials Flow (API-to-API)
oauth = OAuth2Session(client_id)
token = oauth.fetch_token(
    token_url, client_secret=client_secret)

r = oauth.get('https://api.example.com/resource')`},{name:`HTTPX`,icon:`🚀`,color:`#00BCD4`,tagline:`Nowoczesna alternatywa — async + HTTP/2`,install:`pip install httpx`,use:`API kompatybilne z requests ale z async/await. HTTP/2 support. Jeśli zaczynasz nowy projekt — rozważ httpx zamiast requests. Wymagane do testowania FastAPI przez TestClient.`,example:`import httpx

# Sync — identyczne API jak requests
r = httpx.get('https://api.example.com')
print(r.json())

# Async
async with httpx.AsyncClient() as client:
    r = await client.get('https://api.example.com')
    print(r.json())`},{name:`httpretty`,icon:`🕸️`,color:`#FF5722`,tagline:`Mockowanie na poziomie socket (framework-agnostic)`,install:`pip install httpretty`,use:`Mockuje HTTP na poziomie socketu — działa z requests, httplib, urllib3, boto i innymi. Gdy biblioteka nie jest oparta na requests, httpretty nadal działa.`,example:`import httpretty
import requests

httpretty.enable()
httpretty.register_uri(
    httpretty.GET,
    "https://api.example.com/data",
    body='{"status": "ok"}',
    content_type="application/json")

r = requests.get("https://api.example.com/data")
assert r.json() == {"status": "ok"}
httpretty.disable()`}]},ln=[{category:`Instalacja`,icon:`📦`,items:[{cmd:`pip install requests`,desc:`Zainstaluj requests`,detail:{what:`Instaluje bibliotekę requests. To jedyna zależność potrzebna do większości przypadków użycia.`,how:`requests ma minimalne zależności: urllib3, certifi, charset-normalizer, idna.`,tips:[`pip install requests[security] — dodaje PyOpenSSL, cryptography`,`pip install requests[socks] — obsługa SOCKS proxy`,`Sprawdź wersję: pip show requests`]}},{cmd:`pip install requests httpx`,desc:`requests + async httpx`,detail:{what:`Instaluje oba: requests dla kodu sync, httpx dla async. httpx ma identyczne API — łatwa migracja.`,how:`Dobra praktyka: requests w skryptach sync, httpx w FastAPI i asyncio.`,tips:[`httpx.Client() ≈ requests.Session()`,`httpx.AsyncClient() = async version`,`Migracja z requests: zamień requests.get na client.get`]}},{cmd:`pip install requests-cache`,desc:`Cache HTTP requestów`,detail:{what:`Automatycznie cache'uje odpowiedzi HTTP. Podczas developmentu nie musisz bombardować API — drugie zapytanie odpowie z cache natychmiast.`,how:`requests_cache.install_cache() podmienia transport requests. Przezroczyste — nie zmienisz kodu requestów.`,tips:[`requests_cache.install_cache("dev_cache", expire_after=3600)`,`Przydatne: scraping podczas developmentu — nie trafiasz na rate limit`,`requests_cache.clear() — wyczyść cache`]}},{cmd:`pip install fake-useragent`,desc:`Losowe User-Agent do scrapingu`,detail:{what:`Biblioteka z bazą prawdziwych User-Agent stringów. Rotuj UA przy każdym requeście żeby wyglądać jak prawdziwy użytkownik.`,how:`UserAgent().random = losowy UA z bazy. Aktualizuje bazę online.`,tips:[`from fake_useragent import UserAgent; ua = UserAgent()`,`session.headers["User-Agent"] = ua.random`,`ua.chrome, ua.firefox — konkretna przeglądarka`]}}]},{category:`Podstawowe HTTP`,icon:`🌐`,items:[{cmd:`requests.get(url)`,desc:`GET request — pobierz dane`,detail:{what:`Wysyła HTTP GET. Zwraca Response object. Najczęstsza metoda — pobieranie danych z API i stron.`,how:`r = requests.get(url). Zawsze sprawdź r.status_code lub wywołaj r.raise_for_status().`,flags:[{flag:`params={"key": "val"}`,desc:`Query string: ?key=val`},{flag:`headers={"Authorization": "Bearer TOKEN"}`,desc:`Nagłówki requestu`},{flag:`timeout=5`,desc:`Timeout w sekundach`},{flag:`verify=False`,desc:`Pomiń SSL (nie w prod)`}],tips:[`r.json() — parsuj JSON odpowiedzi`,`r.status_code == 200 — sprawdź sukces`,`Zawsze ustawiaj timeout= — bez tego wisząca sesja zawiesi skrypt`]}},{cmd:`requests.post(url, json=data)`,desc:`POST request — wyślij dane JSON`,detail:{what:`Wysyła HTTP POST z body jako JSON. json= automatycznie serializuje dict i ustawia Content-Type: application/json.`,how:`data = {"name": "Jan", "age": 30}. r = requests.post(url, json=data).`,flags:[{flag:`json=dict`,desc:`Body jako JSON (auto Content-Type)`},{flag:`data=dict`,desc:`Body jako form-data (application/x-www-form-urlencoded)`},{flag:`files={"file": open("plik.pdf","rb")}`,desc:`Upload pliku (multipart/form-data)`}],tips:[`json= dla REST API, data= dla formularzy HTML`,`r.json() — odpowiedź serwera jako dict`,`requests.post(url, data=json.dumps(d), headers={"Content-Type":"application/json"}) = to samo co json=d`]}},{cmd:`requests.put(url, json=data)`,desc:`PUT / PATCH — aktualizuj zasób`,detail:{what:`PUT = zamień cały zasób. PATCH = aktualizuj część zasobu.`,how:`r = requests.put(url, json=data) lub requests.patch(url, json={"field": "value"})`,tips:[`REST: PUT /users/5 zastępuje użytkownika, PATCH /users/5 aktualizuje pola`,`Oba zwracają Response jak GET i POST`]}},{cmd:`requests.delete(url)`,desc:`DELETE request — usuń zasób`,detail:{what:`Wysyła HTTP DELETE. REST API: usuwa zasób pod danym URL.`,how:`r = requests.delete(url). Często z nagłówkiem Authorization.`,tips:[`r.status_code == 204 = sukces bez treści (no content)`,`Dodaj headers={"Authorization": "Bearer TOKEN"} dla chronionych endpointów`]}}]},{category:`Session i nagłówki`,icon:`🔐`,items:[{cmd:`session = requests.Session()`,desc:`Sesja z persystentnym stanem (cookies, headers)`,detail:{what:`Session ponownie używa połączeń TCP i zachowuje cookies między requestami. Szybsza niż pojedyncze wywołania i utrzymuje login.`,how:`session = requests.Session(). Używaj jak requests: session.get(url), session.post(url, json=d).`,tips:[`session.headers.update({"Authorization": "Bearer TOKEN"}) — raz, działa wszędzie`,`with requests.Session() as s: — automatyczne zamknięcie`,`session.cookies — dostęp do cookies sesji`]}},{cmd:`headers = {"Authorization": "Bearer TOKEN"}`,desc:`Nagłówek autoryzacji Bearer`,detail:{what:`Najpopularniejszy sposób auth w REST API. Token JWT lub API key przekazywany w każdym requeście.`,how:`requests.get(url, headers=headers) lub session.headers.update(headers)`,flags:[{flag:`"Authorization": "Bearer TOKEN"`,desc:`JWT / OAuth token`},{flag:`"Authorization": "Basic BASE64"`,desc:`Basic auth (user:pass base64)`},{flag:`"X-API-Key": "klucz"`,desc:`API key w custom nagłówku`},{flag:`"Content-Type": "application/json"`,desc:`Typ treści (auto przy json=)`}],tips:[`requests.get(url, auth=("user", "pass")) — Basic auth automatycznie`,`Nie hardkoduj tokenów — ładuj z os.environ`]}},{cmd:`r = requests.get(url, timeout=(3, 10))`,desc:`Timeout połączenia i odczytu`,detail:{what:`(connect_timeout, read_timeout). 3s na nawiązanie połączenia, 10s na odpowiedź. Bez timeout skrypt może wisieć w nieskończoność.`,how:`timeout=5 = 5s na całość. timeout=(3,10) = osobne czasy.`,tips:[`ZAWSZE ustawiaj timeout w produkcji`,`requests.exceptions.Timeout — wyjątek gdy przekroczony`,`Typowe wartości: connect=3, read=30 dla API, read=60 dla dużych plików`]}}]},{category:`Odpowiedzi i błędy`,icon:`📨`,items:[{cmd:`r.raise_for_status()`,desc:`Rzuć wyjątek dla błędów HTTP (4xx/5xx)`,detail:{what:`Rzuca requests.exceptions.HTTPError gdy status code to błąd. Czysta obsługa bez if r.status_code != 200.`,how:`r = requests.get(url); r.raise_for_status() — po tej linii wiesz że status jest OK.`,tips:[`try: r.raise_for_status() except requests.HTTPError as e: print(e.response.status_code)`,`r.ok — True gdy status_code < 400 (prostsze niż raise_for_status dla warunkowej logiki)`]}},{cmd:`data = r.json()`,desc:`Parsuj JSON odpowiedzi`,detail:{what:`Deserializuje JSON z odpowiedzi. Rzuca json.JSONDecodeError gdy odpowiedź nie jest JSON.`,how:`r = requests.get(url); data = r.json(). Działa dla list i obiektów.`,flags:[{flag:`r.text`,desc:`Treść jako string`},{flag:`r.content`,desc:`Treść jako bytes (obrazki, pliki)`},{flag:`r.json()`,desc:`Treść jako Python dict/list`},{flag:`r.status_code`,desc:`Kod HTTP (200, 404, ...)`},{flag:`r.headers`,desc:`Nagłówki odpowiedzi jako dict`}],tips:[`r.encoding — encoding odpowiedzi (auto-wykryty)`,`Sprawdź r.headers["Content-Type"] przed r.json()`]}},{cmd:`except requests.exceptions.RequestException as e:`,desc:`Złap wszystkie błędy requests`,detail:{what:`RequestException to bazowy wyjątek dla wszystkich błędów requests. Złap na końcu po bardziej szczegółowych.`,how:`Hierarchia: ConnectionError → Timeout, HTTPError → wszystkie pod RequestException.`,flags:[{flag:`requests.exceptions.Timeout`,desc:`Przekroczono timeout`},{flag:`requests.exceptions.ConnectionError`,desc:`Brak połączenia z serwerem`},{flag:`requests.exceptions.HTTPError`,desc:`Błąd HTTP (4xx/5xx) po raise_for_status`},{flag:`requests.exceptions.RequestException`,desc:`Bazowy — łapie wszystko`}],tips:[`Zawsze obsłuż co najmniej Timeout i ConnectionError`,`e.response.status_code — kod gdy HTTPError`]}}]},{category:`Testowanie requestów`,icon:`🧪`,items:[{cmd:`pip install responses`,desc:`Mock HTTP requestów w testach`,detail:{what:`Przechwytuje calls do requests i zwraca zdefiniowane odpowiedzi. Testy bez prawdziwego HTTP.`,how:`@responses.activate + responses.add() = zamień prawdziwy HTTP na mock.`,tips:[`from responses import activate, add, GET`,`@activate dekorator lub with RequestsMock() as rsps:`,`responses.calls[0].request — sprawdź co zostało wysłane`]}},{cmd:`curl -X GET https://httpbin.org/get`,desc:`Test endpoint przez curl`,detail:{what:`httpbin.org to serwis do testowania HTTP. Zwraca echo requestu — headers, params, body. Używaj do sprawdzenia co wysyłasz.`,how:`curl = command-line HTTP klient. Szybkie sprawdzenie bez pisania kodu Python.`,flags:[{flag:`-X POST`,desc:`Metoda HTTP`},{flag:`-H "Authorization: Bearer TOKEN"`,desc:`Nagłówek`},{flag:`-d '{"key":"val"}'`,desc:`Body`},{flag:`-v`,desc:`Verbose — pokaż headers`}],tips:[`httpbin.org/anything — zwraca wszystko o requeście`,`httpbin.org/delay/2 — opóźnij odpowiedź o 2s (test timeout)`,`httpbin.org/status/404 — zwróć konkretny status code`]}},{cmd:`python -m requests --help`,desc:`requests CLI (jeśli zainstalowany)`,detail:{what:`Niektóre wersje requests mają CLI do szybkich testów z linii poleceń.`,how:`Alternatywa: użyj httpie (pip install httpie) — czytelniejszy CLI niż curl.`,tips:[`pip install httpie — polecana alternatywa`,`http GET https://api.github.com/users/torvalds — httpie`,`http POST https://api.example.com/data key=value — httpie auto JSON`]}}]},{category:`Debugging i monitoring`,icon:`🔍`,items:[{cmd:`python -c "import requests; print(requests.__version__)"`,desc:`Sprawdź wersję requests`,detail:{what:`Wyświetla zainstalowaną wersję requests. Przydatne przy debugowaniu lub sprawdzeniu czy instalacja się powiodła.`,how:`-c "kod" = uruchom jednolinijkowy kod Python.`,tips:[`pip show requests — więcej info (wersja, lokalizacja, zależności)`,`pip list | grep requests — lista paczek z "requests" w nazwie`]}},{cmd:`pip install logging`,desc:`Loguj szczegóły HTTP (wbudowane)`,detail:{what:`requests używa modułu logging. Włącz DEBUG żeby widzieć pełne szczegóły każdego requestu i odpowiedzi.`,how:`logging.basicConfig(level=logging.DEBUG) włącza logi urllib3 (używany przez requests).`,tips:[`import logging; logging.basicConfig(level=logging.DEBUG)`,`Zobaczysz: URL, headers requestu, headers odpowiedzi, timing`,`W produkcji wyłącz: logging.getLogger("urllib3").setLevel(logging.WARNING)`]}},{cmd:`pip install httpretty`,desc:`Alternatywny mock HTTP do testów`,detail:{what:`Alternatywa dla responses — mockuje HTTP na poziomie socket. Działa z requests, urllib, urllib3.`,how:`@httpretty.activate + httpretty.register_uri() definiuje mock.`,tips:[`Bardziej niski poziom niż responses`,`Działa z dowolną biblioteką HTTP (nie tylko requests)`,`responses jest prostszy dla czystego requests`]}}]},{category:`Produkcja i scraping`,icon:`🚀`,items:[{cmd:`pip install requests[socks]`,desc:`Obsługa SOCKS proxy`,detail:{what:`Dodaje obsługę SOCKS4/SOCKS5 proxy. Potrzebne do routowania przez Tor, własne proxy, VPN.`,how:`Instaluje PySocks. Używaj: proxies={"https": "socks5://host:port"}.`,tips:[`Tor: socks5://127.0.0.1:9050`,`socks5h:// = DNS przez proxy (ważne dla anonimowości)`,`pip install requests[socks] — dodaje PySocks dependency`]}},{cmd:`pip install tenacity`,desc:`Retry z backoff — profesjonalna wersja`,detail:{what:`Biblioteka do retry logic z dekoratorami. Bardziej elastyczna niż Retry z urllib3.`,how:`@retry dekorator z konfiguracją kiedy i jak ponawiać. backoff_factor, stop_after_attempt, retry_if_exception_type.`,tips:[`@retry(stop=stop_after_attempt(3), wait=wait_exponential())`,`retry_if_exception_type(requests.exceptions.Timeout)`,`Logowanie prób: before=before_log(logger, logging.DEBUG)`]}},{cmd:`pip install ratelimit`,desc:`Rate limiting dekoratorem`,detail:{what:`Prosty dekorator @limits do ograniczenia częstotliwości wywołań funkcji. Nie przekroczysz limitu API.`,how:`@limits(calls=10, period=60) = max 10 wywołań na 60 sekund. Rzuca RateLimitException gdy przekroczony.`,tips:[`from ratelimit import limits, sleep_and_retry`,`@sleep_and_retry @limits(calls=5, period=1) — czekaj zamiast rzucać błąd`,`Alternatywa: time.sleep() między requestami (prostsze)`]}}]}],un={meta:{id:`requests`,name:`requests`,icon:`🌐`,color:`#2C3E50`,color2:`#E74C3C`,tagline:`HTTP dla ludzi — najpopularniejsza biblioteka Python`,year:2011,author:`Kenneth Reitz`,lang:`Python 3.7+`,github:`psf/requests`,stars:`52k+`,codeLang:`Python`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Metody HTTP`},{id:`hooki`,label:`Sesje`},{id:`routing`,label:`Auth & Headers`},{id:`state`,label:`Zaawansowane`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Rozszerzenia`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać requests?`,firstComponent:`Pierwszy request`,firstComponentLang:`Python`},intro:{title:`Czym jest requests?`,desc:`requests to najpopularniejsza biblioteka Python do wykonywania zapytań HTTP. "HTTP dla ludzi" — proste API, czytelny kod, automatyczna obsługa JSON, cookies, sesji i autoryzacji. Podstawa każdego projektu scrapingu i automatyzacji w Pythonie. Pobierana ponad 300 milionów razy miesięcznie.`},concepts:[{title:`Response Object`,desc:`Każde zapytanie zwraca obiekt Response z: status_code, text, json(), headers, cookies, content (bytes). Jeden obiekt = wszystko o odpowiedzi.`,icon:`📦`},{title:`Session`,desc:`Session przechowuje ustawienia między requestami: cookies, headers, auth. Wielokrotnie szybsza niż osobne requesty — reużywa połączenia TCP.`,icon:`🔗`},{title:`Timeout`,desc:`ZAWSZE ustawiaj timeout. Bez niego request może czekać w nieskończoność i zamrozić skrypt. timeout=(connect, read) — osobno dla połączenia i odczytu.`,icon:`⏱️`},{title:`Raise for Status`,desc:`response.raise_for_status() rzuca wyjątek przy błędzie HTTP (4xx, 5xx). Krótszy i bezpieczniejszy niż ręczne sprawdzanie status_code.`,icon:`🔴`}],whenToUse:[`Scraping stron — pobieranie HTML do parsowania przez BeautifulSoup`,`Komunikacja z REST API — pobieranie i wysyłanie danych`,`Automatyzacja — login, wypełnianie formularzy, pobieranie plików`,`Monitoring — sprawdzanie czy serwis działa`,`Integracja z zewnętrznymi serwisami (Slack, GitHub, webhooks)`],firstComponent:`import requests

# Najprostsze GET
response = requests.get("https://api.github.com/users/tiangolo")

# Sprawdź status
print(response.status_code)  # 200

# JSON automatycznie
user = response.json()
print(user["name"])       # Sebastián Ramírez
print(user["public_repos"])

# ZAWSZE ustawiaj timeout!
response = requests.get("https://api.github.com", timeout=10)`},komponenty:[{title:`GET — pobieranie danych`,desc:`Podstawowa metoda HTTP. params= automatycznie enkoduje parametry query string. Nie musisz ręcznie budować URL.`,code:`import requests

# Prosty GET
response = requests.get("https://httpbin.org/get")

# Z parametrami query string
# Automatycznie buduje: /search?q=python&page=2&per_page=10
response = requests.get(
    "https://api.github.com/search/repositories",
    params={"q": "python", "page": 2, "per_page": 10},
    timeout=10
)

data = response.json()
print(f"Status: {response.status_code}")
print(f"Znaleziono: {data['total_count']} repozytoriów")`},{title:`POST — wysyłanie danych`,desc:`POST do wysyłania danych. json= automatycznie serializuje dict i ustawia Content-Type: application/json. data= dla form data.`,code:`import requests

# POST JSON (API)
response = requests.post(
    "https://httpbin.org/post",
    json={"username": "test", "action": "scrape"},  # auto Content-Type JSON
    timeout=10
)

# POST form data (formularz HTML)
response = requests.post(
    "https://example.com/login",
    data={"username": "user", "password": "pass"},  # form-encoded
    timeout=10
)

# POST z plikiem
with open("data.csv", "rb") as f:
    response = requests.post(
        "https://api.example.com/upload",
        files={"file": ("data.csv", f, "text/csv")},
        timeout=30
    )`},{title:`PUT, PATCH, DELETE`,desc:`Pełne CRUD przez HTTP. PUT = zastąp zasób, PATCH = aktualizuj częściowo, DELETE = usuń.`,code:`import requests

BASE = "https://api.example.com"

# PUT — zastąp cały zasób
response = requests.put(
    f"{BASE}/users/42",
    json={"name": "Alice", "email": "alice@test.com"},
    timeout=10
)

# PATCH — aktualizuj częściowo
response = requests.patch(
    f"{BASE}/users/42",
    json={"email": "new@email.com"},  # tylko email
    timeout=10
)

# DELETE
response = requests.delete(f"{BASE}/users/42", timeout=10)
print(response.status_code)  # 204 No Content`},{title:`Response — odczytywanie odpowiedzi`,desc:`Obiekt Response zawiera wszystko o odpowiedzi. Zawsze sprawdzaj status przed odczytem danych.`,code:`import requests

response = requests.get("https://api.github.com/users/torvalds", timeout=10)

# Status code
print(response.status_code)       # 200
print(response.ok)                 # True jeśli 200-299

# Rzuć wyjątek dla 4xx/5xx — ZALECANE
response.raise_for_status()

# Treść odpowiedzi
print(response.text)               # string (HTML, JSON jako string)
print(response.json())             # dict (automatyczny parse JSON)
print(response.content)            # bytes (obrazy, PDF)

# Metadane
print(response.headers["Content-Type"])
print(response.url)                # finalny URL (po redirectach)
print(response.elapsed)            # czas odpowiedzi
print(response.history)            # lista redirectów`},{title:`Obsługa błędów — exceptions`,desc:`Zawsze opakowuj requesty w try/except. requests może rzucić wyjątek przy problemach z siecią, timeout lub złym URL.`,code:`import requests
from requests.exceptions import (
    Timeout, ConnectionError, HTTPError, RequestException
)

def safe_get(url, timeout=10):
    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()  # rzuć dla 4xx, 5xx
        return response.json()

    except Timeout:
        print(f"Timeout po {timeout}s: {url}")
    except ConnectionError:
        print(f"Nie można połączyć: {url}")
    except HTTPError as e:
        print(f"HTTP błąd {e.response.status_code}: {url}")
    except RequestException as e:
        print(f"Nieznany błąd: {e}")

    return None`},{title:`Pobieranie plików — streaming`,desc:`Duże pliki pobieraj przez streaming — nie ładuj całości do pamięci. stream=True + iter_content() = pobieranie chunkami.`,code:`import requests

def download_file(url, output_path):
    response = requests.get(url, stream=True, timeout=30)
    response.raise_for_status()

    total = int(response.headers.get("content-length", 0))
    downloaded = 0

    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                print(f"\\r{downloaded}/{total} bytes", end="")

    print(f"\\n✅ Pobrano: {output_path}")

download_file("https://example.com/large_file.zip", "file.zip")`}],hooki:[{name:`Session — reużywanie połączeń`,desc:`Session utrzymuje połączenie TCP między requestami (keep-alive). Reużywa cookies i headers. Znacznie szybszy przy wielu requestach do tego samego hosta.`,when:`Wiele requestów do jednego API, scraping z logowaniem, wszelka automatyzacja`,code:`import requests

# BEZ Session — nowe połączenie TCP każdy request
# requests.get(url1)
# requests.get(url2)  # nowe połączenie!

# Z Session — jedno połączenie TCP
with requests.Session() as session:
    # Ustaw raz dla wszystkich requestów
    session.headers.update({
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "pl-PL"
    })

    # Wszystkie requesty reużywają połączenie
    r1 = session.get("https://api.example.com/page/1")
    r2 = session.get("https://api.example.com/page/2")
    r3 = session.get("https://api.example.com/page/3")
# Session automatycznie zamknięta przez with`},{name:`Session z logowaniem`,desc:`Zaloguj się przez Session — cookies są automatycznie przechowywane i wysyłane w kolejnych requestach. Idealne do scrapowania stron za loginem.`,when:`Scraping za loginem, automatyzacja formularzy, utrzymywanie sesji użytkownika`,code:`import requests

with requests.Session() as session:
    # Krok 1: Zaloguj się
    login_response = session.post(
        "https://example.com/login",
        data={"email": "user@test.com", "password": "secret"},
        timeout=10
    )
    login_response.raise_for_status()

    # Session automatycznie zapisała cookies z logowania!
    print("Cookies:", session.cookies.get_dict())

    # Krok 2: Pobierz chronione zasoby
    # Cookies są automatycznie wysyłane
    dashboard = session.get("https://example.com/dashboard", timeout=10)
    data = session.get("https://example.com/api/my-data", timeout=10)

    print(data.json())`},{name:`Session z retry — automatyczne ponawianie`,desc:`HTTPAdapter z Retry automatycznie ponawia request przy błędach sieci lub 5xx. Kluczowe w produkcyjnym scrapingu.`,when:`Produkcyjny scraping, niestabilne API, długo działające skrypty automatyzacji`,code:`import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_resilient_session():
    session = requests.Session()

    retry = Retry(
        total=3,           # max 3 próby
        backoff_factor=1,  # czekaj 1s, 2s, 4s między próbami
        status_forcelist=[429, 500, 502, 503, 504],  # retry przy tych kodach
    )

    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)

    return session

with create_resilient_session() as session:
    response = session.get("https://api.example.com/data", timeout=10)
    # Automatycznie ponowi jeśli dostanie 503!`},{name:`Cookies — zarządzanie`,desc:`requests automatycznie obsługuje cookies. Możesz je ręcznie ustawiać, odczytywać i zapisywać między sesjami.`,when:`Scraping za loginem, bypass CSRF, utrzymywanie stanu sesji między uruchomieniami`,code:`import requests, json

with requests.Session() as session:
    # Ręczne ustawienie cookie
    session.cookies.set("session_id", "abc123", domain="example.com")

    # Odczytaj cookies po requeście
    session.get("https://example.com/login", timeout=10)
    cookies_dict = session.cookies.get_dict()
    print(cookies_dict)

    # Zapisz cookies do pliku (między uruchomieniami)
    with open("cookies.json", "w") as f:
        json.dump(cookies_dict, f)

# Wczytaj cookies w następnym uruchomieniu
with requests.Session() as session:
    with open("cookies.json") as f:
        cookies = json.load(f)
    session.cookies.update(cookies)`},{name:`Hooks — interceptory requestów`,desc:`response hooks = funkcje wywoływane po każdym requeście. Do logowania, retry logic, transformacji odpowiedzi.`,when:`Logowanie wszystkich requestów, auto-refresh tokenu, monitoring czasu odpowiedzi`,code:`import requests, time

def log_response(response, *args, **kwargs):
    print(f"{response.request.method} {response.url}")
    print(f"→ {response.status_code} ({response.elapsed.total_seconds():.2f}s)")

def auto_raise(response, *args, **kwargs):
    response.raise_for_status()

with requests.Session() as session:
    # Dodaj hooki — wywoływane po każdym requeście
    session.hooks["response"].append(log_response)
    session.hooks["response"].append(auto_raise)

    # Każdy request automatycznie loguje i rzuca przy błędzie
    session.get("https://api.example.com/data", timeout=10)`},{name:`Rate limiting — nie banuj się`,desc:`Przy scrapingu zawsze kontroluj częstotliwość requestów. Zbyt szybko = IP ban. time.sleep() lub biblioteka ratelimit.`,when:`Scraping publicznych stron, API z limitami, produkcyjna automatyzacja`,code:`import requests, time, random

def polite_scraper(urls, delay=1.0, jitter=0.5):
    """Scraper który nie dostanie bana."""
    with requests.Session() as session:
        session.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0)"

        for url in urls:
            try:
                response = session.get(url, timeout=10)
                response.raise_for_status()
                yield url, response.text

            except Exception as e:
                print(f"Błąd {url}: {e}")

            finally:
                # Czekaj między requestami (+ losowy jitter)
                sleep_time = delay + random.uniform(0, jitter)
                time.sleep(sleep_time)

for url, html in polite_scraper(["https://a.com", "https://b.com"]):
    print(f"✓ {url}: {len(html)} chars")`}],...sn,...cn,komendy:ln}},dn={id:`beautifulsoup`,name:`BeautifulSoup`,icon:`🍲`,color:`#3CB371`,color2:`#2E8B57`,tagline:`Parsowanie HTML i XML — scraping bez bólu`,year:2004,author:`Leonard Richardson`,lang:`Python 3.7+`,github:`waylan/beautifulsoup`,stars:`7k+`,codeLang:`python`,tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Selektory`},{id:`hooki`,label:`Nawigacja`},{id:`routing`,label:`Modyfikacja`},{id:`state`,label:`Zaawansowane`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}]},fn={meta:dn,tabs:dn.tabs,content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać BeautifulSoup?`,firstComponent:`Pierwsze parsowanie`,firstComponentLang:`python`},intro:{title:`Czym jest BeautifulSoup?`,desc:`BeautifulSoup (bs4) to biblioteka Python do parsowania dokumentów HTML i XML.
Tworzy drzewo parsowania z którego możesz wyciągać dane przez intuicyjne API.
Nie pobiera stron — to robi requests lub httpx. BS4 dostaje gotowy HTML i pozwala
wyszukiwać, nawigować i modyfikować strukturę dokumentu.
Standard web scrapingu w Pythonie — prosta, tolerancyjna na "brudny" HTML.
`},concepts:[{title:`Parser — silnik parsowania`,icon:`⚙️`,desc:`BS4 potrzebuje zewnętrznego parsera HTML. Trzy opcje:
• html.parser — wbudowany w Python, dobry na start, wolniejszy
• lxml — najszybszy, wymaga: pip install lxml
• html5lib — najbardziej tolerancyjny (jak przeglądarka), wolny
Wybór wpływa na wyniki dla "brudnego" HTML — przetestuj oba.
`},{title:`Drzewo DOM`,icon:`🌳`,desc:`HTML jest drzewem obiektów. BeautifulSoup reprezentuje każdy element jako Tag,
tekst jako NavigableString, cały dokument jako BeautifulSoup.
Możesz nawigować w górę (parent), w dół (children) i w bok (siblings).
`},{title:`find vs find_all`,icon:`🔍`,desc:`find() zwraca pierwszy pasujący element lub None.
find_all() zwraca listę wszystkich pasujących (może być pusta).
Oba przyjmują tag, atrybuty, tekst, funkcję filtrującą lub regex.
Skrót: soup("div") == soup.find_all("div")
`},{title:`CSS Selectors — select()`,icon:`🎯`,desc:`soup.select("div.klasa") używa selektorów CSS jak w przeglądarce.
Obsługuje klasy (.klasa), ID (#id), atrybuty ([href]), zagnieżdżenie (div p),
bezpośrednie dziecko (div > p), pseudoklasy (:nth-of-type).
Szybszy w nauce jeśli znasz CSS.
`},{title:`NavigableString — tekst`,icon:`📝`,desc:`tag.string — tekst bezpośrednio w elemencie (None jeśli są pod-elementy).
tag.get_text() — cały tekst razem z zagnieżdżonymi, można strip() i separator.
tag.strings — generator wszystkich fragmentów tekstu.
tag.stripped_strings — bez białych znaków.
`},{title:`Requests + BS4`,icon:`🌐`,desc:`Standardowy pattern: requests.get(url) → response.text → BeautifulSoup().
Zawsze ustaw User-Agent żeby nie być zablokowanym.
Sprawdzaj response.status_code przed parsowaniem.
Dla dynamicznych stron (JavaScript) — potrzebujesz Selenium lub Playwright.
`}],whenToUse:[`Wyciąganie danych ze stron HTML — ceny, tytuły, opisy, linki`,`Parsowanie plików HTML/XML lokalnie (raporty, eksport danych)`,`Web scraping gdy strona renderuje HTML po stronie serwera (nie JS)`,`Czyszczenie HTML — wyciągnij czysty tekst z artykułów`,`Zbieranie danych do ML/analizy — buduj datasety ze stron webowych`,`Monitorowanie zmian na stronach — ceny produktów, oferty pracy`,`Automatyczne zbieranie linków, obrazków, plików do pobrania`],firstComponent:`import requests
from bs4 import BeautifulSoup

# Pobierz stronę
url = "https://books.toscrape.com"
headers = {"User-Agent": "Mozilla/5.0 (scraper-demo/1.0)"}
response = requests.get(url, headers=headers)
response.raise_for_status()  # rzuć błąd jeśli != 200

# Utwórz parser
soup = BeautifulSoup(response.text, "html.parser")

# Znajdź element
title = soup.find("title")
print(title.text)  # Books to Scrape...

# Znajdź wszystkie produkty
books = soup.find_all("article", class_="product_pod")
print(f"Znaleziono: {len(books)} książek")

for book in books[:3]:
    name  = book.h3.a["title"]
    price = book.find("p", class_="price_color").text
    print(f"{name}: {price}")
`},komponenty:{title:`Selektory — wyszukiwanie elementów`,items:[{name:`find / find_all — podstawowe wyszukiwanie`,desc:`find() zwraca pierwszy pasujący element. find_all() zwraca listę wszystkich.
Możesz filtrować po nazwie tagu, klasie CSS, ID, atrybutach i tekście.
`,code:`from bs4 import BeautifulSoup

html = """
<div class="container">
  <h1 id="title">Tytuł strony</h1>
  <p class="intro">Pierwszy paragraf</p>
  <p class="content">Drugi paragraf</p>
  <a href="/page1">Link 1</a>
  <a href="/page2" class="external">Link 2</a>
</div>
"""
soup = BeautifulSoup(html, "html.parser")

# Znajdź pierwszy tag
h1 = soup.find("h1")
print(h1.text)  # Tytuł strony

# Znajdź po klasie CSS
intro = soup.find("p", class_="intro")
print(intro.text)

# Znajdź po ID
title = soup.find(id="title")

# Wszystkie linki
links = soup.find_all("a")
for link in links:
    print(link["href"], link.text)

# Wszystkie tagi określonego rodzaju
paragraphs = soup.find_all("p")
print(f"Paragrafów: {len(paragraphs)}")
`},{name:`select() — selektory CSS`,desc:`select() używa składni CSS — ta sama co w przeglądarce.
select_one() zwraca pierwszy element (odpowiednik find()).
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")

# Klasa CSS
soup.select(".product_pod")           # elementy z klasą
soup.select("p.intro")               # p z klasą intro

# ID
soup.select("#title")                # element z ID
soup.select_one("#main-nav")         # tylko pierwszy

# Zagnieżdżenie
soup.select("div p")                 # p wewnątrz div
soup.select("div > p")              # bezpośrednie dziecko

# Atrybuty
soup.select("a[href]")              # a z atrybutem href
soup.select('a[href="/contact"]')   # konkretna wartość
soup.select('a[href^="https"]')     # zaczyna się od https
soup.select('a[href$=".pdf"]')      # kończy się .pdf
soup.select('a[href*="page"]')      # zawiera "page"

# Kombinacje
soup.select("table.data-table tr td:nth-of-type(2)")
`},{name:`Filtrowanie zaawansowane`,desc:`find_all przyjmuje: string (regex), listę tagów, słownik atrybutów,
wartość True, lub funkcję filtrującą.
`,code:`import re
from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")

# Regex w nazwie tagu
headings = soup.find_all(re.compile("^h[1-6]$"))  # h1-h6

# Regex w atrybucie
internal = soup.find_all("a", href=re.compile("^/"))

# Lista tagów
tags = soup.find_all(["p", "span", "div"])

# Dowolny tag z konkretnym atrybutem
data = soup.find_all(True, attrs={"data-id": True})

# Funkcja filtrująca
def has_class_and_href(tag):
    return tag.has_attr("href") and tag.has_attr("class")

tagged_links = soup.find_all(has_class_and_href)

# Filtruj po tekście
soup.find_all("p", string="dokładny tekst")
soup.find_all("p", string=re.compile("fragment"))

# Ogranicz liczbę wyników
soup.find_all("a", limit=5)
`},{name:`Atrybuty elementów`,desc:`Atrybuty HTML dostępne jak słownik. get() bezpieczne dla brakujących atrybutów.
Klasy CSS zwracane jako lista (bo element może mieć wiele klas).
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup('<a href="/path" class="btn primary" data-id="42">Kliknij</a>', "html.parser")
tag = soup.find("a")

# Dostęp do atrybutu
print(tag["href"])          # /path
print(tag.get("href"))      # /path (bezpieczniejsze — None jeśli brak)
print(tag.get("title", "")) # "" jeśli brak atrybutu

# Klasy — lista!
print(tag["class"])         # ["btn", "primary"]
print("btn" in tag["class"])  # True

# Niestandardowe atrybuty
print(tag["data-id"])       # 42

# Wszystkie atrybuty
print(tag.attrs)  # {"href": "/path", "class": ["btn","primary"], "data-id":"42"}

# Sprawdź czy atrybut istnieje
if tag.has_attr("href"):
    print("Ma href")
`}]},hooki:{title:`Nawigacja po drzewie DOM`,items:[{name:`Nawigacja w dół — dzieci i potomkowie`,desc:`Dostęp do dzieci elementu: .children (generator), .contents (lista),
.descendants (wszyscy potomkowie rekurencyjnie).
`,code:`from bs4 import BeautifulSoup

html = """
<ul id="menu">
  <li class="item"><a href="/home">Home</a></li>
  <li class="item"><a href="/about">O nas</a></li>
  <li class="item active"><a href="/contact">Kontakt</a></li>
</ul>
"""
soup = BeautifulSoup(html, "html.parser")
menu = soup.find("ul")

# Bezpośrednie dzieci (generator)
for child in menu.children:
    if child.name:  # pomiń NavigableString (whitespace)
        print(child.text.strip())

# Lista dzieci
items = menu.contents
print(f"Elementów: {len([i for i in items if i.name])}")

# Wszyscy potomkowie (rekurencyjnie)
for desc in menu.descendants:
    if hasattr(desc, "name") and desc.name == "a":
        print(desc["href"])

# Skrót — bezpośredni dostęp po tagu
first_li = menu.li           # pierwszy <li>
first_a  = menu.li.a        # pierwszy <a> w pierwszym <li>
print(first_a.text)          # Home
`},{name:`Nawigacja w górę — rodzice`,desc:`parent — bezpośredni rodzic elementu.
parents — generator wszystkich rodziców aż do BeautifulSoup.
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")
link = soup.find("a", href="/contact")

# Bezpośredni rodzic
li = link.parent
print(li.name)           # li
print(li["class"])       # ["item", "active"]

# Wszyscy rodzice
for parent in link.parents:
    if parent.name:
        print(parent.name)  # li → ul → [document]

# Sprawdź czy element ma rodzica z klasą
if "active" in link.parent.get("class", []):
    print("Link jest aktywny")
`},{name:`Nawigacja w bok — rodzeństwo`,desc:`next_sibling / previous_sibling — sąsiedni element (uwaga: może być whitespace!).
next_siblings / previous_siblings — generatory wszystkich rodzeństw.
`,code:`from bs4 import BeautifulSoup

html = "<ul><li>A</li><li>B</li><li>C</li></ul>"
soup = BeautifulSoup(html, "html.parser")
items = soup.find_all("li")

first = items[0]

# Następne rodzeństwo (może być NavigableString = whitespace!)
next_el = first.next_sibling
# Pomiń whitespace:
while next_el and not next_el.name:
    next_el = next_el.next_sibling
print(next_el.text)   # B

# Poprzednie rodzeństwo
last = items[-1]
prev = last.previous_sibling
while prev and not prev.name:
    prev = prev.previous_sibling
print(prev.text)   # B

# Wszystkie następne rodzeństwa
for sibling in first.next_siblings:
    if sibling.name:
        print(sibling.text)  # B, C
`},{name:`Wyciąganie tekstu`,desc:`.text / .get_text() zwraca tekst elementu. get_text() ma opcje:
separator dla łączenia, strip dla usunięcia białych znaków.
`,code:`from bs4 import BeautifulSoup

html = """
<div>
  <h2>  Tytuł  </h2>
  <p>Pierwszy <strong>ważny</strong> paragraf.</p>
  <p>Drugi paragraf.</p>
</div>
"""
soup = BeautifulSoup(html, "html.parser")
div = soup.find("div")

# .text — wszystko razem
print(div.text)
# "\\n  Tytuł  \\nPierwszy ważny paragraf.\\nDrugi paragraf.\\n"

# get_text() z opcjami
print(div.get_text(strip=True))
# "TytułPierwszy ważny paragraf.Drugi paragraf."

print(div.get_text(separator="\\n", strip=True))
# "Tytuł\\nPierwszy\\nważny\\nparagraf.\\nDrugi paragraf."

# .string — tylko gdy JEDEN bezpośredni tekst
p = soup.find("p")
print(p.string)   # None (bo ma <strong> w środku)

h2 = soup.find("h2")
print(h2.string)  # "  Tytuł  "
print(h2.string.strip())  # "Tytuł"
`}]},routing:{title:`Modyfikacja drzewa DOM`,items:[{name:`Zmiana zawartości elementów`,desc:`Zmieniaj tekst, atrybuty i zawartość HTML elementów.
BS4 pozwala modyfikować sparsowany dokument i serializować z powrotem do HTML.
`,code:`from bs4 import BeautifulSoup

html = '<p class="old">Stary tekst</p>'
soup = BeautifulSoup(html, "html.parser")
p = soup.find("p")

# Zmień tekst
p.string = "Nowy tekst"
print(soup)  # <p class="old">Nowy tekst</p>

# Zmień atrybut
p["class"] = "new"
p["id"] = "main-para"

# Usuń atrybut
del p["class"]

# Zmień wiele atrybutów
p.attrs.update({"class": "updated", "data-version": "2"})

# Zawartość HTML
p.clear()  # usuń całą zawartość
from bs4 import NavigableString
p.append(NavigableString("Nowy "))
new_strong = soup.new_tag("strong")
new_strong.string = "ważny"
p.append(new_strong)
p.append(" tekst")
print(p)  # <p>Nowy <strong>ważny</strong> tekst</p>
`},{name:`Dodawanie i usuwanie elementów`,desc:`Twórz nowe tagi (new_tag), wstawiaj je (insert, append, insert_before),
przenoś i usuwaj (extract, decompose).
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup("<ul><li>A</li><li>C</li></ul>", "html.parser")
ul = soup.find("ul")

# Utwórz nowy tag
new_li = soup.new_tag("li")
new_li.string = "B"

# Wstaw między A i C (indeks 1)
ul.insert(1, new_li)
print(ul)  # <ul><li>A</li><li>B</li><li>C</li></ul>

# Dodaj na koniec
last_li = soup.new_tag("li")
last_li.string = "D"
ul.append(last_li)

# Wstaw przed/po elemencie
extra = soup.new_tag("li")
extra.string = "A0"
ul.li.insert_before(extra)

# Usuń element (wyciągnij z drzewa, zwróć)
removed = ul.find("li", string="A0").extract()

# Usuń całkowicie (niszczy element)
ul.find("li", string="D").decompose()

print(ul)
`},{name:`Opakowywanie i zastępowanie`,desc:`wrap() opakowuje element w nowy tag. replace_with() zastępuje element innym.
unwrap() usuwa tag ale zostawia zawartość.
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup("<p>Tekst <em>kursywa</em> koniec</p>", "html.parser")

# Opakuj em w span
em = soup.find("em")
em.wrap(soup.new_tag("span", attrs={"class": "highlight"}))
print(soup)
# <p>Tekst <span class="highlight"><em>kursywa</em></span> koniec</p>

# Usuń span ale zostaw em (unwrap)
soup.find("span").unwrap()
print(soup)
# <p>Tekst <em>kursywa</em> koniec</p>

# Zastąp element innym
new_strong = soup.new_tag("strong")
new_strong.string = "WAŻNE"
soup.find("em").replace_with(new_strong)
print(soup)
# <p>Tekst <strong>WAŻNE</strong> koniec</p>
`},{name:`Serializacja — z powrotem do HTML/tekstu`,desc:`Zapisz zmodyfikowane drzewo z powrotem do stringa.
str(soup) / soup.prettify() / element.decode().
`,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup("<div><p>Tekst</p></div>", "html.parser")

# Kompaktowy HTML (zachowuje strukturę)
print(str(soup))
# <div><p>Tekst</p></div>

# Czytelny HTML z wcięciami
print(soup.prettify())
# <div>
#  <p>
#   Tekst
#  </p>
# </div>

# Tylko zewnętrzny HTML elementu
div = soup.find("div")
print(div.decode())         # <div><p>Tekst</p></div>
print(div.decode_contents())  # <p>Tekst</p>

# Zapisz do pliku
with open("output.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
`}]},state:{title:`Zaawansowane wzorce scrapingu`,items:[{name:`Kompletny scraper z obsługą błędów`,desc:`Produkcyjny wzorzec scrapera: retry, timeouty, User-Agent, obsługa błędów HTTP,
rate limiting. Grzeczny scraper nie przeciąża serwerów.
`,code:`import requests
from bs4 import BeautifulSoup
import time
import logging
from dataclasses import dataclass

logging.basicConfig(level=logging.INFO)

@dataclass
class Product:
    name: str
    price: str
    rating: str
    url: str

def get_page(url: str, retries=3) -> BeautifulSoup | None:
    headers = {"User-Agent": "Mozilla/5.0 (research-bot/1.0; contact: you@email.com)"}
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            resp.raise_for_status()
            return BeautifulSoup(resp.text, "html.parser")
        except requests.RequestException as e:
            logging.warning(f"Próba {attempt+1}: {e}")
            time.sleep(2 ** attempt)  # exponential backoff
    return None

def scrape_products(base_url: str) -> list[Product]:
    products = []
    page = 1
    while True:
        url = f"{base_url}/catalogue/page-{page}.html"
        soup = get_page(url)
        if not soup:
            break

        articles = soup.find_all("article", class_="product_pod")
        if not articles:
            break

        for art in articles:
            products.append(Product(
                name=art.h3.a["title"],
                price=art.find("p", class_="price_color").text.strip(),
                rating=art.p["class"][1],
                url=base_url + "/catalogue/" + art.h3.a["href"].lstrip("../")
            ))
        logging.info(f"Strona {page}: {len(articles)} produktów")
        page += 1
        time.sleep(0.5)  # rate limiting — bądź grzeczny
    return products
`},{name:`Parsowanie tabel HTML`,desc:`Tabele HTML to częsty target scrapingu — kursy walut, tabele statystyk, rankingi.
Wyciągnij nagłówki i wiersze do listy słowników lub pandas DataFrame.
`,code:`from bs4 import BeautifulSoup
import pandas as pd

html = """
<table class="data">
  <thead><tr><th>Waluta</th><th>Kupno</th><th>Sprzedaż</th></tr></thead>
  <tbody>
    <tr><td>EUR</td><td>4.20</td><td>4.30</td></tr>
    <tr><td>USD</td><td>3.90</td><td>3.99</td></tr>
    <tr><td>GBP</td><td>4.90</td><td>5.05</td></tr>
  </tbody>
</table>
"""
soup = BeautifulSoup(html, "html.parser")
table = soup.find("table", class_="data")

# Nagłówki
headers = [th.text.strip() for th in table.thead.find_all("th")]
print(headers)  # ["Waluta", "Kupno", "Sprzedaż"]

# Wiersze
rows = []
for tr in table.tbody.find_all("tr"):
    cells = [td.text.strip() for td in tr.find_all("td")]
    rows.append(dict(zip(headers, cells)))

print(rows)
# [{"Waluta": "EUR", "Kupno": "4.20", "Sprzedaż": "4.30"}, ...]

# Szybko przez pandas (czyta tabele HTML automatycznie)
df = pd.read_html(str(table))[0]
print(df)
`},{name:`Scraping ze paginacją`,desc:`Większość stron ma paginację. Wzorzec: znajdź link "Następna strona",
scrape, przejdź dalej, aż nie będzie następnej strony.
`,code:`import requests
from bs4 import BeautifulSoup
import time

BASE = "https://books.toscrape.com/catalogue"

def scrape_all_pages():
    url = f"{BASE}/page-1.html"
    all_books = []

    while url:
        resp = requests.get(url, headers={"User-Agent": "demo/1.0"})
        soup = BeautifulSoup(resp.text, "html.parser")

        # Scrape bieżącej strony
        for book in soup.find_all("article", class_="product_pod"):
            all_books.append({
                "title": book.h3.a["title"],
                "price": book.find("p", class_="price_color").text.strip(),
            })

        # Znajdź link "next"
        next_btn = soup.find("li", class_="next")
        if next_btn:
            next_url = next_btn.a["href"]
            url = f"{BASE}/{next_url}"
            time.sleep(0.3)
        else:
            url = None  # ostatnia strona

    return all_books

books = scrape_all_pages()
print(f"Łącznie: {len(books)} książek")
`},{name:`Parsowanie JSONu w HTML`,desc:`Wiele nowoczesnych stron osadza dane w tagach <script type="application/ld+json">
lub JavaScript. Wyciągnij JSON bez Selenium.
`,code:`import json
import requests
from bs4 import BeautifulSoup

resp = requests.get("https://example-shop.com/product/123")
soup = BeautifulSoup(resp.text, "html.parser")

# JSON-LD (schema.org — częsty w sklepach i blogach)
ld_json = soup.find("script", type="application/ld+json")
if ld_json:
    data = json.loads(ld_json.string)
    print(data.get("name"))
    print(data.get("price"))

# Dane w window.__INITIAL_STATE__ = {...}
for script in soup.find_all("script"):
    if script.string and "window.__DATA__" in (script.string or ""):
        # Wyciągnij JSON przez regex
        import re
        match = re.search(r"window\\.__DATA__\\s*=\\s*(\\{.*?\\});", script.string, re.DOTALL)
        if match:
            data = json.loads(match.group(1))
            print(data)
`}]},rywale:{title:`Rywale — alternatywy dla BeautifulSoup`,items:[{name:`lxml — szybki parser XML/HTML`,icon:`⚡`,desc:`lxml to biblioteka C do parsowania XML i HTML — 10-50x szybsza niż html.parser.
Ma własne API (ElementTree) ale też działa jako parser dla BeautifulSoup.

Kiedy lxml zamiast BS4:
• Duże pliki XML/HTML (>1MB) — lxml jest znacząco szybszy
• XPath — lxml obsługuje pełne XPath 1.0, BS4 nie
• XML Schematy (XSD) i XSLT — tylko lxml
• cssselect z lxml działa wydajniej niż BS4.select()

Kiedy BS4 wygrywa:
BS4 jest bardziej tolerancyjny na "brudny" HTML, ma prostsze API,
obsługuje wiele parserów. lxml jest surowy — rzuca błędy przy niepoprawnym HTML.

pip install lxml
`},{name:`Scrapy — framework do scrapingu`,icon:`🕷️`,desc:`Kompletny framework do web scrapingu — nie tylko parser, ale cały pipeline.
Asynchroniczny, szybki, produkcyjny. Standard w profesjonalnym scrapingu.

Co ma Scrapy czego nie ma BS4:
• Asynchroniczne pobieranie wielu stron jednocześnie (Twisted)
• Automatyczna paginacja i queue requestów
• Middleware: proxy, retry, rate limiting, cookies
• Pipelines: walidacja, zapis do DB, eksport do CSV/JSON
• Scrapy Shell do interaktywnego testowania
• Scrapy Cloud do deploy'u

Kiedy BS4+requests wystarczy:
Małe projekty scraping (< 1000 stron), proste struktury, jednorazowe zadania.
Scrapy = overkill dla skryptu który uruchamiasz raz.

pip install scrapy
`},{name:`Playwright / Selenium — dynamiczne strony`,icon:`🎭`,desc:`Strony renderowane przez JavaScript (React, Vue, Next.js SSR) mogą być puste
gdy pobierasz przez requests. Playwright/Selenium uruchamia prawdziwą przeglądarkę.

Kiedy potrzebujesz przeglądarki:
• Strona wymaga wykonania JS żeby pokazać dane
• Login przez formularz z CSRF/captcha
• Infinite scroll (nowe dane ładowane przy scrollowaniu)
• WebSocket / real-time data

Workflow hybrydowy:
Playwright pobiera stronę po wykonaniu JS → response.text() → BeautifulSoup do parsowania.
Playwright do obsługi dynamiki, BS4 do wygodnego wyciągania danych ze statycznego HTML.
`},{name:`httpx — nowoczesny HTTP client`,icon:`🌐`,desc:`httpx to nowoczesna alternatywa dla requests — obsługuje async/await.
BS4 parsuje HTML niezależnie od tego jak go pobierzesz.

Kiedy httpx zamiast requests:
• Asynchroniczne pobieranie wielu stron jednocześnie (async/await)
• HTTP/2 support
• Connection pooling domyślnie
• Kompatybilny API z requests — łatwa migracja

pip install httpx

Przykład async scraping:
async with httpx.AsyncClient() as client:
    responses = await asyncio.gather(*[client.get(url) for url in urls])
    soups = [BeautifulSoup(r.text, "html.parser") for r in responses]
`}]},pluginy:{title:`Ekosystem BeautifulSoup`,items:[{name:`requests — pobieranie stron`,icon:`🌐`,desc:`Standardowy HTTP client do pobierania stron. Najpopularniejsza para z BS4.
Zawsze ustaw User-Agent i timeout. raise_for_status() przy błędach HTTP.

Instalacja: pip install requests
`,code:`import requests
from bs4 import BeautifulSoup

headers = {
    "User-Agent": "Mozilla/5.0 (scraper/1.0; +https://twoja-strona.pl)",
    "Accept-Language": "pl-PL,pl;q=0.9",
}

# Pobierz stronę
resp = requests.get("https://example.com", headers=headers, timeout=10)
resp.raise_for_status()      # wyjątek przy 4xx/5xx
resp.encoding = "utf-8"      # wymuś kodowanie jeśli źle wykrywa

soup = BeautifulSoup(resp.text, "html.parser")

# Session (cookies, auth)
session = requests.Session()
session.headers.update(headers)
resp = session.get("https://example.com/private")
`},{name:`lxml — szybki parser`,icon:`⚡`,desc:`Najszybszy parser dla BS4 — napisany w C. Dla dużych plików HTML/XML
nawet 10-50x szybszy niż html.parser.

Instalacja: pip install lxml
`,code:`from bs4 import BeautifulSoup

# Użyj lxml jako parsera (szybciej!)
soup = BeautifulSoup(html_content, "lxml")

# Dla XML (nie HTML)
soup = BeautifulSoup(xml_content, "lxml-xml")

# Własne API lxml (bez BS4) — z XPath
from lxml import etree, html
tree = html.fromstring(html_content)

# XPath — potężniejszy niż CSS selectors
prices = tree.xpath("//span[@class='price']/text()")
links  = tree.xpath("//a[@href]/@href")
`},{name:`pandas — tabele HTML → DataFrame`,icon:`🐼`,desc:`pandas.read_html() parsuje tabele HTML bez ręcznego BS4 kodu.
Zwraca listę DataFrames — jeden per tabela na stronie.

Instalacja: pip install pandas lxml
`,code:`import pandas as pd
import requests

url = "https://pl.wikipedia.org/wiki/Lista_pa%C5%84stw_%C5%9Bwiata"
resp = requests.get(url, headers={"User-Agent": "demo/1.0"})

# Automatyczne parsowanie wszystkich tabel na stronie
tables = pd.read_html(resp.text, encoding="utf-8")
print(f"Znaleziono {len(tables)} tabel")

df = tables[0]  # pierwsza tabela
print(df.head())
print(df.columns.tolist())

# Filtruj i eksportuj
df.to_csv("dane.csv", index=False)
df.to_excel("dane.xlsx", index=False)
`},{name:`cloudscraper — omijanie Cloudflare`,icon:`☁️`,desc:`Strony chronione przez Cloudflare blokują zwykłe requests.
cloudscraper symuluje przeglądarkę i obsługuje challenge Cloudflare.

Instalacja: pip install cloudscraper
`,code:`import cloudscraper
from bs4 import BeautifulSoup

# Drop-in replacement dla requests
scraper = cloudscraper.create_scraper(
    browser={"browser": "chrome", "platform": "windows", "mobile": False}
)

resp = scraper.get("https://cloudflare-protected-site.com")
soup = BeautifulSoup(resp.text, "html.parser")

# API jak requests
resp = scraper.post("https://example.com/login", data={"user": "x", "pass": "y"})
`},{name:`fake-useragent — rotacja User-Agentów`,icon:`🎭`,desc:`Rotuj User-Agent między requestami żeby unikać blokad.
Baza danych rzeczywistych User-Agentów przeglądarek.

Instalacja: pip install fake-useragent
`,code:`from fake_useragent import UserAgent
import requests

ua = UserAgent()

def get_random_headers():
    return {"User-Agent": ua.random}

# Każdy request z innym User-Agent
for url in urls:
    resp = requests.get(url, headers=get_random_headers())
    # ...
`}]},komendy:{title:`Komendy BeautifulSoup`,groups:[{name:`Instalacja`,icon:`📦`,commands:[{desc:`Zainstaluj BeautifulSoup4`,code:`pip install beautifulsoup4`},{desc:`Pełny zestaw scrapingowy`,code:`pip install beautifulsoup4 requests lxml html5lib`},{desc:`Z pandas do tabel HTML`,code:`pip install beautifulsoup4 requests lxml pandas openpyxl`},{desc:`Sprawdź wersję`,code:`python -c "import bs4; print(bs4.__version__)"`}]},{name:`Szybkie parsowanie`,icon:`⚡`,commands:[{desc:`Parsuj stronę online i wydrukuj tytuł`,code:`python -c "
import requests
from bs4 import BeautifulSoup
r = requests.get('https://example.com', headers={'User-Agent':'demo/1.0'})
s = BeautifulSoup(r.text, 'html.parser')
print(s.title.text)
"
`},{desc:`Wyciągnij wszystkie linki z URL`,code:`python -c "
import requests
from bs4 import BeautifulSoup
r = requests.get('https://example.com')
s = BeautifulSoup(r.text, 'html.parser')
links = [a['href'] for a in s.find_all('a', href=True)]
print('\\n'.join(links[:20]))
"
`},{desc:`Parsuj lokalny plik HTML`,code:`python -c "
from bs4 import BeautifulSoup
with open('strona.html', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')
print(soup.title.text)
"
`},{desc:`Wyciągnij tekst ze strony (bez tagów)`,code:`python -c "
import requests
from bs4 import BeautifulSoup
r = requests.get('https://example.com')
s = BeautifulSoup(r.text, 'html.parser')
print(s.get_text(separator='\\n', strip=True)[:500])
"
`}]},{name:`Scraping one-linery`,icon:`🎯`,commands:[{desc:`Znajdź elementy po klasie CSS`,code:`python -c "
import requests; from bs4 import BeautifulSoup
s = BeautifulSoup(requests.get('https://books.toscrape.com').text, 'html.parser')
books = s.find_all('article', class_='product_pod')
[print(b.h3.a['title'], b.find('p', class_='price_color').text) for b in books[:5]]
"
`},{desc:`Parsuj tabele HTML do CSV`,code:`python -c "
import pandas as pd
tables = pd.read_html('https://pl.wikipedia.org/wiki/Polska')
tables[0].to_csv('tabela.csv', index=False)
print('Zapisano tabela.csv')
"
`},{desc:`Pobierz wszystkie obrazki z strony`,code:`python -c "
import requests; from bs4 import BeautifulSoup
s = BeautifulSoup(requests.get('https://example.com').text, 'html.parser')
imgs = [img.get('src', '') for img in s.find_all('img') if img.get('src')]
print('\\n'.join(imgs[:10]))
"
`}]},{name:`Testowanie i debugowanie`,icon:`🔍`,commands:[{desc:`Sprawdź dostępne parsery`,code:`python -c "
for p in ['html.parser','lxml','html5lib']:
    try:
        from bs4 import BeautifulSoup
        BeautifulSoup('<p>test</p>', p)
        print(f'{p}: OK')
    except:
        print(f'{p}: brak (pip install {p})')
"
`},{desc:`Interaktywne testowanie BS4 (Python REPL)`,code:`python -c "
import requests; from bs4 import BeautifulSoup
html = requests.get('https://example.com').text
soup = BeautifulSoup(html, 'html.parser')
import code; code.interact(local=locals())
"
`},{desc:`Prettify HTML (sformatuj czytelnie)`,code:`python -c "
from bs4 import BeautifulSoup
html = open('strona.html').read()
print(BeautifulSoup(html, 'html.parser').prettify()[:1000])
"
`}]}]}}},pn={routing:[{title:`asyncio.Lock — mutual exclusion`,desc:`Lock zapobiega równoczesnemu dostępowi do zasobu. Gdy jedna korutyna ma Lock, inne czekają. Async odpowiednik threading.Lock.`,code:`import asyncio

class SharedCounter:
    def __init__(self):
        self.value = 0
        self._lock = asyncio.Lock()

    async def increment(self, amount: int):
        async with self._lock:  # tylko jedna korutyna na raz
            current = self.value
            await asyncio.sleep(0)  # symulacja I/O
            self.value = current + amount

async def main():
    counter = SharedCounter()

    await asyncio.gather(*[
        counter.increment(1) for _ in range(100)
    ])

    print(f"Wynik: {counter.value}")  # zawsze 100, nie mniej

asyncio.run(main())`},{title:`asyncio.Event — sygnalizacja`,desc:`Event to flaga którą jedna korutyna ustawia (set()), a inne czekają (wait()). Używane do synchronizacji — "poczekaj aż coś się stanie".`,code:`import asyncio

async def waiter(event: asyncio.Event, name: str):
    print(f"{name}: czekam na sygnał...")
    await event.wait()
    print(f"{name}: dostałem sygnał!")

async def setter(event: asyncio.Event):
    await asyncio.sleep(2)
    print("Ustawiam event!")
    event.set()

async def main():
    event = asyncio.Event()

    await asyncio.gather(
        waiter(event, "Worker A"),
        waiter(event, "Worker B"),
        setter(event),
    )

asyncio.run(main())`},{title:`asyncio.Semaphore — ograniczenie współbieżności`,desc:`Semaphore pozwala N korutynom na raz. Kluczowe przy scrapingu — nie bombarduj serwera 1000 requestami jednocześnie. Ustaw limit np. 10.`,code:`import asyncio
import httpx

async def fetch(client: httpx.AsyncClient,
                url: str,
                sem: asyncio.Semaphore) -> str:
    async with sem:  # max 10 jednocześnie
        r = await client.get(url)
        return r.text[:50]

async def main():
    urls = [f"https://httpbin.org/delay/1?n={i}"
            for i in range(50)]

    sem = asyncio.Semaphore(10)  # max 10 równoległych

    async with httpx.AsyncClient() as client:
        wyniki = await asyncio.gather(*[
            fetch(client, url, sem) for url in urls
        ])

    print(f"Pobrano {len(wyniki)} stron")

asyncio.run(main())`},{title:`asyncio.Condition — zaawansowana synchronizacja`,desc:`Condition łączy Lock z powiadomieniami. Korutyny czekają (wait_for) aż warunek zostanie spełniony. Przydatne do producer-consumer z warunkami.`,code:`import asyncio

async def main():
    condition = asyncio.Condition()
    items = []

    async def producer():
        async with condition:
            items.append("gotowe")
            condition.notify_all()

    async def consumer():
        async with condition:
            await condition.wait_for(lambda: len(items) > 0)
            print(f"Odebrano: {items.pop()}")

    await asyncio.gather(consumer(), producer())

asyncio.run(main())`}],state:[{title:`Async context manager i async iterator`,desc:`Własne klasy mogą implementować __aenter__/__aexit__ (async with) i __aiter__/__anext__ (async for). Frameworki jak aiofiles, httpx używają tego wzorca.`,code:`import asyncio

class AsyncTimeit:
    async def __aenter__(self):
        import time
        self._start = time.perf_counter()
        return self

    async def __aexit__(self, *args):
        import time
        elapsed = time.perf_counter() - self._start
        print(f"Czas: {elapsed:.3f}s")

# Async generator (async iterator)
async def stream_numbers(n: int):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async with AsyncTimeit():
        async for num in stream_numbers(5):
            print(num)

asyncio.run(main())`},{title:`asyncio w FastAPI — jak to działa`,desc:`FastAPI używa asyncio pod spodem. Endpoint async def = może obsługiwać wiele requestów bez blokowania. Miksy sync/async w tym samym projekcie działają.`,code:`from fastapi import FastAPI
import asyncio
import httpx

app = FastAPI()

# Async endpoint — nie blokuje serwera podczas await
@app.get("/dane")
async def pobierz_dane():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com/data")
    return r.json()

# Endpoint synchroniczny — FastAPI uruchamia go w threadpool
# (nie blokuje event loop ale wątki są ograniczone)
@app.get("/sync")
def synchroniczny():
    import time
    time.sleep(1)  # blokuje wątek ale nie event loop
    return {"ok": True}

# Równoległy fetch wewnątrz endpointu
@app.get("/multi")
async def multi_fetch():
    async with httpx.AsyncClient() as client:
        r1, r2 = await asyncio.gather(
            client.get("https://api.example.com/a"),
            client.get("https://api.example.com/b"),
        )
    return {"a": r1.json(), "b": r2.json()}`},{title:`asyncio z bazą danych — asyncpg i SQLAlchemy async`,desc:`Synchroniczne sterowniki DB (psycopg2) blokują event loop. Używaj asyncpg (PostgreSQL) lub SQLAlchemy async mode z async sessionem.`,code:`import asyncio
import asyncpg

async def main():
    # asyncpg — najszybszy async PostgreSQL driver
    conn = await asyncpg.connect(
        "postgresql://user:password@localhost/db"
    )

    # Zapytanie
    rows = await conn.fetch(
        "SELECT id, name FROM users WHERE active = $1",
        True
    )

    for row in rows:
        print(row["id"], row["name"])

    # Batch insert
    await conn.executemany(
        "INSERT INTO logs(msg) VALUES($1)",
        [("log1",), ("log2",), ("log3",)]
    )

    await conn.close()

asyncio.run(main())`},{title:`Uruchamianie sync kodu w async — run_in_executor`,desc:`Nie zawsze możesz zmienić synchroniczny kod na async. run_in_executor() uruchamia sync funkcję w threadpool bez blokowania event loop.`,code:`import asyncio
from concurrent.futures import ThreadPoolExecutor
import time

def sync_operacja(n: int) -> int:
    """Blokująca operacja — np. stara biblioteka, I/O"""
    time.sleep(1)
    return n * 2

async def main():
    loop = asyncio.get_event_loop()

    # Uruchom sync w threadpool — nie blokuje event loop
    wynik = await loop.run_in_executor(None, sync_operacja, 5)
    print(f"Wynik: {wynik}")

    # Wiele jednocześnie
    wyniki = await asyncio.gather(*[
        loop.run_in_executor(None, sync_operacja, i)
        for i in range(5)
    ])
    print(wyniki)  # [0, 2, 4, 6, 8]

asyncio.run(main())`}]},mn={rywale:[{name:`threading`,icon:`🧵`,color:`#FF9800`,tagline:`Wbudowane wątki Pythona`,pros:[`Wbudowany w Python`,`Działa ze starym kodem`,`Proste dla blokujących operacji`,`Biblioteki sync działają od razu`],cons:[`GIL — brak prawdziwej równoległości CPU`,`Race conditions, deadlocki`,`Wysokie zużycie pamięci`,`Trudniejszy debugging`],vsReact:`threading dla I/O gdy biblioteki nie mają async wersji. asyncio szybsze i lżejsze dla I/O. Wiele wątków = dużo pamięci. Wiele korutyn = mało pamięci.`,bestFor:`Integracja z bibliotekami bez async wsparcia, GUI applications`},{name:`multiprocessing`,icon:`💻`,color:`#F44336`,tagline:`Prawdziwa równoległość — omija GIL`,pros:[`Omija GIL — prawdziwa równoległość CPU`,`Izolowane procesy (bezpieczeństwo)`,`Naturalne dla CPU-intensive zadań`],cons:[`Duże zużycie pamięci`,`Wolne startowanie procesów`,`Komunikacja przez pickle (serializacja)`,`Trudniejsza synchronizacja`],vsReact:`asyncio dla I/O, multiprocessing dla CPU. Liczenie, kompresja, ML, przetwarzanie obrazów = multiprocessing. HTTP, DB, pliki = asyncio.`,bestFor:`Obliczenia naukowe, ML preprocessing, kompresja danych, CPU-bound scraping`},{name:`trio`,icon:`🎸`,color:`#9C27B0`,tagline:`Alternatywny async framework — prostsze API`,pros:[`Prostszy model współbieżności`,`Nurseries zamiast Tasks`,`Bezpieczniejsza anulacja`,`Lepsza obsługa błędów`],cons:[`Nie kompatybilny z asyncio`,`Mniejszy ekosystem`,`Większość bibliotek pisze pod asyncio`,`Trudniejsza migracja`],vsReact:`trio ma prostszy, bezpieczniejszy model ale asyncio jest standardem. FastAPI, SQLAlchemy, aiohttp, httpx — wszystko na asyncio. Trio dla nowych projektów od zera.`,bestFor:`Nowe projekty gdzie bezpieczeństwo i prostota ważniejsze niż ekosystem`},{name:`concurrent.futures`,icon:`🔧`,color:`#607D8B`,tagline:`Wysoki poziom API dla wątków i procesów`,pros:[`Wbudowany w Python`,`Prosty interfejs (submit, map)`,`ThreadPoolExecutor i ProcessPoolExecutor`,`Future API podobny do async`],cons:[`Nie async natywnie`,`Brak event loop`,`Gorsze dla I/O niż asyncio`],vsReact:`concurrent.futures świetny do parallelizacji CPU przez ProcessPoolExecutor. asyncio.run_in_executor() integruje go z asyncio — używasz obu razem.`,bestFor:`Prosta parallelizacja CPU, migracja starszego kodu, kombinacja z asyncio`}],pluginy:[{name:`httpx`,icon:`🌐`,color:`#00BCD4`,tagline:`Async HTTP client — requests dla async world`,install:`pip install httpx`,use:`Async HTTP client z API jak requests. Niezbędny do async scrapingu, testowania FastAPI. Obsługuje HTTP/2, timeouts, retry. Używaj z async with i await.`,example:`import asyncio, httpx

async def fetch_many(urls: list[str]) -> list[str]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
    return [r.text for r in responses]`},{name:`aiofiles`,icon:`📁`,color:`#FF9800`,tagline:`Async operacje na plikach`,install:`pip install aiofiles`,use:`Wbudowane open() blokuje event loop. aiofiles.open() jest async — czytaj i pisz pliki bez blokowania. Ważne gdy serwer obsługuje wiele requestów jednocześnie.`,example:`import asyncio, aiofiles

async def czytaj_i_pisz():
    async with aiofiles.open("input.txt", "r") as f:
        zawartosc = await f.read()

    przetworzone = zawartosc.upper()

    async with aiofiles.open("output.txt", "w") as f:
        await f.write(przetworzone)

asyncio.run(czytaj_i_pisz())`},{name:`asyncpg`,icon:`🐘`,color:`#336791`,tagline:`Najszybszy async PostgreSQL driver`,install:`pip install asyncpg`,use:`Natywnie async driver dla PostgreSQL — 3x szybszy niż psycopg2. Bez ORM — czyste SQL z parametrami $1, $2. Standardowy wybór gdy używasz PostgreSQL z asyncio.`,example:`import asyncio, asyncpg

async def main():
    conn = await asyncpg.connect(
        "postgresql://user:pass@localhost/db")

    users = await conn.fetch(
        "SELECT * FROM users WHERE active=$1", True)

    await conn.executemany(
        "INSERT INTO logs(user_id, msg) VALUES($1, $2)",
        [(u["id"], "login") for u in users]
    )
    await conn.close()

asyncio.run(main())`},{name:`aiobotocore / aioboto3`,icon:`☁️`,color:`#FF9900`,tagline:`Async AWS SDK`,install:`pip install aioboto3`,use:`Async wrapper na boto3 (AWS SDK). S3, DynamoDB, SQS async. Gdy uploadujesz pliki do S3 lub czytasz z DynamoDB w async aplikacji.`,example:`import asyncio, aioboto3

async def upload_to_s3(file_path: str, bucket: str):
    session = aioboto3.Session()
    async with session.client("s3") as s3:
        await s3.upload_file(
            file_path, bucket,
            f"uploads/{file_path}"
        )
        print(f"Uploaded: {file_path}")

asyncio.run(upload_to_s3("report.pdf", "my-bucket"))`},{name:`aioredis`,icon:`🔴`,color:`#DC382D`,tagline:`Async Redis client`,install:`pip install redis[asyncio]`,use:`Async Redis — cachowanie, pub/sub, rate limiting w async aplikacjach. Wbudowany w oficjalny redis-py przez redis[asyncio]. Używany w FastAPI do cache i session store.`,example:`import asyncio
from redis.asyncio import Redis

async def main():
    r = Redis(host="localhost", decode_responses=True)

    await r.set("klucz", "wartość", ex=3600)  # TTL 1h
    val = await r.get("klucz")
    print(val)  # "wartość"

    # Pub/Sub
    pubsub = r.pubsub()
    await pubsub.subscribe("channel")

    await r.aclose()

asyncio.run(main())`},{name:`tenacity`,icon:`🔄`,color:`#4CAF50`,tagline:`Retry z backoff — niezawodne async operacje`,install:`pip install tenacity`,use:`Automatyczne ponawianie nieudanych operacji z exponential backoff. Gdy API zwraca 429 lub 503 — retry z odczekaniem. Działa z async/await.`,example:`from tenacity import (retry, stop_after_attempt,
                         wait_exponential, retry_if_exception_type)
import httpx

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    retry=retry_if_exception_type(httpx.HTTPError),
)
async def fetch_with_retry(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.json()`},{name:`pytest-asyncio`,icon:`🧪`,color:`#0A9EDC`,tagline:`Testowanie kodu async z pytest`,install:`pip install pytest-asyncio`,use:`Pozwala pisać async def test_* funkcje w pytest. Bez tego nie można testować korutyn. Konfiguracja asyncio_mode = "auto" w pyproject.toml eliminuje ręczne dekorowanie.`,example:`# pyproject.toml:
# [tool.pytest.ini_options]
# asyncio_mode = "auto"

import asyncio
import pytest

async def fetch_data():
    await asyncio.sleep(0.1)
    return {"status": "ok"}

async def test_fetch():
    result = await fetch_data()
    assert result["status"] == "ok"`}]},hn=[{category:`Instalacja bibliotek async`,icon:`📦`,items:[{cmd:`pip install aiohttp`,desc:`Async HTTP klient i serwer`,detail:{what:`Najczęściej używana biblioteka HTTP dla asyncio. Zastępuje requests w kodzie async. Szybsza przy wielu równoległych requestach.`,how:`async with aiohttp.ClientSession() as session: async with session.get(url) as r: data = await r.json()`,tips:[`Zawsze używaj ClientSession jako context manager (async with)`,`pip install aiohttp[speedups] — opcjonalnie szybszy z cchardet i aiodns`,`aiohttp.ClientTimeout(total=10) — timeout`]}},{cmd:`pip install aiofiles`,desc:`Async I/O plików`,detail:{what:`Pozwala czytać i pisać pliki asynchronicznie — nie blokuje event loop podczas operacji dyskowych.`,how:`async with aiofiles.open("plik.txt", "r") as f: content = await f.read()`,tips:[`Zwykłe open() blokuje event loop — przy dużych plikach użyj aiofiles`,`API identyczne jak wbudowane open() — tylko dodaj async/await`]}},{cmd:`pip install asyncpg`,desc:`Async driver PostgreSQL`,detail:{what:`Najszybszy async driver do PostgreSQL. Używany z FastAPI i SQLAlchemy async.`,how:`conn = await asyncpg.connect(dsn). Lub pool: pool = await asyncpg.create_pool(dsn)`,tips:[`pip install asyncpg — samodzielnie`,`pip install sqlalchemy[asyncio] asyncpg — z SQLAlchemy`,`pip install databases[postgresql] — wysokopoziomowe async ORM`]}},{cmd:`pip install redis[asyncio]`,desc:`Async klient Redis`,detail:{what:`Async wersja redis-py. Używaj w FastAPI i asyncio do cache, pubsub, queues.`,how:`r = redis.asyncio.from_url("redis://localhost"). await r.set("key", "val"). await r.get("key")`,tips:[`pip install redis[asyncio] — oficjalny klient`,`ConnectionPool zarządza połączeniami automatycznie`,`await r.aclose() — zamknij połączenie`]}}]},{category:`Uruchamianie`,icon:`▶️`,items:[{cmd:`asyncio.run(main())`,desc:`Uruchom korutynę — punkt wejścia`,detail:{what:`asyncio.run() tworzy event loop, uruchamia korutynę i zamyka loop. To jedyny prawidłowy sposób uruchamiania korutyn z synchronicznego kodu.`,how:`Wywołaj tylko raz, na najwyższym poziomie skryptu. Nie wywołuj z wnętrza innej korutyny.`,tips:[`Nie używaj loop.run_until_complete() — asyncio.run() to nowoczesny sposób`,`Python 3.11+: asyncio.run(main(), debug=True) — tryb debug`]}},{cmd:`await asyncio.gather(*tasks)`,desc:`Uruchom wiele korutyn równolegle`,detail:{what:`gather() przyjmuje dowolną liczbę awaitables i uruchamia je równolegle. Zwraca listę wyników gdy wszystkie skończą.`,how:`*tasks rozpakowuje listę. Lub: await asyncio.gather(f1(), f2(), f3())`,tips:[`return_exceptions=True — zbierz błędy zamiast rzucać`,`Zachowuje kolejność wyników (nie wykonania)`]}},{cmd:`task = asyncio.create_task(coro())`,desc:`Utwórz Task — startuje natychmiast`,detail:{what:`create_task() planuje korutynę w event loop. Startuje przy najbliższej okazji (await). Możesz zrobić inne rzeczy przed await task.`,how:`task.result() po await zwraca wynik. task.cancel() anuluje.`,tips:[`Musi być wywołane wewnątrz async def`,`Zawsze await task przed końcem funkcji — inaczej warning`]}},{cmd:`await asyncio.sleep(1.0)`,desc:`Async sleep — oddaj kontrolę event loop`,detail:{what:`Jak time.sleep() ale nie blokuje event loop. Podczas await asyncio.sleep() inne korutyny mogą działać.`,how:`asyncio.sleep(0) — oddaj kontrolę bez czekania. Przydatne w długich pętlach.`,tips:[`Nigdy nie używaj time.sleep() w async kodzie — blokuje cały event loop`,`asyncio.sleep(0) = yield control to event loop`]}}]},{category:`Synchronizacja`,icon:`🔒`,items:[{cmd:`async with asyncio.Lock() as lock:`,desc:`Async mutex — wyłączny dostęp`,detail:{what:`Lock zapobiega race conditions przy shared state. async with automatycznie acquire/release.`,how:`Utwórz Lock raz: self._lock = asyncio.Lock(). Używaj w każdej metodzie modyfikującej stan.`,tips:[`Nie używaj threading.Lock() w async — deadlock`,`Trzymaj sekcję krytyczną jak najkrótszą`]}},{cmd:`sem = asyncio.Semaphore(10)`,desc:`Ogranicz współbieżność do N`,detail:{what:`Semaphore pozwala max N korutynom jednocześnie wejść w sekcję. Kluczowe przy scrapingu i limitach API.`,how:`async with sem: ... — blokuje gdy N korutyn już wewnątrz.`,tips:[`Rate limiting: Semaphore(10) = max 10 requestów jednocześnie`,`Dobierz wartość do limitów serwera/API`]}},{cmd:`await asyncio.wait_for(coro(), timeout=5.0)`,desc:`Limit czasu na korutynę`,detail:{what:`Rzuca asyncio.TimeoutError gdy korutyna nie skończy w timeout sekund.`,how:`Lub nowszy sposób (Python 3.11+): async with asyncio.timeout(5.0):`,tips:[`Zawsze ustawiaj timeout dla zewnętrznych requestów`,`asyncio.timeout() lepszy bo można sprawdzić czy expired`]}}]},{category:`Debugowanie`,icon:`🐛`,items:[{cmd:`asyncio.run(main(), debug=True)`,desc:`Tryb debug — wykrywaj problemy`,detail:{what:`Debug mode: ostrzeżenie gdy korutyna nigdy nie jest awaited, gdy blokujesz event loop, gdy task trwa za długo.`,how:`Lub: PYTHONASYNCIODEBUG=1 python script.py`,tips:[`Włącz zawsze w development`,`Ostrzeżenie "coroutine was never awaited" — zapomniałeś await`]}},{cmd:`asyncio.get_event_loop().set_debug(True)`,desc:`Włącz debug na działającym loop`,detail:{what:`Włącza logging ostrzeżeń gdy synchroniczna operacja blokuje event loop przez >0.1s.`,how:`Automatycznie gdy PYTHONASYNCIODEBUG=1 lub asyncio.run(debug=True)`,tips:[`Loguj do pliku: logging.basicConfig(level=logging.DEBUG)`,`Blokowanie >100ms to problem w produkcji`]}},{cmd:`asyncio.all_tasks()`,desc:`Lista wszystkich aktywnych Tasks`,detail:{what:`Zwraca set wszystkich Task które nie są skończone. Przydatne do debugowania wycieków tasków.`,how:`for task in asyncio.all_tasks(): print(task.get_name(), task.get_coro())`,tips:[`Zbyt wiele tasks = wyciek — sprawdź czy wszystkie są cancel/await`,`task.get_stack() — stack trace aktywnego task`]}},{cmd:`PYTHONASYNCIODEBUG=1 python script.py`,desc:`Włącz tryb debug przez zmienną środowiskową`,detail:{what:`Alternatywa dla asyncio.run(debug=True) — działa bez modyfikacji kodu. Loguje ostrzeżenia o blokowaniu event loop i niezaawaitowanych korutynach.`,how:`Windows: set PYTHONASYNCIODEBUG=1 && python script.py`,tips:[`Zawsze włącz w development`,`Ostrzeżenie slow callback >100ms = synchroniczny kod blokuje pętlę`,`import logging; logging.basicConfig(level=logging.DEBUG) — więcej szczegółów`]}}]},{category:`Wzorce zaawansowane`,icon:`⚡`,items:[{cmd:`queue = asyncio.Queue()`,desc:`Async kolejka — producer/consumer`,detail:{what:`Kolejka FIFO dla komunikacji między korutynami. Producer wkłada (await queue.put()), consumer pobiera (await queue.get()).`,how:`Wzorzec: N producerów → Queue → M consumerów. Automatyczna synchronizacja bez Lock.`,tips:[`asyncio.Queue(maxsize=100) — ogranicz rozmiar (blokuje producera gdy pełna)`,`await queue.join() — czekaj aż wszystkie elementy zostaną przetworzone`,`queue.task_done() — consumerr sygnalizuje zakończenie przetwarzania`]}},{cmd:`async with asyncio.timeout(5.0):`,desc:`Blok z limitem czasu (Python 3.11+)`,detail:{what:`Nowoczesny context manager dla timeoutów. Czytelniejszy niż asyncio.wait_for(). Rzuca TimeoutError.`,how:`try: async with asyncio.timeout(5): await download() except TimeoutError: print("za wolno")`,tips:[`Zastępuje asyncio.wait_for() w Python 3.11+`,`asyncio.timeout_at(deadline) — absolutny timestamp zamiast delta`,`Można sprawdzić: asyncio.current_task().cancelling()`]}},{cmd:`async with asyncio.TaskGroup() as tg:`,desc:`Grupuj Tasks — strukturalna współbieżność (Python 3.11+)`,detail:{what:`TaskGroup uruchamia Tasks i czeka na wszystkie. Jeśli jeden rzuci wyjątek — anuluje pozostałe i propaguje ExceptionGroup.`,how:`async with asyncio.TaskGroup() as tg: t1 = tg.create_task(f1()); t2 = tg.create_task(f2())`,tips:[`Nowocześniejszy niż asyncio.gather() — automatyczna obsługa błędów`,`Zastępuje try/finally z task.cancel()`,`except* ExceptionGroup as eg: — nowa składnia dla ExceptionGroup`]}},{cmd:`results = await asyncio.gather(*coros, return_exceptions=True)`,desc:`Zbierz wyniki lub błędy bez rzucania`,detail:{what:`return_exceptions=True: zamiast rzucać wyjątek gdy korutyna padnie, zwraca go jako element listy wyników. Możesz przetworzyć co się udało a co nie.`,how:`results = await asyncio.gather(*tasks, return_exceptions=True); errors = [r for r in results if isinstance(r, Exception)]`,tips:[`Bez return_exceptions: jeden błąd anuluje wszystkie i rzuca wyjątek`,`Sprawdź: [r for r in results if not isinstance(r, Exception)] — sukcesy`,`Dobre dla batch operacji gdzie częściowy sukces jest akceptowalny`]}}]}],gn={meta:{id:`asyncio`,name:`asyncio`,icon:`⚡`,color:`#5865F2`,color2:`#7289DA`,tagline:`Asynchroniczny Python — współbieżność bez wątków`,year:2014,author:`Guido van Rossum (PEP 3156)`,lang:`Python 3.7+`,github:`python/cpython`,stars:`65k+`,codeLang:`Python`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Korutyny`},{id:`hooki`,label:`Tasks`},{id:`routing`,label:`Synchronizacja`},{id:`state`,label:`Zaawansowane`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać asyncio?`,firstComponent:`Pierwsze korutyny`,firstComponentLang:`Python`},intro:{title:`Czym jest asyncio?`,desc:`asyncio to wbudowana biblioteka Pythona do pisania współbieżnego kodu z async/await. Zamiast wątków używa event loop — jednego wątku który przełącza się między zadaniami gdy czekają na I/O. Idealne gdy aplikacja spędza czas na sieci, plikach, bazie danych — nie na obliczeniach.`},concepts:[{title:`Event Loop`,desc:`Serce asyncio. Jeden wątek który zarządza wszystkimi korutynami. Gdy korutyna czeka (np. na HTTP), event loop uruchamia inną. Zero blokowania, zero wątków systemowych.`,icon:`🔄`},{title:`Korutyna (async def)`,desc:`Funkcja z async def to korutyna — nie uruchamia się od razu po wywołaniu. Zwraca obiekt korutyny. Uruchamia się przez await lub asyncio.run(). Może zatrzymać się w miejscu await.`,icon:`⚡`},{title:`await`,desc:`await mówi: "tu mogę się zatrzymać i pozwolić innym korutynom działać". Możesz await tylko wewnątrz async def. await cze awaitable: korutynę, Task, Future.`,icon:`⏸️`},{title:`gather vs TaskGroup`,desc:`asyncio.gather() uruchamia wiele korutyn równolegle i czeka na wszystkie. TaskGroup (Python 3.11+) to nowszy, bezpieczniejszy sposób. Razem dają współbieżność I/O bez wątków.`,icon:`🎯`}],whenToUse:[`Pobieranie danych z wielu URL jednocześnie (scraping, API calls)`,`Serwery webowe — FastAPI, aiohttp obsługują wiele requestów w jednym wątku`,`Bazy danych async — asyncpg, motor (MongoDB), aiosqlite`,`WebSocket i long-polling — utrzymywanie wielu połączeń`,`Pipeline'y I/O — pobieranie, przetwarzanie, zapis bez blokowania`,`NIE DO: ciężkich obliczeń CPU — tu używaj multiprocessing`],firstComponent:`import asyncio
import httpx

async def pobierz(url: str) -> str:
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        return r.text[:100]

async def main():
    urls = [
        "https://httpbin.org/get",
        "https://httpbin.org/ip",
        "https://httpbin.org/headers",
    ]
    # Wszystkie 3 requestu równolegle
    wyniki = await asyncio.gather(*[pobierz(u) for u in urls])
    for w in wyniki:
        print(w[:60])

asyncio.run(main())`},komponenty:[{title:`async def i await — podstawowa składnia`,desc:`async def definiuje korutynę. await czeka na wynik awaitable. Korutyny możesz wywoływać tylko wewnątrz innych async def lub przez asyncio.run().`,code:`import asyncio

# Korutyna — funkcja z async def
async def przywitaj(imie: str, opoznienie: float):
    await asyncio.sleep(opoznienie)  # nie blokuje event loop
    print(f"Cześć, {imie}!")
    return f"Gotowe: {imie}"

# Uruchomienie pojedynczej korutyny
async def main():
    wynik = await przywitaj("Łukasz", 1.0)
    print(wynik)

# Punkt wejścia — poza async def
asyncio.run(main())`},{title:`asyncio.gather() — równoległe wykonywanie`,desc:`gather() uruchamia wiele korutyn równolegle i czeka aż wszystkie się skończą. Zwraca listę wyników w tej samej kolejności co argumenty.`,code:`import asyncio
import time

async def zadanie(n: int, czas: float) -> str:
    await asyncio.sleep(czas)
    return f"Zadanie {n} gotowe"

async def main():
    start = time.perf_counter()

    # Sekwencyjnie (wolno — suma czasów):
    # r1 = await zadanie(1, 1.0)
    # r2 = await zadanie(2, 1.0)

    # Równolegle (szybko — max czasu):
    r1, r2, r3 = await asyncio.gather(
        zadanie(1, 1.0),
        zadanie(2, 0.5),
        zadanie(3, 0.8),
    )
    print(f"Czas: {time.perf_counter() - start:.2f}s")  # ~1.0s
    print(r1, r2, r3)

asyncio.run(main())`},{title:`asyncio.gather() — obsługa błędów`,desc:`Domyślnie gather() rzuca wyjątek przy pierwszym błędzie. return_exceptions=True zbiera wszystkie wyniki/błędy do listy — sam sprawdzasz co się udało.`,code:`import asyncio

async def moze_rzucic(n: int):
    if n == 2:
        raise ValueError(f"Błąd w zadaniu {n}")
    await asyncio.sleep(0.1)
    return f"OK: {n}"

async def main():
    # return_exceptions=True — nie rzuca, zwraca Exception jako wynik
    wyniki = await asyncio.gather(
        moze_rzucic(1),
        moze_rzucic(2),
        moze_rzucic(3),
        return_exceptions=True,
    )

    for i, w in enumerate(wyniki):
        if isinstance(w, Exception):
            print(f"Zadanie {i+1} BŁĄD: {w}")
        else:
            print(f"Zadanie {i+1}: {w}")

asyncio.run(main())`},{title:`TaskGroup — Python 3.11+ (zalecany)`,desc:`TaskGroup to nowszy, bezpieczniejszy sposób uruchamiania zadań. Gdy jedno Task rzuci wyjątek, anuluje pozostałe. Lepsza obsługa błędów niż gather().`,code:`import asyncio

async def worker(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    print(f"{name} gotowy po {delay}s")
    return name

async def main():
    wyniki = []

    # Python 3.11+
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(worker("A", 1.0))
        t2 = tg.create_task(worker("B", 0.5))
        t3 = tg.create_task(worker("C", 0.8))
    # Tu wszystkie tasks są skończone

    print([t1.result(), t2.result(), t3.result()])

asyncio.run(main())`}],hooki:[{title:`asyncio.Task — zadania w tle`,desc:`Task to korutyna uruchomiona w event loop niezależnie. Nie musisz na nią czekać od razu — może działać "w tle". create_task() startuje ją natychmiast.`,code:`import asyncio

async def background_task(name: str):
    while True:
        print(f"{name}: pracuję...")
        await asyncio.sleep(2)

async def main():
    # Utwórz task — startuje od razu, nie czekamy
    task = asyncio.create_task(background_task("monitor"))

    # Rób inne rzeczy
    await asyncio.sleep(5)

    # Anuluj task gdy skończymy
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task anulowany")

asyncio.run(main())`},{title:`asyncio.wait() — czekaj na niektóre tasks`,desc:`wait() daje większą kontrolę niż gather() — możesz czekać na pierwszy gotowy, pierwszy błąd lub wszystkie. Zwraca (done, pending) sety.`,code:`import asyncio

async def zadanie(n: int, czas: float):
    await asyncio.sleep(czas)
    return n * 2

async def main():
    tasks = [
        asyncio.create_task(zadanie(i, i * 0.3))
        for i in range(1, 5)
    ]

    # Czekaj na pierwszego gotowego
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )

    for task in done:
        print(f"Gotowy: {task.result()}")

    # Anuluj pozostałe
    for task in pending:
        task.cancel()

asyncio.run(main())`},{title:`asyncio.timeout() — limit czasu`,desc:`timeout() i wait_for() ograniczają czas oczekiwania na korutynę. Rzuca asyncio.TimeoutError gdy przekroczony.`,code:`import asyncio

async def wolna_operacja():
    await asyncio.sleep(10)  # bardzo wolna
    return "gotowe"

async def main():
    # Sposób 1: wait_for (starszy)
    try:
        wynik = await asyncio.wait_for(
            wolna_operacja(),
            timeout=2.0  # 2 sekundy
        )
    except asyncio.TimeoutError:
        print("Timeout — za wolno!")

    # Sposób 2: timeout() context manager (Python 3.11+)
    try:
        async with asyncio.timeout(2.0):
            wynik = await wolna_operacja()
    except TimeoutError:
        print("Timeout!")

asyncio.run(main())`},{title:`asyncio.Queue — komunikacja między tasks`,desc:`Queue to async kolejka FIFO. Producer dodaje elementy, Consumer pobiera. Naturalna komunikacja między korutynami bez race conditions.`,code:`import asyncio

async def producer(queue: asyncio.Queue, n: int):
    for i in range(n):
        await asyncio.sleep(0.1)
        await queue.put(f"item-{i}")
        print(f"Dodano: item-{i}")
    await queue.put(None)  # sygnał końca

async def consumer(queue: asyncio.Queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Przetwarzam: {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue(maxsize=5)
    await asyncio.gather(
        producer(queue, 10),
        consumer(queue),
    )

asyncio.run(main())`}],...pn,...mn,komendy:hn}},_n={id:`git`,name:`Git`,icon:`🌿`,color:`#F05032`,color2:`#FF8C69`,tagline:`Rozproszony system kontroli wersji — standard branży od 2005 roku`,year:2005,author:`Linus Torvalds`,lang:`C`,github:`git/git`,stars:`54k+`,codeLang:`bash`,tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Branche`},{id:`hooki`,label:`Historia`},{id:`routing`,label:`Zdalne`},{id:`state`,label:`Zaawansowane`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Narzędzia`},{id:`komendy`,label:`Komendy`}]},vn={meta:_n,tabs:_n.tabs,content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać Git?`,firstComponent:`Pierwsze repozytorium`,firstComponentLang:`bash`},intro:{title:`Czym jest Git?`,desc:`Git to rozproszony system kontroli wersji stworzony przez Linusa Torvaldsa w 2005 roku
do zarządzania kodem jądra Linux. Każdy developer ma pełną kopię historii projektu
na swoim komputerze — zero single point of failure.
Git śledzi zmiany, umożliwia pracę równoległą przez branche i pozwala cofać się do
dowolnego momentu historii. Używają go Google, Microsoft, Netflix, Facebook i prawie
każdy projekt open source na świecie. Bez Gita nie ma profesjonalnego programowania.
`},concepts:[{title:`Commit — snapshot projektu`,icon:`📸`,desc:`Commit = niezmienialny snapshot stanu projektu w danej chwili.
Każdy commit ma: unikalny hash SHA-1 (np. a1b2c3d), autora, datę, wiadomość
i wskaźnik na rodzica (poprzedni commit). Commity tworzą niezmienialny łańcuch historii.
Dobry commit = jedna logiczna zmiana + opisowa wiadomość.
`},{title:`Branch — równoległa praca`,icon:`🌿`,desc:`Branch to lekki wskaźnik na commit — nie kopiuje plików.
Tworzenie brancha to najtańsza operacja w Git (milisekundy).
HEAD to wskaźnik na aktualny branch (lub commit w "detached HEAD").
main/master to konwencjonalna nazwa domyślnego brancha.
Workflow: feature branch → kod → merge do main.
`},{title:`Staging Area (Index)`,icon:`📋`,desc:`Trzy obszary Git: Working Directory (edytowane pliki), Staging Area (zaindeksowane),
Repository (historia). git add przenosi z Working Dir do Staging.
git commit zapisuje Staging jako nowy commit.
Staging pozwala commitować wybrane zmiany z wielu edytowanych plików.
`},{title:`Merge vs Rebase`,icon:`🔀`,desc:`Merge łączy branche tworząc merge commit — zachowuje pełną historię (kiedy co się działo).
Rebase przepisuje historię — "przykłada" commity feature brancha na wierzch main.
Merge = prawdziwa historia. Rebase = czysta linia.
Złota zasada: nigdy nie rób rebase publicznych (pushniętych) branchy.
`},{title:`Remote — zdalne repozytoria`,icon:`☁️`,desc:`Remote = zdalna kopia repozytorium (GitHub, GitLab, Bitbucket).
origin = domyślna nazwa pierwszego remote.
git fetch pobiera zmiany ale nie merguje. git pull = fetch + merge.
git push wysyła lokalne commity do remote.
`},{title:`.gitignore — co ignorować`,icon:`🚫`,desc:`.gitignore definiuje pliki i foldery które Git ignoruje — nie śledzi ich zmian.
Zawsze ignoruj: venv/, __pycache__/, .env, node_modules/, .DS_Store, *.pyc.
Plik .env z sekretami NIGDY nie powinien trafić do repozytorium.
git check-ignore -v plik sprawdza czy plik jest ignorowany i dlaczego.
`}],whenToUse:[`Każdy projekt z kodem — od jednoplikowego skryptu po aplikację enterprise`,`Praca zespołowa — każdy na swoim branchu, merge/PR do main po review`,`Eksperymenty — branch na nowy pomysł, usuń gdy nie wyszło (zero kosztów)`,`Backup — remote repo (GitHub) = automatyczna kopia zapasowa`,`Code review — Pull Request przed mergem, komentarze do konkretnych linii`,`Wersjonowanie — tagi na releasach (v1.0, v2.3.1)`,`Rollback — coś poszło źle? git revert lub git reset do poprzedniego commita`],firstComponent:`# === Nowe repozytorium ===
git init
git add .
git commit -m "feat: initial commit"

# === Lub sklonuj istniejące ===
git clone https://github.com/user/repo.git
cd repo

# === Podstawowy codziennyworkflow ===
git status                          # co jest zmienione?
git diff                            # jakie zmiany w plikach?

git add plik.py                     # dodaj konkretny plik
git add src/                        # dodaj folder
git add .                           # dodaj wszystko

git commit -m "fix: napraw walidację emaila"

git log --oneline                   # historia commitów
git push origin main                # wyślij na GitHub

# === Praca z branchem ===
git switch -c feature/nowa-funkcja  # nowy branch
# ... kod ...
git add . && git commit -m "feat: dodaj nową funkcję"
git switch main
git merge feature/nowa-funkcja
git push origin main
`},komponenty:{title:`Branche — równoległa praca`,items:[{name:`Tworzenie i zarządzanie branchami`,desc:`Branch to lekki wskaźnik na commit. Twórz branch na każdą funkcję lub bugfix —
izoluje zmiany, ułatwia code review i rollback.
`,code:`# Utwórz i przejdź na nowy branch (nowoczesny sposób)
git switch -c feature/login

# Stary sposób (też wszędzie działa)
git checkout -b feature/login

# Przejdź na istniejący branch
git switch main
git switch feature/login

# Lista branchy
git branch           # lokalne
git branch -r        # zdalne (origin/*)
git branch -a        # wszystkie

# Zmień nazwę brancha
git branch -m stara-nazwa nowa-nazwa
git branch -m nowa-nazwa  # zmień nazwę aktualnego

# Usuń branch
git branch -d feature/login    # po merge (bezpieczne)
git branch -D feature/login    # force delete (bez merge)

# Usuń zdalny branch
git push origin --delete feature/login
`},{name:`Merge — łączenie branchy`,desc:`Merge integruje zmiany z jednego brancha do drugiego.
Fast-forward gdy historia jest linearna (brak merge commit).
Merge commit gdy historia się rozeszła — zachowuje pełny kontekst.
`,code:`# Będąc na main — wmerge feature branch
git switch main
git merge feature/login

# Fast-forward (tylko gdy historia linearna)
git merge --ff-only feature/login

# Wymuś merge commit nawet przy ff
git merge --no-ff feature/login -m "feat: merge login feature"

# Squash merge — wszystkie commity w jeden
git merge --squash feature/login
git commit -m "feat: add login functionality"

# Przerwij merge przy konflikcie
git merge --abort

# Po rozwiązaniu konfliktu
git add .
git commit           # lub git merge --continue
`},{name:`Rebase — czysta historia`,desc:`Rebase przepisuje historię — przenosi commity feature brancha na czubek main.
Daje czystą, linearną historię bez merge commitów.
Złota zasada: nie rób rebase publicznych branchy (pushniętych przez innych).
`,code:`# Będąc na feature branchu — rebase na main
git switch feature/login
git rebase main

# Interaktywny rebase — edytuj ostatnie 3 commity
git rebase -i HEAD~3

# W edytorze (nano/vim):
# pick   a1b2c3d first commit
# squash b2c3d4e second commit   ← połącz z poprzednim
# reword c3d4e5f third commit    ← zmień wiadomość
# drop   d4e5f6g fourth commit   ← usuń całkowicie

# Przerwij rebase
git rebase --abort

# Kontynuuj po rozwiązaniu konfliktu
git add .
git rebase --continue

# Po rebase — push z force (lokalna historia się zmieniła)
git push --force-with-lease origin feature/login
`},{name:`Cherry-pick — wybierz konkretny commit`,desc:`Cherry-pick kopiuje wybrany commit na aktualny branch.
Przydatne gdy chcesz przenieść tylko jeden fix z innego brancha
bez mergowania całej gałęzi.
`,code:`# Znajdź hash commitu
git log --oneline feature/hotfix

# Skopiuj commit na aktualny branch
git cherry-pick a1b2c3d

# Kilka commitów
git cherry-pick a1b2c3d b2c3d4e

# Zakres commitów
git cherry-pick a1b2c3d..e4f5g6h

# Cherry-pick bez automatycznego commita
git cherry-pick -n a1b2c3d
# edytuj pliki...
git commit -m "cherry: fix autoryzacji z brancha hotfix"

# Przerwij
git cherry-pick --abort
`}]},hooki:{title:`Historia i analiza zmian`,items:[{name:`git log — przeglądanie historii`,desc:`log pokazuje historię commitów z wieloma opcjami formatowania i filtrowania.
Od prostego --oneline po graficzne drzewo branchy.
`,code:`# Podstawowe
git log                           # pełna historia
git log --oneline                 # jedna linia per commit
git log --oneline --graph         # drzewo branchy ASCII
git log --oneline --graph --all   # wszystkie branche

# Filtrowanie
git log --author="Łukasz"         # commity autora
git log --since="2024-01-01"      # od daty
git log --until="2024-12-31"      # do daty
git log --since="1 week ago"      # od tygodnia
git log -- plik.py                # commity dotyczące pliku
git log -S "nazwa_funkcji"        # commity zawierające tekst (pickaxe)
git log --grep="fix:"             # commity z tekstem w wiadomości

# Formatowanie
git log --format="%h %an %ar %s"  # hash autor czas_rel temat
git log --format="%ad %s" --date=short  # data temat

# Liczba commitów
git log --oneline | wc -l
`},{name:`git diff — co się zmieniło`,desc:`diff pokazuje dokładne różnice między wersjami plików.
Kilka trybów: working dir vs staging, staging vs commit, między commitami.
`,code:`# Working directory vs staging (co jeszcze nie jest w staging)
git diff

# Staging vs ostatni commit (co trafi do commita)
git diff --staged
git diff --cached           # to samo

# Między commitami
git diff HEAD~2 HEAD        # dwa commity wstecz do teraz
git diff a1b2c3d e4f5g6h    # między konkretami

# Konkretny plik
git diff HEAD -- plik.py

# Tylko lista zmienionych plików
git diff --name-only
git diff --stat             # pliki + liczba linii +/-

# Między branchami
git diff main..feature/login
git diff main...feature/login  # od rozejścia się branchy
`},{name:`git blame — kto napisał tę linię`,desc:`blame pokazuje kto i kiedy napisał każdą linię pliku.
Nieoceniony przy debugowaniu — znajdź autora problematycznej linii.
`,code:`# Pokaż autora każdej linii
git blame plik.py

# Konkretny zakres linii
git blame -L 10,25 plik.py

# Ignoruj whitespace przy blame
git blame -w plik.py

# Pokaż hash i datę
git blame -l plik.py

# Wynik wygląda tak:
# a1b2c3d (Łukasz 2024-01-15 14:30:00 +0100 10) def funkcja():
# hash     autor   data               numer  treść

# Śledź przeniesienia kodu między plikami
git blame -C plik.py
`},{name:`git stash — odkładanie zmian`,desc:`stash odkłada niezacommitowane zmiany do stosu. Przydatne gdy musisz
szybko przełączyć branch bez commitowania niedokończonej pracy.
`,code:`# Odłóż bieżące zmiany
git stash
git stash push -m "wip: nowa funkcja login"

# Odłóż z untracked plikami (np. nowe pliki)
git stash -u
git stash --include-untracked

# Lista stashy
git stash list
# stash@{0}: wip: nowa funkcja login
# stash@{1}: On main: poprawki CSS

# Przywróć ostatni stash (zostaje na liście)
git stash apply

# Przywróć i usuń z listy
git stash pop

# Konkretny stash
git stash apply stash@{1}

# Usuń stash
git stash drop stash@{0}
git stash clear             # usuń wszystkie

# Utwórz branch ze stasha
git stash branch feature/kontynuacja stash@{0}
`}]},routing:{title:`Zdalne repozytoria`,items:[{name:`Remote — zarządzanie zdalnymi repo`,desc:`Remote to zdalna kopia repozytorium. origin to konwencjonalna nazwa pierwszego remote.
Możesz mieć wiele remote (np. origin = GitHub, upstream = fork source).
`,code:`# Pokaż zdalne repozytoria
git remote -v
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

# Dodaj remote
git remote add origin https://github.com/user/repo.git

# Zmień URL remote
git remote set-url origin https://github.com/user/new-repo.git

# Usuń remote
git remote remove origin

# Pobierz zmiany (nie merguje automatycznie)
git fetch origin
git fetch --all          # wszystkie remote

# Pobierz + merguj
git pull origin main
git pull --rebase origin main   # z rebase zamiast merge
`},{name:`Push — wysyłanie zmian`,desc:`push wysyła lokalne commity do zdalnego repo.
Pierwszy push brancha wymaga -u (--set-upstream) żeby powiązać branche.
`,code:`# Wyślij aktualny branch (gdy już ustawiony upstream)
git push

# Pierwszy push nowego brancha
git push -u origin feature/login
# Po -u możesz używać samego: git push

# Wyślij do innego brancha
git push origin main

# Wyślij tagi
git push --tags
git push origin v1.0.0    # konkretny tag

# Usuń zdalny branch
git push origin --delete feature/stary-branch

# Force push (OSTROŻNIE!)
git push --force-with-lease   # bezpieczny force (sprawdza czy ktoś nie pushował)
git push -f                    # niebezpieczny — nigdy na main/shared branchy!
`},{name:`Pull Request workflow`,desc:`PR (Pull Request) = prośba o włączenie kodu do main.
Standard pracy zespołowej. Umożliwia code review przed mergem.
`,code:`# 1. Zacznij od aktualnego main
git switch main
git pull origin main

# 2. Utwórz feature branch
git switch -c feature/user-auth

# 3. Pracuj i commituj
git add .
git commit -m "feat: add JWT authentication"
git add .
git commit -m "test: add auth unit tests"

# 4. Push brancha
git push -u origin feature/user-auth

# 5. Utwórz PR na GitHub/GitLab
# GitHub CLI:
gh pr create --title "Add JWT authentication" \\
  --body "Adds JWT-based auth with refresh tokens"

# 6. Po code review i aprobacie — merge na GitHub UI
# Lub lokalnie:
git switch main
git merge --no-ff feature/user-auth
git push origin main

# 7. Posprzątaj
git branch -d feature/user-auth
git push origin --delete feature/user-auth
`},{name:`Resolving merge conflicts`,desc:`Konflikt powstaje gdy dwie osoby edytowały tę samą linię.
Git oznacza konflikty markerami w pliku — musisz zdecydować co zostaje.
`,code:`# Po git merge lub git pull z konfliktem:
# Git modyfikuje plik:
# <<<<<<< HEAD
# twoja wersja linii
# =======
# ich wersja linii
# >>>>>>> origin/main

# 1. Sprawdź które pliki mają konflikty
git status           # "both modified"
git diff             # pokaż konflikty

# 2. Edytuj plik — usuń markery, zostaw właściwą wersję
# Lub użyj narzędzia merge:
git mergetool        # uruchamia skonfigurowane narzędzie (VSCode, Vim, etc.)

# 3. Dodaj rozwiązane pliki
git add plik_z_konfliktem.py

# 4. Dokończ merge
git commit           # lub git merge --continue

# Skróty przy konflikcie — przyjmij całą jedną wersję
git checkout --ours   plik.py   # nasza wersja (HEAD)
git checkout --theirs plik.py   # ich wersja (merging branch)
`}]},state:{title:`Zaawansowane techniki Git`,items:[{name:`git reset — cofanie zmian`,desc:`reset cofa HEAD do wskazanego commita. Trzy tryby różnią się tym
co dzieje się z cofniętymi zmianami.
`,code:`# --soft: cofnij commit, zmiany wróć do staging (gotowe do ponownego commita)
git reset --soft HEAD~1    # cofnij 1 commit
git reset --soft HEAD~3    # cofnij 3 commity

# --mixed (domyślny): cofnij commit + unstage, pliki niezmienione
git reset HEAD~1
git reset HEAD~1 --mixed  # to samo

# --hard: cofnij commit + usuń zmiany z plików (NIEODWRACALNE!)
git reset --hard HEAD~1
git reset --hard origin/main   # wróć do stanu zdalnego

# Unstage konkretnego pliku (nie dotyka working dir)
git restore --staged plik.py   # nowoczesny sposób
git reset HEAD plik.py         # stary sposób

# Wróć do konkretnego commita (detached HEAD)
git checkout a1b2c3d
`},{name:`git revert — bezpieczne cofanie`,desc:`revert tworzy nowy commit który odwraca zmiany z podanego commita.
Nie przepisuje historii — bezpieczny dla publicznych branchy.
`,code:`# Cofnij konkretny commit (tworzy nowy commit odwracający)
git revert a1b2c3d

# Cofnij bez automatycznego commita
git revert -n a1b2c3d
# edytuj jeśli potrzeba...
git commit -m "revert: cofam zmianę X"

# Cofnij kilka commitów
git revert a1b2c3d..e4f5g6h  # zakres

# Cofnij merge commit
git revert -m 1 a1b2c3d    # -m 1 = zachowaj stronę mainline

# Różnica:
# reset  → przepisuje historię, tylko lokalnie
# revert → dodaje commit, bezpieczne dla shared branchy
`},{name:`git tag — oznaczanie wersji`,desc:`Tagi oznaczają konkretne commity jako ważne punkty — zazwyczaj release wersje (v1.0.0).
Annotated tagi (zalecane) mają dodatkowe metadane.
`,code:`# Utwórz annotated tag (zalecany)
git tag -a v1.0.0 -m "Release 1.0.0 — stable"

# Tag konkretnego commita
git tag -a v1.0.0 a1b2c3d -m "Release 1.0.0"

# Lightweight tag (tylko alias bez metadanych)
git tag v1.0.0-beta

# Lista tagów
git tag
git tag -l "v1.*"   # filtruj wzorcem

# Szczegóły tagu
git show v1.0.0

# Wyślij tagi do remote
git push origin v1.0.0    # konkretny tag
git push origin --tags    # wszystkie tagi

# Usuń tag
git tag -d v1.0.0-beta                   # lokalnie
git push origin --delete v1.0.0-beta      # zdalnie

# Checkout tagu (detached HEAD)
git checkout v1.0.0
`},{name:`.gitignore — wzorce ignorowania`,desc:`.gitignore definiuje co Git ignoruje. Wzorce: *.ext, folder/, plik.txt.
Globalne .gitignore dla ustawień IDE/OS żeby nie zaśmiecać każdego repo.
`,code:`# .gitignore dla projektu Python
# Środowisko wirtualne
venv/
.venv/
env/

# Python cache
__pycache__/
*.pyc
*.pyo
.pytest_cache/
.coverage
htmlcov/
dist/
*.egg-info/

# SEKRETY — NIGDY nie commituj!
.env
.env.*
*.key
secrets.json

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Sprawdź czy plik jest ignorowany
git check-ignore -v plik.py

# Przestań śledzić plik (zostaje lokalnie)
git rm --cached plik.py

# Globalne gitignore (dla IDE, OS)
git config --global core.excludesFile ~/.gitignore_global
`},{name:`Interaktywny add — wybierz co commitować`,desc:`git add -p pozwala wybrać które hunki (fragmenty) pliku dodać do staging.
Commituj logiczne zmiany niezależnie od tego że edytowałeś plik wielokrotnie.
`,code:`# Interaktywny staging — hunk po hunku
git add -p plik.py
git add --patch plik.py

# W trybie interaktywnym:
# y — dodaj ten hunk
# n — pomiń
# s — podziel na mniejsze hunki
# e — edytuj hunk ręcznie
# q — zakończ
# ? — pomoc

# Interaktywny tryb (więcej opcji)
git add -i

# Przykład użycia:
# Edytowałeś plik.py — dodałeś feature A i naprawiłeś bug B
# git add -p → dodaj tylko bug fix → commit "fix: napraw X"
# git add -p → dodaj feature A  → commit "feat: dodaj Y"
# Dwa czyste commity z jednego pliku!
`}]},rywale:{title:`Rywale — alternatywy dla Git`,items:[{name:`Mercurial (Hg)`,icon:`🔵`,desc:`Rozproszony VCS stworzony w tym samym czasie co Git (2005).
Prostszy interfejs, bardziej konsekwentne komendy, ale znacznie mniejsza popularność.

Gdzie Mercurial wygrywa:
• Prostsze komendy — bardziej intuicyjny niż Git dla początkujących
• Lepsza obsługa dużych repozytoriów binarnych
• Immutable commits domyślnie — nie możesz przepisać historii
• Używany przez Facebook (wewnętrznie), Bitbucket (do 2020)

Dlaczego Git wygrał:
Git jest wszędzie — GitHub, GitLab, każdy projekt open source.
Lepsze branche, szybszy, więcej zasobów online. Mercurial = niche market.
`},{name:`SVN (Subversion)`,icon:`📁`,desc:`Scentralizowany VCS — stare podejście, jeden centralny serwer.
Nadal używany w legacy enterprise systemach, embedded, game dev (duże binarne assety).

Kiedy SVN nadal ma sens:
• Kontrola dostępu per folder (nie per repo jak w Git) — banki, korporacje
• Duże pliki binarne (grafiki, modele 3D) — Git nie radzi sobie z nimi
• Prosta historia liniowa bez branchy
• Legacy systemy których nie warto migrować

Dlaczego Git zamiast SVN:
Offline work, szybkie branche, zdecentralizowany, lepsze merging.
SVN to relikt — nie zaczynaj nowych projektów z SVN.
`},{name:`GitHub vs GitLab vs Bitbucket`,icon:`🌐`,desc:`Nie są alternatywami dla Git — to hosty dla repozytoriów Git + narzędzia CI/CD.

GitHub:
• Największy ekosystem — miliardy repozytoriów open source
• GitHub Actions (CI/CD) — bardzo dobre
• GitHub Copilot integracja
• Darmowe dla publicznych i prywatnych repo
• Najlepsza strona do portfolio — rekruterzy tu patrzą

GitLab:
• Self-hosted (możesz postawić na własnym serwerze — ważne dla enterprise)
• Wbudowany CI/CD (GitLab CI) lepszy niż GitHub Actions zdaniem wielu
• Issues, Wiki, Container Registry w jednym miejscu
• Popularne w firmach które chcą kontroli nad danymi

Bitbucket:
• Integracja z Jira i innymi narzędziami Atlassian
• Popularne w firmach używających Confluence/Jira
• Mniejszy ekosystem open source
`},{name:`Git Flow vs Trunk-Based Development`,icon:`🌳`,desc:`Nie alternatywy dla Git — różne strategie pracy z branchami.

Git Flow (klasyczny):
• main (produkcja) + develop (integracja) + feature/* + release/* + hotfix/*
• Dużo branchy, formalna struktura release
• Dobry dla: wersjonowane produkty, długie cykle release

Trunk-Based Development (nowoczesny):
• Jeden main branch — wszyscy pushują bezpośrednio lub przez short-lived feature branches
• Feature flags zamiast długich feature branchy
• Wymaga: dobrego CI/CD, automatycznych testów, feature flags
• Dobry dla: ciągłe deploye, SaaS, szybki development

GitHub Flow (uproszczony, popularny):
• main + feature branch → PR → merge
• Prosty, działa dla większości projektów
• To czego używają większość open source projektów
`}]},pluginy:{title:`Narzędzia Git`,items:[{name:`GitHub CLI (gh) — GitHub z terminala`,icon:`🐙`,desc:`Oficjalne CLI GitHub — twórz PR, zarządzaj issues, przeglądaj repo bez opuszczania terminala.
Integruje się z git workflow — po pushu od razu utwórz PR.

Instalacja: https://cli.github.com lub brew install gh / winget install GitHub.cli
`,code:`# Logowanie
gh auth login

# Utwórz PR
gh pr create --title "feat: add login" --body "Adds JWT auth"

# Lista PR
gh pr list
gh pr view 42

# Checkout PR (do review)
gh pr checkout 42

# Utwórz issue
gh issue create --title "Bug: login crashes" --label bug

# Klonuj repo
gh repo clone user/repo

# Przeglądaj repo w przeglądarce
gh repo view --web
`},{name:`Git hooks — automatyzacja przed commitem`,icon:`🪝`,desc:`Hooks to skrypty uruchamiane przez Git automatycznie przy konkretnych zdarzeniach.
pre-commit to najważniejszy — uruchamia się przed każdym commitem.
Użyj do: lintowania, formatowania, testów, sprawdzania wiadomości commita.

Instalacja pre-commit: pip install pre-commit
`,code:`# .pre-commit-config.yaml w root projektu
repos:
  - repo: https://github.com/psf/black
    rev: 23.9.1
    hooks:
      - id: black
  - repo: https://github.com/PyCQA/flake8
    rev: 6.1.0
    hooks:
      - id: flake8
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-merge-conflict
      - id: detect-private-key   # blokuje commity z kluczami!

# Zainstaluj hooki
pre-commit install

# Uruchom ręcznie na wszystkich plikach
pre-commit run --all-files
`},{name:`git-delta — piękniejszy diff`,icon:`✨`,desc:`delta to pager dla git diff / git log z syntax highlighting, numerami linii
i side-by-side view. Znacząco poprawia czytelność diffów.

Instalacja: cargo install git-delta lub brew install git-delta
`,code:`# ~/.gitconfig — skonfiguruj delta jako pager
[core]
    pager = delta

[delta]
    navigate = true
    light = false
    side-by-side = true
    line-numbers = true
    syntax-theme = Dracula

[interactive]
    diffFilter = delta --color-only

# Teraz git diff, git log -p, git show wyglądają pięknie
`},{name:`lazygit — terminal UI dla Git`,icon:`💤`,desc:`Interaktywny terminal UI dla Git — wszystkie operacje bez zapamiętywania komend.
Staging, commiting, rebasing, resolving conflicts — wszystko wizualnie.

Instalacja: brew install lazygit / winget install lazygit
`,code:`# Uruchom w repozytorium
lazygit

# Nawigacja (wszystkie klawisze pokazane w UI):
# Tab — przełącz między panelami (Files, Branches, Commits, Stash)
# Space — toggle staging pliku / linii
# c — commit
# P/p — push/pull
# b — nowy branch
# r — rebase interaktywny
# z — undo (git reset)
# ? — pomoc
`},{name:`git-crypt — szyfrowanie secretów w repo`,icon:`🔒`,desc:`Przezroczyste szyfrowanie wybranych plików w repozytorium.
Pliki są szyfrowane gdy pushowane, odszyfrowane lokalnie dla uprawnionych.
Alternatywa dla .env poza repo.

Instalacja: brew install git-crypt / apt install git-crypt
`,code:`# Inicjalizuj w repo
git-crypt init

# .gitattributes — definiuj które pliki szyfrować
secrets/** filter=git-crypt diff=git-crypt
.env filter=git-crypt diff=git-crypt
*.key filter=git-crypt diff=git-crypt

# Eksportuj klucz (dla innych developerów)
git-crypt export-key ~/git-crypt-key

# Inni developerzy: odblokuj repo
git-crypt unlock ~/git-crypt-key

# Sprawdź status szyfrowania
git-crypt status
`}]},komendy:{title:`Komendy Git`,groups:[{name:`Setup i konfiguracja`,icon:`⚙️`,commands:[{desc:`Ustaw globalne dane użytkownika`,code:`git config --global user.name "Łukasz"
git config --global user.email "ty@email.com"
`},{desc:`Ustaw domyślny edytor (VSCode)`,code:`git config --global core.editor "code --wait"`},{desc:`Ustaw pull z rebase (zalecane)`,code:`git config --global pull.rebase true`},{desc:`Wyświetl całą konfigurację`,code:`git config --global --list`},{desc:`Alias — krótkie komendy`,code:`git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD"
`}]},{name:`Podstawy codzienne`,icon:`📋`,commands:[{desc:`Stan repozytorium`,code:`git status`},{desc:`Historia commitów (czytelna)`,code:`git log --oneline --graph --all`},{desc:`Co się zmieniło (nie staging)`,code:`git diff`},{desc:`Co trafi do commita (staging)`,code:`git diff --staged`},{desc:`Dodaj wszystko do staging`,code:`git add .`},{desc:`Dodaj konkretny plik`,code:`git add src/main.py`},{desc:`Interaktywny staging (wybierz hunki)`,code:`git add -p`},{desc:`Commit z wiadomością`,code:`git commit -m "feat: dodaj funkcję X"
`},{desc:`Amend ostatniego commita (przed pushem)`,code:`git commit --amend --no-edit`}]},{name:`Branche`,icon:`🌿`,commands:[{desc:`Nowy branch i przejdź na niego`,code:`git switch -c feature/nowa-funkcja`},{desc:`Przełącz branch`,code:`git switch main`},{desc:`Lista wszystkich branchy`,code:`git branch -a`},{desc:`Usuń branch po merge`,code:`git branch -d feature/nowa-funkcja`},{desc:`Merge feature do main`,code:`git switch main
git merge --no-ff feature/nowa-funkcja
`},{desc:`Rebase feature na main`,code:`git switch feature/nowa-funkcja
git rebase main
`},{desc:`Interaktywny rebase (edytuj historię)`,code:`git rebase -i HEAD~3`}]},{name:`Zdalne repozytoria`,icon:`☁️`,commands:[{desc:`Klonuj repo`,code:`git clone https://github.com/user/repo.git`},{desc:`Dodaj remote origin`,code:`git remote add origin https://github.com/user/repo.git`},{desc:`Wyślij branch (pierwszy raz)`,code:`git push -u origin feature/login`},{desc:`Wyślij (kolejne razy)`,code:`git push`},{desc:`Pobierz zmiany (bez merge)`,code:`git fetch origin`},{desc:`Pobierz i merguj`,code:`git pull --rebase origin main`},{desc:`Usuń zdalny branch`,code:`git push origin --delete feature/stary-branch`}]},{name:`Cofanie i naprawianie`,icon:`↩️`,commands:[{desc:`Odrzuć zmiany w pliku (working dir)`,code:`git restore plik.py`},{desc:`Usuń plik ze staging`,code:`git restore --staged plik.py`},{desc:`Cofnij ostatni commit (zachowaj zmiany w staging)`,code:`git reset --soft HEAD~1`},{desc:`Cofnij commit (zachowaj w plikach, usuń ze staging)`,code:`git reset HEAD~1`},{desc:`Bezpieczne cofnięcie commita (tworzy revert commit)`,code:`git revert a1b2c3d`},{desc:`Odłóż bieżące zmiany na stos`,code:`git stash push -m "wip: opis"
`},{desc:`Przywróć ostatni stash`,code:`git stash pop`}]},{name:`Analiza i szukanie`,icon:`🔍`,commands:[{desc:`Kto napisał tę linię?`,code:`git blame -L 10,20 plik.py`},{desc:`Kiedy pojawił się ten tekst w historii?`,code:`git log -S "nazwa_funkcji" --oneline`},{desc:`Wszystkie commity dla pliku`,code:`git log --follow -- plik.py`},{desc:`Znajdź commit który wprowadził bug (bisect)`,code:`git bisect start
git bisect bad          # aktualna wersja ma bug
git bisect good v1.0.0  # ta wersja działała
# Git automatycznie wybiera commit do przetestowania
# Po teście: git bisect good/bad
# Na koniec: git bisect reset
`},{desc:`Pokaż zawartość commita`,code:`git show a1b2c3d`},{desc:`Znajdź usuniętą funkcję w historii`,code:`git log -G "def stara_funkcja" --patch`}]}]}}},yn={routing:[{title:`Sieci Docker — komunikacja między kontenerami`,desc:`Kontenery w tej samej sieci mogą się pingować po nazwie serwisu. Compose automatycznie tworzy sieć dla wszystkich serwisów.`,code:`# docker-compose.yml — explicit networking
services:
  api:
    networks:
      - backend
      - frontend

  db:
    networks:
      - backend          # tylko backend — nie dostępne z frontendu

  nginx:
    networks:
      - frontend
      - public

networks:
  backend:
    driver: bridge
  frontend:
    driver: bridge
  public:
    driver: bridge

# W kodzie Pythona — używaj nazwy serwisu jako hostname:
# DATABASE_URL = "postgresql://user:pass@db:5432/mydb"
#                                              ^^ nazwa serwisu w Compose`},{title:`Wolumeny — trwałe dane`,desc:`Dane w kontenerze giną gdy kontener jest usuwany. Wolumeny i bind mounts przechowują dane na hoście. Named volumes dla baz danych, bind mounts dla kodu w dev.`,code:`services:
  db:
    image: postgres:16-alpine
    volumes:
      # Named volume — Docker zarządza lokalizacją
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    volumes:
      # Bind mount — folder hosta mapowany do kontenera
      - .:/app                     # live reload kodu
      - ./logs:/app/logs           # logi na hoście

      # Anonymous volume — nie nadpisuj node_modules z hosta
      - /app/node_modules

volumes:
  postgres_data:     # zadeklaruj named volume

# Zarządzanie wolumenami:
# docker volume ls
# docker volume inspect postgres_data
# docker volume rm postgres_data  (usuwa dane!)`},{title:`Zmienne środowiskowe i sekrety`,desc:`Nigdy nie hardcode sekretów w Dockerfile lub docker-compose.yml. Używaj .env pliku lub Docker Secrets.`,code:`# .env (nie commituj do git!)
POSTGRES_PASSWORD=supersecret
SECRET_KEY=moj-klucz-jwt
API_KEY=abc123

# docker-compose.yml — czyta z .env automatycznie
services:
  api:
    environment:
      - SECRET_KEY=\${SECRET_KEY}
      - DATABASE_URL=postgresql://user:\${POSTGRES_PASSWORD}@db/mydb

  # Lub z pliku env:
  db:
    env_file:
      - .env

# W Pythonie:
import os
secret = os.environ["SECRET_KEY"]  # pobierz z env

# Docker Secrets (Swarm/Kubernetes) — produkcja
docker secret create db_password ./password.txt`}],state:[{title:`Budowanie i push do registry`,desc:`Registry to repozytorium images — Docker Hub, GitHub Container Registry, AWS ECR, własny. Typowy CI/CD: build → tag → push → deploy.`,code:`# Zaloguj się do Docker Hub
docker login

# Tag image do Docker Hub
docker tag moja-apka:latest username/moja-apka:latest
docker tag moja-apka:latest username/moja-apka:1.0.0

# Push
docker push username/moja-apka:latest
docker push username/moja-apka:1.0.0

# GitHub Container Registry (ghcr.io)
docker tag moja-apka ghcr.io/username/moja-apka:latest
docker push ghcr.io/username/moja-apka:latest

# Pull na serwerze
docker pull username/moja-apka:latest
docker run -d -p 8000:8000 username/moja-apka:latest`},{title:`Docker w CI/CD — GitHub Actions`,desc:`Typowy pipeline: build image → run tests w kontenerze → push do registry → deploy. Docker gwarantuje że testy i produkcja są identyczne.`,code:`# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: username/app:latest,username/app:\${{ github.sha }}

      - name: Run tests
        run: |
          docker compose -f docker-compose.test.yml up --exit-code-from tests`},{title:`Bezpieczeństwo kontenerów`,desc:`Domyślnie kontenery działają jako root — to ryzyko. Dobre praktyki: non-root user, read-only filesystem, minimal base image, skanowanie.`,code:`FROM python:3.12-slim

# Utwórz non-root user
RUN groupadd -r appgroup &&     useradd -r -g appgroup -d /app -s /sbin/nologin appuser

WORKDIR /app

COPY --chown=appuser:appgroup requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appgroup . .

# Przełącz na non-root user
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker-compose.yml — dodatkowe zabezpieczenia:
# security_opt:
#   - no-new-privileges:true
# read_only: true   # read-only filesystem
# tmpfs:
#   - /tmp`},{title:`Debugowanie kontenerów`,desc:`Kontenery działają inaczej niż lokalne środowisko. Podstawowe narzędzia do diagnostyki — logi, exec, inspect.`,code:`# Wejdź do działającego kontenera
docker exec -it nazwa_kontenera bash
docker exec -it nazwa_kontenera sh  # gdy bash nie ma (alpine)

# Logi
docker logs nazwa_kontenera
docker logs -f nazwa_kontenera       # follow (tail -f)
docker logs --tail 50 nazwa_kontenera

# Informacje o kontenerze
docker inspect nazwa_kontenera
docker stats                         # CPU/RAM na żywo

# Kopiuj plik z/do kontenera
docker cp kontener:/app/logs/error.log .
docker cp local_plik.py kontener:/app/

# Uruchom tymczasowy kontener do debugowania
docker run --rm -it --network kontener_network   python:3.12-slim bash

# Sprawdź co jest w image
docker run --rm -it moja-apka:latest ls -la /app`}]},bn={rywale:[{name:`Podman`,icon:`🦭`,color:`#892CA0`,tagline:`Daemonless Docker — rootless kontenery`,pros:[`Bez daemona — bezpieczniejszy`,`Rootless — kontenery bez root`,`Docker-compatible API`,`Wbudowany w RHEL/Fedora`,`Lepsza integracja z systemd`],cons:[`Mniejsza społeczność`,`Compose mniej dopracowany (podman-compose)`,`Mniej materiałów`,`Docker Desktop wygodniejszy na Windows/Mac`],vsReact:`Podman jest bezpieczniejszy (rootless, no daemon) ale Docker ma większy ekosystem i lepsze tooling. Podman lepszy na produkcji RHEL. Docker lepszy do nauki i dev.`,bestFor:`RHEL/Fedora środowiska, bezpieczeństwo produkcji, rootless deployment`},{name:`containerd`,icon:`📦`,color:`#575757`,tagline:`Niskopoziomowy runtime — używany pod spodem`,pros:[`Używany przez Kubernetes natively`,`Lekki, szybki`,`CNCF graduated project`,`Standard runtime w K8s`],cons:[`Brak user-friendly CLI`,`Trudniejszy w bezpośrednim użyciu`,`Brak Compose`,`Nie dla zwykłych developerów`],vsReact:`containerd to runtime pod Dockerem i Kubernetes. Nie używasz go bezpośrednio — Docker i K8s go używają pod spodem. Wiedza przydatna przy K8s.`,bestFor:`Kubernetes internals, nisko-poziomowy runtime`},{name:`Kubernetes (K8s)`,icon:`⛵`,color:`#326CE5`,tagline:`Orkiestracja kontenerów — produkcja na skalę`,pros:[`Auto-scaling`,`Self-healing (restart przy crash)`,`Rolling deployments zero-downtime`,`Service discovery`,`Standard enterprise`],cons:[`Ogromna złożoność`,`Duże koszty operacyjne`,`Overkill dla małych projektów`,`Stroma krzywa uczenia`],vsReact:`Docker = jeden serwer. Kubernetes = wiele serwerów, auto-scaling, self-healing. Zacznij od Docker Compose, przejdź na K8s gdy Docker Compose przestanie wystarczać.`,bestFor:`Duże aplikacje, wiele serwisów, skalowanie, enterprise produkcja`},{name:`LXC / LXD`,icon:`🖥️`,color:`#E95420`,tagline:`Kontenery systemu — pełny OS w kontenerze`,pros:[`Pełny system Linux w kontenerze`,`Mniejszy overhead niż VM`,`Dobra izolacja`,`Dobry dla stateful aplikacji`],cons:[`Cięższy niż Docker`,`Inny model niż mikrousługi`,`Mniej ekosystemu`,`Trudniejszy onboarding`],vsReact:`LXC/LXD dla pełnych systemów (jak VM ale lżejszy). Docker dla aplikacji i mikrousług. Różne use-case.`,bestFor:`Pełne środowiska systemowe, hosting VPS-like, izolacja na poziomie OS`}],pluginy:[{name:`Docker Compose`,icon:`🎼`,color:`#2496ED`,tagline:`Multi-container — wbudowany w Docker CLI`,install:`docker compose (wbudowany od Docker Desktop 3.0+)`,use:`Zarządza wieloma kontenerami jako jeden stack. Jeden plik YAML, jedna komenda — całe środowisko gotowe. Niezbędny w każdym projekcie z więcej niż jednym serwisem.`,example:`docker compose up -d        # uruchom stack w tle
docker compose down         # zatrzymaj i usuń
docker compose logs -f api  # logi serwisu
docker compose exec api bash  # wejdź do kontenera`},{name:`Docker Scout`,icon:`🔍`,color:`#086DD7`,tagline:`Skanowanie podatności w images`,install:`docker scout (wbudowany w Docker Desktop)`,use:`Skanuje image pod kątem znanych CVE (podatności). Pokazuje które paczki mają problemy bezpieczeństwa i jak je naprawić. Integracja z CI/CD.`,example:`docker scout cves moja-apka:latest
docker scout recommendations moja-apka:latest
# Output: lista CVE z krytycznością i rekomendacjami`},{name:`Dive`,icon:`🏊`,color:`#34D058`,tagline:`Eksploruj warstwy image — znajdź co zajmuje miejsce`,install:`winget install wagoodman.dive  /  brew install dive`,use:`TUI do eksploracji warstw Docker image. Pokazuje co każda instrukcja Dockerfile dodaje do rozmiaru. Niezbędny do optymalizacji rozmiaru images.`,example:`dive moja-apka:latest
# Interaktywny widok:
# Lewo: warstwy z rozmiarem
# Prawo: pliki dodane w tej warstwie
# Tab: przełącz panel
# Space: pokaż zmienione pliki`},{name:`Trivy`,icon:`🛡️`,color:`#1904DA`,tagline:`Kompleksowe skanowanie bezpieczeństwa`,install:`winget install AquaSecurity.Trivy  /  brew install trivy`,use:`Skanuje images, Dockerfile, docker-compose.yml, kod pod kątem CVE, misconfig, sekretów. Darmowy i open-source. Standard w CI/CD pipeline.`,example:`trivy image moja-apka:latest
trivy fs .                   # skanuj pliki projektu
trivy config .               # skanuj Dockerfile/Compose
# Output: tabela z CVE, severity (CRITICAL/HIGH/MEDIUM)`},{name:`Portainer`,icon:`🖥️`,color:`#13BEF9`,tagline:`GUI do zarządzania Dockerem`,install:`docker run -d -p 9000:9000 portainer/portainer-ce`,use:`Web UI do zarządzania kontenerami, images, wolumenami, sieciami. Alternatywa dla CLI gdy wolisz klikać. Dobre dla zespołów bez doświadczenia z Docker CLI.`,example:`docker run -d   -p 9000:9000   --name portainer   -v /var/run/docker.sock:/var/run/docker.sock   portainer/portainer-ce:latest
# Otwórz: http://localhost:9000`},{name:`Watchtower`,icon:`🔭`,color:`#1ABC9C`,tagline:`Auto-update kontenerów gdy pojawi się nowy image`,install:`docker run containrrr/watchtower (jako kontener)`,use:`Monitoruje registry i automatycznie aktualizuje kontenery gdy pojawi się nowy image. Przydatne dla prostych deploymentów bez K8s.`,example:`docker run -d   --name watchtower   -v /var/run/docker.sock:/var/run/docker.sock   containrrr/watchtower   --interval 3600  # sprawdzaj co godzinę`}]},xn=[{category:`Kontenery`,icon:`📦`,items:[{cmd:`docker run -d -p 8000:8000 --name api moja-apka`,desc:`Uruchom kontener w tle`,detail:{what:`-d = detached (w tle), -p = port mapping host:kontener, --name = nazwa kontenera.`,how:`docker run [opcje] [image] [komenda]`,flags:[{flag:`-d`,desc:`Detached — w tle`},{flag:`-p 8000:8000`,desc:`Port: host:kontener`},{flag:`-e KEY=VAL`,desc:`Zmienna środowiskowa`},{flag:`-v ./data:/app/data`,desc:`Mount wolumenu`},{flag:`--rm`,desc:`Usuń kontener po zatrzymaniu`},{flag:`-it`,desc:`Interaktywny terminal`}],tips:[`docker run --rm -it python:3.12-slim bash — tymczasowy kontener`,`-p 5432:5432 dla PostgreSQL, -p 6379:6379 dla Redis`]}},{cmd:`docker ps`,desc:`Lista działających kontenerów`,detail:{what:`Pokazuje: ID, image, komendę, czas uruchomienia, status, porty, nazwę.`,how:`docker ps -a — wszystkie (łącznie z zatrzymanymi). docker ps -q — tylko ID.`,tips:[`docker ps --format "table {{.Names}}	{{.Status}}	{{.Ports}}"`,`docker stats — CPU/RAM na żywo`]}},{cmd:`docker exec -it kontener bash`,desc:`Wejdź do działającego kontenera`,detail:{what:`Uruchamia bash wewnątrz kontenera. -it = interaktywny terminal.`,how:`Jeśli bash nie istnieje (alpine): docker exec -it kontener sh`,tips:[`docker exec kontener python script.py — uruchom bez wchodzenia`,`docker exec -it db psql -U user dbname — bezpośrednio do bazy`]}},{cmd:`docker logs -f kontener`,desc:`Śledź logi kontenera`,detail:{what:`-f = follow (jak tail -f). Pokazuje stdout/stderr kontenera.`,how:`docker logs kontener — wszystkie logi. --tail 100 — ostatnie 100 linii.`,tips:[`docker compose logs -f api — logi serwisu Compose`,`--since 1h — logi z ostatniej godziny`]}},{cmd:`docker stop kontener && docker rm kontener`,desc:`Zatrzymaj i usuń kontener`,detail:{what:`stop wysyła SIGTERM (graceful). rm usuwa kontener (nie image).`,how:`docker kill kontener — natychmiastowe SIGKILL. docker rm -f — force (stop+rm).`,tips:[`docker container prune — usuń wszystkie zatrzymane kontenery`,`docker run --rm — automatycznie usuwa po zatrzymaniu`]}},{cmd:`docker stats`,desc:`Zużycie CPU/RAM kontenerów na żywo`,detail:{what:`Tabela na żywo: CPU %, pamięć, sieć, I/O dla każdego działającego kontenera.`,how:`Ctrl+C aby zatrzymać. docker stats kontener — tylko jeden kontener.`,tips:[`docker stats --no-stream — jednorazowy snapshot (nie live)`,`docker stats --format "table {{.Name}}	{{.CPUPerc}}	{{.MemUsage}}"`,`Przydatne do wykrycia wycieków pamięci i bottle-necków CPU`]}},{cmd:`docker inspect kontener`,desc:`Pełne metadane kontenera JSON`,detail:{what:`Zwraca JSON z wszystkimi szczegółami: sieci, mounty, zmienne środowiskowe, konfiguracja, status.`,how:`docker inspect --format "{{.NetworkSettings.IPAddress}}" kontener — konkretne pole.`,tips:[`docker inspect image — metadane image`,`docker inspect --format "{{json .HostConfig.Binds}}" — mounty`,`Przydatne do debugowania problemów sieciowych i konfiguracji`]}},{cmd:`docker cp kontener:/app/log.txt ./log.txt`,desc:`Kopiuj plik z/do kontenera`,detail:{what:`Kopiuje pliki między kontenerem a hostem. Działa też na zatrzymanym kontenerze.`,how:`docker cp ./config.json kontener:/app/config.json — kopiuj do kontenera.`,tips:[`Przydatne do wyciągnięcia logów z kontenera bez Volume`,`docker cp działa też gdy kontener jest zatrzymany`]}}]},{category:`Images`,icon:`🖼️`,items:[{cmd:`docker build -t moja-apka:latest .`,desc:`Zbuduj image z Dockerfile`,detail:{what:`-t = tag (nazwa:wersja). . = kontekst budowania (bieżący folder).`,how:`Docker czyta Dockerfile, wykonuje instrukcje, tworzy warstwy.`,flags:[{flag:`-t nazwa:tag`,desc:`Nazwa i tag image`},{flag:`-f Dockerfile.prod`,desc:`Konkretny plik Dockerfile`},{flag:`--no-cache`,desc:`Pomiń cache (rebuild od zera)`},{flag:`--build-arg KEY=VAL`,desc:`Argument podczas budowania`}],tips:[`docker build --no-cache gdy chcesz fresh build`,`docker build --platform linux/amd64 — cross-platform build`]}},{cmd:`docker pull python:3.12-slim`,desc:`Pobierz image z registry`,detail:{what:`Pobiera image z Docker Hub (domyślnie). Użyj konkretnych tagów — nie latest w produkcji.`,how:`Format: [registry/]nazwa[:tag]. Bez tagu = :latest`,tips:[`Zawsze pin wersję: python:3.12.3-slim nie python:latest`,`docker pull --platform linux/amd64 na Apple Silicon`]}},{cmd:`docker images`,desc:`Lista lokalnych images`,detail:{what:`Pokazuje: repository, tag, ID, datę, rozmiar.`,how:`docker images moja-apka — filtruj po nazwie.`,tips:[`docker image prune — usuń dangling images (bez tagu)`,`docker image prune -a — usuń wszystkie nieużywane images`]}},{cmd:`docker rmi moja-apka:latest`,desc:`Usuń lokalny image`,detail:{what:`Usuwa image z lokalnego cache. Nie można usunąć jeśli jest używany przez kontener.`,how:`docker rmi $(docker images -q) — usuń wszystkie (uwaga!). Zatrzymaj kontenery najpierw.`,tips:[`docker rm kontener przed docker rmi image — najpierw usuń kontener`,`docker image prune -a — czyściej niż rmi na wszystko`]}},{cmd:`docker tag moja-apka:latest myrepo/moja-apka:v1.0`,desc:`Oznacz image do wysłania`,detail:{what:`Tworzy alias (tag) dla image. Wymagane przed docker push — tag musi zawierać nazwę registry.`,how:`Format: [registry/]nazwa:tag. Docker Hub: username/repo:tag. GHCR: ghcr.io/user/repo:tag.`,tips:[`Zawsze taguj wersją: v1.0.0, nie tylko latest`,`docker tag src:latest dest:latest = skopiuj/przemianuj`]}},{cmd:`docker push myrepo/moja-apka:v1.0`,desc:`Wyślij image do registry`,detail:{what:`Pushuje image do Docker Hub, GHCR, ECR lub innego registry. Wymaga docker login.`,how:`docker login — zaloguj się najpierw. docker logout po skończeniu.`,tips:[`docker login ghcr.io -u USERNAME -p TOKEN — GitHub Container Registry`,`Automatyzuj w CI/CD: docker login + tag + push w pipeline`,`Użyj --platform linux/amd64 gdy budujesz na Apple Silicon`]}}]},{category:`Docker Compose`,icon:`🎼`,items:[{cmd:`docker compose up -d --build`,desc:`Uruchom stack i rebuild images`,detail:{what:`up = uruchom serwisy, -d = w tle, --build = przebuduj images przed uruchomieniem.`,how:`Czyta docker-compose.yml w bieżącym folderze.`,tips:[`Bez --build używa cache — dodaj gdy zmieniłeś Dockerfile`,`docker compose up api — uruchom tylko jeden serwis`]}},{cmd:`docker compose down -v`,desc:`Zatrzymaj stack i usuń wolumeny`,detail:{what:`down = zatrzymaj i usuń kontenery i sieci. -v = usuń też named volumes (dane!).`,how:`Bez -v: wolumeny zostają (dane zachowane). Z -v: wszystko znika.`,tips:[`Bez -v przy normalnym dev — zostaw dane bazy`,`-v gdy chcesz reset do zera`]}},{cmd:`docker compose exec api bash`,desc:`Wejdź do kontenera serwisu`,detail:{what:`exec w konkretnym serwisie Compose. Jak docker exec ale używa nazwy serwisu.`,how:`docker compose exec db psql -U user dbname — bezpośrednio do bazy`,tips:[`docker compose run --rm api python shell — jednorazowa komenda`,`docker compose run --rm api pytest — uruchom testy`]}},{cmd:`docker compose logs -f api`,desc:`Śledź logi konkretnego serwisu`,detail:{what:`-f = follow (live). api = nazwa serwisu z docker-compose.yml. Bez nazwy = logi wszystkich serwisów.`,how:`docker compose logs --tail=100 api — ostatnie 100 linii.`,tips:[`docker compose logs -f api db — logi dwóch serwisów naraz`,`--since 5m — logi z ostatnich 5 minut`]}},{cmd:`docker compose ps`,desc:`Status serwisów Compose`,detail:{what:`Pokazuje stan wszystkich serwisów ze stacku: running, exited, health status.`,how:`docker compose ps --services — tylko nazwy serwisów. docker compose ps -a — też zatrzymane.`,tips:[`Sprawdź health: (healthy) vs (unhealthy) — zdefiniowany w healthcheck:`,`docker compose top — procesy wewnątrz kontenerów`]}},{cmd:`docker compose restart api`,desc:`Zrestartuj serwis bez rebuildu`,detail:{what:`Restartuje serwis (stop + start) bez przebudowania image. Szybkie — przydatne gdy chcesz aplikować env vars.`,how:`docker compose up -d --build api — restart z rebuildem.`,tips:[`Nie aplikan nowych zmian w kodzie — do tego potrzeba --build`,`docker compose restart = soft restart, --build = pełny rebuild`]}}]},{category:`Czyszczenie`,icon:`🧹`,items:[{cmd:`docker system prune -af`,desc:`Usuń wszystko nieużywane (OSTROŻNIE)`,detail:{what:`Usuwa: zatrzymane kontenery, wszystkie nieużywane images, sieci, build cache. -a = wszystkie (nie tylko dangling). -f = bez pytania.`,how:`Może zwolnić kilka-kilkanaście GB.`,tips:[`docker system prune — bez -a = tylko dangling images`,`docker system df — sprawdź ile zajmuje Docker`]}},{cmd:`docker volume prune`,desc:`Usuń nieużywane wolumeny`,detail:{what:`Usuwa wolumeny które nie są zamontowane przez żaden kontener.`,how:`OSTROŻNIE — wolumeny mogą zawierać dane bazy!`,tips:[`docker volume ls — lista wolumenów`,`Sprawdź docker ps -a przed usunięciem`]}},{cmd:`docker system df`,desc:`Sprawdź ile miejsca zajmuje Docker`,detail:{what:`Podsumowanie: images, kontenery, wolumeny, build cache z rozmiarami i ile można zwolnić.`,how:`docker system df -v — szczegóły każdego elementu.`,tips:[`Uruchom przed docker system prune żeby wiedzieć co zyskasz`,`Images najczęściej największe — docker image prune -a zwalnia najwięcej`]}}]},{category:`Sieć i wolumeny`,icon:`🔌`,items:[{cmd:`docker network ls`,desc:`Lista sieci Docker`,detail:{what:`Pokazuje wszystkie sieci: bridge (domyślna), host, none, i custom. Compose tworzy automatycznie sieć per stack.`,how:`docker network inspect nazwa — szczegóły sieci (podłączone kontenery, IP).`,tips:[`Kontenery w tej samej sieci mogą się komunikować przez nazwę (nie IP)`,`docker compose tworzy sieć <projekt>_default — kontenery widzą się nawzajem`]}},{cmd:`docker network create moja-siec`,desc:`Utwórz własną sieć`,detail:{what:`Izolowana sieć bridge dla kontenerów. Kontenery w tej samej sieci komunikują się nazwą kontenera.`,how:`docker run --network moja-siec ... — dołącz kontener do sieci.`,flags:[{flag:`--driver bridge`,desc:`Most (domyślny) — izolowana sieć`},{flag:`--driver host`,desc:`Sieć hosta — brak izolacji`},{flag:`--subnet 172.20.0.0/16`,desc:`Własna podsieć`}],tips:[`W docker-compose.yml: networks: — definiuj sieci dla stacku`,`docker network connect siec kontener — dodaj istniejący kontener do sieci`]}},{cmd:`docker volume ls`,desc:`Lista wolumenów`,detail:{what:`Pokazuje wszystkie named volumes. Wolumeny przechowują dane poza kontenerem (bazy, upload, cache).`,how:`docker volume inspect vol — szczegóły (mountpoint na hoście).`,tips:[`docker volume create my-data — utwórz wolumen`,`Dane w wolumenie przeżywają docker compose down (bez -v)`,`docker volume ls -f dangling=true — wolumeny bez kontenera`]}},{cmd:`docker network prune`,desc:`Usuń nieużywane sieci`,detail:{what:`Czyści sieci bez podłączonych kontenerów. Bezpieczniejsze niż prune -a.`,how:`docker compose down usuwa sieć stacku automatycznie.`,tips:[`docker system prune usuwa też sieci — możesz więc użyć tego zamiast osobnych komend`]}}]}],Sn={meta:{id:`docker`,name:`Docker`,icon:`🐳`,color:`#2496ED`,color2:`#0DB7ED`,tagline:`Konteneryzacja aplikacji — działa wszędzie tak samo`,year:2013,author:`Solomon Hykes / Docker Inc.`,lang:`Go`,github:`moby/moby`,stars:`69k+`,codeLang:`dockerfile`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Dockerfile`},{id:`hooki`,label:`Compose`},{id:`routing`,label:`Sieć i wolumeny`},{id:`state`,label:`Produkcja`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać Docker?`,firstComponent:`Pierwszy kontener`,firstComponentLang:`bash`},intro:{title:`Czym jest Docker?`,desc:`Docker to platforma do konteneryzacji — pakuje aplikację wraz z jej zależnościami w izolowane kontenery. Kontener działa identycznie na laptopie dewelopera, CI/CD i serwerze produkcyjnym. "Działa u mnie" przestaje być problemem. Standard w nowoczesnym DevOps.`},concepts:[{title:`Image vs Kontener`,desc:`Image to szablon (przepis) — niezmienny. Kontener to uruchomiony instance image — można ich mieć wiele z jednego image. Jak klasa vs obiekt w OOP.`,icon:`📦`},{title:`Dockerfile`,desc:`Plik z instrukcjami budowania image. FROM = bazowy image, RUN = komendy podczas budowania, COPY = kopiowanie plików, CMD = domyślna komenda przy uruchomieniu.`,icon:`📋`},{title:`Docker Hub / Registry`,desc:`Publiczne repozytorium images. hub.docker.com — miliony gotowych images. python:3.12-slim, nginx:alpine, postgres:16 — bierzesz gotowy image i budujesz na nim.`,icon:`🗄️`},{title:`Docker Compose`,desc:`Uruchamia wiele kontenerów razem — np. FastAPI + PostgreSQL + Redis jedną komendą. Definiujesz w docker-compose.yml: serwisy, sieci, wolumeny. Standard dla local dev.`,icon:`🎼`}],whenToUse:[`Izolacja środowiska — każdy projekt ma własne zależności, bez konfliktów`,`Onboarding — nowy developer robi docker compose up i ma całe środowisko`,`CI/CD — testy i deploy w identycznym środowisku co produkcja`,`Mikrousługi — każdy serwis w osobnym kontenerze`,`Lokalny development z bazą danych — postgres/redis w kontenerze zamiast instalacji`,`Deploy na dowolny serwer który ma Docker — bez konfigurowania systemu`],firstComponent:`# Pobierz i uruchom gotowy kontener
docker run hello-world

# Uruchom Pythona interaktywnie
docker run -it python:3.12-slim bash

# Uruchom PostgreSQL lokalnie (bez instalacji)
docker run -d   --name postgres   -e POSTGRES_PASSWORD=secret   -p 5432:5432   postgres:16-alpine

# Sprawdź działające kontenery
docker ps

# Zatrzymaj kontener
docker stop postgres`},komponenty:[{title:`Dockerfile — podstawowa struktura`,desc:`Każda instrukcja tworzy nową warstwę. Kolejność ma znaczenie — zmieniające się warstwy na końcu (cache). Zawsze używaj konkretnych tagów wersji.`,code:`FROM python:3.12-slim

# Metadane (opcjonalne)
LABEL maintainer="lukasz@example.com"

# Zmienne środowiskowe
ENV PYTHONDONTWRITEBYTECODE=1     PYTHONUNBUFFERED=1

# Folder roboczy w kontenerze
WORKDIR /app

# Kopiuj requirements i instaluj zależności
# (osobna warstwa — cache gdy requirements nie zmienią się)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiuj kod aplikacji
COPY . .

# Port który kontener nasłuchuje (dokumentacja)
EXPOSE 8000

# Komenda przy uruchomieniu kontenera
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`},{title:`Multi-stage build — mały image produkcyjny`,desc:`Multi-stage build używa wielu FROM. Pierwsza faza buduje (z narzędziami). Druga faza kopiuje tylko gotowy wynik — bez narzędzi dev. Mniejszy, bezpieczniejszy image.`,code:`# Faza 1: builder — z narzędziami do budowania
FROM python:3.12 AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Faza 2: runtime — tylko to co potrzebne
FROM python:3.12-slim

WORKDIR /app

# Skopiuj tylko zainstalowane paczki z buildera
COPY --from=builder /root/.local /root/.local
COPY . .

# Uruchom jako non-root user (bezpieczeństwo)
RUN adduser --disabled-password --no-create-home appuser
USER appuser

ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`},{title:`Optymalizacja Dockerfile — cache i rozmiar`,desc:`Docker cache działa layer po layer — jeśli warstwa się nie zmieniła, używa cache. Strategie: kolejność warstw, .dockerignore, slim images, --no-cache-dir.`,code:`# .dockerignore — nie kopiuj zbędnych plików
# (analogia do .gitignore)
# Zawartość .dockerignore:
# .git
# .venv
# __pycache__
# *.pyc
# .env
# tests/
# *.md

# Złe — requirements zmienią cache całego kodu
COPY . .
RUN pip install -r requirements.txt

# Dobre — requirements osobna warstwa (cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .   # zmiana kodu nie unieważnia warstwy pip

# Zmniejsz rozmiar — usuń cache w tej samej warstwie
RUN apt-get update && apt-get install -y     build-essential     && rm -rf /var/lib/apt/lists/*`},{title:`Budowanie i tagowanie image`,desc:`docker build czyta Dockerfile i tworzy image. Tag to etykieta — nazwa:wersja. Dobre tagowanie ułatwia zarządzanie wersjami.`,code:`# Buduj image z tagiem
docker build -t moja-apka:1.0.0 .
docker build -t moja-apka:latest .

# Buduj z konkretnego Dockerfile
docker build -f Dockerfile.prod -t moja-apka:prod .

# Build args — zmienne podczas budowania
docker build --build-arg ENV=production -t moja-apka .

# Sprawdź rozmiar i warstwy
docker images moja-apka
docker history moja-apka:latest

# Usuń image
docker rmi moja-apka:1.0.0
docker image prune  # usuń nieużywane images`}],hooki:[{title:`docker-compose.yml — podstawowa struktura`,desc:`Compose definiuje wiele serwisów w jednym pliku YAML. Wersja 3+ jest standardem. Każdy serwis to kontener z konfiguracją.`,code:`# docker-compose.yml
version: "3.9"

services:
  api:
    build: .                          # buduj z Dockerfile w bieżącym folderze
    ports:
      - "8000:8000"                   # host:kontener
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app                        # hot reload w dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`},{title:`Compose — dev vs produkcja`,desc:`Używaj wielu plików Compose — bazowy + override dla dev/prod. docker-compose.override.yml ładuje się automatycznie w dev.`,code:`# docker-compose.yml — bazowy (produkcja)
services:
  api:
    image: registry.example.com/moja-apka:latest
    restart: always
    environment:
      - DEBUG=false

# docker-compose.override.yml — dev (auto-load)
services:
  api:
    build: .              # buduj lokalnie zamiast pobierać image
    volumes:
      - .:/app            # live reload
    environment:
      - DEBUG=true
    command: uvicorn main:app --reload --host 0.0.0.0

# Użycie:
# Dev (auto-merge override):
docker compose up

# Produkcja (tylko bazowy):
docker compose -f docker-compose.yml up`},{title:`Compose — przydatne komendy`,desc:`Compose zarządza całym stackiem jedną komendą. up, down, logs, exec — codzienne operacje.`,code:`# Uruchom wszystkie serwisy (w tle)
docker compose up -d

# Uruchom z rebuild (gdy zmieniłeś Dockerfile)
docker compose up -d --build

# Zatrzymaj wszystko
docker compose down

# Zatrzymaj i usuń wolumeny (reset bazy danych!)
docker compose down -v

# Logi wszystkich serwisów
docker compose logs -f

# Logi konkretnego serwisu
docker compose logs -f api

# Wejdź do kontenera
docker compose exec api bash
docker compose exec db psql -U user mydb

# Uruchom jednorazową komendę
docker compose run --rm api python manage.py migrate

# Restart konkretnego serwisu
docker compose restart api`},{title:`Health checks — monitoring serwisów`,desc:`Healthcheck mówi Docker kiedy serwis jest gotowy. depends_on z condition: service_healthy czeka na zdrowy serwis.`,code:`services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s

  api:
    build: .
    depends_on:
      db:
        condition: service_healthy   # czekaj aż DB zdrowe
      redis:
        condition: service_started   # wystarczy że uruchomiony

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 3`}],...yn,...bn,komendy:xn}},Cn={id:`pyautogui`,name:`PyAutoGUI`,icon:`🖱️`,color:`#FF6B6B`,color2:`#FF8E53`,tagline:`Automatyzacja myszy i klawiatury — kontroluj GUI z Pythona`,year:2014,author:`Al Sweigart`,lang:`Python 3.8+`,github:`asweigart/pyautogui`,stars:`10k+`,codeLang:`python`,tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Mysz`},{id:`hooki`,label:`Klawiatura`},{id:`routing`,label:`Screenshoty`},{id:`state`,label:`Zaawansowane`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}]},wn={meta:Cn,tabs:Cn.tabs,content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać PyAutoGUI?`,firstComponent:`Pierwsze kroki`,firstComponentLang:`python`},intro:{title:`Czym jest PyAutoGUI?`,desc:`PyAutoGUI to biblioteka do automatyzacji GUI — kontroluje mysz i klawiaturę tak jak człowiek.
Klikasz przyciski, wpisujesz tekst, robisz screenshoty i szukasz elementów na ekranie.
Działa na Windows, Mac i Linux. Idealna gdy aplikacja nie ma API i jedyna opcja to
sterowanie interfejsem graficznym. Stworzona przez Al Sweigart (autora "Automate the Boring Stuff").
`},concepts:[{title:`FAILSAFE — bezpiecznik`,icon:`🛡️`,desc:`Wbudowane zabezpieczenie — przesuń mysz w górny lewy róg ekranu żeby zatrzymać skrypt.
pyautogui.FAILSAFE = True (domyślnie włączone). Ratuje życie gdy skrypt wymknął się
spod kontroli i klika w złe miejsca. Nigdy nie wyłączaj bez powodu.
`},{title:`PAUSE — kontrola tempa`,icon:`⏱️`,desc:`pyautogui.PAUSE = 0.5 dodaje 0.5s pauzy po każdej akcji. Spowalnia skrypt żeby GUI
nadążało za automatyzacją. Niezbędne dla stabilnych skryptów — bez pauzy klikasz zanim
okno się otworzy. Dla produkcji: 0.1–0.3s. Dla debugowania: 1–2s.
`},{title:`Współrzędne ekranu`,icon:`📍`,desc:`Mysz działa na pikselach (x, y). Punkt (0, 0) to górny lewy róg ekranu.
pyautogui.position() zwraca aktualną pozycję kursora.
pyautogui.size() zwraca rozdzielczość ekranu (width, height).
Użyj python -m mouseinfo żeby interaktywnie znaleźć współrzędne.
`},{title:`locateOnScreen — szukanie po obrazku`,icon:`🔍`,desc:`pyautogui.locateOnScreen("button.png") szuka obrazka na ekranie i zwraca jego pozycję.
Nie musisz hardkodować współrzędnych — skrypt działa niezależnie od rozdzielczości.
Z parametrem confidence=0.9 (wymaga opencv) toleruje drobne różnice w wyglądzie.
Podstawa odpornych, przenośnych skryptów automatyzacji.
`},{title:`typewrite vs pyperclip`,icon:`⌨️`,desc:`typewrite() wpisuje tekst znak po znaku jak człowiek — ale nie obsługuje polskich znaków!
Rozwiązanie: pyperclip.copy("tekst z polskimi") + pyautogui.hotkey("ctrl", "v").
Kopiowanie do schowka i wklejenie działa z każdym zestawem znaków Unicode.
`},{title:`Czas vs stabilność`,icon:`⚖️`,desc:`Szybkie skrypty (niskie PAUSE, duration=0) mogą być niestabilne — GUI nie nadąża.
Wolne skrypty (PAUSE=1, duration=1.0) są niezawodne ale trwają długo.
Złoty środek: PAUSE=0.2, duration=0.3-0.5 dla ruchów myszy. Testuj i dostosuj.
`}],whenToUse:[`Automatyzacja powtarzalnych zadań w programach bez API (Excel, legacy apps, ERP)`,`Testowanie GUI aplikacji desktopowych gdy Selenium nie wystarczy`,`Web scraping gdy strona blokuje WebDriver (aplikacje Flash, Java, Electron)`,`Automatyczne wypełnianie formularzy w programach biurowych`,`Integracja dwóch programów które nie mają API — "klik-bot" między nimi`,`Skrypty do gier — farming, powtarzalne akcje (jeśli ToS pozwala)`,`Automatyczne generowanie raportów w aplikacjach desktopowych`],firstComponent:`import pyautogui
import time

# Konfiguracja bezpieczeństwa — zawsze na początku skryptu
pyautogui.FAILSAFE = True   # mysz w lewy górny róg = zatrzymaj
pyautogui.PAUSE = 0.5       # 500ms pauzy po każdej akcji

# Informacje o ekranie
w, h = pyautogui.size()
print(f"Ekran: {w}x{h}")

# Gdzie jest mysz?
x, y = pyautogui.position()
print(f"Mysz: {x}, {y}")

# Przesuń mysz do środka ekranu
pyautogui.moveTo(w // 2, h // 2, duration=0.5)

# Kliknij
pyautogui.click()

# Wpisz tekst (tylko ASCII!)
pyautogui.typewrite("Hello World", interval=0.05)

# Polskie znaki — przez schowek
import pyperclip
pyperclip.copy("Zażółć gęślą jaźń")
pyautogui.hotkey("ctrl", "v")

# Skrót klawiszowy
pyautogui.hotkey("ctrl", "s")   # zapisz

print("Gotowe!")
`},komponenty:{title:`Kontrola myszy`,items:[{name:`moveTo / moveRel — ruch myszy`,desc:`Przesuń mysz do pozycji absolutnej (moveTo) lub relatywnej (moveRel).
duration kontroluje czas animacji — 0 to ruch natychmiastowy.
Animacja wygląda bardziej "ludzko" i daje GUI czas na reakcję.
`,code:`import pyautogui

# Przesuń do pozycji (500, 300) w 0.5 sekundy
pyautogui.moveTo(500, 300, duration=0.5)

# Przesuń o 100px w prawo i 50px w dół (relatywnie)
pyautogui.moveRel(100, 50, duration=0.3)

# Natychmiastowy ruch (bez animacji)
pyautogui.moveTo(0, 0)

# Sprawdź aktualną pozycję
pos = pyautogui.position()
print(f"Mysz: {pos.x}, {pos.y}")

# Rozdzielczość ekranu
w, h = pyautogui.size()
print(f"Ekran: {w}x{h}")
`},{name:`click / doubleClick / rightClick`,desc:`Klikanie — lewy, prawy, środkowy, podwójny klik. Możesz podać pozycję
lub kliknąć w aktualnej pozycji myszy. interval dodaje opóźnienie po kliknięciu.
`,code:`import pyautogui

# Lewy klik w pozycji
pyautogui.click(500, 300)

# Klik na aktualnej pozycji (bez argumentów)
pyautogui.click()

# Podwójny klik (otwiera plik, zaznacza słowo)
pyautogui.doubleClick(500, 300)

# Prawy klik — menu kontekstowe
pyautogui.rightClick(500, 300)

# Środkowy klik (otwiera link w nowej karcie)
pyautogui.middleClick(500, 300)

# Klik z opóźnieniem po kliknięciu
pyautogui.click(500, 300, interval=0.3)

# Wiele kliknięć
pyautogui.click(500, 300, clicks=3, interval=0.2)
`},{name:`drag / dragTo — przeciąganie`,desc:`Drag and drop — przeciągnij element z jednej pozycji do drugiej.
dragTo: przeciągnij DO pozycji absolutnej.
dragRel: przeciągnij O relatywne przesunięcie.
`,code:`import pyautogui

# Przeciągnij DO pozycji (400, 200) w 1 sekundę
pyautogui.dragTo(400, 200, duration=1.0, button='left')

# Przeciągnij relatywnie — 300px w prawo
pyautogui.dragRel(300, 0, duration=1.0)

# Ręczny drag & drop (pełna kontrola)
pyautogui.moveTo(100, 200, duration=0.5)  # jedź do elementu
pyautogui.mouseDown()                      # wciśnij przycisk
pyautogui.moveTo(400, 200, duration=1.0)  # przeciągnij
pyautogui.mouseUp()                        # puść

# Drag z prawym przyciskiem
pyautogui.dragTo(400, 200, duration=0.5, button='right')
`},{name:`scroll — kółko myszy`,desc:`Scrollowanie kółkiem myszy. Wartość dodatnia = w górę, ujemna = w dół.
Możesz scrollować w konkretnej pozycji ekranu.
`,code:`import pyautogui

# Scroll w górę (3 kliknięcia)
pyautogui.scroll(3)

# Scroll w dół (5 kliknięć)
pyautogui.scroll(-5)

# Scroll w konkretnej pozycji (np. w środku listy)
pyautogui.scroll(3, x=500, y=300)

# Horizontal scroll (Mac i niektóre aplikacje Windows)
pyautogui.hscroll(3)    # w prawo
pyautogui.hscroll(-3)   # w lewo

# Scroll do końca strony
for _ in range(10):
    pyautogui.scroll(-10)
    import time; time.sleep(0.1)
`},{name:`mouseDown / mouseUp — precyzyjna kontrola`,desc:`Rozdziel wciśnięcie i puszczenie przycisku myszy. Przydatne do
zaznaczania tekstu, przeciągania, gier.
`,code:`import pyautogui

# Zaznacz tekst: wciśnij w punkcie A, puść w punkcie B
pyautogui.moveTo(100, 200)
pyautogui.mouseDown()
pyautogui.moveTo(400, 200, duration=0.5)
pyautogui.mouseUp()

# Wciśnij prawy przycisk
pyautogui.mouseDown(button='right')
pyautogui.mouseUp(button='right')

# Sprawdź czy wciśnięty (pynput bardziej zaawansowany)
# pyautogui nie ma isButtonDown() — użyj pynput do monitorowania
`}]},hooki:{title:`Kontrola klawiatury`,items:[{name:`typewrite — pisanie tekstu`,desc:`Wpisuje tekst znak po znaku jak człowiek.
interval = opóźnienie między znakami (bardziej "ludzkie").
UWAGA: nie obsługuje polskich znaków ani emoji — używaj pyperclip dla Unicode.
`,code:`import pyautogui
import pyperclip

# ASCII tekst
pyautogui.typewrite("Hello World", interval=0.05)

# Szybko (bez opóźnienia)
pyautogui.typewrite("Quick text")

# PROBLEM: polskie znaki są ignorowane!
pyautogui.typewrite("Zażółć")  # wypisze tylko "Za"

# ROZWIĄZANIE: schowek systemowy
pyperclip.copy("Zażółć gęślą jaźń 🐍")
pyautogui.hotkey("ctrl", "v")
`},{name:`hotkey — skróty klawiszowe`,desc:`Wysyła kombinację klawiszy jednocześnie (wszystkie wciśnięte razem).
Obsługuje dowolną liczbę klawiszy.
`,code:`import pyautogui

# Podstawowe skróty
pyautogui.hotkey("ctrl", "s")          # zapisz
pyautogui.hotkey("ctrl", "z")          # cofnij
pyautogui.hotkey("ctrl", "y")          # ponów
pyautogui.hotkey("ctrl", "a")          # zaznacz wszystko
pyautogui.hotkey("ctrl", "c")          # kopiuj
pyautogui.hotkey("ctrl", "v")          # wklej

# Okna i system
pyautogui.hotkey("alt", "f4")          # zamknij okno
pyautogui.hotkey("win", "d")           # pokaż pulpit
pyautogui.hotkey("win", "l")           # zablokuj ekran
pyautogui.hotkey("alt", "tab")         # przełącz okno

# Trzy klawisze
pyautogui.hotkey("ctrl", "shift", "n")  # nowe okno incognito
`},{name:`press — pojedyncze klawisze`,desc:`Wciśnij i zwolnij jeden klawisz. Obsługuje klawisze specjalne:
enter, tab, space, backspace, delete, escape, strzałki, F1-F12.
`,code:`import pyautogui

# Klawisze specjalne
pyautogui.press("enter")
pyautogui.press("tab")
pyautogui.press("escape")
pyautogui.press("space")
pyautogui.press("backspace")
pyautogui.press("delete")

# Nawigacja
pyautogui.press("up")
pyautogui.press("down")
pyautogui.press("left")
pyautogui.press("right")
pyautogui.press("home")
pyautogui.press("end")
pyautogui.press("pageup")
pyautogui.press("pagedown")

# Wielokrotne wciśnięcie
pyautogui.press("right", presses=5)         # 5x strzałka w prawo
pyautogui.press("backspace", presses=10)    # usuń 10 znaków
pyautogui.press("tab", presses=3)           # 3x tab

# Funkcyjne
pyautogui.press("f5")    # odśwież
pyautogui.press("f11")   # fullscreen
`},{name:`keyDown / keyUp — trzymanie klawisza`,desc:`Rozdziel wciśnięcie i zwolnienie klawisza. Przydatne do zaznaczania
(Shift+strzałki), skrótów wymagających trzymania klawisza, gier.
`,code:`import pyautogui

# Shift+Home = zaznacz do początku linii
pyautogui.keyDown("shift")
pyautogui.press("home")
pyautogui.keyUp("shift")

# Shift+strzałki = zaznaczaj tekst
pyautogui.keyDown("shift")
pyautogui.press("right", presses=10)  # zaznacz 10 znaków
pyautogui.keyUp("shift")

# Ctrl+klik (zaznacz wiele elementów)
pyautogui.keyDown("ctrl")
pyautogui.click(100, 200)
pyautogui.click(300, 400)
pyautogui.click(500, 600)
pyautogui.keyUp("ctrl")

# Pełna lista klawiszy
print(pyautogui.KEYBOARD_KEYS)
`}]},routing:{title:`Screenshoty i szukanie elementów`,items:[{name:`screenshot — zrzut ekranu`,desc:`Robi zrzut ekranu i zwraca obiekt PIL Image.
Możesz zrobić screenshot całości lub wybranego regionu.
Przydatny do tworzenia obrazków referencyjnych dla locateOnScreen.
`,code:`import pyautogui

# Screenshot całego ekranu
img = pyautogui.screenshot()
img.save("screen.png")

# Screenshot fragmentu ekranu (region)
# region = (left, top, width, height)
img = pyautogui.screenshot(region=(0, 0, 800, 600))
img.save("fragment.png")

# Zapisz bezpośrednio do pliku
pyautogui.screenshot("screen.png")

# Kolor piksela na ekranie
color = pyautogui.pixel(100, 200)
print(color)  # (255, 128, 0) — RGB

# Sprawdź czy piksel ma konkretny kolor
if pyautogui.pixelMatchesColor(100, 200, (255, 128, 0)):
    print("Kolor się zgadza!")
`},{name:`locateOnScreen — szukanie obrazka`,desc:`Szuka podanego obrazka na ekranie. Zwraca Box(left, top, width, height) lub None.
Z parametrem confidence (wymaga opencv) toleruje drobne różnice — skalowanie, AA.
Podstawa odpornych skryptów — nie hardkodujesz współrzędnych.
`,code:`import pyautogui

# Szukaj przycisku (100% dopasowanie)
location = pyautogui.locateOnScreen("button.png")
if location:
    # Kliknij środek znalezionego elementu
    center = pyautogui.center(location)
    pyautogui.click(center)
else:
    print("Nie znaleziono przycisku!")

# Z tolerancją (wymaga: pip install opencv-python)
location = pyautogui.locateOnScreen("button.png", confidence=0.9)

# Szukaj tylko w regionie (szybsze!)
location = pyautogui.locateOnScreen(
    "button.png",
    region=(0, 0, 800, 600),
    confidence=0.85
)

# Znajdź wszystkie wystąpienia (np. wiele ikon)
for loc in pyautogui.locateAllOnScreen("icon.png", confidence=0.9):
    pyautogui.click(pyautogui.center(loc))
`},{name:`Czekanie na element`,desc:`Skrypt czeka aż element pojawi się na ekranie — wzorzec niezbędny
przy automatyzacji gdzie czas ładowania jest nieprzewidywalny.
`,code:`import pyautogui
import time

def wait_for_element(image_path, timeout=10, confidence=0.9):
    """Czekaj aż obrazek pojawi się na ekranie."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            location = pyautogui.locateOnScreen(
                image_path,
                confidence=confidence
            )
            if location:
                return pyautogui.center(location)
        except pyautogui.ImageNotFoundException:
            pass
        time.sleep(0.5)
    raise TimeoutError(f"Nie znaleziono {image_path} po {timeout}s")

def wait_and_click(image_path, timeout=10):
    """Poczekaj na element i kliknij."""
    center = wait_for_element(image_path, timeout)
    pyautogui.click(center)
    return True

# Użycie
wait_and_click("ok_button.png", timeout=15)
wait_and_click("next_button.png", timeout=5)
`},{name:`pixelMatchesColor — oczekiwanie na zmianę`,desc:`Czekaj na zmianę koloru piksela — np. wskaźnik postępu, zmiana stanu przycisku.
Tańszy alternatywa dla locateOnScreen gdy wystarczy kolor.
`,code:`import pyautogui
import time

def wait_for_color(x, y, color, timeout=30):
    """Czekaj aż piksel (x, y) przyjmie dany kolor."""
    start = time.time()
    while time.time() - start < timeout:
        if pyautogui.pixelMatchesColor(x, y, color, tolerance=10):
            return True
        time.sleep(0.2)
    return False

# Czekaj aż progress bar stanie się zielony (0, 200, 0)
if wait_for_color(500, 300, (0, 200, 0), timeout=60):
    print("Operacja zakończona!")
    pyautogui.click(600, 400)  # kliknij OK
else:
    print("Timeout — coś poszło nie tak")
`}]},state:{title:`Zaawansowane wzorce`,items:[{name:`Obsługa błędów i stabilność`,desc:`Wzorzec dla niezawodnych skryptów automatyzacji. Retry logic, graceful exit,
logowanie błędów. Skrypt produkcyjny musi radzić sobie z nieoczekiwanymi sytuacjami.
`,code:`import pyautogui
import time
import sys
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.3

def safe_click(image, retries=3, confidence=0.85):
    """Kliknij w element szukając go po obrazku z retry."""
    for attempt in range(retries):
        try:
            loc = pyautogui.locateOnScreen(image, confidence=confidence)
            if loc:
                pyautogui.click(pyautogui.center(loc))
                logging.info(f"Kliknięto {image}")
                return True
        except Exception as e:
            logging.warning(f"Próba {attempt+1}/{retries}: {e}")
        time.sleep(1)
    logging.error(f"Nie znaleziono {image} po {retries} próbach")
    return False

try:
    safe_click("start_button.png")
    time.sleep(2)
    safe_click("confirm.png")
except pyautogui.FailSafeException:
    logging.info("Zatrzymano przez FailSafe")
    sys.exit(0)
except Exception as e:
    logging.error(f"Nieoczekiwany błąd: {e}")
    sys.exit(1)
`},{name:`Okna dialogowe`,desc:`PyAutoGUI ma wbudowane proste okna dialogowe — alert, confirm, prompt, password.
Blokują skrypt do momentu odpowiedzi użytkownika.
`,code:`import pyautogui

# Alert — tylko OK
pyautogui.alert("Skrypt zakończony pomyślnie!")

# Potwierdzenie — OK lub Cancel
result = pyautogui.confirm("Czy kontynuować automatyzację?")
if result == "OK":
    print("Kontynuuję...")
else:
    print("Anulowano")

# Prompt — pobierz tekst od użytkownika
filename = pyautogui.prompt("Podaj nazwę pliku docelowego:")
if filename:
    print(f"Plik: {filename}")

# Hasło (ukrywa wpisywany tekst)
password = pyautogui.password("Podaj hasło do systemu:")
`},{name:`Łączenie z pyperclip i subprocess`,desc:`Pełny skrypt automatyzacji — uruchamia program, wpisuje tekst z polskimi znakami,
zapisuje i zamyka. Standardowy wzorzec dla skryptów biurowych.
`,code:`import pyautogui
import pyperclip
import subprocess
import time

# Uruchom Notatnik
subprocess.Popen("notepad.exe")
time.sleep(1.5)  # poczekaj na otwarcie

# Tekst z polskimi znakami przez schowek
pyperclip.copy("Raport dzienny\\nZażółć gęślą jaźń — polskie znaki!")
pyautogui.hotkey("ctrl", "v")
time.sleep(0.3)

# Zaznacz wszystko i skopiuj z powrotem
pyautogui.hotkey("ctrl", "a")
pyautogui.hotkey("ctrl", "c")
content = pyperclip.paste()
print(f"Treść: {content[:50]}...")

# Zapisz
pyautogui.hotkey("ctrl", "s")
time.sleep(0.5)

# Podaj nazwę pliku (jeśli dialog)
pyautogui.typewrite("raport.txt", interval=0.05)
pyautogui.press("enter")

# Zamknij
pyautogui.hotkey("alt", "f4")
`},{name:`Automatyzacja z harmonogramem`,desc:`Skrypt który działa cyklicznie — codziennie, co godzinę, o konkretnej porze.
schedule to prosty cron w Pythonie.
`,code:`import schedule
import time
import pyautogui
import logging

logging.basicConfig(level=logging.INFO)

def daily_report():
    """Codzienne wygenerowanie raportu o 9:00."""
    logging.info("Uruchamiam raport dzienny")
    try:
        pyautogui.hotkey("win", "d")      # pokaż pulpit
        time.sleep(1)
        pyautogui.doubleClick(500, 300)   # otwórz aplikację
        time.sleep(2)
        # ... reszta automatyzacji ...
        logging.info("Raport wygenerowany")
    except Exception as e:
        logging.error(f"Błąd: {e}")

def hourly_check():
    """Co godzinę sprawdź status systemu."""
    logging.info("Sprawdzam status...")

# Harmonogram
schedule.every().day.at("09:00").do(daily_report)
schedule.every().hour.do(hourly_check)
schedule.every(30).minutes.do(hourly_check)

logging.info("Harmonogram uruchomiony. Ctrl+C żeby zatrzymać.")
while True:
    schedule.run_pending()
    time.sleep(60)
`},{name:`Nagrywanie i odtwarzanie akcji`,desc:`Wzorzec makra — nagraj akcje użytkownika, odtwórz automatycznie.
Pynput do nasłuchiwania, PyAutoGUI do odtwarzania.
`,code:`from pynput import mouse, keyboard
import pyautogui
import time

recorded_actions = []
recording = False

def on_click(x, y, button, pressed):
    if recording and pressed:
        recorded_actions.append(('click', x, y, str(button)))

def on_move(x, y):
    if recording:
        recorded_actions.append(('move', x, y, time.time()))

# Nagraj akcje
print("Zacznij nagrywanie — F9 aby zatrzymać")
recording = True

with mouse.Listener(on_click=on_click, on_move=on_move) as listener:
    keyboard.Listener(on_press=lambda k: setattr(listener, '_running', False)
                      if k == keyboard.Key.f9 else None).start()
    listener.join()

recording = False
print(f"Nagrano {len(recorded_actions)} akcji")

# Odtwórz
for action_type, x, y, extra in recorded_actions:
    if action_type == 'click':
        pyautogui.click(x, y)
    elif action_type == 'move':
        pyautogui.moveTo(x, y, duration=0.05)
    time.sleep(0.05)
`}]},rywale:{title:`Rywale — alternatywy dla PyAutoGUI`,items:[{name:`Selenium — automatyzacja przeglądarek`,icon:`🔬`,desc:`Dedykowana biblioteka do automatyzacji przeglądarek webowych (Chrome, Firefox, Edge).
Działa przez WebDriver API — bezpośredni dostęp do DOM, nie pikselami.

Kiedy Selenium wygrywa z PyAutoGUI:
• Aplikacje webowe — stabilniejszy, czeka na elementy DOM automatycznie
• XPath i CSS selectors — precyzyjne wyszukiwanie elementów
• Headless mode — działa bez okna (serwer, CI/CD)
• JavaScript wykonanie bezpośrednio w przeglądarce

Kiedy PyAutoGUI wygrywa:
• Aplikacje desktopowe (.exe, native GUI)
• Strony blokujące WebDriver (wykrywają Selenium)
• Każde GUI — nie tylko przeglądarka
• Prostszy setup (brak WebDrivera)
`},{name:`Playwright — nowoczesna automatyzacja web`,icon:`🎭`,desc:`Nowoczesna ewolucja Selenium — szybszy, bardziej niezawodny, lepsze API.
Stworzony przez Microsoft. Obsługuje Chromium, Firefox, WebKit.

Przewaga nad Selenium:
• Auto-wait — czeka automatycznie na elementy, animacje, requesty
• Wbudowane screenshoty i nagrywanie video
• Network interception — modyfikuj requesty/response
• Tracing i debugging tools
• TypeScript + Python + Java + C#

Kiedy PyAutoGUI zamiast Playwright:
Playwright = tylko przeglądarki. PyAutoGUI = dowolne GUI, w tym desktopowe.
Wybierz Playwright do testów E2E webowych, PyAutoGUI gdy wychodzisz poza browser.
`},{name:`pywinauto — natywne Windows GUI`,icon:`🪟`,desc:`Automatyzacja aplikacji Windows przez accessibility API (UIA/MSAA).
Nie działa na pikselach — szuka elementów po kontrolkach Windows.

Kiedy pywinauto wygrywa:
• Aplikacje natywne Windows (.exe, WinForms, MFC, WPF)
• Działa nawet gdy okno jest minimalizowane lub za innymi
• Nie zależy od rozdzielczości ekranu
• Bardziej stabilny niż image-based

Kiedy PyAutoGUI wygrywa:
• Cross-platform (Mac, Linux, Windows)
• Prostszy setup i API
• Aplikacje które nie eksponują accessibility API
• Gry i aplikacje OpenGL/DirectX
`},{name:`pynput — monitoring inputu`,icon:`🎮`,desc:`Bardziej zaawansowana biblioteka do kontroli i monitorowania klawiatury/myszy.
Unikalny feature: nasłuchiwanie zdarzeń w tle (co wciśnięto, gdzie kliknięto).

Co ma pynput czego nie ma PyAutoGUI:
• Listeners — przechwytuj klawisze i kliknięcia asynchronicznie
• Globalne hotkeys — reaguj na Ctrl+F9 nawet gdy aplikacja w tle
• Obsługa Unicode (polskie znaki!)
• Bardziej precyzyjne typy przycisków

Użyj razem: pynput do nasłuchiwania/monitorowania, PyAutoGUI do screenshotów i locate.
`},{name:`AutoHotkey — skrypty Windows`,icon:`⌨️`,desc:`Dedykowany język skryptowy do automatyzacji Windows. Kompiluje skrypty do .exe.
Standardowe narzędzie dla zaawansowanych użytkowników Windows.

Mocne strony AHK:
• Hotkeys na poziomie systemu — działają zawsze, w każdej aplikacji
• Kompilacja do standalone .exe — zero instalacji dla użytkownika końcowego
• Remap klawiszy systemowo (np. CapsLock → Ctrl)
• Szybki i lekki

Kiedy PyAutoGUI zamiast AHK:
AHK = tylko Windows, własny język. PyAutoGUI = Python, cross-platform,
łatwa integracja z resztą kodu. Wybierz PyAutoGUI jeśli masz projekt w Pythonie.
`}]},pluginy:{title:`Ekosystem PyAutoGUI`,items:[{name:`pyperclip — schowek systemowy`,icon:`📋`,desc:`Kopiowanie i wklejanie przez schowek systemowy. Obowiązkowe do wpisywania
polskich znaków i emoji — typewrite ich nie obsługuje.

Instalacja: pip install pyperclip
`,code:`import pyperclip
import pyautogui

# Kopiuj do schowka
pyperclip.copy("Zażółć gęślą jaźń 🐍")

# Wklej w aktywnym polu
pyautogui.hotkey("ctrl", "v")

# Pobierz zawartość schowka
text = pyperclip.paste()
print(text)

# Kopiuj i wklej wartość zmiennej
data = f"Wynik: {42 * 3.14:.2f}"
pyperclip.copy(data)
pyautogui.hotkey("ctrl", "v")
`},{name:`opencv-python — szukanie z tolerancją`,icon:`👁️`,desc:`PyAutoGUI używa OpenCV do parametru confidence w locateOnScreen.
Bez OpenCV — tylko 100% dopasowanie. Z OpenCV — szukaj z tolerancją 0.8–0.95.

Instalacja: pip install opencv-python
`,code:`import pyautogui

# confidence wymaga opencv-python
location = pyautogui.locateOnScreen(
    "button.png",
    confidence=0.9   # 90% podobieństwa
)
if location:
    pyautogui.click(pyautogui.center(location))

# Dla szybkości — ogranicz region
loc = pyautogui.locateOnScreen(
    "icon.png",
    region=(0, 0, 400, 300),
    confidence=0.85
)
`},{name:`Pillow (PIL) — przetwarzanie screenshotów`,icon:`🖼️`,desc:`PyAutoGUI zwraca screenshoty jako PIL Image. Pillow pozwala je przetwarzać —
przycinać, analizować kolory, konwertować. Instaluje się automatycznie z PyAutoGUI.

Instalacja: pip install Pillow (zwykle już jest)
`,code:`import pyautogui
from PIL import Image, ImageFilter

# Screenshot → PIL Image
img = pyautogui.screenshot()

# Przytnij do regionu
cropped = img.crop((100, 100, 400, 300))
cropped.save("region.png")

# Sprawdź kolor piksela
pixel = img.getpixel((500, 300))
print(f"Kolor: {pixel}")  # (R, G, B)

# Zmień rozmiar przed locateOnScreen (szybsze)
small = img.resize((960, 540))
`},{name:`pytesseract — OCR`,icon:`📝`,desc:`Odczytywanie tekstu ze screenshotów przez Tesseract OCR.
Pobierz wartości z okien aplikacji bez API — saldo, status, etykiety.

Instalacja: pip install pytesseract + Tesseract w systemie
`,code:`import pyautogui
import pytesseract

# Windows: ustaw ścieżkę do Tesseract
# pytesseract.pytesseract.tesseract_cmd = r"C:\\Tesseract-OCR\\tesseract.exe"

# Screenshot fragmentu z tekstem
img = pyautogui.screenshot(region=(100, 200, 300, 50))

# Odczytaj tekst
text = pytesseract.image_to_string(img, lang="pol")
print(f"Odczytano: {text.strip()}")

# Tylko cyfry (np. odczytaj cenę)
config = "--psm 8 -c tessedit_char_whitelist=0123456789.,"
number = pytesseract.image_to_string(img, config=config)
print(f"Liczba: {number.strip()}")
`},{name:`pynput — zaawansowany input`,icon:`🎮`,desc:`Bardziej zaawansowana kontrola klawiatury i myszy + nasłuchiwanie zdarzeń.
Obsługuje Unicode (polskie znaki!), globalne hotkeys, monitoring inputu.

Instalacja: pip install pynput
`,code:`from pynput import keyboard, mouse
from pynput.keyboard import Key, Controller

kb = Controller()

# Wpisz tekst z Unicode (polskie znaki!)
kb.type("Zażółć gęślą jaźń 🐍")

# Globalny listener — reaguj na Ctrl+F9 w tle
def on_press(key):
    if key == Key.f9:
        print("F9 wciśnięte!")
        return False  # zatrzymaj listener

with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
`},{name:`schedule — cron w Pythonie`,icon:`⏰`,desc:`Uruchamia funkcje automatyzacji o zaplanowanych porach.
Prosty zamiennik cron — działa w Pythonie, zero konfiguracji systemu.

Instalacja: pip install schedule
`,code:`import schedule
import time
import pyautogui

def backup_task():
    pyautogui.hotkey("ctrl", "s")

def daily_report():
    print("Generuję raport...")

# Harmonogram
schedule.every().day.at("09:00").do(daily_report)
schedule.every(30).minutes.do(backup_task)
schedule.every().monday.at("08:00").do(daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)
`}]},komendy:{title:`Komendy PyAutoGUI`,groups:[{name:`Instalacja i setup`,icon:`📦`,commands:[{desc:`Zainstaluj PyAutoGUI`,code:`pip install pyautogui`},{desc:`Pełny zestaw automatyzacji GUI`,code:`pip install pyautogui pyperclip opencv-python pytesseract`},{desc:`Dodatkowe dla Linux (wymagane)`,code:`sudo apt-get install scrot python3-tk python3-dev python3-xlib`},{desc:`Dodatkowe dla Mac (wymagane)`,code:`pip install pyobjc-framework-Quartz pyobjc-core pyobjc`},{desc:`Sprawdź czy działa poprawnie`,code:`python -c "import pyautogui; print(pyautogui.size())"`},{desc:`Interaktywny debugger pozycji myszy`,code:`pip install mouseinfo && python -m mouseinfo`}]},{name:`Diagnostyka i pozycja myszy`,icon:`🖱️`,commands:[{desc:`Śledź pozycję myszy co 1 sekundę`,code:`python -c "
import pyautogui, time
for _ in range(10):
    print(pyautogui.position())
    time.sleep(1)
"
`},{desc:`Pokaż rozdzielczość ekranu`,code:`python -c "import pyautogui; print(pyautogui.size())"`},{desc:`Kolor piksela na ekranie`,code:`python -c "import pyautogui; print(pyautogui.pixel(500, 300))"`},{desc:`Interaktywny debugger (mouseinfo)`,code:`python -m mouseinfo`}]},{name:`Screenshoty i obrazki`,icon:`📸`,commands:[{desc:`Screenshot całego ekranu`,code:`python -c "import pyautogui; pyautogui.screenshot('screen.png')"`},{desc:`Screenshot fragmentu ekranu`,code:`python -c "
import pyautogui
img = pyautogui.screenshot(region=(0,0,800,600))
img.save('fragment.png')
"
`},{desc:`Sprawdź czy obrazek jest na ekranie`,code:`python -c "import pyautogui; print(pyautogui.locateOnScreen('button.png', confidence=0.9))"`}]},{name:`Szybkie testy`,icon:`⚡`,commands:[{desc:`Pokaż pulpit (Win+D)`,code:`python -c "import pyautogui; pyautogui.hotkey('win', 'd')"`},{desc:`Wpisz tekst w aktywnym polu`,code:`python -c "import pyautogui; pyautogui.typewrite('hello', interval=0.05)"`},{desc:`Przesuń mysz do środka ekranu`,code:`python -c "
import pyautogui
w,h = pyautogui.size()
pyautogui.moveTo(w//2, h//2, duration=0.5)
"
`},{desc:`Kliknij w podanej pozycji`,code:`python -c "import pyautogui; pyautogui.click(500, 300)"`},{desc:`Zrób screenshot i znajdź element`,code:`python -c "import pyautogui; print(pyautogui.locateOnScreen('icon.png'))"`}]},{name:`Skrypty pomocnicze`,icon:`🛠️`,commands:[{desc:`Znajdź współrzędne klikając na element`,code:`python -c "
import pyautogui, time
print('Przesuń mysz na element w ciągu 5 sekund...')
time.sleep(5)
print(f'Pozycja: {pyautogui.position()}')
"
`},{desc:`Zrób screenshot przycisku do locateOnScreen`,code:`python -c "
import pyautogui, time
print('Zaznacz element myszą — screenshot za 3s')
time.sleep(3)
x, y = pyautogui.position()
img = pyautogui.screenshot(region=(x-50, y-20, 100, 40))
img.save('element.png')
print('Zapisano element.png')
"
`},{desc:`Lista wszystkich klawiszy specjalnych`,code:`python -c "import pyautogui; print(pyautogui.KEYBOARD_KEYS)"`}]}]}}},Tn={routing:{title:`Zasoby (Resources)`,items:[{name:`Statyczne zasoby`,desc:`Dane dostępne do odczytu przez model — dokumenty, konfiguracje.`,code:`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ResourceServer")

# Statyczny zasób — zawsze ta sama treść
@mcp.resource("config://app")
def get_app_config() -> str:
    """Konfiguracja aplikacji."""
    return """
    APP_NAME=MyApp
    VERSION=1.0.0
    ENVIRONMENT=production
    MAX_CONNECTIONS=100
    """

# Zasób z pliku
@mcp.resource("docs://readme")
def get_readme() -> str:
    """README projektu."""
    with open("README.md", "r") as f:
        return f.read()

# Zasób binarny (np. obrazek)
@mcp.resource("image://logo", mime_type="image/png")
def get_logo() -> bytes:
    with open("logo.png", "rb") as f:
        return f.read()`},{name:`Dynamiczne zasoby (Resource Templates)`,desc:`Zasoby parametryczne — URI z zmiennymi.`,code:`from mcp.server.fastmcp import FastMCP
import json

mcp = FastMCP("DynamicResources")

# Template — {user_id} w URI jest parametrem
@mcp.resource("user://{user_id}/profile")
def get_user_profile(user_id: str) -> str:
    """Profil użytkownika. URI: user://123/profile"""
    # Symulacja bazy danych
    profiles = {
        "1": {"name": "Anna", "role": "admin"},
        "2": {"name": "Bartek", "role": "user"},
    }
    profile = profiles.get(user_id)
    if not profile:
        return f"Użytkownik {user_id} nie istnieje"
    return json.dumps(profile, ensure_ascii=False)

@mcp.resource("db://{table}/schema")
def get_table_schema(table: str) -> str:
    """Schema tabeli. URI: db://users/schema"""
    import sqlite3
    conn = sqlite3.connect("app.db")
    cursor = conn.execute(f"PRAGMA table_info({table})")
    cols = [f"{r[1]} {r[2]}" for r in cursor.fetchall()]
    conn.close()
    return "\\n".join(cols)`}]},state:{title:`Klienci MCP i integracje`,items:[{name:`Claude Desktop — konfiguracja`,desc:`Podłącz serwer MCP do Claude Desktop.`,code:`// Plik: ~/Library/Application Support/Claude/claude_desktop_config.json
// (Mac) lub %APPDATA%/Claude/claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "moj-serwer": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {
        "DATABASE_URL": "sqlite:///mydb.sqlite"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    }
  }
}`},{name:`Claude Code — konfiguracja`,desc:`Użyj serwera MCP bezpośrednio w Claude Code CLI.`,code:`# Dodaj serwer do Claude Code
claude mcp add moj-serwer python /path/to/server.py

# Sprawdź serwery
claude mcp list

# Usuń serwer
claude mcp remove moj-serwer

# Dodaj z zmiennymi środowiskowymi
claude mcp add db-server \\
  --env DATABASE_URL=sqlite:///app.db \\
  python server.py

# Uruchom sesję z określonym serwerem
claude --mcp-server moj-serwer`},{name:`Klient programistyczny (Python)`,desc:`Połącz się z serwerem MCP z kodu Pythona.`,code:`import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    # Parametry uruchamiania serwera
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"],
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Inicjalizacja połączenia
            await session.initialize()

            # Listuj dostępne narzędzia
            tools = await session.list_tools()
            print("Narzędzia:", [t.name for t in tools.tools])

            # Wywołaj narzędzie
            result = await session.call_tool(
                "dodaj",
                arguments={"a": 5, "b": 3}
            )
            print("Wynik:", result.content[0].text)  # "8"

            # Listuj zasoby
            resources = await session.list_resources()
            print("Zasoby:", [r.uri for r in resources.resources])

asyncio.run(main())`}]}},En={rywale:[{name:`LangChain Tools`,icon:`🔗`,color:`#1c3c3c`,tagline:`Framework do budowania agentów LLM`,pros:[`Ogromny ekosystem gotowych narzędzi`,`Działało zanim MCP istniało`,`Integracja z wieloma LLM (OpenAI, Anthropic, Gemini)`,`Chain i Agent abstrakcje`],cons:[`Vendor lock-in — narzędzia działają tylko w LangChain`,`Skomplikowane API`,`Częste breaking changes`,`Brak standaryzacji między modelami`],vsReact:`LangChain Tools = narzędzia tylko dla LangChain. MCP = otwarty standard działający z każdym klientem. Jeśli budujesz tylko dla jednego LLM i używasz LangChain — ich tools są OK. MCP dla interoperacyjności.`,bestFor:`Projekty już oparte na LangChain, złożone chain/agent workflows`},{name:`OpenAI Function Calling`,icon:`✦`,color:`#10a37f`,tagline:`Natywne wywołanie funkcji w GPT-4`,pros:[`Wbudowane w OpenAI API`,`Dojrzałe, stabilne`,`Structured outputs`,`Dobra dokumentacja`],cons:[`Tylko OpenAI — zero przenośności`,`Każdy model wymaga osobnej integracji`,`Brak Resources i Prompts`,`Nie lokalnie`],vsReact:`Function Calling to API feature OpenAI — działasz tylko z GPT. MCP to standard — ten sam serwer działa z Claude, GPT (przez adaptery), Gemini. Budujesz serwer raz, podłączasz wszędzie.`,bestFor:`Projekty exclusively na OpenAI, gdy interoperacyjność nie jest potrzebna`},{name:`LlamaIndex Tools`,icon:`🦙`,color:`#FF6B35`,tagline:`Framework RAG i agenci`,pros:[`Świetny do RAG (wyszukiwanie dokumentów)`,`QueryEngine jako narzędzie`,`Wiele integracji data sources`,`Aktywny development`],cons:[`Vendor lock-in podobnie jak LangChain`,`Złożona konfiguracja`,`Głównie dla RAG use-case`,`Nie interoperacyjny`],vsReact:`LlamaIndex świetny gdy budujesz RAG-based chatbota nad dokumentami. MCP lepszy gdy chcesz agenta który wykonuje akcje i działa z wieloma modelami.`,bestFor:`Chatboty nad dokumentami, Q&A systems, RAG pipelines`},{name:`AutoGen / AgentOS`,icon:`🤖`,color:`#0078D4`,tagline:`Framework multi-agent od Microsoft`,pros:[`Multi-agent conversations`,`Kod wykonuje się automatycznie`,`Open source`,`Dobry do complex workflows`],cons:[`Skomplikowana architektura`,`Wymaga dużo konfiguracji`,`Narzędzia nie przenośne`,`Steep learning curve`],vsReact:`AutoGen dla skomplikowanych workflow z wieloma agentami rozmawiającymi ze sobą. MCP jest prostszy i skupiony na dostarczaniu narzędzi/kontekstu do modelu.`,bestFor:`Złożone pipelines wieloagentowe, kod auto-wykonujący się`}],pluginy:[{name:`@modelcontextprotocol/server-filesystem`,icon:`📁`,color:`#4CAF50`,tagline:`Gotowy serwer dostępu do plików`,install:`npx -y @modelcontextprotocol/server-filesystem /path/to/dir`,use:`Oficjalny serwer MCP do dostępu do systemu plików. Wystawia narzędzia: read_file, write_file, list_directory, create_directory, move_file, search_files. Skonfiguruj w claude_desktop_config.json.`,example:`// claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects"
      ]
    }
  }
}`},{name:`@modelcontextprotocol/server-github`,icon:`🐱`,color:`#333333`,tagline:`Dostęp do GitHub — issues, PR, kod`,install:`npx -y @modelcontextprotocol/server-github`,use:`Oficjalny serwer GitHub MCP. Narzędzia: create_issue, create_pull_request, search_repositories, get_file_contents, push_files i więcej. Wymaga GitHub Personal Access Token.`,example:`// claude_desktop_config.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_twój_token"
      }
    }
  }
}`},{name:`mcp-server-sqlite`,icon:`🗄️`,color:`#003B57`,tagline:`Dostęp do bazy SQLite przez MCP`,install:`pip install mcp-server-sqlite`,use:`Wystawia narzędzia do pracy z bazą SQLite: read_query, write_query, create_table, list_tables, describe_table. Bezpieczny odczyt z trybem tylko do odczytu.`,example:`// claude_desktop_config.json
{
  "mcpServers": {
    "sqlite": {
      "command": "python",
      "args": ["-m", "mcp_server_sqlite", "--db-path", "app.db"]
    }
  }
}`},{name:`mcp-server-postgres`,icon:`🐘`,color:`#336791`,tagline:`Dostęp do PostgreSQL przez MCP`,install:`npx -y @modelcontextprotocol/server-postgres`,use:`Połącz Claude z bazą PostgreSQL. Narzędzia do wykonywania zapytań i eksploracji schematu. Wymaga connection string.`,example:`// claude_desktop_config.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://user:pass@localhost/mydb"]
    }
  }
}`},{name:`FastMCP`,icon:`⚡`,color:`#a78bfa`,tagline:`Pythonowy framework — szybkie serwery MCP`,install:`pip install mcp`,use:`FastMCP (wbudowany w SDK Anthropic) to wysokopoziomowy interfejs do tworzenia serwerów MCP. Dekoratory @mcp.tool(), @mcp.resource(), @mcp.prompt() zamiast ręcznego protokołu. Zalecany dla większości projektów.`,example:`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("MójSerwer")

@mcp.tool()
def hello(name: str) -> str:
    """Przywitaj użytkownika."""
    return f"Cześć, {name}!"

if __name__ == "__main__":
    mcp.run()`},{name:`mcp-use (LangChain adapter)`,icon:`🔗`,color:`#1c3c3c`,tagline:`Użyj serwerów MCP w LangChain`,install:`pip install mcp-use`,use:`Adapter który pozwala używać dowolnego serwera MCP jako narzędzia w LangChain agents. Mostek między ekosystemem MCP a LangChain.`,example:`from mcp_use import MCPAgent, MCPClient
from langchain_anthropic import ChatAnthropic

client = MCPClient.from_config_file("claude_desktop_config.json")
llm = ChatAnthropic(model="claude-opus-4-5")
agent = MCPAgent(llm=llm, client=client, max_steps=15)

result = await agent.run("Jakie pliki są w folderze projects?")`}]},Dn=[{category:`Instalacja i setup`,icon:`📦`,items:[{cmd:`pip install mcp`,desc:`Zainstaluj Python SDK dla MCP`,detail:{what:`Instaluje oficjalne Anthropic SDK dla MCP. Zawiera FastMCP (high-level API), klienta i serwer low-level.`,how:`pip pobiera pakiet mcp z PyPI.`,tips:[`pip install "mcp[cli]" — z narzędziami CLI`,`pip install mcp httpx — dodaj httpx dla HTTP requests w serwerze`,`Wymaga Python 3.10+`]}},{cmd:`pip install "mcp[cli]"`,desc:`MCP z narzędziami CLI (mcp dev, mcp run)`,detail:{what:`Instaluje MCP z dodatkowymi narzędziami deweloperskimi: mcp dev (interaktywny tester), mcp run (uruchamianie serwerów).`,how:`Extras [cli] dodają zależności dla narzędzi wiersza poleceń.`,tips:[`mcp dev server.py — uruchom serwer z MCP Inspector`,`mcp run server.py — uruchom serwer bez Inspectora`,`Zalecane podczas developmentu`]}},{cmd:`pip install "mcp[cli]" httpx python-dotenv`,desc:`Pełny stack MCP + HTTP + env vars`,detail:{what:`Instaluje wszystko potrzebne do typowego serwera MCP: SDK z CLI, httpx do zewnętrznych API, dotenv do konfiguracji.`,how:`Większość serwerów MCP woła zewnętrzne API — httpx i dotenv są standardem.`,tips:[`pip install fastmcp — uproszczony framework MCP (alternatywa)`,`pip show mcp — sprawdź zainstalowaną wersję`,`Utwórz venv dla każdego serwera MCP — izoluj zależności`]}}]},{category:`Rozwój i testowanie`,icon:`🛠️`,items:[{cmd:`mcp dev server.py`,desc:`Uruchom serwer z MCP Inspector (UI debugger)`,detail:{what:`Uruchamia serwer i otwiera MCP Inspector w przeglądarce — graficzny interfejs do testowania narzędzi, zasobów i promptów.`,how:`MCP Inspector to webowy klient który łączy się z Twoim serwerem. Możesz ręcznie wywoływać narzędzia i sprawdzać odpowiedzi.`,tips:[`Otwiera się na http://localhost:5173`,`Zakładka Tools — testuj każde narzędzie osobno`,`Zakładka Resources — przeglądaj dostępne zasoby`,`Niezbędne podczas developmentu`]}},{cmd:`mcp dev server.py --with httpx --with pandas`,desc:`Uruchom serwer z dodatkowymi zależnościami`,detail:{what:`Instaluje dodatkowe pakiety (httpx, pandas) przed uruchomieniem serwera w środowisku deweloperskim.`,how:`Flaga --with <package> dodaje zależności do tymczasowego środowiska.`,tips:[`Przydatne gdy serwer używa zewnętrznych bibliotek`,`Alternatywa: pip install httpx pandas w tym samym venv`]}},{cmd:`mcp run server.py`,desc:`Uruchom serwer MCP (bez Inspectora)`,detail:{what:`Uruchamia serwer jako proces stdio — tak jak Claude Desktop go uruchamia. Użyj do testowania bez graficznego Inspectora.`,how:`Serwer czeka na połączenie przez stdin/stdout. Ctrl+C aby zatrzymać.`,tips:[`Użyj gdy chcesz przetestować serwer bez IDE`,`Loguj do stderr (nie stdout) — stdout jest zajęty przez protokół MCP`]}}]},{category:`Claude Code — zarządzanie serwerami`,icon:`🤖`,items:[{cmd:`claude mcp add nazwa python /path/to/server.py`,desc:`Dodaj serwer MCP do Claude Code`,detail:{what:`Rejestruje serwer MCP w Claude Code. Nazwa to identyfikator z którym będziesz się odwoływać do serwera.`,how:`Zapisuje konfigurację w ~/.claude/settings.json. Serwer jest dostępny w następnej sesji.`,tips:[`claude mcp add --scope global — dostępny we wszystkich projektach`,`claude mcp add --scope local — tylko w bieżącym projekcie (.claude/settings.json)`,`claude mcp add -e VAR=value — przekaż zmienną środowiskową`]}},{cmd:`claude mcp list`,desc:`Pokaż skonfigurowane serwery MCP`,detail:{what:`Wyświetla listę wszystkich zarejestrowanych serwerów MCP dla bieżącego projektu i globalnych.`,how:`Czyta konfigurację z ~/.claude/settings.json i .claude/settings.json.`,tips:[`Sprawdź tę komendę gdy serwer nie odpowiada`,`claude mcp get nazwa — szczegóły konkretnego serwera`]}},{cmd:`claude mcp remove nazwa`,desc:`Usuń serwer MCP`,detail:{what:`Usuwa rejestrację serwera MCP z konfiguracji Claude Code.`,how:`Usuwa wpis z ~/.claude/settings.json lub .claude/settings.json.`,tips:[`Nie usuwa pliku serwera — tylko konfigurację`,`Przydatne przy przebudowie serwera lub zmianie ścieżki`]}},{cmd:`claude mcp add nazwa python /path/to/server.py -e API_KEY=abc`,desc:`Dodaj serwer MCP z zmienną środowiskową`,detail:{what:`Rejestruje serwer z przekazanymi env vars. Serwer otrzyma API_KEY w środowisku — bezpiecznie, bez hardkodowania w kodzie.`,how:`-e VAR=value można powtórzyć wielokrotnie dla wielu zmiennych.`,tips:[`claude mcp add --scope global — dostępny we wszystkich projektach`,`claude mcp add --scope local — tylko bieżący projekt (.claude/settings.json)`,`Wartości env vars są przechowywane w konfiguracji — nie w kodzie serwera`]}},{cmd:`claude mcp get nazwa`,desc:`Pokaż szczegóły konkretnego serwera MCP`,detail:{what:`Wyświetla konfigurację: komendę, argumenty, zmienne środowiskowe, scope dla danego serwera.`,how:`Przydatne gdy serwer nie działa — sprawdź czy ścieżka i konfiguracja są prawidłowe.`,tips:[`claude mcp list — lista wszystkich serwerów`,`Sprawdź czy ścieżka do server.py istnieje: ls -la /path/to/server.py`]}}]},{category:`Diagnoza i debugowanie`,icon:`🐛`,items:[{cmd:`python server.py 2>debug.log`,desc:`Uruchom serwer i zapisz logi do pliku`,detail:{what:`Przekierowuje stderr (logi) do pliku debug.log. Protokół MCP działa na stdout — logi muszą iść na stderr.`,how:`2> przekierowuje file descriptor 2 (stderr) do pliku.`,tips:[`print(..., file=sys.stderr) — loguj do stderr`,`import logging; logging.basicConfig(stream=sys.stderr) — standardowy logging`,`tail -f debug.log — śledź logi na bieżąco (Linux/Mac)`]}},{cmd:`python -c "from mcp.server.fastmcp import FastMCP; print('MCP OK')"`,desc:`Sprawdź czy MCP jest zainstalowany`,detail:{what:`Szybki test importu. Jeśli wyświetla "MCP OK" — pakiet jest zainstalowany.`,how:`Importuje FastMCP — główną klasę SDK.`,tips:[`Jeśli błąd ModuleNotFoundError: pip install mcp`,`Sprawdź aktywny venv: which python`]}},{cmd:`tail -f debug.log`,desc:`Śledź logi serwera na żywo`,detail:{what:`Wyświetla nowe linie debug.log w czasie rzeczywistym. Uruchom w osobnym terminalu gdy testujesz serwer.`,how:`Wymaga że serwer loguje do debug.log: python server.py 2>debug.log`,tips:[`tail -n 50 -f debug.log — ostatnie 50 linii + live`,`grep "ERROR" debug.log — filtruj błędy`,`Ctrl+C aby zatrzymać śledzenie`]}},{cmd:`python -c "import mcp; print(mcp.__version__)"`,desc:`Sprawdź wersję MCP SDK`,detail:{what:`Wyświetla zainstalowaną wersję pakietu mcp. Ważne — API zmienia się między wersjami.`,how:`pip show mcp — więcej informacji (lokalizacja, zależności).`,tips:[`pip install --upgrade mcp — zaktualizuj do najnowszej`,`Sprawdź changelog na github.com/modelcontextprotocol/python-sdk`]}}]},{category:`Środowisko i konfiguracja`,icon:`⚙️`,items:[{cmd:`export ANTHROPIC_API_KEY="sk-ant-..."`,desc:`Ustaw API key dla serwera korzystającego z Claude`,detail:{what:`Zmienna środowiskowa dostępna dla serwera MCP. Claude Code przekazuje env vars zdefiniowane przy claude mcp add -e.`,how:`Windows: set ANTHROPIC_API_KEY=sk-ant-... Lub użyj .env + python-dotenv w serwerze.`,tips:[`Nie hardkoduj kluczy w kodzie serwera — ładuj z os.environ`,`from dotenv import load_dotenv; load_dotenv() — wczytaj z .env`,`claude mcp add nazwa python server.py -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY`]}},{cmd:`cat ~/.claude/settings.json | python3 -m json.tool`,desc:`Podejrzyj konfigurację Claude Code (sformatowaną)`,detail:{what:`Pokazuje cały plik konfiguracyjny Claude Code z formatowaniem JSON. Tu są zapisane serwery MCP, permissions, hooks.`,how:`Lokalizacja lokalna: .claude/settings.json w bieżącym projekcie.`,tips:[`Sprawdź sekcję "mcpServers" — tam są Twoje serwery`,`Możesz edytować ręcznie jeśli claude mcp add nie ma potrzebnych opcji`,`Backup przed ręczną edycją: cp ~/.claude/settings.json ~/.claude/settings.json.bak`]}},{cmd:`mcp dev server.py --transport sse`,desc:`Uruchom serwer z transportem SSE (HTTP)`,detail:{what:`SSE (Server-Sent Events) transport zamiast domyślnego stdio. Serwer nasłuchuje na HTTP — może obsługiwać wielu klientów.`,how:`Domyślny transport to stdio (jeden klient). SSE dla integracji webowych.`,tips:[`stdio = jeden klient (Claude Code), SSE = wielu klientów przez HTTP`,`mcp run server.py --transport sse --port 8080`,`Użyj SSE gdy chcesz serwer dostępny przez sieć`]}}]}],On={meta:{id:`mcp`,name:`MCP`,icon:`🔌`,color:`#a78bfa`,color2:`#7c3aed`,tagline:`Model Context Protocol — podłącz AI do każdego narzędzia`,year:2024,author:`Anthropic`,lang:`Python / TypeScript`,github:`modelcontextprotocol/python-sdk`,stars:`7k+`,codeLang:`Python`},tabs:[{id:`podstawy`,label:`Podstawy`},{id:`komponenty`,label:`Serwery`},{id:`hooki`,label:`Narzędzia`},{id:`routing`,label:`Zasoby`},{id:`state`,label:`Klienci`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`Ekosystem`},{id:`komendy`,label:`Komendy`}],content:{podstawy:{labels:{concepts:`Kluczowe koncepcje`,whenToUse:`Kiedy używać MCP?`,firstComponent:`Minimalny serwer MCP`,firstComponentLang:`Python`},intro:{title:`Czym jest MCP?`,desc:`Model Context Protocol (MCP) to otwarty standard od Anthropic który pozwala modelom AI (Claude, GPT, Gemini) łączyć się z zewnętrznymi narzędziami, bazami danych i usługami. Zamiast hardkodować każdą integrację — tworzysz serwer MCP który wystawia narzędzia i zasoby. Klient (np. Claude Desktop) łączy się i może ich używać. USB-C dla AI — jeden standard, wszystkie narzędzia.`},concepts:[{title:`Architektura Host–Client–Server`,desc:`Host (np. Claude Desktop) uruchamia Klientów. Każdy Klient łączy się z jednym Serwerem MCP. Serwer wystawia Narzędzia, Zasoby i Prompty. Model AI pyta hosta o dostępne narzędzia i może je wywoływać.`,icon:`🏗️`},{title:`Tools (Narzędzia)`,desc:`Funkcje które model może wywołać — jak function calling w OpenAI. Przykłady: search_database(), create_file(), send_email(). Model sam decyduje kiedy użyć narzędzia na podstawie opisu.`,icon:`🔧`},{title:`Resources (Zasoby)`,desc:`Dane które serwer udostępnia do odczytu — pliki, wyniki zapytań, dokumenty. URI-based: file:///path, database://query. Model może poprosić o zasób żeby uzyskać kontekst.`,icon:`📦`},{title:`Transport: stdio vs HTTP`,desc:`stdio — serwer uruchamiany jako subprocess, komunikacja przez stdin/stdout. Prosty, lokalny. HTTP/SSE — serwer jako usługa sieciowa, wiele klientów. Claude Desktop używa stdio.`,icon:`🚀`}],whenToUse:[`Podłącz Claude do własnej bazy danych — niech pisze SQL i czyta wyniki`,`Daj AI dostęp do lokalnych plików i projektów (lepiej niż kopiowanie do chatu)`,`Integracja z zewnętrznymi API (GitHub, Jira, Slack) bez pisania integracji per-model`,`Własne narzędzia developerskie dostępne w Claude Code / Claude Desktop`,`Agenci AI którzy wykonują akcje w systemie (tworzą pliki, uruchamiają skrypty)`,`Standaryzacja: jeden serwer MCP działa z każdym klientem (Claude, GPT, Gemini)`],firstComponent:`# pip install mcp
from mcp.server.fastmcp import FastMCP

# Utwórz serwer
mcp = FastMCP("Mój Serwer")

# Zdefiniuj narzędzie — model może je wywołać
@mcp.tool()
def dodaj(a: int, b: int) -> int:
    """Dodaj dwie liczby."""
    return a + b

@mcp.tool()
def powitaj(imie: str) -> str:
    """Przywitaj użytkownika po imieniu."""
    return f"Cześć, {imie}!"

# Uruchom serwer (stdio — dla Claude Desktop)
if __name__ == "__main__":
    mcp.run()`},komponenty:{title:`Tworzenie serwerów MCP`,items:[{name:`FastMCP — szybki start`,desc:`Wysokopoziomowe API — dekoratory zamiast boilerplate.`,code:`from mcp.server.fastmcp import FastMCP
import httpx

mcp = FastMCP("WeatherServer")

@mcp.tool()
async def get_weather(city: str) -> str:
    """Pobierz aktualną pogodę dla miasta."""
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://wttr.in/{city}?format=3"
        )
        return r.text

@mcp.tool()
def convert_temp(celsius: float) -> dict:
    """Konwertuj temperaturę z Celsius na Fahrenheit i Kelvin."""
    return {
        "celsius": celsius,
        "fahrenheit": round(celsius * 9/5 + 32, 1),
        "kelvin": round(celsius + 273.15, 2)
    }

if __name__ == "__main__":
    mcp.run()`},{name:`Serwer z bazą danych`,desc:`Daj modelowi dostęp do SQLite przez MCP.`,code:`from mcp.server.fastmcp import FastMCP
import sqlite3
from typing import Any

mcp = FastMCP("DatabaseServer")
DB_PATH = "myapp.db"

@mcp.tool()
def query_db(sql: str) -> list[dict[str, Any]]:
    """Wykonaj SELECT na bazie danych. Tylko odczyt!"""
    # Bezpieczeństwo: tylko SELECT
    if not sql.strip().upper().startswith("SELECT"):
        raise ValueError("Dozwolone tylko zapytania SELECT")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.execute(sql)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

@mcp.tool()
def list_tables() -> list[str]:
    """Lista wszystkich tabel w bazie danych."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return tables

@mcp.tool()
def describe_table(table_name: str) -> list[dict]:
    """Pokaż strukturę tabeli (kolumny i typy)."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(f"PRAGMA table_info({table_name})")
    columns = [dict(zip(
        ["id","name","type","notnull","default","pk"],
        row
    )) for row in cursor.fetchall()]
    conn.close()
    return columns

if __name__ == "__main__":
    mcp.run()`},{name:`Serwer z plikami`,desc:`Dostęp do systemu plików przez MCP.`,code:`from mcp.server.fastmcp import FastMCP
from pathlib import Path

mcp = FastMCP("FileServer")
BASE_DIR = Path("/home/user/projects")  # Ogranicz dostęp

def safe_path(relative: str) -> Path:
    """Sprawdź czy ścieżka jest w dozwolonym folderze."""
    path = (BASE_DIR / relative).resolve()
    if not str(path).startswith(str(BASE_DIR)):
        raise ValueError("Dostęp poza dozwolonym folderem!")
    return path

@mcp.tool()
def read_file(path: str) -> str:
    """Odczytaj zawartość pliku tekstowego."""
    return safe_path(path).read_text(encoding="utf-8")

@mcp.tool()
def write_file(path: str, content: str) -> str:
    """Zapisz zawartość do pliku."""
    p = safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Zapisano: {p}"

@mcp.tool()
def list_files(directory: str = ".") -> list[str]:
    """Lista plików w katalogu."""
    p = safe_path(directory)
    return [str(f.relative_to(BASE_DIR)) for f in p.iterdir()]

if __name__ == "__main__":
    mcp.run()`}]},hooki:{title:`Definiowanie narzędzi (Tools)`,items:[{name:`Typy parametrów i walidacja`,desc:`MCP automatycznie generuje schema JSON z type hints.`,code:`from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum

mcp = FastMCP("TypedServer")

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskInput(BaseModel):
    title: str = Field(description="Tytuł zadania")
    priority: Priority = Field(default=Priority.MEDIUM)
    tags: list[str] = Field(default_factory=list)
    due_days: Optional[int] = Field(None, ge=0, le=365)

@mcp.tool()
def create_task(task: TaskInput) -> dict:
    """Utwórz nowe zadanie z walidacją Pydantic."""
    return {
        "id": 42,
        "title": task.title,
        "priority": task.priority.value,
        "tags": task.tags,
        "due_in_days": task.due_days
    }

@mcp.tool()
def search(
    query: str,
    limit: int = Field(default=10, ge=1, le=100),
    category: Literal["docs", "code", "issues"] = "docs"
) -> list[str]:
    """Wyszukaj z ograniczeniami na parametry."""
    return [f"Wynik {i}: {query} ({category})" for i in range(limit)]`},{name:`Narzędzia asynchroniczne`,desc:`Async tools dla operacji I/O (HTTP, baza, pliki).`,code:`from mcp.server.fastmcp import FastMCP
import httpx
import asyncio

mcp = FastMCP("AsyncServer")

@mcp.tool()
async def fetch_url(url: str) -> str:
    """Pobierz zawartość URL."""
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.text[:5000]  # Ogranicz rozmiar

@mcp.tool()
async def fetch_multiple(urls: list[str]) -> dict[str, str]:
    """Pobierz kilka URLi równolegle."""
    async with httpx.AsyncClient(timeout=10) as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks, return_exceptions=True)

    results = {}
    for url, resp in zip(urls, responses):
        if isinstance(resp, Exception):
            results[url] = f"Błąd: {resp}"
        else:
            results[url] = resp.text[:1000]
    return results

if __name__ == "__main__":
    mcp.run()`},{name:`Obsługa błędów w narzędziach`,desc:`Jak poprawnie zgłaszać błędy modelowi.`,code:`from mcp.server.fastmcp import FastMCP
from mcp import McpError
from mcp.types import ErrorCode

mcp = FastMCP("ErrorHandlingServer")

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Podziel a przez b."""
    if b == 0:
        # McpError — model zobaczy czytelny błąd
        raise McpError(
            ErrorCode.INVALID_PARAMS,
            "Nie można dzielić przez zero"
        )
    return a / b

@mcp.tool()
def get_user(user_id: int) -> dict:
    """Pobierz użytkownika z bazy."""
    users = {1: {"name": "Anna"}, 2: {"name": "Bartek"}}
    user = users.get(user_id)
    if not user:
        raise McpError(
            ErrorCode.INVALID_PARAMS,
            f"Użytkownik {user_id} nie istnieje. "
            f"Dostępni: {list(users.keys())}"
        )
    return user`}]},...Tn,...En,komendy:Dn}},kn={id:`aws`,name:`AWS`,icon:`☁️`,color:`#FF9900`,color2:`#FF6B35`,tagline:`Amazon Web Services — największa platforma cloud na świecie (33%+ rynku)`,year:2006,author:`Amazon.com / Andy Jassy`,lang:`Multi-cloud`,github:`aws`,stars:`200+ serwisów`,codeLang:`bash`,tabs:[{id:`podstawy`,label:`Podstawy AWS`},{id:`komponenty`,label:`Compute`},{id:`hooki`,label:`Storage & DB`},{id:`routing`,label:`Networking`},{id:`state`,label:`Security & DevOps`},{id:`rywale`,label:`Rywale`},{id:`pluginy`,label:`AI & Big Data`},{id:`komendy`,label:`AWS CLI`}]},An={meta:kn,tabs:kn.tabs,content:{podstawy:{labels:{concepts:`Kluczowe koncepcje AWS`,whenToUse:`Kiedy wybrać AWS?`,firstComponent:`Pierwsze kroki — konfiguracja CLI i pierwsze zasoby`,firstComponentLang:`bash`},intro:{title:`Czym jest Amazon Web Services?`,desc:`AWS to największa platforma chmurowa na świecie — 33%+ rynku. Uruchomiona w 2006 przez Amazon,
dziś oferuje ponad 200 serwisów: compute, storage, bazy danych, AI/ML, IoT, blockchain, satelity.
Klienci to Netflix, NASA, Airbnb, Samsung, banki i tysiące startupów. Model pay-as-you-go: płacisz
za sekundy użycia maszyny, za gigabajty danych, za wywołania funkcji — zero kosztów stałych.
AWS ma 30+ regionów geograficznych i 450+ edge locations CDN. Znajomość AWS to jeden z najlepiej
płatnych skillów technicznych na rynku pracy.
`},concepts:[{title:`Regiony i Availability Zones`,icon:`🌍`,desc:`Region = geograficzna lokalizacja (eu-west-1 = Irlandia, eu-central-1 = Frankfurt, us-east-1 = Wirginia).
Każdy region ma 3-6 AZ (Availability Zones) = fizycznie oddzielne data centers w tej samej lokalizacji.
Deploy na 2+ AZ = odporność na awarię jednego DC. Dane nie opuszczają regionu bez Twojej zgody — ważne dla GDPR.
`},{title:`IAM — Tożsamość i Dostęp`,icon:`🔐`,desc:`Identity and Access Management to fundament bezpieczeństwa AWS. Użytkownicy, Grupy, Role, Polityki.
Zasada: Principle of Least Privilege — dawaj MINIMUM uprawnień. Root account: tylko do konfiguracji konta,
nigdy do codziennej pracy. Role IAM > Access Keys dla serwisów.
`},{title:`Model Odpowiedzialności (Shared Responsibility)`,icon:`🤝`,desc:`AWS odpowiada za bezpieczeństwo CHMURY (fizyczne DC, sprzęt, sieć, hypervisor).
Ty odpowiadasz za bezpieczeństwo W CHMURZE (OS patching, konfiguracja security groups,
szyfrowanie danych, zarządzanie uprawnieniami IAM, backup).
`},{title:`ARN — Amazon Resource Name`,icon:`🏷️`,desc:`Unikalny identyfikator każdego zasobu AWS:
arn:aws:s3:::moj-bucket lub arn:aws:lambda:eu-west-1:123456789:function:moja-funkcja.
Zawiera: partition, service, region, account-id, resource.
Używany w politykach IAM do precyzyjnego wskazania zasobu.
`},{title:`Free Tier — 12 miesięcy bezpłatnie`,icon:`🆓`,desc:`Nowe konto = 12 miesięcy Free Tier: 750h/mies EC2 t2.micro, 5GB S3, 1M wywołań Lambda, 25GB DynamoDB.
Część serwisów (Lambda do 1M/mies, DynamoDB 25GB) jest zawsze free.
Ustaw billing alerts — Free Tier można przekroczyć przez przypadek!
`},{title:`Pay-as-you-go + Sposoby Oszczędzania`,icon:`💰`,desc:`On-Demand: płacisz za używanie, bez zobowiązań.
Reserved Instances: płacisz z góry na 1-3 lata, 40-75% taniej.
Savings Plans: elastyczny odpowiednik RI.
Spot Instances: wolne moce obliczeniowe, 60-90% taniej, ale mogą być przerwane z 2min ostrzeżeniem.
`},{title:`Dostęp: Console, CLI, SDK, IaC`,icon:`🖥️`,desc:`AWS Console — interfejs webowy, dobry do nauki i eksploracji.
AWS CLI — terminal, skrypty, automatyzacja.
AWS SDK — Python (boto3), JavaScript, Java, Go, Ruby, .NET.
Infrastructure as Code: CloudFormation (YAML/JSON), CDK (TypeScript/Python), Terraform (multi-cloud).
Produkcja = zawsze IaC, nie console.
`},{title:`Tags — Organizacja i Kontrola Kosztów`,icon:`🏷️`,desc:`Każdy zasób można otagować: klucz=wartość (Env=prod, Team=backend, Project=checki).
Bez tagów nie wiesz które zasoby za co kosztują.
Cost Allocation Tags → Cost Explorer → "backend kosztuje $1500/mies, frontend $200".
Obowiązkowe w każdej organizacji.
`},{title:`Well-Architected Framework — 6 Filarów`,icon:`🏛️`,desc:`Framework AWS do projektowania solidnych systemów cloud. Narzędzie bezpłatne w Console.

1. Operational Excellence — automatyzacja, IaC, observability, continuous improvement
2. Security — IAM least privilege, szyfrowanie, WAF, GuardDuty, audit logs
3. Reliability — multi-AZ, auto-scaling, backup, DR, chaos engineering
4. Performance Efficiency — właściwy typ instancji, caching, CDN, database selection
5. Cost Optimization — reserved/spot, auto-scaling down, S3 lifecycle, rightsizing
6. Sustainability — energy efficiency, Graviton (ARM), serverless, shared infra
`},{title:`Migracja do AWS — 7R`,icon:`🚚`,desc:`Strategia migracji aplikacji (Gartner 7R):
• Retire — wyłącz to co niepotrzebne (20-30% zasobów)
• Retain — zostaw on-premises to co nie może być migrowane
• Relocate — VMware Cloud on AWS, VM bez refactoru
• Rehost (Lift & Shift) — EC2, szybko, zero zmian w kodzie
• Replatform (Lift & Tinker) — RDS zamiast MySQL na EC2, Fargate zamiast EC2
• Repurchase — SaaS zamiast własnego (Salesforce zamiast CRM)
• Refactor (Re-architect) — mikroserwisy, serverless, cloud-native — max korzyści, max pracy
`},{title:`Pricing Calculator & Cost Management`,icon:`💸`,desc:`• AWS Pricing Calculator — oszacuj koszty PRZED deployem
• Cost Explorer — analiza historycznych kosztów, forecastowanie, anomaly detection
• AWS Budgets — alerty gdy koszty/użycie przekraczają próg
• Cost Anomaly Detection — ML wykrywa nieoczekiwane wzrosty
• Compute Optimizer — AI rekomenduje rightsizing instancji
Zasada: koszty zawsze rosną gdy się nie patrzy. Ustaw budżet i alerty od pierwszego dnia.
`}],whenToUse:[`Startup potrzebuje skalować od 0 do milionów użytkowników bez zarządzania serwerami`,`Enterprise wymaga compliance: HIPAA, PCI-DSS, SOC 2, ISO 27001 — AWS ma certyfikacje`,`Potrzebujesz ML/AI: SageMaker, Bedrock (Claude, Llama), Rekognition, Comprehend`,`Globalna aplikacja wymagająca niskiego latency na wszystkich kontynentach`,`Big Data: przetwarzaj terabajty dziennie przez Athena, Glue, EMR, Kinesis`,`Disaster Recovery: backup w innym regionie, failover w minutach`,`Infrastruktura jako kod: reproducible environments, no snowflake servers`,`Serverless: Lambda + API Gateway + DynamoDB = zero zarządzania serwerami, płacisz za użycie`,`Potrzebujesz serwisów których nie ma nigdzie indziej: Ground Station, Quantum, Wavelength`],firstComponent:`# 1. Zainstaluj AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install
aws --version  # aws-cli/2.x

# 2. Utwórz IAM User z programmatic access (nigdy nie używaj root!)
# AWS Console → IAM → Users → Create user
# Permissions: AdministratorAccess (na początku, potem zawęź)
# Security credentials → Create access key → CLI

# 3. Skonfiguruj CLI
aws configure
# AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name: eu-west-1
# Default output format: json

# 4. Sprawdź konfigurację
aws sts get-caller-identity
# { "Account": "123456789", "UserId": "AIDAIOSFODNN7EXAMPLE" }

# 5. Pierwsze polecenia
aws s3 ls                                # lista bucketów
aws ec2 describe-regions --output table  # dostępne regiony
aws iam list-users                       # lista użytkowników IAM

# 6. Profil dla projektu (nie mieszaj kont!)
aws configure --profile checki-dev
export AWS_PROFILE=checki-dev

# 7. Zawsze ustaw billing alert!
aws budgets create-budget --account-id 123456789 \\
  --budget '{"BudgetName":"monthly","BudgetLimit":{"Amount":"20","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \\
  --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"twoj@email.com"}]}]'
`},komponenty:[{title:`EC2 — Elastic Compute Cloud (Wirtualne Maszyny)`,lang:`bash`,desc:`Serce AWS compute — wirtualne maszyny ze wszystkimi zaletami chmury. Setki typów instancji:

• t3/t4g.micro/small/medium — Burstable (tańsze, burst CPU gdy potrzeba). T4g = ARM Graviton, 20% taniej
• m7g/m6i.large/xlarge — General Purpose (backend API, microservices)
• c7g/c6i.xlarge — Compute Optimized (web serwery, HPC, encoding)
• r7g/r6i.xlarge — Memory Optimized (bazy danych in-memory, Spark)
• p3.2xlarge / g4dn.xlarge — GPU (ML training/inference, rendering)
• i3/i4i.xlarge — Storage Optimized (OLTP, Elasticsearch, Redis cluster)

Główne koncepcje:
• AMI (Amazon Machine Image) — "snapshot" systemu z OS i software
• Security Groups — stateful firewall; domyślnie blokuje wszystko
• Key Pairs — SSH dostęp. Klucz prywatny pobierasz RAZ przy tworzeniu
• Elastic IP — stały publiczny adres IP ($0.005/h gdy nie przypisany)
• Auto Scaling Group — automatycznie dodaje/usuwa instancje na podstawie metryk
• Launch Template — szablon konfiguracji instancji (AMI, typ, SG, IAM role, user-data)
`,code:`# Szybki start — Amazon Linux 2023 t3.micro
aws ec2 run-instances \\
  --image-id ami-0905a3c97561e0b69 \\
  --instance-type t3.micro \\
  --key-name moj-klucz \\
  --security-group-ids sg-xxx \\
  --subnet-id subnet-xxx \\
  --iam-instance-profile Name=EC2S3Role \\
  --user-data '#!/bin/bash
    dnf update -y && dnf install -y python3 pip
    pip3 install fastapi uvicorn
    cd /home/ec2-user/app && uvicorn main:app --host 0.0.0.0 --port 8000 &' \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=api-prod}]'

# Auto Scaling Group — horizontal scaling
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name prod-api-asg \\
  --launch-template LaunchTemplateId=lt-xxx,Version='$Latest' \\
  --min-size 2 --max-size 10 --desired-capacity 3 \\
  --target-group-arns arn:aws:elasticloadbalancing:... \\
  --health-check-type ELB \\
  --vpc-zone-identifier "subnet-1a,subnet-1b,subnet-1c"
`},{title:`AWS Lambda — Serverless Functions (FaaS)`,lang:`python`,desc:`Uruchamiaj kod bez zarządzania serwerami. Płacisz za milisekundy wykonania.

Specyfikacja:
• Języki: Python 3.12, Node.js 20, Java 21, Go, Ruby 3.2, .NET 8, custom runtime
• Pamięć: 128MB – 10240MB (CPU proporcjonalnie do RAM)
• Timeout: max 15 minut (900 sekund)
• Concurrency: 1000 jednoczesnych wywołań per region (soft limit)
• Deployment: 50MB ZIP (250MB unzip) lub do 10GB Docker image

Triggery: API Gateway, ALB, S3, SQS, SNS, EventBridge, DynamoDB Streams, Kinesis, CloudFront

Cold Start:
• Pierwsze wywołanie po "uśpieniu" = dodatkowe 100ms–2s
• Provisioned Concurrency eliminuje cold start (płacisz za utrzymanie warm)
• Snap Start (Java) — redukuje cold start przy inicjalizacji klasy

Cena: $0.20 per 1M requestów + $0.0000166667 per GB-sekunda
`,code:`import json, boto3, os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def handler(event, context):
    method  = event['requestContext']['http']['method']
    user_id = event.get('pathParameters', {}).get('userId')

    if method == 'GET' and user_id:
        response = table.get_item(Key={'userId': user_id})
        if 'Item' not in response:
            return {'statusCode': 404, 'body': json.dumps({'error': 'not found'})}
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(response['Item'])
        }
    return {'statusCode': 405, 'body': json.dumps({'error': 'method not allowed'})}

# Deploy
# zip function.zip lambda_function.py
# aws lambda update-function-code --function-name moja-funkcja --zip-file fileb://function.zip
`},{title:`Amazon ECS — Elastic Container Service`,lang:`bash`,desc:`Zarządzany orchestrator kontenerów Docker. Nie potrzebujesz Kubernetes.

Główne komponenty:
• Cluster — logiczna grupa EC2 lub Fargate zasobów
• Task Definition — "przepis": jaki image, ile CPU/RAM, env vars, secrets, volumes
• Service — utrzymuje N działających tasków, integruje z ALB, auto-healing
• Task — jeden uruchomiony kontener (lub grupa sidecar containers)

Launch Types:
• EC2 — Ty zarządzasz EC2 nodes (więcej kontroli, tańsze przy dużej skali)
• Fargate — serverless (AWS zarządza serwerami, płacisz per task CPU/RAM)

Best practices:
• TaskRole IAM — rola dla kontenera (dostęp do S3, Secrets Manager)
• ECR (Elastic Container Registry) — prywatny Docker Hub na AWS
• Blue/Green Deploy przez CodeDeploy — zero-downtime
• Container Insights — monitoring CPU/RAM per task
`,code:`# task-definition.json
{
  "family": "api-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512", "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123:role/ecsTaskRole",
  "containerDefinitions": [{
    "name": "api",
    "image": "123.dkr.ecr.eu-west-1.amazonaws.com/api:latest",
    "portMappings": [{"containerPort": 8000, "protocol": "tcp"}],
    "environment": [{"name": "ENV", "value": "prod"}],
    "secrets": [{"name": "DB_PASSWORD", "valueFrom": "arn:aws:secretsmanager:...:db-pass"}],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {"awslogs-group": "/ecs/api", "awslogs-region": "eu-west-1", "awslogs-stream-prefix": "ecs"}
    }
  }]
}

aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs create-service \\
  --cluster prod-cluster --service-name api \\
  --task-definition api-task:1 --desired-count 3 \\
  --launch-type FARGATE \\
  --load-balancers targetGroupArn=arn:...,containerName=api,containerPort=8000
`},{title:`Amazon EKS — Elastic Kubernetes Service`,lang:`bash`,desc:`Managed Kubernetes — AWS zarządza control plane (etcd, API server, scheduler).
Ty zarządzasz worker nodes lub używasz Fargate (serverless nodes).

Kiedy EKS zamiast ECS:
• Masz existing Kubernetes manifests/Helm charts
• Potrzebujesz zaawansowanych K8s features (CRDs, operators, custom schedulers)
• Multi-cloud/hybrid (ten sam YAML na EKS i GKE/on-premises)
• Twój team zna Kubernetes

Add-ons zarządzane przez AWS:
• VPC CNI — networking (każdy pod dostaje IP z VPC subnet)
• CoreDNS — service discovery
• kube-proxy — network rules
• EBS CSI Driver — persistent volumes
• ALB Controller — automatyczne ALB z Ingress

Cena: $0.10/h per cluster (control plane) + worker nodes (EC2 lub Fargate)
`,code:`# Utwórz klaster EKS
eksctl create cluster \\
  --name prod-cluster \\
  --region eu-west-1 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3 --nodes-min 1 --nodes-max 10 \\
  --managed

# Skonfiguruj kubectl
aws eks update-kubeconfig --name prod-cluster --region eu-west-1

# Deploy aplikacji
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Fargate profile (serverless nodes)
eksctl create fargateprofile \\
  --cluster prod-cluster \\
  --name api-profile \\
  --namespace production

# Horizontal Pod Autoscaler
kubectl autoscale deployment api --cpu-percent=70 --min=2 --max=20
`},{title:`AWS Fargate — Serverless Containers`,lang:`bash`,desc:`Serverless compute engine dla ECS i EKS — uruchamiasz kontenery bez zarządzania EC2.
AWS automatycznie provisionuje, skaluje i patchuje infrastrukturę.

Kiedy Fargate zamiast EC2:
• Nie chcesz zarządzać node pools, patching, scaling workers
• Workloady z irregular traffic (Fargate skaluje do zera)
• Bezpieczeństwo: każdy task ma własny kernel (izolacja lepsza niż shared EC2)

Kiedy EC2 launch type jest lepszy:
• Potrzebujesz GPU instances
• Bardzo wysoka gęstość kontenerów (oszczędność)
• Specjalne typy instancji (c7g Graviton, i3 NVMe storage)

Cena Fargate:
• $0.04048 per vCPU/h + $0.004445 per GB RAM/h
• Droższe niż EC2 per-unit, ale zero overhead zarządzania
`,code:`# Service Fargate — skaluje do zera gdy brak ruchu
aws ecs create-service \\
  --cluster prod --service-name api \\
  --task-definition api:3 --desired-count 0 \\
  --launch-type FARGATE \\
  --network-configuration 'awsvpcConfiguration={
    subnets=[subnet-1a,subnet-1b],
    securityGroups=[sg-xxx],
    assignPublicIp=DISABLED
  }' \\
  --deployment-configuration minimumHealthyPercent=100,maximumPercent=200

# Application Auto Scaling na bazie SQS queue depth
aws application-autoscaling register-scalable-target \\
  --service-namespace ecs \\
  --resource-id service/prod/api \\
  --scalable-dimension ecs:service:DesiredCount \\
  --min-capacity 0 --max-capacity 50

# Scale-to-zero: gdy SQS pusta → 0 tasków. Wiadomość → Lambda uruchamia scaling policy
`},{title:`AWS Elastic Beanstalk — PaaS dla Developerów`,lang:`bash`,desc:`Platform-as-a-Service — wrzuć kod, Beanstalk sam konfiguruje EC2, Load Balancer, Auto Scaling, RDS.
Dobry dla team który chce deploy bez nauki infrastruktury.

Obsługuje: Python, Node.js, Java, .NET, PHP, Ruby, Go, Docker.

Co Beanstalk robi za Ciebie:
• Provisioning EC2 i Load Balancera
• Health monitoring i auto-healing
• Log aggregation do S3
• Rolling updates i blue/green deployments

Kiedy NIE używać Beanstalk:
• Potrzebujesz pełnej kontroli nad infrastrukturą → ECS/EKS
• Mikroserwisy → ECS lepszy
• Bardzo duże skale — overhead Beanstalk staje się problemem
`,code:`# Zainstaluj EB CLI
pip install awsebcli

# Inicjalizacja aplikacji
eb init moja-aplikacja \\
  --platform python-3.11 \\
  --region eu-west-1

# Utwórz environment (prod)
eb create prod-env \\
  --instance-type t3.small \\
  --min-instances 2 \\
  --max-instances 10 \\
  --database \\
  --db.engine postgres

# Deploy
eb deploy prod-env

# Logi i monitoring
eb logs
eb health --refresh

# .ebextensions/env.config — konfiguracja środowiska
# option_settings:
#   aws:elasticbeanstalk:application:environment:
#     DATABASE_URL: postgres://...
#     SECRET_KEY: ...
`},{title:`AWS Batch — Obliczenia Wsadowe`,lang:`python`,desc:`Fully managed batch processing — uruchamiaj tysiące zadań obliczeniowych bez zarządzania klastrem.
AWS automatycznie provisionuje compute (EC2 lub Fargate) tylko gdy są zadania w kolejce.

Główne koncepcje:
• Job — jedno zadanie (Docker container + parametry)
• Job Queue — kolejka z priorytetem. Wiele kolejek → jedna Compute Environment
• Compute Environment — pulą EC2/Fargate. Managed (AWS skaluje) lub Unmanaged
• Job Definition — szablon: image, vCPU, memory, retry policy, timeout

Kiedy Batch zamiast Lambda:
• Task > 15 minut (Lambda limit)
• Potrzebujesz > 10GB RAM lub GPU
• Przetwarzanie tysięcy plików, ML training, genomika, rendering

Cena: płacisz tylko za czas działania EC2/Fargate — zero kosztów gdy kolejka pusta
`,code:`import boto3

batch = boto3.client('batch', region_name='eu-west-1')

# Wyślij job
response = batch.submit_job(
    jobName='process-dataset-2024-01',
    jobQueue='prod-batch-queue',
    jobDefinition='data-processor:5',
    containerOverrides={
        'environment': [
            {'name': 'INPUT_S3', 'value': 's3://data/input/2024-01/'},
            {'name': 'OUTPUT_S3', 'value': 's3://data/output/2024-01/'},
            {'name': 'WORKERS', 'value': '8'}
        ],
        'resourceRequirements': [
            {'type': 'VCPU', 'value': '4'},
            {'type': 'MEMORY', 'value': '8192'}
        ]
    },
    retryStrategy={'attempts': 3},
    timeout={'attemptDurationSeconds': 3600}
)
job_id = response['jobId']

# Array Job — uruchom 1000 równoległych tasków
batch.submit_job(
    jobName='parallel-ml-inference',
    jobQueue='prod-batch-queue',
    jobDefinition='ml-inference:2',
    arrayProperties={'size': 1000},  # 1000 równoległych jobów!
    containerOverrides={
        'environment': [
            {'name': 'BATCH_ARRAY_INDEX', 'value': 'AWS_BATCH_JOB_ARRAY_INDEX'}
        ]
    }
)
`},{title:`AWS App Runner — Najprostszy Deploy Kontenerów`,lang:`bash`,desc:`Fully managed service dla web apps i API — deploy z GitHub lub ECR w 2 minuty.
Zero konfiguracji VPC, Load Balancera, Auto Scaling — wszystko automagicznie.

Kiedy App Runner zamiast ECS/EKS:
• Prototyp lub MVP — chcesz deploy w 5 minut
• Małe/średnie API bez skomplikowanych wymagań sieciowych
• Brak ops team — chcesz "git push = live"

Kiedy NIE App Runner:
• Potrzebujesz VPC private networking (App Runner ma VPC connector ale ograniczony)
• Specyficzne instance types (GPU, dużo RAM)
• Złożony routing, service mesh

Cena: $0.064 per vCPU/h + $0.007 per GB RAM/h (tylko za czas działania requestów)
`,code:`# Deploy z ECR (już masz image)
aws apprunner create-service \\
  --service-name prod-api \\
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "123.dkr.ecr.eu-west-1.amazonaws.com/api:latest",
      "ImageRepositoryType": "ECR",
      "ImageConfiguration": {
        "Port": "8000",
        "RuntimeEnvironmentVariables": {"ENV": "prod"}
      }
    },
    "AutoDeploymentsEnabled": true
  }' \\
  --instance-configuration 'Cpu=1 vCPU,Memory=2 GB' \\
  --health-check-configuration 'Protocol=HTTP,Path=/health,Interval=20,Timeout=5'

# Deploy z GitHub (source code — App Runner builduje sam)
aws apprunner create-service \\
  --service-name prod-api \\
  --source-configuration '{
    "CodeRepository": {
      "RepositoryUrl": "https://github.com/user/repo",
      "SourceCodeVersion": {"Type": "BRANCH", "Value": "main"},
      "CodeConfiguration": {
        "ConfigurationSource": "REPOSITORY",
        "CodeConfigurationValues": {
          "Runtime": "PYTHON_3",
          "BuildCommand": "pip install -r requirements.txt",
          "StartCommand": "uvicorn main:app --host 0.0.0.0 --port 8000"
        }
      }
    },
    "AutoDeploymentsEnabled": true
  }'
`},{title:`Amazon Lightsail — VPS dla Małych Projektów`,lang:`bash`,desc:`Uproszczony VPS — jak DigitalOcean ale na AWS. Stała cena miesięczna, prosty panel.
Dobry dla: małe strony WordPress, staging environments, projekty side hobby.

Bundle'e od $3.50/mies (512MB RAM, 20GB SSD) do $160/mies (32GB RAM, 640GB SSD).
Wliczone: IP, bandwidth (1-10TB/mies), DNS, snapshots.

Kiedy Lightsail zamiast EC2:
• Potrzebujesz prostoty i przewidywalnych kosztów
• WordPress, small apps, dev environments
• Nie chcesz konfigurować VPC, Security Groups, IAM

Kiedy wrócić do EC2:
• Potrzebujesz Auto Scaling
• Skomplikowana architektura sieciowa
• Duże obciążenia produkcyjne
`,code:`# Utwórz instancję Lightsail
aws lightsail create-instances \\
  --instance-names moja-strona \\
  --availability-zone eu-west-1a \\
  --blueprint-id wordpress \\
  --bundle-id small_3_0 \\
  --user-data "#!/bin/bash
    apt-get update
    apt-get install -y certbot python3-certbot-apache"

# Statyczny IP
aws lightsail allocate-static-ip --static-ip-name moja-strona-ip
aws lightsail attach-static-ip \\
  --static-ip-name moja-strona-ip \\
  --instance-name moja-strona

# Snapshot (backup)
aws lightsail create-instance-snapshot \\
  --instance-name moja-strona \\
  --instance-snapshot-name backup-2024-01-15
`},{title:`AWS Snow Family — Offline Data Transfer`,lang:`bash`,desc:`Fizyczne urządzenia do migracji petabajtów danych gdy internet jest zbyt wolny lub drogi.

Trzy urządzenia:
• Snowcone (8TB HDD / 14TB SSD) — najmniejszy, plecakowy, IoT edge
• Snowball Edge Storage Optimized (80TB) — standardowa migracja DC
• Snowball Edge Compute Optimized (80TB + GPU) — edge computing z ML inference
• Snowmobile — ciężarówka z 100PB pojemnością (serio)

Typowy flow:
1. Zamów urządzenie (kilka dni dostawy)
2. Podłącz do sieci lokalnej, skopiuj dane
3. Odeślij do AWS — dane lądują w S3
4. Weryfikacja integralności przez SHA-256

Kiedy Snow zamiast DataSync:
• > 100TB danych (upload 100TB przez 1Gbps = 9 dni)
• Słabe lub drogie łącze internetowe
• Dane pod regulacjami (nie można przez internet)
`,code:`# Zamów Snowball Edge (przez Console lub CLI)
aws snowball create-job \\
  --job-type IMPORT \\
  --resources '{"S3Resources":[{"BucketArn":"arn:aws:s3:::moj-bucket"}]}' \\
  --address-id ADID1234... \\
  --kms-key-arn arn:aws:kms:... \\
  --role-arn arn:aws:iam::123:role/SnowballRole \\
  --snowball-type EDGE_STORAGE_OPTIMIZED \\
  --shipping-option SECOND_DAY

# Po otrzymaniu urządzenia — odblokuj przez CLI
snowballEdge unlock-device \\
  --endpoint https://192.168.1.50 \\
  --manifest-file manifest.bin \\
  --unlock-code XXXXX-XXXXX-XXXXX-XXXXX-XXXXX

# Kopiuj dane (S3-compatible API)
aws s3 sync /local/data/ s3://moj-bucket/migration/ \\
  --endpoint-url http://192.168.1.50:8080
`},{title:`AWS Wavelength — 5G Edge Computing`,lang:`bash`,desc:`Infrastruktura AWS wbudowana bezpośrednio w sieci 5G operatorów.
Ultra-niski latency: 1-10ms do urządzenia końcowego (vs 50-100ms przez internet).

Jak działa:
• Wavelength Zone = mini AWS Region w RAN (Radio Access Network) operatora
• Deploy EC2/ECS w Wavelength Zone → serwer fizycznie w stacji bazowej 5G
• Telefon 5G → stacja bazowa → Wavelength Zone (1ms!) → nie wychodzi do internetu

Zastosowania:
• Autonomous vehicles — real-time AI inference <10ms
• Smart manufacturing — industrial IoT, roboty, CNC machines
• Live video streaming — low-latency encoding na edge
• Cloud gaming — streaming 60fps bez lag
• AR/VR — motion sickness przy latency > 20ms

Dostępność: US (Verizon), UK/Germany (Vodafone), Japan (KDDI), Korea (SK Telecom)
`,code:`# Opt-in do Wavelength Zone
aws ec2 modify-availability-zone-group \\
  --group-name eu-west-1-wl1-lon-wlz-1 \\
  --opt-in-status opted-in

# Subnet w Wavelength Zone
aws ec2 create-subnet \\
  --vpc-id vpc-xxx \\
  --cidr-block 10.0.100.0/24 \\
  --availability-zone-id euw1-wl1-lon-wlz1

# EC2 w Wavelength Zone (inference server)
aws ec2 run-instances \\
  --image-id ami-xxx \\
  --instance-type t3.medium \\
  --subnet-id subnet-wavelength \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=edge-inference}]'

# Carrier IP — dostępny przez sieć 5G operatora
aws ec2 allocate-address \\
  --network-border-group eu-west-1-wl1-lon-wlz-1
# Ruch: telefon 5G → Carrier IP → EC2 w Wavelength Zone = 1-5ms!
`},{title:`Amazon WorkSpaces — Wirtualne Pulpity (DaaS)`,lang:`bash`,desc:`Desktop-as-a-Service — wirtualne pulpity Windows/Linux w chmurze.
Użytkownicy łączą się z dowolnego urządzenia przez klienta lub przeglądarkę.

Bundle'e: Value (2vCPU 2GB), Standard (2vCPU 4GB), Performance (2vCPU 7.5GB),
Power (4vCPU 16GB), Graphics (8vCPU 15GB + GPU)

Kiedy WorkSpaces:
• Remote work — bezpieczny dostęp, dane nigdy nie opuszczają AWS
• Kontrahenci/konsultanci — dostęp bez instalowania czegokolwiek na ich urządzeniu
• Regulowane branże (finanse, zdrowie) — pełna kontrola środowiska
• BYOD — separacja korporacyjnych i prywatnych danych

Cena: od $21/mies (Value) do $88/mies (Power)
`,code:`# Utwórz WorkSpaces Directory (Simple AD)
aws ds create-directory \\
  --name corp.example.com \\
  --password "SecureP@ss1" \\
  --size Small \\
  --vpc-settings VpcId=vpc-xxx,SubnetIds=subnet-1a,subnet-1b

# Zarejestruj z WorkSpaces
aws workspaces register-workspace-directory \\
  --directory-id d-xxx --enable-work-docs

# Utwórz WorkSpace
aws workspaces create-workspaces --workspaces '[{
  "DirectoryId":"d-xxx",
  "UserName":"jan.kowalski",
  "BundleId":"wsb-bh8rsxt14",
  "WorkspaceProperties":{"RunningMode":"ALWAYS_ON"}
}]'
`},{title:`Amazon GameLift — Serwery Multiplayer`,lang:`bash`,desc:`Zarządzana infrastruktura dla real-time multiplayer game servers.
Automatyczne skalowanie, matchmaking, low-latency na całym świecie.

Dwa tryby:
• Managed GameLift — pełne zarządzanie; wgraj binarkę, AWS zarządza flotą EC2
• Anywhere Fleet — uruchom game server na własnej infrastrukturze (dev/test)

Kluczowe koncepcje:
• Fleet — pula EC2 z uruchomionym game serverem
• Game Session — jedna sesja gry (serwer dla 1 meczu/room)
• FlexMatch — elastyczny matchmaking: skill-based, region-based, custom rules
• Spot Fleet — 70-80% taniej, ale z 2min ostrzeżeniem przed przerwaniem

Cena: On-Demand EC2 + $0.10/h per active game session (GameLift opłata)
`,code:`# Deploy game server build
aws gamelift upload-build \\
  --name "MyGame-v1.2" \\
  --build-version "1.2.0" \\
  --build-root ./build/server/ \\
  --operating-system AMAZON_LINUX_2023

# Utwórz Fleet
aws gamelift create-fleet \\
  --name prod-game-fleet \\
  --build-id build-xxx \\
  --ec2-instance-type c6g.large \\
  --ec2-inbound-permissions '[
    {"FromPort":7777,"ToPort":7777,"IpRange":"0.0.0.0/0","Protocol":"UDP"}
  ]' \\
  --runtime-configuration '{
    "ServerProcesses":[{
      "LaunchPath":"/local/game/GameServer",
      "Parameters":"-port 7777",
      "ConcurrentExecutions":1
    }]
  }'
`}],hooki:[{name:`S3 — Simple Storage Service`,when:`Backupy, logi, artefakty buildu, statyczne strony, CDN origin, data lake, media pliki`,desc:`Nieograniczone, trwałe przechowywanie obiektów. 99.999999999% durability (11 dziewiątek).
Nie jest dyskiem — nie ma prawdziwej hierarchii folderów (klucz to string ze /).

Klasy przechowywania:
• Standard:               $0.023/GB — dostęp w ms, 99.99% availability
• Standard-IA:            $0.0125/GB — rzadki dostęp, $0.01/GB retrieval
• One Zone-IA:            $0.01/GB  — jak IA, tylko 1 AZ
• Glacier Instant:        $0.004/GB — ms retrieval
• Glacier Flexible:       $0.0036/GB — 1-5min retrieval, free Bulk (5-12h)
• Glacier Deep Archive:   $0.00099/GB — 12h retrieval, najtańszy
• Intelligent-Tiering:    automatycznie przenosi między klasami ($0.0025/1k objects)
`,code:`# Wersjonowanie — przechowuj wszystkie wersje obiektu
aws s3api put-bucket-versioning \\
  --bucket moj-bucket \\
  --versioning-configuration Status=Enabled

# Event → Lambda (trigger przy upload obrazka)
aws s3api put-bucket-notification-configuration \\
  --bucket moj-bucket \\
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "LambdaFunctionArn": "arn:aws:lambda:...:process-upload",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {"Key": {"FilterRules": [{"Name":"suffix","Value":".jpg"}]}}
    }]
  }'

# Lifecycle — automatycznie przenoś do Glacier po 90 dniach
aws s3api put-bucket-lifecycle-configuration \\
  --bucket moj-bucket \\
  --lifecycle-configuration file://lifecycle.json

# Static website hosting
aws s3 website s3://moja-strona.pl/ \\
  --index-document index.html \\
  --error-document 404.html

# Sync + deploy (invalidacja CloudFront po deploy)
aws s3 sync ./dist s3://moja-strona.pl/ --delete \\
  --cache-control "max-age=31536000" \\
  --exclude "*.html"
aws cloudfront create-invalidation \\
  --distribution-id EXXXXX --paths "/*.html"
`},{name:`Amazon EBS — Elastic Block Store`,when:`Dysk dla EC2, bazy danych na VM (PostgreSQL, MySQL), wysoki IOPS, persistent storage`,desc:`Sieciowy dysk blokowy podpinany do instancji EC2. Jak dysk twardy, ale przez sieć.
Jeden EBS = jeden EC2 (wyjątek: multi-attach dla io2 Block Express).

Typy wolumenów:
• gp3 — General Purpose SSD. 3000 IOPS baseline, do 16000 IOPS.
  $0.08/GB/mies. Domyślny wybór dla większości.
• io2 Block Express — Provisioned IOPS SSD. Do 256000 IOPS.
  $0.125/GB/mies + $0.065 per IOPS. Dla krytycznych baz danych.
• st1 — Throughput Optimized HDD. Tani, wysoki throughput, niski IOPS.
  $0.045/GB/mies. Big data, Kafka, log processing.
• sc1 — Cold HDD. Najtańszy, rzadki dostęp. $0.015/GB/mies.

Snapshots: inkrementalne kopie do S3. $0.05/GB/mies.
Data Lifecycle Manager — automatyczne snapshots (codziennie, retencja 7 dni).
`,code:`# Utwórz gp3 volume 100GB
aws ec2 create-volume \\
  --volume-type gp3 \\
  --size 100 \\
  --availability-zone eu-west-1a \\
  --iops 6000 \\
  --throughput 250 \\
  --encrypted \\
  --kms-key-id arn:aws:kms:...

# Podpnij do instancji
aws ec2 attach-volume \\
  --volume-id vol-xxx \\
  --instance-id i-xxx \\
  --device /dev/sdf

# Na EC2 — zamontuj
lsblk && sudo mkfs -t xfs /dev/nvme1n1
sudo mkdir /data && sudo mount /dev/nvme1n1 /data
echo '/dev/nvme1n1 /data xfs defaults 0 0' | sudo tee -a /etc/fstab

# Automatyczne snapshots (Data Lifecycle Manager)
aws dlm create-lifecycle-policy \\
  --description "Daily EBS snapshots" \\
  --state ENABLED \\
  --execution-role-arn arn:aws:iam::123:role/DLMRole \\
  --policy-details file://dlm-policy.json
`},{name:`Amazon EFS — Elastic File System`,when:`Współdzielony filesystem dla wielu EC2/ECS/Lambda, CMS, shared config, ML datasets`,desc:`Sieciowy filesystem NFS współdzielony przez wiele instancji jednocześnie.
Skalowalny automatycznie, płacisz za faktyczne zużycie (nie rezerwujesz pojemności).

Tryby wydajności:
• General Purpose — latency-sensitive (web serwery, CMS). Domyślny.
• Max I/O — dla setek instancji równocześnie (big data, media processing).

Klasy przechowywania:
• Standard: $0.30/GB/mies
• Standard-IA: $0.025/GB/mies (rzadki dostęp, $0.01/GB retrieval)
• One Zone: $0.16/GB/mies (jeden AZ, tańszy)

EFS vs EBS:
• EFS: wiele instancji jednocześnie, skalowalny, NFS protokół
• EBS: jedna instancja, szybszy, blokowy (nie plikowy)
`,code:`# Utwórz EFS filesystem
aws efs create-file-system \\
  --performance-mode generalPurpose \\
  --throughput-mode elastic \\
  --encrypted \\
  --tags Key=Name,Value=prod-efs

# Mount Target w każdym AZ
aws efs create-mount-target \\
  --file-system-id fs-xxx \\
  --subnet-id subnet-1a \\
  --security-groups sg-efs

# Na EC2 — zamontuj NFS
sudo yum install -y amazon-efs-utils
sudo mount -t efs fs-xxx:/ /mnt/efs
# Lub w /etc/fstab:
# fs-xxx.efs.eu-west-1.amazonaws.com:/ /mnt/efs efs defaults,_netdev 0 0

# W ECS Task Definition (shared volume między kontenerami)
# "volumes": [{"efsVolumeConfiguration": {"fileSystemId": "fs-xxx"}}]
`},{name:`Amazon RDS — Relacyjne Bazy Danych`,when:`PostgreSQL/MySQL/MariaDB/Oracle/SQL Server w chmurze, managed patching i backup`,desc:`Fully managed relational database — AWS zarządza backupami, patching, failover, monitoring.
Obsługuje: PostgreSQL 16, MySQL 8, MariaDB, Oracle, SQL Server, Db2.

Kluczowe funkcje:
• Multi-AZ: synchroniczna replika standby w innym AZ. Automatic failover < 60s.
• Read Replicas: asynchroniczne repliki tylko do odczytu (skalowanie SELECT-ów).
  Do 5 replik. Mogą być w innym regionie (cross-region replication).
• Automated Backups: codziennie do S3, retencja 1-35 dni, Point-in-Time Recovery.
• Enhanced Monitoring: metryki per-process, per-thread (50 metryk co 1s).
• Performance Insights: widzi które zapytania zjadają CPU/IO — darmowe przez 7 dni.
• Proxy: RDS Proxy zarządza connection pooling (ważne dla Lambda która tworzy tysiące połączeń).

Instancje: db.t3.micro (Free Tier, 2vCPU 1GB) → db.r8g.48xlarge (192 vCPU 1.5TB RAM)
`,code:`# Utwórz PostgreSQL Multi-AZ
aws rds create-db-instance \\
  --db-instance-identifier prod-postgres \\
  --db-instance-class db.t3.medium \\
  --engine postgres \\
  --engine-version 16.2 \\
  --master-username admin \\
  --master-user-password "SecurePass123!" \\
  --allocated-storage 100 \\
  --storage-type gp3 \\
  --storage-encrypted \\
  --multi-az \\
  --db-subnet-group-name prod-subnet-group \\
  --vpc-security-group-ids sg-xxx \\
  --backup-retention-period 7 \\
  --enable-performance-insights \\
  --tags Key=Env,Value=prod

# Read Replica dla raportów
aws rds create-db-instance-read-replica \\
  --db-instance-identifier prod-postgres-replica \\
  --source-db-instance-identifier prod-postgres \\
  --db-instance-class db.t3.medium

# RDS Proxy (connection pooling dla Lambda)
aws rds create-db-proxy \\
  --db-proxy-name prod-proxy \\
  --engine-family POSTGRESQL \\
  --auth '[{"AuthScheme":"SECRETS","SecretArn":"arn:aws:secretsmanager:..."}]' \\
  --role-arn arn:aws:iam::123:role/RDSProxyRole \\
  --vpc-subnet-ids subnet-1a subnet-1b
`},{name:`Amazon Aurora — AWS-Native Database Engine`,when:`PostgreSQL/MySQL kompatybilna, 5x wydajność RDS, auto-scaling storage, Serverless v2`,desc:`Własny silnik AWS kompatybilny z PostgreSQL i MySQL.
5x wydajność PostgreSQL, 3x MySQL — przy niższych kosztach niż commercial DB.

Kluczowe różnice vs RDS:
• Storage: automatycznie rośnie od 10GB do 128TB (nie rezerwujesz)
• Replikacja: do 15 read replicas, < 10ms lag (vs RDS ~10s)
• Failover: < 30s (vs RDS ~60s)
• Storage architektura: 6 kopii danych w 3 AZ (2 na AZ)

Aurora Serverless v2:
• Skaluje CPU/RAM w frakcjach ACU (Aurora Capacity Units) w sekundach
• Idealne dla nieprzewidywalnych workloadów, dev/staging
• Skaluje do zera (cold start 5-30s) — płacisz za ACU/godzinę gdy aktywna

Aurora Global Database:
• Replikacja cross-region < 1 sekunda
• Disaster recovery: RPO < 5s, RTO < 1 min
• Możliwy write forwarding (write w secondary region)
`,code:`# Aurora PostgreSQL Serverless v2
aws rds create-db-cluster \\
  --db-cluster-identifier prod-aurora \\
  --engine aurora-postgresql \\
  --engine-version 16.2 \\
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=32 \\
  --master-username admin \\
  --master-user-password "SecurePass123!" \\
  --storage-encrypted \\
  --db-subnet-group-name prod-subnet-group \\
  --vpc-security-group-ids sg-xxx

# Dodaj writer instance
aws rds create-db-instance \\
  --db-instance-identifier prod-aurora-writer \\
  --db-cluster-identifier prod-aurora \\
  --db-instance-class db.serverless \\
  --engine aurora-postgresql

# Dodaj reader instance (read scaling)
aws rds create-db-instance \\
  --db-instance-identifier prod-aurora-reader-1 \\
  --db-cluster-identifier prod-aurora \\
  --db-instance-class db.serverless \\
  --engine aurora-postgresql

# Aurora Global Database (multi-region DR)
aws rds create-global-cluster \\
  --global-cluster-identifier prod-global \\
  --source-db-cluster-identifier arn:aws:rds:eu-west-1:123:cluster:prod-aurora
`},{name:`Amazon DynamoDB — NoSQL Serverless`,when:`Miliony requestów/s, key-value i document store, gaming, IoT, sesje, shopping cart`,desc:`Fully managed, serverless NoSQL — zero infrastruktury do zarządzania.
Single-digit millisecond latency w każdej skali.

Model danych:
• Table — zbiór items (rekordów)
• Item — rekord (max 400KB). Każdy item może mieć inne atrybuty.
• Primary Key: Partition Key (hash) LUB Partition Key + Sort Key (range)
• GSI (Global Secondary Index) — zapytania po innych atrybutach

Tryby pojemności:
• On-Demand: płacisz per request ($1.25/M writes, $0.25/M reads). Dla nieprzewidywalnych.
• Provisioned: rezerwujesz RCU/WCU. Tańsze przy stałym ruchu + Auto Scaling.

DynamoDB Streams + Lambda — event-driven architektura:
każda zmiana w tabeli → Lambda → real-time processing

DAX (DynamoDB Accelerator): in-memory cache, microsecond latency, API-compatible
`,code:`import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
table = dynamodb.Table('Orders')

# Put item
table.put_item(Item={
    'userId': 'user-123',       # Partition Key
    'orderId': 'ord-456',       # Sort Key
    'status': 'pending',
    'total': 199.99,
    'items': [{'sku': 'ABC', 'qty': 2}],
    'createdAt': '2024-01-15T10:30:00Z'
})

# Query wszystkich zamówień użytkownika
response = table.query(
    KeyConditionExpression=Key('userId').eq('user-123'),
    FilterExpression=Attr('status').eq('pending'),
    ScanIndexForward=False,  # od najnowszych
    Limit=20
)

# Update atomiczny (bezpieczne — nie wyścig)
table.update_item(
    Key={'userId': 'user-123', 'orderId': 'ord-456'},
    UpdateExpression='SET #s = :new, updatedAt = :now ADD version :inc',
    ConditionExpression='#s = :old',  # optimistic locking!
    ExpressionAttributeNames={'#s': 'status'},
    ExpressionAttributeValues={
        ':new': 'shipped', ':old': 'pending',
        ':now': '2024-01-16T08:00:00Z', ':inc': 1
    }
)

# Batch write (25 items naraz)
with table.batch_writer() as batch:
    for i in range(100):
        batch.put_item(Item={'userId': f'user-{i}', 'orderId': f'ord-{i}'})
`},{name:`Amazon ElastiCache — In-Memory Cache`,when:`Session store, cache bazy danych, rate limiting, pub/sub, leaderboardy`,desc:`Managed Redis (v7) i Memcached w chmurze. Zero patching, automatic failover, Multi-AZ.

Redis vs Memcached:
• Redis: persistence, struktury danych (sorted sets, streams, hashes), pub/sub, transactions
• Memcached: prosty cache, multi-thread, brak persistence — rzadko wybierany w 2024

Topologie Redis:
• Single Node — dev/test. Brak failover.
• Cluster Mode Disabled — primary + replica. Failover w 30-60s.
• Cluster Mode Enabled — horizontal sharding, do 500 shardów, petabajty danych.

Kiedy ElastiCache vs DynamoDB DAX:
• ElastiCache: ogólny cache, sesje, rate limiting, pub/sub
• DAX: tylko dla DynamoDB — drop-in replacement, API compatible

Cena: cache.r7g.large = $0.166/h (~$120/mies). Multi-AZ = 2× koszt.
`,code:`import redis, json

r = redis.Redis(
    host='prod-redis.xxx.ng.0001.euw1.cache.amazonaws.com',
    port=6379,
    decode_responses=True,
    socket_connect_timeout=2
)

# Cache-aside pattern
def get_user(user_id: str) -> dict:
    cached = r.get(f'user:{user_id}')
    if cached:
        return json.loads(cached)
    # Cache miss — idź do bazy
    user = db.query(f"SELECT * FROM users WHERE id = '{user_id}'")
    r.setex(f'user:{user_id}', 3600, json.dumps(user))  # TTL 1h
    return user

# Rate limiting (sliding window)
def is_rate_limited(user_id: str, limit: int = 100) -> bool:
    import time
    key = f'ratelimit:{user_id}'
    pipe = r.pipeline()
    now = time.time()
    pipe.zremrangebyscore(key, 0, now - 60)  # usuń stare
    pipe.zadd(key, {str(now): now})
    pipe.zcard(key)
    pipe.expire(key, 60)
    _, _, count, _ = pipe.execute()
    return count > limit

# Pub/Sub (real-time notifications)
pubsub = r.pubsub()
pubsub.subscribe('order-updates')
for message in pubsub.listen():
    if message['type'] == 'message':
        print(f"Update: {message['data']}")
`},{name:`Amazon Redshift — Data Warehouse`,when:`Analityka na petabajtach danych, BI dashboardy, SQL na danych historycznych`,desc:`Petabyte-scale data warehouse — SQL na ogromnych zbiorach danych.
Columnar storage + masowy parallel processing (MPP) = 10x szybszy niż tradycyjne OLTP.

Typy klastrów:
• Provisioned: dedykowane węzły (RA3: oddziela compute od storage przez S3)
• Serverless: automatyczne skalowanie, płacisz per RPU (Redshift Processing Unit)

Kluczowe koncepcje:
• Columnar storage — dane per kolumna (idealne dla SELECT count, SUM, AVG)
• Distribution styles: EVEN, KEY (join optimization), ALL (mała tabela)
• Sort keys: porządkuje dane na dysku — dramatycznie przyspiesza range queries
• COPY command — ładowanie danych z S3 (miliony wierszy w minutach)
• Redshift Spectrum — zapytania bezpośrednio na S3 (bez ładowania do Redshift)
• Data Sharing — współdziel dane między klastrami bez kopiowania
`,code:`-- Utwórz tabelę z optymalną konfiguracją
CREATE TABLE sales (
    sale_id     BIGINT IDENTITY(1,1),
    user_id     INT NOT NULL,
    product_id  INT NOT NULL,
    amount      DECIMAL(10,2),
    sale_date   DATE NOT NULL,
    region      VARCHAR(50)
)
DISTSTYLE KEY
DISTKEY (user_id)
SORTKEY (sale_date, region);

-- Załaduj dane z S3 (masowy import)
COPY sales
FROM 's3://data-bucket/sales/2024/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET;

-- Analityczne zapytanie (miliardy wierszy w sekundy)
SELECT
    region,
    DATE_TRUNC('month', sale_date) AS month,
    COUNT(*)                        AS transactions,
    SUM(amount)                     AS revenue,
    AVG(amount)                     AS avg_order
FROM sales
WHERE sale_date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY region, month
ORDER BY month, revenue DESC;

-- Redshift Spectrum — SQL bezpośrednio na S3 (bez importu!)
CREATE EXTERNAL SCHEMA s3_logs
FROM DATA CATALOG DATABASE 'analytics'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftSpectrumRole'
CREATE EXTERNAL DATABASE IF NOT EXISTS;
`},{name:`Amazon DynamoDB Streams + EventBridge Pipes`,when:`Real-time reakcja na zmiany w DynamoDB, CDC (Change Data Capture), event-driven`,desc:`DynamoDB Streams przechwytuje każdą zmianę (INSERT/MODIFY/REMOVE) w tabeli.
EventBridge Pipes łączy Streams z dowolnym targtem bez kodu glue.

Zastosowania:
• Search indexing: zmiana w DynamoDB → Lambda → OpenSearch (real-time index)
• Cache invalidation: zmiana → Lambda → Redis.delete(key)
• Audit log: każda zmiana → S3/CloudWatch trwały zapis
• Cross-region replication: zmiana w eu-west-1 → Lambda → DynamoDB us-east-1
• Analytics: zmiana → Kinesis → Redshift/S3 (data pipeline)

EventBridge Pipes (2023+) — deklaratywny, bez kodu:
Source → Filter → Enrich (Lambda/Step Functions) → Target
`,code:`import boto3, json

# Lambda handler dla DynamoDB Stream
def handler(event, context):
    for record in event['Records']:
        event_name = record['eventName']  # INSERT, MODIFY, REMOVE
        new_image = record.get('dynamodb', {}).get('NewImage', {})
        old_image = record.get('dynamodb', {}).get('OldImage', {})

        if event_name == 'MODIFY':
            user_id = new_image.get('userId', {}).get('S')
            new_status = new_image.get('status', {}).get('S')
            old_status = old_image.get('status', {}).get('S')

            if old_status != new_status:
                # Invaliduj cache
                redis_client.delete(f'user:{user_id}')
                # Wyślij notyfikację
                sns.publish(
                    TopicArn='arn:aws:sns:...:order-updates',
                    Message=json.dumps({'userId': user_id, 'status': new_status})
                )

# Włącz Streams na tabeli
# aws dynamodb update-table --table-name Orders \\
#   --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES
`},{name:`Amazon S3 Glacier — Archiwizacja`,when:`Dane trzymane 7+ lat (compliance, backup historyczny), rzadki lub zerowy dostęp`,desc:`Najtańsze przechowywanie w AWS — od $0.00099/GB/mies (Deep Archive).
Ceną za niski koszt jest czas retrieval: minuty do godzin.

Klasy (porównanie retrieval):
• Glacier Instant Retrieval: milliseconds. $0.004/GB. Min 90 dni.
• Glacier Flexible Retrieval: Expedited 1-5min ($0.03/GB), Standard 3-5h (free), Bulk 5-12h (free)
• Glacier Deep Archive: Standard 12h (free), Bulk 48h (free). Min 180 dni.

Vault Lock — WORM (Write Once Read Many):
• Compliance mode: NIKT (nawet root/AWS) nie może usunąć danych przez X lat
• GDPR/HIPAA/SEC 17a-4 wymagają WORM dla audit logów

Kiedy używać:
• Logi aplikacji po 1 roku — Glacier Flexible
• Medical records, financial records — Deep Archive + Vault Lock
• Backup tapes zastąpione przez Deep Archive (10× tańsze niż tape infrastructure)
`,code:`# Lifecycle rule: S3 → Glacier po 1 roku
# lifecycle.json:
{
  "Rules": [{
    "ID": "archive-old-logs",
    "Filter": {"Prefix": "logs/"},
    "Status": "Enabled",
    "Transitions": [
      {"Days": 30, "StorageClass": "STANDARD_IA"},
      {"Days": 90, "StorageClass": "GLACIER"},
      {"Days": 365, "StorageClass": "DEEP_ARCHIVE"}
    ],
    "Expiration": {"Days": 2555}
  }]
}

aws s3api put-bucket-lifecycle-configuration \\
  --bucket moj-bucket \\
  --lifecycle-configuration file://lifecycle.json

# Vault Lock (compliance) — NIEODWRACALNE po locku!
aws glacier initiate-vault-lock \\
  --account-id - \\
  --vault-name compliance-archive \\
  --policy '{"Policy":"{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":[{\\"Effect\\":\\"Deny\\",\\"Principal\\":\\"*\\",\\"Action\\":[\\"glacier:DeleteArchive\\"],\\"Resource\\":\\"arn:aws:glacier:eu-west-1:123:vaults/compliance-archive\\"}]}"}'
`},{name:`Amazon SES — Simple Email Service`,when:`Transakcyjne emaile, reset hasła, powiadomienia, bulk marketing, email receiving`,desc:`Managed email sending i receiving. $0.10 per 1000 emaili.

Dwa tryby:
• Wysyłanie — SMTP lub API (boto3)
• Odbieranie — SES odbiera emaile i przekazuje do Lambda/S3

Ważne koncepcje:
• Verified Identity — zweryfikuj domenę (DNS TXT) lub adres email
• DKIM/SPF/DMARC — autentykacja emaila, wysoka dostarczalność
• Suppression list — automatycznie nie wysyłaj do adresów które bounceowały
• Configuration Sets — śledzenie bounces/complaints/opens/clicks
• Sandbox mode — nowe konto może wysyłać tylko do zweryfikowanych adresów

Bounce rate > 10% = ryzyko zawieszenia konta. Monitoruj!
`,code:`import boto3
from botocore.exceptions import ClientError

ses = boto3.client('ses', region_name='eu-west-1')

# Wyślij email HTML
try:
    ses.send_email(
        Source='noreply@twoja-domena.pl',
        Destination={'ToAddresses': ['user@example.com']},
        Message={
            'Subject': {'Data': 'Potwierdzenie zamówienia #12345'},
            'Body': {
                'Html': {'Data': '<h1>Dzięki!</h1><p>Kwota: <b>199,99 PLN</b></p>'},
                'Text': {'Data': 'Dzięki! Zamówienie #12345 przyjęte. Kwota: 199,99 PLN'}
            }
        },
        ConfigurationSetName='transactional-emails'
    )
except ClientError as e:
    print(e.response['Error']['Message'])

# Zweryfikuj domenę (DNS)
# aws ses verify-domain-identity --domain twoja-domena.pl
# Dodaj TXT record: _amazonses.domena.pl = <token>

# Email Receiving — MX record → inbound-smtp.eu-west-1.amazonaws.com
# Receipt Rule: odbierz na support@domena.pl → Lambda + S3
`}],routing:{title:`Networking — Sieć w AWS`,items:[{name:`VPC — Virtual Private Cloud`,desc:`Twoja prywatna sieć w AWS. Izolowana, w pełni konfigurowalna przestrzeń sieciowa.
Każde konto ma domyślny VPC (172.31.0.0/16) gotowy do użycia.

Kluczowe komponenty:
• Subnets: Public (routing do Internet Gateway) i Private (brak dostępu z internetu)
• Internet Gateway (IGW): brama do internetu dla public subnets
• NAT Gateway: instancje w private subnet mogą wychodzić do internetu (update, API calls)
  — nie pozwala na ruch przychodzący. $0.045/h + $0.045/GB.
• Route Tables: definiują routing. Każda subnet = jedna route table.
• Security Groups: stateful firewall per zasób (EC2, RDS, Lambda). Default: deny all in.
• NACLs: stateless firewall per subnet. Backup layer za Security Groups.
• VPC Peering: bezpośrednie połączenie dwóch VPC (nietranzytywne)
• Endpoints: dostęp do S3/DynamoDB bez NAT Gateway (oszczędność kosztów!)

CIDR design (przykład multi-tier):
VPC: 10.0.0.0/16 (65534 hostów)
Public:  10.0.1.0/24, 10.0.2.0/24 (ALB, NAT GW)
Private: 10.0.11.0/24, 10.0.12.0/24 (EC2, ECS)
DB:      10.0.21.0/24, 10.0.22.0/24 (RDS, ElastiCache)
`,code:`# Utwórz VPC od zera
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=prod-vpc}]' \\
  --query 'Vpc.VpcId' --output text)

# Internet Gateway
IGW=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW

# Subnets (2 AZ dla HA)
PUB_1A=$(aws ec2 create-subnet --vpc-id $VPC_ID \\
  --cidr-block 10.0.1.0/24 --availability-zone eu-west-1a \\
  --query 'Subnet.SubnetId' --output text)
PRIV_1A=$(aws ec2 create-subnet --vpc-id $VPC_ID \\
  --cidr-block 10.0.11.0/24 --availability-zone eu-west-1a \\
  --query 'Subnet.SubnetId' --output text)

# NAT Gateway (dla private subnet → internet)
EIP=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)
NAT=$(aws ec2 create-nat-gateway \\
  --subnet-id $PUB_1A --allocation-id $EIP \\
  --query 'NatGateway.NatGatewayId' --output text)

# Route Tables
# Public RT: 0.0.0.0/0 → IGW
PUB_RT=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $PUB_RT \\
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW
aws ec2 associate-route-table --subnet-id $PUB_1A --route-table-id $PUB_RT

# VPC Endpoint (S3 bez NAT — gratis!)
aws ec2 create-vpc-endpoint \\
  --vpc-id $VPC_ID \\
  --service-name com.amazonaws.eu-west-1.s3 \\
  --route-table-ids $PUB_RT
`},{name:`Route 53 — DNS i Traffic Routing`,desc:`Managed DNS + health checking + routing policies. 100% SLA.

Routing policies:
• Simple: jeden rekord → jeden cel
• Weighted: 70% → v2, 30% → v1 (A/B testing, canary deploy)
• Latency-based: użytkownik w EU → eu-west-1, US → us-east-1
• Failover: primary → secondary gdy health check wykryje problem
• Geolocation: PL → eu-central-1, US → us-east-1
• Geoproximity: routing oparty na odległości geograficznej + bias
• Multi-value: do 8 zdrowych IP (prosty load balancing)
• IP-based (2022+): routing po CIDR klienta

Alias Records:
Route 53-specific — wskazuj na ALB, CloudFront, S3, inne Route 53 records.
Zero TTL delay, free dla AWS endpoints, IPv6 support.
`,code:`# Hosted Zone (domena)
aws route53 create-hosted-zone \\
  --name twoja-domena.pl \\
  --caller-reference $(date +%s)

# A record → ALB (Alias)
aws route53 change-resource-record-sets \\
  --hosted-zone-id ZXXXXX \\
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "api.twoja-domena.pl",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z32O12XQLNTSW2",
          "DNSName": "prod-alb-xxx.eu-west-1.elb.amazonaws.com",
          "EvaluateTargetHealth": true
        }
      }
    }]
  }'

# Weighted routing (canary deploy)
# 90% → v1, 10% → v2
aws route53 change-resource-record-sets \\
  --hosted-zone-id ZXXXXX \\
  --change-batch '{
    "Changes": [
      {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.domena.pl","Type":"A","SetIdentifier":"v1","Weight":90,"AliasTarget":{"HostedZoneId":"Z32O12XQLNTSW2","DNSName":"alb-v1.eu-west-1.elb.amazonaws.com","EvaluateTargetHealth":true}}},
      {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.domena.pl","Type":"A","SetIdentifier":"v2","Weight":10,"AliasTarget":{"HostedZoneId":"Z32O12XQLNTSW2","DNSName":"alb-v2.eu-west-1.elb.amazonaws.com","EvaluateTargetHealth":true}}}
    ]
  }'
`},{name:`CloudFront — CDN z 450+ lokalizacjami`,desc:`Content Delivery Network — cachuje treści blisko użytkowników.
450+ PoP (Points of Presence) na całym świecie.

Origins (skąd pobiera treść):
• S3 (static sites, assets) — Origin Access Control (OAC) = S3 prywatny
• ALB/EC2 — dynamiczne API
• Custom HTTP endpoint (on-premises, inne chmury)
• Lambda Function URL

Cache behaviors:
• Path patterns: /api/* → ALB (no cache), /assets/* → S3 (cache 1 rok)
• TTL: Default 24h, min 0s, max 1 rok
• Cache keys: URL, headers, cookies, query strings
• Compression: gzip/brotli automatycznie

Security:
• WAF integration — blokuj ataki na edge
• Signed URLs/Cookies — prywatny dostęp do zasobów (video streaming)
• Field-level encryption — szyfruj konkretne pola formularza przed origin
• HTTPS only + TLS 1.2 minimum

Cena: pierwsze 1TB/mies gratis, potem $0.0085/GB (Europa)
`,code:`# Dystrybucja CloudFront dla S3 + ALB
aws cloudfront create-distribution --distribution-config '{
  "Origins": {
    "Quantity": 2,
    "Items": [
      {
        "Id": "S3-static",
        "DomainName": "moja-strona.s3.amazonaws.com",
        "S3OriginConfig": {"OriginAccessIdentity": ""}
      },
      {
        "Id": "ALB-api",
        "DomainName": "prod-alb.eu-west-1.elb.amazonaws.com",
        "CustomOriginConfig": {"HTTPSPort": 443, "OriginProtocolPolicy": "https-only"}
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-static",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true
  },
  "CacheBehaviors": {
    "Quantity": 1,
    "Items": [{
      "PathPattern": "/api/*",
      "TargetOriginId": "ALB-api",
      "ViewerProtocolPolicy": "https-only",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      "AllowedMethods": {"Quantity": 7, "Items": ["GET","HEAD","OPTIONS","PUT","PATCH","POST","DELETE"]}
    }]
  },
  "Aliases": {"Quantity": 1, "Items": ["moja-strona.pl"]},
  "ViewerCertificate": {"ACMCertificateArn": "arn:aws:acm:us-east-1:...", "SSLSupportMethod": "sni-only"},
  "Enabled": true
}'

# Invalidacja po deploy
aws cloudfront create-invalidation \\
  --distribution-id EXXXXX \\
  --paths "/index.html" "/assets/*"
`},{name:`ALB / NLB — Load Balancery`,desc:`Dwa typy load balancerów:

ALB (Application Load Balancer) — Layer 7 (HTTP/HTTPS/WebSocket/gRPC):
• Content-based routing: path (/api/* → service-api, /admin/* → service-admin)
• Header-based routing: X-Version: v2 → target group v2
• Host-based routing: api.domena.pl vs app.domena.pl → różne targety
• Sticky sessions, WebSocket support, gRPC
• Target types: EC2, IP, Lambda, ECS

NLB (Network Load Balancer) — Layer 4 (TCP/UDP/TLS):
• Ultra-low latency (millions of requests/second)
• Static IP per AZ (przydatne gdy klient allowlistuje IP)
• TLS termination lub TCP passthrough
• Target types: EC2, IP, ALB (multi-tier architecture)

Kiedy NLB zamiast ALB:
• Potrzebujesz static IP
• Non-HTTP (SMTP, FTP, gaming UDP)
• Bardzo niskie latency (gaming, trading)
`,code:`# ALB — content-based routing
ALB=$(aws elbv2 create-load-balancer \\
  --name prod-alb \\
  --subnets subnet-1a subnet-1b \\
  --security-groups sg-alb \\
  --query 'LoadBalancers[0].LoadBalancerArn' --output text)

# Target Groups
TG_API=$(aws elbv2 create-target-group \\
  --name prod-api-tg --protocol HTTP --port 8000 \\
  --vpc-id vpc-xxx --target-type ip \\
  --health-check-path /health \\
  --query 'TargetGroups[0].TargetGroupArn' --output text)

# HTTPS Listener z routing rules
aws elbv2 create-listener \\
  --load-balancer-arn $ALB \\
  --protocol HTTPS --port 443 \\
  --certificates CertificateArn=arn:aws:acm:... \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \\
  --default-actions Type=forward,TargetGroupArn=$TG_API

# Rule: /api/* → API, / → S3/static
aws elbv2 create-rule \\
  --listener-arn $LISTENER \\
  --conditions Field=path-pattern,Values='/api/*' \\
  --actions Type=forward,TargetGroupArn=$TG_API \\
  --priority 10
`},{name:`API Gateway — REST, HTTP i WebSocket API`,desc:`Managed API Gateway — routing, auth, rate limiting, transformacje bez kodu.

Trzy typy:
• REST API — w pełni funkcjonalny, transformacje requestów, caching, API keys
• HTTP API — szybszy, 70% tańszy, prosty proxy do Lambda/HTTP. Polecany dla nowych projektów.
• WebSocket API — dwukierunkowa komunikacja (chat, real-time updates, gaming)

Integracje:
• Lambda (proxy) — najczęstszy, pełny event object
• HTTP Proxy — przekazuje do dowolnego HTTP endpoint
• AWS Service — bezpośrednio wywołaj SQS, DynamoDB, Step Functions bez Lambdy

Kluczowe funkcje:
• Authorizers: JWT (Cognito/auth0), Lambda Authorizer (custom auth)
• Throttling: burst + rate per stage, per method, per API key
• Stage Variables: różne configy per stage (dev/staging/prod)
• Canary deployments: X% ruchu na nową wersję

Cena HTTP API: $1 per 1M requestów (vs REST API: $3.50/M)
`,code:`# HTTP API v2 z Lambda
API=$(aws apigatewayv2 create-api \\
  --name prod-api \\
  --protocol-type HTTP \\
  --cors-configuration AllowOrigins='*',AllowMethods='*',AllowHeaders='*' \\
  --query 'ApiId' --output text)

# Integracja z Lambda
INTEGRATION=$(aws apigatewayv2 create-integration \\
  --api-id $API \\
  --integration-type AWS_PROXY \\
  --integration-uri arn:aws:lambda:...:prod-handler \\
  --payload-format-version 2.0 \\
  --query 'IntegrationId' --output text)

# Route catch-all
aws apigatewayv2 create-route \\
  --api-id $API \\
  --route-key '$default' \\
  --target integrations/$INTEGRATION

# Auto-deploy stage
aws apigatewayv2 create-stage \\
  --api-id $API \\
  --stage-name prod \\
  --auto-deploy \\
  --default-route-settings ThrottlingBurstLimit=1000,ThrottlingRateLimit=500

# Lambda permission
aws lambda add-permission \\
  --function-name prod-handler \\
  --statement-id apigw-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com
`},{name:`AWS Transit Gateway — Centralny Hub Sieci`,desc:`Hub łączący wiele VPC i sieci on-premises w topologię hub-and-spoke.
Zastępuje skomplikowane VPC Peering meshes.

Porównanie:
• VPC Peering: punkt-do-punktu, nietranzytywne (A↔B, B↔C ≠ A↔C)
• Transit Gateway: tranzytywny routing, A↔TGW↔B↔TGW↔C = A może rozmawiać z C

Kluczowe koncepcje:
• Attachment: podpięcie VPC, VPN lub Direct Connect do TGW
• Route Tables TGW: kontrolujesz który attachment widzi który
• Segmentacja: prod-rt widzi tylko prod VPC + on-premises; dev-rt tylko dev VPC
• Shared Services VPC: centralne NAT, DNS, Firewall → reszta przez TGW
• Multi-account przez RAM (Resource Access Manager)

Cena: $0.05/h per attachment + $0.02/GB danych
`,code:`# Utwórz Transit Gateway
TGW=$(aws ec2 create-transit-gateway \\
  --description "Central networking hub" \\
  --options AutoAcceptSharedAttachments=enable,DnsSupport=enable \\
  --query 'TransitGateway.TransitGatewayId' --output text)

# Podepnij VPC
aws ec2 create-transit-gateway-vpc-attachment \\
  --transit-gateway-id $TGW \\
  --vpc-id vpc-prod \\
  --subnet-ids subnet-tgw-1a subnet-tgw-1b \\
  --tag-specifications 'ResourceType=transit-gateway-attachment,Tags=[{Key=Name,Value=prod-vpc}]'

# Route table VPC → TGW (dla other CIDR)
aws ec2 create-route \\
  --route-table-id rtb-private-xxx \\
  --destination-cidr-block 10.0.0.0/8 \\
  --transit-gateway-id $TGW
`},{name:`VPC Flow Logs — Monitoring Ruchu Sieciowego`,desc:`Przechwytuj metadane każdego pakietu w VPC — source IP, destination IP, port, protocol,
bytes, accept/reject. Nie przechwytuje treści pakietów.

Do czego służy:
• Diagnozowanie odrzuconych połączeń (Security Group/NACL blokuje)
• Analiza bezpieczeństwa: port scanning, lateral movement, nieoczekiwane połączenia
• Compliance: dowód że ruch był lub nie był dozwolony
• Capacity planning

Destynacje logów:
• CloudWatch Logs: przeszukiwalny, droższy
• S3: tani ($0.025/GB), Athena do analizy SQL
• Kinesis Data Firehose: real-time do OpenSearch/Splunk

Cena: $0.50/GB zebranych danych
`,code:`# Flow Logs dla VPC → S3
aws ec2 create-flow-logs \\
  --resource-type VPC \\
  --resource-ids vpc-xxx \\
  --traffic-type ALL \\
  --log-destination-type s3 \\
  --log-destination arn:aws:s3:::moje-flow-logs/vpc-logs/

# Analiza przez Athena
# Utwórz tabelę na S3 z logami, potem:

SELECT srcaddr, dstaddr, dstport, count(*) as rejects
FROM vpc_flow_logs
WHERE action = 'REJECT'
  AND srcaddr = '1.2.3.4'
GROUP BY srcaddr, dstaddr, dstport
ORDER BY rejects DESC;

-- Top 10 par IP po wolumenie danych
SELECT srcaddr, dstaddr, sum(bytes) as total_bytes
FROM vpc_flow_logs
WHERE action = 'ACCEPT'
GROUP BY srcaddr, dstaddr
ORDER BY total_bytes DESC LIMIT 10;
`},{name:`Direct Connect & VPN Gateway`,desc:`Dwa sposoby podłączenia sieci on-premises do AWS:

Direct Connect (DX):
• Dedykowane łącze fizyczne (1Gbps, 10Gbps, 100Gbps)
• Stabilne latency, nie przez publiczny internet
• SLA dla produkcyjnych połączeń
• Droższe (konfiguracja $0-200/mies, transfer $0.02/GB)
• Czas provisioning: tygodnie (fizyczna instalacja)
• Hosted Connection (przez partnera AWS): już od 50Mbps

Site-to-Site VPN:
• IPsec VPN przez internet
• Setup w godzinach, tanie ($0.05/h = ~$36/mies)
• Latency zależna od internetu
• Max 1.25Gbps per tunel (dwa tunele dla HA)
• Dobre jako backup dla Direct Connect

Kiedy co:
• DX: produkcja z dużym transferem danych lub wymaganiami compliance
• VPN: dev/staging, DR, tymczasowe połączenie, backup dla DX
`,code:`# Site-to-Site VPN (szybki setup)
# 1. Customer Gateway (Twój router on-premises)
aws ec2 create-customer-gateway \\
  --type ipsec.1 \\
  --public-ip 203.0.113.1 \\
  --bgp-asn 65000

# 2. Virtual Private Gateway (strona AWS)
VGW=$(aws ec2 create-vpn-gateway \\
  --type ipsec.1 --query 'VpnGateway.VpnGatewayId' --output text)
aws ec2 attach-vpn-gateway --vpn-gateway-id $VGW --vpc-id vpc-xxx

# 3. VPN Connection
aws ec2 create-vpn-connection \\
  --type ipsec.1 \\
  --customer-gateway-id cgw-xxx \\
  --vpn-gateway-id $VGW \\
  --options StaticRoutesOnly=false

# Pobierz konfigurację dla swojego routera (Cisco, Juniper, Palo Alto, pfSense)
aws ec2 describe-vpn-connections \\
  --query 'VpnConnections[0].CustomerGatewayConfiguration'
`}]},state:{title:`Security & DevOps — Bezpieczeństwo i automatyzacja AWS`,items:[{name:`IAM — Identity and Access Management`,icon:`🔐`,color:`#FF9900`,bundle:`core`,complexity:`medium`,when:`zawsze, każdy zasób w AWS`,desc:`Fundament bezpieczeństwa całego AWS. Kontroluje KTO może robić CO z KTÓRYMI zasobami.

Kluczowe koncepcje:
• Users: tożsamości dla ludzi — nie twórz Access Keys dla roota, używaj MFA
• Groups: zbiory uprawnień — dodajesz użytkownika do grupy, nie przypisujesz polityk indywidualnie
• Roles: tożsamości dla serwisów — EC2 zakłada rolę żeby czytać z S3 (nie przechowuje credentials)
• Policies: JSON dokumenty definiujące uprawnienia (Effect Allow/Deny + Action + Resource)

Zasady:
• Least Privilege: dawaj MINIMUM potrzebnych uprawnień, rozszerzaj gdy potrzeba
• Never use root: root tylko do billing, support, initial setup
• Roles > Access Keys: EC2/Lambda powinny używać IAM Roles, nie zakodowanych kluczy
• MFA everywhere: obligatoryjnie dla wszystkich kont z dostępem do Console

Permission boundaries: "ceiling" na uprawnienia — nawet jeśli polityka daje AdministratorAccess,
boundary może ograniczyć do konkretnych serwisów. Używane przy delegowaniu tworzenia ról.
`,code:`# Polityka least-privilege (S3 read-only dla konkretnego bucketa)
aws iam create-policy \\
  --policy-name ReadCheckiBucket \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::checki-assets",
        "arn:aws:s3:::checki-assets/*"
      ]
    }]
  }'

# Rola dla EC2 (zakłada rolę, zero Access Keys)
aws iam create-role \\
  --role-name ec2-s3-reader \\
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ec2.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

aws iam attach-role-policy \\
  --role-name ec2-s3-reader \\
  --policy-arn arn:aws:iam::ACCOUNT:policy/ReadCheckiBucket

# Wymuszanie MFA na użytkownikach
aws iam create-policy --policy-name ForceMFA \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {"Effect": "Allow", "Action": "iam:CreateVirtualMFADevice", "Resource": "*"},
      {"Effect": "Deny", "NotAction": ["iam:CreateVirtualMFADevice","iam:EnableMFADevice","sts:GetSessionToken"],
       "Resource": "*",
       "Condition": {"BoolIfExists": {"aws:MultiFactorAuthPresent": "false"}}}
    ]
  }'
`},{name:`Cognito — Auth dla Aplikacji`,icon:`👤`,color:`#DD344C`,bundle:`auth`,complexity:`medium`,when:`aplikacje web/mobile wymagające rejestracji użytkowników`,desc:`Managed Identity dla aplikacji — rejestracja, logowanie, OAuth, JWT.
Zero implementacji auth od zera.

User Pools:
• Katalog użytkowników — email/hasło, MFA, email verification
• Social login: Google, Facebook, Apple, SAML/OIDC enterprise
• Customization: Lambda triggers (pre-signup, post-authentication, custom messages)
• JWT tokens: ID token, Access token, Refresh token
• Cena: pierwsze 50k MAU gratis, potem $0.0055/MAU

Identity Pools (Federated Identities):
• Zamień token (Cognito/Google/Facebook/SAML) → tymczasowe AWS credentials
• Użytkownik loguje się przez Cognito User Pool → dostaje IAM credentials → odczytuje S3
• Oddzielne role dla zalogowanych i niezalogowanych (guest access)
`,code:`# User Pool z email verification
POOL=$(aws cognito-idp create-user-pool \\
  --pool-name checki-users \\
  --policies '{"PasswordPolicy":{"MinimumLength":8,"RequireUppercase":true,"RequireNumbers":true}}' \\
  --auto-verified-attributes email \\
  --username-attributes email \\
  --query 'UserPool.Id' --output text)

# App Client (dla web/mobile)
CLIENT=$(aws cognito-idp create-user-pool-client \\
  --user-pool-id $POOL \\
  --client-name checki-web \\
  --no-generate-secret \\
  --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH \\
  --query 'UserPoolClient.ClientId' --output text)

# Rejestracja użytkownika
aws cognito-idp sign-up \\
  --client-id $CLIENT \\
  --username user@example.com \\
  --password SecurePass123!

# Potwierdzenie emailem
aws cognito-idp confirm-sign-up \\
  --client-id $CLIENT \\
  --username user@example.com \\
  --confirmation-code 123456

# Logowanie → JWT
aws cognito-idp initiate-auth \\
  --client-id $CLIENT \\
  --auth-flow USER_PASSWORD_AUTH \\
  --auth-parameters USERNAME=user@example.com,PASSWORD=SecurePass123!
`},{name:`WAF — Web Application Firewall`,icon:`🛡️`,color:`#FF4F8B`,bundle:`security`,complexity:`medium`,when:`ochrona ALB, API Gateway, CloudFront przed atakami webowymi`,desc:`Layer 7 firewall — blokuj ataki zanim dotrą do aplikacji.
Działa na: ALB, API Gateway, CloudFront, AppSync, App Runner.

Rule Groups:
• AWS Managed Rules: gotowe reguły od AWS (OWASP Top 10, Common, Bad Inputs, Known Bad Inputs)
• AWS Marketplace Rules: Imperva, F5, Fortinet (płatne, ale zaawansowane)
• Custom Rules: Twoje własne — IP allowlist/blocklist, rate limiting, geo-blocking

Typy reguł:
• IP Set: blokuj konkretne IP lub zakresy CIDR
• Geo Match: blokuj kraje, z których nie oczekujesz ruchu
• Rate Based: max 1000 req/5min z jednego IP → block
• String Match: blokuj requestu zawierające SQL injection patterns, XSS
• Regex: zaawansowane pattern matching

Cena: $5/mies per WebACL + $1 per 1M requestów + $1 per rule (najtańszy jest Managed Rules)
`,code:`# Web ACL z AWS Managed Rules + rate limiting
aws wafv2 create-web-acl \\
  --name checki-waf \\
  --scope REGIONAL \\
  --default-action Allow={} \\
  --rules '
  [
    {
      "Name": "AWSManagedRulesCommonRuleSet",
      "Priority": 0,
      "Statement": {"ManagedRuleGroupStatement": {"VendorName": "AWS", "Name": "AWSManagedRulesCommonRuleSet"}},
      "OverrideAction": {"None": {}},
      "VisibilityConfig": {"SampledRequestsEnabled": true, "CloudWatchMetricsEnabled": true, "MetricName": "CommonRules"}
    },
    {
      "Name": "RateLimit1000",
      "Priority": 1,
      "Statement": {"RateBasedStatement": {"Limit": 1000, "AggregateKeyType": "IP"}},
      "Action": {"Block": {}},
      "VisibilityConfig": {"SampledRequestsEnabled": true, "CloudWatchMetricsEnabled": true, "MetricName": "RateLimit"}
    }
  ]
  ' \\
  --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=checki-waf

# Podepnij do ALB
aws wafv2 associate-web-acl \\
  --web-acl-arn arn:aws:wafv2:... \\
  --resource-arn arn:aws:elasticloadbalancing:...
`},{name:`KMS — Key Management Service`,icon:`🔑`,color:`#FF9900`,bundle:`encryption`,complexity:`medium`,when:`szyfrowanie danych w spoczynku i w tranzycie`,desc:`Managed service do tworzenia i zarządzania kluczami kryptograficznymi.
Każde wywołanie KMS jest logowane w CloudTrail — audit trail dla compliance.

Typy kluczy:
• AWS Managed Keys: automatycznie tworzone dla serwisów (aws/s3, aws/rds), rotacja co rok
• Customer Managed Keys (CMK): Twój klucz, Twoja kontrola, $1/mies + $0.03 per 10k wywołań
• Customer Provided Keys (SSE-C): dostarczasz własny klucz przy każdym API call
• CloudHSM: dedykowany sprzęt HSM — banki, regulowane branże

Envelope Encryption:
KMS nie szyfruje danych bezpośrednio (max 4KB). Zamiast:
1. KMS generuje Data Key (plaintext + encrypted copy)
2. Szyfruj dane plaintext Data Key → encrypted data
3. Trzymaj encrypted data + encrypted Data Key (plaintext wyrzuć)
4. Odszyfrowanie: KMS decrypt → plaintext key → decrypt data

Integracje: S3, RDS, EBS, DynamoDB, Secrets Manager, CloudTrail, Lambda, SQS...
`,code:`# Utwórz CMK
KEY=$(aws kms create-key \\
  --description "Checki production CMK" \\
  --key-usage ENCRYPT_DECRYPT \\
  --key-spec SYMMETRIC_DEFAULT \\
  --query 'KeyMetadata.KeyId' --output text)

# Alias dla czytelności
aws kms create-alias \\
  --alias-name alias/checki-prod \\
  --target-key-id $KEY

# Szyfrowanie
aws kms encrypt \\
  --key-id alias/checki-prod \\
  --plaintext "SecretApiKey123" \\
  --query 'CiphertextBlob' --output text > encrypted.b64

# Deszyfrowanie
aws kms decrypt \\
  --ciphertext-blob fileb://encrypted.b64 \\
  --query 'Plaintext' --output text | base64 --decode

# Automatyczna rotacja klucza co rok
aws kms enable-key-rotation --key-id $KEY

# S3 z CMK
aws s3api create-bucket --bucket moj-zaszyfrowany-bucket
aws s3api put-bucket-encryption \\
  --bucket moj-zaszyfrowany-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [{"ApplyServerSideEncryptionByDefault": {
      "SSEAlgorithm": "aws:kms",
      "KMSMasterKeyID": "alias/checki-prod"
    }}]
  }'
`},{name:`Secrets Manager — Zarządzanie Sekretami`,icon:`🗝️`,color:`#FF4F8B`,bundle:`security`,complexity:`low`,when:`przechowywanie haseł DB, API keys, certyfikatów`,desc:`Bezpieczne przechowywanie i automatyczna rotacja sekretów — koniec z hardkodowanymi hasłami.

Co przechowuje:
• Database credentials (RDS, Aurora, Redshift, DocumentDB)
• API keys (Stripe, Twilio, OpenAI)
• OAuth tokens, SSH keys, X.509 certyfikaty
• Dowolny JSON lub string

Kluczowe funkcje:
• Automatyczna rotacja: Lambda aktualizuje hasło w DB + sekret jednocześnie
• Versioning: AWSCURRENT, AWSPENDING, AWSPREVIOUS — zero downtime przy rotacji
• Cross-account access: udostępniaj sekrety innym kontom przez IAM policies
• Replication: replikuj do innych regionów dla DR
• Audit: każde odczytanie sekretu ląduje w CloudTrail

Integracje natywne: RDS, Aurora, Redshift, DocumentDB — kliknij checkbox i gotowe.
Cena: $0.40/sekret/mies + $0.05 per 10k API calls
`,code:`# Utwórz sekret
aws secretsmanager create-secret \\
  --name prod/checki/database \\
  --description "PostgreSQL credentials" \\
  --secret-string '{"username":"checki_app","password":"SuperSecure123!","host":"db.example.com","port":5432,"dbname":"checki"}'

# Odczyt sekretu w Python (Lambda, EC2)
# import boto3, json
# client = boto3.client('secretsmanager')
# secret = client.get_secret_value(SecretId='prod/checki/database')
# creds = json.loads(secret['SecretString'])
# conn = psycopg2.connect(host=creds['host'], database=creds['dbname'], ...)

# Rotacja automatyczna (RDS)
aws secretsmanager rotate-secret \\
  --secret-id prod/checki/database \\
  --rotation-rules AutomaticallyAfterDays=30

# Odczyt przez CLI (np. w skryptach CI/CD)
aws secretsmanager get-secret-value \\
  --secret-id prod/checki/database \\
  --query 'SecretString' --output text | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['password'])"
`},{name:`CloudFormation — Infrastructure as Code`,icon:`📋`,color:`#FF9900`,bundle:`iac`,complexity:`high`,when:`definiowanie i zarządzanie infrastrukturą AWS jako kod`,desc:`Oficjalne IaC AWS — opisujesz infrastrukturę w YAML/JSON, CloudFormation tworzy ją.
Stack = zestaw zasobów zarządzanych jako jednostka (utwórz/aktualizuj/usuń razem).

Kluczowe koncepcje:
• Template: YAML/JSON opis zasobów
• Stack: konkretna instancja template (prod-stack, dev-stack)
• Change Sets: preview zmian PRZED zastosowaniem — jak \`terraform plan\`
• Nested Stacks: podziel duże template na moduły
• StackSets: deploy do wielu kont/regionów jednocześnie (multi-account orgs)
• Drift Detection: wykryj zasoby zmodyfikowane poza CloudFormation
• cfn-init/cfn-signal: bootstrapping EC2

Sekcje template:
Parameters, Mappings, Conditions, Resources (wymagane), Outputs, Metadata

Alternatywy:
• CDK — TypeScript/Python/Java generuje CloudFormation, dużo przyjemniejszy DX
• Terraform — multi-cloud, state w S3+DynamoDB, ogromna społeczność
• SAM — nakładka na CloudFormation dla serverless (Lambda, API GW, DynamoDB)
`,code:`# Template YAML — VPC + EC2 + Security Group
cat > infra.yaml << 'EOF'
AWSTemplateFormatVersion: '2010-09-09'
Description: Checki App Infrastructure

Parameters:
  Env:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]

Resources:
  AppVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: !Sub "checki-\${Env}-vpc"

  AppSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow HTTPS
      VpcId: !Ref AppVPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0

  AppDatabase:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceClass: db.t3.micro
      Engine: postgres
      EngineVersion: "15"
      MasterUsername: admin
      ManageMasterUserPassword: true  # Secrets Manager automatycznie!
      AllocatedStorage: 20
      VPCSecurityGroups:
        - !Ref AppSecurityGroup

Outputs:
  VPCID:
    Value: !Ref AppVPC
    Export:
      Name: !Sub "\${Env}-vpc-id"
EOF

# Deploy
aws cloudformation create-stack \\
  --stack-name checki-dev \\
  --template-body file://infra.yaml \\
  --parameters ParameterKey=Env,ParameterValue=dev \\
  --capabilities CAPABILITY_IAM

# Update z preview
aws cloudformation create-change-set \\
  --stack-name checki-dev --change-set-name update-1 \\
  --template-body file://infra.yaml

aws cloudformation execute-change-set \\
  --stack-name checki-dev --change-set-name update-1
`},{name:`CodePipeline & CodeBuild — CI/CD`,icon:`🚀`,color:`#3F8624`,bundle:`cicd`,complexity:`medium`,when:`automatyzacja buildu, testów i deployu aplikacji`,desc:`Kompletny CI/CD stack w obrębie AWS:

CodeCommit (Git hosting) → CodeBuild (build/test) → CodeDeploy (deploy) → CodePipeline (orkiestrator)

CodePipeline:
• Orkiestrator całego pipeline — łączy etapy
• Source: GitHub, CodeCommit, S3, ECR (nowy obraz → trigger)
• Build: CodeBuild
• Test: CodeBuild lub zewnętrzne narzędzia
• Deploy: CodeDeploy, ECS, Lambda, CloudFormation, Elastic Beanstalk
• Manual Approval: zatwierdź ręcznie przed deployem na prod

CodeBuild:
• Managed build servers — płacisz za minuty (brak idle)
• buildspec.yml w repozytorium
• Cache warstwy Docker dla szybszych buildów
• Środowiska: Ubuntu, Amazon Linux 2, custom Docker image
• $0.005/min dla small ($0.01 medium, $0.02 large)

CodeDeploy:
• EC2/ECS/Lambda — zero-downtime deploy
• Blue/Green: nowe środowisko → test → przełącz ruch
• Canary: 10% ruchu na nową wersję przez 10 min → sprawdź alarmy → 100%
• Rollback automatyczny gdy CloudWatch Alarms wykryje problem
`,code:`# buildspec.yml (w root repo)
cat > buildspec.yml << 'EOF'
version: 0.2

phases:
  install:
    runtime-versions:
      python: 3.11
    commands:
      - pip install -r requirements.txt

  pre_build:
    commands:
      - pytest tests/ --tb=short
      - aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY

  build:
    commands:
      - docker build -t $IMAGE_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION .
      - docker push $IMAGE_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION

  post_build:
    commands:
      - printf '[{"name":"app","imageUri":"%s"}]' $IMAGE_URI:$CODEBUILD_RESOLVED_SOURCE_VERSION > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json
EOF

# Pipeline jako CloudFormation
# Source (GitHub) → Build (CodeBuild) → Deploy (ECS)
aws codepipeline create-pipeline --pipeline '{
  "name": "checki-prod",
  "roleArn": "arn:aws:iam::...role/CodePipeline",
  "stages": [
    {"name":"Source","actions":[{"name":"GitHub","actionTypeId":{"category":"Source","owner":"ThirdParty","provider":"GitHub","version":"1"},"configuration":{"Owner":"liyo","Repo":"checki","Branch":"main","OAuthToken":"TOKEN"}}]},
    {"name":"Build","actions":[{"name":"CodeBuild","actionTypeId":{"category":"Build","owner":"AWS","provider":"CodeBuild","version":"1"},"configuration":{"ProjectName":"checki-build"},"inputArtifacts":[{"name":"SourceArtifact"}],"outputArtifacts":[{"name":"BuildArtifact"}]}]},
    {"name":"Deploy","actions":[{"name":"ECS","actionTypeId":{"category":"Deploy","owner":"AWS","provider":"ECS","version":"1"},"configuration":{"ClusterName":"prod","ServiceName":"checki-app"},"inputArtifacts":[{"name":"BuildArtifact"}]}]}
  ]
}'
`},{name:`CloudWatch — Monitoring, Logi, Alarmy`,icon:`📊`,color:`#FF9900`,bundle:`observability`,complexity:`medium`,when:`monitoring infrastruktury i aplikacji, alerty, logi`,desc:`Centralny monitoring AWS. Zbiera metryki, logi, tracesy — i reaguje na problemy.

Komponenty:
• Metrics: dane numeryczne w czasie (CPU, RequestCount, Latency, custom)
  Retencja: 15 mies dla 1-min granularity, wieczyste dla zagregowanych
• Alarms: progowe alerty → SNS/Lambda/AutoScaling/EC2 action
• Logs: logi z Lambda, EC2, ECS, API GW, CloudTrail, VPC Flow
  Log Groups → Log Streams → Events
• Log Insights: SQL-podobne zapytania do analizy logów
• Container Insights: CPU/Memory per container, task, service
• Application Insights: wykrywanie problemów .NET, Java, Node.js aplikacji
• Synthetics Canaries: scheduled tests endpointów (jak Pingdom)
• ServiceLens: end-to-end tracing przez X-Ray integrację

CloudWatch Agent:
Instalujesz na EC2 → zbiera custom metryki (RAM, dysk — domyślnie ich nie ma!),
przesyła logi z dowolnych plików, niestandardowe metryki z aplikacji.
`,code:`# Custom metryki z aplikacji (Python)
# import boto3
# cw = boto3.client('cloudwatch')
# cw.put_metric_data(
#   Namespace='Checki/App',
#   MetricData=[{
#     'MetricName': 'UserRegistrations',
#     'Value': 42,
#     'Unit': 'Count',
#     'Dimensions': [{'Name': 'Environment', 'Value': 'prod'}]
#   }]
# )

# Alarm: CPU > 80% przez 5 min → SNS notification
aws cloudwatch put-metric-alarm \\
  --alarm-name high-cpu-prod \\
  --alarm-description "CPU > 80% for 5 min" \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 60 \\
  --evaluation-periods 5 \\
  --threshold 80 \\
  --comparison-operator GreaterThanThreshold \\
  --dimensions Name=AutoScalingGroupName,Value=prod-asg \\
  --alarm-actions arn:aws:sns:eu-west-1:xxx:ops-alerts \\
  --ok-actions arn:aws:sns:eu-west-1:xxx:ops-alerts

# Log Insights: 100 najwolniejszych requestów API
aws logs start-query \\
  --log-group-name /aws/lambda/prod-api \\
  --start-time $(date -d '1 hour ago' +%s) \\
  --end-time $(date +%s) \\
  --query-string 'fields @timestamp, @message
    | filter @message like /REPORT/
    | parse @message "Duration: * ms" as duration
    | sort duration desc
    | limit 100'

# Dashboard
aws cloudwatch put-dashboard \\
  --dashboard-name checki-prod \\
  --dashboard-body file://dashboard.json
`},{name:`CloudTrail — Audit Log AWS`,icon:`📜`,color:`#FF9900`,bundle:`compliance`,complexity:`low`,when:`compliance, auditing, forensics po incydentach bezpieczeństwa`,desc:`Niezmienialny zapis każdej akcji w Twoim koncie AWS — kto, co, kiedy, skąd.

Rejestruje:
• Management Events: tworzenie/usuwanie zasobów, zmiany IAM, konfiguracja serwisów
• Data Events: operacje na danych — GetObject S3, Invoke Lambda, PutItem DynamoDB
  (domyślnie wyłączone — drogie, ale ważne dla compliance)
• Insight Events: wykrywa anomalie — nagły wzrost API calls, unusually high errors

Przechowywanie:
• 90 dni za darmo w CloudTrail Event History
• S3 + CloudWatch Logs dla długoterminowego przechowywania
• Athena do analizy SQL na dużych ilościach logów

CloudTrail Lake (2022+):
• Managed query engine — nie potrzebujesz S3+Athena setup
• SQL bezpośrednio na logach, retencja do 7 lat
• Droższe niż S3+Athena ale prostsze

Multi-region trail: jeden trail w Management Account → logi ze wszystkich kont i regionów.
`,code:`# Włącz trail → S3
aws cloudtrail create-trail \\
  --name org-trail \\
  --s3-bucket-name audit-logs-bucket \\
  --include-global-service-events \\
  --is-multi-region-trail \\
  --enable-log-file-validation

aws cloudtrail start-logging --name org-trail

# Szukaj w Event History: kto usunął bucket S3 w ciągu ostatnich 24h?
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket \\
  --start-time "2026-06-01T00:00:00Z" \\
  --end-time "2026-06-10T00:00:00Z" \\
  --query 'Events[].{Time:EventTime,User:Username,Source:SourceIPAddress}'

# Analiza przez Athena — kto zakładał nowe IAM Users?
SELECT eventtime, useridentity.username, requestparameters
FROM cloudtrail_logs
WHERE eventname = 'CreateUser'
  AND eventtime >= '2026-06-01'
ORDER BY eventtime DESC;
`},{name:`GuardDuty — Threat Detection`,icon:`🔍`,color:`#FF4F8B`,bundle:`security`,complexity:`low`,when:`detekcja zagrożeń — włącz i zapomnij w każdym koncie`,desc:`Inteligentny IDS (Intrusion Detection System) dla AWS — ML + threat intelligence.
Analizuje CloudTrail, VPC Flow Logs, DNS Logs bez instalowania agentów.

Co wykrywa:
• Cryptocurrency mining: EC2 komunikuje się z mining pools
• Compromised credentials: logowanie z nieoczekiwanych IP/krajów
• Reconnaissance: port scanning Twojego VPC
• Privilege escalation: IAM actions z Tor/anonymizer
• Data exfiltration: S3 wysyła dane do nieznanych IP
• Malicious domains: EC2 odpytuje domeny z listy C&C

Typy findings:
• Severity: Low (1-3.9), Medium (4-6.9), High (7-8.9), Critical (9-10)
• Format: ThreatPurpose:ResourceType/ThreatFamilyName (np. CryptoCurrency:EC2/BitcoinTool.B)

Integracje:
• EventBridge: finding → Lambda → Slack notification, auto-remediation
• Security Hub: centralne aggregowanie z wielu kont
• Detective: deep dive forensics na podejrzanych IP i użytkownikach

Cena: $4/1M CloudTrail events + $1/GB Flow Logs
`,code:`# Włącz GuardDuty (to jedyne co musisz zrobić!)
DETECTOR=$(aws guardduty create-detector \\
  --enable \\
  --features '[{"Name":"S3_DATA_EVENTS","Status":"ENABLED"},{"Name":"EKS_AUDIT_LOGS","Status":"ENABLED"}]' \\
  --query 'DetectorId' --output text)

# Lista findings (posortowane po severity)
aws guardduty list-findings \\
  --detector-id $DETECTOR \\
  --finding-criteria '{"Criterion":{"severity":{"Gte":7}}}' \\
  --sort-criteria '{"AttributeName":"severity","OrderBy":"DESC"}'

# Auto-remediation przez EventBridge (CloudFormation snippet)
# EventBridge rule: GuardDuty High finding → Lambda
# Lambda: izoluj instancję (zmień Security Group na deny-all), snapshot EBS, notify Slack

# Archiwizuj false-positive
aws guardduty archive-findings \\
  --detector-id $DETECTOR \\
  --finding-ids finding-id-1
`},{name:`SSM Parameter Store & Session Manager`,icon:`⚙️`,color:`#FF9900`,bundle:`ops`,complexity:`low`,when:`konfiguracja aplikacji, SSH do EC2 bez klucza i bastionu`,desc:`Systems Manager to zestaw narzędzi ops. Dwa najważniejsze:

Parameter Store:
• Hierarchiczne przechowywanie konfiguracji: /prod/database/host, /prod/api/key
• Standard (bezpłatny): do 10k parametrów, 4KB, no rotation
• Advanced ($0.05/param/mies): do 8KB, historyzacja wersji, TTL (wygasające hasła tymczasowe)
• SecureString: zaszyfrowany przez KMS
• Integruje się z CloudFormation, ECS, Lambda (env vars z SSM)

Session Manager (SSM Agent):
• SSH do EC2 BEZ otwartego portu 22, BEZ klucza SSH, BEZ bastionu
• Przez HTTPS (port 443) — przechodzi przez corporate firewalle
• Sesja logowana w CloudTrail, logi do S3/CloudWatch
• Port forwarding: \`aws ssm start-session\` → tunel do prywatnego RDS
`,code:`# Parameter Store — config aplikacji
aws ssm put-parameter \\
  --name /prod/checki/database/url \\
  --value "postgresql://host:5432/checki" \\
  --type SecureString \\
  --key-id alias/checki-prod

aws ssm put-parameter \\
  --name /prod/checki/app/debug \\
  --value "false" \\
  --type String

# Odczyt w aplikacji (Python)
# ssm = boto3.client('ssm')
# val = ssm.get_parameter(Name='/prod/checki/database/url', WithDecryption=True)
# db_url = val['Parameter']['Value']

# Session Manager — SSH bez klucza
# Wymagania: SSM Agent na EC2, rola IAM z AmazonSSMManagedInstanceCore
aws ssm start-session --target i-0abc123def456

# Port forwarding: lokalny :5433 → prywatny RDS :5432
aws ssm start-session \\
  --target i-0abc123def456 \\
  --document-name AWS-StartPortForwardingSessionToRemoteHost \\
  --parameters '{"portNumber":["5432"],"localPortNumber":["5433"],"host":["db.cluster.eu-west-1.rds.amazonaws.com"]}'
# Teraz: psql -h localhost -p 5433 checki_db
`},{name:`AWS Organizations — Multi-Account`,icon:`🏢`,color:`#FF9900`,bundle:`governance`,complexity:`high`,when:`zarządzanie wieloma kontami AWS w organizacji`,desc:`Centralny hub do zarządzania wieloma kontami AWS z jednego Management Account.

Struktura:
• Management Account (root): tworzy i zarządza organizacją, master billing
• Organizational Units (OU): grupy kont (Prod OU, Dev OU, Sandbox OU, Security OU)
• Member Accounts: indywidualne konta (prod, staging, dev, security, logging)

Service Control Policies (SCP):
Guardrails na poziomie OU lub konta — nadpisują nawet AdministratorAccess.
Przykład: "deny any action outside eu-west-1" = żaden użytkownik w tym OU nie może
deploy'ować do us-east-1, nawet root konta!

Dobre praktyki multi-account:
• Security Account: CloudTrail, GuardDuty, Security Hub z agregacją ze wszystkich kont
• Logging Account: centralny S3 na logi (S3 Object Lock = immutable)
• Shared Services Account: VPC, DNS, Active Directory
• Sandbox OU: konta dla developerów bez SCPs — eksperymentuj bez ryzyka dla prod

AWS Control Tower: managed multi-account setup z gotowymi guardrails, SSO, logging.
`,code:`# SCP: zabroń tworzenia zasobów poza regionem EU
aws organizations create-policy \\
  --name "EnforcEURegionOnly" \\
  --type SERVICE_CONTROL_POLICY \\
  --description "Deny all actions outside EU regions" \\
  --content '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotLike": {
          "aws:RequestedRegion": ["eu-west-1", "eu-central-1", "eu-west-2"]
        },
        "ArnNotLike": {
          "aws:PrincipalARN": "arn:aws:iam::*:role/InfraAdmin"
        }
      }
    }]
  }'

# Przypisz SCP do OU
aws organizations attach-policy \\
  --policy-id p-xxxx \\
  --target-id ou-xxxx

# Utwórz nowe konto w organizacji
aws organizations create-account \\
  --email dev-team@firma.pl \\
  --account-name "Checki Dev Environment"

# Assume Role w innym koncie (cross-account)
aws sts assume-role \\
  --role-arn "arn:aws:iam::DEV_ACCOUNT:role/OrganizationAccountAccessRole" \\
  --role-session-name deploy-session
`}]},rywale:{title:`Rywale — AWS vs inne platformy cloud`,items:[{name:`Microsoft Azure`,icon:`🔷`,desc:`Drugi największy cloud (22% rynku). Siłą Azure jest integracja z ekosystemem Microsoft.
Przewaga w enterprise: Windows Server, Active Directory, Office 365, .NET, Visual Studio.

Kiedy Azure wygrywa z AWS:
• Firma używa Active Directory → Azure AD (Entra ID) integruje się natywnie
• Stack Microsoft: C#/.NET, SQL Server, SharePoint, Teams, Power BI
• Hybrid cloud z on-premises Windows środowiskiem (Azure Arc, Azure Stack)
• DevOps: Azure DevOps (pipelines, boards, repos) to jedne z najlepszych narzędzi CI/CD
• Compliance w Europie: Microsoft ma bardzo dobre certyfikacje dla sektora publicznego

Gdzie AWS jest lepszy:
• Liczba serwisów (200+ vs ~100 w Azure)
• ML/AI: SageMaker vs Azure ML — AWS dojrzalszy
• Serverless: Lambda dojrzalsza niż Azure Functions
• Ekosystem partnerów i marketplace

Ekwiwalenty AWS → Azure:
EC2 → Azure VMs | S3 → Blob Storage | RDS → Azure SQL | Lambda → Azure Functions
ECS/EKS → AKS | CloudFront → Azure CDN | Route 53 → Azure DNS | IAM → Azure AD/RBAC
CloudFormation → ARM/Bicep | CloudTrail → Azure Monitor Activity Log | DynamoDB → Cosmos DB

Certyfikacja: AZ-900 (Fundamentals) → AZ-104 (Administrator) → AZ-305 (Solutions Architect)
`},{name:`Google Cloud Platform (GCP)`,icon:`🟡`,desc:`Trzeci gracz (10% rynku). Siłą GCP jest networking, Big Data i AI/ML (Google wynalazł Kubernetes,
Transformer, TensorFlow). Reputacja: najlepsza sieć globalna, najtańsze data transfer.

Kiedy GCP wygrywa:
• AI/ML: Vertex AI, TPU (własny chip ML), najszybszy dostęp do modeli Google (Gemini)
• Big Data native: BigQuery (serverless DW, PB w sekundy), Pub/Sub, Dataflow (Apache Beam)
• Kubernetes: GKE to najdojrzalszy managed K8s (Google stworzył K8s)
• Networking: sieć Google = CDN globalny z latency < 1ms między regionami
• Firebase: mobile backend (realtime DB, auth, hosting, analytics) = zero backend code
• Cena: często tańsze niż AWS przy sustained use (automatic discounts)

Gdzie AWS jest lepszy:
• Enterprise adoption i support
• Liczba serwisów i regionów
• Dojrzałość marktplace i ekosystemu partnerów

Ekwiwalenty AWS → GCP:
EC2 → Compute Engine | S3 → Cloud Storage | RDS → Cloud SQL | Lambda → Cloud Functions
EKS → GKE | CloudFront → Cloud CDN | Route 53 → Cloud DNS | DynamoDB → Firestore/Bigtable
Redshift → BigQuery | Kinesis → Pub/Sub | SageMaker → Vertex AI | CloudTrail → Cloud Audit Logs
`},{name:`DigitalOcean`,icon:`🌊`,desc:`Developer-friendly cloud dla startupów i indie developers. Proste UI, przewidywalne ceny,
świetna dokumentacja. Nie ma 200 serwisów AWS ale to bywa zaletą — nie gubisz się.

Mocne strony:
• Simplicity: Droplet gotowy w 55 sekund, UI dla ludzi
• Pricing: flat rate, zero niespodzianek — Droplet $6/mies = $6/mies (AWS to: EC2 + EBS + bandwidth + IPs)
• Dokumentacja: DigitalOcean tutorials to jedne z najlepszych w branży
• App Platform: Heroku-like PaaS — push git → deploy. Bez DevOps.
• Managed Kubernetes (DOKS): prostszy niż EKS, tańszy

Gdzie AWS wygrywa:
• Skala: DO nie obsłuży enterprise potrzeb
• Serwisy: brak managed ML, advanced security, CDN enterprise, etc.
• Compliance: ograniczone certyfikacje
• Globalne zasięg: ~15 datacenter vs AWS 30+ regionów

Kiedy wybrać DO:
Startup budujący MVP, personal projects, małe firmy (<50 pracowników),
aplikacje gdzie całkowity koszt DO ($6-200/mies) jest wystarczający.
Postgres, Redis, MySQL fully managed za ułamek ceny AWS RDS.
`},{name:`Hetzner Cloud`,icon:`🟠`,desc:`Europejski cloud z Niemiec. NAJTAŃSZY w przeliczeniu na wydajność/cenę.
Popularne szczególnie w Polsce, Niemczech, startupach bootstrapowych.

Dlaczego Hetzner:
• Cena: CX22 (2 vCPU, 4GB RAM) = €3.79/mies. AWS t3.small (2 vCPU, 2GB) = ~$18/mies.
• Lokalizacje EU: Falkenstein/Nuremberg (DE), Helsinki (FI), Ashburn (US), Singapore
• Prosta struktura cenowa: serwer + traffic (20TB/mies wliczone!)
• Object Storage (S3-compatible): €0.0117/GB/mies vs S3 $0.023/GB
• Block Storage, Managed LB, Firewall, Networks (VPC) — wszystko tanie i proste

Ograniczenia vs AWS:
• Zero managed serwisów: brak RDS, Lambda, ML, CDN (możesz samemu postawić)
• Mały ekosystem (brak Marketplace, partnerów)
• Support: community first, paid support ograniczony
• Compliance: nie ma HIPAA, SOC 2 itd.

Kiedy wybrać Hetzner:
Self-hosting: Postgres, Redis, Meilisearch, MinIO (S3-compatible), Gitea, Nextcloud.
Mikroserwisy gdzie chcesz kontrolę bez cloud vendor lock-in.
Developer środowiska, staging, projekty gdzie liczy się każde euro.
`},{name:`Vercel & Netlify — Serverless dla Frontend`,icon:`▲`,desc:`Nie bezpośredni rywal AWS ale alternatywa dla frontend deploymentu.
Abstrakcja nad AWS/GCP — zero DevOps dla statycznych stron i SSR.

Vercel:
• Twórcy Next.js — pierwszoklasowe wsparcie (ISR, Edge Functions, Server Actions)
• Deploy: \`git push\` → automatyczny preview URL → deploy do produkcji
• Edge Network: globalny CDN, Edge Runtime (V8 isolates, nie Node.js)
• Serverless Functions: API routes z Node.js/Edge
• Analytics: Core Web Vitals, real user monitoring
• Free tier: 100GB bandwidth, 6000 deployments/mies — w praktyce wystarczy dla projektów indie
• Kiedy płać: $20/mies Pro dla custom domains, większe limity, team features

Netlify:
• Bardziej generalistyczny: React, Vue, Angular, Gatsby, Hugo, Jekyll...
• Netlify Functions (Lambda wrapper), Forms, Identity (Cognito wrapper)
• Netlify Edge Functions (Deno runtime)
• Kiedy wybrać nad Vercel: nie-Next.js projekty, prostsze potrzeby

AWS Amplify vs Vercel:
Amplify to AWS odpowiedź na Vercel/Netlify — CI/CD dla frontend + backend (AppSync, Cognito).
Vercel ma lepszy DX dla Next.js; Amplify daje pełny AWS backend bez konfiguracji.

Praktyczna zasada:
Next.js projekt → Vercel. Inne frameworki → Netlify lub Cloudflare Pages.
Potrzebujesz backend AWS? → Amplify lub EC2/Lambda + CloudFront.
`}]},pluginy:{title:`AI & Big Data — Zaawansowane serwisy AWS`,items:[{name:`Amazon Bedrock — Generative AI`,icon:`🤖`,desc:`Managed generative AI — dostęp do top modeli LLM przez jeden API, bez zarządzania infrastrukturą.

Dostępne modele (2026):
• Anthropic Claude: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
• Amazon Titan: text, embeddings, images
• Meta Llama: Llama 3.1, Llama 3.2
• Mistral AI: Mistral Large, Mistral 7B
• Cohere: Command R+, embeddings
• Stability AI: Stable Diffusion (obrazy)

Funkcje:
• Knowledge Bases: RAG (Retrieval Augmented Generation) z S3 lub własnych danych
• Agents: multi-step reasoning, wywołuje Lambda/API tools automatycznie
• Guardrails: filtruj toxic content, PII, off-topic odpowiedzi
• Batch inference: przetwarzaj duże ilości dokumentów offline (taniej)
• Model fine-tuning: dostosuj model do Twoich danych (CustomizationJobs)

Cena: pay-per-token, np. Claude 3 Haiku: $0.00025/1K input, $0.00125/1K output
`,code:`# Konversacja z Claude przez Bedrock
import boto3
import json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [
            {"role": "user", "content": "Wyjaśnij czym jest VPC w AWS"}
        ]
    })
)

result = json.loads(response['body'].read())
print(result['content'][0]['text'])

# Streaming (dla UI real-time)
response = bedrock.invoke_model_with_response_stream(
    modelId='anthropic.claude-3-haiku-20240307-v1:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 512,
        "messages": [{"role": "user", "content": "Napisz funkcję Python sortowania"}]
    })
)
for event in response['body']:
    chunk = json.loads(event['chunk']['bytes'])
    if chunk['type'] == 'content_block_delta':
        print(chunk['delta']['text'], end='', flush=True)
`},{name:`SageMaker — ML Training i Deployment`,icon:`🧠`,desc:`Kompleksowa platforma ML — od danych do modelu produkcyjnego.
Nie musisz zarządzać infrastrukturą GPU ani serwerami inference.

Główne komponenty:
• Studio: Jupyter-based IDE w chmurze, pełny ML workflow
• Training Jobs: managed training na EC2 GPU (p3, g4dn, Trn1 — własne chipy Trainium)
• Automatic Model Tuning (HPO): optymalizuj hiperparametry automatycznie
• Endpoints: deploy modelu jako REST API (auto-scaling, A/B testing)
• Batch Transform: predykcje na dużych zbiorach bez serwera
• Feature Store: centralne przechowywanie cech ML dla wielu modeli
• Pipelines: MLOps — automatyczny retrain gdy drift danych
• Canvas: no-code ML dla biznesu
• JumpStart: gotowe modele (Hugging Face, scikit-learn, XGBoost, LLMs)
`,code:`import sagemaker
from sagemaker.pytorch import PyTorch

role = sagemaker.get_execution_role()
sess = sagemaker.Session()

# Training job na GPU
estimator = PyTorch(
    entry_point='train.py',
    role=role,
    instance_type='ml.g4dn.xlarge',  # GPU
    instance_count=1,
    framework_version='2.0',
    py_version='py310',
    hyperparameters={'epochs': 10, 'batch-size': 32},
    use_spot_instances=True,          # do 90% taniej!
    max_wait=3600,
)

estimator.fit({'train': 's3://moj-bucket/data/train/'})

# Deploy jako endpoint REST
predictor = estimator.deploy(
    initial_instance_count=1,
    instance_type='ml.t2.medium',
    endpoint_name='moj-model-v1',
)

# Predykcja
result = predictor.predict({"text": "Classify this document"})
print(result)
`},{name:`Amazon Rekognition — Computer Vision`,icon:`👁️`,desc:`Managed Computer Vision — rozpoznawanie twarzy, obiektów, tekstu, scen.
Zero ML knowledge wymagane — wywołujesz API, dostajesz wyniki.

Funkcje:
• Detect Labels: zidentyfikuj obiekty na zdjęciu (Car, Dog, Person, Tree + confidence %)
• Detect Faces: lokalizuj twarze, emocje, wiek, punkty charakterystyczne
• Face Comparison: porównaj twarz ze zdjęcia z kolekcją (auth, surveillance)
• Text in Image (OCR): odczytaj tekst ze zdjęć, dokumentów, tablic
• Content Moderation: wykryj nieodpowiedni content (nudity, violence) dla UGC platform
• Celebrity Recognition: rozpoznaj znane osoby
• Video Analysis: te same funkcje dla wideo, frame-by-frame
• Custom Labels: trenuj własny model vision na Twoich danych (no code)
`,code:`import boto3

rekognition = boto3.client('rekognition')

# Wykryj obiekty na zdjęciu
with open('zdjecie.jpg', 'rb') as f:
    response = rekognition.detect_labels(
        Image={'Bytes': f.read()},
        MaxLabels=10,
        MinConfidence=80
    )

for label in response['Labels']:
    print(f"{label['Name']}: {label['Confidence']:.1f}%")

# Wykryj twarze i emocje
response = rekognition.detect_faces(
    Image={'S3Object': {'Bucket': 'moj-bucket', 'Name': 'portret.jpg'}},
    Attributes=['ALL']
)
for face in response['FaceDetails']:
    dominant_emotion = max(face['Emotions'], key=lambda e: e['Confidence'])
    print(f"Emocja: {dominant_emotion['Type']} ({dominant_emotion['Confidence']:.0f}%)")
    print(f"Wiek: {face['AgeRange']['Low']}-{face['AgeRange']['High']}")

# Moderacja contentu
response = rekognition.detect_moderation_labels(
    Image={'S3Object': {'Bucket': 'ugc-bucket', 'Name': 'user_upload.jpg'}},
    MinConfidence=70
)
if response['ModerationLabels']:
    print("BLOCKED - inappropriate content:", [l['Name'] for l in response['ModerationLabels']])
`},{name:`Amazon Kinesis — Streaming Data`,icon:`🌊`,desc:`Platforma do przetwarzania danych w czasie rzeczywistym (streaming).
Cztery serwisy:

Kinesis Data Streams (KDS):
• Surowy strumień — producenci piszą, konsumenci czytają. Retencja 1-365 dni.
• Shards: jednostka przepustowości (1MB/s write, 2MB/s read per shard)
• Kiedy: niskie latency (<1s), custom consumer logic, wiele konsumentów jednocześnie
• Cena: $0.015/shard/h

Kinesis Data Firehose:
• Delivery stream — automatycznie dostarcza do S3/Redshift/OpenSearch/Splunk/HTTP
• Transformacje przez Lambda (filter, enrich, convert format)
• Kiedy: chcesz dane w S3 bez pisania konsumenta. Latency: 60-900s (buffering)
• Cena: $0.029/GB

Kinesis Data Analytics (Managed Apache Flink):
• SQL lub Apache Flink na danych streaming
• Wykryj anomalie, agreguj, joinuj strumienie w czasie rzeczywistym

Alternatywy: MSK (Managed Kafka — dojrzalszy protokół, cross-cloud)
`,code:`import boto3
import json

kinesis = boto3.client('kinesis')
STREAM = 'user-events'

# Producer — wysyłaj zdarzenia
def put_event(user_id: str, event: dict):
    kinesis.put_record(
        StreamName=STREAM,
        Data=json.dumps(event),
        PartitionKey=user_id  # events tego samego usera → ten sam shard (ordered)
    )

put_event('user-123', {'action': 'purchase', 'amount': 49.99, 'ts': 1749500000})

# Batch write (efektywniej)
kinesis.put_records(
    StreamName=STREAM,
    Records=[
        {'Data': json.dumps(e), 'PartitionKey': e['user_id']}
        for e in events
    ]
)

# Consumer — czytaj rekordy
shard_id = kinesis.list_shards(StreamName=STREAM)['Shards'][0]['ShardId']
iterator = kinesis.get_shard_iterator(
    StreamName=STREAM, ShardId=shard_id,
    ShardIteratorType='LATEST'
)['ShardIterator']

while True:
    response = kinesis.get_records(ShardIterator=iterator, Limit=100)
    for record in response['Records']:
        event = json.loads(record['Data'])
        process(event)
    iterator = response['NextShardIterator']
`},{name:`Amazon Athena — Serverless SQL na S3`,icon:`🔎`,desc:`Serverless query engine — pisz SQL, Athena skanuje dane w S3.
Zero infrastruktury, płacisz tylko za dane skanowane ($5 per TB).

Jak działa:
1. Dane w S3 (CSV, JSON, Parquet, ORC, Avro)
2. Zdefiniuj tabelę w Glue Data Catalog (schema on read)
3. \`SELECT * FROM moja_tabela WHERE date = '2026-06-10'\`
4. Athena używa Presto/Trino pod spodem

Optymalizacja (obowiązkowo!):
• Partycjonowanie: \`WHERE year=2026 AND month=06\` → skanuje 1/12 danych
• Parquet/ORC zamiast CSV: kompresja kolumnowa → 10-100x mniej skanowania
• Partition projection: eliminuje Glue catalog lookup dla dużych partycji
• Workgroups: limit danych per query, per user

Kiedy Athena zamiast Redshift:
• Nieregularne zapytania (raz dziennie/tydzień)
• Dane już są w S3 (VPC Flow Logs, CloudTrail, ALB Access Logs)
• Koszt: Athena ad-hoc jest tańsza; Redshift gdy robisz setki zapytań dziennie
`,code:`import boto3
import time

athena = boto3.client('athena')

# Utwórz tabelę (DDL)
CREATE_TABLE = """
CREATE EXTERNAL TABLE IF NOT EXISTS vpc_flow_logs (
  version INT, account_id STRING, interface_id STRING,
  srcaddr STRING, dstaddr STRING, srcport INT, dstport INT,
  protocol INT, packets BIGINT, bytes BIGINT,
  start_time BIGINT, end_time BIGINT, action STRING, log_status STRING
)
PARTITIONED BY (year STRING, month STRING, day STRING)
STORED AS PARQUET
LOCATION 's3://moje-flow-logs/vpc/'
TBLPROPERTIES ('parquet.compression'='SNAPPY');
"""

# Wykonaj zapytanie
def query(sql):
    resp = athena.start_query_execution(
        QueryString=sql,
        QueryExecutionContext={'Database': 'checki_analytics'},
        ResultConfiguration={'OutputLocation': 's3://athena-results/'}
    )
    qid = resp['QueryExecutionId']

    while True:
        status = athena.get_query_execution(QueryExecutionId=qid)['QueryExecution']['Status']['State']
        if status in ('SUCCEEDED', 'FAILED', 'CANCELLED'):
            break
        time.sleep(1)

    results = athena.get_query_results(QueryExecutionId=qid)
    return [[col['VarCharValue'] for col in row['Data']] for row in results['ResultSet']['Rows']]

rows = query("SELECT srcaddr, count(*) FROM vpc_flow_logs WHERE action='REJECT' GROUP BY srcaddr ORDER BY 2 DESC LIMIT 10")
`},{name:`Amazon SQS — kolejki komunikatów`,icon:`📬`,desc:`Simple Queue Service — managed message queue. Odsprzęga producenta od konsumenta.
Producer nie musi czekać na przetworzenie — wysyła i zapomina.

Standard Queue vs FIFO Queue:
• Standard: nearly unlimited throughput, at-least-once delivery, best-effort ordering
  → 1 wiadomość może przyjść 2x → konsument musi być idempotent
• FIFO: 300 TPS (3000 z batching), exactly-once, guaranteed order
  → droższa ($0.50/1M vs $0.40/1M), nazwane *.fifo

Ważne parametry:
• Visibility Timeout: wiadomość "znika" na czas przetwarzania (default 30s)
  Jeśli Lambda nie ukończy w tym czasie → wiadomość wraca na kolejkę
• Dead Letter Queue (DLQ): po N nieudanych próbach → wiadomość trafia tu
  Monitoruj DLQ przez alarm CloudWatch!
• Long Polling: zamiast "czy są wiadomości?" (short poll, kosztowne) → czekaj 20s
• Message Retention: 1 min do 14 dni (default 4 dni)

Pattern: Producer → SQS → Lambda (batch 1-10000 wiadomości) → baza danych
`,code:`import boto3
import json

sqs = boto3.client('sqs')

# Utwórz kolejkę
queue = sqs.create_queue(
    QueueName='checki-tasks',
    Attributes={
        'VisibilityTimeout': '60',
        'MessageRetentionPeriod': '86400',  # 1 dzień
        'RedrivePolicy': json.dumps({
            'deadLetterTargetArn': 'arn:aws:sqs:...:checki-tasks-dlq',
            'maxReceiveCount': '3'
        })
    }
)

# Wysyłanie (producer)
sqs.send_message(
    QueueUrl='https://sqs.eu-west-1.amazonaws.com/xxx/checki-tasks',
    MessageBody=json.dumps({'userId': 'u-123', 'action': 'generate_report'}),
    MessageGroupId='user-u-123',  # tylko FIFO
)

# Odbieranie (consumer)
messages = sqs.receive_message(
    QueueUrl='https://sqs.eu-west-1.amazonaws.com/xxx/checki-tasks',
    MaxNumberOfMessages=10,
    WaitTimeSeconds=20,  # long polling
).get('Messages', [])

for msg in messages:
    task = json.loads(msg['Body'])
    process(task)
    sqs.delete_message(
        QueueUrl='...',
        ReceiptHandle=msg['ReceiptHandle']  # usuń po przetworzeniu!
    )
`},{name:`Amazon EventBridge — Event Bus`,icon:`⚡`,desc:`Serverless event bus — routing zdarzeń między serwisami AWS, SaaS i Twoimi aplikacjami.
Następca SNS dla event-driven architectures.

Koncepcje:
• Event Bus: kanał na zdarzenia (Default — zdarzenia AWS serwisów, Custom — Twoje, Partner — SaaS)
• Rule: wzorzec dopasowania zdarzenia → target (Lambda, SQS, SNS, Step Functions, ECS, API GW)
• Event Pattern: JSON pattern matching — filtruj zdarzenia po source, detail-type, polu w detail
• Schema Registry: autodiscovery schematów zdarzeń, generuj typy TypeScript/Java/Python
• Scheduler: cron/rate expressions (zastępuje CloudWatch Events)
• Pipes: połącz SQS/DynamoDB Streams/Kinesis → filter → enrich (Lambda/EventBridge API) → target

Event-driven patterns:
• Fan-out: S3 PutObject → EventBridge → 3 Lambdy (thumbnail, index, notify)
• CQRS: command → SQS → handler → EventBridge event → read-model updater
• Choreography: mikroser A emituje event → B, C, D reagują niezależnie
`,code:`# Rule: gdy S3 upload → Lambda thumbnail generator
aws events put-rule \\
  --name s3-new-image-rule \\
  --event-pattern '{
    "source": ["aws.s3"],
    "detail-type": ["Object Created"],
    "detail": {
      "bucket": {"name": ["checki-uploads"]},
      "object": {"key": [{"suffix": ".jpg"}, {"suffix": ".png"}]}
    }
  }' \\
  --state ENABLED

aws events put-targets \\
  --rule s3-new-image-rule \\
  --targets '[{
    "Id": "thumbnail-lambda",
    "Arn": "arn:aws:lambda:...:thumbnail-generator"
  }]'

# Custom Event Bus — mikroser wysyła event
import boto3
events = boto3.client('events')
events.put_events(Entries=[{
    'Source': 'checki.orders',
    'DetailType': 'OrderPlaced',
    'Detail': json.dumps({'orderId': 'o-123', 'amount': 99.99}),
    'EventBusName': 'checki-bus'
}])

# Scheduler — cron task co dzień o 2:00 UTC
aws scheduler create-schedule \\
  --name daily-cleanup \\
  --schedule-expression 'cron(0 2 * * ? *)' \\
  --target '{"Arn":"arn:aws:lambda:...:cleanup","RoleArn":"arn:aws:iam::...:role/scheduler"}' \\
  --flexible-time-window '{"Mode":"OFF"}'
`},{name:`AWS Step Functions — Orkiestracja Workflow`,icon:`🔄`,desc:`Serverless workflow engine — wizualny designer + JSON state machine.
Orkiestruj Lambdy, ECS tasks, SageMaker, Bedrock, DynamoDB bez pisania "glue code".

Typy workflow:
• Standard (Express: <5min, $0.00001/state; Standard: długotrwałe, $0.025/1k transitions):
  Standard: długotrwałe workflow (dni), exactly-once, pełna historia wykonania
  Express: high-volume, krótkokrótkie (IoT, streaming, API backend)

State Types:
• Task: wywołaj serwis (Lambda, ECS, Bedrock, HTTP API)
• Choice: if/else branching
• Parallel: wykonaj gałęzie równolegle, poczekaj na wszystkie
• Map: foreach — iteruj po tablicy (przetworz 1000 plików równolegle)
• Wait: poczekaj N sekund lub do konkretnej daty
• Pass, Succeed, Fail: flow control

Kiedy Step Functions zamiast Lambda chain:
• Workflow trwa >15 min (Lambda limit)
• Potrzebujesz retry z exponential backoff
• Chcesz wizualizację co poszło nie tak (execution history)
• Branching, parallel processing, human approval steps
`,code:`# State machine (JSON/ASL) — order processing workflow
{
  "Comment": "Order processing pipeline",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:validate-order",
      "Retry": [{"ErrorEquals": ["Lambda.ServiceException"], "IntervalSeconds": 2, "MaxAttempts": 3, "BackoffRate": 2}],
      "Next": "ProcessPayment",
      "Catch": [{"ErrorEquals": ["ValidationError"], "Next": "OrderFailed"}]
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke.waitForTaskToken",
      "Parameters": {
        "FunctionName": "process-payment",
        "Payload": {"taskToken.$": "$$.Task.Token", "order.$": "$"}
      },
      "HeartbeatSeconds": 3600,
      "Next": "FulfillOrder"
    },
    "FulfillOrder": {
      "Type": "Parallel",
      "Branches": [
        {"StartAt": "ShipItem", "States": {"ShipItem": {"Type": "Task", "Resource": "...", "End": true}}},
        {"StartAt": "SendEmail", "States": {"SendEmail": {"Type": "Task", "Resource": "...", "End": true}}}
      ],
      "End": true
    },
    "OrderFailed": {
      "Type": "Fail",
      "Cause": "Validation failed"
    }
  }
}
`},{name:`Amazon Comprehend — NLP`,icon:`📝`,desc:`Managed Natural Language Processing — analiza tekstu bez wiedzy o ML.

Funkcje:
• Sentiment Analysis: Positive/Negative/Neutral/Mixed dla tekstów (reviews, tweets, support tickets)
• Named Entity Recognition (NER): osoby, miejsca, organizacje, daty, kwoty
• Key Phrases: automatyczne wyciąganie kluczowych fraz
• Language Detection: 100 języków
• PII Detection: numery kart kredytowych, PESEL, emaile, telefony → compliance
• Topic Modeling: grupuj dokumenty po tematach (LDA)
• Custom Classification: trenuj własny classifier bez ML (wystarczy labelled examples)
• Custom NER: wykrywaj własne typy encji (numer produktu, kod błędu)

Comprehend Medical (osobny serwis):
HIPAA-eligible — wyciąga diagnozę, leki, procedury z tekstu medycznego.
`,code:`import boto3

comprehend = boto3.client('comprehend')

text = "Zamówiłem laptop Lenovo ThinkPad za 4500 PLN. Dostawa była super szybka!"

# Sentiment
s = comprehend.detect_sentiment(Text=text, LanguageCode='pl')
print(f"Sentiment: {s['Sentiment']}")  # POSITIVE

# Encje
ner = comprehend.detect_entities(Text=text, LanguageCode='pl')
for ent in ner['Entities']:
    print(f"{ent['Type']}: {ent['Text']} ({ent['Score']:.0%})")
# TITLE: ThinkPad (96%), QUANTITY: 4500 PLN (98%)

# PII — GDPR compliance
pii = comprehend.detect_pii_entities(
    Text="Kontakt: jan.kowalski@email.com, tel. 500-600-700",
    LanguageCode='en'
)
for p in pii['Entities']:
    print(f"PII [{p['Type']}] pozycja {p['BeginOffset']}-{p['EndOffset']}")

# Batch analysis (tańsze dla dużych wolumenów)
response = comprehend.batch_detect_sentiment(
    TextList=["Świetny produkt!", "Tragiczna obsługa", "Normalnie"],
    LanguageCode='pl'
)
`},{name:`Amazon Textract — Document AI`,icon:`📄`,desc:`Wyciągaj tekst, tabele i formularze z zeskanowanych dokumentów, PDF, zdjęć.
Idzie dalej niż OCR — rozumie strukturę dokumentu.

Funkcje:
• DetectDocumentText: podstawowe OCR — zwraca bloki tekstu z pozycją
• AnalyzeDocument: Forms (key-value pairs z formularzy), Tables (komórki z pozycją)
• AnalyzeExpense: faktury i paragony — vendor, total, data, pozycje
• AnalyzeID: dowody osobiste i paszporty — name, dob, id number
• Queries: "Co jest w polu Data urodzenia?" — Textract szuka w dokumencie

Typowe zastosowania:
• Automatyczne przetwarzanie faktur → AP automation
• KYC: weryfikacja tożsamości przy rejestracji
• Digitalizacja archiwów papierowych
• Wyciąganie danych z umów (w połączeniu z Comprehend)
`,code:`import boto3

textract = boto3.client('textract')

# Async dla dużych PDF (wielostronicowe)
response = textract.start_document_analysis(
    DocumentLocation={
        'S3Object': {'Bucket': 'docs-bucket', 'Name': 'faktura.pdf'}
    },
    FeatureTypes=['TABLES', 'FORMS']
)
job_id = response['JobId']

# Poczekaj na wynik
import time
while True:
    result = textract.get_document_analysis(JobId=job_id)
    if result['JobStatus'] in ('SUCCEEDED', 'FAILED'):
        break
    time.sleep(2)

# Przetworz key-value pairs (formularz)
key_map, value_map, block_map = {}, {}, {}
for block in result['Blocks']:
    block_map[block['Id']] = block
    if block['BlockType'] == 'KEY_VALUE_SET':
        if 'KEY' in block.get('EntityTypes', []):
            key_map[block['Id']] = block
        else:
            value_map[block['Id']] = block

# Wyciągnij pary klucz-wartość
for key_block in key_map.values():
    key_text = ' '.join(w['Text'] for w in ... if w['BlockType'] == 'WORD')
    # → "Numer faktury:", "Data:", "Suma do zapłaty:"
`},{name:`Amazon Bedrock Knowledge Bases — RAG`,icon:`📚`,desc:`Managed RAG (Retrieval Augmented Generation) — połącz LLM z Twoją wiedzą firmową.
Zero budowania pipeline wektorowego — upload dokumentów, gotowe.

Jak działa:
1. Upload: PDF, Word, TXT, HTML, CSV → S3
2. Ingestion: Bedrock chunking + embedding (Amazon Titan Embeddings lub Cohere)
3. Index: wektory w OpenSearch Serverless, Pinecone, Weaviate lub Aurora pgvector
4. Retrieve: zapytanie → embedding → similarity search → top-K chunks
5. Generate: chunks + pytanie → LLM → odpowiedź z cytowaniem źródeł

Customization:
• Chunking: fixed size, semantic, hierarchical
• Custom embedding model
• Filtry metadanych: przeszukuj tylko dokumenty z tag='legal'
• Guardrails: filtruj odpowiedzi Knowledge Base

Cena: $0.10/1k chunks ingestion + embedding cost + vector store cost
`,code:`import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')

# Retrieve + Generate (RAG query)
response = bedrock_agent.retrieve_and_generate(
    input={'text': 'Jakie są zasady urlopu według polityki firmy?'},
    retrieveAndGenerateConfiguration={
        'type': 'KNOWLEDGE_BASE',
        'knowledgeBaseConfiguration': {
            'knowledgeBaseId': 'KB12345',
            'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0',
            'retrievalConfiguration': {
                'vectorSearchConfiguration': {
                    'numberOfResults': 5,
                    'filter': {
                        'equals': {'key': 'department', 'value': 'hr'}
                    }
                }
            }
        }
    }
)

print(response['output']['text'])
print("\\nŹródła:")
for ref in response['citations']:
    for loc in ref['retrievedReferences']:
        print(f"- {loc['location']['s3Location']['uri']}")
`},{name:`Amazon Amplify — Full-stack bez DevOps`,icon:`⚡`,desc:`Platforma dla full-stack aplikacji webowych i mobilnych — zero konfiguracji infrastruktury.
Twórcy frontendu mogą dodać backend bez znajomości AWS.

Co oferuje:
• Hosting: CI/CD, globalny CDN, preview URLs per branch, custom domeny
• Auth: Cognito pod spodem, gotowy UI (email, social, SAML)
• Data (GraphQL API): AppSync + DynamoDB, generuje TypeScript types
• Storage: S3 z granularnym dostępem (public/protected/private per user)
• Functions: Lambda za API routes
• Push Notifications: Pinpoint pod spodem

Amplify Gen 2 (2024+):
TypeScript-first IaC — definiujesz backend w TS, Amplify deploy'uje CloudFormation.
\`\`\`typescript
// amplify/auth/resource.ts
export const auth = defineAuth({ loginWith: { email: true } });
\`\`\`

Framework integrations: React, Next.js, Vue, Angular, Flutter, React Native, Swift, Kotlin.

Kiedy NIE używać Amplify:
Kompleksowy backend z niestandardową logiką → użyj Lambda + API GW + CDK bezpośrednio.
Amplify ogranicza Cię do jego abstrakcji.
`,code:`# Instalacja i init (Next.js)
npm create amplify@latest
cd moj-projekt && npx ampx sandbox  # lokalne środowisko dev

# amplify/data/resource.ts
import { a, defineData, ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    name: a.string().required(),
    email: a.email().required(),
    posts: a.hasMany('Post', 'userId'),
  }).authorization(allow => [allow.owner()]),

  Post: a.model({
    title: a.string().required(),
    content: a.string(),
    userId: a.id().required(),
    author: a.belongsTo('User', 'userId'),
  }).authorization(allow => [allow.owner(), allow.authenticated().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });

# Deploy
npx ampx pipeline-deploy --branch main --app-id AMPLIFY_APP_ID

# Frontend (React) — automatyczny TypeScript client
# import { generateClient } from 'aws-amplify/data';
# import type { Schema } from '@/amplify/data/resource';
# const client = generateClient<Schema>();
# const { data: posts } = await client.models.Post.list();
`}]},komendy:{title:`AWS CLI — Komendy i automatyzacja`,groups:[{name:`Konfiguracja CLI`,icon:`⚙️`,commands:[{desc:`Konfiguruj profil (klucze + region + format)`,code:`aws configure`},{desc:`Konfiguruj nazwany profil`,code:`aws configure --profile prod`},{desc:`Sprawdź tożsamość (konto + user/role)`,code:`aws sts get-caller-identity`},{desc:`Lista skonfigurowanych profili`,code:`aws configure list-profiles`},{desc:`Wyświetl bieżącą konfigurację`,code:`aws configure list`},{desc:`Ustaw profil na czas sesji`,code:`export AWS_PROFILE=prod`},{desc:`Wersja CLI`,code:`aws --version`},{desc:`Wymuś output w tabeli`,code:`aws ec2 describe-regions --output table`},{desc:`Wymuś output w tekście (skrypty)`,code:`aws sts get-caller-identity --output text --query Account`}]},{name:`EC2 — Instancje`,icon:`🖥️`,commands:[{desc:`Lista uruchomionych instancji (ID + nazwa + stan)`,code:"aws ec2 describe-instances --filters Name=instance-state-name,Values=running --query 'Reservations[].Instances[].[InstanceId,Tags[?Key==`Name`].Value|[0],State.Name]' --output table"},{desc:`Uruchom instancję EC2`,code:`aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name moj-klucz --subnet-id subnet-xxx --security-group-ids sg-xxx --count 1`},{desc:`Zatrzymaj instancję`,code:`aws ec2 stop-instances --instance-ids i-0abc123`},{desc:`Uruchom zatrzymaną instancję`,code:`aws ec2 start-instances --instance-ids i-0abc123`},{desc:`Zakończ (usuń) instancję`,code:`aws ec2 terminate-instances --instance-ids i-0abc123`},{desc:`Opisz Security Group`,code:`aws ec2 describe-security-groups --group-ids sg-xxx`},{desc:`Dodaj regułę Security Group (HTTPS in)`,code:`aws ec2 authorize-security-group-ingress --group-id sg-xxx --protocol tcp --port 443 --cidr 0.0.0.0/0`},{desc:`Pobierz publiczne IP instancji`,code:`aws ec2 describe-instances --instance-ids i-0abc123 --query 'Reservations[0].Instances[0].PublicIpAddress' --output text`},{desc:`Utwórz AMI (snapshot instancji)`,code:`aws ec2 create-image --instance-id i-0abc123 --name "prod-backup-$(date +%Y%m%d)"`}]},{name:`S3 — Przechowywanie`,icon:`🪣`,commands:[{desc:`Lista bucketów`,code:`aws s3 ls`},{desc:`Lista zawartości bucketa`,code:`aws s3 ls s3://moj-bucket/`},{desc:`Utwórz bucket`,code:`aws s3 mb s3://moj-nowy-bucket --region eu-west-1`},{desc:`Wgraj plik`,code:`aws s3 cp lokalny-plik.txt s3://moj-bucket/folder/`},{desc:`Pobierz plik`,code:`aws s3 cp s3://moj-bucket/folder/plik.txt .`},{desc:`Synchronizuj lokalny folder z S3`,code:`aws s3 sync ./dist s3://moj-bucket/`},{desc:`Synchronizuj tylko zmiany (delete pliki usuniętych lokalnie)`,code:`aws s3 sync ./dist s3://moj-bucket/ --delete`},{desc:`Usuń plik z S3`,code:`aws s3 rm s3://moj-bucket/stary-plik.txt`},{desc:`Usuń wszystko z folderu`,code:`aws s3 rm s3://moj-bucket/stary-folder/ --recursive`},{desc:`Presigned URL (dostęp na 1h bez auth)`,code:`aws s3 presign s3://moj-bucket/plik.pdf --expires-in 3600`},{desc:`Włącz static website hosting`,code:`aws s3 website s3://moj-bucket/ --index-document index.html --error-document 404.html`},{desc:`Rozmiar bucketa`,code:`aws s3 ls s3://moj-bucket --recursive --human-readable --summarize`}]},{name:`Lambda — Funkcje bezserwerowe`,icon:`λ`,commands:[{desc:`Lista funkcji Lambda`,code:`aws lambda list-functions --query 'Functions[].[FunctionName,Runtime,LastModified]' --output table`},{desc:`Utwórz funkcję Lambda (z pliku zip)`,code:`zip function.zip handler.py && aws lambda create-function --function-name moja-funkcja --runtime python3.12 --role arn:aws:iam::xxx:role/lambda-role --handler handler.lambda_handler --zip-file fileb://function.zip`},{desc:`Zaktualizuj kod funkcji`,code:`zip function.zip handler.py && aws lambda update-function-code --function-name moja-funkcja --zip-file fileb://function.zip`},{desc:`Wywołaj funkcję synchronicznie`,code:`aws lambda invoke --function-name moja-funkcja --payload '{"key":"value"}' response.json && cat response.json`},{desc:`Wywołaj funkcję asynchronicznie`,code:`aws lambda invoke --function-name moja-funkcja --invocation-type Event --payload '{"key":"value"}' /dev/null`},{desc:`Sprawdź logi ostatniego wywołania`,code:`aws lambda invoke --function-name moja-funkcja --log-type Tail output.json --query 'LogResult' --output text | base64 -d`},{desc:`Ustaw zmienną środowiskową`,code:`aws lambda update-function-configuration --function-name moja-funkcja --environment 'Variables={DB_URL=postgres://host/db,LOG_LEVEL=INFO}'`},{desc:`Opublikuj wersję (immutable snapshot)`,code:`aws lambda publish-version --function-name moja-funkcja --description "v1.2.0"`},{desc:`Usuń funkcję`,code:`aws lambda delete-function --function-name moja-funkcja`}]},{name:`ECS / ECR — Kontenery`,icon:`🐳`,commands:[{desc:`Zaloguj Docker do ECR`,code:`aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.eu-west-1.amazonaws.com`},{desc:`Utwórz repozytorium ECR`,code:`aws ecr create-repository --repository-name moja-aplikacja --image-scanning-configuration scanOnPush=true`},{desc:`Zbuduj i wypchnij obraz do ECR`,code:`docker build -t moja-aplikacja . && docker tag moja-aplikacja:latest 123456789.dkr.ecr.eu-west-1.amazonaws.com/moja-aplikacja:latest && docker push 123456789.dkr.ecr.eu-west-1.amazonaws.com/moja-aplikacja:latest`},{desc:`Lista klastrów ECS`,code:`aws ecs list-clusters`},{desc:`Lista serwisów w klastrze`,code:`aws ecs list-services --cluster prod-cluster`},{desc:`Status serwisu ECS`,code:`aws ecs describe-services --cluster prod-cluster --services prod-api`},{desc:`Force new deployment (aktualizuj serwis)`,code:`aws ecs update-service --cluster prod-cluster --service prod-api --force-new-deployment`},{desc:`Lista tasków w serwisie`,code:`aws ecs list-tasks --cluster prod-cluster --service-name prod-api`},{desc:`Exec do uruchomionego kontenera (jak docker exec)`,code:`aws ecs execute-command --cluster prod-cluster --task arn:aws:ecs:... --container app --interactive --command "/bin/bash"`}]},{name:`RDS / DynamoDB — Bazy danych`,icon:`🗄️`,commands:[{desc:`Lista instancji RDS`,code:`aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,DBInstanceStatus,Endpoint.Address]' --output table`},{desc:`Utwórz instancję RDS PostgreSQL`,code:`aws rds create-db-instance --db-instance-identifier prod-db --db-instance-class db.t3.micro --engine postgres --engine-version 15 --master-username admin --manage-master-user-password --allocated-storage 20 --no-publicly-accessible`},{desc:`Snapshot RDS (backup ręczny)`,code:`aws rds create-db-snapshot --db-instance-identifier prod-db --db-snapshot-identifier prod-db-snap-$(date +%Y%m%d)`},{desc:`Uruchom zapytanie przez eksport (Data API)`,code:`aws rds-data execute-statement --resource-arn arn:aws:rds:... --secret-arn arn:aws:secretsmanager:... --database checki --sql "SELECT count(*) FROM users"`},{desc:`Utwórz tabelę DynamoDB`,code:`aws dynamodb create-table --table-name Users --attribute-definitions AttributeName=userId,AttributeType=S --key-schema AttributeName=userId,KeyType=HASH --billing-mode PAY_PER_REQUEST`},{desc:`Dodaj item do DynamoDB`,code:`aws dynamodb put-item --table-name Users \\
  --item '{"userId":{"S":"u-123"},"name":{"S":"Jan"},"email":{"S":"jan@example.com"}}'
`},{desc:`Pobierz item z DynamoDB`,code:`aws dynamodb get-item --table-name Users \\
  --key '{"userId":{"S":"u-123"}}'
`},{desc:`Zapytanie DynamoDB (query)`,code:`aws dynamodb query --table-name Users \\
  --key-condition-expression "userId = :uid" \\
  --expression-attribute-values '{":uid":{"S":"u-123"}}'
`},{desc:`Scan tabeli DynamoDB`,code:`aws dynamodb scan --table-name Users \\
  --filter-expression "active = :true" \\
  --expression-attribute-values '{":true":{"BOOL":true}}'
`}]},{name:`IAM — Tożsamość i dostęp`,icon:`🔐`,commands:[{desc:`Lista użytkowników IAM`,code:`aws iam list-users --query 'Users[].[UserName,CreateDate]' --output table`},{desc:`Utwórz użytkownika`,code:`aws iam create-user --user-name developer-jan`},{desc:`Dołącz politykę do użytkownika`,code:`aws iam attach-user-policy --user-name developer-jan --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`},{desc:`Utwórz grupę i dołącz politykę`,code:`aws iam create-group --group-name developers && aws iam attach-group-policy --group-name developers --policy-arn arn:aws:iam::aws:policy/PowerUserAccess`},{desc:`Dodaj użytkownika do grupy`,code:`aws iam add-user-to-group --user-name developer-jan --group-name developers`},{desc:`Utwórz rolę (dla Lambda)`,code:`aws iam create-role --role-name lambda-exec --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'`},{desc:`Klucz dostępu dla użytkownika`,code:`aws iam create-access-key --user-name developer-jan`},{desc:`Lista ról IAM`,code:`aws iam list-roles --query 'Roles[].[RoleName,Description]' --output table`},{desc:`Symuluj uprawnienia (czy mam dostęp?)`,code:`aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::xxx:user/developer-jan --action-names s3:PutObject --resource-arns arn:aws:s3:::moj-bucket/*`}]},{name:`CloudWatch — Monitoring`,icon:`📊`,commands:[{desc:`Lista alarmów CloudWatch`,code:`aws cloudwatch describe-alarms --state-value ALARM --query 'MetricAlarms[].[AlarmName,StateValue,MetricName]' --output table`},{desc:`Metryki CPU dla instancji EC2`,code:`aws cloudwatch get-metric-statistics --metric-name CPUUtilization --namespace AWS/EC2 --dimensions Name=InstanceId,Value=i-0abc123 --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) --end-time $(date -u +%Y-%m-%dT%H:%M:%S) --period 300 --statistics Average`},{desc:`Pobierz logi z Log Group`,code:`aws logs get-log-events --log-group-name /aws/lambda/moja-funkcja --log-stream-name $(aws logs describe-log-streams --log-group-name /aws/lambda/moja-funkcja --order-by LastEventTime --descending --query 'logStreams[0].logStreamName' --output text)`},{desc:`Szukaj w logach (filter-log-events)`,code:`aws logs filter-log-events --log-group-name /aws/lambda/moja-funkcja --filter-pattern "ERROR" --start-time $(($(date +%s) - 3600))000`},{desc:`Tail logów na żywo (wymaga awslogs lub CloudWatch Live Tail)`,code:`aws logs tail /aws/lambda/moja-funkcja --follow`},{desc:`Utwórz alarm CPU`,code:`aws cloudwatch put-metric-alarm --alarm-name high-cpu --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 60 --evaluation-periods 5 --threshold 80 --comparison-operator GreaterThanThreshold --dimensions Name=InstanceId,Value=i-0abc123 --alarm-actions arn:aws:sns:eu-west-1:xxx:alerts`}]},{name:`CloudFormation — IaC`,icon:`📋`,commands:[{desc:`Deploy stack z pliku YAML`,code:`aws cloudformation deploy --stack-name moj-stack --template-file infra.yaml --capabilities CAPABILITY_IAM`},{desc:`Deploy z parametrami`,code:`aws cloudformation deploy --stack-name moj-stack --template-file infra.yaml --parameter-overrides Env=prod InstanceType=t3.small --capabilities CAPABILITY_IAM`},{desc:`Status stack`,code:`aws cloudformation describe-stacks --stack-name moj-stack --query 'Stacks[0].StackStatus'`},{desc:`Lista zasobów w stack`,code:`aws cloudformation list-stack-resources --stack-name moj-stack --query 'StackResourceSummaries[].[LogicalResourceId,ResourceType,ResourceStatus]' --output table`},{desc:`Outputy stack (np. endpoint URL)`,code:`aws cloudformation describe-stacks --stack-name moj-stack --query 'Stacks[0].Outputs'`},{desc:`Usuń stack`,code:`aws cloudformation delete-stack --stack-name moj-stack`},{desc:`Waliduj template`,code:`aws cloudformation validate-template --template-body file://infra.yaml`},{desc:`Drift detection (czy ktoś zmienił zasoby poza CF?)`,code:`aws cloudformation detect-stack-drift --stack-name moj-stack && aws cloudformation describe-stack-drift-detection-status --stack-drift-detection-id xxx`}]},{name:`Przydatne wzorce CLI`,icon:`💡`,commands:[{desc:`Wszystkie zasoby z tagiem Env=prod (Resource Groups Tagging API)`,code:`aws resourcegroupstaggingapi get-resources --tag-filters Key=Env,Values=prod --query 'ResourceTagMappingList[].[ResourceARN]' --output text`},{desc:`Koszt bieżącego miesiąca`,code:`aws ce get-cost-and-usage --time-period Start=$(date +%Y-%m-01),End=$(date +%Y-%m-%d) --granularity MONTHLY --metrics UnblendedCost --query 'ResultsByTime[0].Total.UnblendedCost'`},{desc:`Zmień region jednorazowo`,code:`aws ec2 describe-instances --region us-east-1`},{desc:`JMESPath — wyciągnij konkretne pole`,code:"aws ec2 describe-instances --query 'Reservations[].Instances[?State.Name==`running`].[InstanceId,PublicIpAddress]' --output table"},{desc:`Oczekuj na zakończenie operacji (waiter)`,code:`aws ec2 wait instance-running --instance-ids i-0abc123`},{desc:`Export zmiennych z Secrets Manager do env`,code:`export $(aws secretsmanager get-secret-value --secret-id prod/app/env --query SecretString --output text | python3 -c "import json,sys; [print(f'{k}={v}') for k,v in json.load(sys.stdin).items()]")`},{desc:`Assume Role i eksportuj credentials`,code:`eval $(aws sts assume-role --role-arn arn:aws:iam::xxx:role/AdminRole --role-session-name sess --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text | awk '{print "export AWS_ACCESS_KEY_ID="$1"\\nexport AWS_SECRET_ACCESS_KEY="$2"\\nexport AWS_SESSION_TOKEN="$3}')`},{desc:`Wyczyść stare AMI (starsze niż 30 dni)`,code:"aws ec2 describe-images --owners self --query 'Images[?CreationDate<=`2026-05-01`].[ImageId,Name]' --output text | awk '{print $1}' | xargs -I{} aws ec2 deregister-image --image-id {}"}]}]}}},Y=`podstawy`,jn=`react`,Mn={react:Zt,fastapi:tn,pytest:on,requests:un,beautifulsoup:fn,asyncio:gn,git:vn,docker:Sn,pyautogui:wn,mcp:On,aws:An};function Nn(e){let t=document.getElementById(`fw-detail-overlay`);if(!t)return;let n=e.name.toLowerCase().replace(/[^a-z0-9]/g,``);jn=n,Y=`podstawy`;let r=Mn[n]||null,i=e.color||`#61dafb`,a=r&&r.meta&&r.meta.color2?r.meta.color2:i;t.style.setProperty(`--fw-color`,i),t.style.setProperty(`--fw-color-2`,a),r?Fn(e,r,t):In(e,t),t.classList.add(`fw-detail--visible`),document.addEventListener(`keydown`,X)}function Pn(){let e=document.getElementById(`fw-detail-overlay`);e&&e.classList.remove(`fw-detail--visible`),document.removeEventListener(`keydown`,X)}function X(e){e.key===`Escape`&&Pn()}function Fn(e,t,n){Wt(t.content.komendy||null);let r=t.meta&&t.meta.icon?t.meta.icon:e.icon,i=t.tabs.map(e=>`<button class="fwd-tab`+(e.id===Y?` active`:``)+`" onclick="switchDetailTab('`+e.id+`')">`+e.label+`</button>`).join(``);n.innerHTML=`<div class="fwd-header"><button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button><div class="fwd-header-icon">`+r+`</div><div class="fwd-header-info"><div class="fwd-header-name" style="background:linear-gradient(90deg,var(--fw-color),var(--fw-color-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">`+t.meta.name+`</div><div class="fwd-header-tagline">`+t.meta.tagline+`</div></div><div class="fwd-header-badges"><span class="fwd-badge">`+t.meta.lang+`</span><span class="fwd-badge">od `+t.meta.year+`</span><span class="fwd-badge">⭐ `+t.meta.stars+`</span></div></div><div class="fwd-tabs">`+i+`</div><div class="fwd-content" id="fwd-content"></div>`,Rn(Y,t)}function In(e,t){t.innerHTML=`<div class="fwd-header"><button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button><div class="fwd-header-icon">`+e.icon+`</div><div class="fwd-header-info"><div class="fwd-header-name" style="color:`+(e.color||`#888`)+`">`+e.name+`</div><div class="fwd-header-tagline">`+e.desc+`</div></div></div><div class="fwd-content"><div class="fwd-coming-soon"><div class="fwd-coming-icon">`+e.icon+`</div><div>Szczegóły <strong>`+e.name+`</strong> wkrótce...</div></div></div>`}function Ln(e){Y=e,document.querySelectorAll(`.fwd-tab`).forEach(e=>e.classList.remove(`active`));let t=document.querySelector(`.fwd-tab[onclick*="'`+e+`'"]`);t&&t.classList.add(`active`);let n=Mn[jn];n&&Rn(e,n)}function Z(e){return e&&Array.isArray(e.items)}function Rn(e,t){let n=document.getElementById(`fwd-content`);if(!n)return;n.scrollTop=0;let r=t.meta||{};switch(e){case`podstawy`:n.innerHTML=It(t.content.podstawy,r);break;case`komponenty`:n.innerHTML=Z(t.content.komponenty)?K(t.content.komponenty,r):Lt(t.content.komponenty,r);break;case`hooki`:n.innerHTML=Z(t.content.hooki)?K(t.content.hooki,r):Rt(t.content.hooki);break;case`routing`:n.innerHTML=Z(t.content.routing)?K(t.content.routing,r):zt(t.content.routing,r);break;case`state`:n.innerHTML=Z(t.content.state)?K(t.content.state,r):Bt(t.content.state);break;case`rywale`:n.innerHTML=Z(t.content.rywale)?K(t.content.rywale,r):Vt(t.content.rywale);break;case`pluginy`:n.innerHTML=Z(t.content.pluginy)?K(t.content.pluginy,r):Ht(t.content.pluginy);break;case`komendy`:n.innerHTML=Ut(t.content.komendy);break;default:n.innerHTML=`<div class="fwd-coming-soon"><div>Wkrótce...</div></div>`}}document.addEventListener(`DOMContentLoaded`,function(){if(!document.getElementById(`fw-detail-overlay`)){let e=document.createElement(`div`);e.id=`fw-detail-overlay`,document.body.appendChild(e)}});var zn={from:{opis:`Importuje konkretną funkcję lub klasę z modułu.`,przyklad:`from os import path`,kat:`słowo kluczowe`},import:{opis:`Ładuje moduł (bibliotekę) żebyś mógł użyć jego funkcji.`,przyklad:`import os`,kat:`słowo kluczowe`},def:{opis:`Definiuje nową funkcję — blok kodu który można wielokrotnie wywoływać.`,przyklad:`def powitaj(imie): ...`,kat:`słowo kluczowe`},return:{opis:`Kończy funkcję i zwraca wartość do miejsca wywołania.`,przyklad:`return wynik`,kat:`słowo kluczowe`},if:{opis:`Sprawdza warunek — kod w środku wykona się tylko gdy warunek jest prawdziwy.`,przyklad:`if x > 0: ...`,kat:`słowo kluczowe`},else:{opis:`Wykonuje się gdy żaden wcześniejszy if/elif nie był prawdziwy.`,przyklad:`else: ...`,kat:`słowo kluczowe`},elif:{opis:`Sprawdza kolejny warunek gdy poprzedni if był fałszywy.`,przyklad:`elif x == 0: ...`,kat:`słowo kluczowe`},for:{opis:`Pętla — powtarza blok kodu dla każdego elementu w kolekcji.`,przyklad:`for element in lista: ...`,kat:`słowo kluczowe`},while:{opis:`Pętla — powtarza blok kodu dopóki warunek jest prawdziwy.`,przyklad:`while x > 0: ...`,kat:`słowo kluczowe`},with:{opis:`Otwiera zasób (np. plik) i automatycznie go zamyka po wyjściu z bloku.`,przyklad:`with open('plik.txt') as f: ...`,kat:`słowo kluczowe`},try:{opis:`Blok kodu który może rzucić wyjątek — Python próbuje go wykonać.`,przyklad:`try: ...`,kat:`słowo kluczowe`},except:{opis:`Łapie wyjątek (błąd) i pozwala go obsłużyć zamiast zatrzymywać program.`,przyklad:`except ValueError as e: ...`,kat:`słowo kluczowe`},raise:{opis:`Rzuca wyjątek — sygnalizuje że coś poszło nie tak.`,przyklad:`raise ValueError('Zła wartość')`,kat:`słowo kluczowe`},class:{opis:`Definiuje nową klasę — szablon do tworzenia obiektów.`,przyklad:`class Samochod: ...`,kat:`słowo kluczowe`},lambda:{opis:`Tworzy małą anonimową funkcję w jednej linii.`,przyklad:`podwoj = lambda x: x * 2`,kat:`słowo kluczowe`},yield:{opis:`Zwraca wartość z generatora i pauzuje funkcję — nie kończy jej jak return.`,przyklad:`yield wartosc`,kat:`słowo kluczowe`},async:{opis:`Oznacza funkcję jako asynchroniczną — może być wstrzymana bez blokowania.`,przyklad:`async def pobierz(): ...`,kat:`słowo kluczowe`},await:{opis:`Czeka na wynik asynchronicznej operacji nie blokując reszty programu.`,przyklad:`dane = await pobierz()`,kat:`słowo kluczowe`},in:{opis:`Sprawdza czy element należy do kolekcji.`,przyklad:`if 'a' in 'abc': ...`,kat:`słowo kluczowe`},not:{opis:`Odwraca wartość logiczną — True staje się False i odwrotnie.`,przyklad:`not True  # → False`,kat:`słowo kluczowe`},and:{opis:`Logiczne I — True tylko gdy oba warunki są prawdziwe.`,przyklad:`if x > 0 and x < 10: ...`,kat:`słowo kluczowe`},or:{opis:`Logiczne LUB — True gdy choć jeden warunek jest prawdziwy.`,przyklad:`if x < 0 or x > 100: ...`,kat:`słowo kluczowe`},as:{opis:`Nadaje alias — krótszą nazwę importowanemu modułowi lub wyjątkowi.`,przyklad:`import numpy as np`,kat:`słowo kluczowe`},pass:{opis:`Nic nie robi — placeholder gdy składnia wymaga bloku kodu.`,przyklad:`def todo(): pass`,kat:`słowo kluczowe`},break:{opis:`Natychmiast kończy pętlę for lub while.`,przyklad:`if x == 5: break`,kat:`słowo kluczowe`},continue:{opis:`Pomija resztę bieżącej iteracji i przechodzi do następnej.`,przyklad:`if x < 0: continue`,kat:`słowo kluczowe`},del:{opis:`Usuwa zmienną, element listy lub atrybut obiektu z pamięci.`,przyklad:`del lista[0]`,kat:`słowo kluczowe`},global:{opis:`Mówi że zmienna wewnątrz funkcji to ta sama co na poziomie modułu.`,przyklad:`global licznik`,kat:`słowo kluczowe`},True:{opis:`Wartość logiczna 'prawda'.`,przyklad:`x = True`,kat:`słowo kluczowe`},False:{opis:`Wartość logiczna 'fałsz'.`,przyklad:`x = False`,kat:`słowo kluczowe`},None:{opis:`Reprezentuje brak wartości — jak 'nic'. Funkcje bez return zwracają None.`,przyklad:`x = None`,kat:`słowo kluczowe`},print:{opis:`Wyświetla tekst lub wartości na ekranie.`,przyklad:`print('Witaj świecie')`,kat:`funkcja wbudowana`},len:{opis:`Zwraca liczbę elementów w liście, tekście lub innej kolekcji.`,przyklad:`len([1, 2, 3])  # → 3`,kat:`funkcja wbudowana`},range:{opis:`Generuje ciąg liczb całkowitych. Używany w pętlach for.`,przyklad:`range(0, 10)  # → 0..9`,kat:`funkcja wbudowana`},int:{opis:`Zamienia wartość na liczbę całkowitą.`,przyklad:`int('42')  # → 42`,kat:`funkcja wbudowana`},str:{opis:`Zamienia wartość na tekst.`,przyklad:`str(42)  # → '42'`,kat:`funkcja wbudowana`},float:{opis:`Zamienia wartość na liczbę zmiennoprzecinkową.`,przyklad:`float('3.14')  # → 3.14`,kat:`funkcja wbudowana`},bool:{opis:`Zamienia wartość na True lub False.`,przyklad:`bool(0)  # → False`,kat:`funkcja wbudowana`},list:{opis:`Tworzy listę — modyfikowalną kolekcję elementów.`,przyklad:`list('abc')  # → ['a','b','c']`,kat:`funkcja wbudowana`},dict:{opis:`Tworzy słownik — strukturę par klucz:wartość.`,przyklad:`dict(imie='Jan')`,kat:`funkcja wbudowana`},set:{opis:`Tworzy zbiór unikalnych elementów.`,przyklad:`set([1,2,2,3])  # → {1,2,3}`,kat:`funkcja wbudowana`},tuple:{opis:`Tworzy krotkę — niemodyfikowalną listę.`,przyklad:`tuple([1,2,3])  # → (1,2,3)`,kat:`funkcja wbudowana`},type:{opis:`Zwraca typ (klasę) obiektu.`,przyklad:`type(42)  # → <class 'int'>`,kat:`funkcja wbudowana`},isinstance:{opis:`Sprawdza czy obiekt jest określonego typu.`,przyklad:`isinstance(42, int)  # → True`,kat:`funkcja wbudowana`},enumerate:{opis:`Dodaje licznik do iteracji — zwraca pary (indeks, wartość).`,przyklad:`for i, v in enumerate(lista): ...`,kat:`funkcja wbudowana`},zip:{opis:`Łączy wiele list w pary — jak zamek błyskawiczny.`,przyklad:`zip([1,2],[3,4])  # → [(1,3),(2,4)]`,kat:`funkcja wbudowana`},map:{opis:`Stosuje funkcję do każdego elementu listy.`,przyklad:`list(map(str, [1,2,3]))`,kat:`funkcja wbudowana`},filter:{opis:`Filtruje listę — zostawia tylko elementy dla których funkcja zwraca True.`,przyklad:`list(filter(lambda x: x>0, lista))`,kat:`funkcja wbudowana`},sorted:{opis:`Zwraca nową posortowaną listę nie zmieniając oryginału.`,przyklad:`sorted([3,1,2])  # → [1,2,3]`,kat:`funkcja wbudowana`},reversed:{opis:`Zwraca iterator przechodzący przez sekwencję od końca.`,przyklad:`list(reversed([1,2,3]))`,kat:`funkcja wbudowana`},sum:{opis:`Sumuje wszystkie elementy listy.`,przyklad:`sum([1,2,3,4])  # → 10`,kat:`funkcja wbudowana`},min:{opis:`Zwraca najmniejszą wartość z listy.`,przyklad:`min([3,1,4])  # → 1`,kat:`funkcja wbudowana`},max:{opis:`Zwraca największą wartość z listy.`,przyklad:`max([3,1,4])  # → 4`,kat:`funkcja wbudowana`},abs:{opis:`Zwraca wartość bezwzględną liczby.`,przyklad:`abs(-5)  # → 5`,kat:`funkcja wbudowana`},round:{opis:`Zaokrągla liczbę do podanej liczby miejsc.`,przyklad:`round(3.14159, 2)  # → 3.14`,kat:`funkcja wbudowana`},open:{opis:`Otwiera plik do czytania lub pisania.`,przyklad:`with open('plik.txt', 'r') as f: ...`,kat:`funkcja wbudowana`},input:{opis:`Zatrzymuje program i czeka na wpisanie tekstu przez użytkownika.`,przyklad:`imie = input('Podaj imię: ')`,kat:`funkcja wbudowana`},super:{opis:`Daje dostęp do metod klasy nadrzędnej. Używane przy dziedziczeniu.`,przyklad:`super().__init__()`,kat:`funkcja wbudowana`},hasattr:{opis:`Sprawdza czy obiekt posiada dany atrybut.`,przyklad:`hasattr(obiekt, 'metoda')`,kat:`funkcja wbudowana`},getattr:{opis:`Pobiera wartość atrybutu obiektu po jego nazwie jako tekście.`,przyklad:`getattr(obiekt, 'nazwa', domyslna)`,kat:`funkcja wbudowana`},setattr:{opis:`Ustawia wartość atrybutu obiektu po nazwie.`,przyklad:`setattr(obiekt, 'nazwa', wartosc)`,kat:`funkcja wbudowana`},connect:{opis:`Otwiera połączenie z bazą danych SQLite pod podaną ścieżką.`,przyklad:`sqlite3.connect('baza.db')`,kat:`metoda`},execute:{opis:`Wykonuje zapytanie SQL na bazie danych.`,przyklad:`conn.execute('SELECT * FROM users')`,kat:`metoda`},fetchall:{opis:`Pobiera wszystkie wyniki zapytania SQL jako listę.`,przyklad:`rows = cursor.fetchall()`,kat:`metoda`},fetchone:{opis:`Pobiera jeden wynik zapytania SQL.`,przyklad:`row = cursor.fetchone()`,kat:`metoda`},append:{opis:`Dodaje element na koniec listy.`,przyklad:`lista.append(42)`,kat:`metoda listy`},extend:{opis:`Dodaje wszystkie elementy innej listy na koniec.`,przyklad:`lista.extend([4,5,6])`,kat:`metoda listy`},items:{opis:`Zwraca pary (klucz, wartość) słownika — idealne do iteracji.`,przyklad:`for k, v in slownik.items(): ...`,kat:`metoda słownika`},keys:{opis:`Zwraca wszystkie klucze słownika.`,przyklad:`slownik.keys()`,kat:`metoda słownika`},values:{opis:`Zwraca wszystkie wartości słownika.`,przyklad:`slownik.values()`,kat:`metoda słownika`},get:{opis:`Pobiera wartość klucza. Zwraca None gdy klucz nie istnieje.`,przyklad:`slownik.get('klucz', 'domyslna')`,kat:`metoda słownika`},update:{opis:`Aktualizuje słownik danymi z innego słownika.`,przyklad:`slownik.update({'nowy': 1})`,kat:`metoda słownika`},split:{opis:`Dzieli tekst na listę fragmentów według separatora.`,przyklad:`'a,b,c'.split(',')  # → ['a','b','c']`,kat:`metoda tekstu`},join:{opis:`Łączy elementy listy w jeden tekst ze separatorem.`,przyklad:`', '.join(['a','b','c'])`,kat:`metoda tekstu`},strip:{opis:`Usuwa białe znaki z początku i końca tekstu.`,przyklad:`'  hello  '.strip()  # → 'hello'`,kat:`metoda tekstu`},replace:{opis:`Zamienia wszystkie wystąpienia fragmentu tekstu na inny.`,przyklad:`'hello world'.replace('world','Python')`,kat:`metoda tekstu`},format:{opis:`Wstawia wartości w miejsca {} w tekście.`,przyklad:`'{} ma {} lat'.format('Jan', 30)`,kat:`metoda tekstu`},lower:{opis:`Zamienia wszystkie litery na małe.`,przyklad:`'HELLO'.lower()  # → 'hello'`,kat:`metoda tekstu`},upper:{opis:`Zamienia wszystkie litery na WIELKIE.`,przyklad:`'hello'.upper()  # → 'HELLO'`,kat:`metoda tekstu`},startswith:{opis:`Sprawdza czy tekst zaczyna się od podanego fragmentu.`,przyklad:`'hello'.startswith('he')  # → True`,kat:`metoda tekstu`},endswith:{opis:`Sprawdza czy tekst kończy się podanym fragmentem.`,przyklad:`'hello'.endswith('lo')  # → True`,kat:`metoda tekstu`},os:{opis:`Operacje na systemie plików — ścieżki, foldery, zmienne środowiskowe.`,przyklad:`os.path.join('folder', 'plik.txt')`,kat:`moduł`},sys:{opis:`Informacje o interpreterze — argumenty, wyjście, ścieżki importu.`,przyklad:`sys.argv  # → argumenty z linii poleceń`,kat:`moduł`},json:{opis:`Czytanie i zapisywanie danych w formacie JSON.`,przyklad:`json.dumps({'a': 1})  # → '{"a": 1}'`,kat:`moduł`},re:{opis:`Wyrażenia regularne — zaawansowane wyszukiwanie wzorców w tekście.`,przyklad:`re.findall(r'\\d+', 'abc123')`,kat:`moduł`},random:{opis:`Generowanie liczb losowych i losowe wybieranie elementów.`,przyklad:`random.choice(['a','b','c'])`,kat:`moduł`},datetime:{opis:`Praca z datami i czasem — tworzenie, formatowanie, różnice.`,przyklad:`datetime.now().strftime('%Y-%m-%d')`,kat:`moduł`},time:{opis:`Funkcje czasu — mierzenie, wstrzymywanie programu.`,przyklad:`time.sleep(1)  # czekaj 1 sekundę`,kat:`moduł`},math:{opis:`Funkcje matematyczne — pierwiastki, logarytmy, trygonometria.`,przyklad:`math.sqrt(16)  # → 4.0`,kat:`moduł`},sqlite3:{opis:`Wbudowana baza danych SQLite — prosta baza w jednym pliku.`,przyklad:`sqlite3.connect('baza.db')`,kat:`moduł`},Flask:{opis:`Klasa tworząca aplikację webową Flask. Punkt startowy każdej aplikacji Flask.`,przyklad:`app = Flask(__name__)`,kat:`Flask`},jsonify:{opis:`Zamienia słownik Pythona na odpowiedź HTTP w formacie JSON.`,przyklad:`return jsonify({'status': 'ok'})`,kat:`Flask`},route:{opis:`Dekorator Flask — przypisuje funkcję do konkretnego adresu URL.`,przyklad:`@app.route('/users')`,kat:`Flask`},request:{opis:`Obiekt Flask zawierający dane przychodzącego żądania HTTP.`,przyklad:`request.json  # → dane z body`,kat:`Flask`}},Q=document.getElementById(`dictTooltip`),Bn=document.getElementById(`dictTooltipLabel`),Vn=document.getElementById(`dictTooltipOpis`),Hn=document.getElementById(`dictTooltipPrzyklad`);function Un(){document.querySelectorAll(`.kw, .fn`).forEach(function(e){let t=e.textContent.trim();zn[t]&&(e.setAttribute(`data-dict`,t),e.addEventListener(`mouseenter`,e=>Wn(e,t)),e.addEventListener(`mouseleave`,qn))})}function Wn(e,t){let n=zn[t];Bn.textContent=n.kat+` · `+t,Vn.textContent=n.opis,Hn.textContent=n.przyklad,Q.style.display=`block`,Gn(e)}function Gn(e){Kn(e.clientX,e.clientY),document.addEventListener(`mousemove`,$,{passive:!0})}function Kn(e,t){let n=e+16,r=t-10,i=Q.offsetWidth,a=Q.offsetHeight;Q.style.left=(n+i>window.innerWidth?n-i-32:n)+`px`,Q.style.top=(r+a>window.innerHeight?r-a:r)+`px`}function $(e){if(Q.style.display===`none`){document.removeEventListener(`mousemove`,$);return}Kn(e.clientX,e.clientY)}function qn(){Q.style.display=`none`,document.removeEventListener(`mousemove`,$)}document.addEventListener(`DOMContentLoaded`,function(){Un();let e=document.getElementById(`editor`)||document.body;new MutationObserver(Un).observe(e,{childList:!0,subtree:!0})}),u({addToHistoria:he,resetDeadCode:qe,resetBadPatterns:ct,prefetchAll:wt}),ue({highlightLine:ee,renderEditor:f,getOriginalCodeText:d,resetDeadCode:qe,resetBadPatterns:ct,applyDeadCodeResults:D,applyBadPatternResults:k}),ye({getOriginalCodeText:d,addToHistoria:he}),Ae({getOriginalCodeText:d,saveHistoria:_}),Be({getOriginalCodeText:d,saveHistoria:_,refreshHistoriaIfVisible:v}),Ze({getOriginalCodeText:d,saveHistoria:_,refreshHistoriaIfVisible:v}),gt({renderujArchiwum:bt,clearDeadCodeHighlights:O,clearBadPatternHighlights:A}),Ct({saveHistoria:_,refreshHistoriaIfVisible:v}),jt({openFramework:Nn}),Object.assign(window,{showApp:Mt,onFwSearch:Pt,clearFwSearch:W,openFramework:Nn,closeDetailPage:Pn,switchDetailTab:Ln,onFwDetailEscape:X,openCmdModal:Gt,closeCmdModal:J,copyCmdText:qt,openTranslator:be,closeTranslator:xe,toggleWand:Ee,openTranslatorFromHistoria:Oe,openVivisekcja:je,closeVivisekcja:Me,toggleDeadCode:Ve,highlightDeadLines:Ke,toggleBadPatterns:tt,highlightBadPatternLines:st,handleFileUpload:m,switchEditorTab:N,handleAnalizuj:ft,selectMode:lt,setActive:vt,switchTab:_t,sendAI:yt,showHistoria:y,showHistoriaDetail:pe,loadKodFromHistoria:ge,pokazModal:xt,zamknijModal:St});