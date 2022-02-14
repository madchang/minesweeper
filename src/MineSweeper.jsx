import { useRef } from 'react';

import { useMineField } from './useMineField';
import { useStopWatch } from './useStopWatch';
import Board from './Board';

export function MineSweeper() {
  const {
    mineField,
    state,
    openCell,
    flagCell,
    chordCell,
    resetMineField,
  } = useMineField(10, 10, 10);

  const sw = useStopWatch();

  const rowCountInput = useRef(null);
  const columnCountInput = useRef(null);
  const mineCountInput = useRef(null);
  
  return (
    <div>
      <div>
        <label htmlFor="row-count">rows</label>
        <input type="number" name="rowCount" id="row-count" min={1} defaultValue={mineField.rowCount} ref={rowCountInput} />
        <label htmlFor="column-count">cols</label>
        <input type="number" name="columnCount" id="column-count" min={1} defaultValue={mineField.columnCount} ref={columnCountInput} />
        <label htmlFor="mine-count">mines</label>
        <input type="number" name="mineCount" id="mine-count" min={1} max={mineField.rowCount * mineField.columnCount - 1} defaultValue={mineField.mineCount} ref={mineCountInput}/>
        <button onClick={() => resetMineField(rowCountInput.current.value, columnCountInput.current.value, mineCountInput.current.value)}>set</button>
      </div>
      <button onClick={() => resetMineField(mineField.rowCount, mineField.columnCount, mineField.mineCount)}>reset</button>
      <span>{state}</span>
      <div>
        <span>{sw.elapsed / 1000}</span>
        <button onClick={() => sw.resume()}>start</button>
        <button onClick={() => sw.pause()}>pause</button>
        <button onClick={() => sw.reset()}>reset</button>
        <span>{sw.state}</span>
      </div>
      <Board 
        cells={mineField.cells}
        cellStates={mineField.cellStates}
        openCell={openCell}
        flagCell={flagCell}
        chordCell={chordCell}
      />
    </div>
  );
}

export default MineSweeper;