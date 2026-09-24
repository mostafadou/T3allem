const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
const levels=['السنة الأولى ابتدائي','السنة الثانية ابتدائي','السنة الثالثة ابتدائي','السنة الرابعة ابتدائي','السنة الخامسة ابتدائي'];
const subjects=['اللغة العربية','الرياضيات','التربية الإسلامية','التربية العلمية','التاريخ والجغرافيا','اللغة الفرنسية'];
let level='',subject='',qi=0,score=0;
const quiz=[
 {q:'كم عدد أيام الأسبوع؟',a:['5','6','7'],c:2},
 {q:'ما ناتج 2 + 3؟',a:['4','5','6'],c:1},
 {q:'أي كلمة تدل على شيء؟',a:['كتاب','يكتب','جميل'],c:0}
];

function show(id){screens.forEach(x=>x.classList.toggle('active',x.id===id));}
levels.forEach((x,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=x;b.onclick=()=>{level=x;$('#levelTitle').textContent=x;renderSubjects();show('subjects')};$('#levelGrid').appendChild(b)});
function renderSubjects(){const g=$('#subjectGrid');g.innerHTML='';subjects.forEach(s=>{const b=document.createElement('button');b.className='choice';b.textContent='📘 '+s;b.onclick=()=>{subject=s;$('#assessmentTitle').textContent='تقييم '+s;show('assessment')};g.appendChild(b)})}
$('#start').onclick=()=>show('levels');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back));
$('#beginQuiz').onclick=()=>{qi=0;score=0;renderQuiz();show('quiz')};
function renderQuiz(){const q=quiz[qi];$('#question').textContent=q.q;$('#answers').innerHTML='';$('#feedback').textContent='';$('#progress').style.width=((qi)/quiz.length*100)+'%';q.a.forEach((a,i)=>{const b=document.createElement('button');b.className='answer';b.textContent=a;b.onclick=()=>answer(i,b);$('#answers').appendChild(b)})}
function answer(i,b){const q=quiz[qi];document.querySelectorAll('.answer').forEach(x=>x.disabled=true);if(i===q.c){score++;b.classList.add('correct');$('#feedback').textContent='أحسنت! 🌟'}else{b.classList.add('wrong');$('#feedback').textContent='حاول مرة أخرى 💪'}setTimeout(()=>{qi++;if(qi<quiz.length)renderQuiz();else finish()},650)}
function finish(){let title,text,emoji;if(score===3){title='ممتاز';text='أجبت عن الأسئلة بشكل رائع. واصل التقدم!';emoji='🌟'}else if(score>=2){title='جيد';text='أداء جيد. واصل التدريب لتتقن المزيد.';emoji='👏'}else{title='حسن حاول أكثر';text='لا بأس. بعض العناصر تحتاج إلى مزيد من التدريب. حاول مرة أخرى!';emoji='💪'}$('#resultEmoji').textContent=emoji;$('#resultTitle').textContent=title;$('#resultText').textContent=text;show('result')}
$('#sound').onclick=e=>{e.currentTarget.textContent=e.currentTarget.textContent==='🔊'?'🔇':'🔊'};
