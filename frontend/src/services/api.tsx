//@ts-ignore
const env:any = import.meta.env;
import { create } from 'apisauce';
export const devURL = 'http://localhost:4020/api';
export const prodURL = 'http://localhost:4020/api';

export const api = create({
  headers: {'Content-Type': 'application/json'},
  baseURL: env['MODE'] === 'production' ? prodURL : devURL,
});