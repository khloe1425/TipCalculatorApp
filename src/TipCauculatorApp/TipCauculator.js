import React, { useEffect, useRef, useState } from 'react'
import TipCauculatorApp from './TipCauculatorApp.css'
import { useDispatch, useSelector } from 'react-redux';
import { onChangeBillAction, onChangeInputAction, onChangePeopleAction, onChangeTipAction, onClickBtnAction } from '../redux/action/TipCauculatorAction';
export default function TipCauculator() {


    const {listBtn} = useSelector(state => state.TipCauculatorReducer);
    const {bill} = useSelector(state => state.TipCauculatorReducer);
    const {selectTip} = useSelector(state => state.TipCauculatorReducer);
    const {numberOfPeople} = useSelector(state => state.TipCauculatorReducer);

    
    const inputTip = useRef();
    const inputPeople = useRef();
    const inputBill = useRef();

    const validaionPeople = useRef();
    const validaionBill = useRef();

    const [tipAmount , setTipAmout] = useState(0);
    const [total , setTotal] = useState(0);

    useEffect( async() => {
        var result = (bill / 100 * selectTip).toFixed(1);
        await setTipAmout(result)
        await setTotal((result * numberOfPeople).toFixed(1))
    }, [bill , selectTip , numberOfPeople]);

    const dispatch = useDispatch();
    const renderListBtn=()=>{
        return listBtn.map((btn,index)=>{
            
            var btnCss;
            if(btn.status){
                btnCss = 'btn-item'
            }else{
                btnCss = 'btn-item-click'
            }
          return   <button key={index} onClick={ async ()=>{
                    
                    await dispatch(onClickBtnAction(btn.id))
                    inputTip.current.value =''
                    
                }} className={btnCss} >{btn.percent}</button>
    
        })
      }

    const handleChangeBill =()=>{
        var bill = inputBill.current.value;
        if(bill == ''){
            bill = 0;
        }
        var regexNumber = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        if(regexNumber.test(bill)){
            validaionBill.current.innerHTML = ''
            dispatch(onChangeBillAction(Number(bill)))
            // setTipAmout(Number(bill) / 100 * selectTip)
        }else{
            validaionBill.current.innerHTML = '(*) Bill is not valdid'
        }
        
    }

   

    const handleChangePeople =() =>{
        var ipPeople = inputPeople.current.value;
        if(ipPeople==''){
            ipPeople=1;
        }
        
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(ipPeople)){
            validaionPeople.current.innerHTML = 'Can not be zero'
            dispatch(onChangePeopleAction(ipPeople))
        }else{
            validaionPeople.current.innerHTML = 'The number is not valid'
        }
    }


    const handleChangeTip =() =>{
        var percentTip = inputTip.current.value;
        if(percentTip == ''){
            percentTip = 0;
        }
        var regexNumber = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        if(regexNumber.test(percentTip)){
            dispatch(onChangeInputAction())
            dispatch(onChangeTipAction(Number(percentTip)));
        }
    }

    const resetEverything =() =>{
        dispatch(onChangeBillAction(0))
        dispatch(onChangeTipAction(0))
        dispatch(onChangePeopleAction(1))
        dispatch(onChangeInputAction())
        inputTip.current.value =''
        inputPeople.current.value =''
        inputBill.current.value =''
    }


  return (
    <div className='content' >
        <div className='container-content' >
            <div className='d-flex logo' >
                 <img className='text-center img-icon' src='./img/logo.svg' ></img>
            </div>

            <div className='cauculator'>
                <div className='content-left' >
                    <div className='form-group' >
                        <div className='d-flex' style={{justifyContent:'space-between'}} >
                            <span>Bill</span>
                            <span style={{fontSize:'15px'}} ref={validaionBill} className='text-danger' ></span>
                        </div>
                        
                        <input ref={inputBill}  onChange={()=>{
                            handleChangeBill()
                        }}  className='form-control input-bill' ></input>
                        <img  className='icon-dolar' src='./img/icon-dollar.svg' ></img>
                    </div>
                    <p style={{fontSize:'15px',color:'hsl(183, 100%, 15%)'}} >Select Tip %</p>
                    <div className='list-btn mt-2' >
                        {renderListBtn()}
                        <input  placeholder="Custom" onChange={()=>{
                            handleChangeTip();
                        }} ref={inputTip} style={{width:'31%'}} className='input-tip' ></input>
                    </div>
                    <div>
                        <div style={{justifyContent:'space-between'}} className='d-flex'>
                            <span className='mt-4' style={{fontSize:'15px',color:'hsl(183, 100%, 15%)'}} >Number of People</span>
                            <span ref={validaionPeople} className='mt-4 valiPeo' style={{fontSize:'15px',color:'orange'}} >Can not  be zero</span>
                        </div>
                        <img src='./img/icon-person.svg' className='icon-people' ></img>
                        <input  ref={inputPeople}  onChange={()=>{
                            handleChangePeople();
                        }}  className='form-control input-people'></input>
                        
                    </div>
                    
                </div>
                <div className='content-right' >
                    <div className='row'>
                        <div className='col-6' >
                            <span className='text-light'>Tip Amount</span>
                            <p>/ person</p>
                        </div>
                        <div style={{fontSize:'2rem',textAlign:'right' , color:'hsl(172, 67%, 45%)', fontWeight:'700'}} className='col-6  ' >
                            $ {tipAmount}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6' >
                            <span className='text-light'>Total</span>
                            <p>/ person</p>
                        </div>
                        <div style={{fontSize:'2rem',textAlign:'right' , color:'hsl(172, 67%, 45%)', fontWeight:'700'}} className='col-6 ' >
                            $ {total}
                        </div>
                    </div>
                    <button onClick={()=>{
                        resetEverything()
                    }} className='btn  btn-reset w-100'>RESET</button>
                </div>
            </div>
        </div>
    </div>
  )
}
