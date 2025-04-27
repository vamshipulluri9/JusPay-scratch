import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [{ id: "sprite0", angle: 0, midAreaId: "midAreaList-0" }],
  active: "sprite0",
  thisSprite: false,
};

const spriteSlice = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    setActiveCharacter: (state, action) => {
      state.active = action.payload;
    },

    addCharacter: (state) => {
      var newId = state.characters.length;

      state.characters.push({
        id: `sprite${newId}`,
        angle: 0,
        midAreaId: "midAreaList-0",
      });
      setTimeout(() => {
        const el = document.getElementById(`sprite${newId}-div`);
        el.style.position = "relative";
        console.log("🚀 ~ setTimeout ~ el:", el);
        el.style.left = "0px";
        el.style.top = "0px";
      }, 100);
    },

    toggleThisSprite: (state) => {
      state.thisSprite = !state.thisSprite;
    },

    updateAngle: (state, action) => {
      state.characters.find((obj) => obj.id === state.active).angle =
        action.payload;
    },

    // updateMidAreaId: (state, action) => {
    //   state.characters.find((obj) => obj.id === state.active).midAreaId =
    //     action.payload;
    // },

    //updateMidAreId should take character id and midAreaId as payload
    //and update the midAreaId of the character with the given id
    updateMidAreaId: (state, action) => {
      state.characters.find((obj) => obj.id === action.payload.id).midAreaId =
        action.payload.midAreaId;
    },
  },
});

export const {
  addCharacter,
  setActiveCharacter,
  toggleThisSprite,
  updateAngle,
  updateMidAreaId,
} = spriteSlice.actions;
export default spriteSlice.reducer;
