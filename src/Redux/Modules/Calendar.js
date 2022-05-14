import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { calendarAPI } from "../../Shared/api";



// 액션 
const GET_CHECKED = "GET_CHECKED";

// 액션 생성
const getChecked = createAction(GET_CHECKED, (checkeddata) => ({ checkeddata }));

// 초기값
const initialState = {
  list: []
}

// 미들웨어 
// 달력 체크 데이터 가져오기
const getCheckedDB = (year, month, plantNo) => {
  return function (dispatch, getState, { history }) {
    calendarAPI
      .getChecked(year, month, plantNo)
      .then((response) => {
        console.log("getCheckedDB : response", response.data);
        const blooming = [];
        const changing = [];
        const leafcleaning = [];
        const supplements = [];
        const watering = [];
        
        for(let i = 0; i < response.data.bloomingDays.length; i++ ) {
          blooming.push(response.data.bloomingDays[i].toDoTime);
        }
        for(let i = 0; i < response.data.changing.length; i++ ) {
          changing.push(response.data.changing[i].toDoTime);
        }
        for(let i = 0; i < response.data.leafCleaning.length; i++ ) {
          leafcleaning.push(response.data.leafCleaning[i].toDoTime);
        }
        for(let i = 0; i < response.data.supplements.length; i++ ) {
          supplements.push(response.data.supplements[i].toDoTime);
        }
        for(let i = 0; i < response.data.watering.length; i++ ) {
          watering.push(response.data.watering[i].toDoTime);
        }

        const checkedData = {
          blooming, changing, leafcleaning, supplements, watering
        }
        // console.log("getCheckedDB : checkedData", checkedData);
        dispatch(getChecked(checkedData));
      }).catch((error) => {
        console.log("getCheckedDB : error", error.response);
      });
  }
};

// 리듀서
export default handleActions(
  {
    [GET_CHECKED]: (state, action) => produce(state, (draft) => {
      console.log("GET_CHECKED : CHECKED DATA", action.payload.checkeddata)
      draft.checkedData = action.payload.checkeddata;
    }),
  }, initialState
)



const actionCreators = {
    getCheckedDB,
}

export { actionCreators };