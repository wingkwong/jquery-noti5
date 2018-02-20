# Noti5

jQuery notication plugin

### Prerequisites

jQuery library

### Installing

- NPM: https://www.npmjs.com/package/jquery-noti5

## Options

|                       | Description           | Default  |
| ----------------------|-----------------------| -----|
| title                 | The title of noti5  |  |
| message                | The content of noti5     |    |
| type      | The type of noti5, namely info, success, warn and danger    |    info |
| timeout    | The duration of noti5 in second |  4 |
| pos    | The global position of the noti5. It includes top-left, top-center, top-right, bottom-left, bottom-center, and bottom-right |    top-right |
| elementPos    | The element position of the noti5: top, bottom, left or right |   right |
| link    | The target link object container href, title and target when noti5 is being clicked |  {href: '#' title: '', target: '_blank'} |
| offset    | The offset of noti5. It takes either a single number or an object including x and y value | 0  |
| spacing    | The spacing between each noti5 containers |  5 |
| showCloseBtn    | A boolean value to determine a close button is shown or not  |    true |

## Default option overiew
```javascript
{
    'title': '',
    'message': '',
    'type': 'info',
    'timeout': 4,
    'pos': 'top-right',
    'elementPos': 'right',
    'link': {
        'href': '#',
        'title': '',
        'target': '_blank'
    },
    'offset': 0, 
    // or
    // 'offset': {
    //   'x': 0,
    //   'y': 0
    //}
    'spacing': 5,
    'showCloseBtn': true
}
```

## Usages

HTML:
```html
<div class="foo"></div>
```

JavaScript:
```javascript
$('.foo').noti5();
```
Pass a simple message
```javascript
$('.foo').noti5("Lorem Ipsum");
```
Pass a custom setting
```javascript
$('.foo').noti5({
	'title': 'Lorem Ipsum',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	'type': 'info'
});
```

You can also initialize noti5 without a selector
```javascript
$.noti5({
	'title': 'Lorem Ipsum',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	'type': 'danger'
});
```

## Methods
You can call the below methods with an noti5 instance
### update(obj)
Only title, message, type and link can be updated.
```javascript
var noti5 = $.noti5({
	'title': 'Lorem Ipsum',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	'type': 'danger'
});

setTimeout(function(){
	noti5.update({
		'title': 'updated title',
		'message': 'updated message',
		'type': 'danger',
		'link': {
			'href': 'https://foo.com',
	 		'title': 'updated title',
	 		'target': '_blank'
		}
	});
}, 3000);
```
### close()
```javascript
var noti5 = $.noti5({
	'title': 'Lorem Ipsum',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	'type': 'danger'
});

setTimeout(function(){
	noti5.close();
}, 3000);
```

## Authors

* **Wing Kam WONG** -  [@wingkwong](https://github.com/wingkwong)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

