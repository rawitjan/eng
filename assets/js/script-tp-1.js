function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        } else {
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
(function() {

    var textOBJ = function(txt, id) {
      this.initialize(txt, id);
    }
    var p = textOBJ.prototype = new createjs.Container(); // inherit from Container
  
    p.text;
    p.word;
    p.correct;
    p.cID = 0;
    p.background;
    p.mouseDown = false;
    p.width;
    p.height;
  
    p.Container_initialize = p.initialize;
    p.initialize = function(txt, id) {
      this.Container_initialize();
      this.cID = id;
      this.word = txt;
      this.text = new createjs.Text(txt, "bold 18px Montserrat Alternates", "#000");
      var color = "white";
  
      this.text.textBaseline = "top";
      this.text.textAlign = "center";
  
      this.width = this.text.getMeasuredWidth() + 30;
      this.height = this.text.getMeasuredHeight() + 10;
  
      this.background = new createjs.Shape();
      this.background.graphics.beginFill(color).drawRoundRect(0, 0, this.width, this.height, 10);
  
      this.text.x = this.width/2;
      this.text.y = 10;
  
      this.addChild(this.background, this.text);
      this.addEventListener("mousedown", this.handleDown);
    }
  
    p.handleDown = function(event) {
      var target = event.target;
      target.mouseDown = true;
  
      clickedID = target.cID;
  
      color = createjs.Graphics.getHSL(Math.random() * 360, 300, 40);
      isDown = true;
      startX = event.stageX;
      startY = event.stageY;
    }
  
    window.textOBJ = textOBJ;
  }());
  
  ////////////////////////////////////////////////////////////////////////////////////////
  
  var stage;
  var startX;
  var startY;
  var endX;
  var endY;
  var tempG = new createjs.Graphics();
  var tempLine = new createjs.Shape(tempG);
  var isDown = false;
  var color;
  var clickedID = -1;
  var correctLines = [];
  var correctID = [];
  var wrongCount = 0;
  
  window.onload = function() {
    stage = new createjs.Stage("puzzle");
    createjs.Touch.enable(stage);
    init();
  }
  
  var style = "bold 18px Montserrat Alternates";
  var styleBold = "bold 16px Montserrat Alternates";
  var color = "#000000";
  
  var input = new Object();

if (getAllUrlParams().num == 1) {
    input.words = [
        "Leisure time, Free time" ,
        "Day off" ,
        "Long weekend" , 
        "The daily round",
        "Well-earned rest",
        "Early riser",
        "Beauty sleep",
        "Change of air",
        "In on's hours of ease",
        "Take one's ease",
        "Take a rest",
        "Take a nap",
        "Visit relatives",
        "Enjoy oneself",
        "Go out to eat",
        "Do some housework",
        "Go to church",
        "Go shopping",
        "Go out with friends",
        "Make a day of it",
        "Have a fine time",
        "Have the time of one's life"
    ];
      input.definitions = [
        "свободное время" ,
        "выходной день" ,
        "длинные выходные (обычно в связи с официальными праздниками)",
        "круг ежедневных занятий",
        "заслуженный отдых",
        "человек, встающий рано",
        "дневной сон; ранний сон (до полуночи)",
        "перемена обстановки, т.е. день, проведенный вне дома",
        "на досуге",
        "наслаждаться досугом, отдыхом",
        "отдыхать",
        "вздремнуть",
        "проведать родных (родственников)",
        "хорошо проводить время",
        "пойти на ужин в ресторан",
        "заняться домашними делами",
        "сходить в церковь",
        "пойти на шоппинг (по магазинам, за покупками)",
        "гулять с друзьями",
        "весело провести время",
        "хорошо проводить время",
        "весело провести время"
    ];
  };

  if (getAllUrlParams().num == 2) {
    input.words = [
      "rest",
      "holiday",
      "leisure",
      "rest",
      "vacation",
      "day off",
      "weekend",
      "resort",
      "spa",
      "sanatorium",
      "boarding house",
      "camping site",
      "travel agency",
      "tourist agency",
      "tourist centre",
      "tent",
      "holiday voucher",
      "excursion",
      "guide",
      "guidebook",
      "hiking",
      "trip",
      "cycling",
      "walk",
      "picnic",
      "tour",
      "walking tour",
      "tourism",
      "visit",
      "travel"
    ];
      input.definitions = [
        "отдых",
        "каникулы",
        "досуг",
        "отдыхать",
        "отпуск",
        "отгул",
        "выходные",
        "курорт",
        "курорт с минеральными водами",
        "санаторий",
        "пансионат",
        "кэмпинг",
        "турагентство",
        "туристическое агентство",
        "турбаза",
        "палатка",
        "путевка",
        "экскурсия",
        "экскурсовод",
        "путеводитель",
        "прогулка пешком",
        "поездка",
        "катание на велосипеде",
        "гулять",
        "пикник",
        "туристическая поездка",
        "поход",
        "туризм",
        "посетить",
        "путешествовать"
    ];
  };

  if (getAllUrlParams().num == 3) {
    input.words = [
        "beach",
        "boat",
        "tan",
        "sunbathe",
        "dacha",
        "hotel",
        "room",
        "luggage",
        "safe",
        "suitcase",
        "bag",
        "rucksack",
        "departure",
        "arrival",
        "alarm clock",
        "tablets",
        "binoculars",
        "dictionary",
        "camera",
        "first aid kit",
        "map",
        "money belt",
        "notebook",
        "soap",
        "souvenirs",
        "sun hat",
        "travel guide",
        "umbrella",
        "walking boots",
        "waterproof clothes"
    ];
      input.definitions = [
        "пляж",
        "лодка",
        "загорать",
        "принимать солнечные ванны",
        "дача",
        "гостиница",
        "номер",
        "багаж",
        "сейф",
        "чемодан",
        "сумка",
        "рюкзак",
        "отъезд",
        "прибытие",
        "будильник",
        "таблетки",
        "бинокль",
        "словарь",
        "фотокамера",
        "аптечка",
        "карта",
        "сумка на поясе",
        "записная книжка",
        "мыло",
        "сувениры",
        "шляпа от солнца",
        "путеводитель",
        "зонт",
        "походные ботинки",
        "водонепроницаемая одежда"
    ];
  };

  if (getAllUrlParams().num == 4) {
    input.words = [
        "box office",
        "character",
        "checkroom",
        "comedian",
        "comedy",
        "company (of actors)",
        "crowd scenes",
        "drama",
        "Drama Theatre",
        "dress circle",
        "dress rehearsal",
        "dresses / costumes",
        "entrance",
        "evening performance",
        "exit",
        "first night / premiere",
        "gallery",
        "make-up man",
        "matinee (performance)",
        "opera",
        "Opera and Ballet Theatre",
        "Opera House",
        "performance",
        "pit",
        "play",
        "producer",
        "Puppet Theatre",
        "Satire Theatre",
        "scenery",
        "scriptwriter"
    ];
      input.definitions = [
        "билетная касса",
        "действующее лицо",
        "гардероб",
        "актер-комик",
        "комедия",
        "труппа (актеров)",
        "массовые сцены",
        "драма",
        "драматический театр",
        "балкон первого яруса, бельэтаж",
        "генеральная репетиция",
        "костюмы",
        "вход",
        "вечерний спектакль",
        "выход",
        "премьера",
        "галерка",
        "гример",
        "спектакль <i>(как правило, утренний или дневной)</i>",
        "опера",
        "театр оперы и балета",
        "оперный театр",
        "представление, спектакль",
        "амфитеатр",
        "пьеса",
        "режиссер, постановщик",
        "театр кукол",
        "театр сатиры",
        "декорация",
        "сценарист"
    ];
  };

  if (getAllUrlParams().num == 5) {
    input.words = [
        "sets",
        "setting",
        "sketch",
        "stage",
        "theatre (BrE) / theater (AmE) ",
        "ticket",
        "tragedy",
        "movie theater, movie house / cinema (BrE)",
        "film / movie / flick",
        "motion picture",
        "silent film",
        "sound film / talkie",
        "black and white film",
        "color documentary film",
        "feature film",
        "genre",
        "thriller",
        "newsreel",
        "historical film",
        "educational film",
        "popular science film",
        "comedy",
        "animated cartoon / cartoon",
        "children's film",
        "cinemascope",
        "wide-screen film",
        "3-D film",
        "full-length film",
        "short film",
        "subtitles / captions"
    ];
      input.definitions = [
        "декорации к определенной сцене",
        "место действия (декорации, обстановка действия)",
        "эскиз",
        "сцена",
        "театр",
        "билет",
        "трагедия",
        "кинотеатр",
        "фильм",
        "кинофильм",
        "немой фильм",
        "звуковой фильм",
        "черно-белый фильм",
        "цветной документальный фильм",
        "художественный фильм",
        "жанр",
        "триллер",
        "хроника, киножурнал",
        "исторический фильм",
        "учебный фильм",
        "научно-популярный фильм",
        "комедия",
        "мультипликационный фильм / мультфильм",
        "детский фильм",
        "фильм для широкого экрана",
        "широкоэкранный фильм",
        "стереофильм, фильм в 3D",
        "полнометражный фильм",
        "короткометражный фильм",
        "субтитры"
    ];
  };

  if (getAllUrlParams().num == 6) {
    input.words = [
        "credits",
        "title of the film",
        "screen",
        "script of a film",
        "review",
        "scene / shot",
        "close-up",
        "episode",
        "screen adaptation / film adaptation / screen version",
        "movie star / film star / cinema star",
        "star (in a film)",
        "trailer",
        "viewing",
        "show",
        "movie-goer / film-fan",
        "reviewer",
        "film crew",
        "producer",
        "executive producer",
        "director",
        "assistant director",
        "camera operator / cameraman",
        "actor",
        "actress",
        "prequel",
        "sequel",
        "show a film",
        "shoot a film",
        "release a film",
        "dub (in) a film",
        "direct a film"
    ];
      input.definitions = [
        "титры",
        "название фильма",
        "экран; экранизировать",
        "сценарий фильма",
        "рецензия",
        "кадр",
        "кадр, снятый крупным планом",
        "эпизод",
        "экранизация",
        "кинозвезда",
        "появляться в ведущей роли (в фильме)",
        "трейлер",
        "просмотр фильма",
        "сеанс (в кинотеатре)",
        "любитель кино",
        "критик",
        "команда фильма",
        "продюсер",
        "исполнительный продюсер",
        "режиссер",
        "помощник режиссера",
        "оператор камеры",
        "актер",
        "актриса",
        "приквел",
        "сиквел","демонстрировать фильм","снимать фильм","выпускать фильм на экран","дублировать фильм","режиссировать фильм"
    ];
  };

  if (getAllUrlParams().num == 7) {
    input.words = [
      "travelling / travel", 
      "to be fond of travelling", 
      "journey", 
      "trip/ school trip", 
      "two-day trip", 
      "tour", 
      "package tour", 
      "to buy a package tour", 
      "cruise", 
      "voyage", 
      "to drive/ go for a drive", 
      "flight", 
      "hitchhike", 
      "to go hitchhiking", 
      "to go on a journey / cruise/school trip", 
      "travel agency", 
      "to travel (go) abroad",
      "to get to", 
      "to arrive in/ at", 
      "stay in a hotel", 
      "destination", 
      "single (return) ticket", 
      "to book tickets", 
      "luggage (baggage)", 
      "suitcase", 
      "rucksack (backpack)", 
      "bag/ hand bag", 
      "porter", 
      "lost and found office", 
      "left luggage office (check room)", 
      "information desk", 
      "to pack bags (luggage)", 
      "to change to", 
      "to see smb off"
    ];
      input.definitions = [
        "путешествие", 
        "любить путешествовать", 
        "длительное путешествие ( по суше)", 
        "поездка (короткая)/ экскурсия", 
        "двухдневная поездка", 
        "поездка/ тур", 
        "путешествие по тур. путевке", 
        "купить тур. путевку", 
        "круиз", 
        "путешествие по морю", 
        "поездка на машине/ прокатиться", 
        "полет/ рейс", 
        "путешествие автостопом", 
        "отправиться в путешествие автостопом", 
        "отправиться в путешествие/ круиз/ на экскурсию", 
        "туристическое агентство", 
        "путешествовать (ехать) за границу", 
        "добраться", 
        "прибыть в (большой/ небольшой) город", 
        "остановиться в отеле", 
        "место назначения (конечная цель)", 
        "билет в один конец (туда-обратно)", 
        "заказать билеты", 
        "багаж", 
        "чемодан", 
        "рюкзак (туристический рюкзак)", 
        "сумка", 
        "носильщик", 
        "бюро находок", 
        "камера хранения", 
        "справочное бюро", 
        "упаковывать сумки (багаж)", 
        "пересаживаться на", 
        "провожать кого-либо"
    ];
  };

  if (getAllUrlParams().num == 8) {
    input.words = [
      "travelling / travel",
      "to be fond of travelling",
      "journey",
      "trip/ school trip",
      "two-day trip",
      "tour",
      "package tour",
      "to buy a package tour",
      "cruise",
      "voyage",
      "to drive/ go for a drive",
      "flight",
      "hitchhike",
      "to go hitchhiking",
      "to go on a journey / cruise/school trip",
      "travel agency",
      "to travel (go) abroad"
    ];
      input.definitions = [
        "путешествие", 
        "любить путешествовать", 
        "длительное путешествие ( по суше)", 
        "поездка (короткая)/ экскурсия", 
        "двухдневная поездка", 
        "поездка/ тур", 
        "путешествие по тур. путевке", 
        "купить тур. путевку", 
        "круиз", 
        "путешествие по морю", 
        "поездка на машине/ прокатиться", 
        "полет/ рейс", 
        "путешествие автостопом", 
        "отправиться в путешествие автостопом", 
        "отправиться в путешествие/ круиз/ на экскурсию", 
        "туристическое агентство", 
        "путешествовать (ехать) за границу"
    ];
  };

  if (getAllUrlParams().num == 9) {
    input.words = [
      "be on holiday (on vacation)",
      "make friends",
      "have a wonderful time",
      "take pictures of",
      "enjoy",
      "visit",
      "go camping",
      "go boating",
      "climb the mountains",
      "fish by the river",
      "make a campfire",
      "sit round the fire",
      "roast sausages on the open fire",
      "swim in the river (in the lake)",
      "pick up mushrooms",
      "pick up fruit",
      "take care of domestic animals",
      "eat healthy food",
      "spend a lot of time outdoors"
    ];
      input.definitions = [
        "быть в отпуске",
        "подружиться",
        "замечательно провести время",
        "фотографировать",
        "наслаждаться",
        "посещать",
        "ходить в поход",
        "кататься на лодке",
        "подниматься в горы",
        "ловить рыбу у реки",
        "разжигать большой костер",
        "сидеть вокруг костра",
        "жарить сосиски на костре",
        "плавать в реке (в озере)",
        "собирать грибы",
        "собирать фрукты",
        "ухаживать за домашними животными",
        "есть здоровую пищу",
        "проводить много времени на свежем воздухе"
    ];
  };

  if (getAllUrlParams().num == 10) {
    input.words = [
      "representative",
      "origins",
      "two-chamber system",
      "the House of Lords",
      "the House of Commons",
      "to constitute",
      "to govern ",
      "convention",
      "to define",
      "to involve",
      "tension",
      "to break (past broke, p.p. broken) out",
      "restoration",
      "to enhance",
      "to elect",
      "retirement",
      "the Prime Minister",
      "to depend on",
      "responsible",
      "coronation",
      "to make (past made, p.p. made) up ",
      "the speaker",
      "row",
      "to attend",
      "to mention",
      "bill",
      "proposal",
      "royal assent",
      "rank",
      "chairman",
      "the Lord Chancellor",
      "negotiations"
    ];
      input.definitions = [
        "полет, представительный",
        "происхождение, начало",
        "двухпалатная система",
        "палата лордов (верхняя палата британского парламента)",
        "палата общин (нижняя палата британского парламента)",
        "составлять; учреждать; создавать",
        "править, управлять",
        "соглашение, договоренность, договор, конвенция",
        "определять, давать определение",
        "взимать",
        "противоречия, напряженность",
        "разразиться",
        "ист. Реставрация (в 1660 p. в Англии)",
        "увеличивать, усиливать",
        "выбирать, выбирать",
        "выход в отставку; выход на пенсию; отход от дел",
        "премьер-министр",
        "зависеть от MP - сокращение от член парламента)",
        "ответственный, несущий ответственность, отвечающий",
        "коронация",
        "здесь",
        "спикер",
        "ряд",
        "посещать; присутствовать",
        "упоминать, ссылаться на",
        "законопроект, билль",
        "предложение; план",
        "королевская одобрение, утверждение, разрешение",
        "ранг",
        "председатель",
        "лорд-канцлер",
        "переговоры"
    ];
  };

  if (getAllUrlParams().num == 11) {
    input.words = [
      "important",
      "celebrated",
      "night",
      "rugs",
      "blankets",
      "the guest",
      "composed of",
      "traditional dish",
      "hope",
      "popular"
    ];
      input.definitions = [
        "важный",
        "праздновать",
        "ночь",
        "ковер",
        "одеяло",
        "гость",
        "состоит из",
        "традиционное блюдо",
        "надежда",
        "популярный"
    ];
  };

  if (getAllUrlParams().num == 12) {
    input.words = [
      "State",
      "Private",
      "Establishment",
      "Infant school",
      "Comprehensive school",
      "Free-of-charge",
      "Highly-skilled expert",
      "Competitive basis",
      "Ambition",
      "Scholarship"
    ];
      input.definitions = [
        "государство",
        "частный",
        "учреждение",
        "детская школа",
        "общеобразовательная школа",
        "бесплатно",
        "высококвалифицированный специалист",
        "конкурсная основа",
        "амбиция",
        "стипендия"
    ];
  };

  if (getAllUrlParams().num == 13) {
    input.words = [
      "Considerable",
      "Post-school",
      "Assisted colleges",
      "Tuition fees",
      "Accommodation",
      "Loans",
      "Part-time",
      "Freedom",
      "Admission",
      "Virtually",
      "Degree",
      "Research",
      "Performance",
      "Outlook",
      "Private"
    ];
      input.definitions = [
        "значительный",
        "послешкольное (аспирантура)",
        "вспомогательные колледжи",
        "плата за обучение",
        "проживание",
        "кредиты",
        "неполная занятость",
        "свобода",
        "допуск",
        "практически",
        "степень",
        "исследование",
        "представление",
        "перспектива",
        "частный"
    ];
  };

  if (getAllUrlParams().num == 14) {
    input.words = [
      "1986 жыл 16 желтоқсан",
      "1991 жыл 1 желтоқсан",
      "1991 жыл 16 желтоқсан",
      "1992 жыл 2 наурыз",
      "1992 жыл 4 маусым",
      "1993 жыл 28 қаңтар",
      "1993 жыл 15 қараша",
      "1995 жыл 30 тамыз",
      "1998 жыл 6 мамыр",
      "2006 жыл 7 қаңтар"
    ];
      input.definitions = [
        "Желтоқсан оқиғасы",
        "Тұңғыш Президент сайланды",
        "Тәуелсіздік туралы Заң қабылданды",
        "БҰҰ-на мүше болды",
        "Мемлекеттік рәміздер қабылданды",
        "Тұңғыш Конституция қабылданды",
        "Ұлттық валюта –теңге айналымға енді",
        "Жаңа Конституция қабылданды",
        "жаңа елорданың атауы Астана болып өзгертілді",
        "Әнұранның жаңа нұсқасы қабылданды."
    ];
  };

  if (getAllUrlParams().num == 15) {
    input.words = [
    ];
      input.definitions = [
    ];
  };
  
  var output = new Object();
  output.words = [];
  output.definitions = [];
  
  function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
      if (source[i].cID === id) {
        return source[i];
      }
    }
    throw "Couldn't find object with cID: " + id;
  }
  
  function seedShuffle(ary, seed) {
    var tem;
    var j;
    var tt = ary.length;
    for (var i = 0; i < tt; i++) {
      j = (seed % (i + 1) + i) % tt;
      tem = ary[i];
      ary[i] = ary[j];
      ary[j] = tem;
    }
    return ary;
  }
  
  function init() {
    var seed;
    var seed2;
    var i;
    var offsetY = 40;
    var offsetX = 50;
    for (i = 0; i < input.words.length; i++) {
      output.words.push(new textOBJ(input.words[i], i));
      output.definitions.push(new textOBJ(input.definitions[i], i));
      /*
          create array with x y positions of both definitions and words for use later
           */
    }
    seed = Math.floor(Math.random() * 1000);
    seed2 = Math.floor(Math.random() * 1000);
    output.words = seedShuffle(output.words, seed);
    output.definitions = seedShuffle(output.definitions, seed2);
  
    for (i = 0; i < output.words.length; i++) {
      stage.addChild(output.words[i]);
      stage.addChild(output.definitions[i]);
      output.words[i].y = offsetY * i;
      output.definitions[i].y = offsetY * i;
      output.words[i].x = 40;
      output.definitions[i].x = 600;
    }
  
    stage.addEventListener("stagemouseup", function(e) {
      var g;
      var i;
      var s;
      if (isDown) {
        isDown = false;
        endX = e.stageX;
        endY = e.stageY;
        stage.removeChild(tempLine);
        stage.update();
  
        if (!findById(output.words, clickedID).mouseDown) {
  
          if (e.stageX > findById(output.words, clickedID).x && e.stageY > findById(output.words, clickedID).y && e.stageX < (findById(output.words, clickedID).x + findById(output.words, clickedID).width) && e.stageY < (findById(output.words, clickedID).y + findById(output.words, clickedID).height)) {
            findById(output.words, clickedID).mouseEnabled = false;
            findById(output.definitions, clickedID).mouseEnabled = false;
            findById(output.words, clickedID).background.graphics.beginFill(color).drawRoundRect(0, 0, findById(output.words, clickedID).width, findById(output.words, clickedID).height, 10);
            findById(output.definitions, clickedID).background.graphics.beginFill(color).drawRoundRect(0, 0, findById(output.definitions, clickedID).width, findById(output.definitions, clickedID).height, 10);
            g = new createjs.Graphics().clear().setStrokeStyle(8).beginStroke(color).moveTo(startX, startY).lineTo(e.stageX, e.stageY).endStroke();
            s = new createjs.Shape(g);
            stage.addChildAt(s, 0);
            findById(output.definitions, clickedID).text.color = "#FFFFFF";
            findById(output.words, clickedID).text.color = "#FFFFFF";
            findById(output.definitions, clickedID).text.font = styleBold;
            findById(output.words, clickedID).text.font = styleBold;
            correctLines.push(s);
            correctID.push(clickedID);
            stage.update();
          } else {
            for (i = 0; i < output.words.length; i++) {
              if (e.stageX > output.words[i].x && e.stageY > output.words[i].y && e.stageX < (output.words[i].x + output.words[i].width) && e.stageY < (output.words[i].y + output.words[i].height)) {
                wrongCount++;
              }
            }
          }
        } else if (!findById(output.definitions, clickedID).mouseDown) {
          if (e.stageX > findById(output.definitions, clickedID).x && e.stageY > findById(output.definitions, clickedID).y && e.stageX < (findById(output.definitions, clickedID).x + findById(output.definitions, clickedID).width) && e.stageY < (findById(output.definitions, clickedID).y + findById(output.definitions, clickedID).height)) {
            findById(output.definitions, clickedID).mouseEnabled = false;
            findById(output.words, clickedID).mouseEnabled = false;
            findById(output.words, clickedID).background.graphics.beginFill(color).drawRoundRect(0, 0, findById(output.words, clickedID).width, findById(output.words, clickedID).height, 10);
            findById(output.definitions, clickedID).background.graphics.beginFill(color).drawRoundRect(0, 0, findById(output.definitions, clickedID).width, findById(output.definitions, clickedID).height, 10);
            g = new createjs.Graphics().clear().setStrokeStyle(8).beginStroke(color).moveTo(startX, startY).lineTo(e.stageX, e.stageY).endStroke();
            s = new createjs.Shape(g);
            stage.addChildAt(s, 0);
            findById(output.definitions, clickedID).text.color = "#FFFFFF";
            findById(output.words, clickedID).text.color = "#FFFFFF";
            findById(output.definitions, clickedID).text.font = styleBold;
            findById(output.words, clickedID).text.font = styleBold;
            correctLines.push(s);
            correctID.push(clickedID);
            stage.update();
          } else {
            for (i = 0; i < output.definitions.length; i++) {
              if (e.stageX > output.definitions[i].x && e.stageY > output.definitions[i].y && e.stageX < (output.definitions[i].x + output.definitions[i].width) && e.stageY < (output.definitions[i].y + output.definitions[i].height)) {
                wrongCount++;
                document.getElementById("erreur").innerHTML = wrongCount + " қате";
              }
            }
          }
          /*
          /*
          else if position of mouse up does not match the position of any other definitions, wrongcount++
           */
  
        }
      }
      if (clickedID != -1) {
        findById(output.definitions, clickedID).mouseDown = false;
        findById(output.words, clickedID).mouseDown = false;
        clickedID = -1;
      }
    });
  
    stage.addEventListener("stagemousemove", function(e) {
  
      if (isDown) {
        tempG.clear().setStrokeStyle(8).beginStroke(color).moveTo(startX, startY).lineTo(e.stageX, e.stageY).endStroke();
        stage.addChild(tempLine);
        stage.update();
      }
    });
    stage.addEventListener("tick", function(e) {
      if (correctID.length == output.words.length) {
        stage.removeAllChildren();
  
        var t2 = new createjs.Text("The END!", "20px Montserrat Alternates", "#000000");
        var t3 = new createjs.Text("Сіз " + wrongCount + "-рет қате жібердіңіз.", "20px Montserrat Alternates", "#000000");
        t2.x = 25;
        t2.y = 25;
        t3.x = 25;
        t3.y = t2.y + 25;
        var w1, h1;
        if (t2.getMeasuredWidth() > t3.getMeasuredWidth()) {
          w1 = t2.getMeasuredWidth() + 50;
        } else {
          w1 = t3.getMeasuredWidth() + 50;
        }
        h1 = t2.getMeasuredHeight() + t3.getMeasuredHeight() + 50;
        var g2 = new createjs.Graphics().beginFill("#00FF00").drawRect(0, 0, w1, h1);
        var s2 = new createjs.Shape(g2);
        stage.addChild(s2, t2, t3);
        stage.removeAllEventListeners();
      }
    });
    stage.update();
  }