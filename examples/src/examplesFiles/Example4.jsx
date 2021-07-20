import React, { useState, useRef, useEffect } from 'react';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';

const canvasStyle = {
  width: '100%',
  height: '300px',
  background: 'white',
  overflow: 'auto',
  display: 'flex',

  // width: '100%',
  // height: '300px',
  // background: 'white',
  // // overflow: 'auto',
  // display: 'flex',
  // position: 'relative',
  // // overflowY: "scroll",
  // // overflowX: "hidden"
};

const scrolleableDivStyle = {
  position: 'relative',
  overflow: 'auto',
  width: '120%',
  height: '120%',
  background: 'white',
  color: 'black',
  border: 'black solid 1px',

  // position: 'relative',
  // overflow: 'auto',
  // width: '120%',
  // height: '500px',
  // background: 'white',
  // color: 'black',
  // border: 'black solid 1px',
};

const boxStyle = {
  position: 'absolute',
  border: '1px #999 solid',
  borderRadius: '10px',
  textAlign: 'center',
  width: '40px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const DraggableBox = ({ box }) => {
  const updateXarrow = useXarrow();
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={box.id} style={{ ...boxStyle, position: 'absolute', left: box.x, top: box.y }}>
        {box.id}
      </div>
    </Draggable>
  );
};

const ScrollableDiv = ({ children }) => {
  const updateXarrow = useXarrow();
  return (
    <div style={canvasStyle} onScroll={updateXarrow}>
      <div style={scrolleableDivStyle}>{children}</div>
    </div>
  );
};
const NotScrollableDivDiv = ({ children }) => {
  // const updateXarrow = useXarrow();  // this is comment out so no update on scroll
  return (
    <div style={canvasStyle} onScroll={() => console.log('not implemented')}>
      <div style={scrolleableDivStyle}>{children}</div>
    </div>
  );
};

const Example4 = () => {
  const [boxes, setBoxes] = useState([
    { id: 'box1', x: 20, y: 20 },
    { id: 'box2', x: 100, y: 80 },
  ]);

  const [boxes2, setBoxes2] = useState([
    { id: 'box3', x: 20, y: 20 },
    { id: 'box4', x: 100, y: 80 },
  ]);

  const [lines] = useState([
    { from: 'box1', to: 'box4' },
    { from: 'box3', to: 'box2' },
  ]);
  return (
    <React.Fragment>
      <h3>
        <u>Example4:</u>
      </h3>

      <p> works perfectly no matter the parent-child relationship between the Xarrow and the source and target.</p>
      <p> the xarrows are updated on the left window scroll and does not updated on the right window scroll</p>
      <p>hook is required on scrollables only if xarrow is placed outside the scrollable window in the DOM tree.</p>
      <Xwrapper>
        <div style={{ display: 'flex' }}>
          <ScrollableDiv>
            {boxes.map((box, i) => (
              <DraggableBox key={i} box={box} />
            ))}
          </ScrollableDiv>
          <NotScrollableDivDiv>
            {boxes2.map((box, i) => (
              <DraggableBox key={i} box={box} />
            ))}
          </NotScrollableDivDiv>
        </div>
        {lines.map((line, i) => (
          <Xarrow key={i} start={line.from} end={line.to} zIndex={1} />
        ))}
      </Xwrapper>
    </React.Fragment>
  );
};

export default Example4;
