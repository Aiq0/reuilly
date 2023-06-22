function $(id) {
  return document.getElementById(id);
}


let oldScroll = 0

function reveal() {
  let isDown = oldScroll < this.scrollY;

  oldScroll = this.scrollY;
  var reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 50;

    if (isDown && elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else if (!isDown && elementTop > windowHeight - elementVisible * 2.5) {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

function setup() {
  function dropdownHandler(event) {
    if ($('topnav').classList.contains('responsive') && event.type !== 'click') {
      return
    }

    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = dropdowns.length - 1; i >= 0; i--) {
      dropdowns[i].classList.add('hidden');
    }

    if (event.type === 'mouseleave') {
      return;
    }

    var el = $('dropdown-' + (event.type === 'click' ? event.target.parentElement : event.target).getAttribute('data-dropdown'));

    if (el) {
      el.classList.remove('hidden');
    }
  }

  var dropdowns = document.getElementsByClassName('dropdown')

  for (var i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i]
    dropdown.addEventListener('click', dropdownHandler);
    dropdown.addEventListener('mouseenter', dropdownHandler);
    dropdown.addEventListener('mouseleave', dropdownHandler);
  }
  setTimeout(function () {
    var el;
    if (el = $('zatvor')) {
      el.style.display = 'none';
    }
  }, 10000);

  var imgs = document.getElementsByClassName('galeria');

  if (imgs.length > 0) {
    window.fullscreenViewer = {
      currentImage: -1,
      imgs: imgs
    }

    fullscreenViewer.div = document.createElement('div');
    fullscreenViewer.div.setAttribute('id', 'fullscreen-viewer');
    var obrazok = document.createElement('img');
    var popis = document.createElement('span');
    var close = document.createElement('span');
    var previous = document.createElement('span');
    var next = document.createElement('span');

    close.innerHTML = '×';

    close.setAttribute('class', 'fullscreen-viewer-close');
    popis.setAttribute('class', 'fullscreen-viewer-description');
    obrazok.setAttribute('class', 'fullscreen-viewer-image fullscreen-viewer-no-close');

    previous.setAttribute('class', 'fullscreen-viewer-previous fullscreen-viewer-no-close');
    next.setAttribute('class', 'fullscreen-viewer-next fullscreen-viewer-no-close');

    fullscreenViewer.div.addEventListener('click', function (e) {
      if (!e.target.classList.contains('fullscreen-viewer-no-close')) {
        document.body.classList.remove('fullscreen-viewer-active');
      }
    });

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('click', function () {
        console.log('test');
        fullscreenViewer.currentImage = i;
        obrazok.src = '';
        //next
        previous.onclick = function () {
          if (fullscreenViewer.currentImage > 0) {
            fullscreenViewer.imgs[fullscreenViewer.currentImage - 1].click()
          }
        }
        next.onclick = function () {
          if (fullscreenViewer.currentImage < fullscreenViewer.imgs.length - 1) {
            fullscreenViewer.imgs[fullscreenViewer.currentImage + 1].click()
          }
        }
        obrazok.src = this.hasAttribute('data-src') ? this.getAttribute('data-src') : this.getAttribute('src');
        var _popis = this.getAttribute('data-popis');
        if (_popis && _popis !== '') {
          popis.innerHTML = _popis
          popis.style.display = null;
        } else {
          popis.style.display = 'none'
        }
        document.body.classList.add('fullscreen-viewer-active');
        return false
      })
    }

    fullscreenViewer.div.appendChild(obrazok);
    fullscreenViewer.div.appendChild(popis);
    fullscreenViewer.div.appendChild(close);
    fullscreenViewer.div.appendChild(previous);
    fullscreenViewer.div.appendChild(next);

    document.body.appendChild(fullscreenViewer.div);
  }
}

if (document.readyState !== 'loading') {
  setup()
} else {
  document.addEventListener('DOMContentLoaded', setup);
}
