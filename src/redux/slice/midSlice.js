import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  midAreaLists: [
    {
      id: "midAreaList-0",
      comps: [],
      characterId: "sprite0",
    },
  ],
  active: "midAreaList-0",
};

const midSlice = createSlice({
  name: "mid",
  initialState,
  reducers: {
    updateList: (state, action) => {
      let element = action.payload.draggableId.split("-")[0];

      let source_index = state.midAreaLists.findIndex(
        (x) => x.id === action.payload.source.droppableId
      );

      if (source_index > -1) {
        let comp_list = state.midAreaLists[source_index].comps;
        comp_list.splice(action.payload.source.index, 1);
        state.midAreaLists[source_index].comps = comp_list;
      }

      try {
        let dest_index = state.midAreaLists.findIndex(
          (x) => x.id === action.payload.destination.droppableId
        );

        if (dest_index > -1) {
          let dest_comp_list = state.midAreaLists[dest_index].comps;
          dest_comp_list.splice(
            action.payload.destination.index,
            0,
            `${element}`
          );

          state.midAreaLists[dest_index].comps = dest_comp_list;
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    },

    addList: (state, action) => {
      var newId = state.midAreaLists.length;

      state.midAreaLists.push({
        id: `midAreaList-${newId}`,
        comps: [],
        characterId: `sprite0`,
      });
    },

    setActiveList: (state, action) => {
      state.active = action.payload;
    },

    //update midArea characterId
    updateCharacterId: (state, action) => {
      let index = state.midAreaLists.findIndex(
        (x) => x.id === action.payload.midAreaId
      );
      if (index > -1) {
        state.midAreaLists[index].characterId = action.payload.id;
      }
    },
  },
});

export const { updateList, addList, setActiveList, updateCharacterId } =
  midSlice.actions;
export default midSlice.reducer;
