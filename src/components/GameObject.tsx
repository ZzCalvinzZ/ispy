import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  found: boolean;
  rotation: number;
  onClick: () => void;
};

const GameObject = ({
  src,
  width,
  height,
  x,
  y,
  rotation,
  found,
  onClick,
}: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [doneBoo, setDoneBoo] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!img || !context) {
      return;
    }

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0);

    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const offsetX = (event.clientX - rect.left) * scaleX;
    const offsetY = (event.clientY - rect.top) * scaleY;

    const color = context.getImageData(offsetX, offsetY, 1, 1).data;

    // Trigger only if alpha channel is not 0
    if (color?.[3] !== 0) {
      onClick();
    }
  };

  useEffect(() => {
    if (found) {
      setTimeout(() => {
        setDoneBoo(true);
      }, 500);
    }
  }, [found]);

  return (
    <>
      <img
        className="Game-object"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          top: y,
          left: x,
          opacity: found ? "1" : "0.5",
          transform: `rotate(${rotation}deg)`,
        }}
        ref={imgRef}
        src={src}
        alt=""
        onClick={handleClick}
      />
      {found && (
        <div
          style={{ top: y, left: x }}
          className={[
            "boo",
            doneBoo ? "boo--done" : "",
          ].join(" ")}
        >
          BOO!
        </div>
      )}
    </>
  );
};

export default GameObject;
