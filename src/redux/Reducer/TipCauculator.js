import { ONCLICK, ONCHANGE ,ONCHANGEBILL ,ONCHANGETIP ,ONCHANGEPEOPLE } from "../../util/settings";

const stateDefault = {
    listBtn : [
        {id :1, percent : '5%', status : true , value : 5},
        {id :2,percent : '10%', status : true , value : 10},
        {id :3,percent : '15%', status : true , value : 15},
        {id :4,percent : '25%', status : true , value : 25},
        {id :5,percent : '50%', status : true , value : 50},
    ],
    bill : 0,
    selectTip : 0,
    numberOfPeople : 1
}

export const TipCauculatorReducer = ( state = stateDefault,action) => {

    switch(action.type) {
        case ONCLICK : {
            const index = state.listBtn.findIndex(btn => btn.id === action.payload);
            for(var i = 0; i<state.listBtn.length ; i++){
                state.listBtn[i].status = true;
            }
            state.listBtn[index].status = false;
            state.selectTip = state.listBtn[index].value;
            return {...state}
        }

        case ONCHANGE : {
            for(var i = 0; i<state.listBtn.length ; i++){
                state.listBtn[i].status = true;
            }
            return {...state}
        }

        case ONCHANGEBILL : {
            state.bill = action.payload;
            return {...state};
        }

        case ONCHANGETIP : {
            state.selectTip = action.payload;
            console.log(state.selectTip);
            return {...state};
        }

        case ONCHANGEPEOPLE : {
            state.numberOfPeople = action.payload;
            return {...state};
        }
        default: return state;
    }
}

