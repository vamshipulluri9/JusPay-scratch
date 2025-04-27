import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setActiveList } from "../redux/slice/midSlice";
import { store } from "../store";
import { fetchComponent } from "./fetchComponents";
import { Button, Box } from "@mui/material";
import { PlayArrowRounded } from "@mui/icons-material";
import { updateMidAreaId } from "../redux/slice/spriteSlice";
import { updateCharacterId } from "../redux/slice/midSlice";
import runAllEvents from "../redux/functions";
import { updateHistory } from "../redux/slice/historySlice";
import historyMap from "../redux/functions/historyMap";

const MidAreaElements = () => {
  const area_list = useSelector((state) => state.mid);
  const characters = useSelector((state) => state.sprite.characters);
  // const [characterState, setCharacterState] = React.useState(["sprite0"]);

  const dispatch = useDispatch();

  const onRun = (id) => {
    const comps = area_list.midAreaLists.find((x) => x.id === id).comps;
    const characterId = area_list.midAreaLists.find(
      (x) => x.id === id
    ).characterId;
    runAllEvents(comps, characterId);
    comps.forEach((element) => {
      try {
        dispatch(
          updateHistory({ type: element, val1: historyMap[element].val1 })
        );
      } catch (error) {
        console.log("🚀 ~ midAreaList.forEach ~ error:", error);
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center h-full w-full">
      {area_list.midAreaLists.map((l, index) => {
        return (
          <Droppable droppableId={l.id} type="COMPONENTS" key={l.id}>
            {(provided) => {
              return (
                <ul
                  className={`${
                    l.id
                  } w-[250px] min-h-[100px] flex flex-col bg-slate-100 rounded-md ${
                    store.getState().mid.active === l.id &&
                    "border-2 border-blue-500"
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  onClick={() => {
                    dispatch(setActiveList(l.id));
                  }}
                >
                  <Box sx={{ display: "flex", padding: 1 }}>
                    <Button
                      variant="contained"
                      className="w-1/2"
                      onClick={() => {
                        onRun(l.id);
                      }}
                    >
                      Run{" "}
                      <PlayArrowRounded className="moveicon bg-yellow-600 rounded-full ml-2" />
                    </Button>
                    <select
                      className="w-full p-2 bg-slate-200 rounded-md"
                      onChange={(e) => {
                        dispatch(
                          updateCharacterId({
                            id: e.target.value,
                            midAreaId: l.id,
                          })
                        );
                        dispatch(
                          updateMidAreaId({
                            id: e.target.value,
                            midAreaId: l.id,
                          })
                        );
                      }}
                      value={l.characterId}
                    >
                      {characters.map((character, index) => {
                        return (
                          <option
                            key={index}
                            value={character.id}
                            className="bg-slate-200"
                          >
                            {character.id}
                          </option>
                        );
                      })}
                    </select>
                  </Box>

                  {l.comps &&
                    l.comps.map((x, i) => {
                      let str = `${x}`;
                      let component_id = `comp${str}-${l.id}-${i}`;

                      return (
                        <Draggable
                          key={`${str}-${l.id}-${i}`}
                          draggableId={`${str}-${l.id}-${i}`}
                          index={i}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mx-auto"
                            >
                              {fetchComponent(str, component_id)}
                              {provided.placeholder}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </ul>
              );
            }}
          </Droppable>
        );
      })}
    </div>
  );
};

export default MidAreaElements;
