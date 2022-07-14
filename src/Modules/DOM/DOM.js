import PointsHelper from "../Util/PointsHelper";

class DOM {
  constructor(contentNode, fleetList, gridSize = 10) {
    this.contentNode = contentNode;
    this.fleetList = fleetList;
    const placeholder = document.createDocumentFragment()

    this.title = document.createElement('h1');
    this.title.id = "title";
    this.title.textContent = "BATTLESHIP";

    this.togglePlayerEntryForm = document.createElement('button');
    this.togglePlayerEntryForm.id = 'togglePlayerEntryForm';
    this.togglePlayerEntryForm.textContent = 'Close Player Form';

    this.playerEntryForm = this.makePlayerEntryForm();

    this.status = document.createElement('p');
    this.status.id = 'status';
    this.status.textContent = 'status';

    this.selfGrid = document.createElement('div');
    this.selfGrid.id = 'selfGrid';

    this.selfGridContainerTitle = document.createElement('h2');
    this.selfGridContainerTitle.id = 'selfGridContainerTitle';
    this.selfGridContainerTitle.textContent = 'Your Grid';

    this.selfGridContainer = document.createElement('div');
    this.selfGridContainer.id = 'selfGridContainer';

    DOM.createGrid(this.selfGridContainer, 'gameGridSquare', gridSize);

    this.selfGrid.append(this.selfGridContainerTitle, this.selfGridContainer)

    this.enemyGrid = document.createElement('div');
    this.enemyGrid.id = 'enemyGrid';

    this.enemyGridContainerTitle = document.createElement('h2');
    this.enemyGridContainerTitle.id = 'enemyGridContainerTitle';
    this.enemyGridContainerTitle.textContent = 'Enemy Grid';

    this.enemyGridContainer = document.createElement('div');
    this.enemyGridContainer.id = 'enemyGridContainer';

    DOM.createGrid(this.enemyGridContainer, 'gameGridSquare', gridSize);

    this.enemyGrid.append(this.enemyGridContainerTitle, this.enemyGridContainer)

    this.grids = document.createElement('div');
    this.grids.id = 'grids';
    this.grids.append(this.selfGrid, this.enemyGrid);

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

    DOM.createGrid(this.placeShipModalGrid, "placeShipGridSquare", gridSize)

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

    this.switchPlayerModal = document.createElement('dialog');
    this.switchPlayerModal.id = 'switchPlayerModal';

    this.switchPlayerModalContainer = document.createElement('div');
    this.switchPlayerModalContainer.id = 'switchPlayerModalContainer';

    this.switchPlayerModalDescription = document.createElement('p');
    this.switchPlayerModalDescription.id = 'switchPlayerModalDescription';
    this.switchPlayerModalDescription.textContent = 'It is now the other player\'s turn. Switch players and hit the ready button below.';

    this.readyToSwitchPlayerButton = document.createElement('button');
    this.readyToSwitchPlayerButton.id = 'readyToSwitchPlayerButton';
    this.readyToSwitchPlayerButton.textContent = 'Ready to Switch'; 

    this.switchPlayerModalContainer.appendChild(this.switchPlayerModalDescription);
    this.switchPlayerModalContainer.appendChild(this.readyToSwitchPlayerButton);

    this.switchPlayerModal.appendChild(this.switchPlayerModalContainer);


    placeholder.appendChild(this.title);
    placeholder.appendChild(this.togglePlayerEntryForm);
    placeholder.appendChild(this.playerEntryForm);
    placeholder.appendChild(this.status);
    placeholder.appendChild(this.grids);
    placeholder.appendChild(this.placeShipModal);
    placeholder.appendChild(this.switchPlayerModal);
  
    contentNode.appendChild(placeholder);

    this.readyToSwitchPlayerButton.addEventListener('click', () => this.switchPlayerModal.close());
    this.togglePlayerEntryForm.addEventListener('click', ()=>{
      if (this.playerEntryForm.style.display === ''){
        this.closePlayerEntryForm();
      } else {
        this.openPlayerEntryForm();
      }
    });
  }
  closePlayerEntryForm(){
    this.playerEntryForm.style.display = 'none';
    this.togglePlayerEntryForm.textContent = 'Open Player Form';
  }

