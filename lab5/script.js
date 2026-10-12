// Hamburger цэс
const toggle=document.getElementById('navToggle'),nav=document.getElementById('mainNav');
const setNav=o=>{nav.classList.toggle('open',o);toggle.classList.toggle('open',o);
  toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Цэс хаах':'Цэс нээх');};
toggle.addEventListener('click',()=>setNav(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setNav(false)));

// QR тасалбар үүсгэх
const form=document.getElementById('regForm');
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=form.fullname.value.trim(),id=form.studentid.value.trim(),ev=form.event.value;
  document.getElementById('passName').textContent=name;
  document.getElementById('passEvent').textContent=ev;
  document.getElementById('passId').textContent=id;
  document.getElementById('passQr').src='https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='+encodeURIComponent(id+'|'+ev);
  document.getElementById('pass').scrollIntoView({behavior:'smooth',block:'center'});
});}

// Арга хэмжээ шүүх
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');
  const f=c.dataset.filter;
  document.querySelectorAll('.event').forEach(el=>el.hidden=f!=='all'&&el.dataset.club!==f);
}));