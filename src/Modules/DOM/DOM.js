import PointsHelper from "../Util/PointsHelper";

class DOM {
  constructor(contentNode, fleetList, gridSize = 10) {
    this.contentNode = contentNode;
    this.fleetList = fleetList;
    const placeholder = document.createDocumentFragment()

    this.title = document.createElement('h1');
    this.title.id = "title";
    this.title.textContent = "BATTLESHIP";

    this.status = document.createElement('p');
    this.status.id = 'status';
    this.status.textContent = 'status';

    this.selfGridContainer = document.createElement('selfGridContainer');
    this.selfGridContainer.id = 'selfGridContainer';

    DOM.createGrid(this.selfGridContainer, gridSize);

    this.enemyGridContainerTitle = document.createElement('h2');
    this.enemyGridContainerTitle.id = 'enemyGridContainerTitle';
    this.enemyGridContainerTitle.textContent = 'Enemy Grid';

    this.enemyGridContainer = document.createElement('div');
    this.enemyGridContainer.id = 'enemyGridContainer';

    DOM.createGrid(this.enemyGridContainer, gridSize);

    this.placeShipModal = document.createElement('dialog');
    this.placeShipModal.id = 'placeShipModal';

    this.placeShipModalContainer = document.createElement('div');
    this.placeShipModalContainer.id = 'placeShipModalContainer';

    this.placeShipModalGameTitle = document.createElement('h1');
    this.placeShipModalGameTitle.id = 'placeShipModalGameTitle';
    this.placeShipModalGameTitle.textContent = 'BATTLESHIP';

    this.placeShipModalTitle = document.createElement('h2');
    this.placeShipModalTitle.id = 'placeShipModalTitle';
    this.placeShipModalTitle.textContent = 'Ship Placement';
    
    this.placeShipModalSubtitle = document.createElement('p');
    this.placeShipModalSubtitle.id = 'placeShipModalSubtitle';
    this.placeShipModalSubtitle.textContent = 'Click two grid squares to place a ship';

    this.makeShipModalShipsContainer();
    
    this.placeShipModalGrid = document.createElement('div');
    this.placeShipModalGrid.id = 'placeShipModalGrid';

    DOM.createGrid(this.placeShipModalGrid, gridSize)

    this.placeShipModalResetButton = document.createElement('button');
    this.placeShipModalResetButton.id = 'placeShipModalResetButton';
    this.placeShipModalResetButton.textContent = 'Reset';

    this.placeShipModalCancelButton = document.createElement('button');
    this.placeShipModalCancelButton.id = 'placeShipModalCancelButton';
    this.placeShipModalCancelButton.textContent = 'Cancel';

    this.placeShipModalContainer.appendChild(this.placeShipModalGameTitle);
    this.placeShipModalContainer.appendChild(this.placeShipModalTitle);
    this.placeShipModalContainer.appendChild(this.placeShipModalSubtitle);
    this.placeShipModalContainer.appendChild(this.placeShipModalShipsContainer);
    this.placeShipModalContainer.appendChild(this.placeShipModalGrid);
    this.placeShipModalContainer.appendChild(this.placeShipModalResetButton);
    this.placeShipModalContainer.appendChild(this.placeShipModalCancelButton);

    this.placeShipModal.appendChild(this.placeShipModalContainer);

    placeholder.appendChild(this.title);
    placeholder.appendChild(this.status);
    placeholder.appendChild(this.selfGridContainer);
    placeholder.appendChild(this.enemyGridContainerTitle);
    placeholder.appendChild(this.enemyGridContainer);
    placeholder.appendChild(this.placeShipModal);
  
    contentNode.appendChild(placeholder);

    this.placeShipModalCancelButton.addEventListener('click', () => this.placeShipModal.close())
  }

