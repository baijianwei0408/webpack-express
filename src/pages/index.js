import './index.css';
import Icon from '../images/icon.png';
import printMe from '../common/print';

function component() {
    let dom = document.createElement('div');

    dom.innerHTML = 'text';
    dom.classList.add('font');

    let myIcon = new Image();
    myIcon.width = 400;
    myIcon.height = 400;
    myIcon.src = Icon;
    dom.appendChild(myIcon);

    let btn = document.createElement('button');
    btn.innerHTML = 'click me!!!!!';
    btn.onclick = printMe;

    dom.appendChild(btn);

    return dom;
}

document.body.appendChild(component());