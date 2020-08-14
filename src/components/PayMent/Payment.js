import React,{Component} from "react";
import "./Paymentstyle.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cart from "../cart/Cart";

class Payment extends Component {
   
    constructor(){
        super()
        this.state={
            showMe:false
        }
    }

    operation(){
        this.setState({
            showMe:true
        })
    }
   

    render(){
    return(
        <div className="main_container">
            <div className="div1">Cart</div><br></br>
            {
                   this.state.showMe?
                   <div className="div2">
                        <button className="button">Checkout</button>
                        <br/><br/>
                        <div className="order">Order Total:&nbsp;&nbsp;&nbsp;&nbsp; ₹ 340</div>
                   </div>
                   :null 

                  
            }    
     

            <div className="div5">

<div className="side2">
               <span className="user"><FontAwesomeIcon icon="money-check"/>&nbsp;&nbsp;UPI</span></div>
               


 <a href="#" onClick={()=><Cart />}><div className="side1">
  <span className="user"><FontAwesomeIcon icon="credit-card"/>
  &nbsp;&nbsp;Credit/Debit Cards</span></div></a>
               

               
               
               <div className="side3">
               <span className="user"><FontAwesomeIcon icon="credit-card"/>&nbsp;&nbsp;Credit</span></div>
               
               <div className="side4">
               <span className="user"><FontAwesomeIcon icon="wallet"/>&nbsp;&nbsp;Wallets</span></div>
               
               <div className="side5">
               <span className="user"><FontAwesomeIcon icon="cash-register"/>&nbsp;&nbsp;Netbanking</span></div>

               <a href="#" onClick={()=>this.operation()}><div className="side6">
               <span className="user1"><FontAwesomeIcon icon="rupee-sign"/>&nbsp;&nbsp;Pay on delievery</span></div></a>
               
            
            </div>
              
        </div>
        
        );
    }
}
export default Payment;
