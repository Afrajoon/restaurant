function show_box_signin(){
    const signin= document.querySelector('.box-signin');
    signin.style.display='block';
    const login= document.querySelector('.box-signup');
    login.style.display='none';
}

function show_box_signup(){
    const login= document.querySelector('.box-signup');
    login.style.display='block';
    const signin= document.querySelector('.box-signin');
    signin.style.display='none';
}

function show_list_sefaresh(){
  const show_menu= document.querySelector('.list-sefaresh');
  show_menu.style.display='block'
}

function hide_list_sefaresh(){
  const hide_menu= document.querySelector('.list-sefaresh');
  hide_menu.style.display='none'
}

function show_list_reserve(){
  const show_menu= document.querySelector('.reserve-list');
  show_menu.style.display='block'
}

function show_visite_reserve(){
  const show_menu= document.querySelector('.visite-reserve');
  show_menu.style.display='block'
  const hide_menu= document.querySelector('.reserve-list');
  hide_menu.style.display='none'
}


let startX = 0;
let active = 0;
let isDown = false;
const speedDrag = -0.1;
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );
const carousel = document.querySelector(".carousel");
const $items = document.querySelectorAll(".carousel-item");
let progress = (10 * $items.length) / 2;
const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
  item.style.setProperty("--items", $items.length);
};
const animate = () => {
  progress = Math.max(0, Math.min(progress, $items.length * 10));
  active = Math.floor((progress / ($items.length * 10)) * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * $items.length * 10 + 10;
    animate();
  });
});
const handleMouseMove = (e) => {
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};
const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};
const handleMouseUp = () => {
  isDown = false;
};
carousel.addEventListener("mousedown", handleMouseDown);
carousel.addEventListener("mousemove", handleMouseMove);
carousel.addEventListener("mouseup", handleMouseUp);
carousel.addEventListener("touchstart", handleMouseDown);
carousel.addEventListener("touchmove", handleMouseMove);
carousel.addEventListener("touchend", handleMouseUp);
