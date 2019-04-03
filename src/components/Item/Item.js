import React from 'react';
import interact from 'interactjs';
import './Item.scss'
import { getUser } from './../../lib/userData/manager';


class Item extends React.Component {
  currentGame = undefined;
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }

  constructor(){
    super();
    this.currentGame = getUser().currentGame;
  }

  updateDimensions = event => {
    // console.log("update " + window.innerWidth)
    this.setState({ windowWidth: window.innerWidth });
    this.setState({ windowHeight: window.innerHeight });
    var element = document.getElementById(this.props.id);
    if (!element.hasAttribute("data-x")) {
      return
    }
    var x = (parseFloat(element.getAttribute('data-x') * this.state.windowWidth) || 0);
    var y = (parseFloat(element.getAttribute('data-y') * this.state.windowHeight) || 0);

    element.style.webkitTransform =
      element.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // console.log(x + " " + y);
    // màj positions
    element.setAttribute('data-x', x / this.state.windowWidth);
    element.setAttribute('data-y', y / this.state.windowHeight);
    // console.log("pos ", x / this.state.windowWidth, y / this.state.windowHeight);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  dragMoveListener = event => {

    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x') * this.state.windowWidth) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y') * this.state.windowHeight) || 0) + event.dy;

    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // console.log(x + " " + y);
    // màj positions
    target.setAttribute('data-x', x / this.state.windowWidth);
    target.setAttribute('data-y', y / this.state.windowHeight);
    // console.log("pos ", x / this.state.windowWidth, y / this.state.windowHeight);

  }

  endMoveListener = event => {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x') * this.state.windowWidth) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y') * this.state.windowHeight) || 0) + event.dy;
      // CHANGE: enregistrer position dans this.currentGame.players.
      // console.log(x + " " + y);
      if(this.currentGame.gameMaster === getUser().username){
        this.currentGame.updateGameToPeers();
      }
      else{
        this.currentGame.updatePlayerToPeers();
      }
  }

  updatePosition = e => {
    // console.log("hey")
    this.dragMoveListener()
  }

  getClickPosition = e => {
    interact('.draggable')
      .draggable({
        inertia: true,

        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,

        onmove: this.dragMoveListener,

        onend: this.endMoveListener,

      });



    // function getPos(event) {
    //   var target = event.target,
    //     x = parseFloat(target.getAttribute('data-x')),
    //     y = parseFloat(target.getAttribute('data-y'));
    //   return { x, y };
    // }

    // function setPos(event, x, y) {
    //   var target = event.target;
    //   target.setAttribute('data-x', x);
    //   target.setAttribute('data-y', y);
    // }



    window.dragMoveListener = this.dragMoveListener;

    //     var xPos = 0;
    //     var yPos = 0;

    //     // while (e.currentTarget) {
    //     //   if (e.currentTarget.tagName == "BODY") {
    //     //     // deal with browser quirks with body/window/document and page scroll
    //     //     var xScroll = e.currentTarget.scrollLeft || document.documentElement.scrollLeft;
    //     //     var yScroll = e.currentTarget.scrollTop || document.documentElement.scrollTop;

    //     //     xPos += (e.currentTarget.offsetLeft - xScroll + e.currentTarget.clientLeft);
    //     //     yPos += (e.currentTarget.offsetTop - yScroll + e.currentTarget.clientTop);
    //     //   } else {
    //     //     // for all other non-BODY elements
    //     //     xPos += (e.currentTarget.offsetLeft - e.currentTarget.scrollLeft + e.currentTarget.clientLeft);
    //     //     yPos += (e.currentTarget.offsetTop - e.currentTarget.scrollTop + e.currentTarget.clientTop);
    //     //   }

    //     //   e.currentTarget = e.currentTarget.offsetParent;
    //     // }



    //     var xPosition = e.clientX - xPos;
    //     var yPosition = e.clientY - yPos;
    //     // this.setState({
    //     //   pos: xPosition + "px",
    //     // });
    //     console.log(xPos + " " + yPos);
    //     //document.getElementById('thing').style.top = yPosition - 100 + 'px';
    //     //document.getElementById('thing').style.left = xPosition - 500 + 'px';
    //     document.getElementById('thing').style.float = "left";
    //     document.getElementById('thing').style.left = xPosition / 12 + '%';
    //     document.getElementById('thing').style.top = yPosition / 7 + '%';
    //     //theThing.style.top = yPosition + "px";
  }

  render() {
    const classes = this.props;
    //console.log(classes.img)
    var style = {
      top: -this.props.cordY * 110 + '%',
      left: this.props.cordX * 90 + '%',
      width: '3%',
      position: 'relative',
      // transform : 'translate(' + parseFloat(this.props.cordX) * window.innerWidth + 'px, '
      //  + -parseFloat(this.props.cordY) * this.state.windowHeight + 'px)',
    };

    return (
      // console.log(parseFloat(this.props.cordX)),
      <img id={classes.id} key={classes.id} className='draggable item__objects' onDrag={this.getClickPosition}
        style={style}
        src={classes.img} alt={classes.title} />
    )
  }
}

export default Item;