  openPlayerEntryForm(){
    this.playerEntryForm.style.display = '';
    this.togglePlayerEntryForm.textContent = 'Close Player Form';
  }

  static createGrid(parentElement,className, width, height = undefined) {
    const placeholder = document.createDocumentFragment();
    height = height === undefined ? width : height
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        placeholder.appendChild(document.createElement('div'));
        placeholder.lastChild.classList.add(className);
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
    });
    selfGameboard.misses.forEach(miss => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.selfGridContainer,miss));
      element.classList.add('miss');
    });
    enemyGameboard.hits.forEach(hit => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.enemyGridContainer,hit));
      element.classList.add('hit');
    });
    enemyGameboard.misses.forEach(miss => {
      const element = document.getElementById(PointsHelper.ObjectToDOMString(this.enemyGridContainer,miss));
      element.classList.add('miss');
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
        cell.classList.remove('miss');
        cell.classList.remove('hit');
        cell.classList.remove('coloredShip');
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

  updatePlayerNamePlaceShipModal(playerName){
    this.placeShipModalTitle.textContent = playerName + ' Ship Placement';
  }

  makePlayerEntryForm(){
    const playerEntryForm = document.createElement('form');
    playerEntryForm.id = 'playerEntryForm';

    const player1Entry = this.makePlayerEntryFormOnePlayer('player1', 'Player 1')
    const player2Entry = this.makePlayerEntryFormOnePlayer('player2', 'Player 2')

    const submitButton = document.createElement('input');
    submitButton.id = 'startButton';
    submitButton.type = 'submit';
    submitButton.value = 'start game';

    playerEntryForm.appendChild(player1Entry);
    playerEntryForm.appendChild(player2Entry);
    playerEntryForm.appendChild(submitButton);

    return playerEntryForm;
  }

  makePlayerEntryFormOnePlayer(playerName, playerNameFancy){
    const placeholder = document.createDocumentFragment();

    const playerNameLabel = document.createElement('label');
    playerNameLabel.id = playerName+'NameLabel';
    playerNameLabel.for = playerName+'Name';
    playerNameLabel.textContent = playerNameFancy + ' name';

    const playerNameInput = document.createElement('input');
    playerNameInput.id = playerName+'Name';
    playerNameInput.type = 'text';
    playerNameInput.name = playerName+'Name';
    playerNameInput.placeholder = playerNameFancy;
    playerNameInput.value = playerNameFancy;
    
    const label = document.createElement('label');
    label.id = playerName + 'TypeLabel';
    label.for = playerName + 'Type';
    label.textContent = playerNameFancy + ' type';

    const type = document.createElement('select');
    type.id = playerName + 'Type';
    type.name = playerName + 'Type';

    const typeHuman = document.createElement('option');
    typeHuman.value = 'human';
    typeHuman.textContent = 'Human';

    const typeComputer = document.createElement('option');
    typeComputer.value = 'computer';
    typeComputer.textContent = 'Computer';
    type.append(typeHuman, typeComputer);
    placeholder.append(playerNameLabel, playerNameInput, label, type);
    return placeholder;
  }

  updateSwitchPlayerModalWithPlayerName(player){
    this.switchPlayerModalDescription.textContent = `It is now ${player.name} \'s turn. Switch players and hit the ready button below.`
  }


  static placeShipModalCreateRow(node, fleet, type){
    node = DOM.clearPlaceShipModalRow(node);
    fleet.forEach((element, index) => {
      const ship = document.createElement('p');
      ship.id = `placeShipModal${type}${index}`;
      ship.classList.add(`placeShipModal_${type}`);
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
