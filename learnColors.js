'use strict';
// Плавное появление начального экрана;
$(function load() {	 
	$('.preloader').width(0 + '%');
	$(window).on('load', function() {
		$('.preloader').animate({width: '30%'}, 500) 
							.animate({width: '50%'}, 500) 
							.animate({width: '70%'}, 500) 
							.animate({width: '101%'}, 500)
							.fadeOut(1000);
},);
						$('.one').delay(3000).fadeIn(2000);
						$('.two').delay(3000).fadeIn(2000);
}); 

// Находим глобальные переменные;
let name = document.querySelector('.name');
// Глобальная переменная для вибрации;
let btn = document.querySelector('.btn');
btn.onclick = e => navigator.vibrate(200);
if (! navigator.vibrate) {
	alert ('Your browser is not supported vibrate');
}
// Добавляем музыку;
var musichtml = document.getElementById('musichtml');
window.addEventListener ('click', function() {
	musichtml.play();  
}); 
// Цвет фигуры CANVAS;
let colorGame;
// Функция CANVAS;
function loadCanvas() {
	const canvas = document.querySelector('canvas');
	const renderer = new THREE.WebGLRenderer({canvas});
	var viewFigure = document.querySelector('.viewFigure');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(90, innerWidth / innerHeight, 1, 1500);
	camera.position.set(1, 1, 10);
	renderer.setSize(innerWidth, innerHeight);
	viewFigure.appendChild(renderer.domElement);
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	var cubeGeom = new THREE.BoxGeometry(1, 1, 1);
	var cubeMat = new THREE.MeshPhongMaterial( { 
		color: colorGame 
	} );
	var cube = new THREE.Mesh(cubeGeom, cubeMat);
	cube.scale.setScalar(5);
	scene.add(cube); 
	var clock = new THREE.Clock();
	renderer.setAnimationLoop(() => {
		cube.rotation.y = clock.getElapsedTime();
		renderer.render(scene, camera);
	});
	{
		const color = 0xFFFFFF;
		const intensity = 0.7;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 4, 5);
		scene.add(light); 
		const color2 = 0xFFFFff;
		const light2 = new THREE.DirectionalLight(color2, intensity);
		light2.position.set(1, -5, 5);
		scene.add(light2);
	}
	function render(time) {
		time *= 0.001;
		cube.rotation.x = time;
		cube.rotation.y = time;
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
} 
// Записываем результытф в JSON;
let jsonStorage;
let localGet = localStorage.getItem('Результат прошлой игры:');
// Переменная для баллов;
let trueColors = 0;
let falseColors = 0;
// Находим область для отображения названия цвета;
let nameColor = document.querySelector('.nameColor');
// Находим кнопки 'Назад / Вперед' и ставим на них обработчик;
let leftButton = document.querySelector('.leftButton');
let rightButton = document.querySelector('.rightButton');
leftButton.addEventListener ('click', randomPicture);
rightButton.addEventListener ('click', randomPicture);
// Функция рандомного цвета (кнопка 'Изучи цвета');
function randomPicture() {
	let functionArray = colorArray[Math.floor(Math.random()*colorArray.length)] ();
}
// Массив функций для кнопки 'Изучи цвета';
let colorArray = [ darkBurgundy, darkRed, refractoryBricks, red, salmon, tomato, coral, orangeRed, chocolate, sandBrown, darkOrange, Orange, darkGoldenrod, goldenrod, gold, olive, yellow, yellowGreen, greenYellow, chartreuse, greenLawn, green, lime, greenLime, springGreen, springGreenNeutral, turquoise, lightGreenSea, turquoiseNeutral, darkCyan, seaWave, darkTurquoise, skyBlueDark, deceivingBlue, royalBlue, navy, blueNeutral, darkBlue, blueViolet, darkOrchid, darkViolet, Violet, darkMagenta, magenta, violetRedNeutral, intensePink, brightPink, crimson, brown, indianRed, pinkBrown, lightCoral, snow, mistyRose, darkSalmon, lightSalmon, ocher, seaShell, saddlebrown, peachPowder, peru, textile, biscuit, denseTree, tan, antiqueWhite, whiteNavajo, blanchedAlmonds, papayaEscape, moccasin, wheat, oldLace, floralWhite, cornHair, khaki, lemonChiffon, pallidum, darkKhaki, beige, lightYellowGoldenrod, lightYellow, ivory, darkOlive, darkOliveGreen, darkGreenSea, darkGreen, greenForest, lightGreen, paleGreen, honeydew, greenSea, greenSeaNeutral, mintCream, aquamarineNeutral, aquamarine, darkSlateGray, paleTurquoise, lightDarkBlue, azure, grayBlue, dustyBlue, lightBlue, skyBlue, skyBlueLight, blueSteel, blueAlice, graySlate, lightGraySlate, lightSteelBlue, cornflowerBlue, lavender, ghostlyWhite, midnightBlue, slateBlue, darkSlateBlue, neutralSlateBlue, violetNeutral, indigo, neutralOrchidColor, plumLight, pinkPurple, thistle, orchid, pinkLavender, lilac, pink, lightPink, black, dullGray, gray, darkGray, silver, lightGray, geinsboro, whiteSmoke, white, ];
// Функция кнопки 'Изучи цвета';
function colorLearnInput() {
	// Появление игрового поля;
	let animationDiv = document.querySelector('.animationDiv');
	animationDiv.style.visibility='visible';
	let targetHeight = 70;
	setTimeout(function() { animationDiv.style.height = targetHeight + 'vh'; }, 0);  
	// Если мы перешли с кнопки 'Отгадай цвет', прописываем изначальное положение игрового поля;
	let viewColor = document.querySelector('.viewColor');
	viewColor.style.height = '80%';
	let contents = document.querySelector('.contents');
	contents.style.display ='flex';
	let ansverFigure = document.querySelector('.ansverFigure');
	ansverFigure.style.display ='none';
	let viewFigure = document.querySelector('.viewFigure');
	viewFigure.style.height = '100%';
	// Добавляем надпись 'Learn Colors';
	name.innerHTML = 'Learn Colors';
	nameColor.innerHTML = 'Для старта нажми стрелочку';
	// Загружаем CANVAS:
	loadCanvas();
}
// Функция кнопки 'Отгадай цвет';
function  colorGameInput () {
	// Появление игрового поля;
	let animationDiv = document.querySelector('.animationDiv');
	animationDiv.style.visibility='visible';
	let targetHeight = 75;
	setTimeout(function() { animationDiv.style.height = targetHeight + 'vh'; }, 0);   
	// Убираем надпись 'Learn Colors' и добавляем циферблат:
	name.innerHTML = '';
	name.style.lineHeight = '25px';
	// Спрашиваем о выведении результатов прошлой игры;
	if (localGet) {
		let answerLocal = 'Продолжить прошлую игру?';
		if (confirm (answerLocal)){
			let nameHTML = JSON.parse(localGet);
			var newnameHTML = nameHTML.split('Правильных ответов: ');
			trueColors = parseFloat(newnameHTML[1]);
			var newnameHTMLFalse = nameHTML.split('<br/> Ошибок: ');
			falseColors = parseFloat(newnameHTMLFalse[1]);
			name.innerHTML = 'Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors;
		}
		else {
			name.innerHTML = 'Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors;
		}
	}
	else {
		name.innerHTML = 'Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors;
	} 
	// Показываем область для ответов;
	let ansverFigure = document.querySelector('.ansverFigure');
	ansverFigure.style.display ='flex';
	let contents = document.querySelector('.contents');
	contents.style.display ='none';
	let viewColor = document.querySelector('.viewColor');
	setTimeout(function() { viewColor.style.height = targetHeight + 'vh'; }, 0);
	let viewFigure = document.querySelector('.viewFigure');
	viewFigure.style.height = '79%';
	// Запускаем игру;
	randomPictureGame();
}
// Находим ячейки ответов;
let oneanswer = document.querySelector('.oneanswer');
let twoanswer = document.querySelector('.twoanswer');
let threeanswer = document.querySelector('.threeanswer');
let fouranswer = document.querySelector('.fouranswer');
// Форматируем;
oneanswer.style.textAlign = 'center';
oneanswer.style.fontSize = '3vh';
twoanswer.style.textAlign = 'center';
twoanswer.style.fontSize = '3vh';
threeanswer.style.textAlign = 'center';
threeanswer.style.fontSize = '3vh';
fouranswer.style.textAlign = 'center';
fouranswer.style.fontSize = '3vh';
// Массив для поиска рандомной 'правильную' ячейку;
let cellArray;
// Правильная ячейка;
let correctCell;
// Функция Игры;
function randomPictureGame(){
	oneanswer.innerHTML = '';
	twoanswer.innerHTML = '';
	threeanswer.innerHTML = '';
	fouranswer.innerHTML = '';
	cellArray = [oneanswer, twoanswer, threeanswer, fouranswer];
	// Массив функций для кнопки 'Отгадай цвета';
	let colorArrayGame = [ darkBurgundyGame, darkRedGame, refractoryBricksGame, redGame, salmonGame, tomatoGame, coralGame, orangeRedGame, chocolateGame, sandBrownGame, darkOrangeGame, OrangeGame, darkGoldenrodGame, goldenrodGame, goldGame, oliveGame, yellowGame, yellowGreenGame, greenYellowGame, chartreuseGame, greenLawnGame, greenGame, limeGame, greenLimeGame, springGreenGame, springGreenNeutralGame, turquoiseGame, lightGreenSeaGame, turquoiseNeutralGame, darkCyanGame, seaWaveGame, darkTurquoiseGame, skyBlueDarkGame, deceivingBlueGame, royalBlueGame, navyGame, blueNeutralGame, darkBlueGame, blueVioletGame, darkOrchidGame, darkVioletGame, VioletGame, darkMagentaGame, magentaGame, violetRedNeutralGame, intensePinkGame, brightPinkGame, crimsonGame, brownGame, indianRedGame, pinkBrownGame, lightCoralGame, snowGame, mistyRoseGame, darkSalmonGame, lightSalmonGame, ocherGame, seaShellGame, saddlebrownGame, peachPowderGame, peruGame, textileGame, biscuitGame, denseTreeGame, tanGame, antiqueWhiteGame, whiteNavajoGame, blanchedAlmondsGame, papayaEscapeGame, moccasinGame, wheatGame, oldLaceGame, floralWhiteGame, cornHairGame, khakiGame, lemonChiffonGame, pallidumGame, darkKhakiGame, beigeGame, lightYellowGoldenrodGame, lightYellowGame, ivoryGame, darkOliveGame, darkOliveGreenGame, darkGreenSeaGame, darkGreenGame, greenForestGame, lightGreenGame, paleGreenGame, honeydewGame, greenSeaGame, greenSeaNeutralGame, mintCreamGame, aquamarineNeutralGame, aquamarineGame, darkSlateGrayGame, paleTurquoiseGame, lightDarkBlueGame, azureGame, grayBlueGame, dustyBlueGame, lightBlueGame, skyBlueGame, skyBlueLightGame, blueSteelGame, blueAliceGame, graySlateGame, lightGraySlateGame, lightSteelBlueGame, cornflowerBlueGame, lavenderGame, ghostlyWhiteGame, midnightBlueGame, slateBlueGame, darkSlateBlueGame, neutralSlateBlueGame, violetNeutralGame, indigoGame, neutralOrchidColorGame, plumLightGame, pinkPurpleGame, thistleGame, orchidGame, pinkLavenderGame, lilacGame, pinkGame, lightPinkGame, blackGame, dullGrayGame, grayGame, darkGrayGame, silverGame, lightGrayGame, geinsboroGame, whiteSmokeGame, whiteGame, ];
	// Массив с названиями цветов; 
	let collorName = [ 'Тёмно-бордовый', 'Тёмно-красный', 'Огнеупорный кирпич', 'Красный', 'Лососевый', 'Томатный', 'Коралловый', 'Оранжево-красный', 'Шоколадный', 'Песочно-коричневый', 'Тёмно-оранжевый', 'Оранжевый', 'Тёмный золотарник', 'Золотарниковый', 'Золотой', 'Оливковый', 'Жёлтый', 'Жёлто-зелёный', 'Зелёно-жёлтый', 'Шартрёз (ликёр)', 'Зелёный газон', 'Зелёный', 'Лаймовый', 'Зелёный лайм', 'Весенне-зелёный', 'Весенне-зелёный нейтральный', 'Бирюзовый', 'Светло-зелёное море', 'Бирюзовый нейтральный', 'Тёмный циан', 'Морская волна', 'Тёмно-бирюзовый', 'Небесно-голубой тёмный', 'Обманчивый синий', 'Королевский синий', 'Военно-морского флота', 'Тёмно-синий', 'Cиний нейтральный', 'Сине-фиолетовый', 'Тёмная орхидея', 'Тёмно-фиолетовый', 'Фиолетовый', 'Тёмный маджента', 'Маджента', 'Фиолетово-красный нейтральный', 'Насыщенный розовый', 'Ярко-розовый', 'Малиновый', 'Коричневый', 'Красный индийский', 'Розово-коричневый', 'Светло-коралловый', 'Снег', 'Туманная роза', 'Тёмный лосось', 'Светлый лосось', 'Охра', 'Морская ракушка', 'Седло Браун', 'Персиковая пудра', 'Перу', 'Текстильный', 'Бисквит', 'Плотное дерево', 'Загар', 'Античный белый', 'Белый навахо', 'Бланшированный миндаль', 'Побег папайи', 'Мокасиновый', 'Пшеничный', 'Старое кружево', 'Цветочный белый', 'Кукурузный волос', 'Хаки', 'Лимонный шифон', 'Бледный золотарник', 'Тёмный хаки', 'Бежевый', 'Светло-жёлтый золотарник', 'Светло-жёлтый', 'Слоновая кость', 'Тёмно-оливковый', 'Тёмно-оливковый зелёный', 'Тёмно-зелёное море', 'Тёмно-зелёный', 'Зелёный лесной', 'Светло-зелёный', 'Бледно-зелёный', 'Медвяная роса', 'Зелёное море', 'Зелёное море, нейтральный', 'Мятный крем', 'Аквамариновый нейтральный', 'Аквамариновый', 'Тёмный грифельно-серый', 'Бледно-бирюзовый', 'Светло-голубой', 'Лазурный', 'Серо-синий', 'Пыльный голубой', 'Светло-синий', 'Небесно-голубой', 'Небесно-голубой светлый', 'Синяя сталь', 'Синяя Элис', 'Серый шифер', 'Светло-серый шифер', 'Светло-стальной синий', 'Васильковый голубой', 'Лаванда', 'Призрачно-белый', 'Полуночный синий', 'Аспидно-синий', 'Тёмный аспидно-синий', 'Нейтральный аспидно-синий', 'Фиолетовый нейтральный', 'Индиго', 'Нейтральный цвет орхидеи', 'Слива светлая', 'Розово-фиолетовый', 'Чертополох', 'Орхидея', 'Розово-лавандовый', 'Лиловый', 'Розовый', 'Светло-розовый', 'Чёрный', 'Тускло-серый', 'Серый', 'Тёмно-серый', 'Серебряный', 'Светло-серый', 'Геинсборо', 'Белый дым', 'Белый',  ];
	correctCell = cellArray[Math.floor(Math.random()*cellArray.length)];
	let colorNameRandom = {};
	for ( let i = 1; i <= 3; i++ ) {
		do {
			var n = collorName[Math.floor(Math.random()*collorName.length)];
		} while( n in colorNameRandom);
		colorNameRandom[n] = true; 	}
	let collorArrayCell = Object.keys(colorNameRandom);
	cellArray = cellArray.filter(cellDel => cellDel !== correctCell);
	cellArray[0].innerHTML = collorArrayCell[0];
	cellArray[1].innerHTML = collorArrayCell[1];
	cellArray[2].innerHTML = collorArrayCell[2];
	oneanswer.style.backgroundColor = 'transparent';
	twoanswer.style.backgroundColor = 'transparent';
	threeanswer.style.backgroundColor = 'transparent';
	fouranswer.style.backgroundColor = 'transparent';
	let functionArrayGame = colorArrayGame[Math.floor(Math.random()*colorArrayGame.length)] ();
	// Определяем, на какой ячейке произвели клик мышью и смотрим, 'правильная'  ли это ячейка. Результат записываем;
	correctCell.addEventListener ('click', answertrue);
	cellArray[0].addEventListener ('click', answerfalse);
	cellArray[1].addEventListener ('click', answerfalse);
	cellArray[2].addEventListener ('click', answerfalse); 
// Функции игры;
function darkBurgundyGame(){
	nameColor.innerHTML = 'Тёмно-бордовый';
	colorGame = 0x800000;
	loadCanvas();
}
	function darkRedGame(){
		correctCell.innerHTML = 'Тёмно-красный';
	colorGame = 0x8B0000;
	loadCanvas();
}
	function refractoryBricksGame(){
		correctCell.innerHTML = 'Огнеупорный кирпич';
	colorGame = 0xB22222;
	loadCanvas();
}
	function redGame(){
		correctCell.innerHTML = 'Красный';
	colorGame = 0xFF0000;
	loadCanvas();
}
	function salmonGame(){
		correctCell.innerHTML = 'Лососевый';
	colorGame = 0xFA8072;
	loadCanvas();
}
	function tomatoGame(){
	correctCell.innerHTML = 'Томатный';
	colorGame = 0xFF6347;
	loadCanvas();
}
	function coralGame(){
	correctCell.innerHTML = 'Коралловый';
	colorGame = 0xFF7F50;
	loadCanvas();
}
	function orangeRedGame(){
	correctCell.innerHTML = 'Оранжево-красный';
	colorGame = 0xFF4500;
	loadCanvas();
}
	function chocolateGame(){
	correctCell.innerHTML = 'Шоколадный';
	colorGame = 0xD2691E;
	loadCanvas();
}
	function sandBrownGame(){
	correctCell.innerHTML = 'Песочно-коричневый';
	colorGame = 0xF4A460;
	loadCanvas();
}
	function darkOrangeGame(){
	correctCell.innerHTML = 'Тёмно-оранжевый';
	colorGame = 0xFF8C00;
	loadCanvas();
}
	function OrangeGame(){
	correctCell.innerHTML = 'Оранжевый';
	colorGame = 0xFFA500;
	loadCanvas();
}
	function darkGoldenrodGame(){
	correctCell.innerHTML = 'Тёмный золотарник';
	colorGame = 0xB8860B;
	loadCanvas();
}
	function goldenrodGame(){
	correctCell.innerHTML = 'Золотарниковый';
	colorGame = 0xDAA520;
	loadCanvas();
}
	function goldGame(){
	correctCell.innerHTML = 'Золотой';
	colorGame = 0xFFD700;
	loadCanvas();
}
	function oliveGame(){
	correctCell.innerHTML = 'Оливковый';
	colorGame = 0x808000;
	loadCanvas();
}
	function yellowGame(){
	correctCell.innerHTML = 'Жёлтый';
	colorGame = 0xFFFF00;
	loadCanvas();
}
	function yellowGreenGame(){
	correctCell.innerHTML = 'Жёлто-зелёный';
	colorGame = 0x9ACD32;
	loadCanvas();
}
	function greenYellowGame(){
	correctCell.innerHTML = 'Зелёно-жёлтый';
	colorGame = 0xADFF2F;
	loadCanvas();
}
	function chartreuseGame(){
	correctCell.innerHTML = 'Шартрёз (ликёр)';
	colorGame = 0x7FFF00;
	loadCanvas();
}
	function greenLawnGame(){
	correctCell.innerHTML = 'Зелёный газон';
	colorGame = 0x7CFC00;
	loadCanvas();
}
	function greenGame(){
	correctCell.innerHTML = 'Зелёный';
	colorGame = 0x008000;
	loadCanvas();
}
	function limeGame(){
	correctCell.innerHTML = 'Лаймовый';
	colorGame = 0x00FF00;
	loadCanvas();
}
	function greenLimeGame(){
	correctCell.innerHTML = 'Зелёный лайм';
	colorGame = 0x32CD32;
	loadCanvas();
}
	function springGreenGame(){
	correctCell.innerHTML = 'Весенне-зелёный';
	colorGame = 0x00FF7F;
	loadCanvas();
}
	function springGreenNeutralGame(){
	correctCell.innerHTML = 'Весенне-зелёный нейтральный';
	colorGame = 0x00FA9A;
	loadCanvas();
}
	function turquoiseGame(){
	correctCell.innerHTML = 'Бирюзовый';
	colorGame = 0x40E0D0;
	loadCanvas();
}
	function lightGreenSeaGame(){
	correctCell.innerHTML = 'Светло-зелёное море';
	colorGame = 0x20B2AA;
	loadCanvas();
}
	function turquoiseNeutralGame(){
	correctCell.innerHTML = 'Бирюзовый нейтральный';
	colorGame = 0x48D1CC;
	loadCanvas();
}
	function darkCyanGame(){
	correctCell.innerHTML = 'Тёмный циан';
	colorGame = 0x008B8B;
	loadCanvas();
}
	function seaWaveGame(){
	correctCell.innerHTML = 'Морская волна';
	colorGame = 0x00FFFF;
	loadCanvas();
}
	function darkTurquoiseGame(){
	correctCell.innerHTML = 'Тёмно-бирюзовый';
	colorGame = 0x00CED1;
	loadCanvas();
}
	function skyBlueDarkGame(){
	correctCell.innerHTML = 'Небесно-голубой тёмный';
	colorGame = 0x00BFFF;
	loadCanvas();
}
	function deceivingBlueGame(){
	correctCell.innerHTML = 'Обманчивый синий';
	colorGame = 0x1E90FF;
	loadCanvas();
}
	function royalBlueGame(){
	correctCell.innerHTML = 'Королевский синий';
	colorGame = 0x4169E1;
	loadCanvas();
}
	function navyGame(){
	correctCell.innerHTML = 'Военно-морского флота';
	colorGame = 0x000080;
	loadCanvas();
}
	function blueNeutralGame(){
	correctCell.innerHTML = 'Cиний нейтральный';
	colorGame = 0x0000CD;
	loadCanvas();
}
	function darkBlueGame(){
	correctCell.innerHTML = 'Тёмно-голубой';
	colorGame = 0x0000FF;
	loadCanvas();
}
	function blueVioletGame(){
	correctCell.innerHTML = 'Сине-фиолетовый';
	colorGame = 0x8A2BE2;
	loadCanvas();
}
	function darkOrchidGame(){
	correctCell.innerHTML = 'Тёмная орхидея';
	colorGame = 0x9932CC;
	loadCanvas();
}
	function darkVioletGame(){
	correctCell.innerHTML = 'Тёмно-фиолетовый';
	colorGame = 0x9400D3;
	loadCanvas();
}
	function VioletGame(){
	correctCell.innerHTML = 'Фиолетовый';
	colorGame = 0x800080;
	loadCanvas();
}
	function darkMagentaGame(){
	correctCell.innerHTML = 'Тёмный маджента';
	colorGame = 0x8B008B;
	loadCanvas();
}
	function magentaGame(){
	correctCell.innerHTML = 'Маджента';
	colorGame = 0xFF00FF;
	loadCanvas();
}
	function violetRedNeutralGame(){
	correctCell.innerHTML = 'Фиолетово-красный нейтральный';
	colorGame = 0xC71585;
	loadCanvas();
}
	function intensePinkGame(){
	correctCell.innerHTML = 'Насыщенный розовый';
	colorGame = 0xFF1493;
	loadCanvas();
}
	function brightPinkGame(){
	correctCell.innerHTML = 'Ярко-розовый';
	colorGame = 0xFF69B4;
	loadCanvas();
}
	function crimsonGame(){
	correctCell.innerHTML = 'Малиновый';
	colorGame = 0xDC143C;
	loadCanvas();
}
	function brownGame(){
	correctCell.innerHTML = 'Коричневый';
	colorGame = 0xA52A2A;
	loadCanvas();
}
	function indianRedGame(){
	correctCell.innerHTML = 'Красный индийский';
	colorGame = 0xCD5C5C;
	loadCanvas();
}
	function pinkBrownGame(){
	correctCell.innerHTML = 'Розово-коричневый';
	colorGame = 0xBC8F8F;
	loadCanvas();
}
	function lightCoralGame(){
	correctCell.innerHTML = 'Светло-коралловый';
	colorGame = 0xF08080;
	loadCanvas();
}
	function snowGame(){
	correctCell.innerHTML = 'Снег';
	colorGame = 0xFFFAFA;
	loadCanvas();
}
	function mistyRoseGame(){
	correctCell.innerHTML = 'Туманная роза';
	colorGame = 0xFFE4E1;
	loadCanvas();
}
	function darkSalmonGame(){
	correctCell.innerHTML = 'Тёмный лосось';
	colorGame = 0xE9967A;
	loadCanvas();
}
	function lightSalmonGame(){
	correctCell.innerHTML = 'Светлый лосось';
	colorGame = 0xFFA07A;
	loadCanvas();
}
	function ocherGame(){
	correctCell.innerHTML = 'Охра';
	colorGame = 0xA0522D;
	loadCanvas();
}
	function seaShellGame(){
	correctCell.innerHTML = 'Морская ракушка';
	colorGame = 0xFFF5EE;
	loadCanvas();
}
	function saddlebrownGame(){
	correctCell.innerHTML = 'Седло Браун';
	colorGame = 0x8B4513;
	loadCanvas();
}
	function peachPowderGame(){
	correctCell.innerHTML = 'Персиковая пудра';
	colorGame = 0xFFDAB9;
	loadCanvas();
}
	function peruGame(){
	correctCell.innerHTML = 'Перу';
	colorGame = 0xCD853F;
	loadCanvas();
}
	function textileGame(){
	correctCell.innerHTML = 'Текстильный';
	colorGame = 0xFAF0E6;
	loadCanvas();
}
	function biscuitGame(){
	correctCell.innerHTML = 'Бисквит';
	colorGame = 0xFFE4C4;
	loadCanvas();
}
	function denseTreeGame(){
	correctCell.innerHTML = 'Плотное дерево';
	colorGame = 0xDEB887;
	loadCanvas();
}
	function tanGame(){
	correctCell.innerHTML = 'Загар';
	colorGame = 0xD2B48C;
	loadCanvas();
}
	function antiqueWhiteGame(){
	correctCell.innerHTML = 'Античный белый';
	colorGame = 0xFAEBD7;
	loadCanvas();
}
	function whiteNavajoGame(){
	correctCell.innerHTML = 'Белый навахо';
	colorGame = 0xFFDEAD;
	loadCanvas();
}
	function blanchedAlmondsGame(){
	correctCell.innerHTML = 'Бланшированный миндаль';
	colorGame = 0xFFEBCD;
	loadCanvas();
}
	function papayaEscapeGame(){
	correctCell.innerHTML = 'Побег папайи';
	colorGame = 0xFFEFD5;
	loadCanvas();
}
	function moccasinGame(){
	correctCell.innerHTML = 'Мокасиновый';
	colorGame = 0xFFE4B5;
	loadCanvas();
}
	function wheatGame(){
	correctCell.innerHTML = 'Пшеничный';
	colorGame = 0xF5DEB3;
	loadCanvas();
}
	function oldLaceGame(){
	correctCell.innerHTML = 'Старое кружево';
	colorGame = 0xFDF5E6;
	loadCanvas();
}
	function floralWhiteGame(){
	correctCell.innerHTML = 'Цветочный белый';
	colorGame = 0xFFFAF0;
	loadCanvas();
}
	function cornHairGame(){
	correctCell.innerHTML = 'Кукурузный волос';
	colorGame = 0xFFF8DC;
	loadCanvas();
}
	function khakiGame(){
	correctCell.innerHTML = 'Хаки';
	colorGame = 0xF0E68C;
	loadCanvas();
}
	function lemonChiffonGame(){
	correctCell.innerHTML = 'Лимонный шифон';
	colorGame = 0xFFFACD;
	loadCanvas();
}
	function pallidumGame(){
	correctCell.innerHTML = 'Бледный золотарник';
	colorGame = 0xEEE8AA;
	loadCanvas();
}
	function darkKhakiGame(){
	correctCell.innerHTML = 'Тёмный хаки';
	colorGame = 0xBDB76B;
	loadCanvas();
}
	function beigeGame(){
	correctCell.innerHTML = 'Бежевый';
	colorGame = 0xF5F5DC;
	loadCanvas();
}
	function lightYellowGoldenrodGame(){
	correctCell.innerHTML = 'Светло-жёлтый золотарник';
	colorGame = 0xFAFAD2;
	loadCanvas();
}
	function lightYellowGame(){
	correctCell.innerHTML = 'Светло-жёлтый';
	colorGame = 0xFFFFE0;
	loadCanvas();
}
	function ivoryGame(){
	correctCell.innerHTML = 'Слоновая кость';
	colorGame = 0xFFFFF0;
	loadCanvas();
}
	function darkOliveGame(){
	correctCell.innerHTML = 'Тёмно-оливковый';
	colorGame = 0x6B8E23;
	loadCanvas();
}
	function darkOliveGreenGame(){
	correctCell.innerHTML = 'Тёмно-оливковый зелёный';
	colorGame = 0x556B2F;
	loadCanvas();
}
	function darkGreenSeaGame(){
	correctCell.innerHTML = 'Тёмно-зелёное море';
	colorGame = 0x8FBC8F;
	loadCanvas();
}
	function darkGreenGame(){
	correctCell.innerHTML = 'Тёмно-зелёный';
	colorGame = 0x006400;
	loadCanvas();
}
	function greenForestGame(){
	correctCell.innerHTML = 'Зелёный лесной';
	colorGame = 0x228B22;
	loadCanvas();
}
	function lightGreenGame(){
	correctCell.innerHTML = 'Светло-зелёный';
	colorGame = 0x90EE90;
	loadCanvas();
}
	function paleGreenGame(){
	correctCell.innerHTML = 'Бледно-зелёный';
	colorGame = 0x98FB98;
	loadCanvas();
}
	function honeydewGame(){
	correctCell.innerHTML = 'Медвяная роса';
	colorGame = 0xF0FFF0;
	loadCanvas();
}
	function greenSeaGame(){
	correctCell.innerHTML = 'Зелёное море';
	colorGame = 0x2E8B57;
	loadCanvas();
}
	function greenSeaNeutralGame(){
	correctCell.innerHTML = 'Зелёное море, нейтральный';
	colorGame = 0x3CB371;
	loadCanvas();
}
	function mintCreamGame(){
	correctCell.innerHTML = 'Мятный крем';
	colorGame = 0xF5FFFA;
	loadCanvas();
}
	function aquamarineNeutralGame(){
	correctCell.innerHTML = 'Аквамариновый нейтральный';
	colorGame = 0x66CDAA;
	loadCanvas();
}
	function aquamarineGame(){
	correctCell.innerHTML = 'Аквамариновый';
	colorGame = 0x7FFFD4;
	loadCanvas();
}
	function darkSlateGrayGame(){
	correctCell.innerHTML = 'Тёмный грифельно-серый';
	colorGame = 0x2F4F4F;
	loadCanvas();
}
	function paleTurquoiseGame(){
	correctCell.innerHTML = 'Бледно-бирюзовый';
	colorGame = 0xAFEEEE;
	loadCanvas();
}
	function lightDarkBlueGame(){
	correctCell.innerHTML = 'Светло-голубой';
	colorGame = 0xE0FFFF;
	loadCanvas();
}
	function azureGame(){
	correctCell.innerHTML = 'Лазурный';
	colorGame = 0xF0FFFF;
	loadCanvas();
}
	function grayBlueGame(){
	correctCell.innerHTML = 'Серо-синий';
	colorGame = 0x5F9EA0;
	loadCanvas();
}
	function dustyBlueGame(){
	correctCell.innerHTML = 'Пыльный голубой';
	colorGame = 0xB0E0E6;
	loadCanvas();
}
	function lightBlueGame(){
	correctCell.innerHTML = 'Светло-синий';
	colorGame = 0xADD8E6;
	loadCanvas();
}
	function skyBlueGame(){
	correctCell.innerHTML = 'Небесно-голубой';
	colorGame = 0x87CEEB;
	loadCanvas();
}
	function skyBlueLightGame(){
	correctCell.innerHTML = 'Небесно-голубой светлый';
	colorGame = 0x87CEFA;
	loadCanvas();
}
	function blueSteelGame(){
	correctCell.innerHTML = 'Синяя сталь';
	colorGame = 0x4682B4;
	loadCanvas();
}
	function blueAliceGame(){
	correctCell.innerHTML = 'Синяя Элис';
	colorGame = 0xF0F8FF;
	loadCanvas();
}
	function graySlateGame(){
	correctCell.innerHTML = 'Серый шифер';
	colorGame = 0x708090;
	loadCanvas();
}
	function lightGraySlateGame(){
	correctCell.innerHTML = 'Светло-серый шифер';
	colorGame = 0x778899;
	loadCanvas();
}
	function lightSteelBlueGame(){
	correctCell.innerHTML = 'Светло-стальной синий';
	colorGame = 0xB0C4DE;
	loadCanvas();
}
	function cornflowerBlueGame(){
	correctCell.innerHTML = 'Васильковый голубой';
	colorGame = 0x6495ED;
	loadCanvas();
}
	function lavenderGame(){
	correctCell.innerHTML = 'Лаванда';
	colorGame = 0xE6E6FA;
	loadCanvas();
}
	function ghostlyWhiteGame(){
	correctCell.innerHTML = 'Призрачно-белый';
	colorGame = 0xF8F8FF;
	loadCanvas();
}
	function midnightBlueGame(){
	correctCell.innerHTML = 'Полуночный синий';
	colorGame = 0x191970;
	loadCanvas();
}
	function slateBlueGame(){
	correctCell.innerHTML = 'Аспидно-синий';
	colorGame = 0x6A5ACD;
	loadCanvas();
}
	function darkSlateBlueGame(){
	correctCell.innerHTML = 'Тёмный аспидно-синий';
	colorGame = 0x483D8B;
	loadCanvas();
}
	function neutralSlateBlueGame(){
	correctCell.innerHTML = 'Нейтральный аспидно-синий';
	colorGame = 0x7B68EE;
	loadCanvas();
}
	function violetNeutralGame(){
	correctCell.innerHTML = 'Фиолетовый нейтральный';
	colorGame = 0x9370DB;
	loadCanvas();
}
	function indigoGame(){
	correctCell.innerHTML = 'Индиго';
	colorGame = 0x4B0082;
	loadCanvas();
}
	function neutralOrchidColorGame(){
	correctCell.innerHTML = 'Нейтральный цвет орхидеи';
	colorGame = 0xBA55D3;
	loadCanvas();
}
	function plumLightGame(){
	correctCell.innerHTML = 'Слива светлая';
	colorGame = 0xDDA0DD;
	loadCanvas();
}
	function pinkPurpleGame(){
	correctCell.innerHTML = 'Розово-фиолетовый';
	colorGame = 0xEE82EE;
	loadCanvas();
}
	function thistleGame(){
	correctCell.innerHTML = 'Чертополох';
	colorGame = 0xD8BFD8;
	loadCanvas();
}
	function orchidGame(){
	correctCell.innerHTML = 'Орхидея';
	colorGame = 0xDA70D6;
	loadCanvas();
}
	function pinkLavenderGame(){
	correctCell.innerHTML = 'Розово-лавандовый';
	colorGame = 0xFFF0F5;
	loadCanvas();
}
	function lilacGame(){
	correctCell.innerHTML = 'Лиловый';
	colorGame = 0xDB7093;
	loadCanvas();
}
	function pinkGame(){
	correctCell.innerHTML = 'Розовый';
	colorGame = 0xFFC0CB;
	loadCanvas();
}
	function lightPinkGame(){
	correctCell.innerHTML = 'Светло-розовый';
	colorGame = 0xFFB6C1;
	loadCanvas();
}
	function blackGame(){
	correctCell.innerHTML = 'Чёрный';
	colorGame = 0x000000;
	loadCanvas();
}
	function dullGrayGame(){
	correctCell.innerHTML = 'Тускло-серый';
	colorGame = 0x696969;
	loadCanvas();
}
	function grayGame(){
	correctCell.innerHTML = 'Серый';
	colorGame = 0x808080;
	loadCanvas();
}
	function darkGrayGame(){
	correctCell.innerHTML = 'Тёмно-серый';
	colorGame = 0xA9A9A9;
	loadCanvas();
}
	function silverGame(){
	correctCell.innerHTML = 'Серебряный';
	colorGame = 0xC0C0C0;
	loadCanvas();
}
	function lightGrayGame(){
	correctCell.innerHTML = 'Светло-серый';
	colorGame = 0xD3D3D3;
	loadCanvas();
}
	function geinsboroGame(){
	correctCell.innerHTML = 'Геинсборо';
	colorGame = 0xDCDCDC;
	loadCanvas();
}
	function whiteSmokeGame(){
	correctCell.innerHTML = 'Белый дым';
	colorGame = 0xF5F5F5;
	loadCanvas();
}
	function whiteGame(){
	correctCell.innerHTML = 'Белый';
	colorGame = 0xFFFFFF;
	loadCanvas();
}
}
// Функции изучения цвета;
function darkBurgundy(){
	nameColor.innerHTML = 'Тёмно-бордовый';
	colorGame = 0x800000;
	loadCanvas();
}
	function darkRed(){
	nameColor.innerHTML = 'Тёмно-красный';
	colorGame = 0x8B0000;
	loadCanvas();
}
	function refractoryBricks(){
	nameColor.innerHTML = 'Огнеупорный кирпич';
	colorGame = 0xB22222;
	loadCanvas();
}
	function red(){
	nameColor.innerHTML = 'Красный';
	colorGame = 0xFF0000;
	loadCanvas();
}
	function salmon(){
	nameColor.innerHTML = 'Лососевый';
	colorGame = 0xFA8072;
	loadCanvas();
}
	function tomato(){
	nameColor.innerHTML = 'Томатный';
	colorGame = 0xFF6347;
	loadCanvas();
}
	function coral(){
	nameColor.innerHTML = 'Коралловый';
	colorGame = 0xFF7F50;
	loadCanvas();
}
	function orangeRed(){
	nameColor.innerHTML = 'Оранжево-красный';
	colorGame = 0xFF4500;
	loadCanvas();
}
	function chocolate(){
	nameColor.innerHTML = 'Шоколадный';
	colorGame = 0xD2691E;
	loadCanvas();
}
	function sandBrown(){
	nameColor.innerHTML = 'Песочно-коричневый';
	colorGame = 0xF4A460;
	loadCanvas();
}
	function darkOrange(){
	nameColor.innerHTML = 'Тёмно-оранжевый';
	colorGame = 0xFF8C00;
	loadCanvas();
}
	function Orange(){
	nameColor.innerHTML = 'Оранжевый';
	colorGame = 0xFFA500;
	loadCanvas();
}
	function darkGoldenrod(){
	nameColor.innerHTML = 'Тёмный золотарник';
	colorGame = 0xB8860B;
	loadCanvas();
}
	function goldenrod(){
	nameColor.innerHTML = 'Золотарниковый';
	colorGame = 0xDAA520;
	loadCanvas();
}
	function gold(){
	nameColor.innerHTML = 'Золотой';
	colorGame = 0xFFD700;
	loadCanvas();
}
	function olive(){
	nameColor.innerHTML = 'Оливковый';
	colorGame = 0x808000;
	loadCanvas();
}
	function yellow(){
	nameColor.innerHTML = 'Жёлтый';
	colorGame = 0xFFFF00;
	loadCanvas();
}
	function yellowGreen(){
	nameColor.innerHTML = 'Жёлто-зелёный';
	colorGame = 0x9ACD32;
	loadCanvas();
}
	function greenYellow(){
	nameColor.innerHTML = 'Зелёно-жёлтый';
	colorGame = 0xADFF2F;
	loadCanvas();
}
	function chartreuse(){
	nameColor.innerHTML = 'Шартрёз (ликёр)';
	colorGame = 0x7FFF00;
	loadCanvas();
}
	function greenLawn(){
	nameColor.innerHTML = 'Зелёный газон';
	colorGame = 0x7CFC00;
	loadCanvas();
}
	function green(){
	nameColor.innerHTML = 'Зелёный';
	colorGame = 0x008000;
	loadCanvas();
}
	function lime(){
	nameColor.innerHTML = 'Лаймовый';
	colorGame = 0x00FF00;
	loadCanvas();
}
	function greenLime(){
	nameColor.innerHTML = 'Зелёный лайм';
	colorGame = 0x32CD32;
	loadCanvas();
}
	function springGreen(){
	nameColor.innerHTML = 'Весенне-зелёный';
	colorGame = 0x00FF7F;
	loadCanvas();
}
	function springGreenNeutral(){
	nameColor.innerHTML = 'Весенне-зелёный нейтральный';
	colorGame = 0x00FA9A;
	loadCanvas();
}
	function turquoise(){
	nameColor.innerHTML = 'Бирюзовый';
	colorGame = 0x40E0D0;
	loadCanvas();
}
	function lightGreenSea(){
	nameColor.innerHTML = 'Светло-зелёное море';
	colorGame = 0x20B2AA;
	loadCanvas();
}
	function turquoiseNeutral(){
	nameColor.innerHTML = 'Бирюзовый нейтральный';
	colorGame = 0x48D1CC;
	loadCanvas();
}
	function darkCyan(){
	nameColor.innerHTML = 'Тёмный циан';
	colorGame = 0x008B8B;
	loadCanvas();
}
	function seaWave(){
	nameColor.innerHTML = 'Морская волна';
	colorGame = 0x00FFFF;
	loadCanvas();
}
	function darkTurquoise(){
	nameColor.innerHTML = 'Тёмно-бирюзовый';
	colorGame = 0x00CED1;
	loadCanvas();
}
	function skyBlueDark(){
	nameColor.innerHTML = 'Небесно-голубой тёмный';
	colorGame = 0x00BFFF;
	loadCanvas();
}
	function deceivingBlue(){
	nameColor.innerHTML = 'Обманчивый синий';
	colorGame = 0x1E90FF;
	loadCanvas();
}
	function royalBlue(){
	nameColor.innerHTML = 'Королевский синий';
	colorGame = 0x4169E1;
	loadCanvas();
}
	function navy(){
	nameColor.innerHTML = 'Военно-морского флота';
	colorGame = 0x000080;
	loadCanvas();
}
function navyBlue(){
	nameColor.innerHTML = 'Тёмно-синий';
	colorGame = 0x00008B;
	loadCanvas();
}
	function blueNeutral(){
	nameColor.innerHTML = 'Cиний нейтральный';
	colorGame = 0x0000CD;
	loadCanvas();
}
	function darkBlue(){
	nameColor.innerHTML = 'Тёмно-голубой';
	colorGame = 0x0000FF;
	loadCanvas();
}
	function blueViolet(){
	nameColor.innerHTML = 'Сине-фиолетовый';
	colorGame = 0x8A2BE2;
	loadCanvas();
}
	function darkOrchid(){
	nameColor.innerHTML = 'Тёмная орхидея';
	colorGame = 0x9932CC;
	loadCanvas();
}
	function darkViolet(){
	nameColor.innerHTML = 'Тёмно-фиолетовый';
	colorGame = 0x9400D3;
	loadCanvas();
}
	function Violet(){
	nameColor.innerHTML = 'Фиолетовый';
	colorGame = 0x800080;
	loadCanvas();
}
	function darkMagenta(){
	nameColor.innerHTML = 'Тёмный маджента';
	colorGame = 0x8B008B;
	loadCanvas();
}
	function magenta(){
	nameColor.innerHTML = 'Маджента';
	colorGame = 0xFF00FF;
	loadCanvas();
}
	function violetRedNeutral(){
	nameColor.innerHTML = 'Фиолетово-красный нейтральный';
	colorGame = 0xC71585;
	loadCanvas();
}
	function intensePink(){
	nameColor.innerHTML = 'Насыщенный розовый';
	colorGame = 0xFF1493;
	loadCanvas();
}
	function brightPink(){
	nameColor.innerHTML = 'Ярко-розовый';
	colorGame = 0xFF69B4;
	loadCanvas();
}
	function crimson(){
	nameColor.innerHTML = 'Малиновый';
	colorGame = 0xDC143C;
	loadCanvas();
}
	function brown(){
	nameColor.innerHTML = 'Коричневый';
	colorGame = 0xA52A2A;
	loadCanvas();
}
	function indianRed(){
	nameColor.innerHTML = 'Красный индийский';
	colorGame = 0xCD5C5C;
	loadCanvas();
}
	function pinkBrown(){
	nameColor.innerHTML = 'Розово-коричневый';
	colorGame = 0xBC8F8F;
	loadCanvas();
}
	function lightCoral(){
	nameColor.innerHTML = 'Светло-коралловый';
	colorGame = 0xF08080;
	loadCanvas();
}
	function snow(){
	nameColor.innerHTML = 'Снег';
	colorGame = 0xFFFAFA;
	loadCanvas();
}
	function mistyRose(){
	nameColor.innerHTML = 'Туманная роза';
	colorGame = 0xFFE4E1;
	loadCanvas();
}
	function darkSalmon(){
	nameColor.innerHTML = 'Тёмный лосось';
	colorGame = 0xE9967A;
	loadCanvas();
}
	function lightSalmon(){
	nameColor.innerHTML = 'Светлый лосось';
	colorGame = 0xFFA07A;
	loadCanvas();
}
	function ocher(){
	nameColor.innerHTML = 'Охра';
	colorGame = 0xA0522D;
	loadCanvas();
}
	function seaShell(){
	nameColor.innerHTML = 'Морская ракушка';
	colorGame = 0xFFF5EE;
	loadCanvas();
}
	function saddlebrown(){
	nameColor.innerHTML = 'Седло Браун';
	colorGame = 0x8B4513;
	loadCanvas();
}
	function peachPowder(){
	nameColor.innerHTML = 'Персиковая пудра';
	colorGame = 0xFFDAB9;
	loadCanvas();
}
	function peru(){
	nameColor.innerHTML = 'Перу';
	colorGame = 0xCD853F;
	loadCanvas();
}
	function textile(){
	nameColor.innerHTML = 'Текстильный';
	colorGame = 0xFAF0E6;
	loadCanvas();
}
	function biscuit(){
	nameColor.innerHTML = 'Бисквит';
	colorGame = 0xFFE4C4;
	loadCanvas();
}
	function denseTree(){
	nameColor.innerHTML = 'Плотное дерево';
	colorGame = 0xDEB887;
	loadCanvas();
}
	function tan(){
	nameColor.innerHTML = 'Загар';
	colorGame = 0xD2B48C;
	loadCanvas();
}
	function antiqueWhite(){
	nameColor.innerHTML = 'Античный белый';
	colorGame = 0xFAEBD7;
	loadCanvas();
}
	function whiteNavajo(){
	nameColor.innerHTML = 'Белый навахо';
	colorGame = 0xFFDEAD;
	loadCanvas();
}
	function blanchedAlmonds(){
	nameColor.innerHTML = 'Бланшированный миндаль';
	colorGame = 0xFFEBCD;
	loadCanvas();
}
	function papayaEscape(){
	nameColor.innerHTML = 'Побег папайи';
	colorGame = 0xFFEFD5;
	loadCanvas();
}
	function moccasin(){
	nameColor.innerHTML = 'Мокасиновый';
	colorGame = 0xFFE4B5;
	loadCanvas();
}
	function wheat(){
	nameColor.innerHTML = 'Пшеничный';
	colorGame = 0xF5DEB3;
	loadCanvas();
}
	function oldLace(){
	nameColor.innerHTML = 'Старое кружево';
	colorGame = 0xFDF5E6;
	loadCanvas();
}
	function floralWhite(){
	nameColor.innerHTML = 'Цветочный белый';
	colorGame = 0xFFFAF0;
	loadCanvas();
}
	function cornHair(){
	nameColor.innerHTML = 'Кукурузный волос';
	colorGame = 0xFFF8DC;
	loadCanvas();
}
	function khaki(){
	nameColor.innerHTML = 'Хаки';
	colorGame = 0xF0E68C;
	loadCanvas();
}
	function lemonChiffon(){
	nameColor.innerHTML = 'Лимонный шифон';
	colorGame = 0xFFFACD;
	loadCanvas();
}
	function pallidum(){
	nameColor.innerHTML = 'Бледный золотарник';
	colorGame = 0xEEE8AA;
	loadCanvas();
}
	function darkKhaki(){
	nameColor.innerHTML = 'Тёмный хаки';
	colorGame = 0xBDB76B;
	loadCanvas();
}
	function beige(){
	nameColor.innerHTML = 'Бежевый';
	colorGame = 0xF5F5DC;
	loadCanvas();
}
	function lightYellowGoldenrod(){
	nameColor.innerHTML = 'Светло-жёлтый золотарник';
	colorGame = 0xFAFAD2;
	loadCanvas();
}
	function lightYellow(){
	nameColor.innerHTML = 'Светло-жёлтый';
	colorGame = 0xFFFFE0;
	loadCanvas();
}
	function ivory(){
	nameColor.innerHTML = 'Слоновая кость';
	colorGame = 0xFFFFF0;
	loadCanvas();
}
	function darkOlive(){
	nameColor.innerHTML = 'Тёмно-оливковый';
	colorGame = 0x6B8E23;
	loadCanvas();
}
	function darkOliveGreen(){
	nameColor.innerHTML = 'Тёмно-оливковый зелёный';
	colorGame = 0x556B2F;
	loadCanvas();
}
	function darkGreenSea(){
	nameColor.innerHTML = 'Тёмно-зелёное море';
	colorGame = 0x8FBC8F;
	loadCanvas();
}
	function darkGreen(){
	nameColor.innerHTML = 'Тёмно-зелёный';
	colorGame = 0x006400;
	loadCanvas();
}
	function greenForest(){
	nameColor.innerHTML = 'Зелёный лесной';
	colorGame = 0x228B22;
	loadCanvas();
}
	function lightGreen(){
	nameColor.innerHTML = 'Светло-зелёный';
	colorGame = 0x90EE90;
	loadCanvas();
}
	function paleGreen(){
	nameColor.innerHTML = 'Бледно-зелёный';
	colorGame = 0x98FB98;
	loadCanvas();
}
	function honeydew(){
	nameColor.innerHTML = 'Медвяная роса';
	colorGame = 0xF0FFF0;
	loadCanvas();
}
	function greenSea(){
	nameColor.innerHTML = 'Зелёное море';
	colorGame = 0x2E8B57;
	loadCanvas();
}
	function greenSeaNeutral(){
	nameColor.innerHTML = 'Зелёное море, нейтральный';
	colorGame = 0x3CB371;
	loadCanvas();
}
	function mintCream(){
	nameColor.innerHTML = 'Мятный крем';
	colorGame = 0xF5FFFA;
	loadCanvas();
}
	function aquamarineNeutral(){
	nameColor.innerHTML = 'Аквамариновый нейтральный';
	colorGame = 0x66CDAA;
	loadCanvas();
}
	function aquamarine(){
	nameColor.innerHTML = 'Аквамариновый';
	colorGame = 0x7FFFD4;
	loadCanvas();
}
	function darkSlateGray(){
	nameColor.innerHTML = 'Тёмный грифельно-серый';
	colorGame = 0x2F4F4F;
	loadCanvas();
}
	function paleTurquoise(){
	nameColor.innerHTML = 'Бледно-бирюзовый';
	colorGame = 0xAFEEEE;
	loadCanvas();
}
	function lightDarkBlue(){
	nameColor.innerHTML = 'Светло-голубой';
	colorGame = 0xE0FFFF;
	loadCanvas();
}
	function azure(){
	nameColor.innerHTML = 'Лазурный';
	colorGame = 0xF0FFFF;
	loadCanvas();
}
	function grayBlue(){
	nameColor.innerHTML = 'Серо-синий';
	colorGame = 0x5F9EA0;
	loadCanvas();
}
	function dustyBlue(){
	nameColor.innerHTML = 'Пыльный голубой';
	colorGame = 0xB0E0E6;
	loadCanvas();
}
	function lightBlue(){
	nameColor.innerHTML = 'Светло-синий';
	colorGame = 0xADD8E6;
	loadCanvas();
}
	function skyBlue(){
	nameColor.innerHTML = 'Небесно-голубой';
	colorGame = 0x87CEEB;
	loadCanvas();
}
	function skyBlueLight(){
	nameColor.innerHTML = 'Небесно-голубой светлый';
	colorGame = 0x87CEFA;
	loadCanvas();
}
	function blueSteel(){
	nameColor.innerHTML = 'Синяя сталь';
	colorGame = 0x4682B4;
	loadCanvas();
}
	function blueAlice(){
	nameColor.innerHTML = 'Синяя Элис';
	colorGame = 0xF0F8FF;
	loadCanvas();
}
	function graySlate(){
	nameColor.innerHTML = 'Серый шифер';
	colorGame = 0x708090;
	loadCanvas();
}
	function lightGraySlate(){
	nameColor.innerHTML = 'Светло-серый шифер';
	colorGame = 0x778899;
	loadCanvas();
}
	function lightSteelBlue(){
	nameColor.innerHTML = 'Светло-стальной синий';
	colorGame = 0xB0C4DE;
	loadCanvas();
}
	function cornflowerBlue(){
	nameColor.innerHTML = 'Васильковый голубой';
	colorGame = 0x6495ED;
	loadCanvas();
}
	function lavender(){
	nameColor.innerHTML = 'Лаванда';
	colorGame = 0xE6E6FA;
	loadCanvas();
}
	function ghostlyWhite(){
	nameColor.innerHTML = 'Призрачно-белый';
	colorGame = 0xF8F8FF;
	loadCanvas();
}
	function midnightBlue(){
	nameColor.innerHTML = 'Полуночный синий';
	colorGame = 0x191970;
	loadCanvas();
}
	function slateBlue(){
	nameColor.innerHTML = 'Аспидно-синий';
	colorGame = 0x6A5ACD;
	loadCanvas();
}
	function darkSlateBlue(){
	nameColor.innerHTML = 'Тёмный аспидно-синий';
	colorGame = 0x483D8B;
	loadCanvas();
}
	function neutralSlateBlue(){
	nameColor.innerHTML = 'Нейтральный аспидно-синий';
	colorGame = 0x7B68EE;
	loadCanvas();
}
	function violetNeutral(){
	nameColor.innerHTML = 'Фиолетовый нейтральный';
	colorGame = 0x9370DB;
	loadCanvas();
}
	function indigo(){
	nameColor.innerHTML = 'Индиго';
	colorGame = 0x4B0082;
	loadCanvas();
}
	function neutralOrchidColor(){
	nameColor.innerHTML = 'Нейтральный цвет орхидеи';
	colorGame = 0xBA55D3;
	loadCanvas();
}
	function plumLight(){
	nameColor.innerHTML = 'Слива светлая';
	colorGame = 0xDDA0DD;
	loadCanvas();
}
	function pinkPurple(){
	nameColor.innerHTML = 'Розово-фиолетовый';
	colorGame = 0xEE82EE;
	loadCanvas();
}
	function thistle(){
	nameColor.innerHTML = 'Чертополох';
	colorGame = 0xD8BFD8;
	loadCanvas();
}
	function orchid(){
	nameColor.innerHTML = 'Орхидея';
	colorGame = 0xDA70D6;
	loadCanvas();
}
	function pinkLavender(){
	nameColor.innerHTML = 'Розово-лавандовый';
	colorGame = 0xFFF0F5;
	loadCanvas();
}
	function lilac(){
	nameColor.innerHTML = 'Лиловый';
	colorGame = 0xDB7093;
	loadCanvas();
}
	function pink(){
	nameColor.innerHTML = 'Розовый';
	colorGame = 0xFFC0CB;
	loadCanvas();
}
	function lightPink(){
	nameColor.innerHTML = 'Светло-розовый';
	colorGame = 0xFFB6C1;
	loadCanvas();
}
	function black(){
	nameColor.innerHTML = 'Чёрный';
	colorGame = 0x000000;
	loadCanvas();
}
	function dullGray(){
	nameColor.innerHTML = 'Тускло-серый';
	colorGame = 0x696969;
	loadCanvas();
}
	function gray(){
	nameColor.innerHTML = 'Серый';
	colorGame = 0x808080;
	loadCanvas();
}
	function darkGray(){
	nameColor.innerHTML = 'Тёмно-серый';
	colorGame = 0xA9A9A9;
	loadCanvas();
}
	function silver(){
	nameColor.innerHTML = 'Серебряный';
	colorGame = 0xC0C0C0;
	loadCanvas();
}
	function lightGray(){
	nameColor.innerHTML = 'Светло-серый';
	colorGame = 0xD3D3D3;
	loadCanvas();
}
	function geinsboro(){
	nameColor.innerHTML = 'Геинсборо';
	colorGame = 0xDCDCDC;
	loadCanvas();
}
	function whiteSmoke(){
	nameColor.innerHTML = 'Белый дым';
	colorGame = 0xF5F5F5;
	loadCanvas();
}
	function white(){
	nameColor.innerHTML = 'Белый';
	colorGame = 0xFFFFFF;
	loadCanvas();
}

