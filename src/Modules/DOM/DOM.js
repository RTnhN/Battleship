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

    this.status = document.createElement('p');
    this.status.id = 'status';
    this.status.textContent = 'status';

    this.selfGridContainer = document.createElement('selfGridContainer');
    this.selfGridContainer.id = 'selfGridContainer';

    DOM.createGrid(this.selfGridContainer, gridSize);

    placeholder.appendChild(this.title);
    placeholder.appendChild(this.status);
    placeholder.appendChild(this.selfGridContainer);
    placeholder.appendChild(this.enemyGridContainerTitle);
    placeholder.appendChild(this.enemyGridContainer);
    placeholder.appendChild(this.status);
    placeholder.appendChild(this.selfGridContainer);

    contentNode.appendChild(placeholder);
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
}

export default DOM;
