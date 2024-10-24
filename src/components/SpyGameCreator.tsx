import React, { useEffect, useMemo, useState } from "react";
import Ruins from "../lib/backgroundImages/ruins.png";
import Ghost from "../lib/objectImages/ghost.png";
import GameObject from "./GameObject";
import { GameObjectType, generateObjects } from "../lib/randomUtils";

type Props = {};

const NUMBER_OF_OBJECTS = 5;
const BACKGROUND_WIDTH = 750;
const BACKGROUND_HEIGHT = 1000;
const OBJECT_WIDTH = 50;
const OBJECT_HEIGHT = 50;

const SpyGameCreator = (): React.ReactElement => {
  const [objects, setObjects] = useState<GameObjectType[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setObjects(
      generateObjects({
        numAreas: NUMBER_OF_OBJECTS,
        minX: 0,
        maxX: BACKGROUND_WIDTH,
        minY: 0,
        maxY: BACKGROUND_HEIGHT,
        width: OBJECT_WIDTH,
        height: OBJECT_HEIGHT,
      })
    );
  }, []);

  const objectsFound = useMemo(() => {
    let found = 0;
    objects.forEach((obj) => {
      if (obj.found) {
        found += 1;
      }
    });
    return found;
  }, [objects]);

  useEffect(() => {
    if (objects.length > 0 && objectsFound === objects.length) {
      setTimeout(() => {
        alert("By golly you did it! You found them all!");
      });
    }
  }, [objectsFound, objects]);

  return (
    <>
      <div className="Game-found-text">
        Ghosts found:{" "}
        <span>
          {objectsFound} out of {objects.length}
        </span>
      </div>
      <div
        className="Game-board"
        style={{
          width: `${BACKGROUND_WIDTH}px`,
          height: `${BACKGROUND_HEIGHT}px`,
        }}
      >
        <>
          <img
            className="Game-background"
            src={Ruins}
            alt="game background"
            onLoad={() => {
              console.log("hi");
              setLoaded(true);
            }}
          />
          {loaded ? (
            <>
              {objects.map(({ x, y, rotation, found }, i) => {
                return (
                  <GameObject
                    src={Ghost}
                    width={OBJECT_WIDTH}
                    height={OBJECT_HEIGHT}
                    x={x}
                    y={y}
                    rotation={rotation}
                    found={found}
                    onClick={() =>
                      setObjects((objs) => {
                        return objs.map((obj, index) =>
                          index === i ? { ...obj, found: true } : obj
                        );
                      })
                    }
                  />
                );
              })}
            </>
          ) : (
            <div>loading...</div>
          )}
        </>
      </div>
    </>
  );
};

export default SpyGameCreator;
