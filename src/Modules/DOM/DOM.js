class DOM {
  constructor(contentNode, gridSize = 10) {
    this.contentNode = contentNode;
    this.fleetList = [{"size":5,"count":1},{"size":4,"count":2},{"size":3,"count":3}, {"size":2,"count":4}]
    const placeholder = document.createDocumentFragment()

    const title = document.createElement('h1');
    title.id = "title";
    title.textContent = "BATTLESHIP";

    const enemyGridContainerTitle = document.createElement('h2');
    enemyGridContainerTitle.id = 'enemyGridContainerTitle';
    enemyGridContainerTitle.textContent = 'Enemy Grid';

    const enemyGridContainer = document.createElement('div');
    enemyGridContainer.id = 'enemyGridContainer';

    DOM.createGrid(enemyGridContainer, gridSize);

    const fleetTitle = document.createElement('h2');
    fleetTitle.id = 'fleetTitle';
    fleetTitle.textContent = 'Your Fleet';

    const fleet = document.createElement('div');
    fleet.id = 'fleet';

    DOM.makeFleet(fleet, this.fleetList);

    const status = document.createElement('p');
    status.id = 'status';
    status.textContent = 'status';

    const selfGridContainer = document.createElement('selfGridContainer');
    selfGridContainer.id = 'selfGridContainer';

    DOM.createGrid(selfGridContainer, gridSize);

    placeholder.appendChild(title);
    placeholder.appendChild(enemyGridContainerTitle);
    placeholder.appendChild(enemyGridContainer);
    placeholder.appendChild(fleetTitle);
    placeholder.appendChild(fleet);
    placeholder.appendChild(status);
    placeholder.appendChild(selfGridContainer);

    contentNode.appendChild(placeholder);
  }

  static createGrid(parentElement, width, height = undefined) {
    const placeholder = document.createDocumentFragment();
    height = height === undefined ? width : height
    for (let row = 1; row <= height; row++) {
      for (let col = 1; col <= width; col++) {
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

  static makeFleet(fleetNode, fleet){
    const placeholder = document.createDocumentFragment();
    placeholder.append(...(fleet.map(ship => DOM.makeShipGroup(ship))));
    fleetNode.appendChild(placeholder);
  }

  static makeShipGroup(shipType){
    const shipTypeContainer = document.createElement('div');
    shipTypeContainer.classList.add("shipTypeContainer")
    for (let ship = 0; ship < shipType.count; ship++){
      shipTypeContainer.appendChild(DOM.makeShip(shipType.size));
    }
    return shipTypeContainer
  }

  static makeShip(length){
    const ship = document.createElement('div');
    ship.classList.add("ship")
    for(let shipBlock = 0; shipBlock < length; shipBlock++){
      ship.appendChild(document.createElement('div'))
    }
    return ship
  }

}

export default DOM;
