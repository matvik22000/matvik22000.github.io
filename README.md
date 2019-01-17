# matvik22000.github.io
дока по чату:
работа с сервером для чата.

1)открываешь 2 вебсокета по адресам:

	1) wss://warm-bayou-37022.herokuapp.com/receive  (сюда будут приходить сообщения)
	2) wss://warm-bayou-37022.herokuapp.com/submit (сюда ты шлешь сообщения)
	
2) в первый сокет ты шлешь JSON такого формата:

``` javascript
	{"key":"10",
	"msg":"true",
	"name":"name",
	"token":"RA2SD3GDOSZ5Q0F"
	}
```
  1. key: "10" уникальный ключ(id) пользователя
  1. msg: "true": нужно ли добавлять тебя в список подключенных прользователей. true - да, false - нет(нужно для подгрузки сообщений)
  3. name: "name" твой ник
  4. token: этот параметр надо отправлять со всеми сообщения(вообще сл любым сообщением, которое ты шлёшь на сервер). Про то где его 	взять расскажу позже
  
о событиях, происходящих в чате тебя информируют такие сообщения:

``` javascript
	{"system": "true", "name": "name", "key":"10", "event": "reg"}
```
1. event: "reg" бывает reg(значит что зашел новый пользователь) или close(значит что пользователь отключился), kick(пользователя отключили), map(расскажу позже)
2. key: "10" уникальный ключ(id) пользователя
3. name: "name" ник, так этого юзера должны видеть остальные
4. system: "true" true – сообщение системное, его не надо отображать. Бывает false, значит 
сообщение надо отображать

такие сообщения приходят всем пользователям которые в сети на данный момент. Это позволяет 	отображать находится	ли определенный пользователь в сети в данный момент
3)сообщения которые приходят тебе и которые ты шлешь делятся на 
	- общие
	- личные
    - системные
	(общие видны всем, личные только адресату.)
	И на 
	- текст
	- картинки
рассмотрим все возможные варианты сообщений:
<h2>общее текст</h2>

``` javascript
{"system":false,"uuid":"170.51287793191963","text":"1","name":"спамер","icon":"3",
"time":"October 26th 2018, 3:58:49 pm","type":"text"}
```
1. icon: "3" бывает 3 значения, обозначает иконку которая должна отображаться рядом с пользователем
	* ![Image alt](https://github.com/matvik22000/matvik22000.github.io/blob/master/kk/anonymous1.png)
	* ![Image alt](https://github.com/matvik22000/matvik22000.github.io/blob/master/kk/anonymous2.png)
	* ![Image alt](https://github.com/matvik22000/matvik22000.github.io/blob/master/kk/anonimus3.png)
2. name: "спамер" ник отправившего сообщение юзера
3. system: false значит что сообщение системное и его надо отображать
4. text: "1" текст сообщения
5. time: "October 26th 2018, 3:58:49 pm" время отправки сообщения
6. type: "text" тип сообщения, бывает 2 видов:
	- text: тестовое
	- img: картинка
7. uuid: "170.51287793191963" ключ(id) отправителя

<h2>общее картинка</h2>

Всё также как и в первом случае, но тип не text, а img, а в text не текст сообщения, а ссылка на картинку.

``` javascript
{"system":false,
"uuid":"170.51287793191963",
"text":"https://bipbap.ru/wpcontent/uploads/2017/04/leto_derevo_nebo_peyzazh_dom_derevya_domik_priroda_3000x2000.jpg",
"name":"спамер",
"icon":"3",
"time":"October 26th 2018, 3:40:40 pm",
"type":"img"
}
```


<h2>личное текст </h2>

``` javascript
{"system":false,"uuid":"170.51287793191963","text":"1","name":"спамер","icon":"3",	
"time":"October 26th 2018, 3:58:35pm","address":"50.97423463710501","nameAddress":"name","type":"text"}
```

1. address: "50.97423463710501" id адресата сообщения
2. icon: "3" номер иконки(как в 1 случае)
3. name: "спамер" ник отправителя
4. nameAddress: "name" ник адресата
5. system: false 
6. text: "1" тектс сообщения
7. time: "October 26th 2018, 3:58:35 pm" 
8. type: "text" тип сообщения (тот который text или img)
9. uuid: "170.51287793191963" id отправителя
	

<h2>личное картинка</h2>
как и в 3 случае, но тип img, а вместо текста — ссылка

``` javascript
{"system":false,"uuid":"170.51287793191963",
"text":"https://vk.com/images/stickers/3/128.png",
"name":"спамер","icon":"3","time":"October 26th 2018, 4:53:00 pm”,	"address":"50.97423463710501","nameAddress":"name","type":"img"}
```

1. address: "50.97423463710501"
2. icon: "3"
3. name: "спамер"
4. nameAddress: "name"
5. system: false
6. text: "https://vk.com/images/stickers/3/128.png"
7. time: "October 26th 2018, 4:53:00 pm"
8. type: "img" 
9. uuid: "170.51287793191963"

когда ты подключаешься к серверу тебе приходят 30 последних сообщений. Все отправленные сообщения хранятся в базе данных на сервере.
Важно что ключ должен храниться на устройстве, а не меняться при каждом новом заходе пользователя, иначе старые сообщения будут адресованы юзеру со старым ключом и не отобразятся, так как ключ поменялся и не совпадает со старым.

<h2>ВАЖНО</h2>
<h2>когда ты шлешь любое сообщение(даже системное) ты ДОЛЖЕН прикрепить к нему токен. К тебе сообщения приходят без токена. Отправленное сообщение должно выглядеть примерно так: </h2>

``` javascript
{
icon: "1"
name: "name"
system: "false"
text: "сообщение"
time: "January 17th 2019, 5:46:56 pm"
token: "RA2SD3GDOSZ5Q0F" - токен. Без него сообщение не дойдет ни до кого, а сокет будет разорван. 
type: "text"
uuid: "10"
}
```

также в submit тебе приходят сообщения о токенах (Только они и приходят, все остальные сообщения приходят в recieve) они бывают:
1)"write token" : для uuid, указанного в сообщении токен верный.
  "wrong token" : для указанного uuid токен другой.
2)"token valid" : время действительности(1 час) для токена не прошло
  "token fired" : токен устарел, самое время получить новый
3)"no token found" : либо в сообщении отсутствует параметр token, либо для указанного uuid не получен токен

 <h1>Регистрация/авторизация и всё что связано с аккаунтом пользователя</h1>
