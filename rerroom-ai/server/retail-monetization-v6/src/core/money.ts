import type { Money, Currency } from '../types/commerce';
export const money=(amount:number,currency:Currency='CAD'):Money=>({amount:Math.round(amount*100)/100,currency});
export const addMoney=(a:Money,b:Money):Money=>{if(a.currency!==b.currency)throw new Error('currency_mismatch');return money(a.amount+b.amount,a.currency)};
export const multiplyMoney=(a:Money,q:number):Money=>money(a.amount*q,a.currency);
export const maxZero=(a:Money):Money=>money(Math.max(0,a.amount),a.currency);
export const sumMoney=(values:Money[]):Money=>values.reduce((a,b)=>addMoney(a,b),money(0,values[0]?.currency??'CAD'));