function answerfalse(){
	correctCell.style.backgroundColor = '#7CFC00';
	falseColors += 1;
	name.innerHTML = 'Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors;
	// Записываем данные в JSON;
	jsonStorage = JSON.stringify('Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors);
	localStorage['Результат прошлой игры:'] = jsonStorage;
	// Добавляем звуковое сопровождение для ячеек;
	let cellAudio = new Audio('http://hgm.nubati.net/xboard/sounds/penalty.wav');
	cellAudio.play();
	correctCell.removeEventListener ('click', answertrue);
	cellArray[0].removeEventListener ('click', answerfalse);
	cellArray[1].removeEventListener ('click', answerfalse);
	cellArray[2].removeEventListener ('click', answerfalse); 
	setTimeout (randomPictureGame, 2000);
} 
function answertrue(){
	correctCell.style.backgroundColor = '#7CFC00';
	trueColors += 1;
	name.innerHTML = 'Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors;
	// Записываем данные в JSON;
	jsonStorage = JSON.stringify('Правильных ответов: ' + trueColors + '<br/> Ошибок: ' + falseColors);
	localStorage['Результат прошлой игры:'] = jsonStorage;
	// Добавляем звуковое сопровождение для ячеек;
	let cellAudio = new Audio('http://www.exkill.de/cstrike/sound/misc/ding.wav');
	cellAudio.play();	
	correctCell.removeEventListener ('click', answertrue);
	cellArray[0].removeEventListener ('click', answerfalse);
	cellArray[1].removeEventListener ('click', answerfalse);
	cellArray[2].removeEventListener ('click', answerfalse); 
	setTimeout (randomPictureGame, 2000);
}