  static createGrid(parentElement, width, height = undefined) {
    const placeholder = document.createDocumentFragment();
    height = height === undefined ? width : height
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        placeholder.appendChild(document.createElement('div'));
        placeholder.lastChild.id = `${parentElement.id},${col},${row}`;
      }
    }
    DOM.clearElement(parentElement);
    parentElement.appendChild(placeholder);
  }

  static clearElement(element) {
    if (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  updateDOMFromGameboard(selfGameboard, enemyGameboard){
    this.clearGrids();
    selfGameboard.cellsWithShips.forEach(ship => 
      document.getElementById(PointsHelper.ObjectToDOMString(this.selfGridContainer,ship)).classList.add('coloredShip')
      );
    selfGameboard.hits.forEach(hit => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.selfGridContainer,hit));
      element.classList.add('hit');
      element.textContent = 'X';
    });
    selfGameboard.misses.forEach(miss => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.selfGridContainer,miss));
      element.classList.add('miss');
      element.textContent = 'X';
    });
    enemyGameboard.hits.forEach(hit => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.enemyGridContainer,hit));
      element.classList.add('hit');
      element.textContent = 'X';
    });
    enemyGameboard.misses.forEach(miss => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.enemyGridContainer,miss));
      element.classList.add('miss');
      element.textContent = 'X';
    });
  }

  static paintShipLocation(gridContainer, coords){
    const points = PointsHelper.returnPointsBetweenCoords(coords);
    const pointsFormatted = points.map(point => `${gridContainer.id},${point.x},${point.y}`)
    pointsFormatted.forEach(points => document.getElementById(points).classList.add('coloredShip'))
  }
  clearGrids(){
    DOM.clearGrid(this.enemyGridContainer);
    DOM.clearGrid(this.selfGridContainer);
  }

  static clearGrid(gridContainer){
    Array.from(gridContainer.children)
      .forEach(cell => {
        cell.className = '';
        cell.textContent = '';
      });
  }

  makeShipModalShipsContainer(){
    this.placeShipModalShipsContainer = document.createElement('div');
    this.placeShipModalShipsContainer.id = 'placeShipModalShipsContainer';

    this.placeShipModalShipsContainerTitle = document.createElement('h3');
    this.placeShipModalShipsContainerTitle.id = 'placeShipModalShipsContainerTitle';
    this.placeShipModalShipsContainerTitle.textContent = 'Ships';

    this.placeShipModalShipsContainerSizeTitle = document.createElement('p');
    this.placeShipModalShipsContainerSizeTitle.id = 'placeShipModalShipsContainerSizeTitle';
    this.placeShipModalShipsContainerSizeTitle.textContent = 'Size';

    this.placeShipModalShipsContainerSizeTitle.classList.add('placeShipModal_size');

    this.placeShipModalShipsContainerSizeContainer = document.createElement('div');
    this.placeShipModalShipsContainerSizeContainer.id = 'placeShipModalShipsContainerSizeContainer';

    const sizeRow = DOM.placeShipModalCreateRow(document.createDocumentFragment(), this.fleetList, 'size');

    this.placeShipModalShipsContainerSizeContainer.appendChild(sizeRow);

    this.placeShipModalShipsContainerCountTitle = document.createElement('p');
    this.placeShipModalShipsContainerCountTitle.id = 'placeShipModalShipsContainerCountTitle';
    this.placeShipModalShipsContainerCountTitle.textContent = 'Count';
    this.placeShipModalShipsContainerCountTitle.classList.add('placeShipModal_count');

    this.placeShipModalShipsContainerCountContainer = document.createElement('div');
    this.placeShipModalShipsContainerCountContainer.id = 'placeShipModalShipsContainerCountContainer';

    const numberRow = DOM.placeShipModalCreateRow(document.createDocumentFragment(), this.fleetList, 'count');

    this.placeShipModalShipsContainerCountContainer.appendChild(numberRow);

    this.placeShipModalShipsContainer.appendChild(this.placeShipModalShipsContainerTitle);
    this.placeShipModalShipsContainer.appendChild(this.placeShipModalShipsContainerSizeTitle);
    this.placeShipModalShipsContainer.appendChild(this.placeShipModalShipsContainerSizeContainer);
    this.placeShipModalShipsContainer.appendChild(this.placeShipModalShipsContainerCountTitle);
    this.placeShipModalShipsContainer.appendChild(this.placeShipModalShipsContainerCountContainer);
  }

  updatePlaceShipModalRows(fleet){
    DOM.clearPlaceShipModalRow(this.placeShipModalShipsContainerSizeContainer)
    DOM.placeShipModalCreateRow(this.placeShipModalShipsContainerSizeContainer, fleet, 'size')
    DOM.clearPlaceShipModalRow(this.placeShipModalShipsContainerCountContainer)
    DOM.placeShipModalCreateRow(this.placeShipModalShipsContainerCountContainer, fleet, 'count')
  }

  static placeShipModalCreateRow(node, fleet, type){
    node = DOM.clearPlaceShipModalRow(node);
    fleet.forEach((element, index) => {
      const ship = document.createElement('p');
      ship.id = `placeShipModal${type}${index}`;
      ship.classList.add('placeShipModal_'+type);
      ship.textContent = element[type];
      node.appendChild(ship);
    })
    return node;
  }

  static clearPlaceShipModalRow(node){
    while(node.firstChild){
      node.removeChild(node.firstChild);
    }
    return node;
  }
}

export default DOM;
