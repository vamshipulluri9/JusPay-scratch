import { store } from "../../../store";
import { updateAngle } from "../../slice/spriteSlice";

export const MoveStepsX = (type, characterId) => {
  if (!characterId) {
    characterId = store.getState().sprite.active;
  }
  const el = document.getElementById(`${characterId}-div`);

  const currentLeft = el.offsetLeft;

  el.style.position !== "relative" && (el.style.position = "relative");
  let steps = 0;

  switch (type) {
    case "MOVEX_TEN":
      steps = 10;
      break;
    case "MOVEX_FIFTEEN":
      steps = 15;
      break;
    case "MOVEX_THIRTY":
      steps = 30;
      break;
    default:
      steps = 0;
  }

  el.style.left = currentLeft + steps + "px";

  store.getState().sprite.characters.forEach((sprite) => {
    if (sprite.id !== characterId) {
      const t = document.getElementById(`${sprite.id}-div`);
      if (t) {
        const left = t.offsetLeft;
        const top = t.offsetTop;
        // const top = t.offsetTop;

        if (left === el.offsetLeft && top === el.offsetTop) {
          el.style.left = currentLeft - steps + "px";
          // MoveStepsX(type, sprite.id);
        }
        console.log(`Character ${sprite.id} is at position (${left}, ${top})`);
      }
    }
  });
};

export const MoveStepsY = (type, characterId) => {
  if (!characterId) {
    characterId = store.getState().sprite.active;
  }
  const el = document.getElementById(`${characterId}-div`);
  const top = el.offsetTop;
  el.style.position !== "relative" && (el.style.position = "relative");

  let steps = 0;
  switch (type) {
    case "MOVEY_TEN":
      steps = 10;
      break;
    case "MOVEY_FIFTEEN":
      steps = 15;
      break;
    case "MOVEY_THIRTY":
      steps = 30;
      break;
    default:
      steps = 0;
  }

  el.style.top = top + steps + "px";
};

export const RotateClockwise = (type, characterId) => {
  if (!characterId) {
    characterId = store.getState().sprite.active;
  }
  const el = document.getElementById(`${characterId}`);
  const currentAngle = store
    .getState()
    .sprite.characters.find(
      (obj) => obj.id === store.getState().sprite.active
    ).angle;

  let angle = 0;
  switch (type) {
    case "CLOCKWISE_TEN":
      angle = 10;
      break;
    case "CLOCKWISE_FIFTEEN":
      angle = 15;
      break;
    case "CLOCKWISE_THIRTY":
      angle = 30;
      break;
    default:
      angle = 0;
  }

  const newAngle = parseInt(currentAngle) + parseInt(angle);

  el.style.transform = `rotate(${newAngle}deg)`;
  store.dispatch(updateAngle(newAngle));
};

export const RotateAntiClockwise = (type, characterId) => {
  if (!characterId) {
    characterId = store.getState().sprite.active;
  }
  const el = document.getElementById(`${characterId}`);
  const currentAngle = store
    .getState()
    .sprite.characters.find(
      (obj) => obj.id === store.getState().sprite.active
    ).angle;

  let angle = 0;
  switch (type) {
    case "ANTICLOCKWISE_TEN":
      angle = 10;
      break;
    case "ANTICLOCKWISE_FIFTEEN":
      angle = 15;
      break;
    case "ANTICLOCKWISE_THIRTY":
      angle = 30;
      break;
    default:
      angle = 0;
  }

  const newAngle = parseInt(currentAngle) - parseInt(angle);

  el.style.transform = `rotate(${newAngle}deg)`;
  store.dispatch(updateAngle(newAngle));
};

export const GotoXY = (x, y, characterId) => {
  if (!characterId) {
    characterId = store.getState().sprite.active;
  }
  const el = document.getElementById(`${characterId}-div`);
  el.style.position !== "relative" && (el.style.position = "relative");
  el.style.left = x + "px";
  el.style.top = y + "px";
};
