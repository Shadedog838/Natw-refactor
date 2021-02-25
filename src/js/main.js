require('../css/main.css');
require('../img/google-plus.svg');
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var articleList = __webpack_require__(3);
	var modals = __webpack_require__(5);
	var map = __webpack_require__(7);

	var _require = __webpack_require__(4),
	    $ = _require.$,
	    each = _require.each;

	// make sure the page is at the top, because modal appears there


	window.onload = function () {
	  setTimeout(function () {
	    return window.scrollTo(0, 0);
	  }, 0);
	};

	// initialize modules
	modals();
	articleList();
	map();

	// menu toggle functionality

	var toggle = $('.menu .toggle');
	var nav = $('.menu nav');
	var body = document.body;

	toggle.addEventListener('click', function () {
	  if (!nav.classList.contains('active')) {
	    toggle.classList.add('active');
	    toggle.children[1].innerHTML = 'Close';
	    nav.classList.add('active');
	    setTimeout(function () {
	      return body.addEventListener('click', collapseOnBodyClick);
	    }, 0);
	  }
	});

	function collapseOnBodyClick(e) {
	  toggle.classList.remove('active');
	  toggle.children[1].innerHTML = 'Menu';
	  nav.classList.remove('active');
	  body.removeEventListener('click', collapseOnBodyClick);
	}

	// recent posts toggle functionality

	var recentPosts = $('.recent-posts');
	var recentPostsToggle = $('.recent-posts .toggle-container');
	recentPostsToggle.addEventListener('click', function () {
	  if (recentPosts.classList.contains('active')) {
	    recentPosts.classList.remove('active');
	  } else {
	    recentPosts.classList.add('active');
	  }
	});

	// Introduction item in menu opens modal
	$('.menu .introduction-toggle').addEventListener('click', function () {
	  $('.first-visit').classList.add('active');
	  window.scrollTo(0, 0);
	});

	// Anchor scroll override because of the fixed header
	each($('a[data-anchor]'), function (link) {
	  link.addEventListener('click', function () {
	    window.scrollTo(0, $(link.dataset.anchor).offsetTop - $('header').clientHeight);
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(4),
	    $ = _require.$,
	    each = _require.each,
	    findParent = _require.findParent,
	    animateProperty = _require.animateProperty;

	var tileSize = 250;
	var marginSize = 30;

	module.exports = function () {
	  // set the width of each list so it scrolls horizontally
	  each($('.g-article-list ul'), function (ul) {
	    var n = ul.children.length;
	    ul.style.width = n * tileSize + n * marginSize - 1 + 'px';
	    ul.style.display = 'block';
	  });

	  // handle right arrow click
	  each($('.g-article-list .right-arrow'), function (arrow) {
	    arrow.addEventListener('click', function () {
	      var list = findParent(arrow, '.g-article-list');
	      animateProperty(list, 'scrollLeft', tileSize + marginSize, 200);
	    });
	  });

	  // handle left arrow click
	  each($('.g-article-list .left-arrow'), function (arrow) {
	    arrow.addEventListener('click', function () {
	      var list = findParent(arrow, '.g-article-list');
	      animateProperty(list, 'scrollLeft', -(tileSize + marginSize), 200);
	    });
	  });
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	//
	// General Vanilla JS Utilities
	//

	// abbreviated single and multi query selector
	exports.$ = function (selector) {
	  var res = document.querySelectorAll(selector);
	  return res.length < 2 ? res[0] : res;
	};

	// given an element and selector, finds the closest parent element. doesn't
	// handle attribute selectors, just class, id, and element name
	exports.findParent = function findParent(el, selector) {
	  var firstChar = selector[0];
	  if (firstChar === '.') {
	    if (el.classList.contains(selector.substr(1))) return el;
	  } else if (firstChar === '#') {
	    if (el.id === selector.substr(1)) return el;
	  } else {
	    if (el.tagName.toLowerCase() === selector) return el;
	  }
	  if (!el.parentNode.tagName) return undefined;
	  return findParent(el.parentNode, selector);
	};

	// given an element and selector, finds the first matching child element.
	// doesn't handle attribute selectors, just class, id, and element name
	exports.findChild = function findChild(el, selector) {
	  var firstChar = selector[0];
	  for (var i = 0; i < el.children.length; i++) {
	    var child = el.children[i];
	    if (firstChar === '.') {
	      if (child.classList.contains(selector.substr(1))) return child;
	    } else if (firstChar === '#') {
	      if (child.id === selector.substr(1)) return child;
	    } else {
	      if (child.tagName.toLowerCase() === selector) return child;
	    }
	    if (child.children.length) return findChild(child, selector);
	  }
	  return undefined;
	};

	exports.each = function (list, cb) {
	  for (var i = 0; i < list.length; i++) {
	    cb(list[i], i);
	  }
	};

	// Animates the incrementing of a given property of a given element.
	exports.animateProperty = function (el, prop, to, duration) {
	  var i = 0;
	  var initialVal = el[prop];
	  var stepInterval = 10;
	  var steps = duration / stepInterval;
	  var int = setInterval(function () {
	    i++;
	    el[prop] = easeInOutCubic(i, initialVal, to, steps);
	  }, stepInterval);
	  setTimeout(function () {
	    return clearInterval(int);
	  }, duration);
	};

	// Simple easing function for smooth animation looks
	function easeInOutCubic(t, b, c, d) {
	  var ts = (t /= d) * t;
	  var tc = ts * t;
	  return b + c * (-2 * tc + 3 * ts);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(4),
	    $ = _require.$,
	    each = _require.each;

	var cookies = __webpack_require__(6);

	module.exports = function () {
	  // show welcome modal on first visit
	  if (!cookies.get('visited')) {
	    $('.first-visit').classList.add('active');
	  }

	  // show welcome back modal on second visit
	  if (cookies.get('visited') && !cookies.get('visited2')) {
	    $('.all-visits').classList.add('active');
	  }

	  // set cookie on first visit modal close
	  ;['.first-visit .button', '.first-visit .underlay'].forEach(function (el) {
	    $(el).addEventListener('click', function () {
	      cookies.set('visited', true);
	      window.scrollTo(0, 0);
	    });
	  })

	  // set cookie on second visit modal close
	  ;['.all-visits .button', '.all-visits .underlay'].forEach(function (el) {
	    $(el).addEventListener('click', function () {
	      cookies.set('visited2', true, 1210000);
	      window.scrollTo(0, 0);
	    });
	  });

	  // close actions for all modals
	  each($('.g-modal .button, .g-modal .underlay'), function (closeEl) {
	    closeEl.addEventListener('click', function () {
	      each($('.g-modal'), function (modal) {
	        return modal.classList.remove('active');
	      });
	    });
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// Cookies Utility
	// via https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework

	module.exports = {
	  get: function get(sKey) {
	    if (!sKey) {
	      return null;
	    }
	    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	  },
	  set: function set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
	      return false;
	    }
	    var sExpires = '';
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
	          break;
	        case String:
	          sExpires = '; expires=' + vEnd;
	          break;
	        case Date:
	          sExpires = '; expires=' + vEnd.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global L, data */
	var _require = __webpack_require__(4),
	    $ = _require.$,
	    each = _require.each;

	var tpl = __webpack_require__(8);

	module.exports = function () {
	  document.addEventListener('DOMContentLoaded', function () {

	    // test
	    // console.log("DOMContentLoaded")

	    var geoJson = convertToGeo(data);
	    L.mapbox.accessToken = 'pk.eyJ1IjoibmllbHNlbi1kZXYiLCJhIjoiY2l2bGZyMWF0MGNpbTJ0bHZ0N3p5a3BybiJ9.wUgjgKrY9oNMgpNhdLenlw';
	    var map = L.map('map-container', {
	      minZoom: 2,
	      maxZoom: 11,
	      maxBounds: [[-90, -270], [90, 270]],
	      scrollWheelZoom: false,
	      zoomControl: false
	    });

	    // test
	    // console.log("store mapbox accessToken")

	    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

	    map.on('click', function () {
	      hidePost();
	      unselectPosts();
	    });

	    map.setView([20, 0], 2);

	    var myLayer = L.mapbox.featureLayer().setGeoJSON(geoJson);
	    var clusterGroup = new L.MarkerClusterGroup({
	      showCoverageOnHover: false
	    });
	    var Marker = L.Marker.extend({ options: { postType: '' } });

	    L.mapbox.styleLayer('mapbox://styles/nielsen-dev/civskrmpe000o2jukscda67je').addTo(map);

	    // test
	    // console.log("create mapbox layers")

	    myLayer.getGeoJSON().features.forEach(function (layer) {
	      clusterGroup.addLayer(new Marker(layer.geometry.coordinates, {
	        icon: L.divIcon({
	          className: 'niel-icon',
	          iconSize: null,
	          iconAnchor: [15, 40],
	          postType: layer.properties.post_type
	        })
	      }).on('click', function (e) {
	        e.target._icon.classList.add('active');
	        selectPost(map, layer.properties);
	      }).on('mouseover', function (e) {
	        L.popup({
	          offset: [0, -33]
	        }).setLatLng(e.latlng).setContent(createPopupContainer('<p>' + (layer.properties.video_placeholder ? '1 Video' : '1 Image') + '</p>')).openOn(map);
	      }).on('mouseout', function (e) {
	        map.closePopup();
	      }));
	    });

	    clusterGroup.on('clustermouseover', function (e) {
	      L.popup({
	        offset: [0, -10],
	        className: 'cluster-popup'
	      }).setLatLng(e.latlng).setContent(createClusterString(e.layer.getAllChildMarkers())).openOn(map);
	    }).on('clustermouseout', function (e) {
	      map.closePopup();
	    }).on('clusterclick', function (e) {
	      map.closePopup();
	    });

	    map.addLayer(clusterGroup);

	    // recent posts click
	    each($('.recent-posts li'), function (post) {
	      post.addEventListener('click', function () {
	        selectPost(map, post.dataset);
	      });
	    });
	  }, false);
	};

	function createClusterString(layers) {
	  var assets = { video: 0, image: 0 };
	  var popup = '';

	  layers.forEach(function (layer) {
	    if (layer.options.icon.options.postType === 'image') {
	      assets.image += 1;
	    } else {
	      assets.video += 1;
	    }
	  });

	  if (assets.video === 0) {
	    popup = '<p>' + assets.image + ' Image' + (assets.image > 1 ? 's' : '') + '</p>';
	  } else if (assets.image === 0) {
	    popup = '<p>' + assets.video + ' Video' + (assets.video > 1 ? 's' : '') + '</p>';
	  } else {
	    popup = '<p>' + assets.video + ' Video' + (assets.video > 1 ? 's' : '') + '<br />' + assets.image + ' Image' + (assets.image > 1 ? 's' : '') + '</p>';
	  }

	  return createPopupContainer(popup);
	}

	function createPopupContainer(innerHTML) {
	  return '<div class=\'popup-container\'>' + innerHTML + '</div>';
	}

	function convertToGeo(locations) {

	  // test
	  // console.log("converting to Geo data")

	  var geoJson = {
	    type: 'FeatureCollection',
	    features: []
	  };

	  locations.forEach(function (location) {
	    geoJson.features.push({
	      type: 'Feature',
	      geometry: {
	        type: 'Point',
	        coordinates: [location.latitude, location.longitude]
	      },
	      properties: {
	        id: location.id,
	        post_type: location.post_type,
	        post_text: location.post_text,
	        username: location.username,
	        asset_url: location.asset_url,
	        longitude: location.longitude,
	        latitude: location.latitude,
	        video_placeholder: location.video_placeholder,
	        location_name: location.location_name,
	        instagram_id: location.instagram_id
	      }
	    });
	  });

	  return geoJson;
	}

	function scrollToIcon(map, coordinates) {
	  var currentZoom = map.getZoom();
	  map.setView([coordinates.lat, coordinates.lng], currentZoom < 3 ? 3 : currentZoom);
	}

	function selectPost(map, properties) {
	  var postContainer = document.querySelector('.post-container');
	  unselectPosts();
	  scrollToIcon(map, { lat: properties.latitude, lng: properties.longitude });

	  postContainer.querySelector('.content').innerHTML = tpl(properties);
	  postContainer.classList.add('active');

	  document.querySelector('.post-container .close').addEventListener('click', function () {
	    hidePost();
	  });
	}

	function unselectPosts() {
	  var posts = document.querySelectorAll('.niel-icon');

	  for (var i = 0; i < posts.length; ++i) {
	    posts[i].classList.remove('active');
	  }
	}

	function hidePost() {
	  var postContainer = document.querySelector('.post-container');

	  postContainer.classList.remove('active');
	  postContainer.querySelector('.content').innerHTML = '';
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	var __runtime = {"escape":function (input) {
	    var htmlRegex = /["&<>]/
	    var regexResult = htmlRegex.exec(input)
	    if (!regexResult) { return input }

	    var result = ''
	    var i, lastIndex, escape
	    for (i = regexResult.index, lastIndex = 0; i < input.length; i++) {
	      switch (input.charCodeAt(i)) {
	        case 34: escape = '&quot;'; break
	        case 38: escape = '&amp;'; break
	        case 60: escape = '&lt;'; break
	        case 62: escape = '&gt;'; break
	        default: continue
	      }
	      if (lastIndex !== i) { result += input.substring(lastIndex, i) }
	      lastIndex = i + 1
	      result += escape
	    }
	    return (lastIndex !== i ? result + input.substring(lastIndex, i) : result)
	  }}; module.exports = (function (locals) { var res;;var locals_for_with = (locals || {});(function (asset_url, instagram_id, location_name, post_text, video_placeholder) {res = "<div class=\"media\">" + ((function () { if (asset_url === "") { return "<img src=\"" + (__runtime.escape(video_placeholder)) + "\">" } else { return "<video controls poster=\"" + (__runtime.escape(video_placeholder)) + "\"><source src=\"" + (__runtime.escape(asset_url)) + "\"></video>" } })()) + "</div>\n<div class=\"description\">\n  <p>" + (__runtime.escape(post_text)) + "</p>\n  <div class=\"location\">" + (__runtime.escape(location_name)) + "</div>\n</div>\n<div class=\"actions pin\">\n  <a class=\"external\" href=\"https://www.instagram.com/p/" + (__runtime.escape(instagram_id)) + "\" target=\"_blank\">View Post</a>\n  <a class=\"close\">Close</a>\n</div>\n"}.call(this,"asset_url" in locals_for_with?locals_for_with.asset_url:typeof asset_url!=="undefined"?asset_url:undefined,"instagram_id" in locals_for_with?locals_for_with.instagram_id:typeof instagram_id!=="undefined"?instagram_id:undefined,"location_name" in locals_for_with?locals_for_with.location_name:typeof location_name!=="undefined"?location_name:undefined,"post_text" in locals_for_with?locals_for_with.post_text:typeof post_text!=="undefined"?post_text:undefined,"video_placeholder" in locals_for_with?locals_for_with.video_placeholder:typeof video_placeholder!=="undefined"?video_placeholder:undefined));;return res })

/***/ }
/******/ ]);