регистрация и авторизация проходит при помощи http запросов. На данный момент есть 2 варианта для регистрации/авторизации:

- при помощи VK API (https://vk.com/dev)
- при помощи логина и пароля

<h2> регистрация </h2>
<h3>при помощи vk</h3>
<h4>запрос</h4>
в общем виде запрос выглядит так:

``` javascript
minAjax({
        url: "https://warm-bayou-37022.herokuapp.com/reg",
        type: "POST", (GET запрос не прокатит, только POST)
        data:{
            type: "vk" - означает, что регистрация производится при помощи vk id, 
            id: *id из ответа от vk auth*,
            info: *любая информаиця о пользователе, которую удалось добыть*,
            name: *ник пользователя*
            
        },
     
    });
 ```
<h4>ответ</h4>
- success - пользователь зарегистрирован
- что-либо другое - не вышло :(
<h3>логин + пароль</h3>
<h4>запрос</h4>

``` javascript
minAjax({

        url: "https://warm-bayou-37022.herokuapp.com/reg",
        type: "POST", (GET запрос не прокатит, только POST)
        data:{
            type: "lp" - означает, что регистрация производится при помощи логина и пароля,
            login: *логин(не тот что будет виден в чате, этот не видно нигде)*,
            password: *пароль*,
            info: *любая информаиця о пользователе, которую удалось добыть*,
            name: *ник пользователя*
            
        },
     
    });
 ```
<h4>ответ</h4>
- success - пользователь зарегистрирован
- что-либо другое - не вышло :(

<h2>авторизация</h2>
<h3>при помощи vk</h3>
<h4>запрос</h4>

``` javascript
 minAjax({
           url: "https://warm-bayou-37022.herokuapp.com/login",
           type: "GET",
           data: {
               type: "vk" -  означает, что регистрация производится при помощи vk id,
               id: *uid из vk auth*
               save: true/false (надо-ли запоминать это устройство)

          },
});
```
<h4>ответ</h4>

``` javascript
[
0: "4", - id пользователя в чате
1: "OOBKZKN18F64VQQ", - код, который надо сохранить чтобы потом входить без авторизации(ниже опишу подробнее)
2: "Teststeeetrr",  - ник пользователя
3: "3", иконка пользователя
4: [
  "9GEQ1CH91ZWEA61", - тот самый токен, напоминаю, что действителен он в течении часа после получения
  "1547738823077" - время (на сервере, часовой пояс там GMT+00:00), в которое был выдан токен
  ]
]
```
Обращаяю внимание на то, что код для авторизации приходит только в случае если при запросе save: true, если false, то ответ будет выглядить так:

``` javascript
[
0: "4"
1: "Teststeeetrr"
2: "3"
3: ["9911YVAI79WFN0R", "1547742607967"]
]
```

- false - рользователь с таким vk_id не найден
- что-либо другое - неправильный запрос
<h3>при помощи логина+пароля</h3>
запрос

``` javascript
minAjax({
            url: "https://warm-bayou-37022.herokuapp.com/login",
            type: "GET",
            data: {
                type: "lp" означает, что регистрация производится при помощи логина и пароля,
                login: *логин*,
                password: *пароль*,
                save: true/false (надо-ли запоминать это устройство)
            },
			
});
```
<h4>ответ</h4>
если все верно, то ответ будет таким же как и при авторизации через vk

 - false - такой логин не найден
 - incorrect password - логин верный, но пароль не подходит


<h2>авторизация при помощи кода</h2>
если при авторизации указать save: true, то код, который придет в ответе стоит запомнить, и отправить при запуске приложения
запрос

``` javascript
minAjax({
            url: "https://warm-bayou-37022.herokuapp.com/check",
            type: "GET",
            data:{
                cookie: *код, который ты предусмотрительно сохранил*,
                id: *uuid пользователя*
            },
});
```

<h4>ответ</h4>
если код и uuid верны, то ответ будет такой:
``` javascript
0: "4" - uuid
1: "Teststeeetrr" - имя
2: "3" - иконка
3: ["RGHKK1WMBG1G9UP", "1547743556388"] - токен
```
если нет, то придет либо false, либо ошибка. значит код/uuid неверный

<h3>обновление данных о пользлвателе</h3>

``` javascript
minAjax({
         url: "https://warm-bayou-37022.herokuapp.com/update",
         type: "POST",
         data:{
               column: "name", - название параметра пользователя, который надо обновить
               id: *id пользователя*,
               value: *значение обновляемого параметра*
         },
});
```
параметр column принимает значения:
- "name" - имя пользователя в чате
- "cookie" - код, используемый для входа без авторизации	
- "icon" - иконка
- "info" - информация о пользователе

подсказка: в базе данных пользователей в значением параметра cookie является массив, например такой:
``` javascript
['8G1CXIDJ0DL9Q4',
'HD4NLMZVSA35Y2',
'1YZ7B5HS8X8WFY',
'GK2EG52VBJLCVA',
'U0HXX1CNYL5VUQ',
'9FIG11N30QG3GN',
'UC1YTI734VWT6Q',
'FK6R47E2XOD9AD',
'O02AGQG3HXQQWX'
]
```
такой запрос 

``` javascript
minAjax({
         url: "https://warm-bayou-37022.herokuapp.com/update",
         type: "POST",
         data:{
               column: "cookie",
               id: *id пользователя*,
               value: "None"
         },
});
```
сотрет все устройства, из которых можно войти без регистрации

<h3>Важно, что все сообщения надо отправлять, как строку. Приходят все сообщения тоже как строка, параметры - строка или массив</h3>

<h1>системные сообщения</h1>
их бывает всего несколько:

<h3>подключение</h3>

``` javascript
	{"system": "true",
	"name": "name", - имя пользоваеля
	"key":"10", - его uuid
	"event": "reg"}
```
<h3>отключение</h3>

- пользователь отключился сам

``` javascript
	{"system": "true",
	"name": "name", - имя пользоваеля
	"key":"10", - его uuid
	"event": "close"}
```

-пользователь был выгнан

``` javascript
	{"system": "true",
	"name": "name", - имя пользоваеля
	"key":"10", - его uuid
	"event": "kick"}
```

<h3>окончание подгрузки сообщений<h3>
такое сообщение приходит после большой "партии" сообщений, которая была заказана ранее

``` javascript
{"end": "true", "system": "true"}
```

<h3>мапа uuid:name</h3>
сразу после регистрации, до основных сообщений приходят несколько сообщений вида

``` javascript
{event: "map"
id: "4" - id пользователя, имя которого отабражено ниже
key: "10" - id адресата
name: "Teststeeetrr" - имя пользователя, имеющего id, отображенный выше
system: "true"
}
```
	


Ссылка на мою реализацию клиента
gurhouse.ru/kk



	


