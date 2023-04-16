import React, { ChangeEvent, FC, useState } from 'react'
import '../App.css';
import PiChart from './Chart';

const Layout:FC = () => {

    const [amount,setAmount] = useState("");
    const [month,setMonth] = useState("");
    const [interest,setInterest] = useState("");

    const [emi,setEmi] = useState(0);
    const [total,setTotal] = useState(0);
    const [irate,setIrate] = useState(0);

    const changeHandler1 = (e:ChangeEvent<HTMLInputElement>) =>{
        setAmount(e.target.value);
    }

    const changeHandler2 = (e:ChangeEvent<HTMLInputElement>) =>{
        setMonth(e.target.value);
    }

    const changeHandler3 = (e:ChangeEvent<HTMLInputElement>) =>{
        setInterest(e.target.value);
    }

    const clickHandler = () =>{
        const rate:number = (parseInt(interest)/12/100);
        const emi:number = (parseInt(amount)* rate * (1+rate)** parseInt(month))/((1+rate)** Number(month)-1);
        const total:number = (emi*Number(month));
        const Irate = (total-parseInt(amount));

        setEmi(Number(emi.toFixed(2)));
        setTotal(Number(total.toFixed(2)));
        setIrate(Number(Irate.toFixed(2)));
        console.log("Emi -> " + emi + " amount -> " + amount + " total -> " + total + " interest " + Irate );
    }

  return (
    <>
    <div className='container'>
    
    <label className='label'>
        <span className='label-title'>Loan Amount</span>
    <input type='text' className='input' onChange={changeHandler1} value={amount} placeholder='Enter the loan amount'/>
    </label>
  
    <br/><br/>
   
    <label className='label'>
        <span className='label-title'>Loan Tenure(months)</span>
    <input type='text' className='input' onChange={changeHandler2} value={month} placeholder='Enter the loan Tenure(month)'/>
    </label>
   
    <br/><br/>
   
   <label className='label'>
    <span className='label-title'>Interest</span>
    <input type='text' className='input' onChange={changeHandler3} value={interest} placeholder='Enter the interest rate(%)'/>
    </label>
   <br/><br/>
    <button type='button' className='btn' onClick={clickHandler}> Calculate</button>
    </div>
      <br/><br/>
       {
        total>0 ? (
        <div className='Rcontainer'>
        <div className='result'>
        <h4>Loan Emi</h4>
        <h2>₹{emi}</h2>
        <hr/>
        <h4>Total Interest Payable</h4>
        <h2>₹{irate}</h2>
        <hr/>
        <h4>Total Amout</h4>
        <h1>₹{total}</h1>
       </div>
       <div className='chart'>
        <PiChart totalInterest={irate} loanAmount={Number(amount)}/>
       </div>
       </div>
       
        ):null
       }
   
    </>
  )
}

export default Layout;