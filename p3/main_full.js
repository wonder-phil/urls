// Create a class for the element
class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }
  
  hide() {
	console.log('Custom square element HIDE.');
	myhide(this);
  }
  
    
  show() {
	  console.log('Custom square element SHOW.');
	  myshow(this);
  }
  
  flash() {
	  console.log('Custom square element FLASH.');
	  for(var i=1000; i < 10000; i=i+1000) {
		setTimeout(() => { this.hide() ; },i);
		setTimeout(() => { this.show() ; },i+500);
	}
  }
  
}

customElements.define('custom-square', Square);




function myshow(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
	  background-color: ${elem.getAttribute('c')};
	  visibility: 'visible';
    }
  `;
}

function myhide(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      visibility: 'hidden';
    }
  `;
}

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
const hide = document.querySelector('.hide');
const show = document.querySelector('.show');
const flash = document.querySelector('.flash');

let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('l', '100');
  square.setAttribute('c', 'red');
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function() {
  // Randomly update square's attributes
  square.setAttribute('l', random(50, 200));
  square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

remove.onclick = function() {
  // Remove the square
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};

hide.onclick = function() {
  square.hide();
  update.disabled = true;
  remove.disabled = true;
  add.disabled = true;
};


show.onclick = function() {
  square.show();
  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};


flash.onclick = function() {
  update.disabled = true;
  remove.disabled = true;
  add.disabled = true;
  
  square.flash();

};