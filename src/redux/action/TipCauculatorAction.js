import { ONCLICK, ONCHANGE ,ONCHANGEBILL ,ONCHANGETIP , ONCHANGEPEOPLE } from "../../util/settings"


export const onClickBtnAction =(id)=>{
    return ({
        type : ONCLICK,
        payload : id
    })
}

export const onChangeInputAction =()=>{
    return ({
        type : ONCHANGE,
    })
}

export const onChangeBillAction =(bill)=>{
    return ({
        type : ONCHANGEBILL,
        payload : bill
    })
}

export const onChangeTipAction =(tip)=>{
    return ({
        type : ONCHANGETIP,
        payload : tip
    })
}

export const onChangePeopleAction =(people)=>{
    return ({
        type : ONCHANGEPEOPLE,
        payload : people
    })
}